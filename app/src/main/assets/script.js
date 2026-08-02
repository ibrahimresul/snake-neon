/**
 * Snake (Yılan) Oyunu - Pure Vanilla JavaScript Engine
 * Modern Cyber Neon Aesthetics & Unified Customization System
 */

function initSnakeGame() {
    // Canvas & Context Setup
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const appContainer = document.getElementById('app-container');

    // UI Elements
    const currentScoreEl = document.getElementById('current-score');
    const highScoreEl = document.getElementById('high-score');
    const menuHighScoreEl = document.getElementById('menu-high-score');
    const finalScoreEl = document.getElementById('final-score');
    const finalHighScoreEl = document.getElementById('final-high-score');
    const newHighScoreBanner = document.getElementById('new-high-score-banner');

    // Modals & Screens
    const mainMenuModal = document.getElementById('main-menu');
    const howToModal = document.getElementById('how-to-modal');
    const pauseModal = document.getElementById('pause-modal');
    const gameOverModal = document.getElementById('game-over-modal');
    const shopModal = document.getElementById('shop-modal');
    const customizeModal = document.getElementById('customize-modal');
    const achievementsModal = document.getElementById('achievements-modal');
    const missionsModal = document.getElementById('missions-modal');

    // Buttons
    const startBtn = document.getElementById('start-btn');
    const shopBtn = document.getElementById('shop-btn');
    const customizeBtn = document.getElementById('customize-btn');
    const closeCustomizeBtn = document.getElementById('close-customize-btn');
    const themeBtn = document.getElementById('theme-btn');
    const howToBtn = document.getElementById('how-to-btn');
    const closeHowToBtn = document.getElementById('close-how-to-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const restartPauseBtn = document.getElementById('restart-pause-btn');
    const menuPauseBtn = document.getElementById('menu-pause-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const mainMenuBtn = document.getElementById('main-menu-btn');

    // SKINS Configuration Data
    const SKINS = {
        classic: {
            id: 'classic',
            name: 'Klasik Yeşil',
            desc: 'Sade nostaljik yeşil yılan',
            price: 0,
            unlocked: true,
            unlockScore: 0,
            defaultTrailId: 'glow',
            headColor: '#00ff88',
            bodyColor: 'rgba(0, 204, 102, 0.85)',
            bodyColors: ['#00ff88', '#00cc66', '#059669', '#10b981', '#34d399', '#a7f3d0'],
            glowColor: '#00ff88',
            foodColor: '#ff3366',
            foodGlow: '#ff3366',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#ffd700',
            particleColors: ['#00ff88', '#00cc66', '#ff3366']
        },
        neon: {
            id: 'neon',
            name: 'Cyber Neon',
            desc: 'Parlak neon cyan ve mavi glow',
            price: 0,
            unlocked: true,
            unlockScore: 0,
            defaultTrailId: 'glow',
            headColor: '#00f3ff',
            bodyColor: 'rgba(0, 180, 255, 0.85)',
            bodyColors: ['#00f3ff', '#0099ff', '#0066ff', '#3b82f6', '#8b5cf6', '#a855f7'],
            glowColor: '#00f3ff',
            foodColor: '#ff007f',
            foodGlow: '#ff007f',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#ffd700',
            particleColors: ['#00f3ff', '#0077ff', '#ff007f']
        },
        fire: {
            id: 'fire',
            name: 'Ateş Kırmızısı',
            desc: 'Alev saçan kırmızı ve turuncu',
            price: 250,
            unlocked: false,
            unlockScore: 25,
            defaultTrailId: 'fire',
            headColor: '#ff4500',
            bodyColor: '#ff8c00',
            bodyColors: ['#ff1493', '#ff0000', '#ff4500', '#ff8c00', '#ffd700', '#fef08a'],
            glowColor: '#ff4500',
            foodColor: '#ffff00',
            foodGlow: '#ff8c00',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#ff4500',
            particleColors: ['#ff4500', '#ff8c00', '#ffd700', '#ff0000']
        },
        ice: {
            id: 'ice',
            name: 'Buz Mavisi',
            desc: 'Soğuk dondurucu buz mavisi',
            price: 400,
            unlocked: false,
            unlockScore: 45,
            headColor: '#00ffff',
            bodyColor: '#87cefa',
            bodyColors: ['#00ffff', '#7dd3fc', '#38bdf8', '#0284c7', '#e0ffff', '#ffffff'],
            glowColor: '#00ffff',
            foodColor: '#e0ffff',
            foodGlow: '#00ffff',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#00bfff',
            particleColors: ['#00ffff', '#87cefa', '#e0ffff', '#ffffff']
        },
        cyber: {
            id: 'cyber',
            name: 'Elektrik Mor',
            desc: 'Fütüristik mor ve neon pembe',
            price: 750,
            unlocked: false,
            unlockScore: 70,
            headColor: '#ff00ff',
            bodyColor: '#9400d3',
            bodyColors: ['#ff00ff', '#d946ef', '#9400d3', '#7c3aed', '#00ffff', '#ec4899'],
            glowColor: '#ff00ff',
            foodColor: '#00ffff',
            foodGlow: '#ff00ff',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#00ffff',
            particleColors: ['#ff00ff', '#9400d3', '#00ffff']
        },
        gold: {
            id: 'gold',
            name: 'Saf Altın',
            desc: 'Işıl ışıl 24K saf lüks altın',
            price: 900,
            unlocked: false,
            unlockScore: 90,
            headColor: '#ffd700',
            bodyColor: '#ffaa00',
            bodyColors: ['#ffd700', '#ffaa00', '#d97706', '#f59e0b', '#ffe066', '#ffffff'],
            glowColor: '#ffd700',
            foodColor: '#ffffff',
            foodGlow: '#ffd700',
            specialFoodColor: '#00f3ff',
            specialFoodGlow: '#ffffff',
            particleColors: ['#ffd700', '#ffaa00', '#ffffff', '#fff8dc']
        },
        poison: {
            id: 'poison',
            name: 'Zehirli Toksit',
            desc: 'Tehlikeli fosforlu mor-yeşil',
            price: 1000,
            unlocked: false,
            unlockScore: 120,
            headColor: '#39ff14',
            bodyColor: '#a855f7',
            bodyColors: ['#39ff14', '#22c55e', '#16a34a', '#a855f7', '#9333ea', '#a3e635'],
            glowColor: '#39ff14',
            foodColor: '#ff0055',
            foodGlow: '#39ff14',
            specialFoodColor: '#ffff00',
            specialFoodGlow: '#39ff14',
            particleColors: ['#39ff14', '#a855f7', '#22c55e', '#ff0055']
        },
        rainbow: {
            id: 'rainbow',
            name: 'Spektrum Gökkuşağı',
            desc: 'Canlı renk değiştiren sprey',
            price: 1200,
            unlocked: false,
            unlockScore: 150,
            isRainbow: true,
            headColor: 'rainbow',
            bodyColor: 'rainbow',
            glowColor: 'rainbow',
            foodColor: 'rainbow',
            foodGlow: '#ffffff',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#ffffff',
            particleColors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff']
        },
        galaxy: {
            id: 'galaxy',
            name: 'Galaksi Uzay',
            desc: 'Kozmik uzay ve yıldızlar',
            price: 1500,
            unlocked: false,
            unlockScore: 180,
            headColor: '#ffffff',
            bodyColor: '#6366f1',
            bodyColors: ['#ffffff', '#818cf8', '#6366f1', '#8b5cf6', '#ec4899', '#38bdf8', '#c084fc'],
            glowColor: '#8b5cf6',
            foodColor: '#00ffff',
            foodGlow: '#ec4899',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#00ffff',
            particleColors: ['#6366f1', '#8b5cf6', '#ec4899', '#ffffff']
        },
        lava: {
            id: 'lava',
            name: 'Magma Volkan',
            desc: 'Akkor erimiş volkanik lav',
            price: 1800,
            unlocked: false,
            unlockScore: 220,
            headColor: '#ff1e00',
            bodyColor: '#ff4500',
            bodyColors: ['#ff1e00', '#ff4500', '#b91c1c', '#7f1d1d', '#ff8c00', '#fef08a'],
            glowColor: '#ff1e00',
            foodColor: '#ffff00',
            foodGlow: '#ff1e00',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#ff4500',
            particleColors: ['#ff1e00', '#ff4500', '#ffaa00', '#222222']
        },
        emerald: {
            id: 'emerald',
            name: 'Kristal Zümrüt',
            desc: 'Pırıl pırıl kristal yeşil',
            price: 2000,
            unlocked: false,
            unlockScore: 260,
            headColor: '#00ffaa',
            bodyColor: '#00b377',
            bodyColors: ['#00ffaa', '#00b377', '#00ffcc', '#059669', '#34d399', '#6ee7b7'],
            glowColor: '#00ffaa',
            foodColor: '#ff007f',
            foodGlow: '#00ffaa',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#00ffcc',
            particleColors: ['#00ffaa', '#00ffcc', '#ffffff', '#00b377']
        },
        shadow: {
            id: 'shadow',
            name: 'Karanlık Gölge',
            desc: 'Gizemli hatlara sahip siyah',
            price: 2500,
            unlocked: false,
            unlockScore: 300,
            headColor: '#ffffff',
            bodyColor: '#64748b',
            bodyColors: ['#ffffff', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'],
            glowColor: '#ffffff',
            foodColor: '#38bdf8',
            foodGlow: '#ffffff',
            specialFoodColor: '#00f3ff',
            specialFoodGlow: '#ffffff',
            particleColors: ['#ffffff', '#cbd5e1', '#94a3b8', '#475569', '#1e293b']
        }
    };

    function hexToRgb(hex) {
        if (!hex || typeof hex !== 'string') return { r: 0, g: 255, b: 136 };
        if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
            const match = hex.match(/\d+/g);
            if (match && match.length >= 3) {
                return { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
            }
        }
        const cleanHex = hex.replace('#', '');
        let fullHex = cleanHex;
        if (cleanHex.length === 3) {
            fullHex = cleanHex.split('').map(c => c + c).join('');
        }
        const num = parseInt(fullHex, 16);
        if (isNaN(num)) return { r: 0, g: 255, b: 136 };
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    }

    function interpolateHexColors(col1, col2, factor) {
        const rgb1 = hexToRgb(col1);
        const rgb2 = hexToRgb(col2);
        const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
        const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
        const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function getAnimatedSkinColor(skin, index, time) {
        if (!skin) return '#00ff88';

        if (skin.isRainbow || skin.headColor === 'rainbow' || skin.bodyColor === 'rainbow') {
            const headHue = (time * 3) % 360;
            const bodyHue = (headHue - index * 15 + 360) % 360;
            return `hsl(${bodyHue}, 100%, 52%)`;
        }

        const baseColors = skin.bodyColors && skin.bodyColors.length > 0
            ? skin.bodyColors
            : [skin.headColor || '#00ff88', skin.bodyColor || '#00cc66'];

        if (baseColors.length === 1) return baseColors[0];

        const palette = [...baseColors];
        if (palette[0] !== palette[palette.length - 1]) {
            palette.push(palette[0]);
        }

        const speed = 0.08;
        const segOffset = 0.35;
        const totalCount = palette.length - 1;

        let pos = ((time * speed) - (index * segOffset)) % totalCount;
        if (pos < 0) pos += totalCount;

        const idx1 = Math.floor(pos);
        const idx2 = (idx1 + 1) % totalCount;
        const factor = pos - idx1;

        return interpolateHexColors(palette[idx1], palette[idx2], factor);
    }

    // ==========================================
    // TRAIL CONFIGURATION
    // ==========================================
    const TRAIL_CONFIG = {
        none: { id: 'none', name: 'Trail Yok', rarity: 'Common', price: 0, particleType: 'none', lifetime: 0, size: 0, color: 'transparent', desc: 'Sade izsiz görünüm.' },
        bubbles: { id: 'bubbles', name: 'Su Baloncukları', rarity: 'Common', price: 0, particleType: 'bubble', particleShape: 'bubble', lifetime: 500, size: 8, color: '#38bdf8', glowColor: '#7dd3fc', particleColors: ['#38bdf8', '#7dd3fc', '#bae6fd'], desc: 'Şeffaf akan su baloncukları.' },
        leaves: { id: 'leaves', name: 'Doğa Yaprakları', rarity: 'Rare', price: 600, particleType: 'leaf', particleShape: 'leaf', lifetime: 550, size: 8, color: '#22c55e', glowColor: '#86efac', particleColors: ['#22c55e', '#4ade80', '#15803d'], desc: 'Süzülen doğal yeşil yapraklar.' },
        fire: { id: 'fire', name: 'Ateş Alevi', rarity: 'Rare', price: 750, particleType: 'fire', particleShape: ['flame', 'pixel', 'cross_star'], lifetime: 450, size: 9, color: '#f97316', glowColor: '#ef4444', particleColors: ['#ff4500', '#ff8c00', '#ffd700'], desc: 'Kıvılcımlı ve kor parçacıklı ateş alevi.' },
        ice: { id: 'ice', name: 'Buz Kristali', rarity: 'Rare', price: 800, particleType: 'ice', particleShape: ['diamond', 'crystal', 'pixel'], lifetime: 500, size: 8, color: '#38bdf8', glowColor: '#a5f3fc', particleColors: ['#38bdf8', '#a5f3fc', '#e0f2fe'], desc: 'Dondurucu parıltılı kristal elmaslar.' },
        toxic: { id: 'toxic', name: 'Zehirli Baloncuk', rarity: 'Rare', price: 850, particleType: 'bubble', particleShape: 'bubble', lifetime: 500, size: 9, color: '#22c55e', glowColor: '#4ade80', particleColors: ['#22c55e', '#4ade80', '#86efac'], desc: 'Parıldayan yeşil zehirli baloncuklar.' },
        sparkles: { id: 'sparkles', name: 'Altın Işıltı', rarity: 'Rare', price: 900, particleType: 'sparkle', particleShape: ['cross_star', 'pixel', 'circle'], lifetime: 500, size: 8, color: '#f59e0b', glowColor: '#fef08a', particleColors: ['#fbbf24', '#fef08a', '#ffffff'], desc: 'Akan parıltılı altın cross yıldızlar.' },
        electric: { id: 'electric', name: 'Elektrik Şimşek', rarity: 'Epic', price: 1100, particleType: 'electric', particleShape: ['lightning', 'cross_star', 'pixel'], lifetime: 350, size: 8, color: '#00f3ff', glowColor: '#38bdf8', particleColors: ['#00f3ff', '#38bdf8', '#60a5fa'], desc: 'Yüksek voltajlı mavi şimşek çakmaları.' },
        stars: { id: 'stars', name: 'Altın Yıldız', rarity: 'Epic', price: 1250, particleType: 'star', particleShape: ['star', 'cross_star'], lifetime: 600, size: 9, color: '#ffd700', glowColor: '#ffe866', particleColors: ['#ffd700', '#fef08a', '#ffffff'], desc: 'Işıltılı altın yıldızlar ve parıltı izi.' },
        hearts: { id: 'hearts', name: 'Pixel Kalpler', rarity: 'Epic', price: 1400, particleType: 'heart', particleShape: ['heart', 'pixel'], lifetime: 550, size: 8, color: '#f43f5e', glowColor: '#fda4af', particleColors: ['#f43f5e', '#ff2a55', '#f472b6'], desc: 'Akan romantik retro piksel kalpler.' },
        rainbow: { id: 'rainbow', name: 'Gökkuşağı Pixel', rarity: 'Epic', price: 1500, particleType: 'pixel', particleShape: 'pixel', lifetime: 550, size: 8, color: 'rainbow', glowColor: '#00f3ff', desc: 'Rengarenk akan retro piksel küpleri.' },
        cyber: { id: 'cyber', name: 'Cyber Küpler', rarity: 'Epic', price: 1650, particleType: 'pixel', particleShape: 'pixel', lifetime: 500, size: 8, color: '#d946ef', glowColor: '#00f3ff', particleColors: ['#d946ef', '#00f3ff', '#facc15', '#a855f7'], desc: 'Siberpunk neon kare ve küp izi.' },
        shadow: { id: 'shadow', name: 'Karanlık Boşluk', rarity: 'Legendary', price: 2000, particleType: 'shadow', particleShape: ['void', 'square', 'circle'], lifetime: 600, size: 10, color: '#a855f7', glowColor: '#a855f7', particleColors: ['#a855f7', '#3b0764', '#c084fc', '#38bdf8'], desc: 'Gizemli mor aura ve karanlık madde.' },
        magic: { id: 'magic', name: 'Büyülü Yıldızlar', rarity: 'Legendary', price: 2200, particleType: 'magic', particleShape: ['cross_star', 'star', 'pixel'], lifetime: 600, size: 9, color: '#a855f7', glowColor: '#00f3ff', particleColors: ['#a855f7', '#c084fc', '#00f3ff', '#ffffff'], desc: 'Retro büyülü mor ve turkuaz piksel yıldızları.' },
        cosmic: { id: 'cosmic', name: 'Kozmik Galaksi', rarity: 'Legendary', price: 2500, particleType: 'star', particleShape: ['star', 'circle', 'cross_star'], lifetime: 650, size: 9, color: '#c084fc', glowColor: '#818cf8', particleColors: ['#c084fc', '#818cf8', '#38bdf8', '#ffffff'], desc: 'Mor ve mavi galaksi tozu ile yıldız kümesi.' }
    };

    // ==========================================
    // VISUAL EFFECT SETTINGS & CONFIG
    // ==========================================
    const EffectSettings = {
        settings: {
            effectsEnabled: true,
            particlesEnabled: true,
            trailsEnabled: true,
            screenShakeEnabled: true,
            effectQuality: 'medium'
        },
        init() {
            try {
                const saved = localStorage.getItem('snake_visual_settings');
                if (saved) {
                    this.settings = { ...this.settings, ...JSON.parse(saved) };
                }
            } catch(e) {}
        },
        save() {
            localStorage.setItem('snake_visual_settings', JSON.stringify(this.settings));
        },
        getMaxParticles() {
            if (!this.settings.particlesEnabled || !this.settings.effectsEnabled) return 0;
            if (this.settings.effectQuality === 'low') return 50;
            if (this.settings.effectQuality === 'high') return 300;
            return 150;
        },
        getMaxTrailPoints() {
            if (!this.settings.trailsEnabled || !this.settings.effectsEnabled) return 0;
            if (this.settings.effectQuality === 'low') return 10;
            if (this.settings.effectQuality === 'high') return 40;
            return 20;
        }
    };

    // ==========================================
    // SCREEN EFFECT MANAGER
    // ==========================================
    const ScreenEffectManager = {
        shakeOffsetX: 0,
        shakeOffsetY: 0,
        flashColor: null,
        flashAlpha: 0,

        update(dt) {},

        shake(intensity = 'medium', duration = 300) {
            if (!EffectSettings.settings.screenShakeEnabled || !EffectSettings.settings.effectsEnabled) return;
            const mag = (intensity === 'large' || intensity === 'heavy') ? 8 : ((intensity === 'small' || intensity === 'light') ? 3 : 5);
            const startTime = Date.now();
            const doShake = () => {
                const elapsed = Date.now() - startTime;
                if (elapsed < duration) {
                    const damping = 1 - (elapsed / duration);
                    this.shakeOffsetX = (Math.random() * 2 - 1) * mag * damping;
                    this.shakeOffsetY = (Math.random() * 2 - 1) * mag * damping;
                    requestAnimationFrame(doShake);
                } else {
                    this.shakeOffsetX = 0;
                    this.shakeOffsetY = 0;
                }
            };
            doShake();
        },

        flash(type = 'gold') {
            if (!EffectSettings.settings.effectsEnabled) return;
            const colors = {
                white: 'rgba(255, 255, 255, 0.4)',
                gold: 'rgba(250, 204, 21, 0.4)',
                red: 'rgba(239, 68, 68, 0.4)',
                blue: 'rgba(56, 189, 248, 0.4)',
                rainbow: 'rgba(168, 85, 247, 0.4)'
            };
            this.flashColor = colors[type] || colors.gold;
            this.flashAlpha = 0.4;
            const fade = () => {
                this.flashAlpha -= 0.04;
                if (this.flashAlpha > 0) {
                    requestAnimationFrame(fade);
                } else {
                    this.flashAlpha = 0;
                    this.flashColor = null;
                }
            };
            fade();
        },

        drawFlash(ctx, width, height) {
            if (this.flashAlpha > 0 && this.flashColor) {
                ctx.save();
                ctx.fillStyle = this.flashColor.replace('0.4', this.flashAlpha.toFixed(2));
                ctx.fillRect(0, 0, width, height);
                ctx.restore();
            }
        }
    };

    // ==========================================
    // PARTICLE MANAGER (Object Pooling)
    // ==========================================
    class PooledParticle {
        constructor() {
            this.reset();
        }
        reset() {
            this.active = false;
            this.x = 0; this.y = 0;
            this.vx = 0; this.vy = 0;
            this.life = 0; this.maxLife = 1;
            this.size = 2; this.startSize = 2;
            this.color = '#ffffff';
            this.shape = 'circle';
            this.opacity = 1;
            this.gravity = 0;
            this.rotation = 0;
            this.rotSpeed = 0;
            this.glow = null;
        }
    }

    const ParticleManager = {
        pool: [],
        activeParticles: [],

        init() {
            for (let i = 0; i < 300; i++) {
                this.pool.push(new PooledParticle());
            }
        },

        getParticle() {
            if (this.activeParticles.length >= EffectSettings.getMaxParticles()) {
                return null;
            }
            let p = this.pool.pop();
            if (!p) p = new PooledParticle();
            p.reset();
            p.active = true;
            this.activeParticles.push(p);
            return p;
        },

        recycleParticle(index) {
            const p = this.activeParticles[index];
            p.active = false;
            this.activeParticles.splice(index, 1);
            this.pool.push(p);
        },

        spawnParticle(type, pos, options = {}) {
            if (!EffectSettings.settings.particlesEnabled || !EffectSettings.settings.effectsEnabled) return;
            const p = this.getParticle();
            if (!p) return;

            p.x = pos.x;
            p.y = pos.y;
            p.color = options.color || '#ffffff';
            p.shape = options.shape || 'circle';
            p.size = options.size || (Math.random() * 4 + 2);
            p.startSize = p.size;
            p.maxLife = options.lifetime || (Math.random() * 300 + 300);
            p.life = p.maxLife;
            p.vx = options.vx !== undefined ? options.vx : (Math.random() * 2 - 1);
            p.vy = options.vy !== undefined ? options.vy : (Math.random() * 2 - 1);
            p.gravity = options.gravity || 0;
            p.rotSpeed = options.rotSpeed || (Math.random() * 0.1 - 0.05);
            p.glow = options.glow || null;
        },

        spawnParticles(type, count, pos, options = {}) {
            if (!EffectSettings.settings.particlesEnabled || !EffectSettings.settings.effectsEnabled) return;
            for (let i = 0; i < count; i++) {
                let opts = { ...options };
                if (type === 'food_eat') {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 2.5 + 1;
                    opts.vx = Math.cos(angle) * speed;
                    opts.vy = Math.sin(angle) * speed;
                    opts.color = options.color || '#22c55e';
                    opts.lifetime = Math.random() * 200 + 200;
                    opts.size = Math.random() * 4 + 2;
                    opts.shape = 'circle';
                } else if (type === 'special_food') {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 4 + 2;
                    opts.vx = Math.cos(angle) * speed;
                    opts.vy = Math.sin(angle) * speed;
                    opts.color = options.color || '#eab308';
                    opts.glow = opts.color;
                    opts.lifetime = Math.random() * 350 + 350;
                    opts.size = Math.random() * 6 + 3;
                    opts.shape = 'star';
                } else if (type === 'coin_burst') {
                    const angle = (Math.random() * 0.8 + 0.1) * -Math.PI;
                    const speed = Math.random() * 3 + 2;
                    opts.vx = Math.cos(angle) * speed;
                    opts.vy = Math.sin(angle) * speed;
                    opts.color = '#eab308';
                    opts.glow = '#eab308';
                    opts.gravity = 0.15;
                    opts.lifetime = Math.random() * 400 + 400;
                    opts.size = Math.random() * 5 + 4;
                    opts.shape = 'square';
                } else if (type === 'confetti' || type === 'level_up') {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 5 + 2;
                    const hues = [0, 60, 120, 180, 240, 300];
                    opts.color = `hsl(${hues[Math.floor(Math.random() * hues.length)]}, 100%, 60%)`;
                    opts.vx = Math.cos(angle) * speed;
                    opts.vy = Math.sin(angle) * speed;
                    opts.gravity = 0.08;
                    opts.lifetime = Math.random() * 600 + 400;
                    opts.size = Math.random() * 6 + 3;
                    opts.shape = Math.random() > 0.5 ? 'star' : 'square';
                } else if (type === 'death_burst') {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 3.5 + 0.5;
                    opts.vx = Math.cos(angle) * speed;
                    opts.vy = Math.sin(angle) * speed;
                    opts.color = options.color || '#ef4444';
                    opts.lifetime = Math.random() * 500 + 300;
                    opts.size = Math.random() * 5 + 2;
                    opts.shape = 'circle';
                }
                this.spawnParticle(type, pos, opts);
            }
        },

        createExplosion(pos, color = '#ff0055', count = 20) {
            this.spawnParticles('food_eat', count, pos, { color: color });
        },

        createGlow(pos, color = '#00f3ff') {
            this.spawnParticle('glow', pos, { color, size: 12, lifetime: 300, shape: 'circle', glow: color });
        },

        clearEffects() {
            for (let i = this.activeParticles.length - 1; i >= 0; i--) {
                this.recycleParticle(i);
            }
        },

        update(dt) {
            for (let i = this.activeParticles.length - 1; i >= 0; i--) {
                const p = this.activeParticles[i];
                p.life -= dt;
                if (p.life <= 0) {
                    this.recycleParticle(i);
                    continue;
                }
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rotation += p.rotSpeed;
                const lifeRatio = p.life / p.maxLife;
                p.opacity = Math.max(0, lifeRatio);
                p.size = p.startSize * (0.3 + 0.7 * lifeRatio);
            }
        },

        draw(ctx) {
            if (this.activeParticles.length === 0) return;
            ctx.save();
            for (let i = 0; i < this.activeParticles.length; i++) {
                const p = this.activeParticles[i];
                ctx.globalAlpha = p.opacity;
                if (p.glow) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = p.glow;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === 'square' || p.shape === 'pixel') {
                    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                } else if (p.shape === 'star') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.beginPath();
                    for (let s = 0; s < 5; s++) {
                        ctx.lineTo(Math.cos((18 + s * 72) * Math.PI / 180) * p.size, -Math.sin((18 + s * 72) * Math.PI / 180) * p.size);
                        ctx.lineTo(Math.cos((54 + s * 72) * Math.PI / 180) * (p.size * 0.4), -Math.sin((54 + s * 72) * Math.PI / 180) * (p.size * 0.4));
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'cross_star' || p.shape === 'sparkle') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.beginPath();
                    const inner = p.size * 0.25;
                    for (let s = 0; s < 4; s++) {
                        const a1 = (s * 90) * Math.PI / 180;
                        const a2 = (s * 90 + 45) * Math.PI / 180;
                        ctx.lineTo(Math.cos(a1) * p.size, Math.sin(a1) * p.size);
                        ctx.lineTo(Math.cos(a2) * inner, Math.sin(a2) * inner);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'diamond' || p.shape === 'crystal') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    const w = p.size * 0.7;
                    const h = p.size * 1.3;
                    ctx.beginPath();
                    ctx.moveTo(0, -h); ctx.lineTo(w, 0); ctx.lineTo(0, h); ctx.lineTo(-w, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.beginPath();
                    ctx.moveTo(0, -h); ctx.lineTo(w * 0.5, 0); ctx.lineTo(0, h * 0.3);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'lightning') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    const s = p.size * 0.8;
                    ctx.beginPath();
                    ctx.moveTo(s * 0.2, -s); ctx.lineTo(-s * 0.5, 0); ctx.lineTo(0, 0);
                    ctx.lineTo(-s * 0.3, s); ctx.lineTo(s * 0.6, -s * 0.2); ctx.lineTo(0.1, -s * 0.2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'flame') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    const s = p.size;
                    ctx.beginPath();
                    ctx.moveTo(0, -s);
                    ctx.quadraticCurveTo(s * 0.8, -s * 0.2, s * 0.5, s * 0.5);
                    ctx.quadraticCurveTo(0, s, -s * 0.5, s * 0.5);
                    ctx.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#ffe600';
                    ctx.beginPath();
                    ctx.moveTo(0, -s * 0.5);
                    ctx.quadraticCurveTo(s * 0.4, 0, s * 0.3, s * 0.4);
                    ctx.quadraticCurveTo(0, s * 0.7, -s * 0.3, s * 0.4);
                    ctx.quadraticCurveTo(-s * 0.4, 0, 0, -s * 0.5);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'bubble') {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = Math.max(1, p.size * 0.25);
                    ctx.stroke();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.beginPath();
                    ctx.arc(p.x - p.size * 0.35, p.y - p.size * 0.35, Math.max(0.6, p.size * 0.22), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'heart') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    const s = p.size * 0.7;
                    ctx.beginPath();
                    ctx.moveTo(0, s * 0.3);
                    ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.5, 0, s * 1.3);
                    ctx.bezierCurveTo(s * 1.2, s * 0.5, s, -s * 0.6, 0, s * 0.3);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                } else if (p.shape === 'leaf') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    const s = p.size;
                    ctx.beginPath();
                    ctx.moveTo(0, -s);
                    ctx.quadraticCurveTo(s * 0.9, -s * 0.2, 0, s);
                    ctx.quadraticCurveTo(-s * 0.9, -s * 0.2, 0, -s);
                    ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, -s * 0.8); ctx.lineTo(0, s * 0.8);
                    ctx.stroke();
                    ctx.restore();
                } else if (p.shape === 'void') {
                    ctx.save();
                    const s = p.size;
                    ctx.fillStyle = '#0f051d';
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.rect(p.x - s / 2, p.y - s / 2, s, s);
                    ctx.fill(); ctx.stroke();
                    ctx.restore();
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();
        }
    };

    // ==========================================
    // TRAIL MANAGER
    // ==========================================
    const TrailManager = {
        trailPoints: [],
        equippedTrailId: 'glow',

        init() {
            const saved = localStorage.getItem('snake_equipped_trail');
            if (saved && TRAIL_CONFIG[saved]) {
                this.equippedTrailId = saved;
            } else {
                this.equippedTrailId = 'glow';
            }
        },

        setTrail(trailId) {
            if (TRAIL_CONFIG[trailId]) {
                this.equippedTrailId = trailId;
                localStorage.setItem('snake_equipped_trail', trailId);
            }
        },

        getCurrentTrailId() {
            if (this.equippedTrailId === 'default' || !this.equippedTrailId) {
                const currentSkin = SKINS[selectedSkin] || SKINS.classic;
                return currentSkin.defaultTrailId || 'glow';
            }
            return this.equippedTrailId;
        },

        getCurrentTrail() {
            const id = this.getCurrentTrailId();
            return TRAIL_CONFIG[id] || TRAIL_CONFIG.glow;
        },

        enableTrail() { EffectSettings.settings.trailsEnabled = true; EffectSettings.save(); },
        disableTrail() { EffectSettings.settings.trailsEnabled = false; EffectSettings.save(); },

        clearTrail() {
            this.trailPoints = [];
        },

        updateTrail(headPixelPos) {
            if (!EffectSettings.settings.trailsEnabled || !EffectSettings.settings.effectsEnabled) {
                this.trailPoints = [];
                return;
            }
            const trail = this.getCurrentTrail();
            if (!trail || trail.id === 'none') {
                this.trailPoints = [];
                return;
            }

            const maxPoints = EffectSettings.getMaxTrailPoints();
            const now = Date.now();

            this.trailPoints.unshift({
                x: headPixelPos.x,
                y: headPixelPos.y,
                time: now
            });

            while (this.trailPoints.length > maxPoints) {
                this.trailPoints.pop();
            }
            for (let i = this.trailPoints.length - 1; i >= 0; i--) {
                if (now - this.trailPoints[i].time > trail.lifetime) {
                    this.trailPoints.splice(i, 1);
                }
            }

            if (Math.random() < 0.75) {
                const pType = trail.particleType;
                let color = trail.color;
                if (color === 'rainbow') {
                    const rainbowHues = [0, 30, 60, 120, 180, 240, 280, 320];
                    color = `hsl(${rainbowHues[Math.floor(Math.random() * rainbowHues.length)]}, 100%, 60%)`;
                }

                let shape = trail.particleShape || 'circle';
                if (Array.isArray(shape)) {
                    shape = shape[Math.floor(Math.random() * shape.length)];
                }

                let particleColor = color;
                if (trail.particleColors && Array.isArray(trail.particleColors)) {
                    particleColor = trail.particleColors[Math.floor(Math.random() * trail.particleColors.length)];
                }

                ParticleManager.spawnParticle(pType, {
                    x: headPixelPos.x + (Math.random() * 12 - 6),
                    y: headPixelPos.y + (Math.random() * 12 - 6)
                }, {
                    color: particleColor,
                    shape: shape,
                    size: (trail.size || 8) * (0.5 + Math.random() * 0.7),
                    lifetime: (trail.lifetime || 400) * 0.7,
                    vx: (Math.random() * 1.4 - 0.7),
                    vy: (Math.random() * 1.4 - 0.7) + (pType === 'fire' || pType === 'bubble' || pType === 'leaf' ? -0.8 : 0),
                    rotSpeed: (Math.random() * 0.2 - 0.1),
                    glow: (trail.glowColor || particleColor)
                });
            }
        },

        drawTrail(ctx) {
            if (this.trailPoints.length < 2) return;
            const trail = this.getCurrentTrail();
            if (!trail || trail.id === 'none') return;

            ctx.save();
            const now = Date.now();
            const maxTeleportDist = (typeof tileSize !== 'undefined' ? tileSize : 20) * 2.5;

            for (let i = 0; i < this.trailPoints.length - 1; i++) {
                const p1 = this.trailPoints[i];
                const p2 = this.trailPoints[i + 1];

                // Skip drawing line segment across board if snake wrapped around wall
                if (Math.abs(p1.x - p2.x) > maxTeleportDist || Math.abs(p1.y - p2.y) > maxTeleportDist) {
                    continue;
                }

                const age = now - p1.time;
                const progress = 1 - Math.min(1, age / trail.lifetime);

                ctx.globalAlpha = Math.max(0, progress * 0.6);
                ctx.lineWidth = Math.max(1, trail.size * progress);
                ctx.lineCap = 'round';

                let col = trail.color;
                if (col === 'rainbow') {
                    col = `hsl(${((now / 10) - i * 15) % 360}, 100%, 60%)`;
                }

                ctx.strokeStyle = col;
                if (trail.particleType === 'glow' || trail.particleType === 'pixel' || trail.id === 'rainbow') {
                    ctx.shadowBlur = 10 * progress;
                    ctx.shadowColor = col;
                }

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
            ctx.restore();
        },

        getAvailableTrails() {
            return Object.values(TRAIL_CONFIG);
        }
    };

    // ==========================================
    // CENTRALIZED EFFECT MANAGER
    // ==========================================
    const EffectManager = {
        init() {
            EffectSettings.init();
            ParticleManager.init();
            TrailManager.init();
        },

        playEffect(effectId, pos = { x: 0, y: 0 }) {
            if (!EffectSettings.settings.effectsEnabled) return;
            switch(effectId) {
                case 'food_eat':
                    ParticleManager.spawnParticles('food_eat', 8, pos);
                    break;
                case 'special_food':
                    ParticleManager.spawnParticles('special_food', 18, pos);
                    ScreenEffectManager.shake('small', 200);
                    ScreenEffectManager.flash('gold');
                    break;
                case 'powerup':
                    ParticleManager.spawnParticles('special_food', 15, pos, { color: '#38bdf8' });
                    ScreenEffectManager.flash('blue');
                    break;
                case 'coin':
                    ParticleManager.spawnParticles('coin_burst', 10, pos);
                    break;
                case 'level_up':
                    ParticleManager.spawnParticles('level_up', 40, pos);
                    ScreenEffectManager.shake('medium', 400);
                    ScreenEffectManager.flash('rainbow');
                    break;
                case 'new_record':
                    ParticleManager.spawnParticles('confetti', 50, pos);
                    ScreenEffectManager.shake('small', 300);
                    ScreenEffectManager.flash('gold');
                    break;
                case 'game_over':
                    ParticleManager.spawnParticles('death_burst', 25, pos);
                    ScreenEffectManager.shake('medium', 500);
                    ScreenEffectManager.flash('red');
                    break;
            }
        },

        spawnParticle(type, pos, options) { ParticleManager.spawnParticle(type, pos, options); },
        spawnParticles(type, count, pos, options) { ParticleManager.spawnParticles(type, count, pos, options); },
        createExplosion(pos, color, count) { ParticleManager.createExplosion(pos, color, count); },
        createGlow(pos, color) { ParticleManager.createGlow(pos, color); },
        createFlash(type) { ScreenEffectManager.flash(type); },
        clearEffects() { ParticleManager.clearEffects(); TrailManager.clearTrail(); },

        setEffectsEnabled(val) { EffectSettings.settings.effectsEnabled = val; EffectSettings.save(); },
        isEffectsEnabled() { return EffectSettings.settings.effectsEnabled; },
        setEffectQuality(quality) { EffectSettings.settings.effectQuality = quality; EffectSettings.save(); },

        // Event hooks
        onFoodEaten(pos, isSpecial) {
            if (isSpecial) {
                this.playEffect('special_food', pos);
                AudioManager.playSound('special_food');
                VibrationManager.medium();
            } else {
                this.playEffect('food_eat', pos);
                AudioManager.playSound('food_eat');
                VibrationManager.light();
            }
        },

        onPowerUpCollected(pos, type) {
            this.playEffect('powerup', pos);
            AudioManager.playSound('powerup_collect');
            VibrationManager.medium();
        },

        onCoinEarned(amount, pos) {
            if (pos) this.playEffect('coin', pos);
            AudioManager.playSound('coin_collect');
        },

        onLevelUp(newLevel) {
            const center = { x: canvasWidth / 2, y: canvasHeight / 2 };
            this.playEffect('level_up', center);
            AudioManager.playSound('level_up');
            VibrationManager.success();
        },

        onAchievementUnlocked() {
            const center = { x: canvasWidth / 2, y: canvasHeight / 2 };
            this.playEffect('new_record', center);
            AudioManager.playSound('achievement_unlock');
            VibrationManager.success();
        },

        onNewRecord() {
            const center = { x: canvasWidth / 2, y: canvasHeight / 2 };
            this.playEffect('new_record', center);
            AudioManager.playSound('new_record');
            VibrationManager.success();
        },

        onGameOver(headPos) {
            const p = headPos || { x: canvasWidth / 2, y: canvasHeight / 2 };
            this.playEffect('game_over', p);
        }
    };

    // UI THEMES Data
    const THEMES = [
        { id: 'dark', name: '🌙 Koyu Neon', desc: 'Siyah ve koyu mavi modern neon', price: 0, bg: '#090c14', accent: '#00f3ff', icon: '🌙' },
        { id: 'light', name: '☀️ Açık Neon', desc: 'Aydınlık ve ferah görünüm', price: 0, bg: '#1e293b', accent: '#0284c7', icon: '☀️' },
        { id: 'neon', name: '🔮 Cyber Neon', desc: 'Derin mor ve yüksek parlaklık', price: 500, bg: '#130924', accent: '#d946ef', icon: '🔮' }
    ];

    // MAPS Configuration Data
    const MAPS = {
        classic: {
            id: 'classic',
            name: 'Klasik Saha',
            icon: 'map_icon_classic.svg',
            desc: 'Klasik engelsiz standart oyun alanı (1.0x Coin)',
            difficulty: 'ZORLUK: KOLAY',
            coinMultiplier: 1.0,
            price: 0,
            unlocked: true,
            bgStyle: 'classic',
            gridColor: 'rgba(255, 255, 255, 0.03)',
            obstacles: []
        },
        desert: {
            id: 'desert',
            name: 'Çöl Arenası',
            icon: 'map_icon_desert.svg',
            desc: 'Sıcak kumlu çöl ve kaya engelleri (1.2x Coin)',
            difficulty: 'ZORLUK: KOLAY',
            coinMultiplier: 1.2,
            price: 0,
            unlocked: true,
            bgStyle: 'desert',
            bgColor: '#1c160e',
            gridColor: 'rgba(255, 180, 50, 0.06)',
            obstacleType: 'rock',
            obstacles: [
                { x: 4, y: 4 }, { x: 5, y: 4 },
                { x: 14, y: 4 }, { x: 15, y: 4 },
                { x: 4, y: 15 }, { x: 5, y: 15 },
                { x: 14, y: 15 }, { x: 15, y: 15 }
            ]
        },
        forest: {
            id: 'forest',
            name: 'Orman Bölgesi',
            icon: 'map_icon_forest.svg',
            desc: 'Doğal ağaç ve çalı engelleri (1.5x Coin)',
            difficulty: 'ZORLUK: ORTA',
            coinMultiplier: 1.5,
            price: 300,
            unlocked: false,
            bgStyle: 'forest',
            bgColor: '#0c1a12',
            gridColor: 'rgba(50, 255, 120, 0.05)',
            obstacleType: 'tree',
            obstacles: [
                { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 },
                { x: 13, y: 6 }, { x: 14, y: 6 }, { x: 15, y: 6 },
                { x: 4, y: 13 }, { x: 5, y: 13 }, { x: 6, y: 13 },
                { x: 13, y: 13 }, { x: 14, y: 13 }, { x: 15, y: 13 }
            ]
        },
        ice: {
            id: 'ice',
            name: 'Buz Sektörü',
            icon: 'map_icon_ice.svg',
            desc: 'Buzlu zemin ve dondurucu bloklar (1.8x Coin)',
            difficulty: 'ZORLUK: ORTA',
            coinMultiplier: 1.8,
            price: 500,
            unlocked: false,
            bgStyle: 'ice',
            bgColor: '#081326',
            gridColor: 'rgba(0, 243, 255, 0.07)',
            obstacleType: 'ice',
            obstacles: [
                { x: 3, y: 3 }, { x: 16, y: 3 },
                { x: 3, y: 16 }, { x: 16, y: 16 },
                { x: 9, y: 4 }, { x: 10, y: 4 },
                { x: 9, y: 15 }, { x: 10, y: 15 },
                { x: 4, y: 9 }, { x: 4, y: 10 },
                { x: 15, y: 9 }, { x: 15, y: 10 }
            ]
        },
        cyber: {
            id: 'cyber',
            name: 'Siber Şehir',
            icon: 'map_icon_cyber.svg',
            desc: 'Neon dijital duvarlar ve fütüristik şehir (2.2x Coin)',
            difficulty: 'ZORLUK: ZOR',
            coinMultiplier: 2.2,
            price: 800,
            unlocked: false,
            bgStyle: 'cyber',
            bgColor: '#140824',
            gridColor: 'rgba(255, 0, 255, 0.08)',
            obstacleType: 'cyber',
            obstacles: [
                { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 },
                { x: 16, y: 11 }, { x: 16, y: 12 }, { x: 16, y: 13 }, { x: 16, y: 14 },
                { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
                { x: 10, y: 16 }, { x: 11, y: 16 }, { x: 12, y: 16 }, { x: 13, y: 16 }
            ]
        },
        maze: {
            id: 'maze',
            name: 'Labirent Matrisi',
            icon: 'map_icon_maze.svg',
            desc: 'Dar koridorlu akıl dolu labirent (2.5x Coin)',
            difficulty: 'ZORLUK: ZOR',
            coinMultiplier: 2.5,
            price: 1500,
            unlocked: false,
            bgStyle: 'maze',
            bgColor: '#0d1117',
            gridColor: 'rgba(0, 180, 255, 0.08)',
            obstacleType: 'maze',
            obstacles: [
                { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
                { x: 12, y: 3 }, { x: 13, y: 3 }, { x: 14, y: 3 }, { x: 15, y: 3 },
                { x: 4, y: 16 }, { x: 5, y: 16 }, { x: 6, y: 16 }, { x: 7, y: 16 },
                { x: 12, y: 16 }, { x: 13, y: 16 }, { x: 14, y: 16 }, { x: 15, y: 16 },
                { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 },
                { x: 3, y: 11 }, { x: 3, y: 12 }, { x: 3, y: 13 },
                { x: 16, y: 6 }, { x: 16, y: 7 }, { x: 16, y: 8 },
                { x: 16, y: 11 }, { x: 16, y: 12 }, { x: 16, y: 13 }
            ]
        }
    };

    // Central Coin Manager
    const CoinManager = {
        isUnlimited() {
            return localStorage.getItem('snake_unlimited_coins') === 'true';
        },
        toggleUnlimited() {
            const state = !this.isUnlimited();
            localStorage.setItem('snake_unlimited_coins', state ? 'true' : 'false');
            updateAllCoinDisplays();
            return state;
        },
        getCoins() {
            if (this.isUnlimited()) return 999999;
            const val = localStorage.getItem('snake_coins');
            if (val === null) {
                localStorage.setItem('snake_coins', 100);
                return 100;
            }
            const num = parseInt(val, 10);
            return isNaN(num) ? 100 : num;
        },
        setCoins(amount) {
            const safe = Math.max(0, amount);
            localStorage.setItem('snake_coins', safe);
            updateAllCoinDisplays();
            return safe;
        },
        addCoins(amount) {
            if (this.isUnlimited()) return 999999;
            if (amount <= 0) return this.getCoins();
            const updated = this.setCoins(this.getCoins() + amount);
            showCoinToast(`+${amount} COIN`, false);
            return updated;
        },
        removeCoins(amount) {
            if (this.isUnlimited()) {
                showCoinToast(`-${amount} COIN (Sınırsız)`, true);
                return true;
            }
            const current = this.getCoins();
            if (current < amount) return false;
            const updated = this.setCoins(current - amount);
            showCoinToast(`-${amount} COIN`, true);
            return true;
        },
        canAfford(amount) {
            if (this.isUnlimited()) return true;
            return this.getCoins() >= amount;
        }
    };

    // Central Inventory Manager
    const InventoryManager = {
        getOwnedSkins() {
            try {
                const list = JSON.parse(localStorage.getItem('snake_owned_skins'));
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {}
            let legacyUnlocked = [];
            try {
                legacyUnlocked = JSON.parse(localStorage.getItem('snake_unlocked_skins') || '[]');
            } catch (e) {}
            const defaults = Array.from(new Set(['classic', 'neon', ...legacyUnlocked]));
            localStorage.setItem('snake_owned_skins', JSON.stringify(defaults));
            return defaults;
        },
        isSkinOwned(skinId) {
            const skin = SKINS[skinId];
            if (skin && skin.price === 0) return true;
            return this.getOwnedSkins().includes(skinId);
        },
        addSkin(skinId) {
            const list = this.getOwnedSkins();
            if (!list.includes(skinId)) {
                list.push(skinId);
                localStorage.setItem('snake_owned_skins', JSON.stringify(list));
            }
        },

        getOwnedMaps() {
            try {
                const list = JSON.parse(localStorage.getItem('snake_owned_maps'));
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {}
            let legacyUnlocked = [];
            try {
                legacyUnlocked = JSON.parse(localStorage.getItem('snake_unlocked_maps') || '[]');
            } catch (e) {}
            const defaults = Array.from(new Set(['classic', 'desert', ...legacyUnlocked]));
            localStorage.setItem('snake_owned_maps', JSON.stringify(defaults));
            return defaults;
        },
        isMapOwned(mapId) {
            const map = MAPS[mapId];
            if (map && map.price === 0) return true;
            return this.getOwnedMaps().includes(mapId);
        },
        addMap(mapId) {
            const list = this.getOwnedMaps();
            if (!list.includes(mapId)) {
                list.push(mapId);
                localStorage.setItem('snake_owned_maps', JSON.stringify(list));
            }
        },
        getMapCoinMultiplier() {
            const owned = this.getOwnedMaps();
            const count = owned.length;
            const currentMapObj = MAPS[selectedMap] || MAPS.classic;
            const baseMult = currentMapObj.coinMultiplier || 1.0;
            const ownershipBonus = Math.max(0, count - 1) * 0.15;
            return Number((baseMult + ownershipBonus).toFixed(2));
        },

        getOwnedThemes() {
            try {
                const list = JSON.parse(localStorage.getItem('snake_owned_themes'));
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {}
            const defaults = ['dark', 'light'];
            localStorage.setItem('snake_owned_themes', JSON.stringify(defaults));
            return defaults;
        },
        isThemeOwned(themeId) {
            const theme = THEMES.find(t => t.id === themeId);
            if (theme && theme.price === 0) return true;
            return this.getOwnedThemes().includes(themeId);
        },
        addTheme(themeId) {
            const list = this.getOwnedThemes();
            if (!list.includes(themeId)) {
                list.push(themeId);
                localStorage.setItem('snake_owned_themes', JSON.stringify(list));
            }
        },

        getOwnedTrails() {
            try {
                const list = JSON.parse(localStorage.getItem('snake_owned_trails'));
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {}
            const defaults = ['none', 'glow'];
            localStorage.setItem('snake_owned_trails', JSON.stringify(defaults));
            return defaults;
        },
        isTrailOwned(trailId) {
            const trail = TRAIL_CONFIG[trailId];
            if (trail && trail.price === 0) return true;
            return this.getOwnedTrails().includes(trailId);
        },
        addTrail(trailId) {
            const list = this.getOwnedTrails();
            if (!list.includes(trailId)) {
                list.push(trailId);
                localStorage.setItem('snake_owned_trails', JSON.stringify(list));
            }
        },

        getOwnedAccessories() {
            try {
                const list = JSON.parse(localStorage.getItem('snake_owned_accessories'));
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {}
            const defaults = ['none'];
            localStorage.setItem('snake_owned_accessories', JSON.stringify(defaults));
            return defaults;
        },
        isAccessoryOwned(accessoryId) {
            if (accessoryId === 'none' || accessoryId === 'none_glasses') return true;
            const acc = ACCESSORY_CONFIG[accessoryId];
            if (acc && acc.price === 0 && acc.unlockType === 'shop') return true;
            return this.getOwnedAccessories().includes(accessoryId);
        },
        addAccessory(accessoryId) {
            const list = this.getOwnedAccessories();
            if (!list.includes(accessoryId)) {
                list.push(accessoryId);
                localStorage.setItem('snake_owned_accessories', JSON.stringify(list));
            }
        }
    };

    // SNAKE ACCESSORIES CONFIGURATION
    const ACCESSORY_CATEGORIES = [
        { id: 'all', name: 'Tümü', icon: '✨' },
        { id: 'hat', name: 'Şapkalar', icon: '🎩' },
        { id: 'glasses', name: 'Gözlükler', icon: '🕶️' },
        { id: 'bows', name: 'Kelebek / Papyon', icon: '🎀' },
        { id: 'crowns', name: 'Taçlar', icon: '👑' },
        { id: 'caps', name: 'Kasketler', icon: '🧢' },
        { id: 'masks', name: 'Maskeler', icon: '🎭' },
        { id: 'headphones', name: 'Kulaklıklar', icon: '🎧' },
        { id: 'special', name: 'Özel', icon: '🎓' }
    ];

    const ACCESSORY_SVG_FILES = {
        classic_top_hat: 'acc_top_hat.svg',
        baseball_cap: 'acc_baseball_cap.svg',
        wizard_hat: 'acc_wizard_hat.svg',
        cowboy_hat: 'acc_cowboy_hat.svg',
        santa_hat: 'acc_santa_hat.svg',
        graduation_cap: 'acc_graduation_cap.svg',
        alien_antenna: 'acc_alien_antenna.svg',
        crown: 'acc_king_crown.svg',
        golden_crown: 'acc_imperial_crown.svg',
        glass_cool: 'acc_glass_cool.svg',
        glass_round: 'acc_glass_round.svg',
        glass_nerd: 'acc_glass_nerd.svg',
        glass_pixel: 'acc_glass_pixel.svg',
        glass_cyber: 'acc_glass_cyber.svg',
        glass_red_shutter: 'acc_glass_red_shutter.svg',
        glass_blue_shutter: 'acc_glass_blue_shutter.svg',
        glass_gold: 'acc_glass_gold.svg',
        glass_heart: 'acc_glass_heart.svg',
        glass_star: 'acc_glass_star.svg',
        glass_steampunk: 'acc_glass_steampunk.svg',
        glass_aviator: 'acc_glass_aviator.svg',
        glass_cosmic: 'acc_glass_cosmic.svg',
        glass_rainbow: 'acc_glass_rainbow.svg'
    };

    const ACCESSORY_IMAGES = {};
    function preloadAccessoryImages() {
        for (const id in ACCESSORY_SVG_FILES) {
            const img = new Image();
            img.src = ACCESSORY_SVG_FILES[id];
            ACCESSORY_IMAGES[id] = img;
        }
    }
    preloadAccessoryImages();

    const ACCESSORY_CONFIG = {
        none: {
            id: 'none',
            name: 'Şapka Yok',
            type: 'hat',
            category: 'hat',
            rarity: 'common',
            price: 0,
            icon: '🚫',
            description: 'Şapka kullanma.',
            unlockType: 'shop'
        },
        none_glasses: {
            id: 'none_glasses',
            name: 'Gözlük Yok',
            type: 'glasses',
            category: 'glasses',
            rarity: 'common',
            price: 0,
            icon: '🚫',
            description: 'Gözlük kullanma.',
            unlockType: 'shop'
        },
        classic_top_hat: {
            id: 'classic_top_hat',
            name: 'Silindir Şapka',
            type: 'hat',
            category: 'hat',
            rarity: 'common',
            price: 250,
            icon: '🎩',
            description: 'Asil ve şık siyah silindir şapka.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.52,
            scale: 1.10
        },
        baseball_cap: {
            id: 'baseball_cap',
            name: 'Kırmızı Kep',
            type: 'hat',
            category: 'caps',
            rarity: 'common',
            price: 300,
            icon: '🧢',
            description: 'Spor ve havalı kırmızı beyzbol kepi.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.48,
            scale: 1.15
        },
        wizard_hat: {
            id: 'wizard_hat',
            name: 'Büyücü Şapkası',
            type: 'hat',
            category: 'special',
            rarity: 'epic',
            price: 1000,
            icon: '🧙',
            description: 'Kemerli ve kıvılcımlı mor büyücü şapkası.',
            unlockType: 'level',
            requiredLevel: 30,
            offsetX: 0,
            offsetY: -0.55,
            scale: 1.25,
            specialEffect: 'magic_sparkles'
        },
        cowboy_hat: {
            id: 'cowboy_hat',
            name: 'Kovboy Şapkası',
            type: 'hat',
            category: 'hat',
            rarity: 'rare',
            price: 750,
            icon: '🤠',
            description: 'Vahşi batı stili taba deri kovboy şapkası.',
            unlockType: 'level',
            requiredLevel: 20,
            offsetX: 0,
            offsetY: -0.50,
            scale: 1.25
        },
        santa_hat: {
            id: 'santa_hat',
            name: 'Noel Baba Şapkası',
            type: 'hat',
            category: 'hat',
            rarity: 'rare',
            price: 800,
            icon: '🎅',
            description: 'Tüylü beyaz kürk ve ponponlu kırmızı yılbaşı şapkası.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.50,
            scale: 1.20
        },
        graduation_cap: {
            id: 'graduation_cap',
            name: 'Mezuniyet Kepi',
            type: 'hat',
            category: 'special',
            rarity: 'rare',
            price: 600,
            icon: '🎓',
            description: 'Altın püsküllü akademisyen mezuniyet kepi.',
            unlockType: 'level',
            requiredLevel: 10,
            offsetX: 0,
            offsetY: -0.52,
            scale: 1.20
        },
        alien_antenna: {
            id: 'alien_antenna',
            name: 'Uzaylı Anteni',
            type: 'hat',
            category: 'special',
            rarity: 'epic',
            price: 2000,
            icon: '👽',
            description: 'Işıldayan yeşil top antenli uzaylı başlığı.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.50,
            scale: 1.15,
            specialEffect: 'electric_sparks'
        },
        crown: {
            id: 'crown',
            name: 'Kral Tacı',
            type: 'hat',
            category: 'crowns',
            rarity: 'epic',
            price: 1500,
            icon: '👑',
            description: 'Elmas mücevherli saf altın kral tacı.',
            unlockType: 'level',
            requiredLevel: 50,
            offsetX: 0,
            offsetY: -0.50,
            scale: 1.15
        },
        golden_crown: {
            id: 'golden_crown',
            name: 'İmparatorluk Tacı',
            type: 'hat',
            category: 'crowns',
            rarity: 'legendary',
            price: 5000,
            icon: '👑',
            description: 'Kırmızı kadife içli görkemli imparatorluk tacı.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.52,
            scale: 1.25,
            specialEffect: 'golden_sparkles'
        },
        glass_cool: {
            id: 'glass_cool',
            name: 'Siyah Güneş Gözlüğü',
            type: 'glasses',
            category: 'glasses',
            rarity: 'common',
            price: 200,
            icon: '🕶️',
            description: 'Klasik havalı siyah güneş gözlüğü.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_round: {
            id: 'glass_round',
            name: 'Yuvarlak Profesör Gözlüğü',
            type: 'glasses',
            category: 'glasses',
            rarity: 'common',
            price: 250,
            icon: '👓',
            description: 'Zeki ve bilge görünümlü yuvarlak gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_nerd: {
            id: 'glass_nerd',
            name: 'Nerd Gözlüğü',
            type: 'glasses',
            category: 'glasses',
            rarity: 'common',
            price: 300,
            icon: '🤓',
            description: 'Büyük çerçeveli sevimli hipster/nerd gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_pixel: {
            id: 'glass_pixel',
            name: 'Thug Life Piksel Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'rare',
            price: 600,
            icon: '😎',
            description: 'Deal With It efsanevi 8-bit piksel gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_cyber: {
            id: 'glass_cyber',
            name: 'Cyberpunk Neon Vizör',
            type: 'glasses',
            category: 'glasses',
            rarity: 'epic',
            price: 1200,
            icon: '🤖',
            description: 'Futuristik mavi neon siber vizör.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_red_shutter: {
            id: 'glass_red_shutter',
            name: 'Kırmızı Shutter Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'rare',
            price: 500,
            icon: '🕶️',
            description: 'Parti ortamlarının vazgeçilmezi kırmızı çizgili gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_blue_shutter: {
            id: 'glass_blue_shutter',
            name: 'Mavi Neon Shutter Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'rare',
            price: 500,
            icon: '🕶️',
            description: 'Işıldayan mavi çizgili parti gözlüğü.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_gold: {
            id: 'glass_gold',
            name: 'Altın Çerçeveli Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'epic',
            price: 1500,
            icon: '👓',
            description: 'Saf altından yuvarlak zarif gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_heart: {
            id: 'glass_heart',
            name: 'Pembe Kalp Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'rare',
            price: 450,
            icon: '💖',
            description: 'Aşk dolu sevimli pembe kalp gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_star: {
            id: 'glass_star',
            name: 'Yıldız Parti Gözlüğü',
            type: 'glasses',
            category: 'glasses',
            rarity: 'rare',
            price: 500,
            icon: '⭐',
            description: 'Yıldız şekilli süper parlak parti gözlüğü.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_steampunk: {
            id: 'glass_steampunk',
            name: 'Steampunk Kaynak Gözlüğü',
            type: 'glasses',
            category: 'glasses',
            rarity: 'epic',
            price: 1800,
            icon: '⚙️',
            description: 'Pirinç vitesli detaylı steampunk gözlüğü.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_aviator: {
            id: 'glass_aviator',
            name: 'Altın Damla Aviator Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'epic',
            price: 1000,
            icon: '✈️',
            description: 'Pilot stili karizmatik altın aviator gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_cosmic: {
            id: 'glass_cosmic',
            name: 'Galaksi Vizör Gözlük',
            type: 'glasses',
            category: 'glasses',
            rarity: 'legendary',
            price: 3000,
            icon: '🌌',
            description: 'Uzay tozları ve yıldızlarla dolu galaksi vizörü.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        },
        glass_rainbow: {
            id: 'glass_rainbow',
            name: 'Gökkuşağı Güneş Gözlüğü',
            type: 'glasses',
            category: 'glasses',
            rarity: 'legendary',
            price: 2500,
            icon: '🌈',
            description: 'Rengarenk gökkuşağı camlı havalı gözlük.',
            unlockType: 'shop',
            offsetX: 0,
            offsetY: -0.18,
            scale: 0.95
        }
    };

    const AccessoryManager = {
        get equippedHatId() {
            return localStorage.getItem('snake_selected_hat') || localStorage.getItem('snake_selected_accessory') || 'none';
        },
        set equippedHatId(val) {
            localStorage.setItem('snake_selected_hat', val || 'none');
            localStorage.setItem('snake_selected_accessory', val || 'none');
        },

        get equippedGlassesId() {
            return localStorage.getItem('snake_selected_glasses') || 'none_glasses';
        },
        set equippedGlassesId(val) {
            localStorage.setItem('snake_selected_glasses', val || 'none_glasses');
        },

        getAvailableAccessories() {
            return ACCESSORY_CONFIG;
        },
        getOwnedAccessories() {
            return InventoryManager.getOwnedAccessories();
        },
        getEquippedHat() {
            return ACCESSORY_CONFIG[this.equippedHatId] || ACCESSORY_CONFIG.none;
        },
        getEquippedGlasses() {
            return ACCESSORY_CONFIG[this.equippedGlassesId] || ACCESSORY_CONFIG.none_glasses;
        },
        getEquippedAccessory() {
            return this.getEquippedHat();
        },
        equipAccessory(accessoryId) {
            if (accessoryId === 'none') {
                this.equippedHatId = 'none';
                playSound('item_equip');
                if (typeof renderAllCosmeticsUI === 'function') renderAllCosmeticsUI();
                if (!isGameRunning) renderFrame();
                return true;
            }
            if (accessoryId === 'none_glasses') {
                this.equippedGlassesId = 'none_glasses';
                playSound('item_equip');
                if (typeof renderAllCosmeticsUI === 'function') renderAllCosmeticsUI();
                if (!isGameRunning) renderFrame();
                return true;
            }
            if (InventoryManager.isAccessoryOwned(accessoryId)) {
                const acc = ACCESSORY_CONFIG[accessoryId];
                if (acc && acc.type === 'glasses') {
                    this.equippedGlassesId = accessoryId;
                } else {
                    this.equippedHatId = accessoryId;
                }
                playSound('item_equip');
                if (typeof renderAllCosmeticsUI === 'function') renderAllCosmeticsUI();
                if (!isGameRunning) renderFrame();
                return true;
            }
            return false;
        },
        unequipAccessory(type = 'hat') {
            if (type === 'glasses') {
                this.equippedGlassesId = 'none_glasses';
            } else {
                this.equippedHatId = 'none';
            }
            playSound('item_equip');
            if (typeof renderAllCosmeticsUI === 'function') renderAllCosmeticsUI();
            if (!isGameRunning) renderFrame();
        },
        isOwned(accessoryId) {
            return InventoryManager.isAccessoryOwned(accessoryId);
        },
        isEquipped(accessoryId) {
            const acc = ACCESSORY_CONFIG[accessoryId];
            if (!acc) return false;
            if (acc.type === 'glasses') {
                return this.equippedGlassesId === accessoryId;
            }
            return this.equippedHatId === accessoryId;
        },
        getAccessory(accessoryId) {
            return ACCESSORY_CONFIG[accessoryId] || null;
        },
        buyAccessory(accessoryId) {
            const acc = this.getAccessory(accessoryId);
            if (!acc) return false;
            if (this.isOwned(accessoryId)) {
                this.equipAccessory(accessoryId);
                return true;
            }
            if (CoinManager.canAfford(acc.price)) {
                if (CoinManager.removeCoins(acc.price)) {
                    InventoryManager.addAccessory(accessoryId);
                    this.equipAccessory(accessoryId);
                    playSound('shop_purchase');
                    if (typeof renderAllCosmeticsUI === 'function') renderAllCosmeticsUI();
                    return true;
                }
            }
            return false;
        },
        unlockAccessory(accessoryId, showModal = true) {
            const acc = this.getAccessory(accessoryId);
            if (!acc) return false;
            if (!this.isOwned(accessoryId)) {
                InventoryManager.addAccessory(accessoryId);
                if (showModal) {
                    this.showUnlockModal(acc);
                } else {
                    showCoinToast(`🎉 YENİ AKSESUAR: ${acc.name}`);
                }
                return true;
            } else {
                const altCoins = Math.max(150, Math.floor(acc.price * 0.5));
                CoinManager.addCoins(altCoins);
                showCoinToast(`+${altCoins} COIN (Aksesuar Zaten Var)`);
                return false;
            }
        },
        showUnlockModal(acc) {
            const modal = document.getElementById('accessory-unlock-modal');
            if (!modal) return;
            const iconEl = document.getElementById('unlock-acc-icon');
            const nameEl = document.getElementById('unlock-acc-name');
            const rarityEl = document.getElementById('unlock-acc-rarity');
            const descEl = document.getElementById('unlock-acc-desc');
            const equipBtn = document.getElementById('unlock-acc-equip-btn');
            const closeBtn = document.getElementById('unlock-acc-close-btn');

            if (iconEl) iconEl.textContent = acc.icon;
            if (nameEl) nameEl.textContent = acc.name;
            if (rarityEl) {
                rarityEl.textContent = acc.rarity.toUpperCase();
                rarityEl.className = `rarity-badge rarity-${acc.rarity}`;
            }
            if (descEl) descEl.textContent = acc.description;

            if (equipBtn) {
                equipBtn.onclick = () => {
                    this.equipAccessory(acc.id);
                    modal.classList.add('hidden');
                };
            }
            if (closeBtn) {
                closeBtn.onclick = () => {
                    modal.classList.add('hidden');
                };
            }
            modal.classList.remove('hidden');
            playSound('reward');
        },
        getCollectionStats() {
            const allKeys = Object.keys(ACCESSORY_CONFIG).filter(k => k !== 'none' && k !== 'none_glasses');
            const ownedKeys = allKeys.filter(k => this.isOwned(k));
            return {
                total: allKeys.length,
                unlocked: ownedKeys.length,
                percent: allKeys.length > 0 ? Math.round((ownedKeys.length / allKeys.length) * 100) : 0
            };
        },
        drawAccessory(ctx, headTileX, headTileY, tileSize, dir) {
            // Draw Glasses first if equipped (so glasses sit below hat)
            const glassesId = this.equippedGlassesId;
            if (glassesId && glassesId !== 'none_glasses' && ACCESSORY_CONFIG[glassesId]) {
                this._drawSingleAccessory(ctx, headTileX, headTileY, tileSize, dir, ACCESSORY_CONFIG[glassesId]);
            }

            // Draw Hat second if equipped (so hat sits on top of head and glasses)
            const hatId = this.equippedHatId;
            if (hatId && hatId !== 'none' && ACCESSORY_CONFIG[hatId]) {
                this._drawSingleAccessory(ctx, headTileX, headTileY, tileSize, dir, ACCESSORY_CONFIG[hatId]);
            }
        },
        _drawSingleAccessory(ctx, headTileX, headTileY, tileSize, dir, acc) {
            if (!acc) return;
            const cx = (headTileX + 0.5) * tileSize;
            const cy = (headTileY + 0.5) * tileSize;

            let angle = 0;
            if (dir.x === 1) angle = Math.PI / 2;
            else if (dir.x === -1) angle = -Math.PI / 2;
            else if (dir.y === 1) angle = Math.PI;
            else if (dir.y === -1) angle = 0;

            const time = Date.now() / 250;
            let bounceY = 0;
            let tiltAngle = 0;

            if (acc.rarity === 'legendary') {
                bounceY = Math.sin(time * 3) * (tileSize * 0.05);
            }
            if (acc.id === 'cowboy_hat' || acc.id === 'santa_hat') {
                tiltAngle = Math.sin(time * 2) * 0.05;
            }

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle + tiltAngle);

            if (acc.rarity === 'legendary') {
                ctx.shadowBlur = 16;
                ctx.shadowColor = '#ffd700';
            } else if (acc.rarity === 'epic') {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#a855f7';
            } else if (acc.rarity === 'rare') {
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#3b82f6';
            }

            const img = ACCESSORY_IMAGES[acc.id];
            if (img && img.complete && img.naturalWidth > 0) {
                const scale = acc.scale || 1.15;
                const imgW = tileSize * scale;
                const imgH = imgW * (img.naturalHeight / img.naturalWidth || 1);
                const ox = (acc.offsetX || 0) * tileSize;
                const defaultOy = acc.type === 'glasses' ? -0.18 : -0.50;
                const oy = ((acc.offsetY !== undefined ? acc.offsetY : defaultOy) * tileSize) + bounceY;
                ctx.drawImage(img, -imgW / 2 + ox, oy - imgH / 2, imgW, imgH);
            } else {
                const ox = (acc.offsetX || 0) * tileSize;
                const defaultOy = acc.type === 'glasses' ? -0.18 : -0.42;
                const oy = ((acc.offsetY !== undefined ? acc.offsetY : defaultOy) * tileSize) + bounceY;
                const fontSize = Math.floor(tileSize * (acc.scale || 0.85));
                ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(acc.icon, ox, oy);
            }

            ctx.restore();

            if (acc.specialEffect && typeof ParticleManager !== 'undefined') {
                if (Math.random() < 0.25) {
                    let pColor = '#ffd700';
                    if (acc.specialEffect === 'magic_sparkles') pColor = '#c084fc';
                    else if (acc.specialEffect === 'electric_sparks') pColor = '#38bdf8';
                    else if (acc.specialEffect === 'space_stars') pColor = '#f43f5e';
                    else if (acc.specialEffect === 'small_smoke') pColor = '#f97316';

                    ParticleManager.spawnParticle('accessory', { x: cx + (Math.random() - 0.5) * tileSize * 0.8, y: cy + (Math.random() - 0.5) * tileSize * 0.8 }, {
                        color: pColor,
                        size: Math.random() * 3 + 1.5,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: -Math.random() * 0.8 - 0.2,
                        lifetime: Math.random() * 200 + 150
                    });
                }
            }
        }
    };

    // GAME MODES CONFIGURATION
    const GAME_MODES = {
        classic: {
            id: 'classic',
            name: 'Klasik',
            icon: 'mode_icon_classic.svg',
            desc: 'Klasik Snake deneyimi. Yem ye, engellerden ve duvarlara çarpmaktan kaçın.',
            difficulty: 'Kolay',
            diffClass: 'mode-diff-easy',
            rules: 'Duvara veya gövdeye çarpma Game Over. Power-Up aktif.',
            wallWrap: false,
            powerUpsEnabled: true,
            timeLimit: null,
            coinMultiplier: 1.0,
            obstacleMultiplier: 1.0
        },
        endless: {
            id: 'endless',
            name: 'Sonsuz',
            icon: 'mode_icon_endless.svg',
            desc: 'Duvarların içinden geçilebilen sonsuz harita modu.',
            difficulty: 'Kolay',
            diffClass: 'mode-diff-easy',
            rules: 'Duvar çarpmaları yok (içinden geçer). Gövde/engel çarpması Game Over.',
            wallWrap: true,
            powerUpsEnabled: true,
            timeLimit: null,
            coinMultiplier: 1.1,
            obstacleMultiplier: 1.0
        },
        time_attack: {
            id: 'time_attack',
            name: 'Zamana Karşı',
            icon: 'mode_icon_time_attack.svg',
            desc: '60 saniyelik zaman sınırı! Zamana karşı yarışarak skor yap.',
            difficulty: 'Orta',
            diffClass: 'mode-diff-medium',
            rules: '60s geri sayım. Süre bitince oyun sona erer.',
            wallWrap: false,
            powerUpsEnabled: true,
            timeLimit: 60,
            coinMultiplier: 1.2,
            obstacleMultiplier: 1.0
        },
        speed_run: {
            id: 'speed_run',
            name: 'Hız Yarışı',
            icon: 'mode_icon_speed_run.svg',
            desc: 'Yılan zamanla sürekli hızlanır! Her 10 yem yendiğinde +1 Hız Seviyesi.',
            difficulty: 'Zor',
            diffClass: 'mode-diff-hard',
            rules: 'Her 10 yem = Hız Seviyesi yükselir. Maksimum refleks gerektirir.',
            wallWrap: false,
            powerUpsEnabled: true,
            timeLimit: null,
            coinMultiplier: 1.3,
            obstacleMultiplier: 1.0
        },
        hardcore: {
            id: 'hardcore',
            name: 'Zorlu Mod',
            icon: 'mode_icon_hardcore.svg',
            desc: 'Ultra hızlı ve Power-Up içermeyen acımasız mod. 2x Coin ödülü!',
            difficulty: 'Aşırı Zor',
            diffClass: 'mode-diff-extreme',
            rules: 'Power-Up yok! Yüksek başlangıç hızı. 2X Coin ödülü!',
            wallWrap: false,
            powerUpsEnabled: false,
            timeLimit: null,
            coinMultiplier: 2.0,
            obstacleMultiplier: 1.0
        },
        survival: {
            id: 'survival',
            name: 'Hayatta Kalma',
            icon: 'mode_icon_survival.svg',
            desc: 'Zaman geçtikçe haritada yeni engeller belirir ve hız artar.',
            difficulty: 'Aşırı Zor',
            diffClass: 'mode-diff-extreme',
            rules: 'Hayatta kalma süren uzadıkça alan daralır ve hızlanır!',
            wallWrap: false,
            powerUpsEnabled: true,
            timeLimit: null,
            coinMultiplier: 1.5,
            obstacleMultiplier: 1.0
        },
        obstacle: {
            id: 'obstacle',
            name: 'Engelli Saha',
            icon: 'mode_icon_obstacle.svg',
            desc: 'Sık ve dar geçitli engellerle dolu haritada hassas sürüş yap.',
            difficulty: 'Zor',
            diffClass: 'mode-diff-hard',
            rules: 'Ekstra yüksek engel yoğunluğu. Yüksek dikkat gerektirir.',
            wallWrap: false,
            powerUpsEnabled: true,
            timeLimit: null,
            coinMultiplier: 1.4,
            obstacleMultiplier: 2.2
        }
    };

    // Central GameModeManager
    const GameModeManager = {
        selectedMode: localStorage.getItem('snake_selected_mode') || 'classic',

        modeState: {
            timeLeft: 60,
            speedLevel: 1,
            foodEatenInRun: 0,
            survivalStartTime: 0,
            survivalElapsedSeconds: 0,
            dynamicObstacles: [],
            lastSecondTick: 0
        },

        getSelectedModeId() {
            return this.selectedMode;
        },

        getCurrentModeId() {
            return this.selectedMode;
        },

        getCurrentMode() {
            return GAME_MODES[this.selectedMode] || GAME_MODES.classic;
        },

        selectMode(modeId) {
            if (GAME_MODES[modeId]) {
                this.selectedMode = modeId;
                localStorage.setItem('snake_selected_mode', modeId);
                this.updateMenuModeDisplay();
                this.updateHudOverlay();
            }
        },

        updateMenuModeDisplay() {
            const mode = this.getCurrentMode();
            const activeModeEl = document.getElementById('menu-active-mode-name');
            const modePillEl = document.getElementById('menu-active-mode-pill');
            if (activeModeEl) {
                const iconHtml = (mode.icon && mode.icon.endsWith('.svg')) ?
                    `<img src="${mode.icon}" class="menu-active-mode-icon" alt="${mode.name}">` : '';
                activeModeEl.innerHTML = `${iconHtml}<span>${mode.name.toUpperCase()}</span>`;
            }
            if (modePillEl) {
                modePillEl.setAttribute('title', mode.desc);
            }
        },

        onGameStart(currentMapObstacles = []) {
            const mode = this.getCurrentMode();
            const now = Date.now();

            this.modeState = {
                timeLeft: mode.timeLimit || 60,
                speedLevel: 1,
                foodEatenInRun: 0,
                survivalStartTime: now,
                survivalElapsedSeconds: 0,
                dynamicObstacles: [],
                lastSecondTick: now
            };

            if (mode.id === 'obstacle') {
                this.modeState.dynamicObstacles = this.generateObstaclesForMode(currentMapObstacles, 10);
            }

            this.updateHudOverlay();
        },

        onPause() {},

        onResume() {
            const now = Date.now();
            this.modeState.lastSecondTick = now;
        },

        update(now) {
            if (!isGameRunning || isPaused) return;

            const mode = this.getCurrentMode();

            if (mode.id === 'time_attack') {
                if (now - this.modeState.lastSecondTick >= 1000) {
                    this.modeState.timeLeft--;
                    this.modeState.lastSecondTick = now;

                    if (this.modeState.timeLeft <= 0) {
                        this.modeState.timeLeft = 0;
                        this.updateHudOverlay();
                        handleGameOver('time_up');
                        return;
                    }
                    this.updateHudOverlay();
                }
            } else if (mode.id === 'survival') {
                if (now - this.modeState.lastSecondTick >= 1000) {
                    this.modeState.survivalElapsedSeconds++;
                    this.modeState.lastSecondTick = now;

                    if (this.modeState.survivalElapsedSeconds % 20 === 0) {
                        const currentMap = MAPS[selectedMap] || MAPS.classic;
                        const existing = [...(currentMap.obstacles || []), ...this.modeState.dynamicObstacles];
                        const newObs = this.generateObstaclesForMode(existing, 2);
                        this.modeState.dynamicObstacles.push(...newObs);
                        PowerUpManager.showToast('🔥 Harita Daralıyor!', '#ef4444');
                    }

                    this.updateHudOverlay();
                }
            } else {
                this.updateHudOverlay();
            }
        },

        onFoodEaten() {
            const mode = this.getCurrentMode();
            this.modeState.foodEatenInRun++;

            if (mode.id === 'speed_run') {
                const newLevel = Math.floor(this.modeState.foodEatenInRun / 10) + 1;
                if (newLevel !== this.modeState.speedLevel) {
                    this.modeState.speedLevel = newLevel;
                    PowerUpManager.showToast(`⚡ HIZ SEVİYESİ ${newLevel}!`, '#fde047');
                    playSound('powerup-collect');
                }
            }
        },

        generateObstaclesForMode(existingObstacles, count) {
            const newObs = [];
            let attempts = 0;
            while (newObs.length < count && attempts < 150) {
                attempts++;
                const rx = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
                const ry = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;

                const isNearSnake = (typeof snake !== 'undefined' && snake.length > 0) ? snake.some(s => Math.abs(s.x - rx) <= 2 && Math.abs(s.y - ry) <= 2) : (Math.abs(rx - 10) <= 2 && Math.abs(ry - 10) <= 2);
                const isFood = (typeof food !== 'undefined' && food && food.x === rx && food.y === ry);
                const isExist = existingObstacles.some(o => o.x === rx && o.y === ry) || newObs.some(o => o.x === rx && o.y === ry);

                if (!isNearSnake && !isFood && !isExist) {
                    newObs.push({ x: rx, y: ry });
                }
            }
            return newObs;
        },

        getExtraObstacles() {
            return this.modeState.dynamicObstacles || [];
        },

        isPowerUpEnabled() {
            return this.getCurrentMode().powerUpsEnabled;
        },

        isWallWrapEnabled() {
            return this.getCurrentMode().wallWrap;
        },

        calculateSpeed(baseSpd) {
            const mode = this.getCurrentMode();
            let spd = baseSpd;

            if (mode.id === 'hardcore') {
                spd = Math.floor(baseSpd * 0.75);
            } else if (mode.id === 'speed_run') {
                const lvl = this.modeState.speedLevel || 1;
                const speedFactor = 1 + (lvl - 1) * 0.18;
                spd = Math.max(45, Math.floor(baseSpd / speedFactor));
            } else if (mode.id === 'survival') {
                const elapsed = this.modeState.survivalElapsedSeconds || 0;
                const level = Math.floor(elapsed / 20);
                const speedFactor = 1 + level * 0.12;
                spd = Math.max(50, Math.floor(baseSpd / speedFactor));
            }

            return PowerUpManager.calculateSpeed(spd, typeof score !== 'undefined' ? score : 0);
        },

        getCoinMultiplier() {
            return this.getCurrentMode().coinMultiplier || 1.0;
        },

        updateHudOverlay() {
            const badgeEl = document.getElementById('mode-hud-badge');
            const infoEl = document.getElementById('mode-hud-info');
            if (!badgeEl || !infoEl) return;

            const mode = this.getCurrentMode();
            const currentMap = MAPS[selectedMap] || MAPS.classic;
            const modeIconHtml = (mode.icon && mode.icon.endsWith('.svg')) ?
                `<img src="${mode.icon}" class="hud-mode-icon" alt="${mode.name}">` : '';
            const mapIconHtml = (currentMap.icon && currentMap.icon.endsWith('.svg')) ?
                `<img src="${currentMap.icon}" class="hud-map-icon" alt="${currentMap.name}">` : '';

            badgeEl.innerHTML = `
                <span class="hud-item">${modeIconHtml}<strong>${mode.name.toUpperCase()}</strong></span>
                <span class="hud-divider">•</span>
                <span class="hud-item">${mapIconHtml}<span>${currentMap.name}</span></span>
            `;

            if (mode.id === 'time_attack') {
                infoEl.classList.remove('hidden');
                const secs = this.modeState.timeLeft;
                const min = String(Math.floor(secs / 60)).padStart(2, '0');
                const s = String(secs % 60).padStart(2, '0');
                infoEl.textContent = `⏱️ ${min}:${s}`;
                if (secs <= 10) {
                    infoEl.classList.add('danger');
                } else {
                    infoEl.classList.remove('danger');
                }
            } else if (mode.id === 'speed_run') {
                infoEl.classList.remove('hidden');
                infoEl.classList.remove('danger');
                infoEl.textContent = `⚡ LEVEL ${this.modeState.speedLevel}`;
            } else if (mode.id === 'survival') {
                infoEl.classList.remove('hidden');
                infoEl.classList.remove('danger');
                const secs = this.modeState.survivalElapsedSeconds;
                const min = String(Math.floor(secs / 60)).padStart(2, '0');
                const s = String(secs % 60).padStart(2, '0');
                infoEl.textContent = `🔥 ${min}:${s}`;
            } else {
                infoEl.classList.add('hidden');
            }
        },

        getBestScore(modeId = this.selectedMode) {
            try {
                const scores = JSON.parse(localStorage.getItem('snake_best_scores_by_mode')) || {};
                return scores[modeId] || 0;
            } catch (e) {
                return 0;
            }
        },

        saveBestScore(modeId, sc) {
            try {
                const scores = JSON.parse(localStorage.getItem('snake_best_scores_by_mode')) || {};
                const prev = scores[modeId] || 0;
                if (sc > prev) {
                    scores[modeId] = sc;
                    localStorage.setItem('snake_best_scores_by_mode', JSON.stringify(scores));
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },

        getBestTime(modeId = 'survival') {
            try {
                const times = JSON.parse(localStorage.getItem('snake_best_times_by_mode')) || {};
                return times[modeId] || 0;
            } catch (e) {
                return 0;
            }
        },

        saveBestTime(modeId, seconds) {
            try {
                const times = JSON.parse(localStorage.getItem('snake_best_times_by_mode')) || {};
                const prev = times[modeId] || 0;
                if (seconds > prev) {
                    times[modeId] = seconds;
                    localStorage.setItem('snake_best_times_by_mode', JSON.stringify(times));
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    };

    // Centralized Player Statistics Manager
    const PlayerStats = {
        STORAGE_KEY: 'snake_player_stats',
        getStats() {
            try {
                const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
                if (data && typeof data === 'object') {
                    return {
                        totalGames: data.totalGames || 0,
                        completedGames: data.completedGames || 0,
                        totalFoodEaten: data.totalFoodEaten || 0,
                        highestScore: data.highestScore || parseInt(localStorage.getItem('snake_high_score') || '0', 10),
                        totalScore: data.totalScore || 0,
                        highestSnakeLength: data.highestSnakeLength || 0,
                        playedMaps: Array.isArray(data.playedMaps) ? data.playedMaps : ['classic'],
                        ownedSkins: Array.isArray(data.ownedSkins) ? data.ownedSkins : InventoryManager.getOwnedSkins(),
                        ownedMaps: Array.isArray(data.ownedMaps) ? data.ownedMaps : InventoryManager.getOwnedMaps(),
                        ownedThemes: Array.isArray(data.ownedThemes) ? data.ownedThemes : InventoryManager.getOwnedThemes(),
                        ownedAccessories: Array.isArray(data.ownedAccessories) ? data.ownedAccessories : InventoryManager.getOwnedAccessories(),
                        unlockedAchievements: Array.isArray(data.unlockedAchievements) ? data.unlockedAchievements : [],
                        claimedAchievementRewards: Array.isArray(data.claimedAchievementRewards) ? data.claimedAchievementRewards : [],
                        totalPowerUpsCollected: data.totalPowerUpsCollected || 0,
                        shieldsUsed: data.shieldsUsed || 0,
                        speedBoostsUsed: data.speedBoostsUsed || 0,
                        slowMotionsUsed: data.slowMotionsUsed || 0,
                        magnetsUsed: data.magnetsUsed || 0,
                        megaFoodsCollected: data.megaFoodsCollected || 0,
                        doubleCoinsUsed: data.doubleCoinsUsed || 0,
                        ghostsUsed: data.ghostsUsed || 0,
                        allPowerUpTypesEverUsed: Array.isArray(data.allPowerUpTypesEverUsed) ? data.allPowerUpTypesEverUsed : []
                    };
                }
            } catch (e) {}

            const initial = {
                totalGames: 0,
                completedGames: 0,
                totalFoodEaten: 0,
                highestScore: parseInt(localStorage.getItem('snake_high_score') || '0', 10),
                totalScore: 0,
                highestSnakeLength: 0,
                playedMaps: ['classic'],
                ownedSkins: InventoryManager.getOwnedSkins(),
                ownedMaps: InventoryManager.getOwnedMaps(),
                ownedThemes: InventoryManager.getOwnedThemes(),
                unlockedAchievements: [],
                claimedAchievementRewards: [],
                totalPowerUpsCollected: 0,
                shieldsUsed: 0,
                speedBoostsUsed: 0,
                slowMotionsUsed: 0,
                magnetsUsed: 0,
                megaFoodsCollected: 0,
                doubleCoinsUsed: 0,
                ghostsUsed: 0,
                allPowerUpTypesEverUsed: []
            };
            this.saveStats(initial);
            return initial;
        },

        saveStats(stats) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
        },

        recordPowerUpCollected(typeId) {
            const stats = this.getStats();
            stats.totalPowerUpsCollected = (stats.totalPowerUpsCollected || 0) + 1;
            if (!Array.isArray(stats.allPowerUpTypesEverUsed)) {
                stats.allPowerUpTypesEverUsed = [];
            }
            if (!stats.allPowerUpTypesEverUsed.includes(typeId)) {
                stats.allPowerUpTypesEverUsed.push(typeId);
            }

            if (typeId === 'shield') stats.shieldsUsed = (stats.shieldsUsed || 0) + 1;
            if (typeId === 'speed_boost') stats.speedBoostsUsed = (stats.speedBoostsUsed || 0) + 1;
            if (typeId === 'slow_motion') stats.slowMotionsUsed = (stats.slowMotionsUsed || 0) + 1;
            if (typeId === 'magnet') stats.magnetsUsed = (stats.magnetsUsed || 0) + 1;
            if (typeId === 'mega_food') stats.megaFoodsCollected = (stats.megaFoodsCollected || 0) + 1;
            if (typeId === 'double_coin') stats.doubleCoinsUsed = (stats.doubleCoinsUsed || 0) + 1;
            if (typeId === 'ghost') stats.ghostsUsed = (stats.ghostsUsed || 0) + 1;

            this.saveStats(stats);
            AchievementManager.checkAchievements();
            updateMenuBadges();
        },

        recordGameStart(mapId) {
            const stats = this.getStats();
            stats.totalGames++;
            if (mapId && !stats.playedMaps.includes(mapId)) {
                stats.playedMaps.push(mapId);
            }
            stats.ownedSkins = InventoryManager.getOwnedSkins();
            stats.ownedMaps = InventoryManager.getOwnedMaps();
            stats.ownedThemes = InventoryManager.getOwnedThemes();
            this.saveStats(stats);
            
            MissionManager.onGameStart(mapId);
            AchievementManager.checkAchievements();
            updateMenuBadges();
        },

        recordFoodEaten(count = 1) {
            const stats = this.getStats();
            stats.totalFoodEaten += count;
            this.saveStats(stats);

            MissionManager.onFoodEaten(count);
            AchievementManager.checkAchievements();
            updateMenuBadges();
        },

        recordScoreUpdate(currentScore) {
            const stats = this.getStats();
            if (currentScore > stats.highestScore) {
                stats.highestScore = currentScore;
                this.saveStats(stats);
            }

            MissionManager.onScoreUpdate(currentScore);
            AchievementManager.checkAchievements();
            updateMenuBadges();
        },

        recordGameOver(finalScore, foodEatenCount, snakeLength) {
            const stats = this.getStats();
            stats.completedGames++;
            stats.totalScore += finalScore;
            if (finalScore > stats.highestScore) {
                stats.highestScore = finalScore;
            }
            if (snakeLength > stats.highestSnakeLength) {
                stats.highestSnakeLength = snakeLength;
            }
            stats.highestFoodInSingleGame = Math.max(stats.highestFoodInSingleGame || 0, foodEatenCount || 0);
            stats.ownedSkins = InventoryManager.getOwnedSkins();
            stats.ownedMaps = InventoryManager.getOwnedMaps();
            stats.ownedThemes = InventoryManager.getOwnedThemes();
            this.saveStats(stats);

            MissionManager.onGameOver(finalScore, foodEatenCount);
            AchievementManager.checkAchievements();
            updateMenuBadges();
        }
    };

    // POWER-UP CONFIGURATION DATA
    const POWER_UPS = {
        shield: {
            id: 'shield',
            name: 'Kalkan',
            icon: '🛡️',
            desc: 'Bir çarpışmadan kurtul.',
            color: '#00f3ff',
            glow: '#38bdf8',
            duration: null,
            weight: 15
        },
        speed_boost: {
            id: 'speed_boost',
            name: 'Hız Takviyesi',
            icon: '⚡',
            desc: 'Yılanı geçici olarak hızlandır.',
            color: '#eab308',
            glow: '#fde047',
            duration: 5,
            weight: 15
        },
        slow_motion: {
            id: 'slow_motion',
            name: 'Yavaşlatma',
            icon: '❄️',
            desc: 'Oyunu dondur ve yavaşlat.',
            color: '#38bdf8',
            glow: '#a5f3fc',
            duration: 5,
            weight: 15
        },
        magnet: {
            id: 'magnet',
            name: 'Mıknatıs',
            icon: '🧲',
            desc: 'Yakındaki yemleri ve coinleri çek.',
            color: '#ef4444',
            glow: '#f87171',
            duration: 7,
            weight: 15
        },
        mega_food: {
            id: 'mega_food',
            name: 'Mega Kalp',
            icon: '💖',
            desc: 'Yılanı bir anda büyüt ve güçlendir.',
            color: '#f43f5e',
            glow: '#fda4af',
            duration: 0,
            weight: 15
        },
        double_coin: {
            id: 'double_coin',
            name: '2X Çarpan',
            icon: '⭐',
            desc: 'Geçici olarak 2x Coin kazan.',
            color: '#a855f7',
            glow: '#d946ef',
            duration: 10,
            weight: 15
        },
        ghost: {
            id: 'ghost',
            name: 'Hayalet Modu',
            icon: '👻',
            desc: 'Kısa süre engellerin içinden geç.',
            color: '#c084fc',
            glow: '#e879f9',
            duration: 5,
            weight: 10
        }
    };

    function getRandomPowerUpType() {
        const list = Object.values(POWER_UPS);
        const totalWeight = list.reduce((sum, p) => sum + p.weight, 0);
        let rand = Math.random() * totalWeight;
        for (const p of list) {
            if (rand < p.weight) return p.id;
            rand -= p.weight;
        }
        return 'speed_boost';
    }

    // Central PowerUpManager
    const PowerUpManager = {
        boardPowerUp: null, // { x, y, type, spawnTime, despawnTime }
        activeEffects: {}, // { type: { endTime } } or { shield: { active: true } }
        nextSpawnTime: 0,
        pauseStartTime: 0,
        typesUsedInCurrentGame: new Set(),
        toastTimeout: null,

        reset() {
            this.boardPowerUp = null;
            this.activeEffects = {};
            this.nextSpawnTime = 0;
            this.pauseStartTime = 0;
            this.typesUsedInCurrentGame.clear();
            this.updateActivePowerUpsBar();
        },

        onGameStart() {
            this.reset();
            const now = Date.now();
            this.nextSpawnTime = now + 10000; // First spawn after 10 seconds
        },

        onPause() {
            this.pauseStartTime = Date.now();
        },

        onResume() {
            if (!this.pauseStartTime) return;
            const pausedMs = Date.now() - this.pauseStartTime;
            this.pauseStartTime = 0;

            if (this.nextSpawnTime) {
                this.nextSpawnTime += pausedMs;
            }
            if (this.boardPowerUp) {
                this.boardPowerUp.despawnTime += pausedMs;
                this.boardPowerUp.spawnTime += pausedMs;
            }
            for (const key in this.activeEffects) {
                if (key === 'shield') continue;
                if (this.activeEffects[key].endTime) {
                    this.activeEffects[key].endTime += pausedMs;
                }
            }
        },

        spawnPowerUp() {
            if (!GameModeManager.isPowerUpEnabled()) {
                this.boardPowerUp = null;
                return;
            }
            if (this.boardPowerUp) return;

            let valid = false;
            let newX, newY;
            const currentMap = MAPS[selectedMap] || MAPS.classic;
            const mapObs = currentMap.obstacles || [];
            const obstacles = [...mapObs, ...GameModeManager.getExtraObstacles()];
            const head = (snake && snake.length > 0) ? snake[0] : null;

            let attempts = 0;
            let minDist = 5;

            while (!valid && attempts < 800) {
                attempts++;
                if (attempts > 200) minDist = 4;
                if (attempts > 400) minDist = 3;
                if (attempts > 600) minDist = 1;
                if (attempts > 750) minDist = 0;

                newX = Math.floor(Math.random() * GRID_SIZE);
                newY = Math.floor(Math.random() * GRID_SIZE);

                const isOnSnake = snake.some(segment => segment.x === newX && segment.y === newY);
                const isOnObstacle = obstacles.some(obs => obs.x === newX && obs.y === newY);
                const isOnFood = (food && food.x === newX && food.y === newY);

                let satisfiesDist = true;
                if (head && minDist > 0) {
                    const dist = Math.abs(newX - head.x) + Math.abs(newY - head.y);
                    if (dist < minDist) satisfiesDist = false;
                }

                valid = !isOnSnake && !isOnObstacle && !isOnFood && satisfiesDist;
            }

            if (!valid) return;

            const type = getRandomPowerUpType();
            const now = Date.now();

            this.boardPowerUp = {
                x: newX,
                y: newY,
                type: type,
                spawnTime: now,
                despawnTime: now + 20000 // 20s despawn if uncollected
            };

            playSound('powerup-spawn');
        },

        collectPowerUp() {
            if (!this.boardPowerUp) return;

            const type = this.boardPowerUp.type;
            const px = this.boardPowerUp.x;
            const py = this.boardPowerUp.y;

            this.boardPowerUp = null;
            const now = Date.now();
            this.nextSpawnTime = now + (15000 + Math.random() * 15000); // 15-30s next spawn

            this.activatePowerUp(type, px, py);
        },

        activatePowerUp(type, px = null, py = null) {
            const p = POWER_UPS[type];
            if (!p) return;

            this.typesUsedInCurrentGame.add(type);
            PlayerStats.recordPowerUpCollected(type);

            if (typeof XPManager !== 'undefined') {
                let xpVal = XP_CONFIG.POWERUP_DEFAULT;
                if (type === 'mega_food') xpVal = XP_CONFIG.POWERUP_MEGAFOOD;
                else if (type === 'magnet') xpVal = XP_CONFIG.POWERUP_MAGNET;
                else if (type === 'double_coin') xpVal = XP_CONFIG.POWERUP_DOUBLECOIN;
                else if (type === 'ghost') xpVal = XP_CONFIG.POWERUP_GHOST;
                else if (type === 'shield') xpVal = XP_CONFIG.POWERUP_SHIELD;
                XPManager.addXP(xpVal, 'powerup');
            }

            const now = Date.now();

            if (type === 'shield') {
                this.activeEffects['shield'] = { active: true };
                this.showToast(`🛡️ KALKAN AKTİF!`, p.color);
                playSound('powerup-collect');
            } else if (type === 'mega_food') {
                const lastSeg = snake[snake.length - 1] || { x: 0, y: 0 };
                for (let i = 0; i < 5; i++) {
                    snake.push({ ...lastSeg });
                }
                score += 50;
                if (currentScoreEl) currentScoreEl.textContent = score;

                const is2X = this.isEffectActive('double_coin');
                const mapMult = InventoryManager.getMapCoinMultiplier();
                const coinsEarned = Math.max(1, Math.round(5 * (is2X ? 2 : 1) * mapMult));
                CoinManager.addCoins(coinsEarned);

                PlayerStats.recordScoreUpdate(score);

                if (px !== null && py !== null) {
                    createParticles(px, py, p.color);
                } else if (snake.length > 0) {
                    createParticles(snake[0].x, snake[0].y, p.color);
                }

                this.showToast(`💖 MEGA KALP! +50 SKOR +${coinsEarned} 🪙`, p.color);
                playSound('mega-food');
            } else {
                const currentRemaining = this.activeEffects[type] ? Math.max(0, this.activeEffects[type].endTime - now) : 0;
                const extension = Math.min(currentRemaining, 5000);
                this.activeEffects[type] = {
                    endTime: now + (p.duration * 1000) + extension
                };

                if (px !== null && py !== null) {
                    createParticles(px, py, p.color);
                }

                this.showToast(`${p.icon} ${p.name.toUpperCase()} AKTİF!`, p.color);
                playSound('powerup-collect');
            }

            this.updateActivePowerUpsBar();
        },

        useShield() {
            if (!this.activeEffects['shield']) return;
            delete this.activeEffects['shield'];

            if (snake.length > 0) {
                createParticles(snake[0].x, snake[0].y, '#3b82f6');
            }

            playSound('shield-break');
            this.showToast(`🛡️ KALKAN KULLANILDI!`, '#3b82f6');
            this.updateActivePowerUpsBar();
        },

        isEffectActive(type) {
            if (type === 'shield') {
                return !!(this.activeEffects['shield'] && this.activeEffects['shield'].active);
            }
            const eff = this.activeEffects[type];
            if (!eff) return false;
            return Date.now() < eff.endTime;
        },

        getTypesUsedInCurrentGameCount() {
            return this.typesUsedInCurrentGame.size;
        },

        calculateSpeed(baseSpd, currentScore) {
            let spd = Math.max(65, baseSpd - Math.floor(currentScore / 30) * 4);

            const hasSpeed = this.isEffectActive('speed_boost');
            const hasSlow = this.isEffectActive('slow_motion');

            if (hasSpeed && hasSlow) {
                return spd;
            } else if (hasSpeed) {
                return Math.max(45, Math.floor(spd * 0.62));
            } else if (hasSlow) {
                return Math.floor(spd * 1.45);
            }

            return spd;
        },

        update(now) {
            if (!isGameRunning || isPaused) return;

            if (!GameModeManager.isPowerUpEnabled()) {
                this.boardPowerUp = null;
                return;
            }

            // Despawn board powerup if expired
            if (this.boardPowerUp) {
                if (now >= this.boardPowerUp.despawnTime) {
                    this.boardPowerUp = null;
                    this.nextSpawnTime = now + (15000 + Math.random() * 15000);
                }
            } else {
                if (now >= this.nextSpawnTime) {
                    this.spawnPowerUp();
                }
            }

            // Magnet effect: Pull food towards snake head
            if (this.isEffectActive('magnet') && snake.length > 0) {
                const head = snake[0];
                const dist = Math.abs(food.x - head.x) + Math.abs(food.y - head.y);
                if (dist <= 8 && dist > 1) {
                    if (food.x < head.x) food.x++;
                    else if (food.x > head.x) food.x--;
                    else if (food.y < head.y) food.y++;
                    else if (food.y > head.y) food.y--;
                }
            }

            // Expire timed active effects
            let changed = false;
            for (const key in this.activeEffects) {
                if (key === 'shield') continue;
                if (now >= this.activeEffects[key].endTime) {
                    delete this.activeEffects[key];
                    changed = true;
                }
            }

            if (changed) {
                this.updateActivePowerUpsBar();
            } else {
                this.updateActivePowerUpsBarTimers();
            }
        },

        updateActivePowerUpsBar() {
            const bar = document.getElementById('active-powerups-bar');
            if (!bar) return;

            bar.innerHTML = '';
            const now = Date.now();

            for (const type in this.activeEffects) {
                const p = POWER_UPS[type];
                if (!p) continue;

                const badge = document.createElement('div');
                badge.className = 'powerup-badge';
                badge.style.setProperty('--badge-border', p.color);
                badge.style.setProperty('--badge-color', '#ffffff');
                badge.style.setProperty('--badge-glow', p.glow);

                let timerText = '';
                if (type === 'shield') {
                    timerText = '1/1';
                } else {
                    const remaining = Math.max(0, Math.ceil((this.activeEffects[type].endTime - now) / 1000));
                    timerText = `${remaining}s`;
                }

                badge.innerHTML = `
                    <span class="powerup-badge-icon">${p.icon}</span>
                    <span>${p.name}</span>
                    <span class="powerup-badge-timer">${timerText}</span>
                `;

                bar.appendChild(badge);
            }
        },

        updateActivePowerUpsBarTimers() {
            const bar = document.getElementById('active-powerups-bar');
            if (!bar) return;

            const now = Date.now();
            const badges = bar.querySelectorAll('.powerup-badge');

            let index = 0;
            for (const type in this.activeEffects) {
                if (type === 'shield') {
                    index++;
                    continue;
                }
                const badge = badges[index];
                if (badge) {
                    const timerEl = badge.querySelector('.powerup-badge-timer');
                    if (timerEl) {
                        const remaining = Math.max(0, Math.ceil((this.activeEffects[type].endTime - now) / 1000));
                        timerEl.textContent = `${remaining}s`;
                    }
                }
                index++;
            }
        },

        showToast(text, color = '#00f3ff') {
            const toastEl = document.getElementById('powerup-toast');
            if (!toastEl) return;

            toastEl.textContent = text;
            toastEl.style.borderColor = color;
            toastEl.style.boxShadow = `0 0 25px ${color}`;
            toastEl.classList.remove('hidden');

            void toastEl.offsetWidth;

            if (this.toastTimeout) clearTimeout(this.toastTimeout);
            this.toastTimeout = setTimeout(() => {
                toastEl.classList.add('hidden');
            }, 1800);
        },

        drawPowerUpOnCanvas(ctx, tileSize) {
            if (!this.boardPowerUp) return;

            const { x, y, type } = this.boardPowerUp;
            const p = POWER_UPS[type];
            if (!p) return;

            const cx = (x + 0.5) * tileSize;
            const cy = (y + 0.5) * tileSize;

            const pulse = 1 + Math.sin(Date.now() / 150) * 0.12;
            const radius = (tileSize * 0.42) * pulse;

            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor = p.glow;
            ctx.fillStyle = p.color;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();

            // Outer ring
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
            ctx.stroke();

            // Icon text
            ctx.font = `${Math.floor(tileSize * 0.55)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.icon, cx, cy + 1);

            ctx.restore();
        }
    };

    // Centralized Achievements Configuration
    const ACHIEVEMENTS = [
        {
            id: "first_game",
            name: "İlk Adım",
            description: "İlk oyununu tamamla.",
            category: "getting_started",
            reward: 50,
            target: 1,
            getProgress: (stats) => stats.completedGames,
            isCompleted: (stats) => stats.completedGames >= 1
        },
        {
            id: "snake_beginner",
            name: "Yılan Çırağı",
            description: "Tek bir oyunda 100 skor yap.",
            category: "score",
            reward: 50,
            target: 100,
            getProgress: (stats) => Math.min(100, stats.highestScore),
            isCompleted: (stats) => stats.highestScore >= 100
        },
        {
            id: "snake_pro",
            name: "Yılan Ustası",
            description: "Tek bir oyunda 500 skor yap.",
            category: "score",
            reward: 100,
            target: 500,
            getProgress: (stats) => Math.min(500, stats.highestScore),
            isCompleted: (stats) => stats.highestScore >= 500
        },
        {
            id: "snake_master",
            name: "Yılan Üstadı",
            description: "Tek bir oyunda 1000 skor yap.",
            category: "score",
            reward: 250,
            target: 1000,
            getProgress: (stats) => Math.min(1000, stats.highestScore),
            isCompleted: (stats) => stats.highestScore >= 1000
        },
        {
            id: "collector",
            name: "Yem Avcısı",
            description: "Toplam 100 yem ye.",
            category: "food",
            reward: 100,
            target: 100,
            getProgress: (stats) => Math.min(100, stats.totalFoodEaten),
            isCompleted: (stats) => stats.totalFoodEaten >= 100
        },
        {
            id: "food_lover",
            name: "Gurme Yılan",
            description: "Toplam 500 yem ye.",
            category: "food",
            reward: 250,
            target: 500,
            getProgress: (stats) => Math.min(500, stats.totalFoodEaten),
            isCompleted: (stats) => stats.totalFoodEaten >= 500
        },
        {
            id: "explorer",
            name: "Kaşif",
            description: "5 farklı haritada oyun oyna.",
            category: "maps",
            reward: 200,
            target: 5,
            getProgress: (stats) => Math.min(5, stats.playedMaps.length),
            isCompleted: (stats) => stats.playedMaps.length >= 5
        },
        {
            id: "skin_collector",
            name: "Koleksiyoncu",
            description: "5 farklı Skin sahibi ol.",
            category: "skins",
            reward: 250,
            target: 5,
            getProgress: (stats) => Math.min(5, InventoryManager.getOwnedSkins().length),
            isCompleted: (stats) => InventoryManager.getOwnedSkins().length >= 5
        },
        {
            id: "gamer",
            name: "Sadık Oyuncu",
            description: "Toplam 50 oyun tamamla.",
            category: "games",
            reward: 150,
            target: 50,
            getProgress: (stats) => Math.min(50, stats.completedGames),
            isCompleted: (stats) => stats.completedGames >= 50
        },
        {
            id: "power_hunter",
            name: "Power Hunter",
            description: "İlk Power-Up'ını topla.",
            category: "powerups",
            reward: 25,
            target: 1,
            getProgress: (stats) => Math.min(1, stats.totalPowerUpsCollected || 0),
            isCompleted: (stats) => (stats.totalPowerUpsCollected || 0) >= 1
        },
        {
            id: "power_collector",
            name: "Power Collector",
            description: "Toplam 25 Power-Up topla.",
            category: "powerups",
            reward: 100,
            target: 25,
            getProgress: (stats) => Math.min(25, stats.totalPowerUpsCollected || 0),
            isCompleted: (stats) => (stats.totalPowerUpsCollected || 0) >= 25
        },
        {
            id: "power_master",
            name: "Power Master",
            description: "Tek bir oyunda 3 farklı Power-Up kullan.",
            category: "powerups",
            reward: 150,
            target: 3,
            getProgress: (stats) => Math.min(3, typeof PowerUpManager !== 'undefined' ? PowerUpManager.getTypesUsedInCurrentGameCount() : 0),
            isCompleted: (stats) => typeof PowerUpManager !== 'undefined' && PowerUpManager.getTypesUsedInCurrentGameCount() >= 3
        },
        {
            id: "full_power",
            name: "Full Power",
            description: "7 farklı Power-Up türünün tamamını en az bir kez kullan.",
            category: "powerups",
            reward: 250,
            target: 7,
            getProgress: (stats) => Math.min(7, (stats.allPowerUpTypesEverUsed || []).length),
            isCompleted: (stats) => (stats.allPowerUpTypesEverUsed || []).length >= 7
        },
        {
            id: "snake_legend",
            name: "Yılan Efsanesi",
            description: "Tek bir oyunda 5000 skor yap.",
            category: "challenges",
            reward: 1000,
            target: 5000,
            getProgress: (stats) => Math.min(5000, stats.highestScore),
            isCompleted: (stats) => stats.highestScore >= 5000
        },
        {
            id: "accessory_stylist",
            name: "Aksesuar İkonu",
            category: "customization",
            description: "İlk aksesuarını aç veya satın al.",
            reward: 100,
            target: 1,
            getProgress: () => typeof AccessoryManager !== 'undefined' ? AccessoryManager.getCollectionStats().unlocked : 0,
            isCompleted: () => typeof AccessoryManager !== 'undefined' && AccessoryManager.getCollectionStats().unlocked >= 1
        },
        {
            id: "accessory_collector",
            name: "Şapka Koleksiyoncusu",
            category: "customization",
            description: "5 farklı aksesuar sahibi ol.",
            reward: 300,
            target: 5,
            getProgress: () => typeof AccessoryManager !== 'undefined' ? AccessoryManager.getCollectionStats().unlocked : 0,
            isCompleted: () => typeof AccessoryManager !== 'undefined' && AccessoryManager.getCollectionStats().unlocked >= 5
        },
        {
            id: "accessory_master",
            name: "Aksesuar Büyücüsü",
            category: "customization",
            description: "10 farklı aksesuar sahibi ol.",
            reward: 750,
            target: 10,
            getProgress: () => typeof AccessoryManager !== 'undefined' ? AccessoryManager.getCollectionStats().unlocked : 0,
            isCompleted: () => typeof AccessoryManager !== 'undefined' && AccessoryManager.getCollectionStats().unlocked >= 10
        },
        {
            id: "classic_master",
            name: "Classic Master",
            description: "Classic modunda 1000 skor yap.",
            category: "challenges",
            reward: 100,
            target: 1000,
            getProgress: () => Math.min(1000, GameModeManager.getBestScore('classic')),
            isCompleted: () => GameModeManager.getBestScore('classic') >= 1000
        },
        {
            id: "time_challenger",
            name: "Time Challenger",
            description: "Time Attack modunda 500 skor yap.",
            category: "challenges",
            reward: 100,
            target: 500,
            getProgress: () => Math.min(500, GameModeManager.getBestScore('time_attack')),
            isCompleted: () => GameModeManager.getBestScore('time_attack') >= 500
        },
        {
            id: "speed_demon",
            name: "Speed Demon",
            description: "Speed Run modunda Speed Level 5'e ulaş.",
            category: "challenges",
            reward: 150,
            target: 5,
            getProgress: (stats) => Math.min(5, stats.highestSpeedLevel || 1),
            isCompleted: (stats) => (stats.highestSpeedLevel || 1) >= 5
        },
        {
            id: "hardcore_survivor",
            name: "Hardcore Survivor",
            description: "Hardcore modunda 500 skor yap.",
            category: "challenges",
            reward: 250,
            target: 500,
            getProgress: () => Math.min(500, GameModeManager.getBestScore('hardcore')),
            isCompleted: () => GameModeManager.getBestScore('hardcore') >= 500
        },
        {
            id: "survivor",
            name: "Survivor",
            description: "Survival modunda 2 dakika hayatta kal.",
            category: "challenges",
            reward: 200,
            target: 120,
            getProgress: () => Math.min(120, GameModeManager.getBestTime('survival')),
            isCompleted: () => GameModeManager.getBestTime('survival') >= 120
        },
        {
            id: "obstacle_master",
            name: "Obstacle Master",
            description: "Obstacle modunda 1000 skor yap.",
            category: "challenges",
            reward: 250,
            target: 1000,
            getProgress: () => Math.min(1000, GameModeManager.getBestScore('obstacle')),
            isCompleted: () => GameModeManager.getBestScore('obstacle') >= 1000
        },
        {
            id: "level_10",
            name: "Level 10 Master",
            description: "Level 10 seviyesine ulaş.",
            category: "getting_started",
            reward: 100,
            target: 10,
            getProgress: () => Math.min(10, XPManager.getCurrentLevel()),
            isCompleted: () => XPManager.getCurrentLevel() >= 10
        },
        {
            id: "level_25",
            name: "Level 25 Expert",
            description: "Level 25 seviyesine ulaş.",
            category: "score",
            reward: 250,
            target: 25,
            getProgress: () => Math.min(25, XPManager.getCurrentLevel()),
            isCompleted: () => XPManager.getCurrentLevel() >= 25
        },
        {
            id: "level_50",
            name: "Level 50 Pro",
            description: "Level 50 seviyesine ulaş.",
            category: "score",
            reward: 500,
            target: 50,
            getProgress: () => Math.min(50, XPManager.getCurrentLevel()),
            isCompleted: () => XPManager.getCurrentLevel() >= 50
        },
        {
            id: "level_100",
            name: "Level 100 Legend",
            description: "Level 100 Snake Legend unvanını kazan.",
            category: "challenges",
            reward: 1000,
            target: 100,
            getProgress: () => Math.min(100, XPManager.getCurrentLevel()),
            isCompleted: () => XPManager.getCurrentLevel() >= 100
        },
        {
            id: "coin_hunter",
            name: "Altın Avcısı",
            description: "Toplam 1000 Coin kazan.",
            category: "coins",
            reward: 150,
            target: 1000,
            getProgress: (stats) => Math.min(1000, CoinManager.getCoins()),
            isCompleted: (stats) => CoinManager.getCoins() >= 1000
        },
        {
            id: "rich_snake",
            name: "Zengin Yılan",
            description: "Toplam 5000 Coin biriktir.",
            category: "coins",
            reward: 500,
            target: 5000,
            getProgress: (stats) => Math.min(5000, CoinManager.getCoins()),
            isCompleted: (stats) => CoinManager.getCoins() >= 5000
        },
        {
            id: "style_master",
            name: "Stil Sahibi",
            description: "3 farklı Tema sahibi ol.",
            category: "customize",
            reward: 150,
            target: 3,
            getProgress: (stats) => Math.min(3, InventoryManager.getOwnedThemes().length),
            isCompleted: (stats) => InventoryManager.getOwnedThemes().length >= 3
        },
        {
            id: "trail_blazer",
            name: "İz Bırakan",
            description: "3 farklı Yılan İzi sahibi ol.",
            category: "customize",
            reward: 150,
            target: 3,
            getProgress: (stats) => Math.min(3, InventoryManager.getOwnedTrails().length),
            isCompleted: (stats) => InventoryManager.getOwnedTrails().length >= 3
        },
        {
            id: "map_specialist",
            name: "Harita Uzmanı",
            description: "10 farklı Harita sahibi ol.",
            category: "maps",
            reward: 300,
            target: 10,
            getProgress: (stats) => Math.min(10, InventoryManager.getOwnedMaps().length),
            isCompleted: (stats) => InventoryManager.getOwnedMaps().length >= 10
        },
        {
            id: "streak_master",
            name: "Ateşli Yılan",
            description: "5 oyunluk seri (Streak) yap.",
            category: "challenges",
            reward: 200,
            target: 5,
            getProgress: (stats) => Math.min(5, stats.dailyStreak || 1),
            isCompleted: (stats) => (stats.dailyStreak || 1) >= 5
        },
        {
            id: "quick_reflexes",
            name: "Hızlı Refleks",
            description: "Tek oyunda 30 yem ye.",
            category: "food",
            reward: 100,
            target: 30,
            getProgress: (stats) => Math.min(30, stats.highestFoodInSingleGame || 0),
            isCompleted: (stats) => (stats.highestFoodInSingleGame || 0) >= 30
        },
        {
            id: "time_monster",
            name: "Zaman Canavarı",
            description: "Time Attack modunda 1000 skor yap.",
            category: "challenges",
            reward: 250,
            target: 1000,
            getProgress: () => Math.min(1000, GameModeManager.getBestScore('time_attack')),
            isCompleted: () => GameModeManager.getBestScore('time_attack') >= 1000
        },
        {
            id: "snake_king",
            name: "Yılan Kralı",
            description: "Level 15 seviyesine ulaş.",
            category: "getting_started",
            reward: 200,
            target: 15,
            getProgress: () => Math.min(15, XPManager.getCurrentLevel()),
            isCompleted: () => XPManager.getCurrentLevel() >= 15
        },
        {
            id: "legendary_collector",
            name: "Koleksiyon Ustası",
            description: "10 farklı Skin sahibi ol.",
            category: "skins",
            reward: 500,
            target: 10,
            getProgress: (stats) => Math.min(10, InventoryManager.getOwnedSkins().length),
            isCompleted: (stats) => InventoryManager.getOwnedSkins().length >= 10
        }
    ];

    let achToastTimeout = null;
    function showAchievementToast(ach) {
        const toastEl = document.getElementById('achievement-toast');
        const titleEl = document.getElementById('ach-toast-title');
        const descEl = document.getElementById('ach-toast-desc');
        const rewardEl = document.getElementById('ach-toast-reward');

        if (!toastEl) return;

        if (titleEl) titleEl.textContent = ach.name;
        if (descEl) descEl.textContent = ach.description;
        if (rewardEl) rewardEl.textContent = `+${ach.reward} COIN`;

        toastEl.classList.remove('hidden');
        playSound('reward');

        if (achToastTimeout) clearTimeout(achToastTimeout);
        achToastTimeout = setTimeout(() => {
            toastEl.classList.add('hidden');
        }, 4000);
    }

    const AchievementManager = {
        checkAchievements() {
            const stats = PlayerStats.getStats();
            let newlyUnlocked = false;

            ACHIEVEMENTS.forEach(ach => {
                if (!stats.unlockedAchievements.includes(ach.id)) {
                    if (ach.isCompleted(stats)) {
                        stats.unlockedAchievements.push(ach.id);
                        newlyUnlocked = true;

                        if (!stats.claimedAchievementRewards.includes(ach.id)) {
                            stats.claimedAchievementRewards.push(ach.id);
                            CoinManager.addCoins(ach.reward);
                            if (typeof XPManager !== 'undefined') {
                                XPManager.addXP(XP_CONFIG.ACHIEVEMENT_UNLOCKED, 'achievement');
                            }
                        }

                        showAchievementToast(ach);
                    }
                }
            });

            if (newlyUnlocked) {
                PlayerStats.saveStats(stats);
                updateMenuBadges();
                updateAllCoinDisplays();
            }
        },

        getProgressStats() {
            const stats = PlayerStats.getStats();
            const total = ACHIEVEMENTS.length;
            const unlocked = stats.unlockedAchievements.length;
            const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;
            return { total, unlocked, percent };
        }
    };

    const PlayerNameManager = {
        getName() {
            const saved = localStorage.getItem('snake_player_name');
            return saved && saved.trim() ? saved.trim() : 'Snake Player';
        },
        setName(newName) {
            let clean = (newName || '').trim();
            if (!clean) clean = 'Snake Player';
            if (clean.length > 16) clean = clean.substring(0, 16);
            localStorage.setItem('snake_player_name', clean);
            this.updateUI();
            return clean;
        },
        updateUI() {
            const name = this.getName();
            const displayEl = document.getElementById('menu-player-display');
            if (displayEl) {
                displayEl.textContent = `👤 ${name}`;
            }
            const settingsDisplayEl = document.getElementById('settings-player-name-display');
            if (settingsDisplayEl) {
                settingsDisplayEl.textContent = name;
            }
            const modalInput = document.getElementById('modal-player-name-input');
            if (modalInput && document.activeElement !== modalInput) {
                modalInput.value = name;
            }
        }
    };

    // Centralized XP & Level System Configuration
    const XP_CONFIG = {
        MAX_LEVEL: 100,
        MAX_LEVEL_TITLE: "🏆 Snake Legend",

        FOOD_NORMAL: 5,
        FOOD_MEGA: 25,
        GAME_COMPLETE: 25,
        NEW_RECORD: 100,
        POWERUP_DEFAULT: 10,
        POWERUP_MAGNET: 15,
        POWERUP_MEGAFOOD: 20,
        POWERUP_DOUBLECOIN: 15,
        POWERUP_GHOST: 15,
        POWERUP_SHIELD: 10,
        ACHIEVEMENT_UNLOCKED: 50,
        MISSION_DAILY: 40,
        MISSION_WEEKLY: 100,
        MISSION_DEFAULT: 30,

        MODE_MULTIPLIERS: {
            classic: 1.0,
            endless: 1.1,
            time_attack: 1.2,
            speed_run: 1.3,
            hardcore: 2.0,
            survival: 1.5,
            obstacle: 1.4
        },

        TITLES: [
            { maxLevel: 4, title: "🐣 Beginner" },
            { maxLevel: 9, title: "🐍 Snake Player" },
            { maxLevel: 19, title: "🎮 Snake Gamer" },
            { maxLevel: 29, title: "⚡ Snake Expert" },
            { maxLevel: 49, title: "🔥 Snake Pro" },
            { maxLevel: 74, title: "💎 Snake Master" },
            { maxLevel: 99, title: "👑 Snake Champion" },
            { maxLevel: 100, title: "🏆 Snake Legend" }
        ],

        getLevelRequiredXP(lvl) {
            if (lvl <= 1) return 0;
            if (lvl === 2) return 100;
            if (lvl === 3) return 250;
            if (lvl === 4) return 450;
            if (lvl === 5) return 700;
            if (lvl === 6) return 1000;
            return Math.floor(1000 + Math.pow(lvl - 6, 1.38) * 250);
        }
    };

    // Level Rewards Configuration (Levels 2-100)
    const LEVEL_REWARDS_CONFIG = {
        2: { type: 'coins', value: 50, label: '+50 Coin' },
        3: { type: 'coins', value: 50, label: '+50 Coin' },
        4: { type: 'coins', value: 75, label: '+75 Coin' },
        5: { type: 'trail', value: 'fire', label: '🔥 Ateş Trail', altCoins: 300 },
        6: { type: 'coins', value: 100, label: '+100 Coin' },
        7: { type: 'coins', value: 100, label: '+100 Coin' },
        8: { type: 'coins', value: 150, label: '+150 Coin (Power-Up Paket)' },
        9: { type: 'coins', value: 150, label: '+150 Coin' },
        10: { type: 'accessory', value: 'graduation_cap', label: '🎓 Mezuniyet Kepi Aksesuarı', altCoins: 500 },
        12: { type: 'coins', value: 200, label: '+200 Coin' },
        15: { type: 'map', value: 'forest', label: '🗺️ Orman Haritası', altCoins: 400 },
        18: { type: 'coins', value: 250, label: '+250 Coin' },
        20: { type: 'accessory', value: 'cowboy_hat', label: '🤠 Kovboy Şapkası Aksesuarı', altCoins: 600 },
        22: { type: 'coins', value: 300, label: '+300 Coin' },
        25: { type: 'skin', value: 'galaxy', label: '🐍 Galaksi Yılan Skin', altCoins: 500 },
        30: { type: 'accessory', value: 'wizard_hat', label: '🧙 Büyücü Şapkası Aksesuarı', altCoins: 800 },
        35: { type: 'coins', value: 400, label: '+400 Coin' },
        40: { type: 'skin', value: 'robot', label: '🐍 Robot Yılan Skin', altCoins: 600 },
        45: { type: 'coins', value: 500, label: '+500 Coin' },
        50: { type: 'accessory', value: 'crown', label: '👑 Kral Tacı Aksesuarı (Efsanevi)', altCoins: 1200 },
        60: { type: 'coins', value: 750, label: '+750 Coin' },
        70: { type: 'map', value: 'cybercity', label: '🗺️ Siber Şehir Haritası', altCoins: 800 },
        75: { type: 'accessory', value: 'space_helmet', label: '🚀 Astronot Kaskı Aksesuarı', altCoins: 1500 },
        80: { type: 'coins', value: 1000, label: '+1000 Coin' },
        90: { type: 'coins', value: 1500, label: '+1500 Coin' },
        100: { type: 'skin', value: 'rainbow', label: '🏆 Snake Legend Özel Skin (+2000 Coin)', altCoins: 2000 }
    };

    function getRewardForLevel(lvl) {
        if (LEVEL_REWARDS_CONFIG[lvl]) return LEVEL_REWARDS_CONFIG[lvl];
        const defaultCoins = 50 + (lvl * 10);
        return { type: 'coins', value: defaultCoins, label: `+${defaultCoins} Coin` };
    }

    const LevelRewardManager = {
        STORAGE_KEY: 'snake_claimed_level_rewards',
        claimedRewards: {},

        init() {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                try { this.claimedRewards = JSON.parse(saved); } catch(e) { this.claimedRewards = {}; }
            }
        },

        save() {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.claimedRewards));
        },

        hasClaimedReward(lvl) {
            return !!this.claimedRewards[lvl];
        },

        getRewardForLevel(lvl) {
            return getRewardForLevel(lvl);
        },

        grantReward(lvl) {
            if (this.hasClaimedReward(lvl)) return null;

            const reward = this.getRewardForLevel(lvl);
            let grantedText = reward.label;

            if (reward.type === 'coins') {
                CoinManager.addCoins(reward.value);
            } else if (reward.type === 'skin') {
                if (InventoryManager.isSkinOwned(reward.value)) {
                    const alt = reward.altCoins || 200;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Skin Zaten Var)`;
                } else {
                    InventoryManager.addSkin(reward.value);
                }
            } else if (reward.type === 'theme') {
                if (InventoryManager.isThemeOwned(reward.value)) {
                    const alt = reward.altCoins || 200;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Tema Zaten Var)`;
                } else {
                    InventoryManager.addTheme(reward.value);
                }
            } else if (reward.type === 'map') {
                if (InventoryManager.isMapOwned(reward.value)) {
                    const alt = reward.altCoins || 200;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Harita Zaten Var)`;
                } else {
                    InventoryManager.addMap(reward.value);
                }
            } else if (reward.type === 'trail') {
                if (InventoryManager.isTrailOwned(reward.value)) {
                    const alt = reward.altCoins || 300;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Trail Zaten Var)`;
                } else {
                    InventoryManager.addTrail(reward.value);
                }
            } else if (reward.type === 'accessory') {
                if (InventoryManager.isAccessoryOwned(reward.value)) {
                    const alt = reward.altCoins || 300;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Aksesuar Zaten Var)`;
                } else {
                    InventoryManager.addAccessory(reward.value);
                }
            }

            this.claimedRewards[lvl] = true;
            this.save();
            return grantedText;
        },

        getUnclaimedRewardsUpTo(currentLvl) {
            const unclaimed = [];
            for (let l = 2; l <= currentLvl; l++) {
                if (!this.hasClaimedReward(l)) {
                    unclaimed.push(l);
                }
            }
            return unclaimed;
        },

        claimReward(lvl) {
            const currentLvl = XPManager.getCurrentLevel();
            if (lvl > currentLvl) return false;
            if (this.hasClaimedReward(lvl)) return false;

            const text = this.grantReward(lvl);
            XPUI.updateAllUI();
            updateAllCoinDisplays();
            return text;
        }
    };

    const XPManager = {
        STORAGE_KEY: 'snake_player_xp_data',
        state: {
            totalXP: 0,
            currentLevel: 1,
            highestLevel: 1,
            totalLevelsGained: 0
        },

        init() {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                try {
                    this.state = { ...this.state, ...JSON.parse(saved) };
                } catch(e) {}
            }
            this.recalculateLevel(false);
        },

        save() {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        },

        getTotalXP() {
            return this.state.totalXP;
        },

        getCurrentLevel() {
            return this.state.currentLevel;
        },

        getTitleForLevel(lvl) {
            const targetLvl = lvl || this.state.currentLevel;
            for (let i = 0; i < XP_CONFIG.TITLES.length; i++) {
                if (targetLvl <= XP_CONFIG.TITLES[i].maxLevel) {
                    return XP_CONFIG.TITLES[i].title;
                }
            }
            return XP_CONFIG.MAX_LEVEL_TITLE;
        },

        getCurrentTitle() {
            return this.getTitleForLevel(this.state.currentLevel);
        },

        getXPForLevel(lvl) {
            return XP_CONFIG.getLevelRequiredXP(lvl);
        },

        getLevelXPStats() {
            const lvl = this.state.currentLevel;
            const curLvlBaseXP = XP_CONFIG.getLevelRequiredXP(lvl);

            if (lvl >= XP_CONFIG.MAX_LEVEL) {
                return {
                    level: XP_CONFIG.MAX_LEVEL,
                    currentLevelXP: this.state.totalXP - curLvlBaseXP,
                    neededLevelXP: 1,
                    progressPercent: 100,
                    isMax: true
                };
            }

            const nextLvlBaseXP = XP_CONFIG.getLevelRequiredXP(lvl + 1);
            const needed = nextLvlBaseXP - curLvlBaseXP;
            const current = Math.max(0, this.state.totalXP - curLvlBaseXP);
            const pct = Math.min(100, Math.floor((current / needed) * 100));

            return {
                level: lvl,
                currentLevelXP: current,
                neededLevelXP: needed,
                progressPercent: pct,
                isMax: false
            };
        },

        recalculateLevel(triggerLevelUpModal = true) {
            let lvl = 1;
            while (lvl < XP_CONFIG.MAX_LEVEL && this.state.totalXP >= XP_CONFIG.getLevelRequiredXP(lvl + 1)) {
                lvl++;
            }

            if (lvl > this.state.currentLevel) {
                const oldLvl = this.state.currentLevel;
                const newLvl = lvl;
                this.state.currentLevel = newLvl;
                if (newLvl > this.state.highestLevel) this.state.highestLevel = newLvl;
                this.state.totalLevelsGained += (newLvl - oldLvl);
                this.save();

                let lastRewardText = '';
                for (let l = oldLvl + 1; l <= newLvl; l++) {
                    const rText = LevelRewardManager.grantReward(l);
                    if (rText) lastRewardText = rText;
                }

                if (triggerLevelUpModal) {
                    XPUI.showLevelUpModal(oldLvl, newLvl, this.getCurrentTitle(), lastRewardText);
                }

                if (typeof AchievementManager !== 'undefined') {
                    AchievementManager.checkAchievements();
                }
            } else {
                this.state.currentLevel = lvl;
                this.save();
            }
        },

        addXP(rawAmount, source = '') {
            if (!rawAmount || rawAmount <= 0) return 0;

            let multiplier = 1.0;
            if (typeof GameModeManager !== 'undefined') {
                const modeId = GameModeManager.getCurrentModeId();
                multiplier = XP_CONFIG.MODE_MULTIPLIERS[modeId] || 1.0;
            }

            const actualXP = Math.floor(rawAmount * multiplier);
            this.state.totalXP += actualXP;
            this.save();

            if (isGameRunning) {
                XPUI.showFloatingXP(actualXP);
            }

            this.recalculateLevel(true);
            XPUI.updateAllUI();
            return actualXP;
        },

        resetXP() {
            this.state = { totalXP: 0, currentLevel: 1, highestLevel: 1, totalLevelsGained: 0 };
            this.save();
            LevelRewardManager.claimedRewards = {};
            LevelRewardManager.save();
            XPUI.updateAllUI();
        }
    };

    const XPUI = {
        floatingTimeout: null,
        pendingFloatingXP: 0,

        showFloatingXP(amount) {
            if (!amount || amount <= 0) return;
            this.pendingFloatingXP += amount;

            const xpToast = document.getElementById('xp-toast');
            if (!xpToast) return;

            xpToast.textContent = `+${this.pendingFloatingXP} XP`;
            xpToast.classList.remove('hidden');

            if (this.floatingTimeout) clearTimeout(this.floatingTimeout);
            this.floatingTimeout = setTimeout(() => {
                xpToast.classList.add('hidden');
                this.pendingFloatingXP = 0;
            }, 1500);
        },

        updateAllUI() {
            if (typeof PlayerNameManager !== 'undefined') {
                PlayerNameManager.updateUI();
            }
            const stats = XPManager.getLevelXPStats();
            const title = XPManager.getCurrentTitle();

            const menuLvlTitle = document.getElementById('menu-level-title');
            const menuLvlNum = document.getElementById('menu-level-num');
            const menuXpFill = document.getElementById('menu-xp-bar-fill');
            const menuXpProg = document.getElementById('menu-xp-progress');
            const menuXpPct = document.getElementById('menu-xp-percent');

            if (menuLvlTitle) menuLvlTitle.textContent = title;
            if (menuLvlNum) menuLvlNum.textContent = stats.isMax ? '⭐ SEVİYE 100 (MAX)' : `⭐ SEVİYE ${stats.level}`;
            if (menuXpFill) menuXpFill.style.width = `${stats.progressPercent}%`;
            if (menuXpProg) {
                menuXpProg.textContent = stats.isMax ? `${XPManager.getTotalXP().toLocaleString()} Total XP` : `${stats.currentLevelXP.toLocaleString()} / ${stats.neededLevelXP.toLocaleString()} XP`;
            }
            if (menuXpPct) menuXpPct.textContent = stats.isMax ? 'MAX' : `${stats.progressPercent}%`;

            const unclaimed = LevelRewardManager.getUnclaimedRewardsUpTo(stats.level);
            const lvlBadge = document.getElementById('level-rewards-badge');
            if (lvlBadge) {
                if (unclaimed.length > 0) {
                    lvlBadge.textContent = `${unclaimed.length} ÖDÜL!`;
                    lvlBadge.classList.remove('hidden');
                } else {
                    lvlBadge.classList.add('hidden');
                }
            }

            const modal = document.getElementById('level-rewards-modal');
            if (modal && !modal.classList.contains('hidden')) {
                this.renderLevelRewardsModal();
            }
        },

        renderLevelRewardsModal() {
            const stats = XPManager.getLevelXPStats();
            const title = XPManager.getCurrentTitle();

            const badgeEl = document.getElementById('level-title-badge');
            const lvlDisplay = document.getElementById('lvl-modal-level-display');
            const titleDisplay = document.getElementById('lvl-modal-title-display');
            const xpPct = document.getElementById('lvl-modal-xp-percent');
            const xpFill = document.getElementById('lvl-modal-xp-fill');
            const curXp = document.getElementById('lvl-modal-current-xp');
            const nextXp = document.getElementById('lvl-modal-next-xp');
            const totXp = document.getElementById('lvl-modal-total-xp');

            if (badgeEl) badgeEl.textContent = title;
            if (lvlDisplay) lvlDisplay.textContent = stats.isMax ? 'SEVİYE 100 (EFSANE)' : `SEVİYE ${stats.level}`;
            if (titleDisplay) titleDisplay.textContent = title;
            if (xpPct) xpPct.textContent = stats.isMax ? '100%' : `${stats.progressPercent}%`;
            if (xpFill) xpFill.style.width = `${stats.progressPercent}%`;
            if (curXp) curXp.textContent = stats.currentLevelXP.toLocaleString();
            if (nextXp) nextXp.textContent = stats.isMax ? 'MAX' : stats.neededLevelXP.toLocaleString();
            if (totXp) totXp.textContent = XPManager.getTotalXP().toLocaleString();

            const nextRwTitle = document.getElementById('lvl-next-reward-title');
            const nextRwNum = document.getElementById('lvl-next-reward-num');
            const nextLvl = stats.level < 100 ? stats.level + 1 : 100;
            const nextReward = LevelRewardManager.getRewardForLevel(nextLvl);
            if (nextRwTitle) nextRwTitle.textContent = nextReward.label;
            if (nextRwNum) nextRwNum.textContent = `LVL ${nextLvl}`;

            const listContainer = document.getElementById('level-rewards-list');
            if (!listContainer) return;
            listContainer.innerHTML = '';

            const currentLevel = stats.level;

            for (let l = 2; l <= 100; l++) {
                const reward = LevelRewardManager.getRewardForLevel(l);
                const isReached = l <= currentLevel;
                const isClaimed = LevelRewardManager.hasClaimedReward(l);

                const card = document.createElement('div');
                card.className = `achievement-card ${isClaimed ? 'claimed' : (isReached ? 'unlocked' : 'locked')}`;
                card.style.display = 'flex';
                card.style.justifyContent = 'space-between';
                card.style.alignItems = 'center';
                card.style.padding = '10px 14px';
                card.style.marginBottom = '8px';

                let statusBtnHTML = '';
                if (isClaimed) {
                    statusBtnHTML = `<span style="font-size: 0.75rem; font-weight: 800; color: #22c55e; background: rgba(34, 197, 94, 0.15); padding: 4px 10px; border-radius: 8px; border: 1px solid rgba(34, 197, 94, 0.3);">✓ ALINDI</span>`;
                } else if (isReached) {
                    statusBtnHTML = `<button class="btn btn-primary btn-claim-level-rw" data-level="${l}" style="font-size: 0.75rem; padding: 6px 12px; background: linear-gradient(135deg, #10b981, #059669);">ÖDÜLÜ AL</button>`;
                } else {
                    statusBtnHTML = `<span style="font-size: 0.75rem; font-weight: 800; color: #64748b; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 8px;">🔒 KİLİTLİ</span>`;
                }

                card.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 0.9rem; font-weight: 900; color: ${isReached ? '#ffd700' : '#94a3b8'}; background: rgba(0,0,0,0.3); width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid ${isReached ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.1)'};">
                            L${l}
                        </div>
                        <div>
                            <strong style="font-size: 0.88rem; color: #f8fafc; display: block;">${reward.label}</strong>
                            <span style="font-size: 0.7rem; color: #a1a1aa;">${XP_CONFIG.getLevelRequiredXP(l).toLocaleString()} Toplam XP Gereklidir</span>
                        </div>
                    </div>
                    <div>${statusBtnHTML}</div>
                `;

                const claimBtn = card.querySelector('.btn-claim-level-rw');
                if (claimBtn) {
                    claimBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        playSound('reward');
                        const text = LevelRewardManager.claimReward(l);
                        if (text) {
                            showCoinToast(text);
                        }
                        this.renderLevelRewardsModal();
                    });
                }

                listContainer.appendChild(card);
            }
        },

        showLevelUpModal(oldLvl, newLvl, newTitle, rewardText) {
            const modal = document.getElementById('level-up-modal');
            const oldNumEl = document.getElementById('lvlUp-old-num');
            const newNumEl = document.getElementById('lvlUp-new-num');
            const titleBadgeEl = document.getElementById('lvlUp-title-badge');
            const rewardTextEl = document.getElementById('lvlUp-reward-text');

            if (!modal) return;

            if (oldNumEl) oldNumEl.textContent = `LVL ${oldLvl}`;
            if (newNumEl) newNumEl.textContent = `LVL ${newLvl}`;
            if (titleBadgeEl) titleBadgeEl.textContent = newTitle;
            if (rewardTextEl) rewardTextEl.textContent = rewardText || '+100 Coin';

            if (isGameRunning && !isPaused) {
                isPaused = true;
                levelUpPausedGame = true;
                if (animFrameId) {
                    cancelAnimationFrame(animFrameId);
                    animFrameId = null;
                }
                if (typeof PowerUpManager !== 'undefined') PowerUpManager.onPause();
            }

            playSound('reward');
            modal.classList.remove('hidden');
        }
    };

    // Centralized Mission Manager (Daily & Weekly, No Emojis)
    const MissionManager = {
        DAILY_KEY: 'snake_daily_missions',
        WEEKLY_KEY: 'snake_weekly_missions',
        DAILY_DATE_KEY: 'snake_daily_mission_date',
        WEEKLY_DATE_KEY: 'snake_weekly_mission_date',

        getTodayString() {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        },

        getWeekTimestamp() {
            const d = new Date();
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(d.setDate(diff));
            monday.setHours(0, 0, 0, 0);
            return monday.getTime();
        },

        initMissions() {
            const today = this.getTodayString();
            const savedDailyDate = localStorage.getItem(this.DAILY_DATE_KEY);

            if (savedDailyDate !== today || !localStorage.getItem(this.DAILY_KEY)) {
                this.generateDailyMissions(today);
            }

            const currentWeekTs = this.getWeekTimestamp();
            const savedWeeklyDate = parseInt(localStorage.getItem(this.WEEKLY_DATE_KEY) || '0', 10);

            if (savedWeeklyDate !== currentWeekTs || !localStorage.getItem(this.WEEKLY_KEY)) {
                this.generateWeeklyMissions(currentWeekTs);
            }
        },

        generateDailyMissions(todayStr) {
            const dailyPool = [
                { id: 'd_food_20', title: '20 Yem Ye', desc: 'Bir günde toplam 20 adet yem ye.', target: 20, reward: 25, type: 'food' },
                { id: 'd_score_100', title: '100 Skor Yap', desc: 'Bir günde en az 100 skora ulaş.', target: 100, reward: 30, type: 'score' },
                { id: 'd_games_3', title: '3 Oyun Tamamla', desc: 'Toplam 3 adet oyun oyna.', target: 3, reward: 50, type: 'games' },
                { id: 'd_maps_2', title: '2 Farklı Harita', desc: 'Bugün 2 farklı haritada oyna.', target: 2, reward: 40, type: 'maps' }
            ];

            const missions = dailyPool.map(m => ({
                ...m,
                progress: 0,
                claimed: false
            })).slice(0, 3);

            localStorage.setItem(this.DAILY_KEY, JSON.stringify(missions));
            localStorage.setItem(this.DAILY_DATE_KEY, todayStr);
        },

        generateWeeklyMissions(weekTs) {
            const weeklyPool = [
                { id: 'w_games_10', title: '10 Oyun Tamamla', desc: 'Bu hafta toplam 10 oyun tamamla.', target: 10, reward: 200, type: 'games' },
                { id: 'w_food_250', title: '250 Yem Ye', desc: 'Bu hafta toplam 250 yem topla.', target: 250, reward: 250, type: 'food' },
                { id: 'w_score_500', title: '500 Skor Yap', desc: 'Herhangi bir oyunda 500 skora ulaş.', target: 500, reward: 300, type: 'score' },
                { id: 'w_powerups_10', title: '10 Power-Up Topla', desc: 'Bu hafta toplam 10 adet Power-Up topla.', target: 10, reward: 200, type: 'powerup' },
                { id: 'w_maps_3', title: '3 Farklı Harita', desc: 'Bu hafta 3 farklı haritada oyna.', target: 3, reward: 150, type: 'maps' },
                { id: 'w_score_1000', title: '1000 Toplam Skor', desc: 'Bu hafta toplam 1000 skora ulaş.', target: 1000, reward: 400, type: 'total_score' },
                { id: 'w_streak_3', title: '3 Gün Üst Üste Oyna', desc: 'Bu hafta 3 farklı günde oyuna giriş yap.', target: 3, reward: 250, type: 'days' }
            ];

            const missions = weeklyPool.map(m => ({
                ...m,
                progress: 0,
                claimed: false
            }));

            localStorage.setItem(this.WEEKLY_KEY, JSON.stringify(missions));
            localStorage.setItem(this.WEEKLY_DATE_KEY, weekTs.toString());
        },

        getDailyMissions() {
            this.initMissions();
            try {
                return JSON.parse(localStorage.getItem(this.DAILY_KEY)) || [];
            } catch (e) {
                return [];
            }
        },

        getWeeklyMissions() {
            this.initMissions();
            try {
                let missions = JSON.parse(localStorage.getItem(this.WEEKLY_KEY)) || [];
                const weeklyPool = [
                    { id: 'w_games_10', title: '10 Oyun Tamamla', desc: 'Bu hafta toplam 10 oyun tamamla.', target: 10, reward: 200, type: 'games' },
                    { id: 'w_food_250', title: '250 Yem Ye', desc: 'Bu hafta toplam 250 yem topla.', target: 250, reward: 250, type: 'food' },
                    { id: 'w_score_500', title: '500 Skor Yap', desc: 'Herhangi bir oyunda 500 skora ulaş.', target: 500, reward: 300, type: 'score' },
                    { id: 'w_powerups_10', title: '10 Power-Up Topla', desc: 'Bu hafta toplam 10 adet Power-Up topla.', target: 10, reward: 200, type: 'powerup' },
                    { id: 'w_maps_3', title: '3 Farklı Harita', desc: 'Bu hafta 3 farklı haritada oyna.', target: 3, reward: 150, type: 'maps' },
                    { id: 'w_score_1000', title: '1000 Toplam Skor', desc: 'Bu hafta toplam 1000 skora ulaş.', target: 1000, reward: 400, type: 'total_score' },
                    { id: 'w_streak_3', title: '3 Gün Üst Üste Oyna', desc: 'Bu hafta 3 farklı günde oyuna giriş yap.', target: 3, reward: 250, type: 'days' }
                ];

                let needsSave = false;
                weeklyPool.forEach(poolItem => {
                    if (!missions.some(m => m.id === poolItem.id)) {
                        missions.push({
                            ...poolItem,
                            progress: 0,
                            claimed: false
                        });
                        needsSave = true;
                    }
                });

                if (needsSave) {
                    this.saveWeeklyMissions(missions);
                }

                return missions;
            } catch (e) {
                return [];
            }
        },

        saveDailyMissions(missions) {
            localStorage.setItem(this.DAILY_KEY, JSON.stringify(missions));
        },

        saveWeeklyMissions(missions) {
            localStorage.setItem(this.WEEKLY_KEY, JSON.stringify(missions));
        },

        onFoodEaten(count = 1) {
            const daily = this.getDailyMissions();
            let changed = false;

            daily.forEach(m => {
                if (m.type === 'food' && m.progress < m.target) {
                    m.progress = Math.min(m.target, m.progress + count);
                    changed = true;
                }
            });
            if (changed) this.saveDailyMissions(daily);

            const weekly = this.getWeeklyMissions();
            let weeklyChanged = false;

            weekly.forEach(m => {
                if (m.type === 'food' && m.progress < m.target) {
                    m.progress = Math.min(m.target, m.progress + count);
                    weeklyChanged = true;
                }
            });
            if (weeklyChanged) this.saveWeeklyMissions(weekly);
        },

        onScoreUpdate(score) {
            const daily = this.getDailyMissions();
            let changed = false;

            daily.forEach(m => {
                if (m.type === 'score' && m.progress < m.target) {
                    m.progress = Math.min(m.target, Math.max(m.progress, score));
                    changed = true;
                }
            });
            if (changed) this.saveDailyMissions(daily);

            const weekly = this.getWeeklyMissions();
            let weeklyChanged = false;

            weekly.forEach(m => {
                if (m.type === 'score' && m.progress < m.target) {
                    m.progress = Math.min(m.target, Math.max(m.progress, score));
                    weeklyChanged = true;
                }
            });
            if (weeklyChanged) this.saveWeeklyMissions(weekly);
        },

        onGameStart(mapId) {
            const daily = this.getDailyMissions();
            let changed = false;
            const stats = PlayerStats.getStats();

            daily.forEach(m => {
                if (m.type === 'maps' && m.progress < m.target) {
                    m.progress = Math.min(m.target, stats.playedMaps.length);
                    changed = true;
                }
            });
            if (changed) this.saveDailyMissions(daily);

            const weekly = this.getWeeklyMissions();
            let weeklyChanged = false;
            weekly.forEach(m => {
                if (m.type === 'maps' && m.progress < m.target) {
                    m.progress = Math.min(m.target, stats.playedMaps.length);
                    weeklyChanged = true;
                }
                if (m.type === 'days' && m.progress < m.target) {
                    m.progress = Math.min(m.target, stats.dailyStreak || 1);
                    weeklyChanged = true;
                }
            });
            if (weeklyChanged) this.saveWeeklyMissions(weekly);
        },

        onGameOver(finalScore, foodEaten) {
            const daily = this.getDailyMissions();
            let changed = false;

            daily.forEach(m => {
                if (m.type === 'games' && m.progress < m.target) {
                    m.progress = Math.min(m.target, m.progress + 1);
                    changed = true;
                }
            });
            if (changed) this.saveDailyMissions(daily);

            const weekly = this.getWeeklyMissions();
            let weeklyChanged = false;

            weekly.forEach(m => {
                if (m.type === 'games' && m.progress < m.target) {
                    m.progress = Math.min(m.target, m.progress + 1);
                    weeklyChanged = true;
                }
                if (m.type === 'total_score' && m.progress < m.target) {
                    m.progress = Math.min(m.target, m.progress + finalScore);
                    weeklyChanged = true;
                }
            });
            if (weeklyChanged) this.saveWeeklyMissions(weekly);
        },

        claimMissionReward(isWeekly, missionId) {
            const list = isWeekly ? this.getWeeklyMissions() : this.getDailyMissions();
            const mission = list.find(m => m.id === missionId);

            if (mission && mission.progress >= mission.target && !mission.claimed) {
                mission.claimed = true;
                if (isWeekly) this.saveWeeklyMissions(list);
                else this.saveDailyMissions(list);

                CoinManager.addCoins(mission.reward);
                const xpReward = isWeekly ? XP_CONFIG.MISSION_WEEKLY : XP_CONFIG.MISSION_DAILY;
                XPManager.addXP(xpReward, 'mission');

                playSound('reward');
                showCoinToast(`+${mission.reward} COIN & +${xpReward} XP`);
                updateAllCoinDisplays();
                updateMenuBadges();
                return true;
            }
            return false;
        },

        hasClaimableMissions() {
            const daily = this.getDailyMissions();
            const weekly = this.getWeeklyMissions();
            return daily.some(m => m.progress >= m.target && !m.claimed) ||
                   weekly.some(m => m.progress >= m.target && !m.claimed);
        }
    };

    // UI View Renderers for Achievements & Missions
    let selectedAchCategory = 'all';

    function renderAchievementsList() {
        const listEl = document.getElementById('achievements-list');
        if (!listEl) return;
        listEl.innerHTML = '';

        const stats = PlayerStats.getStats();
        const { total, unlocked, percent } = AchievementManager.getProgressStats();

        const summaryBadge = document.getElementById('achievements-summary-badge') || document.getElementById('goals-summary-badge');
        const overallPercentEl = document.getElementById('ach-overall-percent');
        const overallFillEl = document.getElementById('ach-overall-fill');

        if (summaryBadge) summaryBadge.textContent = `${unlocked} / ${total}`;
        if (overallPercentEl) overallPercentEl.textContent = `${percent}%`;
        if (overallFillEl) overallFillEl.style.width = `${percent}%`;

        const totalGamesEl = document.getElementById('stat-total-games');
        const totalFoodEl = document.getElementById('stat-total-food');
        const highScoreEl = document.getElementById('stat-high-score');
        const playedMapsEl = document.getElementById('stat-played-maps');

        if (totalGamesEl) totalGamesEl.textContent = stats.completedGames;
        if (totalFoodEl) totalFoodEl.textContent = stats.totalFoodEaten;
        if (highScoreEl) highScoreEl.textContent = stats.highestScore;
        if (playedMapsEl) playedMapsEl.textContent = stats.playedMaps.length;

        ACHIEVEMENTS.forEach(ach => {
            const isUnlocked = stats.unlockedAchievements.includes(ach.id);
            const progress = ach.getProgress(stats);
            const target = ach.target;
            const progressPercent = Math.min(100, Math.round((progress / target) * 100));

            const card = document.createElement('div');
            let cardStatusClass = isUnlocked ? 'completed' : (progress > 0 ? 'in-progress' : 'locked');
            card.className = `ach-card ${cardStatusClass}`;

            let statusText = isUnlocked ? 'TAMAMLANDI' : (progress > 0 ? `${progress}/${target}` : `KİLİTLİ`);
            let statusBadgeClass = isUnlocked ? 'completed' : (progress > 0 ? 'in-progress' : 'locked');

            card.innerHTML = `
                <div class="ach-info">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="ach-title">${ach.name}</span>
                        <span class="ach-status-badge ${statusBadgeClass}">${statusText}</span>
                    </div>
                    <span class="ach-desc">${ach.description}</span>
                    <div class="ach-progress-row" style="margin-top: 4px;">
                        <div class="progress-track" style="height: 6px;">
                            <div class="progress-fill" style="width: ${progressPercent}%; ${isUnlocked ? 'background: #22c55e;' : ''}"></div>
                        </div>
                    </div>
                </div>
                <div class="mission-reward-badge">+${ach.reward} COIN</div>
            `;

            listEl.appendChild(card);
        });
    }

    let activeMissionTab = 'daily';

    function renderMissionsList() {
        const listEl = document.getElementById('missions-list');
        if (!listEl) return;
        listEl.innerHTML = '';

        const isWeekly = (activeMissionTab === 'weekly');
        const missions = isWeekly ? MissionManager.getWeeklyMissions() : MissionManager.getDailyMissions();

        const goalsSummaryBadge = document.getElementById('goals-summary-badge');
        if (goalsSummaryBadge) {
            const completedM = missions.filter(m => m.progress >= m.target).length;
            goalsSummaryBadge.textContent = `${completedM} / ${missions.length}`;
        }

        const typePill = document.getElementById('missions-type-pill');
        if (typePill) {
            typePill.textContent = isWeekly ? 'HAFTALIK' : 'GÜNLÜK';
        }

        const timerEl = document.getElementById('mission-reset-timer');
        if (timerEl) {
            if (isWeekly) {
                timerEl.textContent = 'Yenilenme Kalan Süre: Her Pazartesi 00:00';
            } else {
                timerEl.textContent = 'Yenilenme Kalan Süre: Her Gün 00:00';
            }
        }

        missions.forEach(m => {
            const isReady = (m.progress >= m.target);
            const isClaimed = m.claimed;

            const card = document.createElement('div');
            card.className = `mission-card ${isReady && !isClaimed ? 'claimable' : ''}`;

            let actionBtnHtml = '';
            if (isClaimed) {
                actionBtnHtml = `<button class="claim-btn btn-claimed" disabled>ALINDI</button>`;
            } else if (isReady) {
                actionBtnHtml = `<button class="claim-btn btn-ready" data-id="${m.id}">ÖDÜLÜ AL (+${m.reward} COIN)</button>`;
            } else {
                actionBtnHtml = `<button class="claim-btn btn-locked" disabled>${m.progress} / ${m.target}</button>`;
            }

            const percent = Math.min(100, Math.round((m.progress / m.target) * 100));

            card.innerHTML = `
                <div class="mission-top-row">
                    <div class="mission-title-box">
                        <span class="mission-title">${m.title}</span>
                        <span class="mission-desc">${m.desc}</span>
                    </div>
                    <div class="mission-reward-badge">+${m.reward} COIN</div>
                </div>
                <div class="progress-track" style="height: 6px; margin: 4px 0;">
                    <div class="progress-fill" style="width: ${percent}%;"></div>
                </div>
                <div class="mission-action-row">
                    ${actionBtnHtml}
                </div>
            `;

            const btn = card.querySelector('.claim-btn.btn-ready');
            if (btn) {
                btn.addEventListener('click', () => {
                    if (MissionManager.claimMissionReward(isWeekly, m.id)) {
                        renderMissionsList();
                    }
                });
            }

            listEl.appendChild(card);
        });
    }

    function updateMenuBadges() {
        const goalsBadge = document.getElementById('goals-badge');
        if (goalsBadge) {
            if (MissionManager.hasClaimableMissions()) {
                goalsBadge.classList.remove('hidden');
            } else {
                goalsBadge.classList.add('hidden');
            }
        }
    }

    function updateAllCoinDisplays() {
        const isUnlim = CoinManager.isUnlimited();
        const coinsVal = isUnlim ? '999,999 🪙 (∞)' : CoinManager.getCoins();
        const headerCoinsEl = document.getElementById('header-coins');
        const menuCoinsEl = document.getElementById('menu-coins');
        const shopCoinsEl = document.getElementById('shop-coins-val');

        if (headerCoinsEl) headerCoinsEl.textContent = isUnlim ? '999,999 (∞)' : CoinManager.getCoins();
        if (menuCoinsEl) menuCoinsEl.textContent = isUnlim ? '999,999 (∞)' : CoinManager.getCoins();
        if (shopCoinsEl) shopCoinsEl.textContent = isUnlim ? '999,999 (∞)' : CoinManager.getCoins();
    }

    let toastTimeout = null;
    function showCoinToast(text, isSpend = false) {
        const toastEl = document.getElementById('coin-toast');
        if (!toastEl) return;

        toastEl.innerHTML = `<img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin"> ${text}`;
        toastEl.classList.remove('hidden');
        void toastEl.offsetWidth;

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.add('hidden');
        }, 1500);
    }

    // Selected State
    let selectedSkin = localStorage.getItem('snake_selected_skin') || 'classic';
    let selectedTheme = localStorage.getItem('snake_selected_theme') || 'dark';
    let selectedMap = localStorage.getItem('snake_selected_map') || 'classic';

    // Theme Application
    function applyTheme(themeId) {
        selectedTheme = themeId;
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('snake_selected_theme', themeId);
        if (!isGameRunning) {
            renderFrame();
        }
    }

    // D-Pad Controls
    const btnUp = document.getElementById('btn-up');
    const btnDown = document.getElementById('btn-down');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    // Game Config & Grid Constants
    const GRID_SIZE = 20;
    let tileSize = 20;
    let canvasWidth = 400;
    let canvasHeight = 400;

    // Game State Variables
    let snake = [];
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let directionQueue = [];
    let food = { x: 15, y: 10, isSpecial: false };
    let particles = [];
    let score = 0;
    let highScore = localStorage.getItem('snake_high_score') ? parseInt(localStorage.getItem('snake_high_score'), 10) : 0;
    let gameCoinsEarnedFromFood = 0;
    
    let isGameRunning = false;
    let isPaused = false;
    let levelUpPausedGame = false;
    let animFrameId = null;
    let lastStepTime = 0;
    let baseSpeed = 140;
    let currentSpeed = 140;
    let foodEatenCount = 0;

    // ==========================================
    // 📳 VIBRATION / HAPTIC FEEDBACK MANAGER
    // ==========================================
    const VibrationManager = {
        enabled: true,
        init() {
            if (typeof AudioManager !== 'undefined' && AudioManager.settings && typeof AudioManager.settings.vibrationEnabled === 'boolean') {
                this.enabled = AudioManager.settings.vibrationEnabled;
            } else {
                const saved = localStorage.getItem('snake_audio_settings');
                if (saved) {
                    try {
                        const settings = JSON.parse(saved);
                        if (typeof settings.vibrationEnabled === 'boolean') {
                            this.enabled = settings.vibrationEnabled;
                        }
                    } catch(e) {}
                }
            }
        },
        isEnabled() {
            return this.enabled && (typeof AudioManager === 'undefined' || !AudioManager.settings || AudioManager.settings.vibrationEnabled !== false);
        },
        setEnabled(val) {
            const boolVal = Boolean(val);
            this.enabled = boolVal;
            if (typeof AudioManager !== 'undefined') {
                if (AudioManager.settings) {
                    AudioManager.settings.vibrationEnabled = boolVal;
                }
                if (AudioManager.saveSettings) {
                    AudioManager.saveSettings();
                }
            } else {
                localStorage.setItem('snake_audio_settings', JSON.stringify({ vibrationEnabled: boolVal }));
            }
        },
        vibrate(pattern) {
            if (!this.isEnabled()) return;
            try {
                if (window.AndroidVibration && typeof window.AndroidVibration.vibrate === 'function') {
                    const ms = Array.isArray(pattern) ? (pattern[0] || 30) : Number(pattern);
                    window.AndroidVibration.vibrate(ms);
                } else if (navigator && typeof navigator.vibrate === 'function') {
                    navigator.vibrate(pattern);
                }
            } catch(e) {}
        },
        light() { this.vibrate(20); },
        medium() { this.vibrate(40); },
        heavy() { this.vibrate(80); },
        success() { this.vibrate([30, 50, 40]); },
        error() { this.vibrate([50, 60, 50, 60, 50]); },
        warning() { this.vibrate([40, 40, 40]); }
    };

    // ==========================================
    // 🎵 CENTRAL SOUND & MUSIC CONFIGURATIONS
    // ==========================================
    const SOUND_CONFIG = {
        food_eat: { src: 'assets/audio/sfx/food_eat.wav', volume: 0.7, priority: 'LOW' },
        special_food: { src: 'assets/audio/sfx/special_food.wav', volume: 0.85, priority: 'MEDIUM' },
        powerup_collect: { src: 'assets/audio/sfx/powerup_collect.wav', volume: 0.8, priority: 'MEDIUM' },
        powerup_activate: { src: 'assets/audio/sfx/powerup_activate.wav', volume: 0.8, priority: 'MEDIUM' },
        powerup_expire: { src: 'assets/audio/sfx/powerup_expire.wav', volume: 0.7, priority: 'MEDIUM' },
        coin_collect: { src: 'assets/audio/sfx/coin_collect.wav', volume: 0.8, priority: 'MEDIUM' },
        button_click: { src: 'assets/audio/sfx/button_click.wav', volume: 0.5, priority: 'LOW' },
        button_back: { src: 'assets/audio/sfx/button_back.wav', volume: 0.5, priority: 'LOW' },
        game_start: { src: 'assets/audio/sfx/game_start.wav', volume: 0.9, priority: 'HIGH' },
        game_over: { src: 'assets/audio/sfx/game_over.wav', volume: 0.95, priority: 'HIGH' },
        new_record: { src: 'assets/audio/sfx/new_record.wav', volume: 1.0, priority: 'HIGH' },
        level_up: { src: 'assets/audio/sfx/level_up.wav', volume: 1.0, priority: 'HIGH' },
        achievement_unlock: { src: 'assets/audio/sfx/achievement_unlock.wav', volume: 0.95, priority: 'HIGH' },
        mission_complete: { src: 'assets/audio/sfx/mission_complete.wav', volume: 0.85, priority: 'MEDIUM' },
        daily_reward: { src: 'assets/audio/sfx/daily_reward.wav', volume: 0.9, priority: 'MEDIUM' },
        streak_increase: { src: 'assets/audio/sfx/streak_increase.wav', volume: 0.85, priority: 'MEDIUM' },
        streak_milestone: { src: 'assets/audio/sfx/streak_milestone.wav', volume: 1.0, priority: 'HIGH' },
        reward_unlock: { src: 'assets/audio/sfx/reward_unlock.wav', volume: 0.85, priority: 'MEDIUM' },
        shop_purchase: { src: 'assets/audio/sfx/shop_purchase.wav', volume: 0.85, priority: 'MEDIUM' },
        item_equip: { src: 'assets/audio/sfx/item_equip.wav', volume: 0.6, priority: 'LOW' },
        pause: { src: 'assets/audio/sfx/pause.wav', volume: 0.6, priority: 'LOW' },
        resume: { src: 'assets/audio/sfx/resume.wav', volume: 0.6, priority: 'LOW' },
        countdown: { src: 'assets/audio/sfx/countdown.wav', volume: 0.8, priority: 'MEDIUM' },
        time_up: { src: 'assets/audio/sfx/time_up.wav', volume: 0.95, priority: 'HIGH' },
        error: { src: 'assets/audio/sfx/error.wav', volume: 0.7, priority: 'MEDIUM' }
    };

    const MUSIC_CONFIG = {
        menu_music: { src: 'assets/audio/music/menu.mp3', loop: true },
        game_music: { src: 'assets/audio/music/game.mp3', loop: true },
        classic_music: { src: 'assets/audio/music/classic.mp3', loop: true },
        endless_music: { src: 'assets/audio/music/endless.mp3', loop: true },
        time_attack_music: { src: 'assets/audio/music/time_attack.mp3', loop: true },
        speed_music: { src: 'assets/audio/music/speed_run.mp3', loop: true },
        hardcore_music: { src: 'assets/audio/music/hardcore.mp3', loop: true },
        survival_music: { src: 'assets/audio/music/survival.mp3', loop: true },
        obstacle_music: { src: 'assets/audio/music/obstacle.mp3', loop: true },
        game_over_music: { src: 'assets/audio/music/game_over.mp3', loop: false },
        shop_music: { src: 'assets/audio/music/shop.mp3', loop: true },
        daily_reward_music: { src: 'assets/audio/music/daily_reward.mp3', loop: true }
    };

    // ==========================================
    // 🎶 UNIFIED AUDIO MANAGER ENGINE
    // ==========================================
    const AudioManager = {
        settings: {
            masterVolume: 0.8,
            musicVolume: 0.6,
            soundVolume: 0.75,
            musicEnabled: true,
            soundEnabled: true,
            vibrationEnabled: true
        },
        audioCtx: null,
        audioElements: {},
        musicAudioElement: null,
        currentMusicId: null,
        lastPlayTimes: {},
        activeSynthMusicTimer: null,
        nextSynthNoteTime: 0,
        musicStep: 0,

        init() {
            this.loadSettings();
            VibrationManager.init();
            this.setupAutoplayUnlock();
            this.bindSettingsUI();
        },

        loadSettings() {
            const saved = localStorage.getItem('snake_audio_settings');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    this.settings = { ...this.settings, ...parsed };
                } catch(e) {}
            }
        },

        saveSettings() {
            this.settings.vibrationEnabled = VibrationManager.enabled;
            localStorage.setItem('snake_audio_settings', JSON.stringify(this.settings));
            this.updateSettingsUI();
        },

        getAudioContext() {
            if (!this.audioCtx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) {
                    this.audioCtx = new AudioCtxClass();
                }
            }
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume().catch(() => {});
            }
            return this.audioCtx;
        },

        setupAutoplayUnlock() {
            const unlock = () => {
                if (this.audioCtx && this.audioCtx.state === 'suspended') {
                    this.audioCtx.resume().catch(() => {});
                } else {
                    this.getAudioContext();
                }
                if (this.settings.musicEnabled && !this.activeSynthMusicTimer) {
                    const track = (!isGameRunning) ? 'menu_music' : (this.currentMusicId || 'menu_music');
                    this.playMusic(track);
                }
            };
            document.addEventListener('click', unlock, { passive: true, once: true });
            document.addEventListener('touchstart', unlock, { passive: true, once: true });
            document.addEventListener('keydown', unlock, { passive: true, once: true });
        },

        getFinalSoundVolume(soundId) {
            if (!this.settings.soundEnabled) return 0;
            const cfg = SOUND_CONFIG[soundId] || { volume: 0.8 };
            return this.settings.masterVolume * this.settings.soundVolume * cfg.volume;
        },

        getFinalMusicVolume() {
            if (!this.settings.musicEnabled) return 0;
            return this.settings.masterVolume * this.settings.musicVolume;
        },

        // 1. playSound
        playSound(soundId) {
            if (!this.settings.soundEnabled) return;
            const finalVol = this.getFinalSoundVolume(soundId);
            if (finalVol <= 0) return;

            // Throttle rapid repeated sounds (e.g. food_eat min 50ms)
            const now = Date.now();
            if (this.lastPlayTimes[soundId] && (now - this.lastPlayTimes[soundId]) < 50) {
                return;
            }
            this.lastPlayTimes[soundId] = now;

            this.playSynthesizedSound(soundId, finalVol);
        },

        playSynthesizedSound(soundId, vol) {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(vol, now);
            gain.connect(ctx.destination);

            const osc = ctx.createOscillator();
            osc.connect(gain);

            switch(soundId) {
                case 'food_eat':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(600, now);
                    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                    break;
                case 'special_food':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(700, now);
                    osc.frequency.setValueAtTime(1000, now + 0.06);
                    osc.frequency.setValueAtTime(1400, now + 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
                    osc.start(now);
                    osc.stop(now + 0.18);
                    break;
                case 'powerup_collect':
                case 'powerup_activate':
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(400, now);
                    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.start(now);
                    osc.stop(now + 0.2);
                    break;
                case 'powerup_expire':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(1000, now);
                    osc.frequency.exponentialRampToValueAtTime(300, now + 0.22);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                    osc.start(now);
                    osc.stop(now + 0.22);
                    break;
                case 'coin_collect':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(987, now);
                    osc.frequency.setValueAtTime(1318, now + 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.start(now);
                    osc.stop(now + 0.2);
                    break;
                case 'button_click':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(800, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                    osc.start(now);
                    osc.stop(now + 0.03);
                    break;
                case 'button_back':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(450, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                    osc.start(now);
                    osc.stop(now + 0.04);
                    break;
                case 'game_start':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(523.25, now);
                    osc.frequency.setValueAtTime(659.25, now + 0.08);
                    osc.frequency.setValueAtTime(783.99, now + 0.16);
                    osc.frequency.setValueAtTime(1046.50, now + 0.24);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                    break;
                case 'game_over':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(350, now);
                    osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                    osc.start(now);
                    osc.stop(now + 0.45);
                    break;
                case 'new_record':
                case 'level_up':
                case 'achievement_unlock':
                case 'streak_milestone':
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(523.25, now);
                    osc.frequency.setValueAtTime(659.25, now + 0.1);
                    osc.frequency.setValueAtTime(783.99, now + 0.2);
                    osc.frequency.setValueAtTime(1046.50, now + 0.3);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                    osc.start(now);
                    osc.stop(now + 0.5);
                    break;
                case 'error':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(160, now);
                    osc.frequency.setValueAtTime(120, now + 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                    break;
                default:
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(500, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;
            }
        },

        // 2. playMusic
        playMusic(trackId, fade = true) {
            if (!this.settings.musicEnabled) return;
            if (this.currentMusicId === trackId && this.activeSynthMusicTimer) {
                return;
            }

            this.stopMusic(fade);

            this.currentMusicId = trackId;
            this.startSynthMusicLoop(trackId);
        },

        fadeAudio(audio, startVol, endVol, durationMs) {
            if (!audio) return;
            let startTime = performance.now();
            const step = (now) => {
                let elapsed = now - startTime;
                let progress = Math.min(1, elapsed / durationMs);
                try {
                    audio.volume = startVol + (endVol - startVol) * progress;
                } catch(e) {}
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        },

        startSynthMusicLoop(trackId) {
            if (this.activeSynthMusicTimer) {
                clearInterval(this.activeSynthMusicTimer);
                this.activeSynthMusicTimer = null;
            }
            if (!this.settings.musicEnabled) return;

            this.musicStep = 0;
            const ctx = this.audioCtx || this.getAudioContext();
            if (!ctx) return;

            this.nextSynthNoteTime = ctx.currentTime + 0.05;

            const SYNTH_TRACKS = {
                menu_music: {
                    stepDuration: 0.32,
                    leadOscType: 'triangle',
                    bassOscType: 'sine',
                    leadNotes: [261.63, 329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 329.63],
                    bassNotes: [],
                    percStyle: 'none',
                    leadVol: 0.15,
                    bassVol: 0.0
                },
                classic_music: {
                    stepDuration: 0.14,
                    leadOscType: 'square',
                    bassOscType: 'sawtooth',
                    leadNotes: [
                        220.00, 329.63, 440.00, 523.25, 659.25, 523.25, 440.00, 329.63,
                        261.63, 392.00, 523.25, 659.25, 783.99, 659.25, 523.25, 392.00,
                        293.66, 440.00, 587.33, 698.46, 880.00, 698.46, 587.33, 440.00,
                        329.63, 493.88, 659.25, 783.99, 987.77, 783.99, 659.25, 493.88
                    ],
                    bassNotes: [110.00, 110.00, 130.81, 130.81, 146.83, 146.83, 164.81, 164.81],
                    percStyle: 'hihat',
                    leadVol: 0.10,
                    bassVol: 0.16
                },
                endless_music: {
                    stepDuration: 0.20,
                    leadOscType: 'sine',
                    bassOscType: 'triangle',
                    leadNotes: [293.66, 349.23, 440.00, 523.25, 587.33, 523.25, 440.00, 349.23, 261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63, 220.00, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63, 261.63, 196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66, 246.94],
                    bassNotes: [73.42, 73.42, 65.41, 65.41, 55.00, 55.00, 49.00, 49.00],
                    percStyle: 'sub_kick',
                    leadVol: 0.14,
                    bassVol: 0.18
                },
                time_attack_music: {
                    stepDuration: 0.15,
                    leadOscType: 'triangle',
                    bassOscType: 'sine',
                    leadNotes: [329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 293.66, 329.63, 392.00, 523.25, 587.33, 523.25, 392.00, 329.63, 293.66],
                    bassNotes: [82.41, 82.41, 98.00, 98.00, 110.00, 110.00, 82.41, 82.41],
                    percStyle: 'clock_tick',
                    leadVol: 0.12,
                    bassVol: 0.14
                },
                speed_music: {
                    stepDuration: 0.125,
                    leadOscType: 'square',
                    bassOscType: 'sawtooth',
                    leadNotes: [293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 293.66, 369.99, 329.63, 415.30, 493.88, 659.25, 493.88, 415.30, 329.63, 415.30],
                    bassNotes: [73.42, 73.42, 92.50, 92.50, 82.41, 82.41, 73.42, 73.42],
                    percStyle: 'hihat',
                    leadVol: 0.10,
                    bassVol: 0.15
                },
                hardcore_music: {
                    stepDuration: 0.135,
                    leadOscType: 'sawtooth',
                    bassOscType: 'sine',
                    leadNotes: [196.00, 220.00, 261.63, 311.13, 261.63, 220.00, 196.00, 174.61, 196.00, 220.00, 261.63, 329.63, 311.13, 261.63, 220.00, 174.61],
                    bassNotes: [49.00, 49.00, 55.00, 55.00, 65.41, 65.41, 49.00, 49.00],
                    percStyle: 'hihat',
                    leadVol: 0.11,
                    bassVol: 0.14
                },
                survival_music: {
                    stepDuration: 0.125,
                    leadOscType: 'triangle',
                    bassOscType: 'sine',
                    leadNotes: [196.00, 233.08, 293.66, 311.13, 369.99, 311.13, 293.66, 233.08, 196.00, 293.66, 392.00, 466.16, 587.33, 466.16, 392.00, 293.66, 174.61, 220.00, 261.63, 311.13, 349.23, 311.13, 261.63, 220.00, 185.00, 233.08, 277.18, 329.63, 369.99, 329.63, 277.18, 233.08],
                    bassNotes: [49.00, 49.00, 49.00, 58.27, 49.00, 49.00, 58.27, 65.41, 43.65, 43.65, 43.65, 51.91, 46.25, 46.25, 46.25, 55.00],
                    percStyle: 'sub_kick',
                    leadVol: 0.14,
                    bassVol: 0.20
                },
                obstacle_music: {
                    stepDuration: 0.155,
                    leadOscType: 'square',
                    bassOscType: 'sawtooth',
                    leadNotes: [220.00, 277.18, 329.63, 392.00, 440.00, 392.00, 329.63, 277.18, 246.94, 293.66, 369.99, 440.00, 493.88, 440.00, 369.99, 293.66, 207.65, 261.63, 311.13, 392.00, 415.30, 392.00, 311.13, 261.63, 196.00, 246.94, 293.66, 369.99, 392.00, 369.99, 293.66, 246.94],
                    bassNotes: [110.00, 146.83, 110.00, 164.81, 110.00, 146.83, 130.81, 110.00, 98.00, 130.81, 98.00, 146.83, 98.00, 130.81, 123.47, 98.00],
                    percStyle: 'hihat',
                    leadVol: 0.11,
                    bassVol: 0.15
                },
                shop_music: {
                    stepDuration: 0.22,
                    leadOscType: 'sine',
                    bassOscType: 'triangle',
                    leadNotes: [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 293.66, 392.00, 220.00, 261.63, 329.63, 440.00, 392.00, 329.63, 261.63, 349.23],
                    bassNotes: [130.81, 130.81, 110.00, 110.00, 87.31, 87.31, 98.00, 98.00],
                    percStyle: 'hihat',
                    leadVol: 0.13,
                    bassVol: 0.15
                },
                daily_reward_music: {
                    stepDuration: 0.18,
                    leadOscType: 'square',
                    bassOscType: 'triangle',
                    leadNotes: [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51, 1046.50],
                    bassNotes: [261.63, 261.63, 329.63, 392.00],
                    percStyle: 'hihat',
                    leadVol: 0.12,
                    bassVol: 0.14
                },
                game_over_music: {
                    stepDuration: 0.36,
                    leadOscType: 'sawtooth',
                    bassOscType: 'triangle',
                    leadNotes: [220.00, 207.65, 196.00, 174.61, 164.81, 146.83, 130.81, 110.00, 164.81, 146.83, 130.81, 110.00, 98.00, 87.31, 82.41, 55.00],
                    bassNotes: [110.00, 110.00, 98.00, 87.31, 82.41, 73.42, 65.41, 55.00],
                    percStyle: 'none',
                    leadVol: 0.12,
                    bassVol: 0.18
                }
            };

            const track = SYNTH_TRACKS[trackId] || SYNTH_TRACKS.classic_music;
            const stepDuration = track.stepDuration;

            this.activeSynthMusicTimer = setInterval(() => {
                if (!this.settings.musicEnabled || !this.currentMusicId) {
                    clearInterval(this.activeSynthMusicTimer);
                    this.activeSynthMusicTimer = null;
                    return;
                }
                const audioCtx = this.audioCtx || this.getAudioContext();
                if (!audioCtx) return;

                if (audioCtx.state === 'suspended') {
                    audioCtx.resume().catch(() => {});
                }

                const scheduleAhead = 0.25;
                while (this.nextSynthNoteTime < audioCtx.currentTime + scheduleAhead) {
                    const noteTime = Math.max(audioCtx.currentTime, this.nextSynthNoteTime);
                    const vol = this.getFinalMusicVolume();

                    if (vol > 0) {
                        try {
                            // Lead Melody
                            if (track.leadNotes && track.leadNotes.length > 0) {
                                const leadOsc = audioCtx.createOscillator();
                                const leadGain = audioCtx.createGain();
                                leadOsc.type = track.leadOscType || 'square';
                                const freq = track.leadNotes[this.musicStep % track.leadNotes.length];
                                leadOsc.frequency.setValueAtTime(freq, noteTime);
                                const lVol = vol * (track.leadVol || 0.1);
                                leadGain.gain.setValueAtTime(lVol, noteTime);
                                leadGain.gain.exponentialRampToValueAtTime(0.001, noteTime + stepDuration * 0.85);
                                leadOsc.connect(leadGain);
                                leadGain.connect(audioCtx.destination);
                                leadOsc.start(noteTime);
                                leadOsc.stop(noteTime + stepDuration * 0.85);
                            }

                            // Bassline
                            if (track.bassNotes && track.bassNotes.length > 0 && (this.musicStep % 2 === 0 || track.stepDuration > 0.2)) {
                                const bassOsc = audioCtx.createOscillator();
                                const bassGain = audioCtx.createGain();
                                bassOsc.type = track.bassOscType || 'sawtooth';
                                const bassIdx = Math.floor(this.musicStep / (track.stepDuration > 0.2 ? 1 : 2));
                                const bassFreq = track.bassNotes[bassIdx % track.bassNotes.length];
                                bassOsc.frequency.setValueAtTime(bassFreq, noteTime);
                                const bVol = vol * (track.bassVol || 0.15);
                                bassGain.gain.setValueAtTime(bVol, noteTime);
                                bassGain.gain.exponentialRampToValueAtTime(0.001, noteTime + stepDuration * 1.4);
                                bassOsc.connect(bassGain);
                                bassGain.connect(audioCtx.destination);
                                bassOsc.start(noteTime);
                                bassOsc.stop(noteTime + stepDuration * 1.4);
                            }

                            // Percussive Rhythm Accents
                            if (track.percStyle === 'hihat' && this.musicStep % 2 === 1) {
                                const hOsc = audioCtx.createOscillator();
                                const hGain = audioCtx.createGain();
                                hOsc.type = 'triangle';
                                hOsc.frequency.setValueAtTime(3200 + (Math.random() * 1000), noteTime);
                                hGain.gain.setValueAtTime(vol * 0.03, noteTime);
                                hGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.03);
                                hOsc.connect(hGain);
                                hGain.connect(audioCtx.destination);
                                hOsc.start(noteTime);
                                hOsc.stop(noteTime + 0.03);
                            } else if (track.percStyle === 'clock_tick') {
                                const tOsc = audioCtx.createOscillator();
                                const tGain = audioCtx.createGain();
                                tOsc.type = 'sine';
                                tOsc.frequency.setValueAtTime((this.musicStep % 4 === 0) ? 1800 : 1200, noteTime);
                                tGain.gain.setValueAtTime(vol * 0.04, noteTime);
                                tGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.025);
                                tOsc.connect(tGain);
                                tGain.connect(audioCtx.destination);
                                tOsc.start(noteTime);
                                tOsc.stop(noteTime + 0.025);
                            } else if (track.percStyle === 'snare' && this.musicStep % 2 === 1) {
                                const sOsc = audioCtx.createOscillator();
                                const sGain = audioCtx.createGain();
                                sOsc.type = 'sawtooth';
                                sOsc.frequency.setValueAtTime(600, noteTime);
                                sOsc.frequency.exponentialRampToValueAtTime(150, noteTime + 0.05);
                                sGain.gain.setValueAtTime(vol * 0.06, noteTime);
                                sGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.05);
                                sOsc.connect(sGain);
                                sGain.connect(audioCtx.destination);
                                sOsc.start(noteTime);
                                sOsc.stop(noteTime + 0.05);
                            } else if (track.percStyle === 'sub_kick' && this.musicStep % 4 === 0) {
                                const kOsc = audioCtx.createOscillator();
                                const kGain = audioCtx.createGain();
                                kOsc.type = 'sine';
                                kOsc.frequency.setValueAtTime(110, noteTime);
                                kOsc.frequency.exponentialRampToValueAtTime(35, noteTime + 0.09);
                                kGain.gain.setValueAtTime(vol * 0.12, noteTime);
                                kGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.09);
                                kOsc.connect(kGain);
                                kGain.connect(audioCtx.destination);
                                kOsc.start(noteTime);
                                kOsc.stop(noteTime + 0.09);
                            } else if (track.percStyle === 'laser' && this.musicStep % 4 === 0) {
                                const lOsc = audioCtx.createOscillator();
                                const lGain = audioCtx.createGain();
                                lOsc.type = 'sawtooth';
                                lOsc.frequency.setValueAtTime(2400, noteTime);
                                lOsc.frequency.exponentialRampToValueAtTime(400, noteTime + 0.04);
                                lGain.gain.setValueAtTime(vol * 0.04, noteTime);
                                lGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.04);
                                lOsc.connect(lGain);
                                lGain.connect(audioCtx.destination);
                                lOsc.start(noteTime);
                                lOsc.stop(noteTime + 0.04);
                            }
                        } catch(e) {}
                    }

                    this.nextSynthNoteTime += stepDuration;
                    this.musicStep++;
                }
            }, 30);
        },

        // 3. stopMusic
        stopMusic(fade = true) {
            if (this.activeSynthMusicTimer) {
                clearInterval(this.activeSynthMusicTimer);
                this.activeSynthMusicTimer = null;
            }
            this.nextSynthNoteTime = 0;

            if (this.musicAudioElement) {
                const audio = this.musicAudioElement;
                if (fade && audio.volume > 0) {
                    this.fadeAudio(audio, audio.volume, 0, 500);
                    setTimeout(() => {
                        audio.pause();
                        audio.currentTime = 0;
                    }, 500);
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
                this.musicAudioElement = null;
            }
            this.currentMusicId = null;
        },

        // 4. pauseMusic
        pauseMusic() {
            if (this.musicAudioElement && !this.musicAudioElement.paused) {
                this.musicAudioElement.pause();
            }
            if (this.activeSynthMusicTimer) {
                clearInterval(this.activeSynthMusicTimer);
                this.activeSynthMusicTimer = null;
            }
        },

        // 5. resumeMusic
        resumeMusic() {
            if (!this.settings.musicEnabled) return;
            if (this.musicAudioElement) {
                this.musicAudioElement.play().catch(() => {});
            } else if (this.currentMusicId) {
                this.startSynthMusicLoop(this.currentMusicId);
            }
        },

        // 6. setSoundVolume
        setSoundVolume(volume) {
            this.settings.soundVolume = Math.min(1, Math.max(0, volume));
            this.saveSettings();
        },

        // 7. setMusicVolume
        setMusicVolume(volume) {
            this.settings.musicVolume = Math.min(1, Math.max(0, volume));
            if (this.musicAudioElement) {
                this.musicAudioElement.volume = this.getFinalMusicVolume();
            }
            this.saveSettings();
        },

        // 8. toggleSound
        toggleSound() {
            this.settings.soundEnabled = !this.settings.soundEnabled;
            if (!this.settings.soundEnabled) {
                this.stopAllSounds();
            }
            this.saveSettings();
            return this.settings.soundEnabled;
        },

        // 9. toggleMusic
        toggleMusic() {
            this.settings.musicEnabled = !this.settings.musicEnabled;
            if (!this.settings.musicEnabled) {
                this.stopMusic(false);
            } else {
                this.playMusic(this.currentMusicId || 'menu_music');
            }
            this.saveSettings();
            return this.settings.musicEnabled;
        },

        // 10. isSoundEnabled
        isSoundEnabled() {
            return this.settings.soundEnabled;
        },

        // 11. isMusicEnabled
        isMusicEnabled() {
            return this.settings.musicEnabled;
        },

        suspendAllAudio() {
            this.pauseMusic();
            if (this.audioCtx && this.audioCtx.state === 'running') {
                this.audioCtx.suspend().catch(() => {});
            }
            if (this.musicAudioElement) {
                try { this.musicAudioElement.pause(); } catch(e) {}
            }
        },

        resumeAllAudio() {
            if (!this.settings.musicEnabled) return;
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume().catch(() => {});
            }
            if (!this.activeSynthMusicTimer) {
                const track = (!isGameRunning) ? 'menu_music' : (this.currentMusicId || 'menu_music');
                this.playMusic(track);
            }
        },

        // 12. setMasterVolume
        setMasterVolume(volume) {
            this.settings.masterVolume = Math.min(1, Math.max(0, volume));
            if (this.musicAudioElement) {
                this.musicAudioElement.volume = this.getFinalMusicVolume();
            }
            this.saveSettings();
        },

        // 13. stopAllSounds
        stopAllSounds() {
            Object.values(this.audioElements).forEach(a => {
                try {
                    a.pause();
                    a.currentTime = 0;
                } catch(e) {}
            });
        },

        playMusicForMode(modeId) {
            const modeMusicMap = {
                classic: 'classic_music',
                endless: 'endless_music',
                time_attack: 'time_attack_music',
                speed_run: 'speed_music',
                hardcore: 'hardcore_music',
                survival: 'survival_music',
                obstacle: 'obstacle_music'
            };
            const musicId = modeMusicMap[modeId] || 'game_music';
            this.playMusic(musicId);
        },

        resetSettings() {
            this.settings = {
                masterVolume: 0.8,
                musicVolume: 0.6,
                soundVolume: 0.75,
                musicEnabled: true,
                soundEnabled: true,
                vibrationEnabled: true
            };
            VibrationManager.enabled = true;
            this.saveSettings();
            this.playSound('button_click');
            VibrationManager.success();
            if (this.settings.musicEnabled) {
                this.playMusic(this.currentMusicId || 'menu_music');
            } else {
                this.stopMusic(false);
            }
        },

        uiBound: false,
        bindSettingsUI() {
            if (this.uiBound) return;
            this.uiBound = true;

            const masterSlider = document.getElementById('master-vol-slider');
            const musicSlider = document.getElementById('music-vol-slider');
            const sfxSlider = document.getElementById('sfx-vol-slider');

            const masterText = document.getElementById('master-vol-text');
            const musicText = document.getElementById('music-vol-text');
            const sfxText = document.getElementById('sfx-vol-text');

            const toggleMusicBtn = document.getElementById('toggle-music-btn');
            const toggleSfxBtn = document.getElementById('toggle-sfx-btn');
            const toggleVibeBtn = document.getElementById('toggle-vibe-btn');

            const resetBtn = document.getElementById('reset-audio-btn');
            const closeBtn = document.getElementById('close-settings-btn');

            const settingsModal = document.getElementById('settings-modal');
            const settingsBtn = document.getElementById('settings-btn');
            const settingsHeaderBtn = document.getElementById('settings-header-btn');

            if (settingsBtn) {
                settingsBtn.addEventListener('click', () => {
                    this.updateSettingsUI();
                    if (settingsModal) settingsModal.classList.remove('hidden');
                    this.playSound('button_click');
                    VibrationManager.light();
                });
            }

            if (settingsHeaderBtn) {
                settingsHeaderBtn.addEventListener('click', () => {
                    this.updateSettingsUI();
                    if (settingsModal) settingsModal.classList.remove('hidden');
                    this.playSound('button_click');
                    VibrationManager.light();
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    if (settingsModal) settingsModal.classList.add('hidden');
                    this.playSound('button_back');
                    VibrationManager.light();
                });
            }

            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('Tüm ses, müzik ve titreşim ayarları varsayılana sıfırlansın mı?')) {
                        this.resetSettings();
                    }
                });
            }

            if (masterSlider) {
                masterSlider.addEventListener('input', (e) => {
                    const val = parseInt(e.target.value) / 100;
                    this.setMasterVolume(val);
                    if (masterText) masterText.textContent = `${Math.round(val * 100)}%`;
                });
            }

            if (musicSlider) {
                musicSlider.addEventListener('input', (e) => {
                    const val = parseInt(e.target.value) / 100;
                    this.setMusicVolume(val);
                    if (musicText) musicText.textContent = `${Math.round(val * 100)}%`;
                });
            }

            if (sfxSlider) {
                sfxSlider.addEventListener('input', (e) => {
                    const val = parseInt(e.target.value) / 100;
                    this.setSoundVolume(val);
                    if (sfxText) sfxText.textContent = `${Math.round(val * 100)}%`;
                    this.playSound('button_click');
                });
            }

            if (toggleMusicBtn) {
                toggleMusicBtn.addEventListener('click', () => {
                    this.toggleMusic();
                    this.playSound('button_click');
                });
            }

            if (toggleSfxBtn) {
                toggleSfxBtn.addEventListener('click', () => {
                    this.toggleSound();
                    this.playSound('button_click');
                });
            }

            if (toggleVibeBtn) {
                toggleVibeBtn.addEventListener('click', () => {
                    const nextState = !VibrationManager.enabled;
                    VibrationManager.setEnabled(nextState);
                    if (nextState) VibrationManager.medium();
                });
            }

            const toggleUnlimBtn = document.getElementById('toggle-unlimited-coins-btn');
            if (toggleUnlimBtn) {
                toggleUnlimBtn.addEventListener('click', () => {
                    this.playSound('button_click');
                    const newState = CoinManager.toggleUnlimited();
                    toggleUnlimBtn.textContent = newState ? 'ON' : 'OFF';
                    toggleUnlimBtn.classList.toggle('active', newState);
                    if (typeof VibrationManager !== 'undefined') VibrationManager.medium();
                    if (typeof renderAllCosmeticsUI === 'function') renderAllCosmeticsUI();
                });
            }

            const openNameModalBtn = document.getElementById('open-name-modal-btn');
            const nameModal = document.getElementById('name-change-modal');
            const confirmNameBtn = document.getElementById('confirm-name-btn');
            const cancelNameBtn = document.getElementById('cancel-name-btn');
            const modalNameInput = document.getElementById('modal-player-name-input');

            if (openNameModalBtn && nameModal) {
                openNameModalBtn.addEventListener('click', () => {
                    if (modalNameInput) modalNameInput.value = PlayerNameManager.getName();
                    nameModal.classList.remove('hidden');
                    this.playSound('button_click');
                    if (typeof VibrationManager !== 'undefined') VibrationManager.light();
                    setTimeout(() => {
                        if (modalNameInput) {
                            modalNameInput.focus();
                            modalNameInput.select();
                        }
                    }, 100);
                });
            }

            const handleConfirmName = () => {
                if (modalNameInput) {
                    const newName = PlayerNameManager.setName(modalNameInput.value);
                    if (nameModal) nameModal.classList.add('hidden');
                    this.playSound('reward');
                    if (typeof VibrationManager !== 'undefined') VibrationManager.success();
                }
            };

            if (confirmNameBtn) {
                confirmNameBtn.addEventListener('click', handleConfirmName);
            }

            if (cancelNameBtn && nameModal) {
                cancelNameBtn.addEventListener('click', () => {
                    nameModal.classList.add('hidden');
                    this.playSound('button_back');
                    if (typeof VibrationManager !== 'undefined') VibrationManager.light();
                });
            }

            if (modalNameInput) {
                modalNameInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        handleConfirmName();
                        modalNameInput.blur();
                    }
                });
            }

            this.updateSettingsUI();
        },

        updateSettingsUI() {
            if (typeof PlayerNameManager !== 'undefined') {
                PlayerNameManager.updateUI();
            }
            const masterSlider = document.getElementById('master-vol-slider');
            const musicSlider = document.getElementById('music-vol-slider');
            const sfxSlider = document.getElementById('sfx-vol-slider');

            const masterText = document.getElementById('master-vol-text');
            const musicText = document.getElementById('music-vol-text');
            const sfxText = document.getElementById('sfx-vol-text');

            const toggleMusicBtn = document.getElementById('toggle-music-btn');
            const toggleSfxBtn = document.getElementById('toggle-sfx-btn');
            const toggleVibeBtn = document.getElementById('toggle-vibe-btn');

            if (masterSlider) masterSlider.value = Math.round(this.settings.masterVolume * 100);
            if (musicSlider) musicSlider.value = Math.round(this.settings.musicVolume * 100);
            if (sfxSlider) sfxSlider.value = Math.round(this.settings.soundVolume * 100);

            if (masterText) masterText.textContent = `${Math.round(this.settings.masterVolume * 100)}%`;
            if (musicText) musicText.textContent = `${Math.round(this.settings.musicVolume * 100)}%`;
            if (sfxText) sfxText.textContent = `${Math.round(this.settings.soundVolume * 100)}%`;

            if (toggleMusicBtn) {
                toggleMusicBtn.textContent = this.settings.musicEnabled ? 'ON' : 'OFF';
                toggleMusicBtn.classList.toggle('active', this.settings.musicEnabled);
            }

            if (toggleSfxBtn) {
                toggleSfxBtn.textContent = this.settings.soundEnabled ? 'ON' : 'OFF';
                toggleSfxBtn.classList.toggle('active', this.settings.soundEnabled);
            }

            if (toggleVibeBtn) {
                const vEnabled = VibrationManager.enabled;
                toggleVibeBtn.textContent = vEnabled ? 'ON' : 'OFF';
                toggleVibeBtn.classList.toggle('active', vEnabled);
            }

            const toggleUnlimBtn = document.getElementById('toggle-unlimited-coins-btn');
            if (toggleUnlimBtn) {
                const isUnlim = CoinManager.isUnlimited();
                toggleUnlimBtn.textContent = isUnlim ? 'ON' : 'OFF';
                toggleUnlimBtn.classList.toggle('active', isUnlim);
            }
        }
    };

    // Initialize Audio Manager
    AudioManager.init();

    function initAudio() {
        AudioManager.getAudioContext();
    }

    // Sound bridge function matching all game event sound types
    function playSound(type) {
        const soundTypeMap = {
            'eat': 'food_eat',
            'food_eat': 'food_eat',
            'eat-special': 'special_food',
            'special_food': 'special_food',
            'mega-food': 'special_food',
            'powerup-collect': 'powerup_collect',
            'powerup_collect': 'powerup_collect',
            'powerup_activate': 'powerup_activate',
            'powerup_expire': 'powerup_expire',
            'powerup-spawn': 'powerup_collect',
            'shield-break': 'powerup_expire',
            'coin': 'coin_collect',
            'coin_collect': 'coin_collect',
            'button': 'button_click',
            'button_click': 'button_click',
            'button_back': 'button_back',
            'game_start': 'game_start',
            'gameover': 'game_over',
            'game_over': 'game_over',
            'new_record': 'new_record',
            'level_up': 'level_up',
            'achievement': 'achievement_unlock',
            'achievement_unlock': 'achievement_unlock',
            'mission': 'mission_complete',
            'mission_complete': 'mission_complete',
            'reward': 'daily_reward',
            'daily_reward': 'daily_reward',
            'streak_increase': 'streak_increase',
            'streak_milestone': 'streak_milestone',
            'reward_unlock': 'reward_unlock',
            'shop_purchase': 'shop_purchase',
            'item_equip': 'item_equip',
            'pause': 'pause',
            'resume': 'resume',
            'countdown': 'countdown',
            'time_up': 'time_up',
            'error': 'error'
        };

        const soundId = soundTypeMap[type] || type || 'button_click';
        AudioManager.playSound(soundId);

        // Haptic feedback mapping
        switch(soundId) {
            case 'food_eat':
            case 'button_click':
            case 'button_back':
            case 'item_equip':
            case 'coin_collect':
                VibrationManager.light();
                break;
            case 'special_food':
            case 'powerup_collect':
            case 'powerup_activate':
            case 'mission_complete':
            case 'streak_increase':
                VibrationManager.medium();
                break;
            case 'game_over':
            case 'time_up':
            case 'streak_milestone':
                VibrationManager.heavy();
                break;
            case 'new_record':
            case 'level_up':
            case 'achievement_unlock':
            case 'daily_reward':
            case 'shop_purchase':
            case 'reward_unlock':
                VibrationManager.success();
                break;
            case 'error':
                VibrationManager.error();
                break;
            default:
                break;
        }
    }

    // Canvas Resize Optimization
    let lastCanvasDim = 0;
    function resizeCanvas() {
        if (!canvasWrapper) return;
        const wrapperWidth = canvasWrapper.clientWidth - 8;
        const wrapperHeight = canvasWrapper.clientHeight - 8;
        const minDim = Math.max(100, Math.min(wrapperWidth, wrapperHeight));

        const dpr = window.devicePixelRatio || 1;
        const newDim = Math.floor(minDim);

        if (newDim === lastCanvasDim && canvas.width === newDim * dpr) {
            return;
        }

        lastCanvasDim = newDim;
        canvasWidth = newDim;
        canvasHeight = newDim;

        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        ctx.scale(dpr, dpr);
        tileSize = canvasWidth / GRID_SIZE;

        if (!isGameRunning) {
            renderFrame();
        }
    }

    function updateHighScoreUI() {
        if (highScoreEl) highScoreEl.textContent = highScore;
        if (menuHighScoreEl) menuHighScoreEl.textContent = highScore;
    }

    function resetGame() {
        levelUpPausedGame = false;
        const startX = Math.floor(GRID_SIZE / 2);
        const startY = Math.floor(GRID_SIZE / 2);

        snake = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];

        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
        directionQueue = [];
        score = 0;
        foodEatenCount = 0;
        gameCoinsEarnedFromFood = 0;
        currentSpeed = baseSpeed;
        particles = [];
        if (currentScoreEl) currentScoreEl.textContent = score;

        spawnFood();
        PowerUpManager.onGameStart();
        const currentMap = MAPS[selectedMap] || MAPS.classic;
        GameModeManager.onGameStart(currentMap.obstacles || []);
        PlayerStats.recordGameStart(selectedMap);
    }

    function spawnFood() {
        let valid = false;
        let newX, newY;
        const currentMap = MAPS[selectedMap] || MAPS.classic;
        const mapObs = currentMap.obstacles || [];
        const obstacles = [...mapObs, ...GameModeManager.getExtraObstacles()];
        const head = (snake && snake.length > 0) ? snake[0] : null;
        const boardPowerUp = (typeof PowerUpManager !== 'undefined') ? PowerUpManager.boardPowerUp : null;

        let attempts = 0;
        let minDist = 6;

        while (!valid && attempts < 1000) {
            attempts++;
            if (attempts > 250) minDist = 5;
            if (attempts > 500) minDist = 4;
            if (attempts > 750) minDist = 2;
            if (attempts > 900) minDist = 0;

            newX = Math.floor(Math.random() * GRID_SIZE);
            newY = Math.floor(Math.random() * GRID_SIZE);

            const isOnSnake = snake.some(segment => segment.x === newX && segment.y === newY);
            const isOnObstacle = obstacles.some(obs => obs.x === newX && obs.y === newY);
            const isOnPowerUp = boardPowerUp && boardPowerUp.x === newX && boardPowerUp.y === newY;

            let satisfiesDist = true;
            if (head && minDist > 0) {
                const dist = Math.abs(newX - head.x) + Math.abs(newY - head.y);
                if (dist < minDist) satisfiesDist = false;
            }

            valid = !isOnSnake && !isOnObstacle && !isOnPowerUp && satisfiesDist;
        }

        const isSpecial = (foodEatenCount > 0 && foodEatenCount % 5 === 0);
        food = { x: newX, y: newY, isSpecial };
    }

    function createParticles(x, y, color) {
        const currentSkin = SKINS[selectedSkin] || SKINS.classic;
        const particleCount = 20;
        const pColors = currentSkin.particleColors || [color];

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1.2;
            const col = pColors[Math.floor(Math.random() * pColors.length)];

            particles.push({
                x: (x + 0.5) * tileSize,
                y: (y + 0.5) * tileSize,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 3.5 + 1.8,
                color: col,
                alpha: 1,
                decay: Math.random() * 0.035 + 0.02
            });
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {
        if (particles.length === 0) return;
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
    }

    function changeDirection(dx, dy) {
        if (!isGameRunning || isPaused) return;

        const lastDir = directionQueue.length > 0
            ? directionQueue[directionQueue.length - 1]
            : direction;

        if (dx !== 0 && lastDir.x === -dx) return;
        if (dy !== 0 && lastDir.y === -dy) return;
        if (lastDir.x === dx && lastDir.y === dy) return;

        if (directionQueue.length < 3) {
            directionQueue.push({ x: dx, y: dy });
        } else {
            directionQueue[directionQueue.length - 1] = { x: dx, y: dy };
        }
    }

    function updateGame() {
        const now = Date.now();
        GameModeManager.update(now);
        PowerUpManager.update(now);
        currentSpeed = GameModeManager.calculateSpeed(baseSpeed);

        if (directionQueue.length > 0) {
            direction = directionQueue.shift();
        }
        nextDirection = { ...direction };

        const head = { ...snake[0] };
        head.x += direction.x;
        head.y += direction.y;

        const currentMap = MAPS[selectedMap] || MAPS.classic;
        const mapObs = currentMap.obstacles || [];
        const obstacles = [...mapObs, ...GameModeManager.getExtraObstacles()];

        const isGhostActive = PowerUpManager.isEffectActive('ghost');
        const isShieldActive = PowerUpManager.isEffectActive('shield');
        const isWallWrap = GameModeManager.isWallWrapEnabled();

        // Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            if (isGhostActive || isWallWrap) {
                if (head.x < 0) head.x = GRID_SIZE - 1;
                else if (head.x >= GRID_SIZE) head.x = 0;
                else if (head.y < 0) head.y = GRID_SIZE - 1;
                else if (head.y >= GRID_SIZE) head.y = 0;
            } else if (isShieldActive) {
                PowerUpManager.useShield();
                head.x = Math.max(0, Math.min(GRID_SIZE - 1, head.x));
                head.y = Math.max(0, Math.min(GRID_SIZE - 1, head.y));
            } else {
                handleGameOver('wall');
                return;
            }
        }

        // Self Collision
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                if (isShieldActive) {
                    PowerUpManager.useShield();
                    break;
                } else {
                    handleGameOver();
                    return;
                }
            }
        }

        // Map Obstacle Collision
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x === head.x && obstacles[i].y === head.y) {
                if (isGhostActive) {
                    break;
                } else if (isShieldActive) {
                    PowerUpManager.useShield();
                    break;
                } else {
                    handleGameOver();
                    return;
                }
            }
        }

        snake.unshift(head);

        // Update Snake Trail (originating from body segment behind the head)
        if (typeof TrailManager !== 'undefined') {
            const emitSegment = (snake && snake.length > 1) ? snake[1] : (snake ? snake[0] : null);
            if (emitSegment) {
                TrailManager.updateTrail({ x: (emitSegment.x + 0.5) * tileSize, y: (emitSegment.y + 0.5) * tileSize });
            }
        }

        // Power-Up Collection Check
        if (PowerUpManager.boardPowerUp && head.x === PowerUpManager.boardPowerUp.x && head.y === PowerUpManager.boardPowerUp.y) {
            if (typeof EffectManager !== 'undefined') {
                EffectManager.onPowerUpCollected({ x: (head.x + 0.5) * tileSize, y: (head.y + 0.5) * tileSize }, PowerUpManager.boardPowerUp.type);
            }
            PowerUpManager.collectPowerUp();
        }

        // Food Collision
        if (head.x === food.x && head.y === food.y) {
            foodEatenCount++;
            GameModeManager.onFoodEaten();
            const pointsEarned = food.isSpecial ? 30 : 10;
            score += pointsEarned;
            if (currentScoreEl) currentScoreEl.textContent = score;

            const isDoubleCoin = PowerUpManager.isEffectActive('double_coin');
            const coinMultiplier = isDoubleCoin ? 2 : 1;
            const mapMultiplier = InventoryManager.getMapCoinMultiplier();

            if (food.isSpecial) {
                playSound('eat-special');
                const earned = Math.max(1, Math.round(3 * coinMultiplier * mapMultiplier));
                gameCoinsEarnedFromFood += earned;
                CoinManager.addCoins(earned);
                if (typeof XPManager !== 'undefined') {
                    XPManager.addXP(XP_CONFIG.FOOD_MEGA, 'food_mega');
                }
            } else {
                playSound('eat');
                const earned = Math.max(1, Math.round(1 * coinMultiplier * mapMultiplier));
                gameCoinsEarnedFromFood += earned;
                CoinManager.addCoins(earned);
                if (typeof XPManager !== 'undefined') {
                    XPManager.addXP(XP_CONFIG.FOOD_NORMAL, 'food');
                }
            }

            PlayerStats.recordFoodEaten(1);
            PlayerStats.recordScoreUpdate(score);

            const currentSkin = SKINS[selectedSkin] || SKINS.classic;
            const foodColor = food.isSpecial ? currentSkin.specialFoodColor : currentSkin.foodColor;
            createParticles(food.x, food.y, foodColor);

            if (typeof EffectManager !== 'undefined') {
                EffectManager.onFoodEaten({ x: (food.x + 0.5) * tileSize, y: (food.y + 0.5) * tileSize }, food.isSpecial, foodColor);
            }

            spawnFood();
        } else {
            snake.pop();
        }
    }

    function roundRect(context, x, y, width, height, radius) {
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
    }

    function renderFrame() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Screen Shake Translate
        ctx.save();
        if (typeof ScreenEffectManager !== 'undefined' && (ScreenEffectManager.shakeOffsetX !== 0 || ScreenEffectManager.shakeOffsetY !== 0)) {
            ctx.translate(ScreenEffectManager.shakeOffsetX, ScreenEffectManager.shakeOffsetY);
        }

        const currentMap = MAPS[selectedMap] || MAPS.classic;
        const mapObs = currentMap.obstacles || [];
        const extraObs = GameModeManager.getExtraObstacles();

        // Map Background
        ctx.fillStyle = currentMap.bgColor || ((selectedTheme === 'light') ? '#f8fafc' : '#090c14');
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Grid Lines - Batched single path for performance
        ctx.strokeStyle = currentMap.gridColor || 'rgba(0, 243, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.moveTo(i * tileSize, 0); ctx.lineTo(i * tileSize, canvasHeight);
            ctx.moveTo(0, i * tileSize); ctx.lineTo(canvasWidth, i * tileSize);
        }
        ctx.stroke();

        // Draw Map Obstacles - Batched draw
        if (mapObs.length > 0) {
            ctx.save();
            let obsColor = '#888888';
            let obsGlow = '#ffffff';
            if (currentMap.obstacleType === 'rock') { obsColor = '#b36b32'; obsGlow = '#ff9933'; }
            else if (currentMap.obstacleType === 'tree') { obsColor = '#22c55e'; obsGlow = '#00ff88'; }
            else if (currentMap.obstacleType === 'ice') { obsColor = '#00ffff'; obsGlow = '#00ffff'; }
            else if (currentMap.obstacleType === 'cyber') { obsColor = '#ff007f'; obsGlow = '#ff007f'; }
            else if (currentMap.obstacleType === 'maze') { obsColor = '#3b82f6'; obsGlow = '#0077ff'; }

            ctx.fillStyle = obsColor;
            ctx.shadowBlur = 6;
            ctx.shadowColor = obsGlow;

            for (let i = 0; i < mapObs.length; i++) {
                const obs = mapObs[i];
                roundRect(ctx, obs.x * tileSize + 1, obs.y * tileSize + 1, tileSize - 2, tileSize - 2, 4);
                ctx.fill();
            }
            ctx.restore();
        }

        // Draw Dynamic Mode Obstacles
        if (extraObs.length > 0) {
            ctx.save();
            ctx.fillStyle = '#f43f5e';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#f43f5e';

            for (let i = 0; i < extraObs.length; i++) {
                const obs = extraObs[i];
                roundRect(ctx, obs.x * tileSize + 1, obs.y * tileSize + 1, tileSize - 2, tileSize - 2, 4);
                ctx.fill();
            }
            ctx.restore();
        }

        // Draw Snake Trail (underneath food & snake)
        if (typeof TrailManager !== 'undefined') {
            TrailManager.drawTrail(ctx);
        }

        // Draw Board Power-Up
        PowerUpManager.drawPowerUpOnCanvas(ctx, tileSize);

        // Draw Food
        const currentSkin = SKINS[selectedSkin] || SKINS.classic;
        const foodCenterX = (food.x + 0.5) * tileSize;
        const foodCenterY = (food.y + 0.5) * tileSize;
        const foodRadius = (tileSize * 0.42);

        let foodCol = food.isSpecial ? currentSkin.specialFoodColor : currentSkin.foodColor;
        let foodGlowCol = food.isSpecial ? currentSkin.specialFoodGlow : currentSkin.foodGlow;

        const time = Date.now() / 20;
        if (currentSkin.isRainbow) {
            foodCol = `hsl(${(time * 4) % 360}, 100%, 60%)`;
            foodGlowCol = foodCol;
        }

        ctx.save();
        ctx.shadowBlur = food.isSpecial ? 20 : 12;
        ctx.shadowColor = foodGlowCol;
        ctx.fillStyle = foodCol;
        ctx.beginPath();
        ctx.arc(foodCenterX, foodCenterY, foodRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Check active power-up visual states for snake
        const isGhost = PowerUpManager.isEffectActive('ghost');
        const isShield = PowerUpManager.isEffectActive('shield');
        const isSpeed = PowerUpManager.isEffectActive('speed_boost');

        // Draw Snake
        ctx.save();
        if (isGhost) {
            ctx.globalAlpha = 0.55;
        }

        // Draw body segments (optimized loop without per-segment shadow)
        for (let i = snake.length - 1; i >= 1; i--) {
            const seg = snake[i];
            const sx = seg.x * tileSize;
            const sy = seg.y * tileSize;

            const bodyCol = getAnimatedSkinColor(currentSkin, i, time);
            ctx.fillStyle = bodyCol;
            roundRect(ctx, sx + 1.5, sy + 1.5, tileSize - 3, tileSize - 3, 4);
            ctx.fill();
        }

        // Draw Snake Head (with high quality glow)
        if (snake.length > 0) {
            const head = snake[0];
            const sx = head.x * tileSize;
            const sy = head.y * tileSize;

            let headCol = isSpeed ? '#fde047' : getAnimatedSkinColor(currentSkin, 0, time);
            let glowCol = isSpeed ? '#fde047' : headCol;

            ctx.save();
            ctx.shadowBlur = 14;
            ctx.shadowColor = glowCol;
            ctx.fillStyle = headCol;
            roundRect(ctx, sx + 1, sy + 1, tileSize - 2, tileSize - 2, 6);
            ctx.fill();
            ctx.restore();

            // Eyes
            ctx.fillStyle = '#04060c';
            let eyeX1, eyeY1, eyeX2, eyeY2;
            const eyeOffset = tileSize * 0.28;
            const eyeSize = Math.max(2, tileSize * 0.12);

            if (direction.x === 1) { // Right
                eyeX1 = sx + tileSize - eyeOffset; eyeY1 = sy + eyeOffset;
                eyeX2 = sx + tileSize - eyeOffset; eyeY2 = sy + tileSize - eyeOffset;
            } else if (direction.x === -1) { // Left
                eyeX1 = sx + eyeOffset; eyeY1 = sy + eyeOffset;
                eyeX2 = sx + eyeOffset; eyeY2 = sy + tileSize - eyeOffset;
            } else if (direction.y === -1) { // Up
                eyeX1 = sx + eyeOffset; eyeY1 = sy + eyeOffset;
                eyeX2 = sx + tileSize - eyeOffset; eyeY2 = sy + eyeOffset;
            } else { // Down
                eyeX1 = sx + eyeOffset; eyeY1 = sy + tileSize - eyeOffset;
                eyeX2 = sx + tileSize - eyeOffset; eyeY2 = sy + tileSize - eyeOffset;
            }

            ctx.beginPath(); ctx.arc(eyeX1, eyeY1, eyeSize, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(eyeX2, eyeY2, eyeSize, 0, Math.PI * 2); ctx.fill();

            // Protective Shield Aura if Shield active
            if (isShield) {
                ctx.save();
                ctx.shadowBlur = 14;
                ctx.shadowColor = '#60a5fa';
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.arc(sx + tileSize / 2, sy + tileSize / 2, tileSize * 0.75, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // Draw Equipped Accessory
            if (typeof AccessoryManager !== 'undefined') {
                AccessoryManager.drawAccessory(ctx, head.x, head.y, tileSize, direction);
            }
        }

        ctx.restore();

        drawParticles();
        if (typeof ParticleManager !== 'undefined') {
            ParticleManager.draw(ctx);
        }
        if (typeof ScreenEffectManager !== 'undefined') {
            ScreenEffectManager.drawFlash(ctx, canvasWidth, canvasHeight);
        }

        ctx.restore(); // Screen shake restore
    }

    function gameLoop(timestamp) {
        if (!isGameRunning || isPaused) return;

        if (!lastStepTime) lastStepTime = timestamp;
        const delta = timestamp - lastStepTime;

        if (delta >= currentSpeed) {
            updateGame();
            lastStepTime = timestamp - (delta % currentSpeed);
        }

        if (typeof ParticleManager !== 'undefined') {
            ParticleManager.update(16);
        }
        if (typeof ScreenEffectManager !== 'undefined' && typeof ScreenEffectManager.update === 'function') {
            ScreenEffectManager.update(16);
        }

        updateParticles();
        renderFrame();
        animFrameId = requestAnimationFrame(gameLoop);
    }

    function handleGameOver(reason = 'collision') {
        isGameRunning = false;
        if (appContainer) appContainer.classList.remove('game-playing');
        PowerUpManager.reset();

        if (typeof EffectManager !== 'undefined') {
            const headPos = (snake && snake.length > 0) ? { x: (snake[0].x + 0.5) * tileSize, y: (snake[0].y + 0.5) * tileSize } : null;
            EffectManager.onGameOver(headPos);
        }

        AudioManager.stopMusic(false);
        AudioManager.playSound('game_over');
        VibrationManager.heavy();
        AudioManager.playMusic('game_over_music', false);

        const activeMode = GameModeManager.getCurrentMode();
        const modeId = activeMode.id;

        const isNewModeRecord = GameModeManager.saveBestScore(modeId, score);
        if (modeId === 'survival') {
            GameModeManager.saveBestTime('survival', GameModeManager.modeState.survivalElapsedSeconds);
        }

        let isNewHighScore = false;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snake_high_score', highScore);
            isNewHighScore = true;
            updateHighScoreUI();
        }

        if (isNewModeRecord || isNewHighScore) {
            if (typeof EffectManager !== 'undefined') {
                EffectManager.onNewRecord();
            }
            setTimeout(() => {
                AudioManager.playSound('new_record');
                VibrationManager.success();
            }, 300);
        }

        if (finalScoreEl) finalScoreEl.textContent = score;
        if (finalHighScoreEl) finalHighScoreEl.textContent = highScore;

        const baseScoreCoinBonus = Math.floor(score / 20);
        const rawEarned = gameCoinsEarnedFromFood + baseScoreCoinBonus;
        const modeMultiplier = GameModeManager.getCoinMultiplier();
        const mapMultiplier = InventoryManager.getMapCoinMultiplier();
        const totalEarnedInGame = Math.floor(rawEarned * modeMultiplier * mapMultiplier);

        if (baseScoreCoinBonus > 0) {
            const bonusWithMultiplier = Math.floor(baseScoreCoinBonus * modeMultiplier * mapMultiplier);
            CoinManager.addCoins(bonusWithMultiplier);
        }

        PlayerStats.recordGameOver(score, foodEatenCount, snake.length);

        // XP Calculation for Game Over
        let gameOverXP = XP_CONFIG.GAME_COMPLETE;
        if (isNewModeRecord || isNewHighScore) {
            gameOverXP += XP_CONFIG.NEW_RECORD;
        }
        const earnedXP = XPManager.addXP(gameOverXP, 'game_over');

        const gameOverEarnedEl = document.getElementById('game-over-earned-coins');
        const gameOverEarnedXpEl = document.getElementById('game-over-earned-xp');
        const gameOverTotalEl = document.getElementById('game-over-total-coins');

        if (gameOverEarnedEl) {
            const combinedMult = Number((modeMultiplier * mapMultiplier).toFixed(2));
            const multTag = combinedMult > 1 ? ` (${combinedMult})` : '';
            gameOverEarnedEl.textContent = `+${totalEarnedInGame} COIN${multTag}`;
        }
        if (gameOverEarnedXpEl) {
            gameOverEarnedXpEl.textContent = `+${earnedXP} XP`;
        }
        if (gameOverTotalEl) gameOverTotalEl.textContent = `${CoinManager.getCoins()} COIN`;

        if (newHighScoreBanner) {
            const modeIconHtml = (activeMode && activeMode.icon) 
                ? (activeMode.icon.includes('.') 
                    ? `<img src="${activeMode.icon}" style="width: 20px; height: 20px; vertical-align: middle; object-fit: contain; margin-right: 4px; display: inline-block;">` 
                    : `${activeMode.icon} `) 
                : '';

            if (reason === 'time_up') {
                newHighScoreBanner.innerHTML = `⏱️ ZAMAN BİTTİ! (${modeIconHtml}${activeMode.name}: ${score})`;
                newHighScoreBanner.classList.remove('hidden');
            } else if (isNewModeRecord || isNewHighScore) {
                newHighScoreBanner.innerHTML = `🎉 YENİ REKOR! (${modeIconHtml}${activeMode.name}: ${score})`;
                newHighScoreBanner.classList.remove('hidden');
            } else {
                newHighScoreBanner.classList.add('hidden');
            }
        }

        if (gameOverModal) gameOverModal.classList.remove('hidden');
    }

    // Unified Customization Modal Logic (Skins + Maps + Themes)
    let currentCustTab = 'skins';

    function openCustomizeModal(initialTab = 'skins') {
        playSound('button');
        closeSecondaryModals();
        updateAllCoinDisplays();
        switchCustomizeTab(initialTab);
        if (customizeModal) customizeModal.classList.remove('hidden');
    }

    function switchCustomizeTab(tab) {
        currentCustTab = tab;
        const tabs = ['skins', 'accessories', 'maps', 'themes', 'trails'];
        tabs.forEach(t => {
            const btn = document.getElementById(`cust-tab-${t}`);
            const content = document.getElementById(`cust-content-${t}`);
            if (btn) {
                if (t === tab) btn.classList.add('active');
                else btn.classList.remove('active');
            }
            if (content) {
                if (t === tab) {
                    content.classList.remove('hidden');
                    content.classList.add('active');
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('active');
                }
            }
        });
        if (tab === 'skins') renderSkinsGrid('cust-skins-grid');
        else if (tab === 'accessories') renderAccessoriesGrid('cust-accessories-grid');
        else if (tab === 'maps') renderMapsGrid('cust-maps-grid');
        else if (tab === 'themes') renderThemesList('cust-themes-list');
        else if (tab === 'trails') renderTrailsGrid('cust-trails-grid');
        updateLoadoutDisplays();
    }

    const custTabSkins = document.getElementById('cust-tab-skins');
    const custTabAccessories = document.getElementById('cust-tab-accessories');
    const custTabMaps = document.getElementById('cust-tab-maps');
    const custTabThemes = document.getElementById('cust-tab-themes');
    const custTabTrails = document.getElementById('cust-tab-trails');

    if (custTabSkins) custTabSkins.addEventListener('click', () => { playSound('button'); switchCustomizeTab('skins'); });
    if (custTabAccessories) custTabAccessories.addEventListener('click', () => { playSound('button'); switchCustomizeTab('accessories'); });
    if (custTabMaps) custTabMaps.addEventListener('click', () => { playSound('button'); switchCustomizeTab('maps'); });
    if (custTabThemes) custTabThemes.addEventListener('click', () => { playSound('button'); switchCustomizeTab('themes'); });
    if (custTabTrails) custTabTrails.addEventListener('click', () => { playSound('button'); switchCustomizeTab('trails'); });

    // Skins Grid Renderer
    function renderSkinsGrid(containerId = 'cust-skins-grid') {
        const skinsGrid = document.getElementById(containerId);
        if (!skinsGrid) return;
        skinsGrid.innerHTML = '';

        Object.values(SKINS).forEach(skin => {
            const owned = InventoryManager.isSkinOwned(skin.id);
            if (containerId.startsWith('cust-') && !owned) return;
            const isEquipped = (selectedSkin === skin.id);

            const card = document.createElement('div');
            card.className = `skin-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked' : ''}`;

            let actionBtnHtml = '';
            if (isEquipped) {
                actionBtnHtml = `<button class="btn-shop-action active" disabled>✓ SEÇİLDİ</button>`;
            } else if (owned) {
                actionBtnHtml = `<button class="btn-shop-action equip">SEÇ</button>`;
            } else {
                actionBtnHtml = `<button class="btn-shop-action buy">SATIN AL (${skin.price} <img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin">)</button>`;
            }

            card.innerHTML = `
                <div class="skin-preview-box">
                    <canvas id="preview-${containerId}-${skin.id}" class="skin-preview-canvas" width="120" height="60"></canvas>
                </div>
                <div class="skin-info">
                    <div class="skin-title">${skin.name}</div>
                    <div class="skin-desc">${skin.desc}</div>
                </div>
                ${actionBtnHtml}
            `;

            card.addEventListener('click', () => {
                playSound('button');
                if (isEquipped) return;
                if (owned) {
                    selectedSkin = skin.id;
                    localStorage.setItem('snake_selected_skin', skin.id);
                    renderSkinsGrid('cust-skins-grid');
                    renderSkinsGrid('shop-skins-grid');
                    if (!isGameRunning) renderFrame();
                } else {
                    openPurchaseConfirm('skin', skin);
                }
            });

            skinsGrid.appendChild(card);
            setTimeout(() => drawSkinPreview(`preview-${containerId}-${skin.id}`, skin), 10);
        });
    }

    // Maps Grid Renderer
    function renderMapsGrid(containerId = 'cust-maps-grid') {
        const mapsGridEl = document.getElementById(containerId);
        if (!mapsGridEl) return;
        mapsGridEl.innerHTML = '';

        const totalMult = InventoryManager.getMapCoinMultiplier();
        const ownedCount = InventoryManager.getOwnedMaps().length;
        const totalMaps = Object.keys(MAPS).length;

        const mapBanner = document.createElement('div');
        mapBanner.className = 'map-mult-banner';
        mapBanner.style.gridColumn = '1 / -1';
        mapBanner.style.background = 'linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(16, 185, 129, 0.15))';
        mapBanner.style.border = '1px solid rgba(234, 179, 8, 0.4)';
        mapBanner.style.borderRadius = '12px';
        mapBanner.style.padding = '10px 14px';
        mapBanner.style.marginBottom = '12px';
        mapBanner.style.display = 'flex';
        mapBanner.style.alignItems = 'center';
        mapBanner.style.justifyContent = 'space-between';
        mapBanner.style.gap = '10px';
        mapBanner.style.flexWrap = 'wrap';

        mapBanner.innerHTML = `
            <div>
                <div style="font-weight: 800; color: #fde047; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                    🗺️ Toplam Harita Çarpanı: <span style="font-size: 1.15rem; color: #4ade80;">${totalMult}x Coin</span>
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px;">
                    Harita açtıkça +15% bonus kazanırsın! (${ownedCount}/${totalMaps} Harita Sahip)
                </div>
            </div>
            <div style="font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 8px; color: #e2e8f0; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                Aktif: ${MAPS[selectedMap]?.icon ? `<img src="${MAPS[selectedMap].icon}" style="width: 18px; height: 18px; object-fit: contain;">` : ''} <span>${MAPS[selectedMap]?.name || 'Klasik'}</span>
            </div>
        `;
        mapsGridEl.appendChild(mapBanner);

        Object.values(MAPS).forEach(map => {
            const owned = InventoryManager.isMapOwned(map.id);
            if (containerId.startsWith('cust-') && !owned) return;
            const isEquipped = (selectedMap === map.id);

            const card = document.createElement('div');
            card.className = `map-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked' : ''}`;

            let actionBtnHtml = '';
            if (isEquipped) {
                actionBtnHtml = `<button class="btn-shop-action active" disabled style="margin-top: auto;">✓ SEÇİLDİ</button>`;
            } else if (owned) {
                actionBtnHtml = `<button class="btn-shop-action equip" style="margin-top: auto;">SEÇ</button>`;
            } else {
                actionBtnHtml = `<button class="btn-shop-action buy" style="margin-top: auto;">SATIN AL (${map.price} <img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin">)</button>`;
            }

            card.innerHTML = `
                <div class="map-preview-box">
                    <canvas id="map-preview-${containerId}-${map.id}" class="map-preview-canvas" width="180" height="150" style="width: 100%; height: 100%;"></canvas>
                </div>
                <div class="map-info-col">
                    <div class="map-title-row" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                        <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
                            ${map.icon ? `<img src="${map.icon}" class="map-card-icon-img" alt="${map.name}" style="width: 22px; height: 22px; object-fit: contain; flex-shrink: 0;">` : ''}
                            <span class="map-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;">${map.name}</span>
                        </div>
                        <span class="diff-badge">${map.difficulty.replace('ZORLUK: ', '')}</span>
                    </div>
                    <div style="margin: 4px 0;">
                        <span style="background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.4); padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">⚡ ${map.coinMultiplier || 1.0}x Coin</span>
                    </div>
                    <p class="map-desc">${map.desc}</p>
                    ${actionBtnHtml}
                </div>
            `;

            card.addEventListener('click', () => {
                playSound('button');
                if (isEquipped) return;
                if (owned) {
                    selectedMap = map.id;
                    localStorage.setItem('snake_selected_map', map.id);
                    renderMapsGrid('cust-maps-grid');
                    renderMapsGrid('shop-maps-grid');
                    renderMapsGrid('modes-maps-grid');
                    if (typeof GameModeManager !== 'undefined') {
                        GameModeManager.updateMenuModeDisplay();
                        GameModeManager.updateHudOverlay();
                    }
                    if (!isGameRunning) renderFrame();
                } else {
                    openPurchaseConfirm('map', map);
                }
            });

            mapsGridEl.appendChild(card);

            setTimeout(() => {
                const cvs = document.getElementById(`map-preview-${containerId}-${map.id}`);
                drawMapPreview(cvs, map);
            }, 10);
        });
    }

    function drawMapPreview(canvas, map) {
        if (!canvas) return;
        const pCtx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const miniTile = w / GRID_SIZE;

        pCtx.clearRect(0, 0, w, h);
        pCtx.fillStyle = map.bgColor || ((selectedTheme === 'light') ? '#f8fafc' : '#090c14');
        pCtx.fillRect(0, 0, w, h);

        pCtx.strokeStyle = map.gridColor || 'rgba(0, 243, 255, 0.05)';
        pCtx.lineWidth = 0.5;
        for (let i = 0; i <= GRID_SIZE; i++) {
            pCtx.beginPath(); pCtx.moveTo(i * miniTile, 0); pCtx.lineTo(i * miniTile, h); pCtx.stroke();
            pCtx.beginPath(); pCtx.moveTo(0, i * miniTile); pCtx.lineTo(w, i * miniTile); pCtx.stroke();
        }

        if (map.obstacles && map.obstacles.length > 0) {
            map.obstacles.forEach(obs => {
                const ox = obs.x * miniTile;
                const oy = obs.y * miniTile;

                if (map.obstacleType === 'rock') pCtx.fillStyle = '#b36b32';
                else if (map.obstacleType === 'tree') pCtx.fillStyle = '#22c55e';
                else if (map.obstacleType === 'ice') pCtx.fillStyle = '#00ffff';
                else if (map.obstacleType === 'cyber') pCtx.fillStyle = '#ff007f';
                else if (map.obstacleType === 'maze') pCtx.fillStyle = '#3b82f6';
                else pCtx.fillStyle = '#888888';

                roundRect(pCtx, ox + 0.5, oy + 0.5, miniTile - 1, miniTile - 1, 1);
                pCtx.fill();
            });
        }

        // Mini Snake in center
        pCtx.fillStyle = '#00ff88';
        const miniSnake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
        miniSnake.forEach(seg => {
            roundRect(pCtx, seg.x * miniTile + 0.5, seg.y * miniTile + 0.5, miniTile - 1, miniTile - 1, 1);
            pCtx.fill();
        });

        // Mini Food
        pCtx.fillStyle = '#ff3366';
        pCtx.beginPath();
        pCtx.arc((14 + 0.5) * miniTile, (10 + 0.5) * miniTile, miniTile * 0.4, 0, Math.PI * 2);
        pCtx.fill();
    }

    function drawSkinPreview(canvasId, skin) {
        const pCanvas = document.getElementById(canvasId);
        if (!pCanvas) return;
        const pCtx = pCanvas.getContext('2d');
        const w = pCanvas.width;
        const h = pCanvas.height;

        pCtx.clearRect(0, 0, w, h);

        pCtx.fillStyle = (selectedTheme === 'light') ? '#f8fafc' : '#090c14';
        pCtx.fillRect(0, 0, w, h);

        pCtx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
        pCtx.lineWidth = 1;
        for (let x = 0; x < w; x += 15) {
            pCtx.beginPath(); pCtx.moveTo(x, 0); pCtx.lineTo(x, h); pCtx.stroke();
        }

        const segSize = 12;
        const startX = 25;
        const startY = 24;
        const time = Date.now() / 20;

        // Draw Food Preview
        const foodX = w - 28;
        const foodY = startY + segSize / 2;
        let foodCol = skin.foodColor;
        let foodGlow = skin.foodGlow;
        if (skin.isRainbow) {
            foodCol = `hsl(${(time * 4) % 360}, 100%, 60%)`;
            foodGlow = foodCol;
        }

        pCtx.save();
        pCtx.shadowBlur = 8;
        pCtx.shadowColor = foodGlow;
        pCtx.beginPath();
        pCtx.arc(foodX, foodY, 5, 0, Math.PI * 2);
        pCtx.fillStyle = foodCol;
        pCtx.fill();
        pCtx.restore();

        // Draw Mini Snake Segments
        const segs = [
            { x: startX + segSize * 2, y: startY },
            { x: startX + segSize, y: startY },
            { x: startX, y: startY }
        ];

        pCtx.save();
        for (let i = segs.length - 1; i >= 0; i--) {
            const seg = segs[i];
            const segCol = getAnimatedSkinColor(skin, i, time);

            pCtx.shadowBlur = i === 0 ? 8 : 4;
            pCtx.shadowColor = segCol;

            if (i === 0) {
                pCtx.fillStyle = segCol;
                roundRect(pCtx, seg.x, seg.y, segSize, segSize, 4);
                pCtx.fill();

                // Mini Eyes
                pCtx.fillStyle = '#04060c';
                pCtx.beginPath(); pCtx.arc(seg.x + segSize * 0.75, seg.y + segSize * 0.3, 1.5, 0, Math.PI * 2); pCtx.fill();
                pCtx.beginPath(); pCtx.arc(seg.x + segSize * 0.75, seg.y + segSize * 0.7, 1.5, 0, Math.PI * 2); pCtx.fill();
            } else {
                pCtx.fillStyle = segCol;
                roundRect(pCtx, seg.x + 1, seg.y + 1, segSize - 2, segSize - 2, 3);
                pCtx.fill();
            }
        }
        pCtx.restore();
    }

    // Themes List Renderer
    function renderThemesList(containerId = 'cust-themes-list') {
        const themesList = document.getElementById(containerId);
        if (!themesList) return;
        themesList.innerHTML = '';

        THEMES.forEach(theme => {
            const owned = InventoryManager.isThemeOwned(theme.id);
            if (containerId.startsWith('cust-') && !owned) return;
            const isEquipped = (selectedTheme === theme.id);

            const item = document.createElement('div');
            item.className = `theme-item-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked' : ''}`;
            item.style.padding = '8px 10px';
            item.style.marginBottom = '6px';
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';
            item.style.width = '100%';
            item.style.gap = '8px';
            item.style.boxSizing = 'border-box';

            let actionBtnHtml = '';
            if (isEquipped) {
                actionBtnHtml = `<button class="btn-shop-action active" disabled style="width: auto; min-width: 80px; flex-shrink: 0; padding: 6px 10px; font-size: 0.75rem;">✓ SEÇİLDİ</button>`;
            } else if (owned) {
                actionBtnHtml = `<button class="btn-shop-action equip" style="width: auto; min-width: 80px; flex-shrink: 0; padding: 6px 10px; font-size: 0.75rem;">SEÇ</button>`;
            } else {
                actionBtnHtml = `<button class="btn-shop-action buy" style="width: auto; min-width: 80px; flex-shrink: 0; padding: 6px 10px; font-size: 0.75rem;">AL (${theme.price} <img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin">)</button>`;
            }

            const bgCol = theme.bg || (theme.id === 'light' ? '#f8fafc' : (theme.id === 'neon' ? '#130924' : '#090c14'));
            const accentCol = theme.accent || (theme.id === 'light' ? '#0284c7' : (theme.id === 'neon' ? '#d946ef' : '#00f3ff'));

            item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; text-align: left;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: ${bgCol}; border: 2px solid ${accentCol}; display: flex; justify-content: center; align-items: center; font-size: 1.1rem; box-shadow: 0 0 8px ${accentCol}40; flex-shrink: 0;">
                        ${theme.icon || '🎨'}
                    </div>
                    <div class="theme-info" style="text-align: left; flex: 1; min-width: 0; overflow: hidden;">
                        <div class="skin-title" style="font-size: 0.82rem; font-weight: 800; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${theme.name}</div>
                        <div class="skin-desc" style="font-size: 0.68rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${theme.desc}</div>
                    </div>
                </div>
                ${actionBtnHtml}
            `;

            item.addEventListener('click', () => {
                playSound('button');
                if (isEquipped) return;
                if (owned) {
                    applyTheme(theme.id);
                    renderThemesList('cust-themes-list');
                    renderThemesList('shop-themes-list');
                } else {
                    openPurchaseConfirm('theme', theme);
                }
            });

            themesList.appendChild(item);
        });
    }

    // Trails Grid Renderer & Preview
    function drawTrailPreview(canvasId, trail) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const pctx = canvas.getContext('2d');
        if (!pctx) return;

        pctx.clearRect(0, 0, canvas.width, canvas.height);

        pctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        pctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 16) {
            pctx.beginPath(); pctx.moveTo(x, 0); pctx.lineTo(x, canvas.height); pctx.stroke();
        }

        if (trail.id === 'none') {
            const currentSkin = SKINS[selectedSkin] || SKINS.classic;
            pctx.shadowBlur = 8;
            pctx.shadowColor = currentSkin.glowColor || '#00ff88';
            pctx.fillStyle = currentSkin.headColor || '#00ff88';
            pctx.fillRect(100, 25, 20, 20);
            return;
        }

        pctx.save();
        const points = [
            { x: 25, y: 35 }, { x: 45, y: 35 }, { x: 65, y: 35 }, { x: 85, y: 35 }, { x: 105, y: 35 }
        ];

        pctx.lineWidth = Math.max(2, (trail.size || 8) * 0.7);
        pctx.lineCap = 'round';

        let mainCol = trail.color;
        const isRainbow = (trail.id === 'rainbow' || mainCol === 'rainbow');

        if (isRainbow) {
            const rainbowGrad = pctx.createLinearGradient(20, 35, 105, 35);
            rainbowGrad.addColorStop(0.0, '#ef4444');
            rainbowGrad.addColorStop(0.2, '#f97316');
            rainbowGrad.addColorStop(0.4, '#eab308');
            rainbowGrad.addColorStop(0.6, '#22c55e');
            rainbowGrad.addColorStop(0.8, '#00f3ff');
            rainbowGrad.addColorStop(1.0, '#a855f7');
            pctx.strokeStyle = rainbowGrad;
            pctx.shadowBlur = 12;
            pctx.shadowColor = '#00f3ff';
        } else {
            pctx.strokeStyle = mainCol;
            pctx.shadowBlur = 10;
            pctx.shadowColor = trail.glowColor || mainCol;
        }

        pctx.beginPath();
        pctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            pctx.lineTo(points[i].x, points[i].y);
        }
        pctx.stroke();

        const colors = isRainbow ? ['#ef4444', '#f97316', '#eab308', '#22c55e', '#00f3ff', '#a855f7'] : (trail.particleColors || [mainCol]);
        const shapes = Array.isArray(trail.particleShape) ? trail.particleShape : [trail.particleShape || 'circle'];

        for (let p = 0; p < 12; p++) {
            const px = 100 - (p * 6) + (Math.random() * 4 - 2);
            const py = 35 + (Math.sin(p * 0.8) * 6) + (Math.random() * 6 - 3);
            const pSize = (trail.size || 8) * (0.4 + Math.random() * 0.5);
            const pColor = colors[p % colors.length];
            const pShape = shapes[p % shapes.length];

            pctx.fillStyle = pColor;
            pctx.shadowBlur = 6;
            pctx.shadowColor = trail.glowColor || pColor;

            pctx.save();
            pctx.translate(px, py);

            if (pShape === 'star') {
                pctx.beginPath();
                for (let s = 0; s < 5; s++) {
                    pctx.lineTo(Math.cos((18 + s * 72) * Math.PI / 180) * pSize, -Math.sin((18 + s * 72) * Math.PI / 180) * pSize);
                    pctx.lineTo(Math.cos((54 + s * 72) * Math.PI / 180) * (pSize * 0.4), -Math.sin((54 + s * 72) * Math.PI / 180) * (pSize * 0.4));
                }
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'cross_star' || pShape === 'sparkle') {
                pctx.beginPath();
                const inner = pSize * 0.25;
                for (let s = 0; s < 4; s++) {
                    const a1 = (s * 90) * Math.PI / 180;
                    const a2 = (s * 90 + 45) * Math.PI / 180;
                    pctx.lineTo(Math.cos(a1) * pSize, Math.sin(a1) * pSize);
                    pctx.lineTo(Math.cos(a2) * inner, Math.sin(a2) * inner);
                }
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'diamond' || pShape === 'crystal') {
                pctx.beginPath();
                pctx.moveTo(0, -pSize); pctx.lineTo(pSize * 0.6, 0); pctx.lineTo(0, pSize); pctx.lineTo(-pSize * 0.6, 0);
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'lightning') {
                pctx.beginPath();
                pctx.moveTo(pSize * 0.2, -pSize); pctx.lineTo(-pSize * 0.5, 0); pctx.lineTo(0, 0);
                pctx.lineTo(-pSize * 0.3, pSize); pctx.lineTo(pSize * 0.6, -pSize * 0.2); pctx.lineTo(0.1, -pSize * 0.2);
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'flame') {
                pctx.beginPath();
                pctx.moveTo(0, -pSize);
                pctx.quadraticCurveTo(pSize * 0.8, -pSize * 0.2, pSize * 0.5, pSize * 0.5);
                pctx.quadraticCurveTo(0, pSize, -pSize * 0.5, pSize * 0.5);
                pctx.quadraticCurveTo(-pSize * 0.8, -pSize * 0.2, 0, -pSize);
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'bubble') {
                pctx.beginPath();
                pctx.arc(0, 0, Math.max(1, pSize), 0, Math.PI * 2);
                pctx.strokeStyle = pColor;
                pctx.lineWidth = Math.max(1, pSize * 0.25);
                pctx.stroke();
                pctx.fillStyle = '#ffffff';
                pctx.beginPath();
                pctx.arc(-pSize * 0.3, -pSize * 0.3, Math.max(0.5, pSize * 0.2), 0, Math.PI * 2);
                pctx.fill();
            } else if (pShape === 'heart') {
                pctx.beginPath();
                pctx.moveTo(0, pSize * 0.3);
                pctx.bezierCurveTo(-pSize, -pSize * 0.6, -pSize * 1.2, pSize * 0.5, 0, pSize * 1.3);
                pctx.bezierCurveTo(pSize * 1.2, pSize * 0.5, pSize, -pSize * 0.6, 0, pSize * 0.3);
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'leaf') {
                pctx.beginPath();
                pctx.moveTo(0, -pSize);
                pctx.quadraticCurveTo(pSize * 0.9, -pSize * 0.2, 0, pSize);
                pctx.quadraticCurveTo(-pSize * 0.9, -pSize * 0.2, 0, -pSize);
                pctx.closePath();
                pctx.fill();
            } else if (pShape === 'pixel' || pShape === 'square') {
                pctx.fillRect(-pSize / 2, -pSize / 2, pSize, pSize);
            } else if (pShape === 'void') {
                pctx.fillStyle = '#0f051d';
                pctx.strokeStyle = '#a855f7';
                pctx.lineWidth = 1.5;
                pctx.fillRect(-pSize / 2, -pSize / 2, pSize, pSize);
                pctx.strokeRect(-pSize / 2, -pSize / 2, pSize, pSize);
            } else {
                pctx.beginPath();
                pctx.arc(0, 0, Math.max(1, pSize), 0, Math.PI * 2);
                pctx.fill();
            }

            pctx.restore();
        }

        const currentSkin = SKINS[selectedSkin] || SKINS.classic;
        pctx.shadowBlur = 8;
        pctx.shadowColor = currentSkin.glowColor || '#00ff88';
        pctx.fillStyle = currentSkin.headColor || '#00ff88';
        pctx.fillRect(100, 25, 20, 20);

        pctx.restore();
    }

    function renderTrailsGrid(containerId = 'cust-trails-grid') {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        const trails = TrailManager.getAvailableTrails();
        const isShop = containerId.startsWith('shop');
        const equippedTrailId = TrailManager.getCurrentTrailId();

        trails.forEach(trail => {
            const isOwned = InventoryManager.isTrailOwned(trail.id);
            if (containerId.startsWith('cust-') && !isOwned) return;
            const isEquipped = (equippedTrailId === trail.id);

            const card = document.createElement('div');
            card.className = `trail-card ${isEquipped ? 'active' : ''}`;

            const rarityClass = `rarity-${trail.rarity.toLowerCase()}`;
            
            let actionBtnHTML = '';
            if (isShop && !isOwned) {
                actionBtnHTML = `<button class="btn-shop-action buy buy-trail-btn">SATIN AL (${trail.price} <img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin">)</button>`;
            } else if (isOwned) {
                if (isEquipped) {
                    actionBtnHTML = `<button class="btn-shop-action active" disabled>✓ SEÇİLDİ</button>`;
                } else {
                    actionBtnHTML = `<button class="btn-shop-action equip equip-trail-btn">SEÇ</button>`;
                }
            } else {
                actionBtnHTML = `<button class="btn-shop-action buy buy-trail-btn">SATIN AL (${trail.price} <img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin">)</button>`;
            }

            const previewCanvasId = `trail-prev-${containerId}-${trail.id}`;

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <span class="rarity-badge ${rarityClass}">${trail.rarity}</span>
                </div>
                <canvas id="${previewCanvasId}" width="160" height="70" style="background:rgba(0,0,0,0.4); border-radius:10px; border:1px solid rgba(255,255,255,0.1); width:100%; max-width:160px;"></canvas>
                <div style="text-align:center;">
                    <div style="font-weight:800; font-size:0.85rem; color:#f8fafc;">${trail.name}</div>
                    <div style="font-size:0.72rem; color:#94a3b8; margin-top:2px;">${trail.desc}</div>
                </div>
                <div style="width:100%; margin-top:4px;">
                    ${actionBtnHTML}
                </div>
            `;

            container.appendChild(card);

            setTimeout(() => {
                drawTrailPreview(previewCanvasId, trail);
            }, 10);

            const buyBtn = card.querySelector('.buy-trail-btn');
            if (buyBtn) {
                buyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    playSound('button');
                    openPurchaseConfirm('trail', trail);
                });
            }

            const equipBtn = card.querySelector('.equip-trail-btn');
            if (equipBtn) {
                equipBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    playSound('button');
                    TrailManager.setTrail(trail.id);
                    renderTrailsGrid('shop-trails-grid');
                    renderTrailsGrid('cust-trails-grid');
                    if (!isGameRunning) renderFrame();
                });
            }
        });
    }

    // Accessories Grid Renderer for Shop and Customization
    let currentAccessorySubTab = {
        shop: 'hats',
        cust: 'hats'
    };

    function setAccessorySubTab(mode, subtab) {
        currentAccessorySubTab[mode] = subtab;
        const hatsBtn = document.getElementById(`${mode}-acc-subtab-hats`);
        const glassesBtn = document.getElementById(`${mode}-acc-subtab-glasses`);
        if (hatsBtn) {
            if (subtab === 'hats') hatsBtn.classList.add('active');
            else hatsBtn.classList.remove('active');
        }
        if (glassesBtn) {
            if (subtab === 'glasses') glassesBtn.classList.add('active');
            else glassesBtn.classList.remove('active');
        }
        renderAccessoriesGrid(`${mode}-accessories-grid`);
    }

    function renderAccessoriesGrid(containerId = 'cust-accessories-grid', categoryFilter = 'all') {
        const grid = document.getElementById(containerId);
        if (!grid) return;
        grid.innerHTML = '';

        const isCust = containerId.startsWith('cust-');
        const mode = isCust ? 'cust' : 'shop';
        const activeSubTab = currentAccessorySubTab[mode] || 'hats';

        const allAccs = Object.values(ACCESSORY_CONFIG);

        allAccs.forEach(acc => {
            if (activeSubTab === 'glasses') {
                if (acc.type !== 'glasses') return;
            } else {
                if (acc.type === 'glasses') return;
            }

            if (categoryFilter !== 'all' && acc.category !== categoryFilter) return;

            const owned = AccessoryManager.isOwned(acc.id);
            if (isCust && !owned && acc.id !== 'none' && acc.id !== 'none_glasses') return;

            const isEquipped = AccessoryManager.isEquipped(acc.id);

            const card = document.createElement('div');
            card.className = `accessory-card ${isEquipped ? 'active' : ''}`;

            let actionBtnHtml = '';
            if (isEquipped) {
                actionBtnHtml = `<button class="btn btn-primary" style="padding: 6px; font-size: 0.75rem; width: 100%; background: #10b981; border-color: #34d399;">✓ KUŞANILDI</button>`;
            } else if (owned) {
                actionBtnHtml = `<button class="btn btn-purple btn-acc-equip" style="padding: 6px; font-size: 0.75rem; width: 100%;">TAK</button>`;
            } else if (acc.unlockType === 'shop') {
                actionBtnHtml = `<button class="btn btn-warning btn-acc-buy" style="padding: 6px; font-size: 0.75rem; width: 100%;">🛒 ${acc.price} COIN</button>`;
            } else {
                let reqText = 'ÖDÜL İLE AÇILIR';
                if (acc.unlockType === 'level') reqText = `🔒 SEVİYE ${acc.requiredLevel}`;
                else if (acc.unlockType === 'streak') reqText = `🔒 ${acc.requiredStreak} GÜN SERİ`;
                else if (acc.unlockType === 'daily_reward') reqText = `🔒 GÜNLÜK ÖDÜL`;
                actionBtnHtml = `<button class="btn btn-secondary" style="padding: 6px; font-size: 0.70rem; width: 100%; opacity: 0.8;" disabled>${reqText}</button>`;
            }

            card.innerHTML = `
                <div class="accessory-icon-box">
                    ${ACCESSORY_SVG_FILES[acc.id] ? `<img src="${ACCESSORY_SVG_FILES[acc.id]}" style="width: 48px; height: 48px; object-fit: contain;">` : `<span>${acc.icon}</span>`}
                </div>
                <div style="font-size: 0.82rem; font-weight: 800; color: #ffffff; margin-bottom: 2px;">${acc.name}</div>
                <div style="margin-bottom: 8px;">
                    <span class="rarity-badge rarity-${acc.rarity}">${acc.rarity.toUpperCase()}</span>
                </div>
                ${actionBtnHtml}
            `;

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                playSound('button');
                if (isEquipped) {
                    if (acc.id !== 'none' && acc.id !== 'none_glasses') {
                        AccessoryManager.unequipAccessory(acc.type || 'hat');
                    }
                } else if (owned) {
                    AccessoryManager.equipAccessory(acc.id);
                } else if (acc.unlockType === 'shop') {
                    openPurchaseConfirm('accessory', acc);
                } else {
                    openAccessoryPreviewModal(acc);
                }
            });

            grid.appendChild(card);
        });
    }

    // Collection Modal Renderer
    let currentCollectionCat = 'all';
    function renderCollectionGrid() {
        const grid = document.getElementById('collection-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const stats = AccessoryManager.getCollectionStats();
        const badgeEl = document.getElementById('collection-summary-badge');
        const pctEl = document.getElementById('collection-percent-text');
        const fillEl = document.getElementById('collection-fill-bar');

        if (badgeEl) badgeEl.textContent = `${stats.unlocked} / ${stats.total} (%${stats.percent})`;
        if (pctEl) pctEl.textContent = `${stats.percent}%`;
        if (fillEl) fillEl.style.width = `${stats.percent}%`;

        // Render Category Tabs in Collection
        const catContainer = document.getElementById('collection-cat-tabs');
        if (catContainer && catContainer.children.length === 0) {
            ACCESSORY_CATEGORIES.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = `shop-tab-btn ${cat.id === currentCollectionCat ? 'active' : ''}`;
                btn.textContent = `${cat.icon} ${cat.name}`;
                btn.addEventListener('click', () => {
                    playSound('button');
                    currentCollectionCat = cat.id;
                    Array.from(catContainer.children).forEach(c => c.classList.remove('active'));
                    btn.classList.add('active');
                    renderCollectionGrid();
                });
                catContainer.appendChild(btn);
            });
        }

        const allAccs = Object.values(ACCESSORY_CONFIG).filter(a => a.id !== 'none');

        allAccs.forEach(acc => {
            if (currentCollectionCat !== 'all' && acc.category !== currentCollectionCat) return;

            const owned = AccessoryManager.isOwned(acc.id);
            const isEquipped = AccessoryManager.isEquipped(acc.id);

            const card = document.createElement('div');
            card.className = `accessory-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked-item' : ''}`;

            let statusText = owned ? (isEquipped ? '✓ KUŞANILDI' : 'KAZANILDI') : 'KİLİTLİ';
            let statusColor = owned ? (isEquipped ? '#10b981' : '#38bdf8') : '#94a3b8';

            card.innerHTML = `
                <div class="accessory-icon-box" style="${!owned ? 'filter: grayscale(0.8) opacity(0.5);' : ''}">
                    <span>${acc.icon}</span>
                </div>
                <div style="font-size: 0.82rem; font-weight: 800; color: #ffffff; margin-bottom: 2px;">${acc.name}</div>
                <div style="margin-bottom: 6px;">
                    <span class="rarity-badge rarity-${acc.rarity}">${acc.rarity.toUpperCase()}</span>
                </div>
                <div style="font-size: 0.70rem; font-weight: 800; color: ${statusColor};">${statusText}</div>
            `;

            card.addEventListener('click', () => {
                playSound('button');
                openAccessoryPreviewModal(acc);
            });

            grid.appendChild(card);
        });
    }

    // Live Interactive Accessory Preview Modal
    function openAccessoryPreviewModal(acc) {
        const modal = document.getElementById('accessory-preview-modal');
        if (!modal) return;

        const titleEl = document.getElementById('acc-prev-title');
        const rarityEl = document.getElementById('acc-prev-rarity');
        const descEl = document.getElementById('acc-prev-desc');
        const infoEl = document.getElementById('acc-prev-unlock-info');
        const actionBtn = document.getElementById('acc-prev-action-btn');
        const closeBtn = document.getElementById('acc-prev-close-btn');
        const canvas = document.getElementById('acc-prev-canvas');

        if (titleEl) titleEl.textContent = `${acc.icon} ${acc.name}`;
        if (rarityEl) {
            rarityEl.textContent = acc.rarity.toUpperCase();
            rarityEl.className = `rarity-badge rarity-${acc.rarity}`;
        }
        if (descEl) descEl.textContent = acc.description;

        const owned = AccessoryManager.isOwned(acc.id);
        const isEquipped = AccessoryManager.isEquipped(acc.id);

        if (infoEl) {
            if (owned) {
                infoEl.textContent = '✅ Bu aksesuara sahipsiniz!';
                infoEl.style.color = '#34d399';
            } else if (acc.unlockType === 'shop') {
                infoEl.textContent = `🛒 Mağaza Fiyatı: ${acc.price} COIN`;
                infoEl.style.color = '#ffd700';
            } else if (acc.unlockType === 'level') {
                infoEl.textContent = `🔒 Seviye ${acc.requiredLevel} Ödülü`;
                infoEl.style.color = '#a855f7';
            } else if (acc.unlockType === 'streak') {
                infoEl.textContent = `🔒 ${acc.requiredStreak} Günlük Seri Ödülü`;
                infoEl.style.color = '#f97316';
            } else {
                infoEl.textContent = '🔒 Günlük Ödül / Etkinlik Ödülü';
                infoEl.style.color = '#38bdf8';
            }
        }

        if (actionBtn) {
            if (isEquipped) {
                actionBtn.textContent = 'ÇIKAR (UNEQUIP)';
                actionBtn.className = 'btn btn-secondary';
                actionBtn.onclick = () => {
                    AccessoryManager.unequipAccessory(acc.type || 'hat');
                    modal.classList.add('hidden');
                    renderCollectionGrid();
                    renderAllCosmeticsUI();
                };
            } else if (owned) {
                actionBtn.textContent = 'TAK (EQUIP)';
                actionBtn.className = 'btn btn-primary btn-glow';
                actionBtn.onclick = () => {
                    AccessoryManager.equipAccessory(acc.id);
                    modal.classList.add('hidden');
                    renderCollectionGrid();
                    renderAllCosmeticsUI();
                };
            } else if (acc.unlockType === 'shop') {
                actionBtn.innerHTML = `SATIN AL (${acc.price} <img src="neon_snake_coin.svg" class="coin-img-icon" alt="coin">)`;
                actionBtn.className = 'btn btn-warning btn-glow';
                actionBtn.onclick = () => {
                    modal.classList.add('hidden');
                    openPurchaseConfirm('accessory', acc);
                };
            } else {
                actionBtn.textContent = 'KİLİTLİ';
                actionBtn.className = 'btn btn-secondary';
                actionBtn.onclick = () => {
                    modal.classList.add('hidden');
                };
            }
        }

        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.add('hidden');
            };
        }

        // Render preview on canvas
        drawAccessoryPreviewCanvas(canvas, acc);

        modal.classList.remove('hidden');
    }

    function drawAccessoryPreviewCanvas(canvas, acc) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const skin = SKINS[selectedSkin] || SKINS.classic;
        const tileSize = 32;
        const cx = w / 2;
        const cy = h / 2 + 10;

        // Draw body preview
        const time = Date.now() / 20;
        for (let i = 2; i >= 0; i--) {
            ctx.save();
            const segCol = getAnimatedSkinColor(skin, i, time);
            ctx.shadowBlur = 10;
            ctx.shadowColor = segCol;
            ctx.fillStyle = segCol;
            const bx = cx - i * (tileSize * 0.85);
            roundRect(ctx, bx - tileSize / 2, cy - tileSize / 2, tileSize - 2, tileSize - 2, 6);
            ctx.fill();
            ctx.restore();
        }

        // Eyes
        ctx.fillStyle = '#04060c';
        ctx.beginPath();
        ctx.arc(cx + 6, cy - 6, 3.5, 0, Math.PI * 2);
        ctx.arc(cx + 6, cy + 6, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw Accessory
        if (acc && acc.id !== 'none') {
            ctx.save();
            ctx.translate(cx, cy);

            if (acc.rarity === 'legendary') {
                ctx.shadowBlur = 18;
                ctx.shadowColor = '#ffd700';
            } else if (acc.rarity === 'epic') {
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#a855f7';
            } else if (acc.rarity === 'rare') {
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#3b82f6';
            }

            const img = ACCESSORY_IMAGES[acc.id];
            if (img && img.complete && img.naturalWidth > 0) {
                const scale = acc.scale || 1.15;
                const imgW = tileSize * scale;
                const imgH = imgW * (img.naturalHeight / img.naturalWidth || 1);
                const ox = (acc.offsetX || 0) * tileSize;
                const oy = (acc.offsetY || -0.50) * tileSize;
                ctx.drawImage(img, -imgW / 2 + ox, oy - imgH / 2, imgW, imgH);
            } else {
                const ox = (acc.offsetX || 0) * tileSize;
                const oy = (acc.offsetY || -0.42) * tileSize;
                const fontSize = Math.floor(tileSize * (acc.scale || 0.85));
                ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(acc.icon, ox, oy);
            }
            ctx.restore();
        }
    }

    function updateLoadoutDisplays() {
        const skinObj = SKINS[selectedSkin] || SKINS.classic;
        const trailObj = TRAIL_CONFIG[TrailManager.currentTrailId] || TRAIL_CONFIG.none;
        const accObj = AccessoryManager.getEquippedAccessory();
        const themeObj = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

        const skinEl = document.getElementById('loadout-skin-name');
        const trailEl = document.getElementById('loadout-trail-name');
        const accEl = document.getElementById('loadout-acc-name');
        const themeEl = document.getElementById('loadout-theme-name');

        if (skinEl) skinEl.textContent = skinObj.name;
        if (trailEl) trailEl.textContent = trailObj.name;
        if (accEl) accEl.textContent = `${accObj.icon} ${accObj.name}`;
        if (themeEl) themeEl.textContent = themeObj.name;
    }

    function renderAllCosmeticsUI() {
        renderSkinsGrid('cust-skins-grid');
        renderSkinsGrid('shop-skins-grid');
        renderMapsGrid('cust-maps-grid');
        renderMapsGrid('shop-maps-grid');
        renderMapsGrid('modes-maps-grid');
        renderThemesList('cust-themes-list');
        renderThemesList('shop-themes-list');
        renderTrailsGrid('cust-trails-grid');
        renderTrailsGrid('shop-trails-grid');
        renderAccessoriesGrid('cust-accessories-grid');
        renderAccessoriesGrid('shop-accessories-grid');
        updateLoadoutDisplays();
        updateAllCoinDisplays();
        if (typeof GameModeManager !== 'undefined') {
            GameModeManager.updateMenuModeDisplay();
            GameModeManager.updateHudOverlay();
        }
    }

    // Shop Tab & Purchase Management
    let currentShopTab = 'skins';
    let pendingPurchaseItem = null;

    function switchShopTab(tab) {
        currentShopTab = tab;
        const tabs = ['skins', 'accessories', 'maps', 'themes', 'trails'];
        tabs.forEach(t => {
            const btn = document.getElementById(`shop-tab-${t}`);
            const content = document.getElementById(`shop-content-${t}`);
            if (btn) {
                if (t === tab) btn.classList.add('active');
                else btn.classList.remove('active');
            }
            if (content) {
                if (t === tab) {
                    content.classList.remove('hidden');
                    content.classList.add('active');
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('active');
                }
            }
        });
        renderShopTab(tab);
    }

    function renderShopTab(tab) {
        if (tab === 'skins') renderSkinsGrid('shop-skins-grid');
        else if (tab === 'accessories') renderAccessoriesGrid('shop-accessories-grid');
        else if (tab === 'maps') renderMapsGrid('shop-maps-grid');
        else if (tab === 'themes') renderThemesList('shop-themes-list');
        else if (tab === 'trails') renderTrailsGrid('shop-trails-grid');
    }

    function openPurchaseConfirm(type, item) {
        const currentCoins = CoinManager.getCoins();
        if (currentCoins < item.price) {
            showAlertModal('YETERLİ COIN YOK', `Bu ürünü almak için ${item.price} COIN gerekiyor.\nMevcut Coin miktarınız: ${currentCoins} COIN`);
            return;
        }

        pendingPurchaseItem = { ...item, categoryType: type };

        const titleEl = document.getElementById('confirm-item-title');
        const descEl = document.getElementById('confirm-item-desc');
        const priceEl = document.getElementById('confirm-item-price');
        const confirmModal = document.getElementById('purchase-confirm-modal');

        if (titleEl) titleEl.textContent = `${item.name} Satın Al`;
        if (descEl) descEl.textContent = `"${item.name}" ürünü ${item.price} Coin karşılığında satın almak istiyor musunuz?`;
        if (priceEl) priceEl.textContent = item.price;

        if (confirmModal) confirmModal.classList.remove('hidden');
    }

    function executePurchase() {
        if (!pendingPurchaseItem) return;
        const { type, categoryType, id, name, price } = pendingPurchaseItem;
        const pType = categoryType || type;

        if (CoinManager.canAfford(price)) {
            if (CoinManager.removeCoins(price)) {
                if (pType === 'skin') {
                    InventoryManager.addSkin(id);
                    selectedSkin = id;
                    localStorage.setItem('snake_selected_skin', id);
                } else if (pType === 'map') {
                    InventoryManager.addMap(id);
                    selectedMap = id;
                    localStorage.setItem('snake_selected_map', id);
                } else if (pType === 'theme') {
                    InventoryManager.addTheme(id);
                    selectedTheme = id;
                    applyTheme(id);
                } else if (pType === 'trail') {
                    InventoryManager.addTrail(id);
                    TrailManager.setTrail(id);
                } else if (pType === 'accessory' || pType === 'hat' || pType === 'glasses' || type === 'hat' || type === 'glasses') {
                    InventoryManager.addAccessory(id);
                    AccessoryManager.equipAccessory(id);
                }

                playSound('reward');
                closePurchaseConfirm();

                const stats = PlayerStats.getStats();
                stats.ownedSkins = InventoryManager.getOwnedSkins();
                stats.ownedMaps = InventoryManager.getOwnedMaps();
                stats.ownedThemes = InventoryManager.getOwnedThemes();
                stats.ownedTrails = InventoryManager.getOwnedTrails();
                stats.ownedAccessories = InventoryManager.getOwnedAccessories();
                PlayerStats.saveStats(stats);
                AchievementManager.checkAchievements();
                updateMenuBadges();

                renderAllCosmeticsUI();
                if (!isGameRunning) renderFrame();

                showAlertModal('SATIN ALMA BAŞARILI', `"${name}" başarıyla satın alındı ve aktif edildi!`);
            }
        } else {
            closePurchaseConfirm();
            showAlertModal('YETERLİ COIN YOK', `Bu ürün için ${price} Coin gerekiyor.`);
        }
    }

    function closePurchaseConfirm() {
        pendingPurchaseItem = null;
        const confirmModal = document.getElementById('purchase-confirm-modal');
        if (confirmModal) confirmModal.classList.add('hidden');
    }

    function showAlertModal(title, message) {
        const alertTitleEl = document.getElementById('alert-title');
        const alertDescEl = document.getElementById('alert-desc');
        const alertModal = document.getElementById('alert-modal');

        if (alertTitleEl) alertTitleEl.textContent = title;
        if (alertDescEl) alertDescEl.textContent = message;

        if (alertModal) alertModal.classList.remove('hidden');
    }

    function closeAlertModal() {
        const alertModal = document.getElementById('alert-modal');
        if (alertModal) alertModal.classList.add('hidden');
    }

    // Screen Navigation
    function startGame() {
        initAudio();
        AudioManager.playSound('game_start');
        VibrationManager.light();

        if (appContainer) appContainer.classList.add('game-playing');

        const activeMode = GameModeManager.getCurrentModeId();
        AudioManager.playMusicForMode(activeMode);

        mainMenuModal.classList.add('hidden');
        pauseModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        if (howToModal) howToModal.classList.add('hidden');
        if (shopModal) shopModal.classList.add('hidden');
        if (customizeModal) customizeModal.classList.add('hidden');
        if (achievementsModal) achievementsModal.classList.add('hidden');
        if (missionsModal) missionsModal.classList.add('hidden');

        resetGame();
        isGameRunning = true;
        isPaused = false;
        lastStepTime = performance.now();

        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(gameLoop);
    }

    function togglePause() {
        if (!isGameRunning) return;

        initAudio();

        isPaused = !isPaused;

        if (isPaused) {
            AudioManager.playSound('pause');
            VibrationManager.light();

            PowerUpManager.onPause();
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
            pauseModal.classList.remove('hidden');
        } else {
            AudioManager.playSound('resume');
            VibrationManager.light();

            PowerUpManager.onResume();
            pauseModal.classList.add('hidden');
            lastStepTime = performance.now();
            animFrameId = requestAnimationFrame(gameLoop);
        }
    }

    function showMainMenu() {
        AudioManager.playSound('button_click');
        VibrationManager.light();
        AudioManager.playMusic('menu_music');

        if (appContainer) appContainer.classList.remove('game-playing');

        isGameRunning = false;
        isPaused = false;
        levelUpPausedGame = false;
        PowerUpManager.reset();
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }

        pauseModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        if (howToModal) howToModal.classList.add('hidden');
        if (shopModal) shopModal.classList.add('hidden');
        if (customizeModal) customizeModal.classList.add('hidden');
        if (achievementsModal) achievementsModal.classList.add('hidden');
        if (missionsModal) missionsModal.classList.add('hidden');
        const goalsModal = document.getElementById('goals-modal');
        if (goalsModal) goalsModal.classList.add('hidden');
        const modesModal = document.getElementById('modes-modal');
        if (modesModal) modesModal.classList.add('hidden');
        const levelRewardsModal = document.getElementById('level-rewards-modal');
        if (levelRewardsModal) levelRewardsModal.classList.add('hidden');
        const levelUpModal = document.getElementById('level-up-modal');
        if (levelUpModal) levelUpModal.classList.add('hidden');

        updateHighScoreUI();
        updateAllCoinDisplays();
        XPUI.updateAllUI();
        mainMenuModal.classList.remove('hidden');
    }

    function closeSecondaryModals() {
        if (howToModal) howToModal.classList.add('hidden');
        if (shopModal) shopModal.classList.add('hidden');
        if (customizeModal) customizeModal.classList.add('hidden');
        if (achievementsModal) achievementsModal.classList.add('hidden');
        if (missionsModal) missionsModal.classList.add('hidden');
        const goalsModal = document.getElementById('goals-modal');
        if (goalsModal) goalsModal.classList.add('hidden');
        const modesModal = document.getElementById('modes-modal');
        if (modesModal) modesModal.classList.add('hidden');
        const levelRewardsModal = document.getElementById('level-rewards-modal');
        if (levelRewardsModal) levelRewardsModal.classList.add('hidden');
        const levelUpModal = document.getElementById('level-up-modal');
        if (levelUpModal) levelUpModal.classList.add('hidden');
        const collectionModal = document.getElementById('collection-modal');
        if (collectionModal) collectionModal.classList.add('hidden');
        const accPrevModal = document.getElementById('accessory-preview-modal');
        if (accPrevModal) accPrevModal.classList.add('hidden');
        const accUnlockModal = document.getElementById('accessory-unlock-modal');
        if (accUnlockModal) accUnlockModal.classList.add('hidden');
    }

    // Input Event Listeners
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            e.preventDefault();
            changeDirection(0, -1);
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            e.preventDefault();
            changeDirection(0, 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            changeDirection(-1, 0);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            changeDirection(1, 0);
        } else if (e.key === 'p' || e.key === 'P' || e.key === ' ') {
            e.preventDefault();
            togglePause();
        }
    });

    // Ultra-Responsive D-Pad Control Listeners with Pointer/Touch Support & Sliding Controls
    const dpadContainer = document.querySelector('.dpad');
    let currentActiveDpadBtn = null;

    const setupDpadButton = (btn, dx, dy) => {
        if (!btn) return;

        let handledTouch = false;

        const press = (e) => {
            if (e && e.cancelable) e.preventDefault();

            if (e.type === 'touchstart') {
                handledTouch = true;
            } else if ((e.type === 'pointerdown' || e.type === 'mousedown') && handledTouch) {
                return;
            }

            if (currentActiveDpadBtn && currentActiveDpadBtn !== btn) {
                currentActiveDpadBtn.classList.remove('active');
            }
            currentActiveDpadBtn = btn;

            initAudio();
            btn.classList.add('active');
            VibrationManager.vibrate(8);
            changeDirection(dx, dy);
        };

        const release = (e) => {
            if (e && e.type === 'touchend') {
                setTimeout(() => { handledTouch = false; }, 300);
            }
            btn.classList.remove('active');
            if (currentActiveDpadBtn === btn) {
                currentActiveDpadBtn = null;
            }
        };

        btn.addEventListener('touchstart', press, { passive: false });
        btn.addEventListener('touchend', release, { passive: true });
        btn.addEventListener('touchcancel', release, { passive: true });

        btn.addEventListener('pointerdown', press, { passive: false });
        btn.addEventListener('pointerup', release, { passive: true });
        btn.addEventListener('pointercancel', release, { passive: true });

        btn.addEventListener('mousedown', press, { passive: false });
        btn.addEventListener('mouseup', release, { passive: true });
    };

    setupDpadButton(btnUp, 0, -1);
    setupDpadButton(btnDown, 0, 1);
    setupDpadButton(btnLeft, -1, 0);
    setupDpadButton(btnRight, 1, 0);

    // Touch Slide / Drag Across D-Pad Buttons
    if (dpadContainer) {
        const checkDpadSlide = (clientX, clientY, e) => {
            const el = document.elementFromPoint(clientX, clientY);
            const btn = el ? el.closest('.dpad-btn') : null;
            if (btn && btn !== currentActiveDpadBtn) {
                if (currentActiveDpadBtn) {
                    currentActiveDpadBtn.classList.remove('active');
                }
                currentActiveDpadBtn = btn;
                if (btn === btnUp) triggerSlide(btn, 0, -1, e);
                else if (btn === btnDown) triggerSlide(btn, 0, 1, e);
                else if (btn === btnLeft) triggerSlide(btn, -1, 0, e);
                else if (btn === btnRight) triggerSlide(btn, 1, 0, e);
            } else if (!btn && currentActiveDpadBtn) {
                currentActiveDpadBtn.classList.remove('active');
                currentActiveDpadBtn = null;
            }
        };

        function triggerSlide(btn, dx, dy, e) {
            if (e && e.cancelable) e.preventDefault();
            initAudio();
            btn.classList.add('active');
            VibrationManager.vibrate(8);
            changeDirection(dx, dy);
        }

        dpadContainer.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length > 0) {
                if (e.cancelable) e.preventDefault();
                checkDpadSlide(e.touches[0].clientX, e.touches[0].clientY, e);
            }
        }, { passive: false });

        dpadContainer.addEventListener('touchend', () => {
            if (currentActiveDpadBtn) {
                currentActiveDpadBtn.classList.remove('active');
                currentActiveDpadBtn = null;
            }
        });
        dpadContainer.addEventListener('touchcancel', () => {
            if (currentActiveDpadBtn) {
                currentActiveDpadBtn.classList.remove('active');
                currentActiveDpadBtn = null;
            }
        });
    }

    // ==========================================
    // 🎮 CONTROL SETTINGS & VIRTUAL JOYSTICK
    // ==========================================
    const ControlSettingsManager = {
        controlType: 'dpad', // 'dpad' or 'joystick'

        init() {
            const saved = localStorage.getItem('snake_control_type');
            if (saved === 'joystick' || saved === 'dpad') {
                this.controlType = saved;
            }
            this.applyControlType(this.controlType);
            this.bindUI();
            this.setupJoystick();
        },

        setControlType(type) {
            if (type !== 'dpad' && type !== 'joystick') return;
            this.controlType = type;
            localStorage.setItem('snake_control_type', type);
            this.applyControlType(type);
        },

        applyControlType(type) {
            const dpad = document.querySelector('.dpad');
            const joystick = document.getElementById('virtual-joystick');
            const btnDpad = document.getElementById('ctrl-btn-dpad');
            const btnJoystick = document.getElementById('ctrl-btn-joystick');

            if (btnDpad) btnDpad.classList.toggle('active', type === 'dpad');
            if (btnJoystick) btnJoystick.classList.toggle('active', type === 'joystick');

            if (type === 'dpad') {
                if (joystick) joystick.classList.add('hidden');
                if (dpad) dpad.classList.remove('hidden');
            } else {
                if (dpad) dpad.classList.add('hidden');
                if (joystick) joystick.classList.remove('hidden');
            }
        },

        bindUI() {
            const btnDpad = document.getElementById('ctrl-btn-dpad');
            const btnJoystick = document.getElementById('ctrl-btn-joystick');

            if (btnDpad) {
                btnDpad.addEventListener('click', () => {
                    if (this.controlType !== 'dpad') {
                        this.setControlType('dpad');
                        if (typeof AudioManager !== 'undefined') AudioManager.playSound('button_click');
                        VibrationManager.medium();
                    }
                });
            }
            if (btnJoystick) {
                btnJoystick.addEventListener('click', () => {
                    if (this.controlType !== 'joystick') {
                        this.setControlType('joystick');
                        if (typeof AudioManager !== 'undefined') AudioManager.playSound('button_click');
                        VibrationManager.medium();
                    }
                });
            }
        },

        setupJoystick() {
            const joystickElem = document.getElementById('virtual-joystick');
            const baseElem = joystickElem ? joystickElem.querySelector('.joystick-base') : null;
            const knobElem = document.getElementById('joystick-knob');
            if (!joystickElem || !baseElem || !knobElem) return;

            const arrows = {
                UP: joystickElem.querySelector('.j-up'),
                DOWN: joystickElem.querySelector('.j-down'),
                LEFT: joystickElem.querySelector('.j-left'),
                RIGHT: joystickElem.querySelector('.j-right')
            };

            let isDragging = false;
            let activeTouchId = null;
            let lastDirStr = null;

            const updateArrowHighlight = (dirStr) => {
                Object.keys(arrows).forEach(k => {
                    if (arrows[k]) {
                        if (k === dirStr) arrows[k].classList.add('active');
                        else arrows[k].classList.remove('active');
                    }
                });
            };

            const resetKnob = () => {
                isDragging = false;
                activeTouchId = null;
                lastDirStr = null;
                knobElem.style.transform = 'translate(0px, 0px)';
                knobElem.classList.remove('active');
                updateArrowHighlight(null);
            };

            const handlePointerMove = (clientX, clientY) => {
                if (!isDragging) return;

                const rect = baseElem.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = clientX - centerX;
                const dy = clientY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxRadius = 50;
                const clampedDist = Math.min(distance, maxRadius);
                const angle = Math.atan2(dy, dx);

                const knobX = Math.cos(angle) * clampedDist;
                const knobY = Math.sin(angle) * clampedDist;

                knobElem.style.transform = `translate(${knobX}px, ${knobY}px)`;
                knobElem.classList.add('active');

                const minThreshold = 14;
                if (distance >= minThreshold) {
                    let dirX = 0;
                    let dirY = 0;
                    let currentDirStr = null;

                    if (Math.abs(dx) > Math.abs(dy)) {
                        if (dx > 0) { dirX = 1; dirY = 0; currentDirStr = 'RIGHT'; }
                        else { dirX = -1; dirY = 0; currentDirStr = 'LEFT'; }
                    } else {
                        if (dy > 0) { dirX = 0; dirY = 1; currentDirStr = 'DOWN'; }
                        else { dirX = 0; dirY = -1; currentDirStr = 'UP'; }
                    }

                    if (currentDirStr !== lastDirStr) {
                        lastDirStr = currentDirStr;
                        updateArrowHighlight(currentDirStr);
                        VibrationManager.light();
                        changeDirection(dirX, dirY);
                    }
                } else {
                    if (lastDirStr !== null) {
                        lastDirStr = null;
                        updateArrowHighlight(null);
                    }
                }
            };

            // Touch event listeners
            baseElem.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches.length > 0) {
                    if (e.cancelable) e.preventDefault();
                    initAudio();
                    const touch = e.changedTouches[0];
                    activeTouchId = touch.identifier;
                    isDragging = true;
                    handlePointerMove(touch.clientX, touch.clientY);
                }
            }, { passive: false });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging || activeTouchId === null) return;
                for (let i = 0; i < e.touches.length; i++) {
                    if (e.touches[i].identifier === activeTouchId) {
                        if (e.cancelable) e.preventDefault();
                        handlePointerMove(e.touches[i].clientX, e.touches[i].clientY);
                        break;
                    }
                }
            }, { passive: false });

            window.addEventListener('touchend', (e) => {
                if (!isDragging || activeTouchId === null) return;
                for (let i = 0; i < e.changedTouches.length; i++) {
                    if (e.changedTouches[i].identifier === activeTouchId) {
                        resetKnob();
                        break;
                    }
                }
            });

            window.addEventListener('touchcancel', (e) => {
                if (!isDragging || activeTouchId === null) return;
                resetKnob();
            });

            // Mouse fallback for desktop testing
            baseElem.addEventListener('mousedown', (e) => {
                initAudio();
                isDragging = true;
                handlePointerMove(e.clientX, e.clientY);
            });

            window.addEventListener('mousemove', (e) => {
                if (isDragging && activeTouchId === null) {
                    handlePointerMove(e.clientX, e.clientY);
                }
            });

            window.addEventListener('mouseup', () => {
                if (isDragging && activeTouchId === null) {
                    resetKnob();
                }
            });
        }
    };

    ControlSettingsManager.init();

    // Touch Swipe Gestures on Canvas
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 25;

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            initAudio();
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;

            if (Math.abs(dx) > Math.abs(dy)) {
                if (Math.abs(dx) > minSwipeDistance) {
                    if (dx > 0) changeDirection(1, 0);
                    else changeDirection(-1, 0);
                }
            } else {
                if (Math.abs(dy) > minSwipeDistance) {
                    if (dy > 0) changeDirection(0, 1);
                    else changeDirection(0, -1);
                }
            }
        }
    });

    // Main Menu Buttons
    startBtn.addEventListener('click', startGame);

    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            updateAllCoinDisplays();
            switchShopTab('skins');
            if (shopModal) shopModal.classList.remove('hidden');
        });
    }

    const closeShopBtn = document.getElementById('close-shop-btn');
    if (closeShopBtn) {
        closeShopBtn.addEventListener('click', () => {
            playSound('button');
            if (shopModal) shopModal.classList.add('hidden');
        });
    }

    const shopTabSkins = document.getElementById('shop-tab-skins');
    const shopTabAccessories = document.getElementById('shop-tab-accessories');
    const shopTabMaps = document.getElementById('shop-tab-maps');
    const shopTabThemes = document.getElementById('shop-tab-themes');
    const shopTabTrails = document.getElementById('shop-tab-trails');

    if (shopTabSkins) shopTabSkins.addEventListener('click', () => { playSound('button'); switchShopTab('skins'); });
    if (shopTabAccessories) shopTabAccessories.addEventListener('click', () => { playSound('button'); switchShopTab('accessories'); });
    if (shopTabMaps) shopTabMaps.addEventListener('click', () => { playSound('button'); switchShopTab('maps'); });
    if (shopTabThemes) shopTabThemes.addEventListener('click', () => { playSound('button'); switchShopTab('themes'); });
    if (shopTabTrails) shopTabTrails.addEventListener('click', () => { playSound('button'); switchShopTab('trails'); });

    const custAccSubtabHats = document.getElementById('cust-acc-subtab-hats');
    const custAccSubtabGlasses = document.getElementById('cust-acc-subtab-glasses');
    const shopAccSubtabHats = document.getElementById('shop-acc-subtab-hats');
    const shopAccSubtabGlasses = document.getElementById('shop-acc-subtab-glasses');

    if (custAccSubtabHats) custAccSubtabHats.addEventListener('click', () => { playSound('button'); setAccessorySubTab('cust', 'hats'); });
    if (custAccSubtabGlasses) custAccSubtabGlasses.addEventListener('click', () => { playSound('button'); setAccessorySubTab('cust', 'glasses'); });
    if (shopAccSubtabHats) shopAccSubtabHats.addEventListener('click', () => { playSound('button'); setAccessorySubTab('shop', 'hats'); });
    if (shopAccSubtabGlasses) shopAccSubtabGlasses.addEventListener('click', () => { playSound('button'); setAccessorySubTab('shop', 'glasses'); });



    const collectionBtn = document.getElementById('collection-btn');
    const collectionModal = document.getElementById('collection-modal');
    const closeCollectionBtn = document.getElementById('close-collection-btn');

    if (collectionBtn) {
        collectionBtn.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            renderCollectionGrid();
            if (collectionModal) collectionModal.classList.remove('hidden');
        });
    }

    if (closeCollectionBtn) {
        closeCollectionBtn.addEventListener('click', () => {
            playSound('button');
            if (collectionModal) collectionModal.classList.add('hidden');
        });
    }

    if (customizeBtn) {
        customizeBtn.addEventListener('click', () => {
            openCustomizeModal('skins');
        });
    }

    if (closeCustomizeBtn) {
        closeCustomizeBtn.addEventListener('click', () => {
            playSound('button');
            if (customizeModal) customizeModal.classList.add('hidden');
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            openCustomizeModal('themes');
        });
    }

    if (howToBtn) {
        howToBtn.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            if (howToModal) howToModal.classList.remove('hidden');
        });
    }

    if (closeHowToBtn) {
        closeHowToBtn.addEventListener('click', () => {
            playSound('button');
            if (howToModal) howToModal.classList.add('hidden');
        });
    }

    // Modal listeners
    const cancelPurchaseBtn = document.getElementById('cancel-purchase-btn');
    const confirmPurchaseBtn = document.getElementById('confirm-purchase-btn');
    const closeAlertBtn = document.getElementById('close-alert-btn');

    if (cancelPurchaseBtn) cancelPurchaseBtn.addEventListener('click', () => { playSound('button'); closePurchaseConfirm(); });
    if (confirmPurchaseBtn) confirmPurchaseBtn.addEventListener('click', () => { executePurchase(); });
    if (closeAlertBtn) closeAlertBtn.addEventListener('click', () => { playSound('button'); closeAlertModal(); });

    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
    if (resumeBtn) resumeBtn.addEventListener('click', togglePause);
    if (restartPauseBtn) restartPauseBtn.addEventListener('click', startGame);
    if (menuPauseBtn) menuPauseBtn.addEventListener('click', showMainMenu);

    if (playAgainBtn) playAgainBtn.addEventListener('click', startGame);
    if (mainMenuBtn) mainMenuBtn.addEventListener('click', showMainMenu);

    // Unified Goals & Achievements Modal Listeners
    const goalsBtn = document.getElementById('goals-btn');
    const goalsModal = document.getElementById('goals-modal');
    const closeGoalsBtn = document.getElementById('close-goals-btn');
    const goalsTabMissions = document.getElementById('goals-tab-missions');
    const goalsTabAchievements = document.getElementById('goals-tab-achievements');
    const goalsContentMissions = document.getElementById('goals-content-missions');
    const goalsContentAchievements = document.getElementById('goals-content-achievements');
    const achCatTabs = document.getElementById('ach-category-tabs');

    if (goalsBtn) {
        goalsBtn.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            renderMissionsList();
            renderAchievementsList();
            const goalsCard = goalsModal ? goalsModal.querySelector('.modal-large-card') : null;
            if (goalsCard) goalsCard.scrollTop = 0;
            const mList = document.getElementById('missions-list');
            if (mList) mList.scrollTop = 0;
            const aList = document.getElementById('achievements-list');
            if (aList) aList.scrollTop = 0;
            if (goalsModal) goalsModal.classList.remove('hidden');
        });
    }

    if (closeGoalsBtn) {
        closeGoalsBtn.addEventListener('click', () => {
            playSound('button');
            if (goalsModal) goalsModal.classList.add('hidden');
        });
    }

    if (goalsTabMissions && goalsTabAchievements) {
        goalsTabMissions.addEventListener('click', () => {
            playSound('button');
            goalsTabMissions.classList.add('active');
            goalsTabAchievements.classList.remove('active');
            if (goalsContentMissions) {
                goalsContentMissions.classList.remove('hidden');
                goalsContentMissions.classList.add('active');
                goalsContentMissions.scrollTop = 0;
            }
            if (goalsContentAchievements) {
                goalsContentAchievements.classList.add('hidden');
                goalsContentAchievements.classList.remove('active');
            }
            const mList = document.getElementById('missions-list');
            if (mList) mList.scrollTop = 0;
            renderMissionsList();
        });

        goalsTabAchievements.addEventListener('click', () => {
            playSound('button');
            goalsTabAchievements.classList.add('active');
            goalsTabMissions.classList.remove('active');
            if (goalsContentAchievements) {
                goalsContentAchievements.classList.remove('hidden');
                goalsContentAchievements.classList.add('active');
                goalsContentAchievements.scrollTop = 0;
            }
            if (goalsContentMissions) {
                goalsContentMissions.classList.add('hidden');
                goalsContentMissions.classList.remove('active');
            }
            const aList = document.getElementById('achievements-list');
            if (aList) aList.scrollTop = 0;
            renderAchievementsList();
        });
    }

    if (achCatTabs) {
        achCatTabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.cat-tab-btn');
            if (btn) {
                playSound('button');
                const cat = btn.getAttribute('data-cat');
                selectedAchCategory = cat;
                const allCatBtns = achCatTabs.querySelectorAll('.cat-tab-btn');
                allCatBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const aList = document.getElementById('achievements-list');
                if (aList) aList.scrollTop = 0;
                renderAchievementsList();
            }
        });
    }

    const missionTabDaily = document.getElementById('mission-tab-daily');
    const missionTabWeekly = document.getElementById('mission-tab-weekly');

    if (missionTabDaily) {
        missionTabDaily.addEventListener('click', () => {
            playSound('button');
            activeMissionTab = 'daily';
            missionTabDaily.classList.add('active');
            if (missionTabWeekly) missionTabWeekly.classList.remove('active');
            const mList = document.getElementById('missions-list');
            if (mList) mList.scrollTop = 0;
            renderMissionsList();
        });
    }

    if (missionTabWeekly) {
        missionTabWeekly.addEventListener('click', () => {
            playSound('button');
            activeMissionTab = 'weekly';
            missionTabWeekly.classList.add('active');
            if (missionTabDaily) missionTabDaily.classList.remove('active');
            const mList = document.getElementById('missions-list');
            if (mList) mList.scrollTop = 0;
            renderMissionsList();
        });
    }

    // GAME MODES & MAPS MODAL CONTROLLER
    let currentModesModalTab = 'modes';
    function switchModesModalTab(tab) {
        currentModesModalTab = tab || 'modes';
        const tabModesBtn = document.getElementById('modes-tab-modes');
        const tabMapsBtn = document.getElementById('modes-tab-maps');
        const contentModes = document.getElementById('modes-content-modes');
        const contentMaps = document.getElementById('modes-content-maps');

        if (tabModesBtn) tabModesBtn.classList.toggle('active', currentModesModalTab === 'modes');
        if (tabMapsBtn) tabMapsBtn.classList.toggle('active', currentModesModalTab === 'maps');

        if (contentModes) {
            if (currentModesModalTab === 'modes') {
                contentModes.classList.remove('hidden');
                contentModes.classList.add('active');
            } else {
                contentModes.classList.add('hidden');
                contentModes.classList.remove('active');
            }
        }

        if (contentMaps) {
            if (currentModesModalTab === 'maps') {
                contentMaps.classList.remove('hidden');
                contentMaps.classList.add('active');
            } else {
                contentMaps.classList.add('hidden');
                contentMaps.classList.remove('active');
            }
        }

        if (currentModesModalTab === 'modes') {
            renderModesGrid();
        } else if (currentModesModalTab === 'maps') {
            renderMapsGrid('modes-maps-grid');
        }
    }

    const modesTabModes = document.getElementById('modes-tab-modes');
    const modesTabMaps = document.getElementById('modes-tab-maps');

    if (modesTabModes) {
        modesTabModes.addEventListener('click', () => {
            playSound('button');
            switchModesModalTab('modes');
        });
    }

    if (modesTabMaps) {
        modesTabMaps.addEventListener('click', () => {
            playSound('button');
            switchModesModalTab('maps');
        });
    }

    function renderModesGrid() {
        const modesGrid = document.getElementById('modes-grid');
        if (!modesGrid) return;

        modesGrid.innerHTML = '';
        const selectedId = GameModeManager.getSelectedModeId();

        Object.values(GAME_MODES).forEach(mode => {
            const isSelected = (selectedId === mode.id);
            const bestScore = GameModeManager.getBestScore(mode.id);
            const bestTime = GameModeManager.getBestTime(mode.id);

            const card = document.createElement('div');
            card.className = `mode-card ${isSelected ? 'active' : ''}`;

            let extraBestText = `👑 Rekor: ${bestScore}`;
            if (mode.id === 'survival' && bestTime > 0) {
                const min = String(Math.floor(bestTime / 60)).padStart(2, '0');
                const sec = String(bestTime % 60).padStart(2, '0');
                extraBestText += ` | 🔥 Süre: ${min}:${sec}`;
            }

            const iconHtml = mode.icon.endsWith('.svg') ? 
                `<img src="${mode.icon}" class="mode-card-icon-img" alt="${mode.name}">` : 
                `<span class="mode-card-icon">${mode.icon}</span>`;

            card.innerHTML = `
                <div class="mode-card-header">
                    <div class="mode-card-title-box">
                        ${iconHtml}
                        <span class="mode-card-title">${mode.name}</span>
                    </div>
                    <span class="mode-card-diff ${mode.diffClass}">${mode.difficulty}</span>
                </div>
                <div class="mode-card-desc">${mode.desc}</div>
                <div class="mode-card-rules">📌 ${mode.rules}</div>
                <div class="mode-card-footer">
                    <span class="mode-card-best">${extraBestText}</span>
                    <button class="mode-select-btn ${isSelected ? 'btn-active' : 'btn-normal'}">
                        ${isSelected ? 'SEÇİLDİ' : 'SEÇ'}
                    </button>
                </div>
            `;

            card.addEventListener('click', () => {
                playSound('button');
                GameModeManager.selectMode(mode.id);
                renderModesGrid();
            });

            modesGrid.appendChild(card);
        });
    }

    const modesBtn = document.getElementById('modes-btn');
    const modesModal = document.getElementById('modes-modal');
    const closeModesBtn = document.getElementById('close-modes-btn');
    const activeModePill = document.getElementById('menu-active-mode-pill');

    if (modesBtn) {
        modesBtn.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            switchModesModalTab(currentModesModalTab);
            if (modesModal) modesModal.classList.remove('hidden');
        });
    }

    if (activeModePill) {
        activeModePill.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            switchModesModalTab(currentModesModalTab);
            if (modesModal) modesModal.classList.remove('hidden');
        });
    }

    if (closeModesBtn) {
        closeModesBtn.addEventListener('click', () => {
            playSound('button');
            if (modesModal) modesModal.classList.add('hidden');
        });
    }

    // Level & XP Modal Listeners
    const menuLevelCard = document.getElementById('menu-level-card');
    const levelRewardsBtn = document.getElementById('level-rewards-btn');
    const levelRewardsModal = document.getElementById('level-rewards-modal');
    const closeLevelRewardsBtn = document.getElementById('close-level-rewards-btn');
    const closeLvlUpBtn = document.getElementById('close-lvlUp-btn');
    const levelUpModal = document.getElementById('level-up-modal');

    if (menuLevelCard) {
        menuLevelCard.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            XPUI.renderLevelRewardsModal();
            if (levelRewardsModal) levelRewardsModal.classList.remove('hidden');
        });
    }

    if (levelRewardsBtn) {
        levelRewardsBtn.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            XPUI.renderLevelRewardsModal();
            if (levelRewardsModal) levelRewardsModal.classList.remove('hidden');
        });
    }

    if (closeLevelRewardsBtn) {
        closeLevelRewardsBtn.addEventListener('click', () => {
            playSound('button');
            if (levelRewardsModal) levelRewardsModal.classList.add('hidden');
        });
    }

    if (closeLvlUpBtn) {
        closeLvlUpBtn.addEventListener('click', () => {
            playSound('button');
            if (levelUpModal) levelUpModal.classList.add('hidden');
            if (levelUpPausedGame) {
                levelUpPausedGame = false;
                if (isGameRunning && isPaused) {
                    isPaused = false;
                    if (typeof AudioManager !== 'undefined') AudioManager.resumeMusic();
                    if (typeof PowerUpManager !== 'undefined') PowerUpManager.onResume();
                    lastStepTime = performance.now();
                    if (animFrameId) cancelAnimationFrame(animFrameId);
                    animFrameId = requestAnimationFrame(gameLoop);
                }
            }
        });
    }

    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Handle App Backgrounding & Sleep Mode
    function handleAppBackground() {
        if (typeof AudioManager !== 'undefined') {
            AudioManager.suspendAllAudio();
        }
        if (isGameRunning && !isPaused) {
            togglePause();
        }
    }

    function handleAppForeground() {
        if (typeof AudioManager !== 'undefined') {
            if (!isGameRunning) {
                // In main menu mode: restart/resume menu music
                AudioManager.playMusic('menu_music');
            } else if (!isPaused) {
                AudioManager.resumeAllAudio();
            } else {
                // In paused game: ensure audio context is resumed
                if (AudioManager.audioCtx && AudioManager.audioCtx.state === 'suspended') {
                    AudioManager.audioCtx.resume().catch(() => {});
                }
            }
        }
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            handleAppBackground();
        } else {
            handleAppForeground();
        }
    });

    window.addEventListener('pagehide', () => {
        handleAppBackground();
    });

    // Android Hardware Back Button Handler
    window.handleAndroidBack = function() {
        const modalIds = [
            'name-change-modal', 'settings-modal', 'shop-modal', 'customize-modal', 'goals-modal',
            'modes-modal', 'level-rewards-modal', 'level-up-modal', 'howto-modal',
            'achievements-modal', 'missions-modal', 'purchase-confirm-modal', 'alert-modal',
            'collection-modal', 'accessory-preview-modal', 'accessory-unlock-modal'
        ];

        for (let id of modalIds) {
            const m = document.getElementById(id);
            if (m && !m.classList.contains('hidden')) {
                m.classList.add('hidden');
                return true;
            }
        }

        const gameOverModal = document.getElementById('game-over-modal');
        if (gameOverModal && !gameOverModal.classList.contains('hidden')) {
            showMainMenu();
            return true;
        }

        if (isGameRunning) {
            if (!isPaused) {
                togglePause();
                return true;
            } else {
                showMainMenu();
                return true;
            }
        }

        return false;
    };

    window.addEventListener('resize', resizeCanvas);

    // Initial Setup
    AudioManager.init();
    if (AudioManager.settings.musicEnabled) {
        AudioManager.playMusic('menu_music');
    }

    EffectManager.init();
    applyTheme(selectedTheme);
    updateHighScoreUI();
    resizeCanvas();

    GameModeManager.updateMenuModeDisplay();
    MissionManager.initMissions();
    LevelRewardManager.init();
    XPManager.init();
    XPUI.updateAllUI();
    AchievementManager.checkAchievements();
    updateMenuBadges();
    if (typeof renderAllCosmeticsUI === 'function') {
        renderAllCosmeticsUI();
    }

    // Cyber Neon Splash Overlay Controller (Redesigned)
    const SplashManager = {
        init: function() {
            const overlay = document.getElementById('splash-overlay');
            const progressFill = document.getElementById('splash-progress-fill');
            const percentText = document.getElementById('splash-percent-text');
            const statusText = document.getElementById('splash-status-text');
            const tipText = document.getElementById('splash-tip-text');
            const tipContainer = document.getElementById('splash-tip-container');
            const skipBtn = document.getElementById('splash-skip-btn');
            const canvas = document.getElementById('splash-snake-canvas');

            if (!overlay) return;

            let dismissed = false;
            let animFrameId = null;

            // ----------------------------------------------------
            // 1. DYNAMIC TIPS ROTATOR
            // ----------------------------------------------------
            const GAME_TIPS = [
                'İPUCU: Farklı skinleri ve aksesuarları açarak kendi yılanını oluştur!',
                'İPUCU: Coin kazanmak için daha fazla yem topla!',
                'İPUCU: Görevleri tamamlayarak özel ödüller kazan!',
                'İPUCU: Farklı haritaları ve oyun modlarını keşfet!',
                'İPUCU: Mağazadan 2X Coin ve Yavaşlatma güçlendirmelerini satın al!',
                'İPUCU: Yılanını nadir şapkalar ve gözlüklerle özelleştir!',
                'İPUCU: Günlük ödüllerini her gün toplayarak bonus altın kazan!',
                'İPUCU: Yeni başarımların kilidini aç ve XP kazanarak seviyeni yükselt!'
            ];

            let tipIndex = 0;
            const rotateTip = () => {
                if (dismissed || !tipText || !tipContainer) return;
                tipContainer.style.opacity = '0.2';
                tipContainer.style.transform = 'translateY(4px)';
                setTimeout(() => {
                    tipIndex = (tipIndex + 1) % GAME_TIPS.length;
                    tipText.textContent = GAME_TIPS[tipIndex];
                    tipContainer.style.opacity = '1';
                    tipContainer.style.transform = 'translateY(0)';
                }, 250);
            };

            const tipInterval = setInterval(rotateTip, 2600);

            // ----------------------------------------------------
            // 2. CANVAS 2D SEGMENTED SNAKE & AMBIENT PARTICLES
            // ----------------------------------------------------
            let ctx = null;
            let width = 0;
            let height = 0;

            const resizeCanvas = () => {
                if (!canvas) return;
                width = overlay.clientWidth || window.innerWidth;
                height = overlay.clientHeight || window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            };

            if (canvas) {
                ctx = canvas.getContext('2d');
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
            }

            // Ambient Dust Particles
            const particles = [];
            const numParticles = 28;
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * (width || 360),
                    y: Math.random() * (height || 640),
                    radius: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: -Math.random() * 0.6 - 0.2,
                    alpha: Math.random() * 0.6 + 0.2,
                    color: ['#00f3ff', '#00ff88', '#d946ef', '#38bdf8', '#ffd700'][Math.floor(Math.random() * 5)]
                });
            }

            // Segmented 2D Snake State
            const numSegments = 16;
            const segSize = 18;
            const snakeHistory = [];
            for (let i = 0; i < numSegments * 6; i++) {
                snakeHistory.push({ x: (width || 360) / 2, y: (height || 640) / 2 });
            }

            const trailParticles = [];
            let time = 0;

            function renderCanvasAnimation() {
                if (dismissed || !ctx) return;

                ctx.clearRect(0, 0, width, height);
                time += 0.025;

                // Render Floating Ambient Particles
                for (let p of particles) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha += Math.sin(time * 3 + p.x) * 0.01;

                    if (p.y < -10) {
                        p.y = height + 10;
                        p.x = Math.random() * width;
                    }
                    if (p.x < -10) p.x = width + 10;
                    if (p.x > width + 10) p.x = -10;

                    ctx.save();
                    ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = p.color;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }

                // Calculate Smooth Figure-8 / Wave Path for Snake Head (Positioned top-center)
                const cx = width / 2;
                const cy = height * 0.18;
                const rx = Math.min(width * 0.36, 135);
                const ry = Math.min(height * 0.12, 65);

                const headX = cx + Math.sin(time) * rx;
                const headY = cy + Math.sin(time * 2) * ry;

                snakeHistory.unshift({ x: headX, y: headY });
                if (snakeHistory.length > numSegments * 6) {
                    snakeHistory.pop();
                }

                // Spawn Snake Trail Particles
                if (Math.random() < 0.6) {
                    trailParticles.push({
                        x: headX + (Math.random() - 0.5) * 8,
                        y: headY + (Math.random() - 0.5) * 8,
                        radius: Math.random() * 3 + 2,
                        alpha: 0.7,
                        color: '#00f3ff'
                    });
                }

                // Render Trail Particles
                for (let i = trailParticles.length - 1; i >= 0; i--) {
                    const tp = trailParticles[i];
                    tp.alpha -= 0.03;
                    tp.radius *= 0.95;
                    if (tp.alpha <= 0) {
                        trailParticles.splice(i, 1);
                        continue;
                    }
                    ctx.save();
                    ctx.globalAlpha = tp.alpha;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = tp.color;
                    ctx.fillStyle = tp.color;
                    ctx.beginPath();
                    ctx.arc(tp.x, tp.y, Math.max(0.5, tp.radius), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }

                // Render 2D Segmented Snake (Body then Head)
                const segColors = ['#00f3ff', '#00ff88', '#38bdf8', '#a855f7', '#d946ef', '#ffd700'];

                for (let i = numSegments - 1; i >= 0; i--) {
                    const histIndex = i * 5;
                    const pos = snakeHistory[Math.min(histIndex, snakeHistory.length - 1)];
                    if (!pos) continue;

                    const color = segColors[i % segColors.length];
                    const size = i === 0 ? segSize * 1.15 : segSize * (1 - i * 0.025);

                    ctx.save();
                    ctx.shadowBlur = i === 0 ? 16 : 8;
                    ctx.shadowColor = color;
                    ctx.fillStyle = color;

                    // Draw 2D Rounded Square Segment
                    const sx = pos.x - size / 2;
                    const sy = pos.y - size / 2;
                    const radius = i === 0 ? 6 : 4;

                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(sx, sy, size, size, radius);
                    } else {
                        ctx.rect(sx, sy, size, size);
                    }
                    ctx.fill();

                    // Inner Glow Core for Body
                    ctx.fillStyle = '#ffffff';
                    ctx.globalAlpha = 0.4;
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, size * 0.22, 0, Math.PI * 2);
                    ctx.fill();

                    // Render Snake Eyes on Head Segment
                    if (i === 0 && snakeHistory.length > 2) {
                        const prevPos = snakeHistory[2];
                        const dx = pos.x - prevPos.x;
                        const dy = pos.y - prevPos.y;
                        const angle = Math.atan2(dy, dx);

                        ctx.globalAlpha = 1.0;
                        ctx.fillStyle = '#ffffff';

                        const eyeOffset = size * 0.35;
                        const eyeRadius = size * 0.18;

                        const eye1X = pos.x + Math.cos(angle - 0.6) * eyeOffset;
                        const eye1Y = pos.y + Math.sin(angle - 0.6) * eyeOffset;
                        const eye2X = pos.x + Math.cos(angle + 0.6) * eyeOffset;
                        const eye2Y = pos.y + Math.sin(angle + 0.6) * eyeOffset;

                        ctx.beginPath(); ctx.arc(eye1X, eye1Y, eyeRadius, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(eye2X, eye2Y, eyeRadius, 0, Math.PI * 2); ctx.fill();

                        ctx.fillStyle = '#050509';
                        ctx.beginPath(); ctx.arc(eye1X, eye1Y, eyeRadius * 0.5, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(eye2X, eye2Y, eyeRadius * 0.5, 0, Math.PI * 2); ctx.fill();
                    }

                    ctx.restore();
                }

                animFrameId = requestAnimationFrame(renderCanvasAnimation);
            }

            // Start Canvas Loop
            if (ctx) {
                renderCanvasAnimation();
            }

            // ----------------------------------------------------
            // 3. DISMISSAL & PROGRESS
            // ----------------------------------------------------
            const dismissSplash = () => {
                if (dismissed) return;
                dismissed = true;
                clearInterval(tipInterval);
                if (animFrameId) cancelAnimationFrame(animFrameId);

                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    overlay.classList.remove('active');
                    overlay.style.display = 'none';
                }, 500);
            };

            let progress = 0;
            const statuses = [
                '⚡ SİSTEM BAŞLATILIYOR...',
                '🎨 SKİNLER & EFEKTLER...',
                '🔮 GÜÇLENDİRMELER YÜKLENİYOR...',
                '🎮 NEON DÜNYASI HAZIR!'
            ];

            const interval = setInterval(() => {
                if (dismissed) {
                    clearInterval(interval);
                    return;
                }
                progress += 1;
                if (progress >= 100) {
                    progress = 100;
                    if (progressFill) progressFill.style.width = '100%';
                    if (percentText) percentText.textContent = '100%';
                    if (statusText) statusText.textContent = '🎮 NEON DÜNYASI HAZIR!';
                    clearInterval(interval);
                    setTimeout(dismissSplash, 400);
                } else {
                    if (progressFill) progressFill.style.width = progress + '%';
                    if (percentText) percentText.textContent = progress + '%';
                    const statusIdx = Math.min(statuses.length - 1, Math.floor((progress / 100) * statuses.length));
                    if (statusText) statusText.textContent = statuses[statusIdx];
                }
            }, 56);

            if (skipBtn) {
                skipBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dismissSplash();
                });
                skipBtn.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                    dismissSplash();
                }, { passive: true });
            }

            // Safety failsafe at 7s
            setTimeout(dismissSplash, 7000);
        }
    };

    SplashManager.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSnakeGame);
} else {
    initSnakeGame();
}
