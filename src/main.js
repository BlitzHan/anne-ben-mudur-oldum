import { events } from './events.js';
import { shopUpgrades } from './shop.js';
import { sound } from './sound.js';

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
    highScore: 0
};

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
    });

    // Setup Back button
    document.getElementById('setup-back-btn').addEventListener('click', () => {
        sound.playClick();
        menuSetup.classList.add('hidden');
        menuMain.classList.remove('hidden');
    });

    // Setup Start button (Simülasyonu Başlat)
    document.getElementById('setup-start-btn').addEventListener('click', () => {
        sound.playClick();
        
        const nameInput = document.getElementById('setup-name').value.trim();
        state.playerName = nameInput || 'Müdür';
        
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
}

function renderMenuLeaderboard() {
    const listElement = document.getElementById('menu-leaderboard-list');
    if (!listElement) return;

    listElement.innerHTML = '';
    
    let scores = [];
    try {
        const savedScores = localStorage.getItem('game_leaderboard');
        scores = savedScores ? JSON.parse(savedScores) : [];
    } catch (e) {
        scores = [];
    }

    if (scores.length === 0) {
        listElement.innerHTML = '<li class="text-center text-muted" style="font-size:0.85rem; list-style:none; padding: 20px 0; color:var(--text-muted);">Henüz kayıtlı skor bulunmuyor.</li>';
        return;
    }

    scores.forEach((entry, index) => {
        const isTop = index === 0;
        const item = document.createElement('li');
        item.className = `leaderboard-item ${isTop ? 'top-rank' : ''}`;
        
        item.innerHTML = `
            <span class="leaderboard-rank">#${index + 1}</span>
            <span class="leaderboard-date">${entry.date}</span>
            <span class="leaderboard-score">${entry.score} Hafta</span>
        `;
        listElement.appendChild(item);
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
            
            welcomeScreen.classList.remove('hidden');
            menuMain.classList.remove('hidden');
            menuSetup.classList.add('hidden');
            menuRules.classList.add('hidden');
            menuLeaderboard.classList.add('hidden');
            
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
    if (state.deck.length === 0) {
        state.deck = shuffle(events);
    }
    
    let event = state.deck.pop();
    
    // Upgrade condition checks
    // If we have Heavy Duty AC upgrade, skip Klima Arızası (ac_broke) event
    if (event.id === "ac_broke" && state.purchasedUpgrades.has("heavy_duty_ac")) {
        if (state.deck.length === 0) {
            state.deck = shuffle(events);
        }
        event = state.deck.pop(); // draw another
    }
    
    state.currentEvent = event;
    displayCard(event);
}

// Populate card details in UI with entering animation & dynamic options
function displayCard(event) {
    const cardElement = document.getElementById('event-card');
    
    // Remove entering/sliding animations classes
    cardElement.className = 'event-card glass-panel';
    
    // Force layout reflow to restart animations
    void cardElement.offsetWidth;
    
    // Set text elements
    document.getElementById('card-tag').textContent = event.category;
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
    
    Object.keys(effects).forEach(stat => {
        const val = effects[stat];
        const modifier = getModifiedEffect(stat, val, eventId);
        
        state.stats[stat] += modifier;
        // Cap stats at [0, 100]
        state.stats[stat] = Math.max(0, Math.min(100, state.stats[stat]));
    });

    updateStatsUI();
    checkGameOverConditions();
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
    state.date.week += 1;
    
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

// Leaderboard storage logic (local storage, top 5 scores)
function saveLeaderboard(score) {
    let scores = [];
    try {
        const savedScores = localStorage.getItem('game_leaderboard');
        scores = savedScores ? JSON.parse(savedScores) : [];
    } catch (e) {
        scores = [];
    }

    // Add current run
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    scores.push({ score, date: dateStr });
    
    // Sort descending and slice to top 5
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    
    localStorage.setItem('game_leaderboard', JSON.stringify(scores));
}

// Render local high score leaderboard list
function renderLeaderboard() {
    const listElement = document.getElementById('leaderboard-list');
    if (!listElement) return;

    listElement.innerHTML = '';
    
    let scores = [];
    try {
        const savedScores = localStorage.getItem('game_leaderboard');
        scores = savedScores ? JSON.parse(savedScores) : [];
    } catch (e) {
        scores = [];
    }

    if (scores.length === 0) {
        listElement.innerHTML = '<li class="text-center text-muted" style="font-size:0.8rem;">Henüz kayıtlı skor bulunmuyor.</li>';
        return;
    }

    scores.forEach((entry, index) => {
        const isTop = index === 0;
        const item = document.createElement('li');
        item.className = `leaderboard-item ${isTop ? 'top-rank' : ''}`;
        
        item.innerHTML = `
            <span class="leaderboard-rank">#${index + 1}</span>
            <span class="leaderboard-date">${entry.date}</span>
            <span class="leaderboard-score">${entry.score} Hafta</span>
        `;
        listElement.appendChild(item);
    });
}
