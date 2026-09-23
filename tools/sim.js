// Denge simülasyonu: aynı motoru farklı oyuncu tipleriyle binlerce kez oynatır.
//   node tools/sim.js            (varsayılan: normal zorluk, 2000 oyun)
//   node tools/sim.js hard 5000
import {
    STATS, CAREER_WEEKS, createRng, newGame, drawEvent, applyChoice, endWeek,
    assignGoals, closeMonth, rollShopOffers, canBuy, buyUpgrade, startNextMonth,
    modifiedEffect, weeksServed, calculateScore, RULES
} from '../src/engine.js';

// Kural denemek için: RULES='{"effectScale":0.6}' node tools/sim.js
if (process.env.RULES) Object.assign(RULES, JSON.parse(process.env.RULES));

const difficulty = process.argv[2] || 'normal';
const runs = Number(process.argv[3] || 2000);

// Seçeneğin sonucundaki "güvenlik": en tehlikeli barın kenara uzaklığı.
function safetyAfter(state, option, eventId) {
    let worst = Infinity;
    let total = 0;
    STATS.forEach(stat => {
        const v = state.stats[stat] + modifiedEffect(state, stat, option.effect[stat] || 0, eventId);
        const edge = Math.min(v, 100 - v);
        worst = Math.min(worst, edge);
        total += edge;
    });
    return worst * 1000 + total;
}

// Hikâyeyi okuyup doğru tahmin etme olasılığı `skill` olan oyuncu.
// skill 0 = zar atan, 1 = etkileri birebir bilen.
function reader(skill) {
    return (state, event, rng) => {
        if (rng() >= skill) return Math.floor(rng() * event.options.length);
        let best = 0;
        let bestScore = -Infinity;
        event.options.forEach((opt, i) => {
            const s = safetyAfter(state, opt, event.id);
            if (s > bestScore) { bestScore = s; best = i; }
        });
        return best;
    };
}

// 3. aydan sonra Bölge'yi bilerek tavana iten, diğer barları koruyan oyuncu.
function promotionHunter(state, event, rng) {
    if (weeksServed(state) < RULES.promotionMinWeek - 4) return reader(0.8)(state, event, rng);
    let best = 0;
    let bestScore = -Infinity;
    event.options.forEach((opt, i) => {
        let worstOther = Infinity;
        let hq = 0;
        STATS.forEach(stat => {
            const v = state.stats[stat] + modifiedEffect(state, stat, opt.effect[stat] || 0, event.id);
            if (stat === 'hq') hq = v;
            else worstOther = Math.min(worstOther, Math.min(v, 100 - v));
        });
        const s = (worstOther >= 45 ? 1e6 : worstOther * 1e4) + hq;
        if (s > bestScore) { bestScore = s; best = i; }
    });
    return best;
}

const POLICIES = {
    'zar atan': reader(0),
    'okuyan %60': reader(0.6),
    'okuyan %80': reader(0.8),
    'her şeyi bilen': reader(1),
    'terfi avcısı': promotionHunter
};

function play(policy, seed) {
    const rng = createRng(seed);
    const state = newGame({ difficulty, storeType: ['new_store', 'old_store', 'near_hq'][seed % 3] });
    assignGoals(state, rng);
    let goalsHit = 0;
    let months = 0;

    for (let guard = 0; guard < 1000; guard++) {
        const event = drawEvent(state, rng);
        const { ending } = applyChoice(state, policy(state, event, rng));
        if (ending) break;
        const week = endWeek(state, rng);
        if (week.ending) break;
        if (week.monthEnded) {
            const report = closeMonth(state);
            months++;
            if (report.allMet) goalsHit++;
            if (report.ending) break;
            const offer = rollShopOffers(state, rng).find(u => canBuy(state, u));
            if (offer) buyUpgrade(state, offer);
            if (startNextMonth(state, rng)) break;
        }
    }
    return {
        weeks: state.ending.type === 'promoted' ? weeksServed(state) : Math.min(CAREER_WEEKS, weeksServed(state)),
        ending: state.ending,
        score: calculateScore(state),
        goalRate: months ? goalsHit / months : 0,
        upgrades: state.upgrades.size
    };
}

const pct = (n, d) => `${Math.round((n / d) * 100)}%`.padStart(4);
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

console.log(`\nZorluk: ${difficulty} · ${runs} oyun/tip · kariyer ${CAREER_WEEKS} hafta\n`);
console.log('oyuncu           ort.hafta  yılı bitirdi  terfi  tayin  ort.skor  hedef  en çok öldüren');
for (const [name, policy] of Object.entries(POLICIES)) {
    const results = [];
    for (let i = 0; i < runs; i++) results.push(play(policy, i + 1));

    const causes = {};
    results.forEach(r => {
        if (r.ending.type !== 'fired') return;
        const key = `${r.ending.stat}${r.ending.side === 'high' ? '↑' : '↓'}`;
        causes[key] = (causes[key] || 0) + 1;
    });
    const topCauses = Object.entries(causes).sort((a, b) => b[1] - a[1]).slice(0, 3)
        .map(([k, n]) => `${k} ${pct(n, runs).trim()}`).join(', ');

    const count = (t) => results.filter(r => r.ending.type === t).length;
    console.log(
        name.padEnd(16),
        String(median(results.map(r => r.weeks))).padStart(9),
        pct(count('year_complete'), runs).padStart(13),
        pct(count('promoted'), runs).padStart(6),
        pct(count('transferred'), runs).padStart(6),
        String(Math.round(results.reduce((a, r) => a + r.score, 0) / runs)).padStart(9),
        pct(results.reduce((a, r) => a + r.goalRate, 0), runs).padStart(6),
        ' ' + topCauses
    );
}
console.log('\n(ort.hafta = ortanca; ↓ barın sıfırlanması, ↑ tavana vurması)\n');
