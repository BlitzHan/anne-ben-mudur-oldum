import { shopUpgrades } from './shop.js';
import { sound } from './sound.js';
import { TALENTS } from './talents.js';
import {
    STATS, CAREER_WEEKS, SCORE_MAX, createRng, newGame, drawEvent, previewOption,
    applyChoice, endWeek, assignGoals, closeMonth, rollShopOffers, canBuy,
    buyUpgrade as engineBuyUpgrade, upgradeCostTl, startNextMonth, weeksServed,
    calculateScore
} from './engine.js';

// Supabase Database Settings (Free Tier Leaderboard Backend)
const SUPABASE_URL = 'https://iijsmwlmotdsxbzmitga.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_V381dGtC_ABLRRZzPO71Ug_wO5x_SqQ';

// Leaderboard rows are written by anyone with the public key, so every field
// read back from it is untrusted. Keep these limits in sync with
// supabase/leaderboard-guard.sql.
const NAME_MAX_LENGTH = 20;
const VALID_DIFFICULTIES = ['easy', 'normal', 'hard'];
const VALID_STORE_TYPES = ['new_store', 'old_store', 'near_hq'];

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeName(name) {
    const cleaned = String(name || '')
        .replace(/[\u0000-\u001f\u007f<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, NAME_MAX_LENGTH);
    return cleaned || 'Müdür';
}

function isValidScoreEntry(entry) {
    return entry
        && typeof entry.name === 'string'
        && entry.name.length > 0
        && entry.name.length <= NAME_MAX_LENGTH
        && Number.isInteger(entry.score)
        && entry.score >= 0
        && entry.score <= SCORE_MAX
        && VALID_DIFFICULTIES.includes(entry.difficulty)
        && VALID_STORE_TYPES.includes(entry.store_type);
}

const formatTl = (n) => `₺${n.toLocaleString('tr-TR')}`;

const ICON_SOUND_ON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
const ICON_SOUND_OFF = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5"/></svg>';

// ==========================================================================
// UI STATE (oyun kuralları engine.js'te; burada sadece ekran ve kalıcı veri)
// ==========================================================================
let game = null;
let rng = createRng();

const ui = {
    playerName: 'Müdür',
    storeType: 'new_store',
    difficulty: 'normal',
    highScore: 0,
    talentPoints: 0,
    unlockedTalents: [],
    unlockedAchievements: [],
    shopOffers: [],
    isOver: true
};

// Achievements Database. İki uç da öldürdüğü için "%100" rozetleri %90'a çekildi;
// id'ler aynı kaldı ki eski kayıtlar korunsun.
const ACHIEVEMENTS = [
    { id: 'first_month', title: 'İlk Ayı Devirdik', desc: 'Müdürlükte 4 haftayı geride bırak.' },
    { id: 'clutch', title: 'Kriz Yönetmeni', desc: 'Herhangi bir barın %10\'un altına düştüğü bir haftayı atlat.' },
    { id: 'capitalist', title: 'Kasa Dolu', desc: 'Kasayı %90 ve üstüne çıkar, taşırmadan.' },
    { id: 'union', title: 'Ekip Seni Seviyor', desc: 'Personel moralini %90 ve üstüne çıkar, şımartmadan.' },
    { id: 'hq_fave', title: 'Bölge Müdürünün Sağ Kolu', desc: 'Bölge memnuniyetini %90 ve üstüne çıkar.' },
    { id: 'customer_champion', title: 'Tüketici Dostu', desc: 'Müşteri deneyimini %90 ve üstüne çıkar, şımartmadan.' },
    { id: 'black_friday_survivor', title: 'İndirim Fatihi', desc: 'Black Friday haftalarını tüm barlar %20\'nin üzerindeyken bitir.' },
    { id: 'legend', title: 'Bir Yıl Dayandım', desc: 'Bir yılı görevden alınmadan tamamla.' },
    { id: 'promoted', title: 'Anne, Bölge Müdürü Oldum', desc: 'Mağaza sağlıklıyken terfi et.' }
];

const STAT_LABELS = {
    staff: 'Personel',
    customer: 'Müşteri',
    hq: 'Bölge',
    finance: 'Kasa'
};

// Oyun sonu metinleri: hangi bar, hangi uçtan.
const ENDINGS = {
    fired: {
        staff: {
            low: 'Ekip topluca istifa edip karşıdaki rakip mağazaya geçti. Kapıda "Personel alınacaktır" yazısıyla kaldın.',
            high: 'Ekibi o kadar şımarttın ki kimse kimseye iş söyleyemez oldu. Sayımda yarım depo kayıp çıktı, görevden alındın.'
        },
        customer: {
            low: 'Müşteriler mağazayı boykot etti, sosyal medyada itibar sıfırlandı. Bölge seni görevden aldı.',
            high: 'Her müşteriye evet dedin: iadeler, indirimler, sıfırıyla değişimler... Kâr kalmadı, merkez seni görevden aldı.'
        },
        hq: {
            low: 'Bölge Müdürü habersiz denetimde mağazayı darmadağın buldu ve işine son verdi.',
            high: 'Bölge seni çok sevdi.'
        },
        finance: {
            low: 'Kasa tamamen boşaldı. Maaşlar ödenemedi, kapıya kilit vuruldu.',
            high: 'Kasa taşıyor ama ekip ve müşteri için tek kuruş harcamamışsın. Merkez "bu kadar tasarruf olmaz" dedi, denetime aldı ve görevden uzaklaştırdı.'
        }
    },
    transferred: 'Bölge seni fazla erken sevdi ya da mağaza hazır değilken yükseldin. Terfi yerine merkez ofiste dosya işine tayin edildin.'
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

function setupStartMenu() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const menuMain = document.getElementById('menu-main');
    const menuSetup = document.getElementById('menu-setup');
    const menuRules = document.getElementById('menu-rules');
    const menuLeaderboard = document.getElementById('menu-leaderboard-panel');

    document.getElementById('start-game-btn').addEventListener('click', () => {
        sound.playClick();
        menuMain.classList.add('hidden');
        menuSetup.classList.remove('hidden');

        const nameInputEl = document.getElementById('setup-name');
        const nameErrorEl = document.getElementById('setup-name-error');
        if (nameInputEl) nameInputEl.classList.remove('error-glow');
        if (nameErrorEl) nameErrorEl.classList.add('hidden');
    });

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
            nameInputEl.value = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
            nameInputEl.classList.remove('error-glow');
            if (nameErrorEl) nameErrorEl.classList.add('hidden');
        });
    }

    document.getElementById('setup-back-btn').addEventListener('click', () => {
        sound.playClick();
        menuSetup.classList.add('hidden');
        menuMain.classList.remove('hidden');
    });

    document.getElementById('setup-start-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('setup-name').value.trim();

        if (!nameInput) {
            if (nameInputEl) {
                nameInputEl.classList.add('error-glow');
                nameInputEl.style.animation = 'none';
                void nameInputEl.offsetWidth;
                nameInputEl.style.animation = '';
            }
            if (nameErrorEl) nameErrorEl.classList.remove('hidden');
            sound.playWarning();
            return;
        }

        sound.playClick();
        ui.playerName = sanitizeName(nameInput);
        ui.storeType = document.querySelector('input[name="store-type"]:checked').value;
        ui.difficulty = document.querySelector('input[name="difficulty"]:checked').value;

        welcomeScreen.classList.add('hidden');
        menuSetup.classList.add('hidden');
        menuMain.classList.remove('hidden');

        startNewGame();
    });

    const panels = [
        ['rules-btn', 'rules-back-btn', menuRules, null],
        ['leaderboard-btn', 'leaderboard-back-btn', menuLeaderboard, renderMenuLeaderboard],
        ['achievements-btn', 'achievements-back-btn', document.getElementById('menu-achievements-panel'), renderAchievements],
        ['talents-btn', 'talents-back-btn', document.getElementById('menu-talents-panel'), renderTalents]
    ];
    panels.forEach(([openId, backId, panel, render]) => {
        document.getElementById(openId).addEventListener('click', () => {
            sound.playClick();
            menuMain.classList.add('hidden');
            panel.classList.remove('hidden');
            if (render) render();
        });
        document.getElementById(backId).addEventListener('click', () => {
            sound.playClick();
            panel.classList.add('hidden');
            menuMain.classList.remove('hidden');
        });
    });

    document.getElementById('talents-reset-btn').addEventListener('click', () => {
        resetTalents();
    });
}

