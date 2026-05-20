export const shopUpgrades = [
    {
        id: "staff_meal",
        name: "Müşteri Yorumlu Yemek Ödülü",
        desc: "Müşterilerden iyi yorum alan personele AVM yemek katındaki lüks restoranlarda yemek ısmarlanır. Hizmet kalitesini artırır.",
        cost: 10,
        emoji: "🍔",
        effectDesc: "Her ay sonu +4% Personel Morali, +4% Müşteri Deneyimi",
        monthlyBonus: { staff: 4, customer: 4, hq: 0, finance: 0 }
    },
    {
        id: "store_breakfast",
        name: "AVM Kahvaltı Etkinliği",
        desc: "Mağaza açılışından önce AVM kafesinde tüm ekiple kahvaltı düzenlenir. Takım bağlarını güçlendirir ve motivasyonu tazeler.",
        cost: 12,
        emoji: "🥞",
        effectDesc: "Her ay sonu +6% Personel Morali",
        monthlyBonus: { staff: 6, customer: 0, hq: 0, finance: 0 }
    },
    {
        id: "gym_deal",
        name: "AVM MacFit Spor Anlaşması",
        desc: "AVM içindeki premium spor salonuyla kurumsal anlaşma yapılır; personeller ucuza spor yapabilir.",
        cost: 14,
        emoji: "💪",
        effectDesc: "Her ay sonu +5% Personel Morali, +2% Bölge Mutluluk",
        monthlyBonus: { staff: 5, customer: 0, hq: 2, finance: 0 }
    },
    {
        id: "health_insurance",
        name: "Özel Sağlık Sigortası",
        desc: "Tüm personele özel sağlık sigortası yaptırılır. Çalışanların bağlılığını ve motivasyonunu zirveye taşır.",
        cost: 18,
        emoji: "🏥",
        effectDesc: "Her ay sonu +7% Personel Morali, +3% Bölge Mutluluk",
        monthlyBonus: { staff: 7, customer: 0, hq: 3, finance: 0 }
    },
    {
        id: "security_cams",
        name: "AVM iCam Güvenlik Entegrasyonu",
        desc: "AVM'nin ana güvenlik sistemiyle entegre Aura iCam kameraları. Hırsızlık ve soygun olaylarındaki kayıpları %50 azaltır.",
        cost: 16,
        emoji: "🛡️",
        effectDesc: "Hırsızlık olaylarındaki kayıpları %50 azaltır, her ay sonu +2% Bölge Mutluluk",
        monthlyBonus: { staff: 0, customer: 0, hq: 2, finance: 0 }
    },
    {
        id: "heavy_duty_ac",
        name: "AVM Klima & Vent Entegrasyonu",
        desc: "AVM'nin merkezi havalandırma altyapısına doğrudan bağlantı güncellemesi. Cam binanın ısınma krizlerini tamamen engeller.",
        cost: 15,
        emoji: "❄️",
        effectDesc: "Her ay sonu +3% Müşteri Deneyimi, klima arızası riskini ortadan kaldırır",
        monthlyBonus: { staff: 0, customer: 3, hq: 0, finance: 0 }
    },
    {
        id: "ergonomic_chairs",
        name: "Ergonomik Personel Koltukları",
        desc: "Kasadaki ve teknik ofisteki çalışanlar için vücut destekli ortopedik tasarım sandalyeler satın alınır.",
        cost: 10,
        emoji: "💺",
        effectDesc: "Her ay sonu +3% Personel Morali, sayım/denetim kayıplarını %30 hafifletir",
        monthlyBonus: { staff: 3, customer: 0, hq: 0, finance: 0 }
    }
];
