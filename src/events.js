// Olay kartları. Her kart, bir karakterden mağaza grubuna ya da telefona düşen
// bir mesajdır; `desc` o karakterin ağzından yazılır, seçenekler oyuncunun cevabıdır.
//
// Etkiler ham değerdir; motor (engine.js) bunları ölçekler. Kart türleri:
//   (düz)         desteye girer, rastgele gelir
//   isChainCard   sadece bir seçenekten (nextChainCardId / queueEvent) gelir
//   story         belirli bir haftada gelir (engine.js STORY_BEATS)
//   trigger       bir bar uca yaklaşınca gelir: { stat, side: 'low' | 'high' }
//   once          kariyer boyunca en fazla bir kez gelir
// Seçenekteki `flags` hikâye bayraklarını değiştirir (örn. anne: annenle aran).

// ---------------------------------------------------------------------------
// Kadro
// ---------------------------------------------------------------------------
const BATIKAN = { name: 'Batıkan Dikyar', title: 'Bölge Müdürü' };
const CAN = { name: 'Can', title: 'Müdür yardımcısı' };
const SEMIH = { name: 'Semih', title: 'Kıdemli satış danışmanı' };
const FIRAT = { name: 'Fırat', title: 'Teknik servis sorumlusu' };
const GIZEM = { name: 'Gizem', title: 'Sosyal medya sorumlusu' };
const GOKHAN = { name: 'Gökhan', title: 'Aksesuar satış danışmanı' };
const ENES = { name: 'Enes', title: 'Yeni satış danışmanı' };
const ANNE = { name: 'Annen', title: 'evden arıyor' };
const KEMAL = { name: 'Kemal Bey', title: 'AVM müdürü' };
const RAMAZAN = { name: 'Ramazan', title: 'AVM güvenlik görevlisi' };
const HUSEYIN = { name: 'Hüseyin', title: 'Yan dükkândaki kahveci' };

