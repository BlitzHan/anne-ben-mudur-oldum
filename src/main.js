import { events } from './events.js';
import { shopUpgrades } from './shop.js';
import { sound } from './sound.js';

// Supabase Database Settings (Free Tier Leaderboard Backend)
const SUPABASE_URL = 'https://iijsmwlmotdsxbzmitga.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_V381dGtC_ABLRRZzPO71Ug_wO5x_SqQ';

// ==========================================================================
// GAME STATE DEFINITION
// ==========================================================================
let state = {
    playerName: 'Müdür',
    storeType: 'new_store',
    difficulty: 'normal',
    stats: {
        staff: 50,
        customer: 50,
        hq: 50,
        finance: 50
    },
    date: {
        week: 1,
        month: 1,
        year: 1
    },
    purchasedUpgrades: new Set(),
    activeGoal: null,
    deck: [],
    currentEvent: null,
    isGameOver: false,
    highScore: 0,
    activeCampaign: null,
    campaignWeeksLeft: 0,
    blackFridayWarning: false,
    unlockedAchievements: []
};

// Achievements Database
const ACHIEVEMENTS = [
    { id: 'first_month', title: 'İlk Ayı Devirdik', desc: 'Müdürlükte 4 haftayı başarıyla geride bırak.', emoji: '📅' },
    { id: 'clutch', title: 'Kriz Yönetmeni', desc: 'Herhangi bir kaynağın %10\'un altına düştüğü bir haftayı atlat.', emoji: '🛡️' },
    { id: 'capitalist', title: 'Kasa Ağzına Kadar Dolu', desc: 'Kasa bütçesini %100 seviyesine ulaştır.', emoji: '💰' },
    { id: 'union', title: 'Sendikalı Mağaza', desc: 'Personel moralini %100 seviyesine ulaştır.', emoji: '🤝' },
    { id: 'hq_fave', title: 'Bölge Müdürünün Sağ Kolu', desc: 'Bölge mutluluğunu %100 seviyesine ulaştır.', emoji: '👔' },
    { id: 'customer_champion', title: 'Tüketici Dostu', desc: 'Müşteri memnuniyetini %100 seviyesine ulaştır.', emoji: '🌟' },
    { id: 'black_friday_survivor', title: 'İndirim Fatihi', desc: 'Black Friday kampanya haftalarını tüm kaynaklar %20\'nin üzerindeyken bitir.', emoji: '🔥' },
    { id: 'legend', title: 'Efsane Müdür', desc: 'Simülasyonda 100 hafta boyunca görevde kal.', emoji: '👑' }
];

// Available Monthly Goals pool
const GOALS_POOL = [
    { type: 'customer', minVal: 60, desc: 'Müşteri deneyimini %60\'ın üzerinde tut.' },
    { type: 'staff', minVal: 55, desc: 'Personel moralini en az %55 seviyesinde tut.' },
    { type: 'finance', minVal: 60, desc: 'Kasa bütçesini %60 veya daha yukarısında bitir.' },
    { type: 'hq', minVal: 55, desc: 'Bölge mutluluğunu %55 üzerinde tut.' }
];

// Custom Game Over reasons based on the failing metric
const GAMEOVER_REASONS = {
    staff: "Personeliniz topluca istifa edip rakip teknoloji mağazasına geçti. Aura Store kapandı! 🪧",
    customer: "Müşteriler mağazanızı boykot etti. Sosyal medyada itibar sıfırlandı, bölge yönetimi sizi görevden aldı! 📉",
    hq: "Bölge Direktörü ansızın yaptığı denetimde mağazayı darmadağın buldu ve işinize son verdi! 👔",
    finance: "Kasa bütçesi tamamen tükendi! Aura Store iflasını açıkladı, kapılara kilit vuruldu. 💸"
};

// ==========================================================================
// INITIALIZATION & EVENT BINDINGS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadHighScore();
    setupSoundControl();
    bindActionButtons();
    setupStartMenu();
});

