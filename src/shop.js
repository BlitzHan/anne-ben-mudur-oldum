export const shopUpgrades = [
    {
        id: "coffee_machine",
        name: "Personel Odası Kahve İstasyonu",
        desc: "Personel dinlenme odasına profesyonel kahve makinesi kurulur. Ekip molalarda zinde kalır. Çekirdek ve filtre tedariki her ay cepten çıkar.",
        cost: 15,
        emoji: "☕",
        effectDesc: "Her ay sonu +4% Personel Morali · Bakım: -2% Kasa (kahve tedariki)",
        monthlyBonus: { staff: 4, customer: 0, hq: 0, finance: 0 },
        monthlyUpkeep: 2
    },
    {
        id: "charging_station",
        name: "Aura MagSafe Şarj Standı",
        desc: "Teşhir masalarının ortasına müşterilerin AuraPhone'larını kablosuz şarj edebileceği lüks MagSafe stantları kurulur. Elektrik tüketimi faturaya yansır.",
        cost: 12,
        emoji: "⚡",
        effectDesc: "Her ay sonu +3% Müşteri Deneyimi · Bakım: -1% Kasa (elektrik)",
        monthlyBonus: { staff: 0, customer: 3, hq: 0, finance: 0 },
        monthlyUpkeep: 1
    },
    {
        id: "security_cams",
        name: "Aura iCam Güvenlik Sistemi",
        desc: "Mağazanın her köşesini tarayan yüksek çözünürlüklü yapay zeka entegrasyonlu iCam kameraları. Kayıt sunucusu aboneliği aylık ödenir.",
        cost: 18,
        emoji: "🛡️",
        effectDesc: "Hırsızlık ve soygun olaylarındaki kayıpları %50 azaltır · +1% Bölge · Bakım: -1% Kasa",
        monthlyBonus: { staff: 0, customer: 0, hq: 1, finance: 0 },
        monthlyUpkeep: 1
    },
    {
        id: "sales_training",
        name: "Aura Satış Kültürü Eğitimi",
        desc: "Ekibe premium müşteri ikna teknikleri eğitimi verilir. Ek aksesuar ve sigorta paket satışları kolaylaşır.",
        cost: 20,
        emoji: "🎓",
        effectDesc: "Her ay sonu +3% Kasa Bütçesi (Ekstra Satışlar)",
        monthlyBonus: { staff: 0, customer: 0, hq: 0, finance: 3 },
        monthlyUpkeep: 0
    },
    {
        id: "ergonomic_chairs",
        name: "Tasarım Ödüllü Ergonomik Sandalyeler",
        desc: "Kasadaki çalışanlar ve teknik masa personeli için vücut destekli, ortopedik tasarım sandalyeler satın alınır.",
        cost: 10,
        emoji: "💺",
        effectDesc: "Her ay sonu +2% Personel Morali, sayım/denetim kayıplarını %30 hafifletir",
        monthlyBonus: { staff: 2, customer: 0, hq: 0, finance: 0 },
        monthlyUpkeep: 0
    },
    {
        id: "heavy_duty_ac",
        name: "Merkezi İklimlendirme Güncellemesi",
        desc: "Store'un havalandırma altyapısı komple yenilenir. Cam binanın aşırı ısınma riskini tamamen yok eder. Enerji tüketimi yüksektir.",
        cost: 16,
        emoji: "❄️",
        effectDesc: "Her ay sonu +2% Müşteri Deneyimi, iklimlendirme arızası riskini yok eder · Bakım: -1% Kasa",
        monthlyBonus: { staff: 0, customer: 2, hq: 0, finance: 0 },
        monthlyUpkeep: 1
    },
    {
        id: "store_breakfast",
        name: "AVM Kahvaltı Etkinliği",
        desc: "Her ay mağaza açılışından önce AVM kafesinde tüm ekiple kahvaltı düzenlenir. Takım bağlarını güçlendirir ve motivasyonu tazeler.",
        cost: 12,
        emoji: "🥞",
        effectDesc: "Her ay sonu +4% Personel Morali · Bakım: -2% Kasa (etkinlik gideri)",
        monthlyBonus: { staff: 4, customer: 0, hq: 0, finance: 0 },
        monthlyUpkeep: 2
    },
    {
        id: "gym_deal",
        name: "AVM MacFit Spor Anlaşması",
        desc: "AVM içindeki premium spor salonuyla kurumsal anlaşma yapılır; personeller ucuza spor yapabilir. Kurumsal aidat her ay ödenir.",
        cost: 14,
        emoji: "💪",
        effectDesc: "Her ay sonu +3% Personel Morali, +1% Bölge · Bakım: -2% Kasa (aidat)",
        monthlyBonus: { staff: 3, customer: 0, hq: 1, finance: 0 },
        monthlyUpkeep: 2
    },
    {
        id: "health_insurance",
        name: "Özel Sağlık Sigortası",
        desc: "Tüm personele özel sağlık sigortası yaptırılır. Bağlılığı artırır ancak sigorta primleri her ay bütçeden düşer.",
        cost: 18,
        emoji: "🏥",
        effectDesc: "Her ay sonu +4% Personel Morali, +2% Bölge · Bakım: -3% Kasa (primler)",
        monthlyBonus: { staff: 4, customer: 0, hq: 2, finance: 0 },
        monthlyUpkeep: 3
    },
    {
        id: "ambient_system",
        name: "Koku & Müzik Yönetim Sistemi",
        desc: "Mağaza içine rahatlatıcı Aura-Freş kokusu salgılanır ve arka planda lo-fi müzikler çalınır. Koku kartuşları aylık yenilenir.",
        cost: 10,
        emoji: "🎵",
        effectDesc: "Her ay sonu +3% Müşteri Deneyimi · Bakım: -1% Kasa (kartuş)",
        monthlyBonus: { staff: 0, customer: 3, hq: 0, finance: 0 },
        monthlyUpkeep: 1
    },
    {
        id: "smart_lighting",
        name: "Akıllı Işıklandırma Entegrasyonu",
        desc: "Günün saatine ve mağaza içi müşteri yoğunluğuna göre rengini ayarlayan tasarruflu LED aydınlatma panelleri.",
        cost: 12,
        emoji: "💡",
        effectDesc: "Her ay sonu +1% Müşteri Deneyimi, +2% Kasa Bütçesi (Enerji Tasarrufu)",
        monthlyBonus: { staff: 0, customer: 1, hq: 0, finance: 2 },
        monthlyUpkeep: 0
    },
    {
        id: "team_uniforms",
        name: "Ekip Üniformaları & Tasarım",
        desc: "Aura Store markasına uygun özel tasarım modern ve esnek kumaş tişörtler üretilir.",
        cost: 9,
        emoji: "👕",
        effectDesc: "Her ay sonu +1% Personel Morali, +2% Bölge Mutluluk",
        monthlyBonus: { staff: 1, customer: 0, hq: 2, finance: 0 },
        monthlyUpkeep: 0
    },
    {
        id: "vr_experience",
        name: "VR Deneyim Alanı",
        desc: "Mağazanın bir köşesine müşterilerin yeni Aura-VR gözlüklerini test edebileceği stantlar kurulur. Demo cihazların bakımı masraflıdır.",
        cost: 20,
        emoji: "🥽",
        effectDesc: "Her ay sonu +5% Müşteri Deneyimi, -2% Personel Morali · Bakım: -2% Kasa",
        monthlyBonus: { staff: -2, customer: 5, hq: 0, finance: 0 },
        monthlyUpkeep: 2
    }
];
