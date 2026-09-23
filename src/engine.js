// Oyun kuralları. DOM'a, localStorage'a ve Math.random'a dokunmaz: tüm
// rastgelelik dışarıdan verilen rng() ile gelir. Böylece aynı kurallar hem
// tarayıcıda (main.js) hem de denge simülasyonunda (tools/sim.js) çalışır.
import { events } from './events.js';
import { shopUpgrades } from './shop.js';

export const STATS = ['staff', 'customer', 'hq', 'finance'];

export const RULES = {
    weeksPerMonth: 4,
    monthsPerCareer: 12,
    startStats: { staff: 55, customer: 55, hq: 50, finance: 50 },

    // Kart verisindeki ham etkiler bu oranla küçültülür (0-100 barda
    // tek kararın 35 puan oynatması fazla sertti).
    effectScale: 0.7,
    // Ölçeklenmiş |etki| bu değer ve üstündeyse "büyük nokta" gösterilir.
    bigEffect: 10,

    weeklyFinanceCost: 1,
    weeklyFinanceChance: 0.35, // kira/maaş baskısı: her hafta %35 ihtimalle -1 Kasa
    weeklyWearChance: 0.4,

    // Ay sonu pasif geliştirme bonusları barı bu değerin üstüne itemez;
    // oyuncu kendi kararı olmadan tavandan ölmesin.
    passiveBonusCeiling: 92,

    goalReward: { hq: 4 },
    goalPenalty: { hq: -6 },
    goalBonusTl: 4000,
    budgetPerKasaPoint: 200,
    upkeepToKasaTl: 1000, // karşılanamayan her ₺1.000 bakım = -1 Kasa
    upgradeTlPerPoint: 1000,
    upgradesPerMonth: 1,

    // Bölge 100'e ulaşınca terfi; ama erken ya da mağaza dağınıkken olursa
    // terfi değil merkez ofise tayin edilir (oyun biter, bonus yok).
    promotionMinWeek: 24,
    promotionMinOtherStat: 40
};

export const STORE_TYPES = ['new_store', 'old_store', 'near_hq'];
export const DIFFICULTIES = ['easy', 'normal', 'hard'];