// Setup Start/Welcome Menu Navigation
function setupStartMenu() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const menuMain = document.getElementById('menu-main');
    const menuSetup = document.getElementById('menu-setup');
    const menuRules = document.getElementById('menu-rules');
    const menuLeaderboard = document.getElementById('menu-leaderboard-panel');
    
    // Play button triggers Setup Configuration panel
    document.getElementById('start-game-btn').addEventListener('click', () => {
        sound.playClick();
        menuMain.classList.add('hidden');
        menuSetup.classList.remove('hidden');
        
        // Reset name error state
        const nameInputEl = document.getElementById('setup-name');
        const nameErrorEl = document.getElementById('setup-name-error');
        if (nameInputEl) nameInputEl.classList.remove('error-glow');
        if (nameErrorEl) nameErrorEl.classList.add('hidden');
    });

    // Name Input Event Listener to clear errors on typing
    const nameInputEl = document.getElementById('setup-name');
    const nameErrorEl = document.getElementById('setup-name-error');
    if (nameInputEl) {
        nameInputEl.addEventListener('input', () => {
            if (nameInputEl.value.trim() !== '') {
                nameInputEl.classList.remove('error-glow');
                if (nameErrorEl) nameErrorEl.classList.add('hidden');
            }
        });
    }

    // Random Name Button Click Listener
    const randomBtn = document.getElementById('setup-random-name-btn');
    if (randomBtn && nameInputEl) {
        randomBtn.addEventListener('click', () => {
            sound.playClick();
            const RANDOM_NAMES = [
                "Batıkan Bey", "Semih Bey", "Fırat Bey", "Gizem Hanım",
                "Girişimci Müdür", "Kriz Fatihi", "Aura Müdürü", "Borçlu Müdür",
                "Kampanya Canavarı", "Müşteri Dostu Can", "Bölge Yıldızı", "Efsane Müdür",
                "Ciro Şampiyonu", "Prim Avcısı", "Süpervizör Selim", "Perakende Fatihi"
            ];
            const randomIdx = Math.floor(Math.random() * RANDOM_NAMES.length);
            nameInputEl.value = RANDOM_NAMES[randomIdx];
            nameInputEl.classList.remove('error-glow');
            if (nameErrorEl) nameErrorEl.classList.add('hidden');
        });
    }

    // Setup Back button
    document.getElementById('setup-back-btn').addEventListener('click', () => {
        sound.playClick();
        menuSetup.classList.add('hidden');
        menuMain.classList.remove('hidden');
    });

    // Setup Start button (Simülasyonu Başlat)
    document.getElementById('setup-start-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('setup-name').value.trim();
        
        if (!nameInput) {
            // Show error, shake input, play warning sound, and stop
            if (nameInputEl) {
                nameInputEl.classList.add('error-glow');
                // Force animation replay
                nameInputEl.style.animation = 'none';
                void nameInputEl.offsetWidth;
                nameInputEl.style.animation = '';
            }
            if (nameErrorEl) {
                nameErrorEl.classList.remove('hidden');
            }
            sound.playWarning();
            return;
        }

        sound.playClick();
        state.playerName = nameInput;
        
        state.storeType = document.querySelector('input[name="store-type"]:checked').value;
        state.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        
        welcomeScreen.classList.add('hidden');
        menuSetup.classList.add('hidden');
        menuMain.classList.remove('hidden'); // Reset main view overlay for next time
        
        startNewGame();
    });

    // Rules button
    document.getElementById('rules-btn').addEventListener('click', () => {
        sound.playClick();
        menuMain.classList.add('hidden');
        menuRules.classList.remove('hidden');
    });

    // Rules Back button
    document.getElementById('rules-back-btn').addEventListener('click', () => {
        sound.playClick();
        menuRules.classList.add('hidden');
        menuMain.classList.remove('hidden');
    });

    // Leaderboard button
    document.getElementById('leaderboard-btn').addEventListener('click', () => {
        sound.playClick();
        menuMain.classList.add('hidden');
        menuLeaderboard.classList.remove('hidden');
        renderMenuLeaderboard();
    });

    // Leaderboard Back button
    document.getElementById('leaderboard-back-btn').addEventListener('click', () => {
        sound.playClick();
        menuLeaderboard.classList.add('hidden');
        menuMain.classList.remove('hidden');
    });

    // Achievements button
    document.getElementById('achievements-btn').addEventListener('click', () => {
        sound.playClick();
        menuMain.classList.add('hidden');
        document.getElementById('menu-achievements-panel').classList.remove('hidden');
        renderAchievements();
    });

    // Achievements Back button
    document.getElementById('achievements-back-btn').addEventListener('click', () => {
        sound.playClick();
        document.getElementById('menu-achievements-panel').classList.add('hidden');
        menuMain.classList.remove('hidden');
    });
}

function renderMenuLeaderboard() {
    const listElement = document.getElementById('menu-leaderboard-list');
    if (!listElement) return;

    listElement.innerHTML = '<li class="text-center text-muted" style="list-style:none; padding: 20px 0; color:var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Skorlar yükleniyor...</li>';

    fetchGlobalLeaderboard().then(scores => {
        if (!scores || scores.length === 0) {
            scores = getLocalScores();
        }
        
        if (scores.length === 0) {
            listElement.innerHTML = '<li class="text-center text-muted" style="font-size:0.85rem; list-style:none; padding: 20px 0; color:var(--text-muted);">Henüz kayıtlı skor bulunmuyor.</li>';
            return;
        }

        renderScoreList(listElement, scores);
    });
}

