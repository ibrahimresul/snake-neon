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
            name: '🟢 Klasik Yeşil',
            desc: 'Sade nostaljik yeşil yılan',
            price: 0,
            unlocked: true,
            unlockScore: 0,
            headColor: '#00ff88',
            bodyColor: 'rgba(0, 204, 102, 0.85)',
            bodyColors: ['#00ff88', '#00cc66', '#00994d'],
            glowColor: '#00ff88',
            foodColor: '#ff3366',
            foodGlow: '#ff3366',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#ffd700',
            particleColors: ['#00ff88', '#00cc66', '#ff3366']
        },
        neon: {
            id: 'neon',
            name: '⚡ Cyber Neon',
            desc: 'Parlak neon cyan ve mavi glow',
            price: 0,
            unlocked: true,
            unlockScore: 0,
            headColor: '#00f3ff',
            bodyColor: 'rgba(0, 180, 255, 0.85)',
            bodyColors: ['#00f3ff', '#0099ff', '#0066ff'],
            glowColor: '#00f3ff',
            foodColor: '#ff007f',
            foodGlow: '#ff007f',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#ffd700',
            particleColors: ['#00f3ff', '#0077ff', '#ff007f']
        },
        fire: {
            id: 'fire',
            name: '🔥 Ateş Kırmızısı',
            desc: 'Alev saçan kırmızı ve turuncu',
            price: 250,
            unlocked: false,
            unlockScore: 25,
            headColor: '#ff4500',
            bodyColor: '#ff8c00',
            bodyColors: ['#ff4500', '#ff6600', '#ff8c00', '#ffa500', '#ffd700'],
            glowColor: '#ff4500',
            foodColor: '#ffff00',
            foodGlow: '#ff8c00',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#ff4500',
            particleColors: ['#ff4500', '#ff8c00', '#ffd700', '#ff0000']
        },
        ice: {
            id: 'ice',
            name: '❄️ Buz Mavisi',
            desc: 'Soğuk dondurucu buz mavisi',
            price: 400,
            unlocked: false,
            unlockScore: 45,
            headColor: '#00ffff',
            bodyColor: '#87cefa',
            bodyColors: ['#00ffff', '#87cefa', '#00bfff', '#e0ffff'],
            glowColor: '#00ffff',
            foodColor: '#e0ffff',
            foodGlow: '#00ffff',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#00bfff',
            particleColors: ['#00ffff', '#87cefa', '#e0ffff', '#ffffff']
        },
        cyber: {
            id: 'cyber',
            name: '🔮 Elektrik Mor',
            desc: 'Fütüristik mor ve neon pembe',
            price: 750,
            unlocked: false,
            unlockScore: 70,
            headColor: '#ff00ff',
            bodyColor: '#9400d3',
            bodyColors: ['#ff00ff', '#9400d3', '#ba55d3', '#00ffff'],
            glowColor: '#ff00ff',
            foodColor: '#00ffff',
            foodGlow: '#ff00ff',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#00ffff',
            particleColors: ['#ff00ff', '#9400d3', '#00ffff']
        },
        gold: {
            id: 'gold',
            name: '👑 Saf Altın',
            desc: 'Işıl ışıl 24K saf lüks altın',
            price: 900,
            unlocked: false,
            unlockScore: 90,
            headColor: '#ffd700',
            bodyColor: '#ffaa00',
            bodyColors: ['#ffd700', '#ffaa00', '#ffe066', '#d4af37'],
            glowColor: '#ffd700',
            foodColor: '#ffffff',
            foodGlow: '#ffd700',
            specialFoodColor: '#00f3ff',
            specialFoodGlow: '#ffffff',
            particleColors: ['#ffd700', '#ffaa00', '#ffffff', '#fff8dc']
        },
        poison: {
            id: 'poison',
            name: '☣️ Zehirli Toksit',
            desc: 'Tehlikeli fosforlu mor-yeşil',
            price: 1000,
            unlocked: false,
            unlockScore: 120,
            headColor: '#39ff14',
            bodyColor: '#a855f7',
            bodyColors: ['#39ff14', '#a855f7', '#22c55e', '#9333ea'],
            glowColor: '#39ff14',
            foodColor: '#ff0055',
            foodGlow: '#39ff14',
            specialFoodColor: '#ffff00',
            specialFoodGlow: '#39ff14',
            particleColors: ['#39ff14', '#a855f7', '#22c55e', '#ff0055']
        },
        rainbow: {
            id: 'rainbow',
            name: '🌈 Spektrum Gökkuşağı',
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
            name: '🌌 Galaksi Uzay',
            desc: 'Kozmik uzay ve yıldızlar',
            price: 1500,
            unlocked: false,
            unlockScore: 180,
            headColor: '#ffffff',
            bodyColor: '#6366f1',
            bodyColors: ['#ffffff', '#6366f1', '#8b5cf6', '#ec4899', '#3b82f6'],
            glowColor: '#8b5cf6',
            foodColor: '#00ffff',
            foodGlow: '#ec4899',
            specialFoodColor: '#ffd700',
            specialFoodGlow: '#00ffff',
            particleColors: ['#6366f1', '#8b5cf6', '#ec4899', '#ffffff']
        },
        lava: {
            id: 'lava',
            name: '🌋 Magma Volkan',
            desc: 'Akkor erimiş volkanik lav',
            price: 1800,
            unlocked: false,
            unlockScore: 220,
            headColor: '#ff1e00',
            bodyColor: '#ff4500',
            bodyColors: ['#ff1e00', '#ff4500', '#330000', '#ff8c00'],
            glowColor: '#ff1e00',
            foodColor: '#ffff00',
            foodGlow: '#ff1e00',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#ff4500',
            particleColors: ['#ff1e00', '#ff4500', '#ffaa00', '#222222']
        },
        emerald: {
            id: 'emerald',
            name: '💎 Kristal Zümrüt',
            desc: 'Pırıl pırıl kristal yeşil',
            price: 2000,
            unlocked: false,
            unlockScore: 260,
            headColor: '#00ffaa',
            bodyColor: '#00b377',
            bodyColors: ['#00ffaa', '#00b377', '#00ffcc', '#059669'],
            glowColor: '#00ffaa',
            foodColor: '#ff007f',
            foodGlow: '#00ffaa',
            specialFoodColor: '#ffffff',
            specialFoodGlow: '#00ffcc',
            particleColors: ['#00ffaa', '#00ffcc', '#ffffff', '#00b377']
        },
        shadow: {
            id: 'shadow',
            name: '👤 Karanlık Gölge',
            desc: 'Gizemli hatlara sahip siyah',
            price: 2500,
            unlocked: false,
            unlockScore: 300,
            headColor: '#ffffff',
            bodyColor: '#64748b',
            bodyColors: ['#ffffff', '#94a3b8', '#334155', '#1e293b'],
            glowColor: '#ffffff',
            foodColor: '#ff0033',
            foodGlow: '#ffffff',
            specialFoodColor: '#00f3ff',
            specialFoodGlow: '#ffffff',
            particleColors: ['#ffffff', '#94a3b8', '#334155', '#ff0033']
        }
    };

    // UI THEMES Data
    const THEMES = [
        { id: 'dark', name: '🌙 Koyu Tema', desc: 'Siyah ve koyu mavi modern neon', price: 0 },
        { id: 'light', name: '☀️ Açık Tema', desc: 'Aydınlık ve ferah görünüm', price: 0 },
        { id: 'neon', name: '🔮 Cyber Neon', desc: 'Derin mor ve yüksek parlaklık', price: 500 }
    ];

    // MAPS Configuration Data
    const MAPS = {
        classic: {
            id: 'classic',
            name: '🟩 Klasik Saha',
            desc: 'Klasik engelsiz standart oyun alanı',
            difficulty: 'ZORLUK: KOLAY',
            price: 0,
            unlocked: true,
            bgStyle: 'classic',
            gridColor: 'rgba(255, 255, 255, 0.03)',
            obstacles: []
        },
        desert: {
            id: 'desert',
            name: '🌵 Çöl Arenası',
            desc: 'Sıcak kumlu çöl ve kaya engelleri',
            difficulty: 'ZORLUK: KOLAY',
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
            name: '🌲 Orman Bölgesi',
            desc: 'Doğal ağaç ve çalı engelleri',
            difficulty: 'ZORLUK: ORTA',
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
            name: '🧊 Buz Sektörü',
            desc: 'Buzlu zemin ve dondurucu bloklar',
            difficulty: 'ZORLUK: ORTA',
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
            name: '🏙️ Cyber City',
            desc: 'Neon dijital duvarlar ve fütüristik şehir',
            difficulty: 'ZORLUK: ZOR',
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
            name: '🌀 Labirent Matrisi',
            desc: 'Dar koridorlu akıl dolu labirent',
            difficulty: 'ZORLUK: ZOR',
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
        getCoins() {
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
            if (amount <= 0) return this.getCoins();
            const updated = this.setCoins(this.getCoins() + amount);
            showCoinToast(`+${amount} COIN`, false);
            return updated;
        },
        removeCoins(amount) {
            const current = this.getCoins();
            if (current < amount) return false;
            const updated = this.setCoins(current - amount);
            showCoinToast(`-${amount} COIN`, true);
            return true;
        },
        canAfford(amount) {
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
        }
    };

    // GAME MODES CONFIGURATION
    const GAME_MODES = {
        classic: {
            id: 'classic',
            name: 'Classic',
            icon: '🎮',
            desc: 'Klasik Snake deneyimi. Yem ye, engellerden ve duvarlara çarpmaktan kaçın.',
            difficulty: 'Easy',
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
            name: 'Endless',
            icon: '♾️',
            desc: 'Duvarların içinden geçilebilen sonsuz harita modu.',
            difficulty: 'Easy',
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
            name: 'Time Attack',
            icon: '⏱️',
            desc: '60 saniyelik zaman sınırı! Zamana karşı yarışarak skor yap.',
            difficulty: 'Medium',
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
            name: 'Speed Run',
            icon: '⚡',
            desc: 'Yılan zamanla sürekli hızlanır! Her 10 yem yendiğinde +1 Hız Seviyesi.',
            difficulty: 'Hard',
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
            name: 'Hardcore',
            icon: '💀',
            desc: 'Ultra hızlı ve Power-Up içermeyen acımasız mod. 2x Coin ödülü!',
            difficulty: 'Hardcore',
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
            name: 'Survival',
            icon: '🔥',
            desc: 'Zaman geçtikçe haritada yeni engeller belirir ve hız artar.',
            difficulty: 'Extreme',
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
            name: 'Obstacle',
            icon: '🧱',
            desc: 'Sık ve dar geçitli engellerle dolu haritada hassas sürüş yap.',
            difficulty: 'Hard',
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
                activeModeEl.textContent = `${mode.icon} ${mode.name.toUpperCase()}`;
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
                    PowerUpManager.showToast(`⚡ SPEED LEVEL ${newLevel}!`, '#fde047');
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
            badgeEl.textContent = `${mode.icon} ${mode.name.toUpperCase()} • ${currentMap.name}`;

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
            name: 'Shield',
            icon: '🛡️',
            desc: 'Bir çarpışmadan kurtul.',
            color: '#3b82f6',
            glow: '#60a5fa',
            duration: null,
            weight: 15
        },
        speed_boost: {
            id: 'speed_boost',
            name: 'Speed Boost',
            icon: '⚡',
            desc: 'Yılanı geçici olarak hızlandır.',
            color: '#eab308',
            glow: '#fde047',
            duration: 5,
            weight: 15
        },
        slow_motion: {
            id: 'slow_motion',
            name: 'Slow Motion',
            icon: '🐌',
            desc: 'Oyunu geçici olarak yavaşlat.',
            color: '#a855f7',
            glow: '#c084fc',
            duration: 5,
            weight: 15
        },
        magnet: {
            id: 'magnet',
            name: 'Magnet',
            icon: '🧲',
            desc: 'Yakındaki yemleri otomatik olarak çek.',
            color: '#ef4444',
            glow: '#f87171',
            duration: 7,
            weight: 15
        },
        mega_food: {
            id: 'mega_food',
            name: 'Mega Food',
            icon: '🍎',
            desc: 'Yılanı bir anda büyüt.',
            color: '#22c55e',
            glow: '#4ade80',
            duration: 0,
            weight: 15
        },
        double_coin: {
            id: 'double_coin',
            name: '2X Coins',
            icon: '💎',
            desc: 'Geçici olarak 2x Coin kazan.',
            color: '#00f3ff',
            glow: '#67e8f9',
            duration: 10,
            weight: 15
        },
        ghost: {
            id: 'ghost',
            name: 'Ghost',
            icon: '👻',
            desc: 'Kısa süre engellerin içinden geç.',
            color: '#e2e8f0',
            glow: '#ffffff',
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

            let attempts = 0;
            while (!valid && attempts < 500) {
                attempts++;
                newX = Math.floor(Math.random() * GRID_SIZE);
                newY = Math.floor(Math.random() * GRID_SIZE);

                const isOnSnake = snake.some(segment => segment.x === newX && segment.y === newY);
                const isOnObstacle = obstacles.some(obs => obs.x === newX && obs.y === newY);
                const isOnFood = (food.x === newX && food.y === newY);

                valid = !isOnSnake && !isOnObstacle && !isOnFood;
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
                this.showToast(`🛡️ SHIELD ACTIVATED!`, p.color);
                playSound('powerup-collect');
            } else if (type === 'mega_food') {
                const lastSeg = snake[snake.length - 1] || { x: 0, y: 0 };
                for (let i = 0; i < 5; i++) {
                    snake.push({ ...lastSeg });
                }
                score += 50;
                if (currentScoreEl) currentScoreEl.textContent = score;

                const is2X = this.isEffectActive('double_coin');
                const coinsEarned = 5 * (is2X ? 2 : 1);
                CoinManager.addCoins(coinsEarned);

                PlayerStats.recordScoreUpdate(score);

                if (px !== null && py !== null) {
                    createParticles(px, py, p.color);
                } else if (snake.length > 0) {
                    createParticles(snake[0].x, snake[0].y, p.color);
                }

                this.showToast(`🍎 MEGA FOOD! +50 SKOR +${coinsEarned} COIN`, p.color);
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

                this.showToast(`${p.icon} ${p.name.toUpperCase()} ACTIVATED!`, p.color);
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
            this.showToast(`🛡️ SHIELD USED!`, '#3b82f6');
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
        5: { type: 'theme', value: 'sunset', label: '🎨 Sunset Tema', altCoins: 200 },
        6: { type: 'coins', value: 100, label: '+100 Coin' },
        7: { type: 'coins', value: 100, label: '+100 Coin' },
        8: { type: 'coins', value: 150, label: '+150 Coin (Power-Up Paket)' },
        9: { type: 'coins', value: 150, label: '+150 Coin' },
        10: { type: 'skin', value: 'golden', label: '🐍 Altın Yılan Skin', altCoins: 300 },
        12: { type: 'coins', value: 200, label: '+200 Coin' },
        15: { type: 'map', value: 'forest', label: '🗺️ Orman Haritası', altCoins: 400 },
        18: { type: 'coins', value: 250, label: '+250 Coin' },
        20: { type: 'theme', value: 'cyber', label: '🎨 Siber Tema', altCoins: 350 },
        22: { type: 'coins', value: 300, label: '+300 Coin' },
        25: { type: 'skin', value: 'galaxy', label: '🐍 Galaksi Yılan Skin', altCoins: 500 },
        30: { type: 'map', value: 'ice', label: '🗺️ Buzul Haritası', altCoins: 500 },
        35: { type: 'coins', value: 400, label: '+400 Coin' },
        40: { type: 'skin', value: 'robot', label: '🐍 Robot Yılan Skin', altCoins: 600 },
        45: { type: 'coins', value: 500, label: '+500 Coin' },
        50: { type: 'skin', value: 'dragon', label: '👑 Ejderha Skin', altCoins: 1000 },
        60: { type: 'coins', value: 750, label: '+750 Coin' },
        70: { type: 'map', value: 'cybercity', label: '🗺️ Siber Şehir Haritası', altCoins: 800 },
        75: { type: 'theme', value: 'galaxy', label: '🔥 Galaksi Tema', altCoins: 1000 },
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
                    InventoryManager.unlockSkin(reward.value);
                }
            } else if (reward.type === 'theme') {
                if (InventoryManager.isThemeOwned(reward.value)) {
                    const alt = reward.altCoins || 200;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Tema Zaten Var)`;
                } else {
                    InventoryManager.unlockTheme(reward.value);
                }
            } else if (reward.type === 'map') {
                if (InventoryManager.isMapOwned(reward.value)) {
                    const alt = reward.altCoins || 200;
                    CoinManager.addCoins(alt);
                    grantedText = `+${alt} Coin (Harita Zaten Var)`;
                } else {
                    InventoryManager.unlockMap(reward.value);
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
            const stats = XPManager.getLevelXPStats();
            const title = XPManager.getCurrentTitle();

            const menuLvlTitle = document.getElementById('menu-level-title');
            const menuLvlNum = document.getElementById('menu-level-num');
            const menuXpFill = document.getElementById('menu-xp-bar-fill');
            const menuXpProg = document.getElementById('menu-xp-progress');
            const menuXpPct = document.getElementById('menu-xp-percent');

            if (menuLvlTitle) menuLvlTitle.textContent = title;
            if (menuLvlNum) menuLvlNum.textContent = stats.isMax ? 'LVL 100 (MAX)' : `LVL ${stats.level}`;
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
                { id: 'w_score_500', title: '500 Skor Yap', desc: 'Herhangi bir oyunda 500 skora ulaş.', target: 500, reward: 300, type: 'score' }
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
                return JSON.parse(localStorage.getItem(this.WEEKLY_KEY)) || [];
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

        const summaryBadge = document.getElementById('achievements-summary-badge');
        const overallPercentEl = document.getElementById('ach-overall-percent');
        const overallFillEl = document.getElementById('ach-overall-fill');

        if (summaryBadge) summaryBadge.textContent = `${unlocked} / ${total} (%${percent})`;
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

        const filtered = ACHIEVEMENTS.filter(ach => {
            if (selectedAchCategory === 'all') return true;
            return ach.category === selectedAchCategory;
        });

        filtered.forEach(ach => {
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
        const coins = CoinManager.getCoins();
        const headerCoinsEl = document.getElementById('header-coins');
        const menuCoinsEl = document.getElementById('menu-coins');
        const shopCoinsEl = document.getElementById('shop-coins-val');

        if (headerCoinsEl) headerCoinsEl.textContent = coins;
        if (menuCoinsEl) menuCoinsEl.textContent = coins;
        if (shopCoinsEl) shopCoinsEl.textContent = coins;
    }

    let toastTimeout = null;
    function showCoinToast(text, isSpend = false) {
        const toastEl = document.getElementById('coin-toast');
        if (!toastEl) return;

        toastEl.textContent = text;
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
    let food = { x: 15, y: 10, isSpecial: false };
    let particles = [];
    let score = 0;
    let highScore = localStorage.getItem('snake_high_score') ? parseInt(localStorage.getItem('snake_high_score'), 10) : 0;
    let gameCoinsEarnedFromFood = 0;
    
    let isGameRunning = false;
    let isPaused = false;
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
            const saved = localStorage.getItem('snake_audio_settings');
            if (saved) {
                try {
                    const settings = JSON.parse(saved);
                    if (typeof settings.vibrationEnabled === 'boolean') {
                        this.enabled = settings.vibrationEnabled;
                    }
                } catch(e) {}
            } else {
                this.enabled = ("vibrate" in navigator);
            }
        },
        isEnabled() {
            return this.enabled && ("vibrate" in navigator);
        },
        setEnabled(val) {
            this.enabled = !!val;
            if (typeof AudioManager !== 'undefined' && AudioManager.saveSettings) {
                AudioManager.saveSettings();
            }
        },
        vibrate(pattern) {
            if (!this.enabled || !("vibrate" in navigator)) return;
            try {
                navigator.vibrate(pattern);
            } catch(e) {}
        },
        light() { this.vibrate(15); },
        medium() { this.vibrate(35); },
        heavy() { this.vibrate(70); },
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
                this.getAudioContext();
                if (this.settings.musicEnabled && !this.currentMusicId) {
                    this.playMusic('menu_music');
                }
                document.removeEventListener('click', unlock);
                document.removeEventListener('touchstart', unlock);
                document.removeEventListener('keydown', unlock);
            };
            document.addEventListener('click', unlock, { passive: true });
            document.addEventListener('touchstart', unlock, { passive: true });
            document.addEventListener('keydown', unlock, { passive: true });
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

            const cfg = SOUND_CONFIG[soundId];
            if (cfg && cfg.src) {
                try {
                    if (!this.audioElements[soundId]) {
                        const a = new Audio(cfg.src);
                        a.preload = 'auto';
                        this.audioElements[soundId] = a;
                    }
                    const audio = this.audioElements[soundId];
                    audio.volume = Math.min(1, Math.max(0, finalVol));
                    audio.currentTime = 0;
                    const p = audio.play();
                    if (p !== undefined) {
                        p.catch(() => {
                            this.playSynthesizedSound(soundId, finalVol);
                        });
                    }
                } catch(e) {
                    this.playSynthesizedSound(soundId, finalVol);
                }
            } else {
                this.playSynthesizedSound(soundId, finalVol);
            }
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
            if (this.currentMusicId === trackId && this.musicAudioElement && !this.musicAudioElement.paused) {
                return;
            }

            this.stopMusic(fade);

            this.currentMusicId = trackId;
            const cfg = MUSIC_CONFIG[trackId] || MUSIC_CONFIG.game_music;
            const targetVol = this.getFinalMusicVolume();

            if (cfg && cfg.src) {
                try {
                    const audio = new Audio(cfg.src);
                    audio.loop = cfg.loop !== false;
                    audio.volume = fade ? 0 : targetVol;
                    this.musicAudioElement = audio;

                    const p = audio.play();
                    if (p !== undefined) {
                        p.then(() => {
                            if (fade) {
                                this.fadeAudio(audio, 0, targetVol, 500);
                            }
                        }).catch(() => {
                            this.startSynthMusicLoop(trackId);
                        });
                    }
                } catch(e) {
                    this.startSynthMusicLoop(trackId);
                }
            } else {
                this.startSynthMusicLoop(trackId);
            }
        },

        fadeAudio(audio, startVol, endVol, durationMs) {
            let startTime = performance.now();
            const step = (now) => {
                let elapsed = now - startTime;
                let progress = Math.min(1, elapsed / durationMs);
                audio.volume = startVol + (endVol - startVol) * progress;
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        },

        startSynthMusicLoop(trackId) {
            if (this.activeSynthMusicTimer) {
                clearInterval(this.activeSynthMusicTimer);
            }
            if (!this.settings.musicEnabled) return;

            this.musicStep = 0;
            const isGameTrack = trackId && (
                trackId.includes('game') ||
                trackId.includes('classic') ||
                trackId.includes('endless') ||
                trackId.includes('speed') ||
                trackId.includes('hardcore') ||
                trackId.includes('survival') ||
                trackId.includes('time_attack') ||
                trackId.includes('obstacle')
            );

            if (isGameTrack) {
                // High-energy, driving arcade synth bass & lead arpeggio
                const bassNotes = [110.00, 110.00, 130.81, 130.81, 146.83, 146.83, 164.81, 164.81]; // A2, C3, D3, E3
                const leadNotes = [
                    220.00, 329.63, 440.00, 523.25, 659.25, 523.25, 440.00, 329.63,
                    261.63, 392.00, 523.25, 659.25, 783.99, 659.25, 523.25, 392.00,
                    293.66, 440.00, 587.33, 698.46, 880.00, 698.46, 587.33, 440.00,
                    329.63, 493.88, 659.25, 783.99, 987.77, 783.99, 659.25, 493.88
                ];

                const tempoMs = (trackId === 'speed_music' || trackId === 'hardcore_music') ? 120 : 140;

                this.activeSynthMusicTimer = setInterval(() => {
                    if (!this.settings.musicEnabled || !this.currentMusicId) {
                        clearInterval(this.activeSynthMusicTimer);
                        return;
                    }
                    const vol = this.getFinalMusicVolume();
                    if (vol <= 0) return;

                    const ctx = this.getAudioContext();
                    if (!ctx) return;

                    const now = ctx.currentTime;

                    // 1. Driving Bass Pulse
                    try {
                        const bassOsc = ctx.createOscillator();
                        const bassGain = ctx.createGain();
                        bassOsc.type = 'sawtooth';
                        const bassFreq = bassNotes[Math.floor(this.musicStep / 2) % bassNotes.length];
                        bassOsc.frequency.setValueAtTime(bassFreq, now);
                        bassGain.gain.setValueAtTime(vol * 0.16, now);
                        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
                        bassOsc.connect(bassGain);
                        bassGain.connect(ctx.destination);
                        bassOsc.start(now);
                        bassOsc.stop(now + 0.11);

                        // 2. Energetic Lead Arpeggio
                        const leadOsc = ctx.createOscillator();
                        const leadGain = ctx.createGain();
                        leadOsc.type = 'square';
                        const leadFreq = leadNotes[this.musicStep % leadNotes.length];
                        leadOsc.frequency.setValueAtTime(leadFreq, now);
                        leadGain.gain.setValueAtTime(vol * 0.1, now);
                        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                        leadOsc.connect(leadGain);
                        leadGain.connect(ctx.destination);
                        leadOsc.start(now);
                        leadOsc.stop(now + 0.09);

                        // 3. Arcade Rhythm Percussion
                        if (this.musicStep % 2 === 1) {
                            const noiseGain = ctx.createGain();
                            const noiseOsc = ctx.createOscillator();
                            noiseOsc.type = 'triangle';
                            noiseOsc.frequency.setValueAtTime(2500 + (Math.random() * 1500), now);
                            noiseGain.gain.setValueAtTime(vol * 0.04, now);
                            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                            noiseOsc.connect(noiseGain);
                            noiseGain.connect(ctx.destination);
                            noiseOsc.start(now);
                            noiseOsc.stop(now + 0.03);
                        }
                    } catch(e) {}

                    this.musicStep++;
                }, tempoMs);
            } else {
                // Calm Menu Ambient Music
                const menuNotes = [261.63, 329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 329.63];
                this.activeSynthMusicTimer = setInterval(() => {
                    if (!this.settings.musicEnabled || !this.currentMusicId) {
                        clearInterval(this.activeSynthMusicTimer);
                        return;
                    }
                    const vol = this.getFinalMusicVolume() * 0.15;
                    if (vol <= 0) return;

                    const ctx = this.getAudioContext();
                    if (!ctx) return;

                    const now = ctx.currentTime;
                    try {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();

                        osc.type = 'triangle';
                        const freq = menuNotes[this.musicStep % menuNotes.length];
                        osc.frequency.setValueAtTime(freq, now);

                        gain.gain.setValueAtTime(vol, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

                        osc.connect(gain);
                        gain.connect(ctx.destination);

                        osc.start(now);
                        osc.stop(now + 0.3);
                    } catch(e) {}

                    this.musicStep++;
                }, 320);
            }
        },

        // 3. stopMusic
        stopMusic(fade = true) {
            if (this.activeSynthMusicTimer) {
                clearInterval(this.activeSynthMusicTimer);
                this.activeSynthMusicTimer = null;
            }

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

        bindSettingsUI() {
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
                    const enabled = this.toggleMusic();
                    toggleMusicBtn.textContent = enabled ? 'ON' : 'OFF';
                    toggleMusicBtn.classList.toggle('active', enabled);
                    VibrationManager.light();
                });
            }

            if (toggleSfxBtn) {
                toggleSfxBtn.addEventListener('click', () => {
                    const enabled = this.toggleSound();
                    toggleSfxBtn.textContent = enabled ? 'ON' : 'OFF';
                    toggleSfxBtn.classList.toggle('active', enabled);
                    if (enabled) this.playSound('button_click');
                    VibrationManager.light();
                });
            }

            if (toggleVibeBtn) {
                toggleVibeBtn.addEventListener('click', () => {
                    VibrationManager.setEnabled(!VibrationManager.enabled);
                    const enabled = VibrationManager.enabled;
                    toggleVibeBtn.textContent = enabled ? 'ON' : 'OFF';
                    toggleVibeBtn.classList.toggle('active', enabled);
                    if (enabled) VibrationManager.medium();
                });
            }

            this.updateSettingsUI();
        },

        updateSettingsUI() {
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

    // Canvas Resize
    function resizeCanvas() {
        const wrapperWidth = canvasWrapper.clientWidth - 8;
        const wrapperHeight = canvasWrapper.clientHeight - 8;
        const minDim = Math.min(wrapperWidth, wrapperHeight);

        const dpr = window.devicePixelRatio || 1;
        canvasWidth = Math.floor(minDim);
        canvasHeight = Math.floor(minDim);

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
        const startX = Math.floor(GRID_SIZE / 2);
        const startY = Math.floor(GRID_SIZE / 2);

        snake = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];

        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
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

        let attempts = 0;
        while (!valid && attempts < 500) {
            attempts++;
            newX = Math.floor(Math.random() * GRID_SIZE);
            newY = Math.floor(Math.random() * GRID_SIZE);

            const isOnSnake = snake.some(segment => segment.x === newX && segment.y === newY);
            const isOnObstacle = obstacles.some(obs => obs.x === newX && obs.y === newY);

            valid = !isOnSnake && !isOnObstacle;
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
        if (dx !== 0 && direction.x === -dx) return;
        if (dy !== 0 && direction.y === -dy) return;

        nextDirection = { x: dx, y: dy };
    }

    function updateGame() {
        const now = Date.now();
        GameModeManager.update(now);
        PowerUpManager.update(now);
        currentSpeed = GameModeManager.calculateSpeed(baseSpeed);

        direction = { ...nextDirection };

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

        // Power-Up Collection Check
        if (PowerUpManager.boardPowerUp && head.x === PowerUpManager.boardPowerUp.x && head.y === PowerUpManager.boardPowerUp.y) {
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

            if (food.isSpecial) {
                playSound('eat-special');
                const earned = 3 * coinMultiplier;
                gameCoinsEarnedFromFood += earned;
                CoinManager.addCoins(earned);
                if (typeof XPManager !== 'undefined') {
                    XPManager.addXP(XP_CONFIG.FOOD_MEGA, 'food_mega');
                }
            } else {
                playSound('eat');
                const earned = 1 * coinMultiplier;
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

            let bodyCol = currentSkin.bodyColor;
            if (currentSkin.isRainbow) {
                const headHue = (time * 3) % 360;
                const bodyHue = (headHue - i * 15 + 360) % 360;
                bodyCol = `hsl(${bodyHue}, 100%, 50%)`;
            } else if (currentSkin.bodyColors && currentSkin.bodyColors.length > 0) {
                bodyCol = currentSkin.bodyColors[i % currentSkin.bodyColors.length];
            }
            ctx.fillStyle = bodyCol;
            roundRect(ctx, sx + 1.5, sy + 1.5, tileSize - 3, tileSize - 3, 4);
            ctx.fill();
        }

        // Draw Snake Head (with high quality glow)
        if (snake.length > 0) {
            const head = snake[0];
            const sx = head.x * tileSize;
            const sy = head.y * tileSize;

            let headCol = currentSkin.headColor;
            let glowCol = isSpeed ? '#fde047' : currentSkin.glowColor;

            if (currentSkin.isRainbow) {
                const headHue = (time * 3) % 360;
                headCol = `hsl(${headHue}, 100%, 55%)`;
                glowCol = headCol;
            }

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
        }

        ctx.restore();

        drawParticles();
    }

    function gameLoop(timestamp) {
        if (!isGameRunning || isPaused) return;

        if (!lastStepTime) lastStepTime = timestamp;
        const delta = timestamp - lastStepTime;

        if (delta >= currentSpeed) {
            updateGame();
            lastStepTime = timestamp - (delta % currentSpeed);
        }

        updateParticles();
        renderFrame();
        animFrameId = requestAnimationFrame(gameLoop);
    }

    function handleGameOver(reason = 'collision') {
        isGameRunning = false;
        PowerUpManager.reset();

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
        const totalEarnedInGame = Math.floor(rawEarned * modeMultiplier);

        if (baseScoreCoinBonus > 0) {
            const bonusWithMultiplier = Math.floor(baseScoreCoinBonus * modeMultiplier);
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
            const multTag = modeMultiplier > 1 ? ` (${modeMultiplier}x)` : '';
            gameOverEarnedEl.textContent = `+${totalEarnedInGame} COIN${multTag}`;
        }
        if (gameOverEarnedXpEl) {
            gameOverEarnedXpEl.textContent = `+${earnedXP} XP`;
        }
        if (gameOverTotalEl) gameOverTotalEl.textContent = `${CoinManager.getCoins()} COIN`;

        if (newHighScoreBanner) {
            if (reason === 'time_up') {
                newHighScoreBanner.textContent = `⏱️ ZAMAN BİTTİ! (${activeMode.name}: ${score})`;
                newHighScoreBanner.classList.remove('hidden');
            } else if (isNewModeRecord || isNewHighScore) {
                newHighScoreBanner.textContent = `🎉 YENİ REKOR! (${activeMode.icon} ${activeMode.name}: ${score})`;
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
        const tabs = ['skins', 'maps', 'themes'];
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
        else if (tab === 'maps') renderMapsGrid('cust-maps-grid');
        else if (tab === 'themes') renderThemesList('cust-themes-list');
    }

    const custTabSkins = document.getElementById('cust-tab-skins');
    const custTabMaps = document.getElementById('cust-tab-maps');
    const custTabThemes = document.getElementById('cust-tab-themes');

    if (custTabSkins) custTabSkins.addEventListener('click', () => { playSound('button'); switchCustomizeTab('skins'); });
    if (custTabMaps) custTabMaps.addEventListener('click', () => { playSound('button'); switchCustomizeTab('maps'); });
    if (custTabThemes) custTabThemes.addEventListener('click', () => { playSound('button'); switchCustomizeTab('themes'); });

    // Skins Grid Renderer
    function renderSkinsGrid(containerId = 'cust-skins-grid') {
        const skinsGrid = document.getElementById(containerId);
        if (!skinsGrid) return;
        skinsGrid.innerHTML = '';

        Object.values(SKINS).forEach(skin => {
            const owned = InventoryManager.isSkinOwned(skin.id);
            const isEquipped = (selectedSkin === skin.id);

            const card = document.createElement('div');
            card.className = `skin-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked' : ''}`;

            let badgeHtml = '';
            if (isEquipped) {
                badgeHtml = `<div class="status-badge active">SEÇİLDİ</div>`;
            } else if (owned) {
                badgeHtml = `<div class="status-badge owned">KULLAN</div>`;
            } else {
                badgeHtml = `<div class="status-badge buy">${skin.price} COIN SATIN AL</div>`;
            }

            card.innerHTML = `
                <div class="skin-preview-box">
                    <canvas id="preview-${containerId}-${skin.id}" class="skin-preview-canvas" width="120" height="60"></canvas>
                </div>
                <div class="skin-info">
                    <div class="skin-title">${skin.name}</div>
                    <div class="skin-desc">${skin.desc}</div>
                </div>
                ${badgeHtml}
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

        Object.values(MAPS).forEach(map => {
            const owned = InventoryManager.isMapOwned(map.id);
            const isEquipped = (selectedMap === map.id);

            const card = document.createElement('div');
            card.className = `map-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked' : ''}`;

            let badgeHtml = '';
            if (isEquipped) {
                badgeHtml = `<div class="status-badge active" style="margin-top: 2px;">SEÇİLDİ</div>`;
            } else if (owned) {
                badgeHtml = `<div class="status-badge owned" style="margin-top: 2px;">KULLAN</div>`;
            } else {
                badgeHtml = `<div class="status-badge buy" style="margin-top: 2px;">${map.price} COIN SATIN AL</div>`;
            }

            card.innerHTML = `
                <div class="map-preview-box">
                    <canvas id="map-preview-${containerId}-${map.id}" class="map-preview-canvas" width="180" height="150" style="width: 100%; height: 100%;"></canvas>
                </div>
                <div class="map-info-col">
                    <div class="map-title-row">
                        <span class="map-title">${map.name}</span>
                        <span class="diff-badge">${map.difficulty.replace('ZORLUK: ', '')}</span>
                    </div>
                    <p class="map-desc">${map.desc}</p>
                    ${badgeHtml}
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
            let headCol = skin.headColor;
            let bodyCol = skin.bodyColor;
            let glowCol = skin.glowColor;

            if (skin.isRainbow) {
                const headHue = (time * 3) % 360;
                const bodyHue = (headHue - i * 20 + 360) % 360;
                headCol = `hsl(${headHue}, 100%, 55%)`;
                bodyCol = `hsl(${bodyHue}, 100%, 50%)`;
                glowCol = bodyCol;
            }

            pCtx.shadowBlur = i === 0 ? 8 : 4;
            pCtx.shadowColor = glowCol;

            if (i === 0) {
                pCtx.fillStyle = headCol;
                roundRect(pCtx, seg.x, seg.y, segSize, segSize, 4);
                pCtx.fill();

                // Mini Eyes
                pCtx.fillStyle = '#04060c';
                pCtx.beginPath(); pCtx.arc(seg.x + segSize * 0.75, seg.y + segSize * 0.3, 1.5, 0, Math.PI * 2); pCtx.fill();
                pCtx.beginPath(); pCtx.arc(seg.x + segSize * 0.75, seg.y + segSize * 0.7, 1.5, 0, Math.PI * 2); pCtx.fill();
            } else {
                if (skin.bodyColors && skin.bodyColors.length > 0) {
                    bodyCol = skin.bodyColors[i % skin.bodyColors.length];
                }
                pCtx.fillStyle = bodyCol;
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
            const isEquipped = (selectedTheme === theme.id);

            const item = document.createElement('div');
            item.className = `theme-item-card ${isEquipped ? 'active' : ''} ${!owned ? 'locked' : ''}`;
            item.style.padding = '12px';
            item.style.marginBottom = '8px';
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';
            item.style.width = '100%';

            let badgeHtml = '';
            if (isEquipped) {
                badgeHtml = `<div class="status-badge active" style="width: auto; padding: 6px 12px;">SEÇİLDİ</div>`;
            } else if (owned) {
                badgeHtml = `<div class="status-badge owned" style="width: auto; padding: 6px 12px;">KULLAN</div>`;
            } else {
                badgeHtml = `<div class="status-badge buy" style="width: auto; padding: 6px 12px;">${theme.price} COIN SATIN AL</div>`;
            }

            item.innerHTML = `
                <div class="theme-info" style="text-align: left;">
                    <div class="skin-title">${theme.name}</div>
                    <div class="skin-desc">${theme.desc}</div>
                </div>
                ${badgeHtml}
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

    // Shop Tab & Purchase Management
    let currentShopTab = 'skins';
    let pendingPurchaseItem = null;

    function switchShopTab(tab) {
        currentShopTab = tab;
        const tabs = ['skins', 'maps', 'themes'];
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
        else if (tab === 'maps') renderMapsGrid('shop-maps-grid');
        else if (tab === 'themes') renderThemesList('shop-themes-list');
    }

    function openPurchaseConfirm(type, item) {
        const currentCoins = CoinManager.getCoins();
        if (currentCoins < item.price) {
            showAlertModal('YETERLİ COIN YOK', `Bu ürünü almak için ${item.price} COIN gerekiyor.\nMevcut Coin miktarınız: ${currentCoins} COIN`);
            return;
        }

        pendingPurchaseItem = { type, ...item };

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
        const { type, id, name, price } = pendingPurchaseItem;

        if (CoinManager.canAfford(price)) {
            if (CoinManager.removeCoins(price)) {
                if (type === 'skin') {
                    InventoryManager.addSkin(id);
                    selectedSkin = id;
                    localStorage.setItem('snake_selected_skin', id);
                } else if (type === 'map') {
                    InventoryManager.addMap(id);
                    selectedMap = id;
                    localStorage.setItem('snake_selected_map', id);
                } else if (type === 'theme') {
                    InventoryManager.addTheme(id);
                    selectedTheme = id;
                    applyTheme(id);
                }

                playSound('reward');
                closePurchaseConfirm();

                const stats = PlayerStats.getStats();
                stats.ownedSkins = InventoryManager.getOwnedSkins();
                stats.ownedMaps = InventoryManager.getOwnedMaps();
                stats.ownedThemes = InventoryManager.getOwnedThemes();
                PlayerStats.saveStats(stats);
                AchievementManager.checkAchievements();
                updateMenuBadges();

                renderShopTab(currentShopTab);
                renderSkinsGrid('cust-skins-grid');
                renderMapsGrid('cust-maps-grid');
                renderThemesList('cust-themes-list');
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

        const activeMode = GameModeManager.getCurrentModeId();
        AudioManager.playMusicForMode(activeMode);

        mainMenuModal.classList.add('hidden');
        pauseModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        howToModal.classList.add('hidden');
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
            AudioManager.pauseMusic();

            PowerUpManager.onPause();
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
            pauseModal.classList.remove('hidden');
        } else {
            AudioManager.playSound('resume');
            VibrationManager.light();
            AudioManager.resumeMusic();

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

        isGameRunning = false;
        isPaused = false;
        PowerUpManager.reset();
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }

        pauseModal.classList.add('hidden');
        gameOverModal.classList.add('hidden');
        howToModal.classList.add('hidden');
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

    btnUp.addEventListener('touchstart', (e) => { e.preventDefault(); initAudio(); changeDirection(0, -1); });
    btnDown.addEventListener('touchstart', (e) => { e.preventDefault(); initAudio(); changeDirection(0, 1); });
    btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); initAudio(); changeDirection(-1, 0); });
    btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); initAudio(); changeDirection(1, 0); });

    btnUp.addEventListener('click', () => { initAudio(); changeDirection(0, -1); });
    btnDown.addEventListener('click', () => { initAudio(); changeDirection(0, 1); });
    btnLeft.addEventListener('click', () => { initAudio(); changeDirection(-1, 0); });
    btnRight.addEventListener('click', () => { initAudio(); changeDirection(1, 0); });

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
    const shopTabMaps = document.getElementById('shop-tab-maps');
    const shopTabThemes = document.getElementById('shop-tab-themes');

    if (shopTabSkins) shopTabSkins.addEventListener('click', () => { playSound('button'); switchShopTab('skins'); });
    if (shopTabMaps) shopTabMaps.addEventListener('click', () => { playSound('button'); switchShopTab('maps'); });
    if (shopTabThemes) shopTabThemes.addEventListener('click', () => { playSound('button'); switchShopTab('themes'); });

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
            }
            if (goalsContentAchievements) {
                goalsContentAchievements.classList.add('hidden');
                goalsContentAchievements.classList.remove('active');
            }
            renderMissionsList();
        });

        goalsTabAchievements.addEventListener('click', () => {
            playSound('button');
            goalsTabAchievements.classList.add('active');
            goalsTabMissions.classList.remove('active');
            if (goalsContentAchievements) {
                goalsContentAchievements.classList.remove('hidden');
                goalsContentAchievements.classList.add('active');
            }
            if (goalsContentMissions) {
                goalsContentMissions.classList.add('hidden');
                goalsContentMissions.classList.remove('active');
            }
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
            renderMissionsList();
        });
    }

    if (missionTabWeekly) {
        missionTabWeekly.addEventListener('click', () => {
            playSound('button');
            activeMissionTab = 'weekly';
            missionTabWeekly.classList.add('active');
            if (missionTabDaily) missionTabDaily.classList.remove('active');
            renderMissionsList();
        });
    }

    // GAME MODES UI RENDERER & MAP PILLS
    function renderModesMapPills() {
        const pillsContainer = document.getElementById('modes-map-pills');
        const activeNameLabel = document.getElementById('active-map-name-label');
        if (!pillsContainer) return;

        pillsContainer.innerHTML = '';
        const currentMapObj = MAPS[selectedMap] || MAPS.classic;
        if (activeNameLabel) activeNameLabel.textContent = currentMapObj.name;

        Object.values(MAPS).forEach(map => {
            const isOwned = InventoryManager.isMapOwned(map.id);
            const isSelected = (selectedMap === map.id);

            const pill = document.createElement('button');
            pill.className = `mode-map-pill ${isSelected ? 'active' : ''}`;
            pill.style.opacity = isOwned ? '1' : '0.6';
            pill.innerHTML = `${map.name} ${!isOwned ? '🔒' : ''}`;

            pill.addEventListener('click', (e) => {
                e.stopPropagation();
                playSound('button');
                if (isOwned) {
                    selectedMap = map.id;
                    localStorage.setItem('snake_selected_map', map.id);
                    renderModesMapPills();
                    renderMapsGrid('cust-maps-grid');
                    renderMapsGrid('shop-maps-grid');
                    GameModeManager.updateHudOverlay();
                    if (!isGameRunning) renderFrame();
                } else {
                    openPurchaseConfirm('map', map);
                }
            });

            pillsContainer.appendChild(pill);
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

            card.innerHTML = `
                <div class="mode-card-header">
                    <div class="mode-card-title-box">
                        <span class="mode-card-icon">${mode.icon}</span>
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
            renderModesMapPills();
            renderModesGrid();
            if (modesModal) modesModal.classList.remove('hidden');
        });
    }

    if (activeModePill) {
        activeModePill.addEventListener('click', () => {
            playSound('button');
            closeSecondaryModals();
            renderModesMapPills();
            renderModesGrid();
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
        });
    }

    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    window.addEventListener('resize', resizeCanvas);

    // Initial Setup
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSnakeGame);
} else {
    initSnakeGame();
}
