import math
import subprocess
import os

WIDTH, HEIGHT = 480, 854
FPS = 30
DURATION = 5.5
TOTAL_FRAMES = int(FPS * DURATION)

out_dir = 'app/src/main/assets'
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, 'intro.mp4')

ffmpeg_cmd = [
    'ffmpeg', '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{WIDTH}x{HEIGHT}',
    '-pix_fmt', 'rgb24',
    '-r', str(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '22',
    '-pix_fmt', 'yuv420p',
    out_path
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

center_x = WIDTH / 2
center_y = HEIGHT / 2

def clamp(v):
    return 255 if v > 255 else (0 if v < 0 else int(v))

print(f"Generating intro video ({TOTAL_FRAMES} frames)...")

for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / FPS
    pixels = bytearray(WIDTH * HEIGHT * 3)

    # 1. Background Grid & Cyber Atmosphere
    for y in range(0, HEIGHT, 2):
        ny = (y - center_y) / (HEIGHT / 2)
        bg_r = clamp(8 + 12 * (1 - abs(ny)))
        bg_g = clamp(12 + 20 * (1 - abs(ny)))
        bg_b = clamp(28 + 40 * (1 - abs(ny)))

        for x in range(0, WIDTH, 2):
            nx = (x - center_x) / (WIDTH / 2)
            grid_val = 0
            if abs(ny) > 0.08:
                z = 1.0 / abs(ny)
                gx = nx * z * 6
                gz = z * 5 - t * 3.5
                if abs(gx - round(gx)) < 0.08 * z or abs(gz - round(gz)) < 0.09:
                    grid_val = clamp(160 * max(0, 1.5 - z * 0.18))

            r = clamp(bg_r + grid_val // 3)
            g = clamp(bg_g + grid_val // 2)
            b = clamp(bg_b + grid_val)

            for dy in range(2):
                if y + dy >= HEIGHT: break
                r_off = (y + dy) * WIDTH * 3
                for dx in range(2):
                    if x + dx >= WIDTH: break
                    idx = r_off + (x + dx) * 3
                    pixels[idx] = r
                    pixels[idx+1] = g
                    pixels[idx+2] = b

    # 2. Neon Spiral Swirl Vortex
    if t < 3.0:
        swirl_alpha = min(1.0, t * 1.6) if t < 2.0 else max(0.0, 1.0 - (t - 2.0) * 2.0)
        for i in range(70):
            angle = i * 0.25 + t * 6.0
            radius = (15 + (i * 2.5)) * (1.0 + 0.15 * math.sin(t * 4 + i))
            px = int(center_x + radius * math.cos(angle))
            py = int(center_y - 60 + radius * math.sin(angle) * 0.5)

            if 10 <= px < WIDTH - 10 and 10 <= py < HEIGHT - 10:
                is_pink = (i % 2 == 0)
                pr, pg, pb = (255, 30, 180) if is_pink else (0, 255, 136)

                for dy in range(-3, 4):
                    for dx in range(-3, 4):
                        ix, iy = px + dx, py + dy
                        dist = math.sqrt(dx*dx + dy*dy)
                        glow = max(0.0, 1.0 - dist / 3.0) * swirl_alpha
                        idx = (iy * WIDTH + ix) * 3
                        pixels[idx] = clamp(pixels[idx] + pr * glow * 0.7)
                        pixels[idx+1] = clamp(pixels[idx+1] + pg * glow * 0.7)
                        pixels[idx+2] = clamp(pixels[idx+2] + pb * glow * 0.7)

    # 3. Cobra Snake Emerging & Roaring
    if t >= 0.7:
        st = t - 0.7
        scale = min(1.0, st * 1.3)
        snake_y = int(center_y - 70 + math.sin(st * 2.5) * 12)

        # Body S-Curves
        for seg in range(18, 0, -1):
            s_t = st - seg * 0.04
            if s_t < 0: continue
            seg_angle = s_t * 3.2 + seg * 0.35
            seg_x = int(center_x + math.sin(seg_angle) * (65 + seg * 2.2))
            seg_y = int(snake_y + 90 + seg * 10)
            rad = max(4, int((24 - seg * 0.8) * scale))

            if 10 <= seg_x < WIDTH - 10 and 10 <= seg_y < HEIGHT - 10:
                for dy in range(-rad, rad + 1):
                    for dx in range(-rad, rad + 1):
                        ix, iy = seg_x + dx, seg_y + dy
                        dist = math.sqrt(dx*dx + dy*dy)
                        if dist <= rad:
                            factor = 1.0 - (dist / rad)
                            if abs(dx) < rad * 0.35 and dy > 0:
                                sr, sg, sb = 255, 0, 160 # Pink belly stripe
                            else:
                                sr, sg, sb = 0, 255, 136 # Neon green body
                            idx = (iy * WIDTH + ix) * 3
                            pixels[idx] = clamp(pixels[idx] + sr * factor * 0.8)
                            pixels[idx+1] = clamp(pixels[idx+1] + sg * factor * 0.8)
                            pixels[idx+2] = clamp(pixels[idx+2] + sb * factor * 0.8)

        # Cobra Head
        head_x = int(center_x)
        head_y = snake_y
        head_r = int(52 * scale)

        if head_r > 5:
            for dy in range(-head_r, head_r + 1):
                for dx in range(-head_r, head_r + 1):
                    ix, iy = head_x + dx, head_y + dy
                    if (abs(dx) * 0.85 + abs(dy) * 0.7) <= head_r and 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                        norm = (abs(dx)*0.85 + abs(dy)*0.7) / head_r
                        intensity = (1.0 - norm)
                        idx = (iy * WIDTH + ix) * 3
                        pixels[idx] = clamp(pixels[idx] + 10 * intensity)
                        pixels[idx+1] = clamp(pixels[idx+1] + 245 * intensity)
                        pixels[idx+2] = clamp(pixels[idx+2] + 150 * intensity)

            # Glowing White Eyes
            eye_dx = int(20 * scale)
            eye_dy = int(-10 * scale)
            for side in (-1, 1):
                ex, ey = head_x + side * eye_dx, head_y + eye_dy
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

    # 4. Logo Banner "SNAKE NEON"
    if t >= 2.2:
        lt = t - 2.2
        l_scale = min(1.0, lt * 2.2)
        l_alpha = min(1.0, lt * 1.8)

        lx, ly = int(center_x), int(HEIGHT - 200)
        bw, bh = int(170 * l_scale), int(50 * l_scale)

        for dy in range(-bh, bh + 1):
            for dx in range(-bw, bw + 1):
                ix, iy = lx + dx, ly + dy
                if 0 <= ix < WIDTH and 0 <= iy < HEIGHT:
                    dist_norm = max(abs(dx)/bw, abs(dy)/bh)
                    if dist_norm <= 1.0:
                        glow = (1.0 - dist_norm) * 0.5 * l_alpha
                        idx = (iy * WIDTH + ix) * 3
                        pixels[idx] = clamp(pixels[idx] + 0 * glow)
                        pixels[idx+1] = clamp(pixels[idx+1] + 243 * glow)
                        pixels[idx+2] = clamp(pixels[idx+2] + 255 * glow)

    proc.stdin.write(pixels)

proc.stdin.close()
proc.wait()

print(f"Done! Created {out_path} ({os.path.getsize(out_path)} bytes)")