// ==========================================================================
// ACHIEVEMENTS MANAGEMENT
// ==========================================================================
function triggerAchievementUnlock(id) {
    let unlocked = JSON.parse(localStorage.getItem('aura_unlocked_achievements') || '[]');
    if (unlocked.includes(id)) return;
    
    unlocked.push(id);
    localStorage.setItem('aura_unlocked_achievements', JSON.stringify(unlocked));
    state.unlockedAchievements = unlocked;

    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;

    // Create or find toast container
    let toast = document.getElementById('achievement-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'achievement-toast';
        toast.className = 'achievement-toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <div class="toast-icon">${ach.emoji}</div>
        <div class="toast-body">
            <span class="toast-heading">Başarım Açıldı!</span>
            <span class="toast-name">${ach.title}</span>
        </div>
    `;

    sound.playSuccess();
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function renderAchievements() {
    const listElement = document.getElementById('achievements-list');
    if (!listElement) return;

    listElement.innerHTML = '';
    
    // Ensure unlockedAchievements is populated
    state.unlockedAchievements = JSON.parse(localStorage.getItem('aura_unlocked_achievements') || '[]');

    ACHIEVEMENTS.forEach(ach => {
        const isUnlocked = state.unlockedAchievements.includes(ach.id);
        const card = document.createElement('div');
        card.className = `achievement-card-box ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-icon-wrapper">
                ${isUnlocked ? ach.emoji : '🔒'}
            </div>
            <div class="achievement-info">
                <span class="achievement-title">${ach.title}</span>
                <span class="achievement-desc">${ach.desc}</span>
            </div>
        `;
        listElement.appendChild(card);
    });
}

// Setup High Score from Local Storage
function loadHighScore() {
    const savedScore = localStorage.getItem('high_score_weeks');
    state.highScore = savedScore ? parseInt(savedScore, 10) : 0;
    updateHighScoreUI();
}

function updateHighScoreUI() {
    const scoreElement = document.getElementById('high-score');
    if (scoreElement) {
        scoreElement.textContent = `${state.highScore} Hafta`;
    }
}

// Setup Sound Control Button
function setupSoundControl() {
    const soundBtn = document.getElementById('sound-toggle');
    const updateSoundIcon = () => {
        const isMuted = sound.isMuted();
        soundBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        soundBtn.style.opacity = isMuted ? '0.5' : '1';
    };
    
    updateSoundIcon();
    
    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.toggleMute();
        updateSoundIcon();
        // Play click as feedback after unmuting
        if (!sound.isMuted()) {
            sound.playClick();
        }
    });
}

// Bind main layout button actions
function bindActionButtons() {
    // Restart button in header
    document.getElementById('restart-btn').addEventListener('click', () => {
        sound.playClick();
        if (confirm("Oyunu yeniden başlatmak istediğinize emin misiniz?")) {
            startNewGame();
        }
    });

    // Next Month button in modal
    document.getElementById('next-month-btn').addEventListener('click', () => {
        sound.playClick();
        closeMonthlyModal();
    });

    // Play again button in game over screen
    document.getElementById('play-again-btn').addEventListener('click', () => {
        sound.playClick();
        startNewGame();
    });

    // Home button in header to exit to main menu
    document.getElementById('home-btn').addEventListener('click', () => {
        sound.playClick();
        if (confirm("Oyunu sonlandırıp ana menüye dönmek istediğinize emin misiniz? İlerlemeniz silinecektir.")) {
            const welcomeScreen = document.getElementById('welcome-screen');
            const menuMain = document.getElementById('menu-main');
            const menuSetup = document.getElementById('menu-setup');
            const menuRules = document.getElementById('menu-rules');
            const menuLeaderboard = document.getElementById('menu-leaderboard-panel');
            const menuAchievements = document.getElementById('menu-achievements-panel');
            
            welcomeScreen.classList.remove('hidden');
            menuMain.classList.remove('hidden');
            menuSetup.classList.add('hidden');
            menuRules.classList.add('hidden');
            menuLeaderboard.classList.add('hidden');
            if (menuAchievements) menuAchievements.classList.add('hidden');
            
            state.isGameOver = true;
        }
    });
}

const STORE_LABELS = {
    new_store: 'Yeni Açılan Mağaza',
    old_store: 'Köklü Mağaza',
    near_hq: 'Yönetime Yakın Mağaza'
};
const DIFFICULTY_LABELS = {
    easy: 'Kolay',
    normal: 'Normal',
    hard: 'Zor'
};

// ==========================================================================
// GAME CORE LOGIC
// ==========================================================================
function startNewGame() {
    state.stats = { staff: 55, customer: 55, hq: 55, finance: 50 };
    state.date = { week: 1, month: 1, year: 1 };
    state.purchasedUpgrades.clear();
    state.isGameOver = false;
    state.deck = [];
    state.activeCampaign = null;
    state.campaignWeeksLeft = 0;
    state.blackFridayWarning = false;
    state.unlockedAchievements = JSON.parse(localStorage.getItem('aura_unlocked_achievements') || '[]');
    
    // Update header info dynamically
    document.getElementById('header-subtitle').innerHTML = `
        Müdür: <strong>${state.playerName}</strong> 
        <span class="header-divider">|</span> 
        ${STORE_LABELS[state.storeType]} 
        <span class="difficulty-tag ${state.difficulty}">${DIFFICULTY_LABELS[state.difficulty]}</span>
    `;
    
    // Hide game over screen & modals
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('monthly-modal').classList.add('hidden');
    
    // Reset active upgrades visual list
    document.getElementById('upgrades-widget').classList.add('hidden');
    document.getElementById('active-upgrades-list').innerHTML = '';

    // Update campaign banner to hidden
    updateCampaignBannerUI();
    
    // Assign first month goal
    assignNewGoal();
    
    // Load first card
    drawNextCard();
    
    // Render base stats
    updateStatsUI();
    updateDateUI();
    
    sound.playSuccess();
}

// Shuffle elements helper
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Draw next event card from deck
function drawNextCard() {
    const absoluteWeek = getSurvivalScore() + 1;
    const cycleWeek = ((absoluteWeek - 1) % 48) + 1;

    let event = null;

    if (cycleWeek === 12 && state.activeCampaign !== 'black_friday') {
        state.activeCampaign = 'black_friday';
        state.campaignWeeksLeft = 3;
        state.blackFridayWarning = false;
        event = events.find(e => e.id === 'campaign_black_friday_intro');
    } else if (cycleWeek === 24 && state.activeCampaign !== 'new_year') {
        state.activeCampaign = 'new_year';
        state.campaignWeeksLeft = 3;
        event = events.find(e => e.id === 'campaign_new_year_intro');
    } else if (cycleWeek === 36 && state.activeCampaign !== 'audit') {
        state.activeCampaign = 'audit';
        state.campaignWeeksLeft = 2;
        event = events.find(e => e.id === 'campaign_audit_intro');
    }

    if (!event) {
        if (state.deck.length === 0) {
            state.deck = shuffle(events.filter(e => !e.id.startsWith('campaign_')));
        }
        event = state.deck.pop();
        
        // Upgrade condition checks
        if (event.id === "ac_broke" && state.purchasedUpgrades.has("heavy_duty_ac")) {
            if (state.deck.length === 0) {
                state.deck = shuffle(events.filter(e => !e.id.startsWith('campaign_')));
            }
            event = state.deck.pop(); // draw another
        }
    }

    // Now update campaign banner display
    updateCampaignBannerUI();

    state.currentEvent = event;
    displayCard(event);
}

function updateCampaignBannerUI() {
    const banner = document.getElementById('campaign-banner');
    const title = document.getElementById('campaign-banner-title');
    const desc = document.getElementById('campaign-banner-desc');

    if (!banner) return;

    if (state.activeCampaign && state.campaignWeeksLeft > 0) {
        banner.classList.remove('hidden');
        banner.className = 'campaign-banner glass-panel'; // Reset classes
        
        if (state.activeCampaign === 'black_friday') {
            banner.classList.add('theme-black-friday');
            title.textContent = '🔥 BLACK FRIDAY AKTİF';
            desc.textContent = `İndirim çılgınlığı! (Kalan Süre: ${state.campaignWeeksLeft} Hafta)`;
        } else if (state.activeCampaign === 'new_year') {
            banner.classList.add('theme-new-year');
            title.textContent = '🎁 YILBAŞI KAMPANYASI AKTİF';
            desc.textContent = `Hediye alışverişi! (Kalan Süre: ${state.campaignWeeksLeft} Hafta)`;
        } else if (state.activeCampaign === 'audit') {
            banner.classList.add('theme-audit');
            title.textContent = '📋 GENEL MERKEZ DENETİMİ';
            desc.textContent = `Denetmenler Mağazada! (Kalan Süre: ${state.campaignWeeksLeft} Hafta)`;
        }
    } else {
        banner.classList.add('hidden');
    }
}

// Populate card details in UI with entering animation & dynamic options
function displayCard(event) {
    const cardElement = document.getElementById('event-card');
    
    // Remove entering/sliding animations classes
    cardElement.className = 'event-card glass-panel';
    
    // Force layout reflow to restart animations
    void cardElement.offsetWidth;
    
    // Set NPC badge or regular category tag
    const npcBadge = document.getElementById('card-npc-badge');
    const cardTag = document.getElementById('card-tag');
    
    if (event.character) {
        if (npcBadge) {
            document.getElementById('card-npc-emoji').textContent = event.character.emoji;
            document.getElementById('card-npc-name').textContent = event.character.name;
            document.getElementById('card-npc-title').textContent = event.character.title;
            npcBadge.classList.remove('hidden');
        }
        if (cardTag) cardTag.classList.add('hidden');
    } else {
        if (npcBadge) npcBadge.classList.add('hidden');
        if (cardTag) {
            cardTag.textContent = event.category;
            cardTag.classList.remove('hidden');
        }
    }

    document.getElementById('card-graphic').innerHTML = `<span class="graphic-emoji">${event.emoji}</span>`;
    document.getElementById('card-title').textContent = event.title;
    document.getElementById('card-desc').textContent = event.desc;
    
    // Dynamic choices container rendering
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    const statLabels = {
        staff: 'Personel',
        customer: 'Müşteri',
        hq: 'Bölge',
        finance: 'Kasa'
    };

    event.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn option-btn';
        btn.setAttribute('data-index', idx);

        // Build choice structure
        const labelText = `SEÇENEK ${String.fromCharCode(65 + idx)}`;
        
        let effectsHtml = '';
        Object.keys(option.effect).forEach(stat => {
            const rawVal = option.effect[stat];
            const val = getModifiedEffect(stat, rawVal, event.id);

            if (val !== 0) {
                const isPos = val > 0;
                effectsHtml += `
                    <span class="effect-badge ${isPos ? 'effect-pos' : 'effect-neg'}">
                        <i class="fas ${isPos ? 'fa-caret-up' : 'fa-caret-down'}"></i>
                        ${isPos ? '+' : ''}${val}% ${statLabels[stat]}
                    </span>
                `;
            }
        });

        btn.innerHTML = `
            <span class="option-label">${labelText}</span>
            <span class="option-text">${option.text}</span>
            <div class="choice-effects">${effectsHtml}</div>
        `;

        // Click Handler
        btn.addEventListener('click', () => handleChoice(idx));

        // Hover Neon glow indicators on status cards
        btn.addEventListener('mouseenter', () => {
            if (state.isGameOver) return;
            Object.keys(option.effect).forEach(stat => {
                const rawVal = option.effect[stat];
                const val = getModifiedEffect(stat, rawVal, event.id);

                const indicator = document.getElementById(`ind-${stat}`);
                const card = document.getElementById(`stat-${stat}-card`);
                
                if (indicator && val !== 0) {
                    if (val > 0) {
                        indicator.textContent = "+";
                        indicator.className = "stat-indicator show-increase";
                    } else {
                        indicator.textContent = "-";
                        indicator.className = "stat-indicator show-decrease";
                    }
                    card.style.borderColor = val > 0 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';
                }
            });
        });

        btn.addEventListener('mouseleave', () => {
            ['staff', 'customer', 'hq', 'finance'].forEach(stat => {
                const indicator = document.getElementById(`ind-${stat}`);
                const card = document.getElementById(`stat-${stat}-card`);
                if (indicator) indicator.className = "stat-indicator";
                if (card) card.style.borderColor = '';
            });
        });

        choicesContainer.appendChild(btn);
    });
    
    // Add entering animation
    cardElement.classList.add('card-enter');
}

// Handle player card choice index
function handleChoice(optionIdx) {
    if (state.isGameOver) return;
    
    const option = state.currentEvent.options[optionIdx];
    const effects = option.effect;
    
    sound.playSwipe();

    // Trigger sliding animation on card (alternates slide direction based on index)
    const cardElement = document.getElementById('event-card');
    cardElement.classList.add(optionIdx % 2 === 0 ? 'slide-left' : 'slide-right');
    
    // Wait for card slide-out animation, then apply stats & progress time
    setTimeout(() => {
        applyStatsModification(effects);
        
        if (state.isGameOver) return;
        
        // Remove hover highlights indicator immediately
        ['staff', 'customer', 'hq', 'finance'].forEach(stat => {
            const indicator = document.getElementById(`ind-${stat}`);
            if (indicator) indicator.className = "stat-indicator";
        });
        
        progressTime();
    }, 300);
}

// Calculate modified stat changes based on difficulty, store scenario, and upgrades
function getModifiedEffect(stat, val, eventId) {
    let modifier = val;
    
    // 1. Difficulty Modifier
    if (modifier < 0) {
        if (state.difficulty === 'easy') {
            modifier = Math.round(modifier * 0.8); // 20% less stat loss on easy mode
        } else if (state.difficulty === 'hard') {
            modifier = Math.round(modifier * 1.2); // 20% more stat loss on hard mode
        }
    }

    // 2. Store Type Modifiers
    if (state.storeType === 'new_store') {
        if (stat === 'staff' && modifier < 0) {
            modifier = Math.round(modifier * 0.8); // 20% less staff morale loss (hevesli personel)
        }
        if ((stat === 'finance' || stat === 'customer') && modifier < 0) {
            modifier = Math.round(modifier * 1.2); // 20% more customer/finance losses (deneyimsiz ekip)
        }
    } else if (state.storeType === 'old_store') {
        if (stat === 'staff' && modifier < 0) {
            modifier = Math.round(modifier * 0.8); // 20% less staff morale loss (tecrübeli personel)
        }
        if (stat === 'customer' && modifier < 0) {
            modifier = Math.round(modifier * 1.2); // 20% more customer loss (demanding client base)
        }
    } else if (state.storeType === 'near_hq') {
        if (stat === 'finance' && modifier > 0) {
            modifier = Math.round(modifier * 1.2); // 20% more financial gains (wealthy neighborhood)
        }
        if (stat === 'hq' && modifier < 0) {
            modifier = Math.round(modifier * 1.2); // 20% more HQ happiness loss (tight monitoring)
        }
    }

    // 2.5 Active Campaign Modifiers
    if (state.activeCampaign === 'black_friday') {
        if (stat === 'finance' && modifier > 0) {
            modifier = Math.round(modifier * 1.5);
        }
        if (stat === 'staff' && modifier < 0) {
            modifier = Math.round(modifier * 1.5);
        }
    } else if (state.activeCampaign === 'new_year') {
        if (stat === 'customer') {
            modifier = Math.round(modifier * 1.4);
        }
        if (stat === 'finance' && modifier > 0) {
            modifier = Math.round(modifier * 1.2);
        }
    } else if (state.activeCampaign === 'audit') {
        if (stat === 'hq') {
            modifier = Math.round(modifier * 1.6);
        }
    }

    // 3. Passive Upgrades
    if (modifier < 0) {
        if (state.purchasedUpgrades.has("security_cams") && (eventId === "stolen_headphones" || eventId === "night_robbery")) {
            if (stat === "finance" || stat === "hq") {
                modifier = Math.round(modifier / 2);
            }
        }
        if (state.purchasedUpgrades.has("ergonomic_chairs") && (eventId === "yearly_count" || eventId === "district_manager")) {
            if (stat === "staff") {
                modifier = Math.round(modifier * 0.7);
            }
        }
    }
    
    return modifier;
}

// Modify state stats, check boundaries, and highlight warnings
function applyStatsModification(effects) {
    const eventId = state.currentEvent ? state.currentEvent.id : null;
    
    // Check if any metric is currently under 10% before choice results are applied
    let hadLowStat = Object.keys(state.stats).some(stat => state.stats[stat] < 10);

    Object.keys(effects).forEach(stat => {
        const val = effects[stat];
        const modifier = getModifiedEffect(stat, val, eventId);
        
        state.stats[stat] += modifier;
        // Cap stats at [0, 100]
        state.stats[stat] = Math.max(0, Math.min(100, state.stats[stat]));
    });

    updateStatsUI();
    const isOver = checkGameOverConditions();

    if (!isOver) {
        // Achievement: Clutch (Survive a turn where any metric was under 10%)
        if (hadLowStat) {
            triggerAchievementUnlock('clutch');
        }

        // Achievement checks for 100% metrics
        if (state.stats.finance === 100) triggerAchievementUnlock('capitalist');
        if (state.stats.staff === 100) triggerAchievementUnlock('union');
        if (state.stats.hq === 100) triggerAchievementUnlock('hq_fave');
        if (state.stats.customer === 100) triggerAchievementUnlock('customer_champion');

        // Check if black friday warning needs to be set (if any stat goes < 20% during black friday)
        if (state.activeCampaign === 'black_friday') {
            const hasUnder20 = Object.keys(state.stats).some(stat => state.stats[stat] < 20);
            if (hasUnder20) {
                state.blackFridayWarning = true;
            }
        }
    }
}

// Update stats bars and numbers in UI
function updateStatsUI() {
    let playWarningSound = false;

    Object.keys(state.stats).forEach(stat => {
        const val = state.stats[stat];
        const bar = document.getElementById(`stat-${stat}-bar`);
        const valueText = document.getElementById(`stat-${stat}-val`);
        const card = document.getElementById(`stat-${stat}-card`);
        
        if (bar && valueText) {
            bar.style.width = `${val}%`;
            valueText.textContent = `${val}%`;
        }

        // Trigger warning pulse for low stats (<20%)
        if (card) {
            if (val <= 20) {
                card.classList.add('warning-active');
                playWarningSound = true;
            } else {
                card.classList.remove('warning-active');
            }
        }
    });

    if (playWarningSound && !state.isGameOver) {
        sound.playWarning();
    }
}

// Advance calendar date
function progressTime() {
    // Campaign decrement progression
    if (state.activeCampaign && state.campaignWeeksLeft > 0) {
        state.campaignWeeksLeft -= 1;
        if (state.campaignWeeksLeft === 0) {
            // Campaign ended!
            if (state.activeCampaign === 'black_friday' && !state.blackFridayWarning) {
                triggerAchievementUnlock('black_friday_survivor');
            }
            state.activeCampaign = null;
            updateCampaignBannerUI();
        } else {
            updateCampaignBannerUI();
        }
    }

    state.date.week += 1;

    // Survive checks for achievements
    const weeksSurvived = getSurvivalScore();
    if (weeksSurvived >= 4) {
        triggerAchievementUnlock('first_month');
    }
    if (weeksSurvived >= 100) {
        triggerAchievementUnlock('legend');
    }
    
    if (state.date.week > 4) {
        // Month end reached, trigger evaluation report
        triggerMonthlyReview();
    } else {
        // Continue weekly card flow
        updateDateUI();
        drawNextCard();
    }
}

function updateDateUI() {
    const dateElement = document.getElementById('game-date');
    if (dateElement) {
        dateElement.textContent = `Yıl ${state.date.year}, Ay ${state.date.month}, Hafta ${state.date.week}`;
    }
}

// ==========================================================================
// MONTHLY REVIEW & UPGRADES SHOP
// ==========================================================================
function assignNewGoal() {
    // Pick random target from pool
    const randomGoal = GOALS_POOL[Math.floor(Math.random() * GOALS_POOL.length)];
    state.activeGoal = { ...randomGoal };
    
    // Display target banner
    const banner = document.getElementById('target-alert-banner');
    const desc = document.getElementById('target-description');
    
    if (banner && desc) {
        desc.textContent = state.activeGoal.desc;
        banner.classList.remove('hidden');
    }
}

function triggerMonthlyReview() {
    // 1. Evaluate target goal
    const targetStat = state.activeGoal.type;
    const minVal = state.activeGoal.minVal;
    const currentVal = state.stats[targetStat];
    const isGoalMet = currentVal >= minVal;

    const modalTitle = document.getElementById('modal-month-name');
    modalTitle.textContent = `${state.date.year}. Yıl, ${state.date.month}. Ay Sonu Raporu`;

    const goalBox = document.getElementById('goal-status-box');
    const goalTitle = document.getElementById('goal-status-title');
    const goalDesc = document.getElementById('goal-status-desc');
    const goalReward = document.getElementById('goal-reward-val');

    // Reward / Punishment applying
    if (isGoalMet) {
        goalBox.className = "goal-status-box success";
        goalTitle.innerHTML = `<i class="fas fa-check-circle"></i> Hedef Başarıyla Yakalandı!`;
        goalDesc.textContent = `Bu ayki '${state.activeGoal.desc}' hedefini tamamladınız. Bölge yönetimi başarınızı takdir etti.`;
        
        // Reward: +15% HQ, +5% Finance
        state.stats.hq = Math.min(100, state.stats.hq + 15);
        state.stats.finance = Math.min(100, state.stats.finance + 5);
        goalReward.textContent = "+15% Bölge / +5% Kasa";
        sound.playSuccess();
    } else {
        goalBox.className = "goal-status-box failed";
        goalTitle.innerHTML = `<i class="fas fa-times-circle"></i> Hedef Başarısız!`;
        goalDesc.textContent = `Bu ayki '${state.activeGoal.desc}' hedefini tutturamadınız. Bölge yönetimi uyarısı aldınız.`;
        
        // Punishment: -15% HQ, -5% Customer
        state.stats.hq = Math.max(0, state.stats.hq - 15);
        state.stats.customer = Math.max(0, state.stats.customer - 5);
        goalReward.textContent = "-15% Bölge / -5% Müşteri";
        sound.playWarning();
    }

    // Apply active monthly upgrade bonuses
    shopUpgrades.forEach(upg => {
        if (state.purchasedUpgrades.has(upg.id) && upg.monthlyBonus) {
            Object.keys(upg.monthlyBonus).forEach(stat => {
                state.stats[stat] = Math.min(100, state.stats[stat] + upg.monthlyBonus[stat]);
            });
        }
    });

    updateStatsUI();
    
    // Check if monthly penalty or bonuses drove player to game over
    if (checkGameOverConditions()) {
        return;
    }

    // Initialize shop options
    setupShopUI();

    // Show Report Modal
    document.getElementById('monthly-modal').classList.remove('hidden');
}

// Setup shop upgrade cards dynamically
function setupShopUI() {
    document.getElementById('shop-budget-val').textContent = `${state.stats.finance}%`;
    const shopList = document.getElementById('shop-items-list');
    shopList.innerHTML = '';

    shopUpgrades.forEach(upgrade => {
        const isPurchased = state.purchasedUpgrades.has(upgrade.id);
        const canAfford = state.stats.finance >= upgrade.cost;
        
        const itemCard = document.createElement('div');
        itemCard.className = `shop-item glass-panel ${isPurchased ? 'purchased' : ''}`;
        
        itemCard.innerHTML = `
            <div class="shop-item-icon">${upgrade.emoji}</div>
            <div class="shop-item-name">${upgrade.name}</div>
            <div class="shop-item-desc">${upgrade.desc}</div>
            <div class="shop-item-effect"><i class="fas fa-plus-circle"></i> ${upgrade.effectDesc}</div>
            <button class="shop-buy-btn" data-id="${upgrade.id}" ${isPurchased || !canAfford ? 'disabled' : ''}>
                ${isPurchased ? '<i class="fas fa-check"></i> Alındı' : `<i class="fas fa-coins"></i> Satın Al (${upgrade.cost}%)`}
            </button>
        `;

        // Buy button action
        const buyBtn = itemCard.querySelector('.shop-buy-btn');
        if (buyBtn && !isPurchased && canAfford) {
            buyBtn.addEventListener('click', () => {
                buyUpgrade(upgrade);
            });
        }

        shopList.appendChild(itemCard);
    });
}

// Handle upgrade purchase
function buyUpgrade(upgrade) {
    if (state.stats.finance < upgrade.cost) return;

    sound.playCashRegister();

    // Subtract finance cost
    state.stats.finance -= upgrade.cost;
    state.purchasedUpgrades.add(upgrade.id);

    // Apply immediate bonus if exists (we can also check and handle it)
    updateStatsUI();
    
    // Refresh Shop UI
    setupShopUI();
    
    // Update Upgrades Widget on main screen
    updateActiveUpgradesWidget();
}

function updateActiveUpgradesWidget() {
    const widget = document.getElementById('upgrades-widget');
    const list = document.getElementById('active-upgrades-list');
    
    if (state.purchasedUpgrades.size > 0) {
        widget.classList.remove('hidden');
        list.innerHTML = '';
        
        shopUpgrades.forEach(upg => {
            if (state.purchasedUpgrades.has(upg.id)) {
                const tag = document.createElement('span');
                tag.className = 'active-upgrade-tag';
                tag.innerHTML = `${upg.emoji} ${upg.name}`;
                list.appendChild(tag);
            }
        });
    } else {
        widget.classList.add('hidden');
    }
}

// Modal closing: prepare next month date structures
function closeMonthlyModal() {
    document.getElementById('monthly-modal').classList.add('hidden');

    // Reset week to 1, advance month
    state.date.week = 1;
    state.date.month += 1;
    
    if (state.date.month > 12) {
        state.date.month = 1;
        state.date.year += 1;
    }

    // Set new monthly goal
    assignNewGoal();
    
    updateDateUI();
    drawNextCard();
}

// ==========================================================================
// GAME OVER TRIGGER
// ==========================================================================
function checkGameOverConditions() {
    let failedStat = null;
    
    const statsList = ['staff', 'customer', 'hq', 'finance'];
    for (let i = 0; i < statsList.length; i++) {
        if (state.stats[statsList[i]] <= 0) {
            failedStat = statsList[i];
            break;
        }
    }

    if (failedStat) {
        triggerGameOver(failedStat);
        return true;
    }
    return false;
}

// Calculate total weeks survived as final score
function getSurvivalScore() {
    return (state.date.year - 1) * 48 + (state.date.month - 1) * 4 + state.date.week - 1;
}

function triggerGameOver(failedStat) {
    state.isGameOver = true;
    sound.playGameOver();

    const weeksSurvived = getSurvivalScore();

    // Firing Message
    document.getElementById('gameover-reason').textContent = GAMEOVER_REASONS[failedStat];
    
    // Current tenure details
    document.getElementById('gameover-tenure').textContent = `${weeksSurvived} Hafta`;
    document.getElementById('gameover-months').textContent = `${(state.date.year - 1) * 12 + state.date.month - 1} Ay`;

    // Save & Calculate Leaderboard High Scores
    if (weeksSurvived > state.highScore) {
        state.highScore = weeksSurvived;
        localStorage.setItem('high_score_weeks', weeksSurvived.toString());
        updateHighScoreUI();
    }
    document.getElementById('gameover-best').textContent = `${state.highScore} Hafta`;

    saveLeaderboard(weeksSurvived);
    renderLeaderboard();

    // Show Game Over Overlay
    document.getElementById('gameover-screen').classList.remove('hidden');
}

// Leaderboard storage logic (Supabase DB + local storage fallback)
function saveLeaderboard(score) {
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    
    // Save to Local Storage first
    let localScores = getLocalScores();
    localScores.push({
        name: state.playerName || 'Müdür',
        score: score,
        difficulty: state.difficulty || 'normal',
        store_type: state.storeType || 'new_store',
        date: dateStr
    });
    localScores.sort((a, b) => b.score - a.score);
    localScores = localScores.slice(0, 10); // Keep top 10 locally
    localStorage.setItem('game_leaderboard', JSON.stringify(localScores));

    // Submit to Supabase DB
    saveGlobalLeaderboard(state.playerName, score, state.difficulty, state.storeType);
}

// Render high score leaderboard list
function renderLeaderboard() {
    const listElement = document.getElementById('leaderboard-list');
    if (!listElement) return;

    listElement.innerHTML = '<li class="text-center text-muted" style="list-style:none; padding: 20px 0; color:var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Skorlar yükleniyor...</li>';

    fetchGlobalLeaderboard().then(scores => {
        if (!scores || scores.length === 0) {
            scores = getLocalScores();
        }
        
        if (scores.length === 0) {
            listElement.innerHTML = '<li class="text-center text-muted" style="font-size:0.85rem; list-style:none; padding: 20px 0; color:var(--text-muted);">Henüz kayıtlı skor bulunmuyor.</li>';
            return;
        }

        renderScoreList(listElement, scores);
    });
}

// Fetch leaderboard from Supabase DB (free tier REST endpoint)
async function fetchGlobalLeaderboard() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?select=*&order=score.desc&limit=10`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Supabase response error');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Liderlik tablosu çekilemedi, yerel skorlar kullanılacak:', error);
        return null;
    }
}