export const events = [
    // =======================================================================
    // GÜNLÜK OPERASYON
    // =======================================================================
    {
        id: "ac_broke",
        title: "Klima yine gitti",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, klima pes etti. İçerisi 31 derece, cam cephe güneşi fırın gibi topluyor. Müşteriler girip çıkıyor, ekip sırılsıklam. Servisi şimdi çağırırsam hafta sonu tarifesi yazarlar.",
        character: FIRAT,
        options: [
            { text: "Servisi çağır, parası neyse ödensin.", effect: { staff: 15, customer: 10, hq: 0, finance: -15 } },
            { text: "Kapıları açın, herkese soğuk su dağıtalım.", effect: { staff: -10, customer: -15, hq: 5, finance: -5 } }
        ]
    },
    {
        id: "display_unit",
        title: "Teşhirdeki tablet",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, bir müşteri teşhirdeki AuraPad Air'i istiyor. Kutusu yok, kalemi kayıp. Yüzde 30 indirim yaparsak şimdi alacak.",
        character: SEMIH,
        options: [
            { text: "İndirimi yap, teşhir ürünü elde kalmasın.", effect: { staff: 0, customer: 15, hq: -5, finance: 10 } },
            { text: "Olmaz. Yenisi gelince haber verelim.", effect: { staff: 0, customer: -10, hq: 10, finance: -5 } }
        ]
    },
    {
        id: "pos_down",
        title: "POS kart çekmiyor",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, AVM'nin interneti gitti, POS cihazları kart çekmiyor. Kasa kuyruğu kapıya dayandı, kimsenin üstünde nakit yok.",
        character: FIRAT,
        options: [
            { text: "Kuyruğa su ve kahve ikram edin, bekleyelim.", effect: { staff: -5, customer: 15, hq: 0, finance: -5 } },
            { text: "Sadece nakit geçiyor, anons yapın.", effect: { staff: 5, customer: -25, hq: 5, finance: -10 } },
            { text: "Bilgilerini alın, telefonlarına ödeme linki gönderelim.", effect: { staff: -10, customer: 5, hq: -10, finance: 5 } }
        ]
    },
    {
        id: "yearly_count",
        title: "Yıllık sayım",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, yıllık sayım bu hafta sonu. Depoda iki gün barkod okutacağız. Ekip mesai ücretini soruyor, ne diyeyim?",
        character: CAN,
        options: [
            { text: "Mesaiyi çift ödeyelim.", effect: { staff: 10, customer: 0, hq: 5, finance: -15 } },
            { text: "Mesai bütçemiz yok, idare edeceğiz.", effect: { staff: -25, customer: 0, hq: 10, finance: 5 } }
        ]
    },
    {
        id: "wrong_shipment",
        title: "Yanlış koliler",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, gelen kolilerden telefon yerine kılıf ve kablo çıktı. Vitrinde üç telefon kaldı, hafta daha yeni başladı.",
        character: GOKHAN,
        options: [
            { text: "Normal iade sürecini bekleyelim, eldekiyle satarız.", effect: { staff: 0, customer: -15, hq: 5, finance: -5 } },
            { text: "Acil kuryeyle doğru ürünleri getirt, masraf bizden.", effect: { staff: 5, customer: 10, hq: 0, finance: -12 } }
        ]
    },
    {
        id: "till_shortage",
        title: "Kasa açık verdi",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, gün sonunda kasa 1.500 lira açık verdi. İade fişleriyle satışlar tutmuyor, kimse bir şey bilmiyor.",
        character: ENES,
        options: [
            { text: "Bütün gün kamera kayıtlarını ve fişleri tek tek inceleyelim.", effect: { staff: -10, customer: 0, hq: 10, finance: 5 } },
            { text: "Açığı kapat, ekibe kasa eğitimi planla.", effect: { staff: 5, customer: 0, hq: -5, finance: -8 } }
        ]
    },
    {
        id: "mall_blackout",
        title: "AVM karanlık",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, AVM jeneratörü arızalandı. Yedek güç sadece kasaları çalıştırıyor. Işık yok, klima yok.",
        character: FIRAT,
        options: [
            { text: "Açık kalalım, telefon ışığıyla satışa devam.", effect: { staff: -12, customer: -15, hq: 0, finance: 12 } },
            { text: "Güvenlik için kepengi indirelim.", effect: { staff: 10, customer: 5, hq: -5, finance: -15 } }
        ]
    },
    {
        id: "eco_friendly_initiative",
        title: "Geri dönüşüm köşesi",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, eski pil ve elektronik atık toplayan bir köşe kuralım mı? Kutuları belediye veriyor, bize raf ve tabela kalıyor. Yerini de aksesuar reyonundan açmamız lazım.",
        character: FIRAT,
        options: [
            { text: "Kuralım.", effect: { staff: -5, customer: 10, hq: 10, finance: -10 } },
            { text: "Şimdi sırası değil.", effect: { staff: 0, customer: 0, hq: -10, finance: 5 } }
        ]
    },
    {
        id: "mall_service_fee",
        title: "Aidat zammı",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdür Bey, ortak gider aidatlarına yüzde 40 zam yaptık, yazısı ekte. Elektrik, güvenlik, temizlik, hepsi arttı, biliyorsunuz.",
        character: KEMAL,
        options: [
            { text: "Ödeyelim, uğraşmayalım.", effect: { staff: 0, customer: 0, hq: 5, finance: -15 } },
            { text: "Diğer mağazalarla birlikte itiraz edelim.", effect: { staff: 5, customer: 0, hq: -10, finance: -5 } }
        ]
    },
    {
        id: "deprem_tatbikati",
        title: "Deprem tatbikatı",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdür Bey, cumartesi öğlen deprem tatbikatı yapıyoruz. Bütün mağazalar 20 dakika boşaltılacak, katılım zorunlu.",
        character: KEMAL,
        options: [
            { text: "Katılalım, ekibi önceden hazırla.", effect: { staff: 5, customer: -10, hq: 10, finance: -5 } },
            { text: "Cumartesi öğlen en kalabalık saat, geçiştirelim.", effect: { staff: 0, customer: 5, hq: -15, finance: 5 } }
        ]
    },
    {
        id: "otopark_ucreti",
        title: "Otopark paralı oluyor",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdür Bey, personel otoparkı önümüzdeki aydan itibaren ücretli. Aylık kartları mağaza adına mı keselim, herkes kendisi mi alsın?",
        character: KEMAL,
        options: [
            { text: "Kartları mağaza ödesin.", effect: { staff: 15, customer: 0, hq: -5, finance: -12 } },
            { text: "Herkes kendi kartını alsın.", effect: { staff: -15, customer: 0, hq: 5, finance: 0 } }
        ]
    },
    {
        id: "kapanis_musterisi",
        title: "Kapanışa beş dakika",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, kapanışa beş dakika var, bir aile yeni girdi. Üç telefona bakacaklarmış. Ekibin yarısı 22.00 servisine yetişmek zorunda.",
        character: CAN,
        options: [
            { text: "Kalıyoruz, satışı kaçırmayalım.", effect: { staff: -15, customer: 10, hq: 0, finance: 15 } },
            { text: "Kibarca yarın beklediğimizi söyle.", effect: { staff: 10, customer: -10, hq: 0, finance: -5 } }
        ]
    },

    // =======================================================================
    // MÜŞTERİ
    // =======================================================================
    {
        id: "return_fiasco",
        title: "İki yıllık telefon",
        category: "MÜŞTERİ",
        desc: "Müdürüm, adam iki yıllık AuraPhone'unu getirdi. Ekran paramparça ama \"kendi kendine çatladı\" diyor, sıfırıyla değişim istiyor. Sesini de yükseltti, herkes bize bakıyor.",
        character: SEMIH,
        options: [
            { text: "Değiştir gitsin, müşteri kaçmasın.", effect: { staff: 5, customer: 15, hq: -15, finance: -15 } },
            { text: "Garanti dışı. Kibar ama net söyle.", effect: { staff: -5, customer: -20, hq: 15, finance: 5 } },
            { text: "Ekran değişimini yarı fiyatına yapalım.", effect: { staff: -5, customer: 5, hq: -5, finance: -5 } }
        ]
    },
    {
        id: "wrong_tag",
        title: "6.000 liralık laptop",
        category: "MÜŞTERİ",
        desc: "Müdürüm, sistemde AuraBook Pro'nun fiyatı 60.000 yerine 6.000 girilmiş. Müşteri etiketin fotoğrafını çekmiş, \"Tüketici hakem heyetine giderim\" diyor.",
        character: SEMIH,
        options: [
            { text: "Hata bizim, 6.000'e ver.", effect: { staff: 10, customer: 25, hq: -25, finance: -25 } },
            { text: "Sistem hatası, satışı iptal et.", effect: { staff: -5, customer: -20, hq: 15, finance: 10 } },
            { text: "Özür dile, gönlünü yüklü bir hediye çekiyle al.", effect: { staff: 0, customer: 5, hq: -5, finance: -10 } }
        ]
    },
    {
        id: "teyze_kurulum",
        title: "Teyzenin yeni telefonu",
        category: "MÜŞTERİ",
        desc: "Müdürüm, 80 yaşında bir teyze geldi. Torunu telefon almış, WhatsApp'ı kurmamızı, eski telefondaki fotoğrafları aktarmamızı istiyor. Bir saat sürer, içerisi de dolu.",
        character: SEMIH,
        options: [
            { text: "Otur teyzenin yanına, ne kadar sürerse sürsün.", effect: { staff: -5, customer: 20, hq: -5, finance: -5 } },
            { text: "Kurulum randevusu ver, hafta içi sabah gelsin.", effect: { staff: 5, customer: -10, hq: 5, finance: 0 } }
        ]
    },
    {
        id: "vip_customer_crisis",
        title: "Ünlü şarkıcı geldi",
        category: "MÜŞTERİ",
        desc: "Müdürüm, ünlü bir şarkıcı korumalarıyla geldi. Mağazanın boşaltılmasını istiyor, yoksa alışveriş yapmadan gidecekmiş. Yanında da iki kamera var.",
        character: CAN,
        options: [
            { text: "Yarım saatliğine boşaltalım.", effect: { staff: 0, customer: -15, hq: 5, finance: 20 } },
            { text: "Herkes sırasını bekler.", effect: { staff: 5, customer: 15, hq: 0, finance: -10 } }
        ]
    },
    {
        id: "service_backlog",
        title: "Serviste yığılma",
        category: "MÜŞTERİ",
        desc: "Müdürüm, merkez serviste tamir bekleyen cihazlar yığıldı, süre üç haftayı geçti. Müşteriler her gün arıyor, kasadakiler telefona bakmaktan satış yapamıyor.",
        character: FIRAT,
        options: [
            { text: "Bekleyenlere teşhir fazlasından ödünç cihaz verelim.", effect: { staff: -5, customer: 15, hq: 0, finance: -10 } },
            { text: "\"Süreç merkezde, elimizden bir şey gelmez\" diyelim.", effect: { staff: 5, customer: -15, hq: 5, finance: 0 } },
            { text: "Bölgeye yazıp süreci hızlandırmalarını iste.", effect: { staff: 0, customer: 10, hq: -10, finance: 0 } }
        ]
    },
    {
        id: "garanti_sahte_parca",
        title: "Garantide sahte batarya",
        category: "MÜŞTERİ",
        desc: "Müdürüm, garantiye gelen telefonun içinden orijinal olmayan batarya çıktı. Müşteri başka yerde tamir ettirdiğini saklıyor, üstüne bir de bize kızgın.",
        character: FIRAT,
        options: [
            { text: "Garantiyi reddet, durumu raporla.", effect: { staff: 5, customer: -15, hq: 10, finance: 5 } },
            { text: "Bu seferlik ücretsiz değiştirelim.", effect: { staff: -5, customer: 15, hq: -10, finance: -10 } }
        ]
    },
    {
        id: "onsiparis_sirasi",
        title: "Ön sipariş listesi",
        category: "MÜŞTERİ",
        desc: "Müdürüm, yeni modelin ön sipariş listesi taştı. Gelen stok listenin yarısına yetecek. Bazıları \"fazlasını öderim, beni öne al\" diyor.",
        character: SEMIH,
        options: [
            { text: "Sıra sıradır.", effect: { staff: 0, customer: 10, hq: 5, finance: -5 } },
            { text: "Fazla ödeyen öne geçsin.", effect: { staff: -5, customer: -15, hq: -5, finance: 20 } },
            { text: "Önce eski müşterilerimize verelim.", effect: { staff: 5, customer: 5, hq: -10, finance: 0 } }
        ]
    },
    {
        id: "sahte_sms",
        title: "Sahte kampanya SMS'i",
        category: "MÜŞTERİ",
        desc: "Müdürüm, \"Aura Store'da yüzde 70 indirim\" diye sahte bir SMS dolaşıyor. Linke tıklayanlar kart bilgisini girmiş, şimdi gelip bizden hesap soruyorlar.",
        character: SEMIH,
        options: [
            { text: "Tek tek yardım edin, bankalarını beraber arayın.", effect: { staff: -10, customer: 15, hq: 0, finance: -5 } },
            { text: "Bizimle ilgisi yok, kapıya uyarı asın.", effect: { staff: 5, customer: -15, hq: 5, finance: 0 } },
            { text: "Gizem uyarı paylaşsın, bölgeye de bildirelim.", effect: { staff: -5, customer: 5, hq: 5, finance: -5 } }
        ]
    },
    {
        id: "kayip_cocuk",
        title: "Kayıp çocuk",
        category: "MÜŞTERİ",
        desc: "Müdür Bey, beş yaşında bir çocuk annesini kaybetmiş, sizin mağazanın önünde ağlıyor. Anons yaptırdım. Annesi gelene kadar sizde kalabilir mi?",
        character: RAMAZAN,
        options: [
            { text: "Tabii. Enes ilgilensin, bir de çikolata verin.", effect: { staff: -5, customer: 10, hq: 0, finance: 0 } },
            { text: "Güvenlik noktasına götürün, prosedür öyle.", effect: { staff: 0, customer: -5, hq: 5, finance: 0 } }
        ]
    },

    // =======================================================================
    // SATIŞ VE PAZARLAMA
    // =======================================================================
    {
        id: "crypto_miners",
        title: "Bütün laptopları istiyorlar",
        category: "SATIŞ",
        desc: "Müdürüm, iki kişi geldi, depodaki bütün AuraBook Pro'ları nakit almak istiyor. Madencilik yapacaklarmış. Hepsini verirsek bu hafta kimseye satacak laptop kalmaz.",
        character: GOKHAN,
        options: [
            { text: "Hepsini sat, ay kapanışı şahane olur.", effect: { staff: -5, customer: -15, hq: 15, finance: 25 } },
            { text: "Kişi başı bir tane. Kuralımız bu.", effect: { staff: 5, customer: 15, hq: -5, finance: -10 } }
        ]
    },
    {
        id: "black_friday",
        title: "Lansman sabahı",
        category: "SATIŞ",
        desc: "Müdürüm, yeni AuraPhone için kapıda üç yüz kişi var. Bazıları üç gündür çadırda yatıyor. Kepengi açınca izdiham çıkacak, nasıl yapalım?",
        character: CAN,
        options: [
            { text: "Kepengi aç, kim yetişirse.", effect: { staff: -25, customer: 20, hq: -10, finance: 30 } },
            { text: "Şerit çekelim, onar onar alalım.", effect: { staff: 10, customer: -10, hq: 20, finance: 10 } },
            { text: "Önce ön sipariş verenler girsin, gerisi beklesin.", effect: { staff: 0, customer: -25, hq: -15, finance: 35 } }
        ]
    },
    {
        id: "influencer_hype",
        title: "Kutu açılışı",
        category: "PAZARLAMA",
        desc: "Müdürüm, 800 bin takipçili bir teknoloji fenomeni mağazada kutu açılışı çekmek istiyor. Karşılığında bir AuraPods Max istiyor, bedava.",
        character: GIZEM,
        options: [
            { text: "Ver kulaklığı, reklamı bize yeter.", effect: { staff: 0, customer: 10, hq: 15, finance: -15 } },
            { text: "Mağazada bedava ürün yok, kibarca söyle.", effect: { staff: 5, customer: -10, hq: -5, finance: 0 } }
        ]
    },
    {
        id: "competitor_sale",
        title: "Karşıda yarı fiyat",
        category: "PAZARLAMA",
        desc: "Müdürüm, karşıdaki elektronik market muadil telefonlarda \"yarı fiyatına\" kampanyası başlattı. Bizim reyon boş, herkes orada.",
        character: GIZEM,
        options: [
            { text: "Aksesuarlarda indirim başlatalım, karşılık verelim.", effect: { staff: -5, customer: 20, hq: 10, finance: -20 } },
            { text: "Biz indirim mağazası değiliz, bekleyelim.", effect: { staff: 5, customer: -15, hq: -5, finance: 10 } }
        ]
    },
    {
        id: "online_reviews",
        title: "Puanımız 2,9",
        category: "PAZARLAMA",
        desc: "Müdürüm, haritalardaki puanımız 2,9'a düştü. Yeni gelenler önce yorumları okuyor, bazıları kapıdan dönüyor.",
        character: GIZEM,
        options: [
            { text: "Memnun müşterilere çekilişli yorum kampanyası yapalım.", effect: { staff: 0, customer: 15, hq: 5, finance: -10 } },
            { text: "Mesai sonrası kalıp her kötü yoruma tek tek cevap yazalım.", effect: { staff: -10, customer: 10, hq: 5, finance: 0 } }
        ]
    },
    {
        id: "corporate_bulk_order",
        title: "Otuz laptop, 60 gün vade",
        category: "SATIŞ",
        desc: "Müdürüm, bir şirket çalışanları için 30 AuraBook istiyor. Ama 60 gün vadeli ödeyeceklermiş, nakitte sıkışabiliriz.",
        character: SEMIH,
        options: [
            { text: "Vadeyi kabul et, bölgeye rekor satışı bildir.", effect: { staff: 0, customer: 10, hq: 10, finance: -5 } },
            { text: "\"Sadece peşin çalışıyoruz\" de.", effect: { staff: 0, customer: -5, hq: -10, finance: 5 } }
        ]
    },
    {
        id: "takas_kampanyasi",
        title: "Eskiyi getir, yeniyi götür",
        category: "SATIŞ",
        desc: "Müdürüm, merkez eski telefon takas kampanyası açtı. Takas fiyatlarını mağazalar belirleyecek. Cömert olursan kuyruk olur ama kârın erir.",
        character: BATIKAN,
        options: [
            { text: "Cömert olalım, kuyruk olsun.", effect: { staff: -10, customer: 15, hq: 5, finance: -15 } },
            { text: "Piyasanın biraz altında verelim.", effect: { staff: 0, customer: -10, hq: -5, finance: 15 } }
        ]
    },
    {
        id: "ikinci_el_satici",
        title: "Girişte ikinci el satıcı",
        category: "SATIŞ",
        desc: "Müdürüm, AVM girişinde biri ikinci el AuraPhone satıyor. \"Mağazadan yarı fiyatına\" diye bizim müşterileri çeviriyor. Bir kısmı çalıntı olabilir.",
        character: GOKHAN,
        options: [
            { text: "Güvenliğe ve polise bildir.", effect: { staff: 0, customer: -5, hq: 10, finance: 5 } },
            { text: "Karışmayalım, başımız belaya girmesin.", effect: { staff: 5, customer: 0, hq: -5, finance: -10 } }
        ]
    },
    {
        id: "cekilis",
        title: "Kulaklık çekilişi",
        category: "PAZARLAMA",
        desc: "Müdürüm, bir kulaklık çekilişi yapalım mı? Katılmak için mağazayı etiketleyip üç arkadaşını yazacaklar. Bir haftada takipçimiz ikiye katlanır.",
        character: GIZEM,
        options: [
            { text: "Yapalım.", effect: { staff: -5, customer: 15, hq: -5, finance: -10 } },
            { text: "Uğraşmayalım.", effect: { staff: 0, customer: -5, hq: 0, finance: 5 } }
        ]
    },
    {
        id: "sahte_takipci",
        title: "Fenomen bot çıktı",
        category: "PAZARLAMA",
        desc: "Müdürüm, anlaştığımız fenomenin takipçilerinin yarısı bot çıktı. Parasını ödedik, video yarın yayında. Çok utanıyorum.",
        character: GIZEM,
        options: [
            { text: "Olan oldu, yayınlansın.", effect: { staff: 5, customer: 5, hq: -10, finance: 0 } },
            { text: "İptal et, sözleşmeden iade iste.", effect: { staff: -10, customer: -5, hq: 10, finance: 5 } }
        ]
    },

    // =======================================================================
    // EKİP
    // =======================================================================
    {
        id: "staff_romance",
        title: "Teknik odanın arkası",
        category: "EKİP",
        desc: "Müdürüm, Gökhan'la yeni gelen kasiyer sürekli teknik odanın arkasında. Ekip dedikodudan iş yapmıyor, kasa kuyruğu uzadı.",
        character: CAN,
        options: [
            { text: "İkisinin vardiyalarını ayır.", effect: { staff: -10, customer: 5, hq: 10, finance: 0 } },
            { text: "İşlerini aksatmadıkça karışmayalım.", effect: { staff: 15, customer: -5, hq: -15, finance: 0 } }
        ]
    },
    {
        id: "birthday_early",
        title: "Doğum günün",
        category: "EKİP",
        desc: "Müdürüm, sürprizi bozdum, kusura bakma: ekip pasta aldı. Akşam bir saat erken kapatıp kutlayalım diyorlar.",
        character: CAN,
        options: [
            { text: "Kepenkler insin, parti başlasın.", effect: { staff: 25, customer: -10, hq: -15, finance: -10 } },
            { text: "Mola odasında on dakikada keselim.", effect: { staff: -10, customer: 5, hq: 5, finance: 5 } }
        ]
    },
    {
        id: "fake_banknote",
        title: "Sahte 200'lük",
        category: "EKİP",
        desc: "Müdürüm, çok özür dilerim. Bugün kasada sahte bir 200'lük almışım, gün sonunda fark ettim.",
        character: ENES,
        options: [
            { text: "Maaşından kesilecek, dikkatli ol.", effect: { staff: -10, customer: 0, hq: 5, finance: 5 } },
            { text: "Olur böyle şeyler, kasadan kapatırız.", effect: { staff: 10, customer: 0, hq: -5, finance: -5 } }
        ]
    },
    {
        id: "teahouse_clash",
        title: "Kahveciyle kavga",
        category: "EKİP",
        desc: "Müdür, sizin çocuklar yine benim kapının önünde sigara içip izmariti yere atmış. Müşterim içeri girmiyor. AVM'ye şikâyet edeceğim.",
        character: HUSEYIN,
        options: [
            { text: "Haklısın abi. Ekibe kapı önünü yasaklıyorum.", effect: { staff: -20, customer: 5, hq: 10, finance: 0 } },
            { text: "Kapının önü senin tapulu malın değil.", effect: { staff: 20, customer: -5, hq: -15, finance: 0 } }
        ]
    },
    {
        id: "salary_raise_request",
        title: "Toplu zam talebi",
        category: "EKİP",
        desc: "Müdürüm, enflasyon açıklandı, ekip beni sözcü seçti. Maaşlar eridi diyorlar. Bir şey yapılmazsa AVM'deki diğer mağazalara bakacaklar.",
        character: CAN,
        options: [
            { text: "Bölgeye resmi zam talebi yazalım.", effect: { staff: 15, customer: 0, hq: -10, finance: 0 } },
            { text: "\"Bütçe yok\" de, şirket politikası.", effect: { staff: -20, customer: 0, hq: 5, finance: 5 } },
            { text: "Kasadan satış primi havuzu kuralım.", effect: { staff: 10, customer: 5, hq: -5, finance: -12 } }
        ]
    },
    {
        id: "sick_leave_wave",
        title: "Grip salgını",
        category: "EKİP",
        desc: "Müdürüm, üç kişi aynı anda raporlu. Hafta sonu kalabalık gelecek, kasalar yetmeyecek.",
        character: CAN,
        options: [
            { text: "Kalanlar ek vardiyaya kalsın.", effect: { staff: -15, customer: -10, hq: 0, finance: 5 } },
            { text: "Bölgeden geçici personel iste.", effect: { staff: 5, customer: 10, hq: -10, finance: -8 } }
        ]
    },
    {
        id: "staff_poaching",
        title: "Karşıdan teklif",
        category: "EKİP",
        desc: "Müdürüm, dürüst olayım: karşıdaki mağaza yüzde 30 zamla teklif verdi. Gitmek istemiyorum ama ev sahibi kiraya zam yaptı.",
        character: GOKHAN,
        options: [
            { text: "Kasadan karşı teklif yapalım, ek prim sözü ver.", effect: { staff: 10, customer: 0, hq: 0, finance: -10 } },
            { text: "Bölgeden kadro yükseltmesi isteyelim.", effect: { staff: 15, customer: 0, hq: -12, finance: 0 } },
            { text: "Yolun açık olsun. Kimse vazgeçilmez değil.", effect: { staff: -15, customer: -10, hq: 0, finance: 5 } }
        ]
    },
    {
        id: "gizem_brand_deal",
        title: "Gizem'e teklif",
        category: "EKİP",
        desc: "Müdürüm, açık konuşacağım: rakip marka reklam yüzü olmam için teklif verdi. Gidersem takipçilerimin çoğu da benimle gelir.",
        character: GIZEM,
        options: [
            { text: "Primini artıralım, kal.", effect: { staff: 15, customer: 5, hq: 0, finance: -15 } },
            { text: "Yolun açık olsun.", effect: { staff: -10, customer: -15, hq: 5, finance: 0 } }
        ]
    },
    {
        id: "competitor_spy",
        title: "Etiketlerin fotoğrafı",
        category: "EKİP",
        desc: "Müdürüm, karşı koridordaki mağazanın çalışanı yine bizim fiyat etiketlerinin fotoğrafını çekiyor. Bu üçüncü gelişi.",
        character: GOKHAN,
        options: [
            { text: "Güvenliği çağır, dışarı çıkarsınlar.", effect: { staff: 10, customer: -5, hq: -10, finance: 0 } },
            { text: "Yanına git, \"fiyatlar sitemizde de var\" de, kahve ısmarla.", effect: { staff: -10, customer: 5, hq: 10, finance: -5 } }
        ]
    },
    {
        id: "staff_audit_bonus",
        title: "Gizli müşteri",
        category: "EKİP",
        desc: "Müdürüm, bu hafta genel merkezden gizli müşteri geleceği konuşuluyor. Herkes gergin, gelen her müşteriye denetmen gözüyle bakıyor.",
        character: ENES,
        options: [
            { text: "Herkese ekstra kibar davranın.", effect: { staff: -10, customer: 15, hq: 10, finance: 0 } },
            { text: "Her zamanki gibi çalışın, rahat olun.", effect: { staff: 10, customer: 0, hq: -10, finance: 0 } }
        ]
    },
    {
        id: "bayram_mesaisi",
        title: "Bayram vardiyası",
        category: "EKİP",
        desc: "Müdürüm, bayramın ilk iki günü AVM açık. Kimse çalışmak istemiyor, herkesin memlekete bileti var.",
        character: CAN,
        options: [
            { text: "Kura çekelim, adil olsun.", effect: { staff: -10, customer: 5, hq: 5, finance: 0 } },
            { text: "Gönüllülere çift mesai verelim.", effect: { staff: 5, customer: 5, hq: 0, finance: -12 } },
            { text: "Ben ve Can kalırız, ekip gitsin.", effect: { staff: 15, customer: -10, hq: -5, finance: 0 } }
        ]
    },
    {
        id: "stajyer",
        title: "Meslek lisesi stajyeri",
        category: "EKİP",
        desc: "Müdürüm, meslek lisesinden bir stajyer gönderdiler. Çok hevesli ama kasaya da müşteriye de hiç dokunmamış.",
        character: CAN,
        options: [
            { text: "Semih'in yanına ver, öğrensin.", effect: { staff: -5, customer: -5, hq: 10, finance: 0 } },
            { text: "Depoda kutu açsın, kimseye yük olmasın.", effect: { staff: 5, customer: 0, hq: -10, finance: 5 } }
        ]
    },
    {
        id: "iftar",
        title: "İftar saati",
        category: "EKİP",
        desc: "Müdürüm, ramazan boyunca oruç tutan arkadaşlar iftar saatinde kasada kalıyor. \"İftarı mağazada beraber açalım mı\" diyorlar.",
        character: CAN,
        options: [
            { text: "Mola odasında toplu iftar, masraf bizden.", effect: { staff: 15, customer: -5, hq: 0, finance: -10 } },
            { text: "Vardiyaları iftar saatine göre kaydıralım.", effect: { staff: 5, customer: -5, hq: -5, finance: 0 } }
        ]
    },

    // =======================================================================
    // BÖLGE VE GÜVENLİK
    // =======================================================================
    {
        id: "district_manager",
        title: "Batıkan Bey yarın geliyor",
        category: "BÖLGE",
        desc: "Müdürüm, Batıkan Bey yarın sabah dokuzda mağazada olacakmış. Geçen sefer vitrinde parmak izi bulup yarım saat konuşmuştu, hatırlarsın.",
        character: CAN,
        options: [
            { text: "Ekip bu gece kalsın, mağaza pırıl pırıl olsun.", effect: { staff: -20, customer: 0, hq: 20, finance: -5 } },
            { text: "Normal temizlik yeter, kimseyi gece tutmayalım.", effect: { staff: 15, customer: 0, hq: -15, finance: 0 } },
            { text: "Onu akşam yemeğe götür, sabah hızlıca gezsin.", effect: { staff: 5, customer: 0, hq: 10, finance: -18 } }
        ]
    },
    {
        id: "gift_vouchers",
        title: "Hediye çekleri",
        category: "BÖLGE",
        desc: "Müdürüm, bölgeden 20 hediye çeki gönderdim. Kime vereceğin sana kalmış ama ay sonunda nereye gittiğini soracağım.",
        character: BATIKAN,
        options: [
            { text: "Sadık müşterilere dağıtalım.", effect: { staff: -5, customer: 15, hq: 10, finance: 0 } },
            { text: "Ekip arasında paylaştıralım.", effect: { staff: 20, customer: 0, hq: -10, finance: 0 } }
        ]
    },
    {
        id: "ceo_visit",
        title: "Genel müdür geliyor",
        category: "BÖLGE",
        desc: "Müdürüm, Aura Türkiye Genel Müdürü AVM'leri habersiz geziyor, yarım saate sizde. Öğlen kalabalığında reyonlar ne halde bilmiyorum.",
        character: BATIKAN,
        options: [
            { text: "Herkesi satıştan çek, reyonları toparlayalım.", effect: { staff: -15, customer: -10, hq: 25, finance: -5 } },
            { text: "Mağaza neyse o. Sakin kalalım.", effect: { staff: 10, customer: 5, hq: -15, finance: 0 } },
            { text: "\"Dış toplantıdayım\" de, Can karşılasın.", effect: { staff: 15, customer: -5, hq: -25, finance: 0 } }
        ]
    },
    {
        id: "mandatory_training",
        title: "Zorunlu eğitim",
        category: "BÖLGE",
        desc: "Müdürüm, genel merkez yeni ürün eğitimini herkese atadı. Hafta sonuna kadar bitecek, tamamlanma oranı karnene yazılacak. Kampanya yoğunluğunu biliyorum, kusura bakma.",
        character: BATIKAN,
        options: [
            { text: "Mesaide sırayla bitirsinler, reyon ara ara boş kalsın.", effect: { staff: -5, customer: -12, hq: 12, finance: 0 } },
            { text: "Eğitimi sessizce erteleyelim, önce müşteri.", effect: { staff: 5, customer: 5, hq: -15, finance: 0 } }
        ]
    },
    {
        id: "stolen_headphones",
        title: "Kulaklık kaçtı",
        category: "GÜVENLİK",
        desc: "Müdür Bey, sizin standdan biri AuraPods Max'in kablosunu kesip cebine attı, yürüyen merdivene koşuyor. Arkasından mı koşalım, polisi mi arayalım?",
        character: RAMAZAN,
        options: [
            { text: "Ekiple peşine düşün, yakalayın.", effect: { staff: -15, customer: -5, hq: 15, finance: 15 } },
            { text: "Kimse koşmasın. Polisi ara, kayıtları ver.", effect: { staff: 15, customer: 0, hq: -10, finance: -15 } }
        ]
    },
    {
        id: "night_robbery",
        title: "Gece camı kırdılar",
        category: "GÜVENLİK",
        desc: "Müdür Bey, gece üçte ön camı kırıp vitrindeki telefonları almışlar. Polis gelip tutanak tuttu. Sigorta için bölgeye rapor lazımmış.",
        character: RAMAZAN,
        options: [
            { text: "Bölgeye rapor et, sigorta süreci işlesin.", effect: { staff: 0, customer: 0, hq: -15, finance: -5 } },
            { text: "Bölge duymasın, camı ve vitrini kasadan yenile.", effect: { staff: 5, customer: 0, hq: 15, finance: -20 } },
            { text: "Bugün kapalı kalalım, eksikleri sayalım.", effect: { staff: 5, customer: -15, hq: 0, finance: -5 } }
        ]
    },

    // =======================================================================
    // ANNE
    // =======================================================================
    {
        id: "anne_ilk_arama",
        story: true,
        title: "Annen arıyor",
        category: "AİLE",
        desc: "Canım, müdür olmuşsun! Bütün komşulara söyledim. Nermin teyzen oğluna telefon alacakmış, \"indirim yapar mı\" diye soruyor. Bir de pazar yemeğe geliyor musun?",
        character: ANNE,
        options: [
            { text: "Anne, indirim yapamam, kural var. Ama pazar gelirim.", effect: { staff: 0, customer: -5, hq: 5, finance: 0 }, flags: { anne: 1 } },
            { text: "Gönder Nermin teyzeyi, bir şey yaparız. Pazar belli değil.", effect: { staff: 0, customer: 5, hq: -5, finance: -5 } }
        ]
    },
    {
        id: "anne_magazada",
        once: true,
        title: "Annen mağazada",
        category: "AİLE",
        desc: "Müdürüm, annen geldi! Herkese börek dağıtıyor, Semih'e \"evlen artık\" diyor. Müşteriler gülüyor ama kasanın önü tıkandı.",
        character: CAN,
        options: [
            { text: "Annemi mola odasına alın, çay koyun.", effect: { staff: 10, customer: -5, hq: 0, finance: 0 }, flags: { anne: 1 } },
            { text: "\"Anneciğim, burası iş yeri, akşam konuşuruz.\"", effect: { staff: -5, customer: 5, hq: 5, finance: 0 }, flags: { anne: -1 } }
        ]
    },
    {
        id: "anne_teyze_telefonu",
        once: true,
        title: "Saadet teyzenin telefonu",
        category: "AİLE",
        desc: "Canım, Saadet teyzenin telefonu açılmıyor. Yarın mağazana getireceğim, bizi sıraya sokmazsın değil mi?",
        character: ANNE,
        options: [
            { text: "Getir anne, Fırat hemen bakar.", effect: { staff: -5, customer: -10, hq: 0, finance: 0 }, flags: { anne: 1 } },
            { text: "Anne, sıra herkes için sıra.", effect: { staff: 5, customer: 5, hq: 0, finance: 0 }, flags: { anne: -1 } }
        ]
    },
    {
        id: "anne_pazar_yemegi",
        once: true,
        title: "Pazar yemeği",
        category: "AİLE",
        desc: "Canım, bu pazar bütün aile toplanıyor, dayın da geliyor. Üç haftadır yüzünü görmedim, bu sefer bahane istemiyorum.",
        character: ANNE,
        options: [
            { text: "Geliyorum anne. Mağazayı Can idare eder.", effect: { staff: -5, customer: -5, hq: -5, finance: 0 }, flags: { anne: 1 } },
            { text: "Bu hafta olmaz anne, kampanya var.", effect: { staff: 0, customer: 5, hq: 5, finance: 0 }, flags: { anne: -1 } }
        ]
    },
    {
        id: "anne_baba_telefonu",
        once: true,
        title: "Babanın telefonu",
        category: "AİLE",
        desc: "Canım, babanın telefonu artık hiç şarj tutmuyor. Senin personel indirimini onun için kullanabilir miyiz? Söylemiyor ama çok istiyor.",
        character: ANNE,
        options: [
            { text: "Kural dışı ama hallederim.", effect: { staff: -5, customer: 0, hq: -10, finance: 0 }, flags: { anne: 1 } },
            { text: "Olmaz anne, kurallar belli.", effect: { staff: 0, customer: 0, hq: 5, finance: 0 }, flags: { anne: -1 } }
        ]
    },
    {
        id: "anne_baklava",
        once: true,
        title: "Ekibe baklava",
        category: "AİLE",
        desc: "Canım, mağazanın haberini yerel gazetede görmüşler, komşular kupür getirdi! Çerçeveletip salona asacağım. Ekibine de baklava yaptım, yarın getiriyorum.",
        character: ANNE,
        options: [
            { text: "Getir anne, ekip bayılır.", effect: { staff: 10, customer: 0, hq: -5, finance: 0 }, flags: { anne: 1 } },
            { text: "Zahmet etme anne, gerek yok.", effect: { staff: -5, customer: 0, hq: 0, finance: 0 }, flags: { anne: -1 } }
        ]
    },
    {
        id: "anne_yil_sonu",
        story: true,
        title: "Annen merak ediyor",
        category: "AİLE",
        desc: "Canım, yıl bitiyor. Rahat mısın, iyi uyuyor musun? Babana söyleme ama her akşam mağazanın yorumlarını okuyorum.",
        character: ANNE,
        options: [
            { text: "İyiyim anne. Bu akşam size geliyorum.", effect: { staff: -5, customer: 0, hq: 0, finance: 0 }, flags: { anne: 1 } },
            { text: "Sonra konuşalım anne, çok yoğunum.", effect: { staff: 0, customer: 0, hq: 5, finance: 0 }, flags: { anne: -1 } }
        ]
    },

    // =======================================================================
    // DURUM KARTLARI (bar uca yaklaşınca gelir)
    // =======================================================================
    {
        id: "durum_ekip_dipte",
        trigger: { stat: 'staff', side: 'low' },
        title: "Masamda iki istifa",
        category: "EKİP",
        desc: "Müdürüm, masamda iki istifa mektubu var, biri Semih'in. Ekip bitmiş durumda. Bir şey yapmazsak hafta sonu kimse gelmeyecek.",
        character: CAN,
        options: [
            { text: "Herkese bir gün ek izin.", effect: { staff: 20, customer: -10, hq: -5, finance: 0 } },
            { text: "Maaşlara küçük bir iyileştirme yapalım.", effect: { staff: 15, customer: 0, hq: -5, finance: -15 } },
            { text: "Gidenin yerine yenisi gelir.", effect: { staff: -10, customer: 0, hq: 5, finance: 5 } }
        ]
    },
    {
        id: "durum_ekip_tavanda",
        trigger: { stat: 'staff', side: 'high' },
        title: "Burası tatil köyü mü?",
        category: "BÖLGE",
        desc: "Müdürüm, dün habersiz uğradım. Ekibin yarısı mola odasında, kasada tek kişi var. Keyifleri yerinde ama burası tatil köyü değil.",
        character: BATIKAN,
        options: [
            { text: "Vardiya disiplinini sıkılaştırıyorum.", effect: { staff: -15, customer: 5, hq: 10, finance: 0 } },
            { text: "Primi satış hedefine bağlayalım.", effect: { staff: -10, customer: 0, hq: 5, finance: 5 } },
            { text: "Ekip mutluysa satış da gelir, Batıkan Bey.", effect: { staff: 5, customer: 0, hq: -15, finance: 0 } }
        ]
    },
    {
        id: "durum_musteri_dipte",
        trigger: { stat: 'customer', side: 'low' },
        title: "Mağaza bomboş",
        category: "MÜŞTERİ",
        desc: "Müdürüm, cumartesi öğleden sonra mağazada üç müşteri var. Yorumlar kötü, insanlar karşıya gidiyor.",
        character: GIZEM,
        options: [
            { text: "Hafta sonuna sürpriz indirim.", effect: { staff: -5, customer: 20, hq: 0, finance: -15 } },
            { text: "Ücretsiz kurulum ve ekran koruyucu kampanyası.", effect: { staff: -10, customer: 15, hq: 0, finance: -5 } },
            { text: "Bölgeden reklam bütçesi isteyelim.", effect: { staff: 0, customer: 10, hq: -15, finance: 0 } }
        ]
    },
    {
        id: "durum_musteri_tavanda",
        trigger: { stat: 'customer', side: 'high' },
        title: "Her şeyi değiştiriyoruz sanıyorlar",
        category: "MÜŞTERİ",
        desc: "Müdürüm, \"o mağaza her şeyi değiştiriyor\" diye nam salmışız. Bugün beş kişi kendi düşürdüğü cihazı getirdi, hepsi sıfırını istiyor.",
        character: SEMIH,
        options: [
            { text: "Garanti şartlarına dönüyoruz, net olalım.", effect: { staff: 10, customer: -15, hq: 5, finance: 5 } },
            { text: "İade politikasını kapıya asalım, tek tek anlatalım.", effect: { staff: -5, customer: -10, hq: 5, finance: 0 } },
            { text: "Memnun kalsınlar, değiştirmeye devam.", effect: { staff: -10, customer: 5, hq: -10, finance: -10 } }
        ]
    },
    {
        id: "durum_bolge_dipte",
        trigger: { stat: 'hq', side: 'low' },
        title: "Son uyarı",
        category: "BÖLGE",
        desc: "Müdürüm, açık konuşayım: bölge toplantısında adın \"sorunlu mağazalar\" listesinde geçti. Bir ay içinde toparlanmazsan görüşeceğiz.",
        character: BATIKAN,
        options: [
            { text: "Her hafta rapor göndereceğim, her şeyi göreceksiniz.", effect: { staff: -10, customer: 0, hq: 15, finance: 0 } },
            { text: "Bölgenin kampanyasını mağazada öne çıkaralım.", effect: { staff: 0, customer: -10, hq: 15, finance: -5 } },
            { text: "Elimden geleni yapıyorum, rakamlar ortada.", effect: { staff: 5, customer: 0, hq: -5, finance: 0 } }
        ]
    },
    {
        id: "durum_bolge_tavanda",
        trigger: { stat: 'hq', side: 'high' },
        title: "Örnek mağaza",
        category: "BÖLGE",
        desc: "Müdürüm, toplantıda seni örnek gösterdim, diğer müdürler biraz bozuldu tabii. Bir ricam var: yeni açılan şubeye iki haftalığına Semih'i ödünç verir misin?",
        character: BATIKAN,
        options: [
            { text: "Tabii, Semih gitsin.", effect: { staff: -10, customer: -10, hq: 10, finance: 0 } },
            { text: "Semih'siz zor, başka birini göndereyim.", effect: { staff: -5, customer: -5, hq: -5, finance: 0 } },
            { text: "Kusura bakmayın, ekibim burada lazım.", effect: { staff: 10, customer: 0, hq: -15, finance: 0 } }
        ]
    },
    {
        id: "durum_kasa_dipte",
        trigger: { stat: 'finance', side: 'low' },
        title: "Tedarikçi sevkiyatı durdurdu",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdürüm, aksesuar tedarikçisi iki haftadır ödeme alamadığı için sevkiyatı durdurmuş. Kasada da ciddi para yok.",
        character: CAN,
        options: [
            { text: "Stoktaki aksesuarları indirimle eritelim.", effect: { staff: -5, customer: 10, hq: -5, finance: 15 } },
            { text: "Bölgeden avans isteyelim.", effect: { staff: 0, customer: 0, hq: -20, finance: 20 } },
            { text: "Vardiyaları azalt, fazla mesaileri kes.", effect: { staff: -20, customer: -5, hq: 5, finance: 15 } }
        ]
    },
    {
        id: "durum_kasa_tavanda",
        trigger: { stat: 'finance', side: 'high' },
        title: "Kasa dolu, yatırım yok",
        category: "BÖLGE",
        desc: "Müdürüm, kasan çok iyi görünüyor ama merkez \"bu mağaza hiç yatırım yapmıyor\" diye soruyor. Harcamazsan gelecek yıl bütçeni kısarlar, biliyorsun.",
        character: BATIKAN,
        options: [
            { text: "Ekibe performans primi dağıtalım.", effect: { staff: 15, customer: 0, hq: 0, finance: -20 } },
            { text: "Mağazanın içini yenileyelim.", effect: { staff: 0, customer: 15, hq: 5, finance: -20 } },
            { text: "Tasarruf da başarıdır, para kasada kalsın.", effect: { staff: -5, customer: 0, hq: -10, finance: 5 } }
        ]
    },

    // =======================================================================
    // KAMPANYA GİRİŞLERİ (belirli haftalarda, engine.js CAMPAIGNS)
    // =======================================================================
    {
        id: "campaign_black_friday_intro",
        title: "Black Friday geliyor",
        category: "KAMPANYA",
        desc: "Müdürüm, üç hafta Black Friday var. Satış bol olacak ama ekip çok yorulacak, baştan söyleyeyim. Hazırlığın ne?",
        character: BATIKAN,
        options: [
            { text: "Vardiyaları uzatalım, hepsini karşılarız.", effect: { staff: -10, customer: 5, hq: 10, finance: 5 } },
            { text: "Geçici ek personel isteyelim.", effect: { staff: 10, customer: 0, hq: -5, finance: -10 } }
        ]
    },
    {
        id: "campaign_new_year_intro",
        title: "Yılbaşı haftaları",
        category: "KAMPANYA",
        desc: "Müdürüm, yılbaşı haftaları başlıyor, herkes hediye arıyor. Mağazayı süsleyelim mi? Paylaşım takvimi de hazırladım!",
        character: GIZEM,
        options: [
            { text: "Süsle, paylaş, kalabalık gelsin.", effect: { staff: -5, customer: 10, hq: 0, finance: -5 } },
            { text: "Süse para harcamayalım, stoka bakalım.", effect: { staff: 0, customer: -5, hq: 5, finance: 5 } }
        ]
    },
    {
        id: "campaign_audit_intro",
        title: "Denetmenler geliyor",
        category: "KAMPANYA",
        desc: "Müdürüm, genel müdürlükten denetmenler geliyor. İki hafta her şey kayıt altında olacak. Bir açığın varsa şimdi söyle.",
        character: BATIKAN,
        options: [
            { text: "Açığımız yok, gelsinler.", effect: { staff: 5, customer: 0, hq: -5, finance: 0 } },
            { text: "Birkaç eksiğimiz var, şimdiden kapatalım.", effect: { staff: -10, customer: 0, hq: 10, finance: -5 } }
        ]
    },

    // =======================================================================
    // ZİNCİRLER
    // =======================================================================
    {
        id: "theft_epidemic_1",
        title: "Kutular boş çıkıyor",
        category: "GÜVENLİK",
        desc: "Müdürüm, iki haftadır teşhirdeki kulaklık kutularından ürün eksik çıkıyor. Tek tük değil, organize bir iş bu.",
        character: FIRAT,
        options: [
            { text: "Güvenliği artıralım, ekibi uyaralım.", effect: { staff: -5, customer: 0, hq: 5, finance: -5 }, nextChainCardId: "theft_epidemic_2a" },
            { text: "Polise ihbar edelim, sivil pusu kursunlar.", effect: { staff: -10, customer: -5, hq: 10, finance: 0 }, nextChainCardId: "theft_epidemic_2b" }
        ]
    },
    {
        id: "theft_epidemic_2a",
        isChainCard: true,
        title: "Müşteriler rahatsız",
        category: "GÜVENLİK",
        desc: "Müdürüm, ekip reyonlarda nöbet tutuyor ama müşteriler takip edildiğini hissedip kaçıyor. Hırsızlar da hâlâ iş başında.",
        character: SEMIH,
        options: [
            { text: "Çıkışta çanta kontrolü yapalım.", effect: { staff: -5, customer: -20, hq: 5, finance: 5 }, nextChainCardId: "theft_epidemic_3_bad" },
            { text: "Özel güvenlikten sivil dedektif tutalım.", effect: { staff: 5, customer: 0, hq: 5, finance: -15 }, nextChainCardId: "theft_epidemic_3_good" }
        ]
    },
    {
        id: "theft_epidemic_2b",
        isChainCard: true,
        title: "Sivil polis bekliyor",
        category: "GÜVENLİK",
        desc: "Müdürüm, sivil polisler üç gündür mağazada. Müşteriler gerginliği sezdi, satış durdu.",
        character: CAN,
        options: [
            { text: "Polisleri geri çekelim.", effect: { staff: 10, customer: 15, hq: -10, finance: -5 } },
            { text: "Biraz daha sabredelim.", effect: { staff: -10, customer: -15, hq: 10, finance: -5 }, nextChainCardId: "theft_epidemic_3_catch" }
        ]
    },
    {
        id: "theft_epidemic_3_good",
        isChainCard: true,
        title: "Çete yakalandı",
        category: "GÜVENLİK",
        desc: "Müdürüm, tuttuğun dedektif çeteyi suçüstü yakalamış. Mallar geri geldi, tebrikler.",
        character: BATIKAN,
        options: [
            { text: "Ekibe prim dağıtalım.", effect: { staff: 15, customer: 5, hq: 5, finance: -10 } },
            { text: "Teşekkür edelim, kasaya dokunmayalım.", effect: { staff: -5, customer: 5, hq: 10, finance: 0 } }
        ]
    },
    {
        id: "theft_epidemic_3_bad",
        isChainCard: true,
        title: "Çanta araması patladı",
        category: "GÜVENLİK",
        desc: "Müdürüm, çanta kontrolü sosyal medyada infial yarattı. \"Müşteriye hırsız muamelesi\" diye etiketliyorlar.",
        character: GIZEM,
        options: [
            { text: "Resmi özür yayınla, uygulamayı kaldır.", effect: { staff: 10, customer: -15, hq: -15, finance: -5 } },
            { text: "Güvenlik gerekçemizi anlatan bir açıklama yapalım.", effect: { staff: 5, customer: -25, hq: -5, finance: 0 } }
        ]
    },
    {
        id: "theft_epidemic_3_catch",
        isChainCard: true,
        title: "Suçüstü",
        category: "GÜVENLİK",
        desc: "Müdürüm, polis çeteyi dün akşam çıkışta yakaladı! Kamera kayıtlarımız çok işe yaramış.",
        character: FIRAT,
        options: [
            { text: "Polise teşekkür edelim, ekibi kutlayalım.", effect: { staff: 10, customer: 10, hq: 15, finance: 5 } },
            { text: "Gizem paylaşsın, reklam olsun.", effect: { staff: 5, customer: 15, hq: -10, finance: 5 } }
        ]
    },
    {
        id: "social_crisis_1",
        title: "Video yayıldı",
        category: "MÜŞTERİ",
        desc: "Müdürüm, bir müşteri Enes'in ona kaba davrandığı bir video paylaşmış. 500 bin izlenme, yorumlar felaket.",
        character: GIZEM,
        options: [
            { text: "Hemen özür yayınla, Enes'i uzaklaştır.", effect: { staff: -20, customer: 10, hq: 5, finance: -5 }, nextChainCardId: "social_crisis_2a" },
            { text: "Önce kamera kayıtlarına bakalım.", effect: { staff: 10, customer: -10, hq: -5, finance: 0 }, nextChainCardId: "social_crisis_2b" }
        ]
    },
    {
        id: "social_crisis_2a",
        isChainCard: true,
        title: "Ekip iş bıraktı",
        category: "EKİP",
        desc: "Müdürüm, Enes'i dinlemeden uzaklaştırdık diye ekip kasaları kapattı. \"Sıradaki biz miyiz\" diyorlar.",
        character: CAN,
        options: [
            { text: "Enes'i geri çağır, ekipten özür dile.", effect: { staff: 20, customer: -10, hq: -10, finance: -5 } },
            { text: "İşe dönmeyene tutanak tutulur.", effect: { staff: -20, customer: -5, hq: 10, finance: 0 } }
        ]
    },
    {
        id: "social_crisis_2b",
        isChainCard: true,
        title: "Kayıtlar ortada",
        category: "MÜŞTERİ",
        desc: "Müdürüm, kayıtlarda müşteri Enes'e hakaret edip bardak fırlatıyor. Paylaşalım mı?",
        character: GIZEM,
        options: [
            { text: "Paylaş, gerçek ortaya çıksın.", effect: { staff: 15, customer: 10, hq: -5, finance: 0 } },
            { text: "Paylaşma. Müşteriyle özel görüşüp konuyu kapat.", effect: { staff: 5, customer: 0, hq: 10, finance: 0 } }
        ]
    },
    {
        id: "semih_depo_yakalanma",
        title: "Depoda Semih",
        category: "EKİP",
        desc: "Müdürüm, Semih'i mesai saatinde depoda karşıdaki kozmetikçiden Elif'le yakaladım. AVM güvenliği de görmüş. Batıkan Bey duyarsa soruşturma açar.",
        character: CAN,
        options: [
            { text: "Batıkan Bey duymasın, Semih'i ben uyarırım.", effect: { staff: 10, customer: 0, hq: -10, finance: 0 }, queueEvent: { eventId: "semih_depo_followup_a", delayWeeks: 3 } },
            { text: "Kural kuraldır, bölgeye bildir.", effect: { staff: -15, customer: 0, hq: 15, finance: 0 }, queueEvent: { eventId: "semih_depo_followup_b", delayWeeks: 3 } },
            { text: "Elif'i bize transfer edelim, beraber satış yapsınlar.", effect: { staff: 5, customer: 10, hq: 0, finance: -10 }, queueEvent: { eventId: "semih_depo_followup_c", delayWeeks: 3 } }
        ]
    },
    {
        id: "semih_depo_followup_a",
        isChainCard: true,
        title: "AVM'den yazı geldi",
        category: "BÖLGE",
        desc: "Müdürüm, AVM yönetimi depo olayını bana resmi yazıyla bildirdi. Benden saklaman hiç hoşuma gitmedi.",
        character: BATIKAN,
        options: [
            { text: "Haklısınız, hata bendeydi.", effect: { staff: 5, customer: 0, hq: -15, finance: 0 } },
            { text: "Semih ciroyu taşıyor, korumam gerekiyordu.", effect: { staff: 0, customer: 5, hq: -10, finance: 0 } }
        ]
    },
    {
        id: "semih_depo_followup_b",
        isChainCard: true,
        title: "Soğuk rüzgâr",
        category: "EKİP",
        desc: "Müdürüm, Semih'e yapılanı ekip haksızlık olarak görüyor. Açık konuşayım, ben de öyle düşünüyorum. İşler yavaşladı.",
        character: FIRAT,
        options: [
            { text: "İşinizi yapın, konu kapandı.", effect: { staff: -15, customer: 0, hq: 10, finance: 0 } },
            { text: "Semih'le Fırat'ı yemeğe götür, barıştır.", effect: { staff: 15, customer: 0, hq: 0, finance: -8 } }
        ]
    },
    {
        id: "semih_depo_followup_c",
        isChainCard: true,
        title: "Semih ile Elif",
        category: "PAZARLAMA",
        desc: "Müdürüm, Semih'le Elif müthiş bir ikili oldu. Birlikte çektikleri video 200 bin izlendi, gençler mağazaya akın ediyor.",
        character: GIZEM,
        options: [
            { text: "İkisine de prim ver.", effect: { staff: 10, customer: 15, hq: 0, finance: -5 } },
            { text: "Göze batmasınlar, normal devam.", effect: { staff: -5, customer: 5, hq: 5, finance: 0 } }
        ]
    },
    {
        id: "firat_gokhan_mining",
        title: "Depoda sunucu",
        category: "EKİP",
        desc: "Müdürüm, Fırat'la Gökhan depodaki yedek sunucularda geceleri kripto kazıyormuş. Elektrik faturası uçmuş ama biraz da kazanmışlar.",
        character: CAN,
        options: [
            { text: "Hemen durdur, sunuculara el koy. Bölgeye söyleme.", effect: { staff: -10, customer: 0, hq: 10, finance: 5 }, queueEvent: { eventId: "firat_gokhan_mining_followup_a", delayWeeks: 2 } },
            { text: "Devam etsinler, kazancın yarısı kasaya.", effect: { staff: 15, customer: 0, hq: -15, finance: 15 }, queueEvent: { eventId: "firat_gokhan_mining_followup_b", delayWeeks: 3 } }
        ]
    },
    {
        id: "firat_gokhan_mining_followup_a",
        isChainCard: true,
        title: "Özür yazılımı",
        category: "EKİP",
        desc: "Müdürüm, madencilik işi için çok mahcubuz. Kasa kuyruğunu kısaltacak bir otomasyon yazdım, kurmama izin verir misin?",
        character: FIRAT,
        options: [
            { text: "Kur, deneyelim.", effect: { staff: 5, customer: 15, hq: -5, finance: 0 } },
            { text: "Resmi olmayan yazılım olmaz.", effect: { staff: -5, customer: 0, hq: 10, finance: 0 } }
        ]
    },
    {
        id: "firat_gokhan_mining_followup_b",
        isChainCard: true,
        title: "Elektrik cezası",
        category: "GÜNLÜK OPERASYON",
        desc: "Müdür Bey, sizin mağazanın elektrik tüketimi üç katına çıkmış, sigortalar iki kez attı. Yönetim ceza kesti, fatura ekte.",
        character: KEMAL,
        options: [
            { text: "Cezayı öde, sunucuları söktür.", effect: { staff: -5, customer: 0, hq: 0, finance: -20 } },
            { text: "Fırat'la Gökhan'a yükle, işten çıkarmakla tehdit et.", effect: { staff: -25, customer: 0, hq: 15, finance: 0 } }
        ]
    },
    {
        id: "can_enes_altercation",
        title: "Kasa önünde kavga",
        category: "MÜŞTERİ",
        desc: "Müdürüm, bir müşteri haksız iade için Enes'e bağırıyor, Enes de karşılık verdi. Adam telefonla çekiyor.",
        character: CAN,
        options: [
            { text: "Enes'in arkasındayız. Müşteriyi kibarca dışarı alın.", effect: { staff: 15, customer: -15, hq: -5, finance: 0 }, queueEvent: { eventId: "can_enes_altercation_followup_a", delayWeeks: 2 } },
            { text: "Müşteriden özür dile, hediye çeki ver.", effect: { staff: -15, customer: 15, hq: 0, finance: -5 }, queueEvent: { eventId: "can_enes_altercation_followup_b", delayWeeks: 2 } }
        ]
    },
    {
        id: "can_enes_altercation_followup_a",
        isChainCard: true,
        title: "Video bizi kurtardı",
        category: "PAZARLAMA",
        desc: "Müdürüm, o kavga videosu yayılmış ama insanlar bizden yana! \"Çalışanına sahip çıkan mağaza\" diye paylaşıyorlar.",
        character: GIZEM,
        options: [
            { text: "Teşekkür paylaşımı yapalım.", effect: { staff: 5, customer: 15, hq: -5, finance: 5 } },
            { text: "Yorum yapmayalım, kapansın.", effect: { staff: 0, customer: 0, hq: 5, finance: 0 } }
        ]
    },
    {
        id: "can_enes_altercation_followup_b",
        isChainCard: true,
        title: "Ekip kırgın",
        category: "EKİP",
        desc: "Müdürüm, Enes'in yerine özür dilediğin için ekip kırgın. Mola odasında sendika konuşuyorlar.",
        character: CAN,
        options: [
            { text: "Hafta sonu herkese izin verelim.", effect: { staff: 20, customer: -5, hq: 0, finance: -5 } },
            { text: "Performans uyarısı yap.", effect: { staff: -20, customer: 0, hq: 10, finance: 0 } }
        ]
    }
];
