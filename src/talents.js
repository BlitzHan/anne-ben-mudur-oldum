export const TALENTS = [
    {
        id: "leadership",
        name: "Liderlik Eğitimi",
        desc: "Haftalık personel moral kayıplarını %10 hafifletir.",
        cost: 1,
        emoji: "👑",
        req: null
    },
    {
        id: "crm",
        name: "CRM Entegrasyonu",
        desc: "Haftalık müşteri deneyimi artışlarını %15 güçlendirir.",
        cost: 1,
        emoji: "📊",
        req: null
    },
    {
        id: "quick_start",
        name: "Hızlı Finans",
        desc: "Oyuna başlarken fazladan +5% Finans (kasa bütçesi) kazandırır.",
        cost: 1,
        emoji: "💰",
        req: null
    },
    {
        id: "negotiation",
        name: "Pazarlık Ustalığı",
        desc: "Ay sonundaki mağaza geliştirme (upgrades) fiyatlarını %20 ucuzlatır.",
        cost: 2,
        emoji: "🤝",
        req: "leadership"
    },
    {
        id: "aura_vision",
        name: "Aura Vizyonu",
        desc: "Ay sonu hedef limitlerini %5 daha düşük tutar (örn: %60 yerine %55).",
        cost: 2,
        emoji: "👁️",
        req: "crm"
    },
    {
        id: "crisis_resilience",
        name: "Kriz Direnci",
        desc: "Herhangi bir istatistik %15'in altına düştüğünde, ceza etkilerini yarı yarıya azaltır.",
        cost: 3,
        emoji: "🛡️",
        req: null
    }
];