// Save score to Supabase DB (free tier REST endpoint)
async function saveGlobalLeaderboard(name, score, difficulty, storeType) {
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: name || 'Müdür',
                score: score,
                difficulty: difficulty || 'normal',
                store_type: storeType || 'new_store',
                date: dateStr
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        console.error('Global skora gönderilemedi, yerel olarak kaydedildi:', error);
        return false;
    }
}

// Local Storage scores retrieval helper
function getLocalScores() {
    try {
        const savedScores = localStorage.getItem('game_leaderboard');
        return savedScores ? JSON.parse(savedScores) : [];
    } catch (e) {
        return [];
    }
}

// Render structured list helper
function renderScoreList(listElement, scores) {
    listElement.innerHTML = '';
    scores.forEach((entry, index) => {
        const isTop = index === 0;
        const item = document.createElement('li');
        item.className = `leaderboard-item ${isTop ? 'top-rank' : ''}`;
        
        const name = entry.name || 'Müdür';
        const score = entry.score || 0;
        const date = entry.date || '';
        const storeLabel = STORE_LABELS[entry.store_type] || 'Yeni Açılan Mağaza';
        const diffLabel = DIFFICULTY_LABELS[entry.difficulty] || 'Normal';
        
        item.innerHTML = `
            <div class="leaderboard-item-main">
                <span class="leaderboard-rank">#${index + 1}</span>
                <span class="leaderboard-name">${name}</span>
                <span class="leaderboard-score">${score} Hafta</span>
            </div>
            <div class="leaderboard-item-sub">
                <span>${storeLabel} (${diffLabel})</span>
                <span class="leaderboard-date">${date}</span>
            </div>
        `;
        listElement.appendChild(item);
    });
}
