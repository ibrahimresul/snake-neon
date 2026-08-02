import math
import subprocess
import sys

# Video dimensions and specs
WIDTH, HEIGHT = 540, 960
FPS = 30
DURATION = 6.5  # seconds
TOTAL_FRAMES = int(FPS * DURATION)

# Launch ffmpeg process reading raw RGB24 frames from stdout/stdin
ffmpeg_cmd = [
    'ffmpeg', '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{WIDTH}x{HEIGHT}',
    '-pix_fmt', 'rgb24',
    '-r', str(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '22',
    '-pix_fmt', 'yuv420p',
    'app/src/main/assets/intro.mp4'
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

print(f"Generating {TOTAL_FRAMES} frames ({WIDTH}x{HEIGHT} @ {FPS}fps)...")

def clamp(v):
    return max(0, min(255, int(v)))

# Pre-generate cyber grid perspective matrix
center_x = WIDTH / 2
center_y = HEIGHT / 2 + 100

def draw_frame(frame_idx):
    t = frame_idx / FPS
    progress = t / DURATION

    # Buffer for RGB pixels
    pixels = bytearray(WIDTH * HEIGHT * 3)

    # 1. Background gradient & cyber grid
    for y in range(HEIGHT):
        # vertical norm
        ny = (y - center_y) / (HEIGHT / 2)
        bg_r = int(10 + 15 * (1 - abs(ny)))
        bg_g = int(12 + 25 * (1 - abs(ny)))
        bg_b = int(25 + 40 * (1 - abs(ny)))

        row_offset = y * WIDTH * 3
        for x in range(WIDTH):
            nx = (x - center_x) / (WIDTH / 2)

            # Cyber grid ground & ceiling
            grid_val = 0
            if abs(ny) > 0.05:
                # perspective depth z
                z = 1.0 / abs(ny)
                gx = nx * z * 8
                gz = z * 6 - t * 4  # scrolling speed

                line_x = abs(gx - round(gx)) < 0.06 * z
                line_z = abs(gz - round(gz)) < 0.08
                if line_x or line_z:
                    fade = max(0, min(1, 1.8 - z * 0.2))
                    grid_val = int(180 * fade)

            r = bg_r
            g = bg_g + grid_val // 2
            b = bg_b + grid_val

            pixels[row_offset + x * 3] = clamp(r)
            pixels[row_offset + x * 3 + 1] = clamp(g)
            pixels[row_offset + x * 3 + 2] = clamp(b)

    # 2. Neon Swirl Vortex (0.0s -> 2.5s)
    if t < 3.5:
        swirl_alpha = min(1.0, t * 1.5) if t < 2.5 else max(0.0, 1.0 - (t - 2.5) * 2)
        num_particles = 120
        for i in range(num_particles):
            angle = i * 0.2 + t * 5.0
            radius = (20 + (i * 2.5)) * (1.0 + 0.2 * math.sin(t * 3 + i))
            px = int(center_x + radius * math.cos(angle))
            py = int(center_y - 80 + radius * math.sin(angle) * 0.5)

            if 0 <= px < WIDTH and 0 <= py < HEIGHT:
                is_pink = (i % 2 == 0)
                pr = 255 if is_pink else 0
                pg = 50 if is_pink else 255
                pb = 200 if is_pink else 136

                # Draw glowing dot 3x3
                for dy in range(-2, 3):
                    for dx in range(-2, 3):
                        ix, iy = px + dx, py + dy
                        if 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                            dist = math.sqrt(dx*dx + dy*dy)
                            glow = max(0, 1.0 - dist / 2.5) * swirl_alpha
                            idx = (iy * WIDTH + ix) * 3
                            pixels[idx] = clamp(pixels[idx] + pr * glow * 0.6)
                            pixels[idx+1] = clamp(pixels[idx+1] + pg * glow * 0.6)
                            pixels[idx+2] = clamp(pixels[idx+2] + pb * glow * 0.6)

    # 3. Snake Emerging (1.5s -> 6.5s)
    if t >= 1.0:
        snake_t = t - 1.0
        scale = min(1.0, snake_t / 1.5)
        # Smooth bounce/slide forward
        snake_y = center_y - 120 + math.sin(snake_t * 2) * 15

        # Draw Snake Body S-Curves behind head
        for segment in range(25, 0, -1):
            seg_t = snake_t - segment * 0.04
            if seg_t < 0:
                continue
            seg_angle = seg_t * 3.0 + segment * 0.3
            seg_x = center_x + math.sin(seg_angle) * (80 + segment * 3)
            seg_y = snake_y + 120 + segment * 12 - math.cos(seg_angle * 0.5) * 30
            radius = max(6, int((28 - segment * 0.7) * scale))

            if 0 <= seg_x < WIDTH and 0 <= seg_y < HEIGHT:
                # Body segment gradient (Neon Green with Pink Belly)
                for dy in range(-radius, radius + 1):
                    for dx in range(-radius, radius + 1):
                        ix, iy = int(seg_x + dx), int(seg_y + dy)
                        dist = math.sqrt(dx*dx + dy*dy)
                        if dist <= radius and 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                            factor = 1.0 - (dist / radius)
                            # Pink center stripe, green edges
                            if abs(dx) < radius * 0.3 and dy > 0:
                                sr, sg, sb = 255, 0, 150  # Pink
                            else:
                                sr, sg, sb = 0, 255, 136  # Neon Green
                            idx = (iy * WIDTH + ix) * 3
                            pixels[idx] = clamp(pixels[idx] + sr * factor * 0.8)
                            pixels[idx+1] = clamp(pixels[idx+1] + sg * factor * 0.8)
                            pixels[idx+2] = clamp(pixels[idx+2] + sb * factor * 0.8)

        # Draw Snake Head
        head_x = int(center_x)
        head_y = int(snake_y)
        head_r = int(52 * scale)

        if head_r > 5:
            # Diamond Cobra Head shape
            for dy in range(-head_r, head_r + 1):
                for dx in range(-head_r, head_r + 1):
                    ix, iy = head_x + dx, head_y + dy
                    # diamond condition
                    if (abs(dx) * 0.9 + abs(dy) * 0.7) <= head_r and 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                        dist_norm = (abs(dx)*0.9 + abs(dy)*0.7) / head_r
                        intensity = 1.0 - dist_norm

                        # Hexagonal scale texture effect
                        hex_pattern = (int(ix * 0.3) ^ int(iy * 0.3)) % 3 == 0
                        bright = 1.3 if hex_pattern else 0.8

                        hr = int(10 * bright)
                        hg = int(240 * bright * intensity)
                        hb = int(140 * bright * intensity)

                        idx = (iy * WIDTH + ix) * 3
                        pixels[idx] = clamp(pixels[idx] + hr)
                        pixels[idx+1] = clamp(pixels[idx+1] + hg)
                        pixels[idx+2] = clamp(pixels[idx+2] + hb)

            # Glowing White Eyes
            eye_off_x = int(22 * scale)
            eye_off_y = int(-10 * scale)
            for side in (-1, 1):
                ex = head_x + side * eye_off_x
                ey = head_y + eye_off_y
                for dy in range(-6, 7):
                    for dx in range(-6, 7):
                        ix, iy = ex + dx, ey + dy
                        dist = math.sqrt(dx*dx + dy*dy)
                        if dist <= 6 and 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                            glow = 1.0 - (dist / 6.0)
                            idx = (iy * WIDTH + ix) * 3
                            pixels[idx] = clamp(pixels[idx] + 255 * glow)
                            pixels[idx+1] = clamp(pixels[idx+1] + 255 * glow)
                            pixels[idx+2] = clamp(pixels[idx+2] + 255 * glow)

            # Pink Forked Tongue
            tongue_len = int(24 + 8 * math.sin(snake_t * 8))
            for ty in range(tongue_len):
                iy = head_y + head_r // 2 + ty
                ix = head_x
                if 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                    idx = (iy * WIDTH + ix) * 3
                    pixels[idx] = 255
                    pixels[idx+1] = 0
                    pixels[idx+2] = 180

    # 4. Neon Title Logo "SNAKE NEON" (3.0s -> 6.5s)
    if t >= 2.8:
        logo_t = t - 2.8
        logo_scale = min(1.0, logo_t * 2.0)
        logo_alpha = min(1.0, logo_t * 1.5)

        # Draw glowing logo box & text region around bottom center
        ly_center = int(HEIGHT - 220)
        lx_center = int(WIDTH / 2)

        # Draw Snake Icon Badge above text
        badge_y = ly_center - 60
        badge_r = int(25 * logo_scale)
        for dy in range(-badge_r, badge_r + 1):
            for dx in range(-badge_r, badge_r + 1):
                ix, iy = lx_center + dx, badge_y + dy
                dist = math.sqrt(dx*dx + dy*dy)
                if dist <= badge_r and 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                    glow = (1.0 - dist / badge_r) * logo_alpha
                    idx = (iy * WIDTH + ix) * 3
                    pixels[idx] = clamp(pixels[idx] + 0 * glow)
                    pixels[idx+1] = clamp(pixels[idx+1] + 243 * glow)
                    pixels[idx+2] = clamp(pixels[idx+2] + 255 * glow)

        # Draw "SNAKE NEON" text glow banner
        banner_w = int(180 * logo_scale)
        banner_h = int(45 * logo_scale)
        for dy in range(-banner_h, banner_h + 1):
            for dx in range(-banner_w, banner_w + 1):
                ix, iy = lx_center + dx, ly_center + dy
                if 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                    edge_dist = max(abs(dx) / banner_w, abs(dy) / banner_h)
                    if edge_dist <= 1.0:
                        glow = (1.0 - edge_dist) * 0.4 * logo_alpha
                        idx = (iy * WIDTH + ix) * 3
                        pixels[idx] = clamp(pixels[idx] + 217 * glow)
                        pixels[idx+1] = clamp(pixels[idx+1] + 70 * glow)
                        pixels[idx+2] = clamp(pixels[idx+2] + 239 * glow)

    # Write frame to ffmpeg
    proc.stdin.write(pixels)

print("Finishing video encoding...")
proc.stdin.close()
proc.wait()
print("Video successfully generated at app/src/main/assets/intro.mp4!")