function renderMenuLeaderboard() {
    const listElement = document.getElementById('menu-leaderboard-list');
    if (!listElement) return;

    listElement.innerHTML = '<li class="list-empty">Skorlar yükleniyor…</li>';

    fetchGlobalLeaderboard().then(scores => {
        if (!scores || scores.length === 0) {
            scores = getLocalScores();
        }

        if (scores.length === 0) {
            listElement.innerHTML = '<li class="list-empty">Henüz kayıtlı skor yok.</li>';
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
    ui.unlockedAchievements = unlocked;

    // Award 1 Talent Point for achievement unlock
    let points = parseInt(localStorage.getItem('aura_talent_points') || '0', 10);
    points += 1;
    localStorage.setItem('aura_talent_points', points);
    ui.talentPoints = points;

    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;

    let toast = document.getElementById('achievement-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'achievement-toast';
        toast.className = 'achievement-toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <div class="toast-body">
            <span class="toast-heading">Başarım Açıldı! (+1 Yetenek Puanı)</span>
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
    ui.unlockedAchievements = JSON.parse(localStorage.getItem('aura_unlocked_achievements') || '[]');

    ACHIEVEMENTS.forEach(ach => {
        const isUnlocked = ui.unlockedAchievements.includes(ach.id);
        const card = document.createElement('div');
        card.className = `achievement-card-box ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-info">
                <span class="achievement-title">${ach.title}</span>
                <span class="achievement-desc">${ach.desc}</span>
            </div>
            <span class="achievement-state">${isUnlocked ? 'Açıldı' : 'Kilitli'}</span>
        `;
        listElement.appendChild(card);
    });
}

// ==========================================================================
// TALENTS MANAGEMENT
// ==========================================================================
function renderTalents() {
    const listElement = document.getElementById('talents-list');
    const pointsCountElement = document.getElementById('talent-points-count');
    if (!listElement || !pointsCountElement) return;

    ui.talentPoints = parseInt(localStorage.getItem('aura_talent_points') || '0', 10);
    ui.unlockedTalents = JSON.parse(localStorage.getItem('aura_unlocked_talents') || '[]');

    pointsCountElement.textContent = ui.talentPoints;
    listElement.innerHTML = '';

    TALENTS.forEach(talent => {
        const isUnlocked = ui.unlockedTalents.includes(talent.id);
        const hasPrereq = talent.req ? ui.unlockedTalents.includes(talent.req) : true;
        const canAfford = ui.talentPoints >= talent.cost;

        let stateClass = 'locked';
        if (isUnlocked) stateClass = 'unlocked';
        else if (hasPrereq && canAfford) stateClass = 'available';

        const card = document.createElement('div');
        card.className = `talent-card-box ${stateClass}`;

        let prereqHtml = '';
        if (talent.req && !ui.unlockedTalents.includes(talent.req)) {
            const reqTalent = TALENTS.find(t => t.id === talent.req);
            prereqHtml = `<span class="talent-req-info">Önce: ${reqTalent.name}</span>`;
        }

        card.innerHTML = `
            <div class="talent-info">
                <span class="talent-title">${talent.name}</span>
                <span class="talent-desc">${talent.desc}</span>
                ${prereqHtml}
            </div>
            <div class="talent-cost-tag">
                ${isUnlocked ? 'AÇIK' : `${talent.cost} Puan`}
            </div>
        `;

        if (stateClass === 'available') {
            card.addEventListener('click', () => buyTalent(talent));
        }

        listElement.appendChild(card);
    });
}

function buyTalent(talent) {
    if (ui.talentPoints < talent.cost) return;

    sound.playCashRegister();
    ui.talentPoints -= talent.cost;
    ui.unlockedTalents.push(talent.id);

    localStorage.setItem('aura_talent_points', ui.talentPoints);
    localStorage.setItem('aura_unlocked_talents', JSON.stringify(ui.unlockedTalents));

    renderTalents();
}

function resetTalents() {
    sound.playClick();

    let spentPoints = 0;
    ui.unlockedTalents.forEach(tId => {
        const found = TALENTS.find(t => t.id === tId);
        if (found) spentPoints += found.cost;
    });

    ui.talentPoints += spentPoints;
    ui.unlockedTalents = [];

    localStorage.setItem('aura_talent_points', ui.talentPoints);
    localStorage.setItem('aura_unlocked_talents', JSON.stringify(ui.unlockedTalents));

    renderTalents();
}

function loadHighScore() {
    const savedScore = localStorage.getItem('high_score_points') || localStorage.getItem('high_score_weeks');
    ui.highScore = savedScore ? parseInt(savedScore, 10) : 0;
    updateHighScoreUI();
}

function updateHighScoreUI() {
    const scoreElement = document.getElementById('high-score');
    if (scoreElement) {
        scoreElement.textContent = `${ui.highScore.toLocaleString('tr-TR')} Puan`;
    }
}

function setupSoundControl() {
    const soundBtn = document.getElementById('sound-toggle');
    const updateSoundIcon = () => {
        const isMuted = sound.isMuted();
        soundBtn.innerHTML = isMuted ? ICON_SOUND_OFF : ICON_SOUND_ON;
        soundBtn.setAttribute('aria-label', isMuted ? 'Sesi aç' : 'Sesi kapat');
    };

    updateSoundIcon();

    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.toggleMute();
        updateSoundIcon();
        if (!sound.isMuted()) sound.playClick();
    });
}

function bindActionButtons() {
    document.getElementById('restart-btn').addEventListener('click', () => {
        sound.playClick();
        if (confirm("Oyunu yeniden başlatmak istediğinize emin misiniz?")) {
            startNewGame();
        }
    });

    document.getElementById('next-month-btn').addEventListener('click', () => {
        sound.playClick();
        closeMonthlyModal();
    });

    document.getElementById('retirement-play-again-btn').addEventListener('click', () => {
        sound.playClick();
        startNewGame();
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        sound.playClick();
        startNewGame();
    });

    document.getElementById('home-btn').addEventListener('click', () => {
        sound.playClick();
        if (!ui.isOver && !confirm("Oyunu sonlandırıp ana menüye dönmek istediğinize emin misiniz? İlerlemeniz silinecektir.")) {
            return;
        }
        ['menu-setup', 'menu-rules', 'menu-leaderboard-panel', 'menu-achievements-panel', 'menu-talents-panel',
            'monthly-modal', 'gameover-screen', 'retirement-screen'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        document.getElementById('welcome-screen').classList.remove('hidden');
        document.getElementById('menu-main').classList.remove('hidden');
        ui.isOver = true;
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
// GAME FLOW
// ==========================================================================
function startNewGame() {
    ui.unlockedAchievements = JSON.parse(localStorage.getItem('aura_unlocked_achievements') || '[]');
    ui.talentPoints = parseInt(localStorage.getItem('aura_talent_points') || '0', 10);
    ui.unlockedTalents = JSON.parse(localStorage.getItem('aura_unlocked_talents') || '[]');
    ui.shopOffers = [];
    ui.isOver = false;

    rng = createRng((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0);
    game = newGame({ storeType: ui.storeType, difficulty: ui.difficulty, talents: ui.unlockedTalents });

    document.getElementById('header-subtitle').innerHTML = `
        Müdür: <strong>${escapeHtml(ui.playerName)}</strong>
        <span class="header-divider">|</span>
        ${STORE_LABELS[ui.storeType]}
        <span class="difficulty-tag ${ui.difficulty}">${DIFFICULTY_LABELS[ui.difficulty]}</span>
    `;

    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('monthly-modal').classList.add('hidden');
    document.getElementById('retirement-screen').classList.add('hidden');

    document.getElementById('upgrades-widget').classList.add('hidden');
    document.getElementById('active-upgrades-list').innerHTML = '';

    assignGoals(game, rng);
    renderGoalsBanner();

    nextCard();
    updateStatsUI();
    updateDateUI();

    sound.playSuccess();
}

function nextCard() {
    const event = drawEvent(game, rng);
    updateCampaignBannerUI();
    displayCard(event);
}

function updateCampaignBannerUI() {
    const banner = document.getElementById('campaign-banner');
    const title = document.getElementById('campaign-banner-title');
    const desc = document.getElementById('campaign-banner-desc');

    if (!banner) return;

    if (game.activeCampaign && game.campaignWeeksLeft > 0) {
        banner.className = 'campaign-banner';

        if (game.activeCampaign === 'black_friday') {
            banner.classList.add('theme-black-friday');
            title.textContent = 'Black Friday';
            desc.textContent = `Satış bol, ekip yorgun. ${game.campaignWeeksLeft} hafta kaldı.`;
        } else if (game.activeCampaign === 'new_year') {
            banner.classList.add('theme-new-year');
            title.textContent = 'Yılbaşı kampanyası';
            desc.textContent = `Müşteri tepkileri daha sert. ${game.campaignWeeksLeft} hafta kaldı.`;
        } else if (game.activeCampaign === 'audit') {
            banner.classList.add('theme-audit');
            title.textContent = 'Genel Merkez denetimi';
            desc.textContent = `Bölge her şeyi not ediyor. ${game.campaignWeeksLeft} hafta kaldı.`;
        }
    } else {
        banner.classList.add('hidden');
    }
}

// Seçenek ipuçları: etki hiçbir zaman sayı olarak gösterilmez.
//   Kolay: hangi bar, ne kadar (hafif/sert) ve yön oku
//   Normal: hangi bar, ne kadar (hafif/sert)
//   Zor: sadece hangi barlar
function hintBadges(preview) {
    return STATS.filter(stat => preview[stat].magnitude > 0).map(stat => {
        const { magnitude, direction } = preview[stat];
        const size = magnitude === 2 ? 'sert' : 'hafif';
        if (ui.difficulty === 'hard') {
            return `<span class="effect-badge effect-neutral">${STAT_LABELS[stat]}</span>`;
        }
        if (ui.difficulty === 'easy') {
            const up = direction > 0;
            return `
                <span class="effect-badge ${up ? 'effect-pos' : 'effect-neg'}" title="${size}">
                    <span aria-label="${up ? 'artar' : 'azalır'}">${up ? '▲' : '▼'}</span>
                    ${STAT_LABELS[stat]} <span class="hint-dot mag-${magnitude}" aria-label="${size}"></span>
                </span>`;
        }
        return `
            <span class="effect-badge effect-neutral" title="${size}">
                ${STAT_LABELS[stat]} <span class="hint-dot mag-${magnitude}" aria-label="${size}"></span>
            </span>`;
    }).join('');
}

function clearStatPreview() {
    STATS.forEach(stat => {
        const indicator = document.getElementById(`ind-${stat}`);
        const card = document.getElementById(`stat-${stat}-card`);
        if (indicator) {
            indicator.className = 'stat-indicator';
            indicator.innerHTML = '';
        }
        if (card) card.classList.remove('previewing');
    });
}

function showStatPreview(preview) {
    STATS.forEach(stat => {
        const indicator = document.getElementById(`ind-${stat}`);
        const card = document.getElementById(`stat-${stat}-card`);
        const { magnitude } = preview[stat];
        if (!indicator || magnitude === 0) return;
        // Zor modda büyüklük de gizli: her etkilenen bar aynı nokta.
        const mag = ui.difficulty === 'hard' ? 1 : magnitude;
        indicator.innerHTML = `<span class="hint-dot mag-${mag}"></span>`;
        indicator.className = 'stat-indicator show-neutral';
        card.classList.add('previewing');
    });
}

function displayCard(event) {
    const cardElement = document.getElementById('event-card');
    cardElement.className = 'event-card';
    void cardElement.offsetWidth;

    // Her kart ekip grubuna düşen bir mesaj: karakteri yoksa mağaza adına gelir.
    const sender = event.character || { name: 'Mağaza', title: event.category };
    document.getElementById('card-npc-avatar').textContent = sender.name.charAt(0).toLocaleUpperCase('tr-TR');
    document.getElementById('card-npc-name').textContent = sender.name;
    document.getElementById('card-npc-title').textContent = sender.title;
    document.getElementById('card-tag').textContent = event.category.toLocaleLowerCase('tr-TR');

    document.getElementById('card-title').textContent = event.title;
    document.getElementById('card-desc').textContent = event.desc;

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    event.options.forEach((option, idx) => {
        const preview = previewOption(game, option, event.id);
        const btn = document.createElement('button');
        btn.className = 'choice-btn option-btn';
        btn.setAttribute('data-index', idx);

        btn.innerHTML = `
            <span class="option-label">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text">${option.text}</span>
            <div class="choice-effects">${hintBadges(preview)}</div>
        `;

        btn.addEventListener('click', () => handleChoice(idx));
        btn.addEventListener('mouseenter', () => { if (!ui.isOver) showStatPreview(preview); });
        btn.addEventListener('focus', () => { if (!ui.isOver) showStatPreview(preview); });
        btn.addEventListener('mouseleave', clearStatPreview);
        btn.addEventListener('blur', clearStatPreview);

        choicesContainer.appendChild(btn);
    });

    cardElement.classList.add('card-enter');
    // Telefonda seçimden sonra yeni kart ve barlar görünsün
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleChoice(optionIdx) {
    if (ui.isOver) return;
    ui.isOver = true; // animasyon bitene kadar çift tıklamayı engelle

    sound.playSwipe();
    const cardElement = document.getElementById('event-card');
    cardElement.classList.add(optionIdx % 2 === 0 ? 'slide-left' : 'slide-right');

    setTimeout(() => {
        const { hadLowStat, ending } = applyChoice(game, optionIdx);
        clearStatPreview();
        updateStatsUI();
        if (ending) return finishGame();

        ui.isOver = false;
        if (hadLowStat) triggerAchievementUnlock('clutch');
        checkHighStatAchievements();

        const week = endWeek(game, rng);
        updateStatsUI();
        if (week.ending) return finishGame();

        if (week.campaignEnded && week.campaignEnded.id === 'black_friday' && week.campaignEnded.clean) {
            triggerAchievementUnlock('black_friday_survivor');
        }
        updateCampaignBannerUI();
        if (weeksServed(game) >= 4) triggerAchievementUnlock('first_month');

        if (week.monthEnded) {
            triggerMonthlyReview();
        } else {
            updateDateUI();
            nextCard();
        }
    }, 300);
}

function checkHighStatAchievements() {
    if (game.stats.finance >= 90) triggerAchievementUnlock('capitalist');
    if (game.stats.staff >= 90) triggerAchievementUnlock('union');
    if (game.stats.hq >= 90) triggerAchievementUnlock('hq_fave');
    if (game.stats.customer >= 90) triggerAchievementUnlock('customer_champion');
}

function updateStatsUI() {
    let playWarningSound = false;

    STATS.forEach(stat => {
        const val = game.stats[stat];
        const bar = document.getElementById(`stat-${stat}-bar`);
        const valueText = document.getElementById(`stat-${stat}-val`);
        const card = document.getElementById(`stat-${stat}-card`);

        if (bar && valueText) {
            bar.style.height = `${val}%`;
            valueText.textContent = val;
        }

        // İki uç da tehlikeli
        if (card) {
            if (val <= 20 || val >= 85) {
                card.classList.add('warning-active');
                playWarningSound = true;
            } else {
                card.classList.remove('warning-active');
            }
        }
    });

    if (playWarningSound && !ui.isOver) sound.playWarning();
}

function updateDateUI() {
    const dateElement = document.getElementById('game-date');
    if (dateElement) {
        dateElement.textContent = `Ay ${game.month}, Hafta ${game.week}`;
    }
    const careerElement = document.getElementById('game-age');
    if (careerElement) {
        careerElement.textContent = `${weeksServed(game) + 1} / ${CAREER_WEEKS}`;
    }
}

// ==========================================================================
// MONTHLY REVIEW & UPGRADES SHOP
// ==========================================================================
function renderGoalsBanner() {
    const banner = document.getElementById('target-alert-banner');
    const desc = document.getElementById('target-description');
    if (banner && desc) {
        desc.innerHTML = game.goals.map(g => `• ${g.desc}`).join('<br>');
        banner.classList.remove('hidden');
    }
}

function effectsText(effects) {
    return Object.entries(effects)
        .map(([stat, v]) => `${v > 0 ? '+' : ''}${v} ${STAT_LABELS[stat]}`)
        .join(' / ');
}

function triggerMonthlyReview() {
    const report = closeMonth(game);

    document.getElementById('modal-month-name').textContent = `${report.month}. Ay Sonu Raporu`;

    const goalBox = document.getElementById('goal-status-box');
    const goalTitle = document.getElementById('goal-status-title');
    const goalDesc = document.getElementById('goal-status-desc');
    const goalReward = document.getElementById('goal-reward-val');

    const goalsHTML = `
        <div class="goals-list">
            ${report.goals.map(g => `
                <div class="goal-item-status ${g.isMet ? 'met' : 'unmet'}">
                    <span>
                        ${g.desc}
                    </span>
                    <span class="badge">${g.currentVal} · ${g.isMet ? 'TUTTU' : 'KAÇTI'}</span>
                </div>
            `).join('')}
        </div>
    `;

    if (report.allMet) {
        goalBox.className = 'goal-status-box success';
        goalTitle.textContent = 'Hedefler tuttu';
        goalDesc.innerHTML = goalsHTML;
        sound.playSuccess();
    } else {
        goalBox.className = 'goal-status-box failed';
        goalTitle.textContent = 'Hedef kaçtı';
        goalDesc.innerHTML = goalsHTML;
        sound.playWarning();
    }
    goalReward.textContent = effectsText(report.effects);

    goalDesc.innerHTML += `
        <div class="upkeep-note">
            <div class="receipt-row"><span>Kasadan gelen bütçe</span><span>+${formatTl(report.incomeTl)}</span></div>
            <div class="receipt-row"><span>Hedef primi</span><span>+${formatTl(report.goalBonusTl)}</span></div>
            ${report.upkeepTl ? `<div class="receipt-row"><span>Bakım giderleri</span><span>−${formatTl(report.upkeepTl)}</span></div>` : ''}
            ${report.unpaidTl ? `<div class="receipt-row warn"><span>Bütçe yetmedi, fark kasadan</span><span>−${Math.ceil(report.unpaidTl / 1000)} Kasa</span></div>` : ''}
        </div>`;

    updateStatsUI();
    if (report.ending) return finishGame();

    ui.shopOffers = rollShopOffers(game, rng);
    setupShopUI();

    document.getElementById('monthly-modal').classList.remove('hidden');
}

function updateModalStatsUI() {
    STATS.forEach(stat => {
        const bar = document.getElementById(`modal-stat-${stat}-bar`);
        const valText = document.getElementById(`modal-stat-${stat}-val`);
        const value = game.stats[stat];
        if (bar) {
            bar.style.width = `${value}%`;
            if (value < 20 || value >= 85) {
                bar.style.background = 'var(--color-danger)';
            } else if (value < 40) {
                bar.style.background = 'var(--color-warning)';
            } else {
                bar.style.background = '';
            }
        }
        if (valText) valText.textContent = `${value}%`;
    });
}

function setupShopUI() {
    updateModalStatsUI();
    document.getElementById('shop-budget-val').textContent = formatTl(game.budgetTl);
    const shopList = document.getElementById('shop-items-list');
    shopList.innerHTML = '';

    const boughtThisMonth = game.upgradesBoughtThisMonth > 0;

    ui.shopOffers.forEach(upgrade => {
        const cost = upgradeCostTl(game, upgrade);
        const isPurchased = game.upgrades.has(upgrade.id);
        const buyable = canBuy(game, upgrade);

        let label = formatTl(cost);
        let note = '';
        if (isPurchased) label = 'Alındı';
        else if (boughtThisMonth) note = 'Bu ayın hakkı kullanıldı';
        else if (!buyable) note = 'Bütçe yetmiyor';

        const itemCard = document.createElement('div');
        itemCard.className = `shop-item ${isPurchased ? 'purchased' : ''} ${buyable || isPurchased ? '' : 'unavailable'}`;
        itemCard.innerHTML = `
            <div class="shop-item-body">
                <div class="shop-item-name">${upgrade.name}</div>
                <div class="shop-item-effect">${upgrade.effectDesc}</div>
                ${note ? `<div class="shop-item-note">${note}</div>` : ''}
            </div>
            <button type="button" class="shop-buy-btn" data-id="${upgrade.id}" ${buyable ? '' : 'disabled'}>${label}</button>
        `;

        const buyBtn = itemCard.querySelector('.shop-buy-btn');
        if (buyable) buyBtn.addEventListener('click', () => buyUpgrade(upgrade));

        shopList.appendChild(itemCard);
    });
}

function buyUpgrade(upgrade) {
    if (!engineBuyUpgrade(game, upgrade)) return;
    sound.playCashRegister();
    setupShopUI();
    updateActiveUpgradesWidget();
}

function updateActiveUpgradesWidget() {
    const widget = document.getElementById('upgrades-widget');
    const list = document.getElementById('active-upgrades-list');

    if (game.upgrades.size > 0) {
        widget.classList.remove('hidden');
        list.innerHTML = '';
        shopUpgrades.forEach(upg => {
            if (game.upgrades.has(upg.id)) {
                const tag = document.createElement('span');
                tag.className = 'active-upgrade-tag';
                tag.textContent = upg.name;
                list.appendChild(tag);
            }
        });
    } else {
        widget.classList.add('hidden');
    }
}

function closeMonthlyModal() {
    document.getElementById('monthly-modal').classList.add('hidden');

    if (startNextMonth(game, rng)) return finishGame();

    renderGoalsBanner();
    updateDateUI();
    nextCard();
}

// ==========================================================================
// ENDINGS
// ==========================================================================
function endingText(ending) {
    if (ending.type === 'fired') return ENDINGS.fired[ending.stat][ending.side];
    if (ending.type === 'transferred') return ENDINGS.transferred;
    if (ending.type === 'promoted') {
        return `${weeksServed(game)} haftada mağazayı toparladın, Batıkan Bey seni yerine önerdi. Artık Bölge Müdürüsün. Annene haber ver!`;
    }
    return 'Bir yılı görevden alınmadan bitirdin. Yıl sonu değerlendirmesinde adın "yılın mağazası" listesinde.';
}

function finishGame() {
    ui.isOver = true;
    const ending = game.ending;
    const success = ending.type === 'year_complete' || ending.type === 'promoted';
    const weeks = weeksServed(game);
    const finalScore = calculateScore(game);

    if (ending.type === 'year_complete') triggerAchievementUnlock('legend');
    if (ending.type === 'promoted') triggerAchievementUnlock('promoted');

    // 1 yetenek puanı her 10 hafta için
    const earnedPoints = Math.floor(weeks / 10);
    if (earnedPoints > 0) {
        const current = parseInt(localStorage.getItem('aura_talent_points') || '0', 10) + earnedPoints;
        localStorage.setItem('aura_talent_points', current);
        ui.talentPoints = current;
    }

    if (finalScore > ui.highScore) {
        ui.highScore = finalScore;
        localStorage.setItem('high_score_points', finalScore.toString());
        updateHighScoreUI();
    }

    saveLeaderboard(finalScore);
    renderLeaderboard();

    const prefix = success ? 'retirement' : 'gameover';
    const reasonEl = document.getElementById(`${prefix}-reason`);
    reasonEl.textContent = endingText(ending);
    if (earnedPoints > 0) {
        const bonus = document.createElement('span');
        bonus.className = 'talent-bonus';
        bonus.textContent = `+${earnedPoints} Yetenek Puanı kazandın.`;
        reasonEl.appendChild(bonus);
    }

    document.getElementById(`${prefix}-tenure`).textContent = `${weeks} Hafta`;
    document.getElementById(`${prefix}-earned-score`).textContent = `${finalScore.toLocaleString('tr-TR')} Puan`;
    document.getElementById(`${prefix}-best`).textContent = `${ui.highScore.toLocaleString('tr-TR')} Puan`;

    if (success) {
        document.getElementById('retirement-title').textContent =
            ending.type === 'promoted' ? 'Anne, Bölge Müdürü Oldum!' : 'Bir Yıl Tamam!';
        document.getElementById('retirement-age').textContent = `${game.upgrades.size} geliştirme`;
        sound.playSuccess();
    } else {
        document.getElementById('gameover-title').textContent =
            ending.type === 'transferred' ? 'Tayin Edildin' : 'Görevden Alındın';
        document.getElementById('gameover-months').textContent = `${game.month - 1} Ay`;
        sound.playGameOver();
    }

    renderProgressionChart(`${prefix}-chart-container`);
    document.getElementById(success ? 'retirement-screen' : 'gameover-screen').classList.remove('hidden');
}

// Leaderboard storage logic (Supabase DB + local storage fallback)
function saveLeaderboard(score) {
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit' });

    let localScores = getLocalScores();
    localScores.push({
        name: sanitizeName(ui.playerName),
        score,
        difficulty: ui.difficulty,
        store_type: ui.storeType,
        date: dateStr
    });
    localScores.sort((a, b) => b.score - a.score);
    localScores = localScores.slice(0, 10);
    localStorage.setItem('game_leaderboard', JSON.stringify(localScores));

    saveGlobalLeaderboard(ui.playerName, score, ui.difficulty, ui.storeType);
}

function renderLeaderboard() {
    const mainList = document.getElementById('leaderboard-list');
    const retirementList = document.getElementById('retirement-leaderboard-list');
    const loading = '<li class="list-empty">Skorlar yükleniyor…</li>';

    if (mainList) mainList.innerHTML = loading;
    if (retirementList) retirementList.innerHTML = loading;

    fetchGlobalLeaderboard().then(scores => {
        if (!scores || scores.length === 0) scores = getLocalScores();

        if (scores.length === 0) {
            const noScoreHtml = '<li class="list-empty">Henüz kayıtlı skor yok.</li>';
            if (mainList) mainList.innerHTML = noScoreHtml;
            if (retirementList) retirementList.innerHTML = noScoreHtml;
            return;
        }

        if (mainList) renderScoreList(mainList, scores);
        if (retirementList) renderScoreList(retirementList, scores);
    });
}

async function fetchGlobalLeaderboard() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

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
        return Array.isArray(data) ? data.filter(isValidScoreEntry) : null;
    } catch (error) {
        console.error('Liderlik tablosu çekilemedi, yerel skorlar kullanılacak:', error);
        return null;
    }
}

async function saveGlobalLeaderboard(name, score, difficulty, storeType) {
    const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: sanitizeName(name),
                score,
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

function getLocalScores() {
    try {
        const savedScores = localStorage.getItem('game_leaderboard');
        return savedScores ? JSON.parse(savedScores) : [];
    } catch (e) {
        return [];
    }
}

function renderScoreList(listElement, scores) {
    listElement.innerHTML = '';
    scores.forEach((entry, index) => {
        const item = document.createElement('li');
        item.className = `leaderboard-item ${index === 0 ? 'top-rank' : ''}`;

        const name = escapeHtml(sanitizeName(entry.name));
        const score = Number.isFinite(Number(entry.score)) ? Number(entry.score) : 0;
        const date = escapeHtml(entry.date || '');
        const storeLabel = STORE_LABELS[entry.store_type] || 'Yeni Açılan Mağaza';
        const diffLabel = DIFFICULTY_LABELS[entry.difficulty] || 'Normal';

        item.innerHTML = `
            <div class="leaderboard-item-main">
                <span class="leaderboard-rank">#${index + 1}</span>
                <span class="leaderboard-name">${name}</span>
                <span class="leaderboard-score">${score.toLocaleString('tr-TR')} Puan</span>
            </div>
            <div class="leaderboard-item-sub">
                <span>${storeLabel} (${diffLabel})</span>
                <span class="leaderboard-date">${date}</span>
            </div>
        `;
        listElement.appendChild(item);
    });
}

function renderProgressionChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = game.history;
    if (!data || data.length < 2) {
        container.innerHTML = '<div class="list-empty">Grafik için yeterli hafta yok.</div>';
        return;
    }

    const width = container.clientWidth || 500;
    const height = 180;
    const padding = 20;
    const maxWeeks = data.length - 1;

    const getX = (week) => padding + (week / Math.max(1, maxWeeks)) * (width - 2 * padding);
    const getY = (val) => height - padding - (val / 100) * (height - 2 * padding);

    const line = (stat) => data.map(d => `${getX(d.week)},${getY(d[stat])}`).join(' ');
    const colors = { staff: 'var(--color-staff)', customer: 'var(--color-customer)', hq: 'var(--color-hq)', finance: 'var(--color-finance)' };

    container.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
            ${[0, 25, 50, 75, 100].map(v => `<line x1="${padding}" y1="${getY(v)}" x2="${width - padding}" y2="${getY(v)}" class="svg-grid-line" />`).join('')}
            <text x="${padding - 5}" y="${getY(0) + 3}" text-anchor="end" class="svg-grid-text">0</text>
            <text x="${padding - 5}" y="${getY(50) + 3}" text-anchor="end" class="svg-grid-text">50</text>
            <text x="${padding - 5}" y="${getY(100) + 3}" text-anchor="end" class="svg-grid-text">100</text>
            <text x="${padding}" y="${height - 4}" text-anchor="start" class="svg-grid-text">Hafta 0</text>
            <text x="${width - padding}" y="${height - 4}" text-anchor="end" class="svg-grid-text">Hafta ${maxWeeks}</text>
            ${STATS.map(stat => `<polyline fill="none" stroke="${colors[stat]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${line(stat)}" />`).join('')}
        </svg>
    `;
}
