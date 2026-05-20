export const shopUpgrades = [
    {
        id: "coffee_machine",
        name: "Personel Odası Kahve İstasyonu",
        desc: "Personel dinlenme odasına profesyonel kahve makinesi kurulur. Ekip molalarda zinde kalır.",
        cost: 15,
        emoji: "☕",
        effectDesc: "Her ay sonu +6% Personel Morali",
        monthlyBonus: { staff: 6, customer: 0, hq: 0, finance: 0 }
    },
    {
        id: "charging_station",
        name: "Aura MagSafe Şarj Standı",
        desc: "Teşhir masalarının ortasına müşterilerin AuraPhone'larını kablosuz şarj edebileceği lüks MagSafe stantları kurulur.",
        cost: 12,
        emoji: "⚡",
        effectDesc: "Her ay sonu +5% Müşteri Deneyimi",
        monthlyBonus: { staff: 0, customer: 5, hq: 0, finance: 0 }
    },
    {
        id: "security_cams",
        name: "Aura iCam Güvenlik Sistemi",
        desc: "Mağazanın her köşesini tarayan yüksek çözünürlüklü yapay zeka entegrasyonlu iCam kameraları.",
        cost: 18,
        emoji: "🛡️",
        effectDesc: "Hırsızlık ve soygun olaylarındaki bütçe kaybını %50 azaltır",
        monthlyBonus: { staff: 0, customer: 0, hq: 2, finance: 0 }
    },
    {
        id: "sales_training",
        name: "Aura Satış Kültürü Eğitimi",
        desc: "Ekibe premium müşteri ikna teknikleri eğitimi verilir. Ek aksesuar ve sigorta paket satışları kolaylaşır.",
        cost: 20,
        emoji: "🎓",
        effectDesc: "Her ay sonu +5% Kasa Bütçesi (Ekstra Satışlar)",
        monthlyBonus: { staff: 0, customer: 0, hq: 0, finance: 5 }
    },
    {
        id: "ergonomic_chairs",
        name: "Tasarım Ödüllü Ergonomik Sandalyeler",
        desc: "Kasadaki çalışanlar ve teknik masa personeli için vücut destekli, ortopedik tasarım sandalyeler satın alınır.",
        cost: 10,
        emoji: "💺",
        effectDesc: "Her ay sonu +3% Personel Morali, sayım/denetim kayıplarını %30 hafifletir",
        monthlyBonus: { staff: 3, customer: 0, hq: 0, finance: 0 }
    },
    {
        id: "heavy_duty_ac",
        name: "Merkezi İklimlendirme Güncellemesi",
        desc: "Store'un havalandırma altyapısı komple yenilenir. Cam binanın aşırı ısınma riskini tamamen yok eder.",
        cost: 16,
        emoji: "❄️",
        effectDesc: "Her ay sonu +3% Müşteri Deneyimi, cam bina iklimlendirme arızası riskini ortadan kaldırır",
        monthlyBonus: { staff: 0, customer: 3, hq: 0, finance: 0 }
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
        id: "ambient_system",
        name: "Koku & Müzik Yönetim Sistemi",
        desc: "Mağaza içine rahatlatıcı Aura-Freş kokusu salgılanır ve arka planda lo-fi müzikler çalınır.",
        cost: 10,
        emoji: "🎵",
        effectDesc: "Her ay sonu +4% Müşteri Deneyimi, +1% Bölge Mutluluk",
        monthlyBonus: { staff: 0, customer: 4, hq: 1, finance: 0 }
    },
    {
        id: "smart_lighting",
        name: "Akıllı Işıklandırma Entegrasyonu",
        desc: "Günün saatine ve mağaza içi müşteri yoğunluğuna göre rengini ayarlayan tasarruflu LED aydınlatma panelleri.",
        cost: 12,
        emoji: "💡",
        effectDesc: "Her ay sonu +2% Müşteri Deneyimi, +2% Kasa Bütçesi (Enerji Tasarrufu)",
        monthlyBonus: { staff: 0, customer: 2, hq: 0, finance: 2 }
    },
    {
        id: "team_uniforms",
        name: "Ekip Üniformaları & Tasarım",
        desc: "Aura Store markasına uygun özel tasarım modern ve esnek kumaş tişörtler üretilir.",
        cost: 9,
        emoji: "👕",
        effectDesc: "Her ay sonu +2% Personel Morali, +3% Bölge Mutluluk",
        monthlyBonus: { staff: 2, customer: 0, hq: 3, finance: 0 }
    },
    {
        id: "vr_experience",
        name: "VR Deneyim Alanı",
        desc: "Mağazanın bir köşesine müşterilerin yeni Aura-VR gözlüklerini test edebileceği stantlar kurulur.",
        cost: 20,
        emoji: "🥽",
        effectDesc: "Her ay sonu +8% Müşteri Deneyimi, -2% Personel Morali (Yoğun ilgi)",
        monthlyBonus: { staff: -2, customer: 8, hq: 0, finance: 0 }
    }
];