// ==========================================================================
// RNG
// ==========================================================================
export function createRng(seed = Date.now()) {
    let a = seed >>> 0;
    return function mulberry32() {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffle(array, rng) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const clamp = (v) => Math.max(0, Math.min(100, v));

// ==========================================================================
// STATE
// ==========================================================================
export function isBaseCard(event) {
    return !event.id.startsWith('campaign_') && !event.isChainCard;
}

export function newGame({ storeType = 'new_store', difficulty = 'normal', talents = [] } = {}) {
    const state = {
        storeType,
        difficulty,
        talents: [...talents],
        stats: { ...RULES.startStats },
        week: 1,
        month: 1,
        budgetTl: 0,
        upgrades: new Set(),
        upgradesBoughtThisMonth: 0,
        goals: [],
        deck: [],
        currentEvent: null,
        nextChainCardId: null,
        queuedEvents: [],
        activeCampaign: null,
        campaignWeeksLeft: 0,
        blackFridayWarning: false,
        history: [],
        ending: null
    };
    if (state.talents.includes('quick_start')) {
        state.stats.finance = clamp(state.stats.finance + 5);
    }
    state.history.push({ week: 0, ...state.stats });
    return state;
}

export function weeksServed(state) {
    return (state.month - 1) * RULES.weeksPerMonth + state.week - 1;
}

// ==========================================================================
// DRAWING CARDS
// ==========================================================================
const CAMPAIGNS = [
    { week: 12, id: 'black_friday', weeks: 3, intro: 'campaign_black_friday_intro' },
    { week: 24, id: 'new_year', weeks: 3, intro: 'campaign_new_year_intro' },
    { week: 36, id: 'audit', weeks: 2, intro: 'campaign_audit_intro' }
];

function isSkipped(state, event) {
    return event.id === 'ac_broke' && state.upgrades.has('heavy_duty_ac');
}

function drawFromDeck(state, rng) {
    for (let guard = 0; guard < 200; guard++) {
        if (state.deck.length === 0) {
            state.deck = shuffle(events.filter(isBaseCard), rng);
        }
        const event = state.deck.pop();
        if (!isSkipped(state, event)) return event;
    }
    throw new Error('Desteden çekilebilecek kart kalmadı');
}

export function drawEvent(state, rng) {
    const absoluteWeek = weeksServed(state) + 1;
    let event = null;

    const campaign = CAMPAIGNS.find(c => c.week === absoluteWeek);
    if (campaign) {
        state.activeCampaign = campaign.id;
        state.campaignWeeksLeft = campaign.weeks;
        state.blackFridayWarning = false;
        event = events.find(e => e.id === campaign.intro);
    }

    // Gecikmeli olayların sayacı her hafta işler, kart nereden gelirse gelsin.
    state.queuedEvents.forEach(q => q.delayWeeks--);

    if (!event && state.nextChainCardId) {
        event = events.find(e => e.id === state.nextChainCardId);
        state.nextChainCardId = null;
    }

    if (!event) {
        const readyIdx = state.queuedEvents.findIndex(q => q.delayWeeks <= 0);
        if (readyIdx !== -1) {
            const ready = state.queuedEvents.splice(readyIdx, 1)[0];
            event = events.find(e => e.id === ready.eventId);
        }
    }

    if (!event) event = drawFromDeck(state, rng);

    state.currentEvent = event;
    return event;
}

// ==========================================================================
// EFFECTS
// ==========================================================================
export function modifiedEffect(state, stat, raw, eventId) {
    let v = raw * RULES.effectScale;

    // İki uç da öldürdüğü için zorluk kayıpları değil tüm oynamaları ölçekler.
    if (state.difficulty === 'easy') v *= 0.8;
    else if (state.difficulty === 'hard') v *= 1.15;

    if (state.storeType === 'new_store') {
        if (stat === 'staff' && v < 0) v *= 0.8;
        if ((stat === 'finance' || stat === 'customer') && v < 0) v *= 1.2;
    } else if (state.storeType === 'old_store') {
        if (stat === 'staff' && v < 0) v *= 0.8;
        if (stat === 'customer' && v < 0) v *= 1.2;
    } else if (state.storeType === 'near_hq') {
        if (stat === 'finance' && v > 0) v *= 1.2;
        if (stat === 'hq' && v < 0) v *= 1.2;
    }

    if (state.activeCampaign === 'black_friday') {
        if (stat === 'finance' && v > 0) v *= 1.5;
        if (stat === 'staff' && v < 0) v *= 1.5;
    } else if (state.activeCampaign === 'new_year') {
        if (stat === 'customer') v *= 1.4;
        if (stat === 'finance' && v > 0) v *= 1.2;
    } else if (state.activeCampaign === 'audit') {
        if (stat === 'hq') v *= 1.6;
    }

    if (v < 0) {
        if (state.upgrades.has('security_cams')
            && (eventId === 'stolen_headphones' || eventId === 'night_robbery')
            && (stat === 'finance' || stat === 'hq')) {
            v *= 0.5;
        }
        if (state.upgrades.has('ergonomic_chairs')
            && (eventId === 'yearly_count' || eventId === 'district_manager')
            && stat === 'staff') {
            v *= 0.7;
        }
    }

    if (stat === 'staff' && v < 0 && state.talents.includes('leadership')) v *= 0.9;
    if (stat === 'customer' && v > 0 && state.talents.includes('crm')) v *= 1.15;
    if (state.talents.includes('crisis_resilience')) {
        // Kenara yakın bar, kenara doğru iten etkiyi yarıya indirir (iki yönde de).
        const s = state.stats[stat];
        if ((v < 0 && s < 15) || (v > 0 && s > 85)) v *= 0.5;
    }

    if (v === 0) return 0;
    return Math.sign(v) * Math.max(1, Math.round(Math.abs(v)));
}

// Oyuncuya gösterilecek ipucu: her bar için 0 (dokunmaz), 1 (hafif), 2 (sert)
// ve yön. Arayüz zorluğa göre yönü ya da büyüklüğü gizler.
export function previewOption(state, option, eventId) {
    const preview = {};
    STATS.forEach(stat => {
        const v = modifiedEffect(state, stat, option.effect[stat] || 0, eventId);
        preview[stat] = {
            magnitude: v === 0 ? 0 : (Math.abs(v) >= RULES.bigEffect ? 2 : 1),
            direction: Math.sign(v)
        };
    });
    return preview;
}

function applyDelta(state, stat, delta) {
    state.stats[stat] = clamp(state.stats[stat] + delta);
}

export function checkEnding(state) {
    for (const stat of STATS) {
        if (state.stats[stat] <= 0) return { type: 'fired', stat, side: 'low' };
    }
    for (const stat of STATS) {
        if (state.stats[stat] >= 100) {
            if (stat === 'hq') {
                const storeHealthy = STATS.every(s => s === 'hq' || state.stats[s] >= RULES.promotionMinOtherStat);
                return weeksServed(state) >= RULES.promotionMinWeek && storeHealthy
                    ? { type: 'promoted', stat }
                    : { type: 'transferred', stat };
            }
            return { type: 'fired', stat, side: 'high' };
        }
    }
    return null;
}

// Seçimi uygular. Dönüş: { deltas, hadLowStat, ending }
export function applyChoice(state, optionIdx) {
    const event = state.currentEvent;
    const option = event.options[optionIdx];

    state.nextChainCardId = option.nextChainCardId || null;
    if (option.queueEvent) {
        state.queuedEvents.push({ ...option.queueEvent });
    }

    const hadLowStat = STATS.some(s => state.stats[s] < 10);
    const deltas = {};
    STATS.forEach(stat => {
        const v = modifiedEffect(state, stat, option.effect[stat] || 0, event.id);
        deltas[stat] = v;
        applyDelta(state, stat, v);
    });

    if (state.activeCampaign === 'black_friday' && STATS.some(s => state.stats[s] < 20)) {
        state.blackFridayWarning = true;
    }

    state.ending = checkEnding(state);
    return { deltas, hadLowStat, ending: state.ending };
}

// Haftayı kapatır: sabit giderler, yıpranma, kampanya sayacı, takvim.
// Dönüş: { ending, monthEnded, campaignEnded }
export function endWeek(state, rng) {
    if (rng() < RULES.weeklyFinanceChance) applyDelta(state, 'finance', -RULES.weeklyFinanceCost);
    if (rng() < RULES.weeklyWearChance) {
        applyDelta(state, rng() < 0.5 ? 'staff' : 'customer', -1);
    }

    state.ending = checkEnding(state);
    if (state.ending) return { ending: state.ending, monthEnded: false, campaignEnded: null };

    let campaignEnded = null;
    if (state.activeCampaign && state.campaignWeeksLeft > 0) {
        state.campaignWeeksLeft -= 1;
        if (state.campaignWeeksLeft === 0) {
            campaignEnded = { id: state.activeCampaign, clean: !state.blackFridayWarning };
            state.activeCampaign = null;
        }
    }

    state.week += 1;
    state.history.push({ week: weeksServed(state), ...state.stats });

    return { ending: null, monthEnded: state.week > RULES.weeksPerMonth, campaignEnded };
}

// ==========================================================================
// MONTHLY GOALS, BUDGET & SHOP
// ==========================================================================
const GOAL_TEXT = {
    customer: (v) => `Müşteri deneyimi en az %${v}`,
    staff: (v) => `Personel morali en az %${v}`,
    finance: (v) => `Kasa en az %${v}`,
    hq: (v) => `Bölge memnuniyeti en az %${v}`
};

export function assignGoals(state, rng) {
    const m = state.month;
    const count = m > 8 ? 3 : (m > 3 ? 2 : 1);
    // Tavan ölümcül olduğu için hedefler 70'i geçmez.
    const targets = [
        Math.min(70, 50 + m * 2),
        Math.min(60, 40 + m * 2),
        Math.min(55, 35 + m * 2)
    ];
    const types = shuffle(STATS, rng);
    state.goals = [];
    for (let i = 0; i < count; i++) {
        let minVal = targets[i];
        if (state.talents.includes('aura_vision')) minVal = Math.max(20, minVal - 5);
        state.goals.push({ type: types[i], minVal, desc: GOAL_TEXT[types[i]](minVal) });
    }
    return state.goals;
}

export function upgradeCostTl(state, upgrade) {
    let cost = upgrade.cost * RULES.upgradeTlPerPoint;
    if (state.talents.includes('negotiation')) cost = Math.round(cost * 0.8 / 1000) * 1000;
    return cost;
}

export function upgradeUpkeepTl(upgrade) {
    return (upgrade.monthlyUpkeep || 0) * RULES.upkeepToKasaTl;
}

// Ay sonu değerlendirmesi. Barları ve bütçeyi günceller, rapor döner.
export function closeMonth(state) {
    const goals = state.goals.map(g => ({
        ...g,
        currentVal: state.stats[g.type],
        isMet: state.stats[g.type] >= g.minVal
    }));
    const metCount = goals.filter(g => g.isMet).length;
    const allMet = metCount === goals.length;

    const effects = allMet ? RULES.goalReward : RULES.goalPenalty;
    Object.entries(effects).forEach(([stat, v]) => applyDelta(state, stat, v));

    const incomeTl = state.stats.finance * RULES.budgetPerKasaPoint;
    const goalBonusTl = metCount * RULES.goalBonusTl;

    let upkeepTl = 0;
    shopUpgrades.forEach(upg => {
        if (!state.upgrades.has(upg.id)) return;
        Object.entries(upg.monthlyBonus || {}).forEach(([stat, v]) => {
            if (!v) return;
            const cur = state.stats[stat];
            const next = v > 0 ? Math.min(Math.max(cur, RULES.passiveBonusCeiling), cur + v) : cur + v;
            state.stats[stat] = clamp(next);
        });
        upkeepTl += upgradeUpkeepTl(upg);
    });

    state.budgetTl += incomeTl + goalBonusTl;
    let unpaidTl = 0;
    if (upkeepTl > state.budgetTl) {
        unpaidTl = upkeepTl - state.budgetTl;
        state.budgetTl = 0;
        applyDelta(state, 'finance', -Math.ceil(unpaidTl / RULES.upkeepToKasaTl));
    } else {
        state.budgetTl -= upkeepTl;
    }

    state.upgradesBoughtThisMonth = 0;
    state.ending = checkEnding(state);

    return {
        month: state.month,
        goals,
        allMet,
        effects,
        incomeTl,
        goalBonusTl,
        upkeepTl,
        unpaidTl,
        budgetTl: state.budgetTl,
        ending: state.ending
    };
}

export function rollShopOffers(state, rng, count = 3) {
    const available = shopUpgrades.filter(u => !state.upgrades.has(u.id));
    return shuffle(available, rng).slice(0, count);
}

export function canBuy(state, upgrade) {
    return !state.upgrades.has(upgrade.id)
        && state.upgradesBoughtThisMonth < RULES.upgradesPerMonth
        && state.budgetTl >= upgradeCostTl(state, upgrade);
}

export function buyUpgrade(state, upgrade) {
    if (!canBuy(state, upgrade)) return false;
    state.budgetTl -= upgradeCostTl(state, upgrade);
    state.upgrades.add(upgrade.id);
    state.upgradesBoughtThisMonth += 1;
    return true;
}

// Yeni aya geçer. Kariyer (1 yıl) bittiyse ending döner.
export function startNextMonth(state, rng) {
    state.week = 1;
    state.month += 1;
    if (state.month > RULES.monthsPerCareer) {
        state.month = RULES.monthsPerCareer + 1;
        state.ending = { type: 'year_complete' };
        return state.ending;
    }
    assignGoals(state, rng);
    return null;
}

// ==========================================================================
// SCORE
// ==========================================================================
export const CAREER_WEEKS = RULES.weeksPerMonth * RULES.monthsPerCareer;

export function calculateScore(state) {
    const ending = state.ending || {};
    const promoted = ending.type === 'promoted';
    // Terfi eden müdür yılın kalanını da "görevde" sayılır.
    const weeks = promoted ? CAREER_WEEKS : Math.min(CAREER_WEEKS, weeksServed(state));

    // Barların ortası sağlıklı: 50'ye yakınlık ödüllendirilir (0-100 arası puan).
    let balance = 0;
    if (state.history.length > 0) {
        const sum = state.history.reduce((acc, h) =>
            acc + STATS.reduce((a, s) => a + (50 - Math.abs(h[s] - 50)) * 2, 0) / STATS.length, 0);
        balance = sum / state.history.length;
    }

    let endingBonus = 0;
    if (ending.type === 'year_complete') endingBonus = 3000;
    if (promoted) endingBonus = 3500;

    return weeks * 100 + Math.round(balance * 30) + endingBonus;
}

// Skor tablosunun kabul edeceği üst sınır (src/main.js ve SQL ile aynı).
export const SCORE_MAX = CAREER_WEEKS * 100 + 100 * 30 + 3500;
