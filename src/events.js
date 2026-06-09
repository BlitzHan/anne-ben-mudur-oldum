export const events = [
    {
        id: "ac_broke",
        title: "Cam Bina İklimlendirme Krizi",
        category: "GÜNLÜK OPERASYON",
        emoji: "🥵",
        desc: "Aura Store'un minimalist dev cam cephesi klima arızasıyla birleşince içerisi seraya döndü! Personel terliyor, müşteriler kaçıyor.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Hemen en iyi teknik ekibi çağırıp sistemi sıfırla.",
                effect: { staff: 15, customer: 10, hq: 0, finance: -15 }
            },
            {
                text: "Müşterilere buzlu kahve dağıtarak idare et.",
                effect: { staff: -10, customer: -15, hq: 5, finance: -5 }
            }
        ]
    },
    {
        id: "return_fiasco",
        title: "Kırık AuraPhone İadesi",
        category: "MÜŞTERİ DENEYİMİ",
        emoji: "📱",
        desc: "Bir müşteri, 2 yıl önce aldığı ve ekranı tamamen tuzla buz olmuş AuraPhone'u 'kendi kendine çatladı' diyerek iade etmek istiyor.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Müşteri sadakati adına sıfırıyla değişim yap.",
                effect: { staff: 5, customer: 15, hq: -15, finance: -15 }
            },
            {
                text: "Garanti dışı hasar olduğunu söyleyip iadeyi reddet.",
                effect: { staff: -5, customer: -20, hq: 15, finance: 5 }
            }
        ]
    },
    {
        id: "district_manager",
        title: "Bölge Denetimi",
        category: "ANİ OLAY",
        emoji: "🤵",
        desc: "Bölge Direktörü yarın sabah mağazamıza geliyor. Camların pürüzsüz, masaların tozsuz olması gerek.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Personeli gece mesaisine bırakıp mağazayı parlattır.",
                effect: { staff: -20, customer: 0, hq: 20, finance: -5 }
            },
            {
                text: "Normal temizlik rutini yeterli, ekibi yormayalım.",
                effect: { staff: 15, customer: 0, hq: -15, finance: 0 }
            },
            {
                text: "Direktörü akşam lüks yemeğe götür, mağazayı gezdirtme.",
                effect: { staff: 5, customer: 0, hq: 10, finance: -18 }
            }
        ]
    },
    {
        id: "crypto_miners",
        title: "AuraBook Madencileri",
        category: "SATIŞ FIRSATI",
        emoji: "💻",
        desc: "Kripto madencileri depodaki tüm yüksek işlemcili AuraBook Pro'ları nakit parayla toplu almak istiyor. Ancak bireysel kullanıcılara ürün kalmayacak.",
        options: [
            {
                text: "Hepsini sat, bu ayki ciro rekorunu kıralım!",
                effect: { staff: -5, customer: -15, hq: 15, finance: 25 }
            },
            {
                text: "Kişi başı en fazla 1 adet satma kuralı uygula.",
                effect: { staff: 10, customer: 20, hq: -5, finance: -10 }
            }
        ]
    },
    {
        id: "staff_romance",
        title: "Personel Aşkı",
        category: "PERSONEL YÖNETİMİ",
        emoji: "💖",
        desc: "Reyonlarda görevli iki çalışanımızın teknik oda arkasında flörtleştiği ortaya çıktı. Dedikodular kuyrukları uzatıyor.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Uyar ve ikisinin vardiya saatlerini tamamen ayır.",
                effect: { staff: -10, customer: 5, hq: 10, finance: 0 }
            },
            {
                text: "Aşk engel tanımaz, işlerini aksatmadıkça dokunma.",
                effect: { staff: 15, customer: -5, hq: -15, finance: 0 }
            }
        ]
    },
    {
        id: "display_unit",
        title: "Teşhir AuraPad İndirimi",
        category: "GÜNLÜK OPERASYON",
        emoji: "📐",
        desc: "Müşterinin biri stanttaki kutusuz ve kalemi kayıp son AuraPad Air teşhir ürününü almak için %30 indirim talep ediyor.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "İndirimi onaylayıp ürünü elden çıkar.",
                effect: { staff: 0, customer: 15, hq: -5, finance: 10 }
            },
            {
                text: "Satışı reddet, yeni sevkiyat için rezervasyon yap.",
                effect: { staff: 0, customer: -10, hq: 10, finance: -5 }
            }
        ]
    },
    {
        id: "stolen_headphones",
        title: "Stanttaki Hırsızlık",
        category: "GÜVENLİK",
        emoji: "🎧",
        desc: "Bir şüphelinin teşhir standındaki AuraPods Max kulaklığı kablosunu kesip cebine attığını ve çıkışa koştuğunu gördünüz.",
        character: { name: "Şüpheli Şahıs", title: "Hırsız", emoji: "🕶️" },
        options: [
            {
                text: "Personelle birlikte peşinden koşup sokakta yakala!",
                effect: { staff: -15, customer: -5, hq: 15, finance: 15 }
            },
            {
                text: "Müdahale etmeyip polisi ara ve iCam kayıtlarını ver.",
                effect: { staff: 15, customer: 0, hq: -10, finance: -15 }
            }
        ]
    },
    {
        id: "black_friday",
        title: "AuraPhone Lansman Günü",
        category: "KAMPANYA",
        emoji: "🔥",
        desc: "Yeni AuraPhone lansman günü kapıda yüzlerce insan bekliyor. Bazıları 3 gündür çadırda kalıyor, kaos an meselesi.",
        options: [
            {
                text: "Kapıları aç, herkes aynı anda hücum etsin!",
                effect: { staff: -25, customer: 20, hq: -10, finance: 30 }
            },
            {
                text: "Kordon çek, personel kontrolünde 10'arlı gruplar al.",
                effect: { staff: 10, customer: -10, hq: 20, finance: 10 }
            },
            {
                text: "Sadece VIP davetiyesi olan ön siparişlileri içeri al.",
                effect: { staff: 0, customer: -25, hq: -15, finance: 35 }
            }
        ]
    },
    {
        id: "influencer_hype",
        title: "TikToker Ziyareti",
        category: "PAZARLAMA",
        emoji: "🤳",
        desc: "Ünlü bir tech-influencer, mağazada kutu açılım videosu çekip paylaşmak karşılığında bedava AuraPods Max talep ediyor.",
        character: { name: "Gizem", title: "Teknoloji Influencer'ı", emoji: "🤳" },
        options: [
            {
                text: "Kulaklığı hediye et, viral tanıtımın gücünü kullan.",
                effect: { staff: 0, customer: 10, hq: 15, finance: -15 }
            },
            {
                text: "Nazikçe reddet, 'Mağazamızda bedava ürün yoktur' de.",
                effect: { staff: 5, customer: -10, hq: -5, finance: 0 }
            }
        ]
    },
    {
        id: "pos_down",
        title: "Kasa Ödeme Sistemleri Çöktü",
        category: "ANİ OLAY",
        emoji: "💳",
        desc: "İnternet altyapısındaki sorun nedeniyle Aura ödeme sistemi çalışmıyor! Kasalarda kart çekilemiyor, kuyruk uzuyor.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Kuyruktakilere içecek ikram edip teknik masaya yönlendir.",
                effect: { staff: -5, customer: 15, hq: 0, finance: -5 }
            },
            {
                text: "Sadece nakit geçerli olduğunu yüksek sesle ilan et.",
                effect: { staff: 5, customer: -25, hq: 5, finance: -10 }
            }
        ]
    },
    {
        id: "teahouse_clash",
        title: "Kahveci Esnafla Kavga",
        category: "ANİ OLAY",
        emoji: "☕",
        desc: "Yandaki gurme kahveci esnafı, personelin kapı önünde toplanıp sigara izmaritlerini yere attığını söyleyerek kavga çıkardı.",
        options: [
            {
                text: "Esnaftan özür dile ve çalışanlara kapı önünü yasakla.",
                effect: { staff: -20, customer: 5, hq: 10, finance: 0 }
            },
            {
                text: "Ekibimi yedirmem, 'Sokak kamu malıdır' diyerek tersle.",
                effect: { staff: 20, customer: -5, hq: -15, finance: 0 }
            }
        ]
    },
    {
        id: "wrong_tag",
        title: "AuraBook Fiyat Hatası",
        category: "MÜŞTERİ DENEYİMİ",
        emoji: "🏷️",
        desc: "Normalde 60.000₺ olan AuraBook Pro'nun fiyatı sisteme yanlışlıkla 6.000₺ girilmiş. Bir müşteri bu fiyattan almak için diretiyor.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Hatamızı kabul et ve AuraBook'u 6.000₺'ye ver.",
                effect: { staff: 10, customer: 25, hq: -25, finance: -25 }
            },
            {
                text: "Sistem hatası deyip faturayı iptal et, satışı reddet.",
                effect: { staff: -5, customer: -20, hq: 15, finance: 10 }
            }
        ]
    },
    {
        id: "viral_scandal",
        title: "Twitter Linç Fiyaskosu",
        category: "KAMPANYA",
        emoji: "🐦",
        desc: "Bir çalışanımızın yaşlı bir teyzeye AuraPhone'u anlamadığı için sesini yükselttiği video Twitter'da viral oldu ve linç yiyoruz.",
        character: { name: "Gizem", title: "Teknoloji Influencer'ı", emoji: "🤳" },
        options: [
            {
                text: "Çalışanı hemen kov ve kamuoyuna açık özür mektubu yayınla.",
                effect: { staff: -20, customer: 15, hq: 15, finance: -5 }
            },
            {
                text: "Videoyu çekenleri suçla, çalışanına arka çık.",
                effect: { staff: 20, customer: -20, hq: -20, finance: 0 }
            }
        ]
    },
    {
        id: "birthday_early",
        title: "Müdürün Doğum Günü",
        category: "PERSONEL YÖNETİMİ",
        emoji: "🎂",
        desc: "Bugün sizin doğum gününüz! Ekip sürpriz pasta almış ve akşam mağazayı 1 saat erken kapatıp kutlamayı öneriyor.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Süper! Kepenkleri indirin, parti başlasın.",
                effect: { staff: 25, customer: -10, hq: -15, finance: -10 }
            },
            {
                text: "Kutlamayı mola odasında 10 dakikada bitirelim.",
                effect: { staff: -10, customer: 5, hq: 15, finance: 5 }
            }
        ]
    },
    {
        id: "competitor_sale",
        title: "Rakip Marka Kampanyası",
        category: "PAZARLAMA",
        emoji: "🏢",
        desc: "Karşı binadaki teknoloji market zinciri Aura ürünlerine alternatif 'Yarı Fiyatına' kampanyası başlattı. Müşteri oraya kayıyor.",
        options: [
            {
                text: "Hemen belli ürünlerde 'Aura İndirimi' başlatıp karşılık ver.",
                effect: { staff: -5, customer: 20, hq: 10, finance: -20 }
            },
            {
                text: "Aura kalitesi ve prestiji indirime ihtiyaç duymaz, bekle.",
                effect: { staff: 5, customer: -15, hq: -5, finance: 10 }
            }
        ]
    },
    {
        id: "gift_vouchers",
        title: "Bölge Hediye Çekleri",
        category: "BÖLGE YÖNETİMİ",
        emoji: "🎁",
        desc: "Bölge yönetimi, ekibi ve sadık müşterileri ödüllendirmeniz için mağazamıza 20 adet hediye çeki gönderdi.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Gelen müşterilere hediye et, sadakati artır.",
                effect: { staff: 0, customer: 15, hq: 10, finance: 10 }
            },
            {
                text: "Personel ekibine eşit olarak paylaştır.",
                effect: { staff: 25, customer: 0, hq: -10, finance: -5 }
            }
        ]
    },
    {
        id: "night_robbery",
        title: "Gece Cam Kırma Soygunu",
        category: "ANİ OLAY",
        emoji: "🕵️",
        desc: "Dün gece store'un devasa minimalist ön camını kıran hırsızlar, stantlardaki AuraPhone ve AuraWatch'ları çalıp kaçmış.",
        character: { name: "Şüpheli Şahıs", title: "Hırsız", emoji: "🕶️" },
        options: [
            {
                text: "Bölge yönetimine rapor ver ve sigorta işlemleriyle uğraş.",
                effect: { staff: 0, customer: 0, hq: -15, finance: -5 }
            },
            {
                text: "Bölge duymasın, açığı kasa bütçesinden kapatıp stantları yenile.",
                effect: { staff: 5, customer: 0, hq: 15, finance: -20 }
            }
        ]
    },
    {
        id: "ceo_visit",
        title: "Genel Müdür Sürpriz Ziyareti",
        category: "BÖLGE YÖNETİMİ",
        emoji: "🚘",
        desc: "Aura Türkiye Genel Müdürü'nün bölgedeki mağazaları habersiz gezdiği ve yarım saat içinde size uğrayacağı haberi geldi. Mağaza öğlen yoğunluğunda, reyonlar dağınık!",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Tüm ekibi satıştan çekip acil toparlanma seferberliği başlat.",
                effect: { staff: -15, customer: -10, hq: 25, finance: -5 }
            },
            {
                text: "Sakin ve profesyonel kalalım, mağaza nasılsa öyle görünsün.",
                effect: { staff: 10, customer: 5, hq: -15, finance: 0 }
            },
            {
                text: "'Dış toplantı' bahanesiyle mağazadan ayrıl, yardımcına bırak.",
                effect: { staff: 20, customer: 0, hq: -30, finance: 0 }
            }
        ]
    },
    {
        id: "yearly_count",
        title: "Yıllık Stok Sayımı",
        category: "GÜNLÜK OPERASYON",
        emoji: "📋",
        desc: "Yıllık büyük stok sayım zamanı. Personel ekip hafta sonu boyunca depoda kutu sayıp barkod okutmak zorunda.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Mesai ücretlerini kasadan çift olarak öde ve ekibi motive et.",
                effect: { staff: 10, customer: 0, hq: 10, finance: -15 }
            },
            {
                text: "Fazla mesai bütçesi yok, şirket sadakati için çalışsınlar.",
                effect: { staff: -30, customer: 0, hq: 15, finance: 5 }
            }
        ]
    },
    {
        id: "fake_banknote",
        title: "Sahte Banknot",
        category: "PERSONEL YÖNETİMİ",
        emoji: "💵",
        desc: "Personel ekibinden bir çalışan, gün sonu kasasında sahte bir 200₺ banknot kabul ettiğini panik içinde itiraf etti.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Zararı personelin maaşından kes, gözünü açsın.",
                effect: { staff: -15, customer: 0, hq: 10, finance: 5 }
            },
            {
                text: "Canı sağ olsun, zararı kasa bütçesinden amorti et.",
                effect: { staff: 15, customer: 0, hq: -5, finance: -5 }
            }
        ]
    },
    
    // CAMPAIGN INTRODUCTION SPECIAL EVENTS (Injected dynamically)
    {
        id: "campaign_black_friday_intro",
        title: "Büyük İndirim Kapıda!",
        category: "KAMPANYA ÖNCESİ",
        emoji: "🔥",
        desc: "Batıkan Bey mağazaya uğradı: 'Müdür Bey, önümüzdeki 3 hafta boyunca Black Friday indirimleri aktif olacak. Satışlar artacak ama personel çok yorulacak. Hazır mıyız?'",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Hazırız, kapıları indirimlere açalım! (Finans Kazançları x1.5, Personel Kayıpları x1.5)",
                effect: { staff: 0, customer: 0, hq: 0, finance: 0 }
            }
        ]
    },
    {
        id: "campaign_new_year_intro",
        title: "Yılbaşı Heyecanı!",
        category: "KAMPANYA ÖNCESİ",
        emoji: "🎁",
        desc: "Gizem mağazada çekim yaparken heyecanla yanınıza geldi: 'Yılbaşı çılgınlığı başlıyor! Herkes hediye arayışında. Paylaşımlarımla mağazayı tıklım tıklım dolduracağım!'",
        character: { name: "Gizem", title: "Teknoloji Influencer'ı", emoji: "🤳" },
        options: [
            {
                text: "Mağazayı yılbaşı süsleriyle donatın! (Müşteri Deneyimi Etkileri x1.4, Finans Kazançları x1.2)",
                effect: { staff: 0, customer: 0, hq: 0, finance: 0 }
            }
        ]
    },
    {
        id: "campaign_audit_intro",
        title: "Acil Teftiş Dönemi!",
        category: "KAMPANYA ÖNCESİ",
        emoji: "📋",
        desc: "Batıkan Bey ciddi bir yüz ifadesiyle aradı: 'Müdür, genel müdürlükten denetmenler bölgeye geliyor. Önümüzdeki 2 hafta boyunca gözümüz üzerinizde olacak.'",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Tüm hazırlıkları yapalım, denetimden alnımızın akıyla çıkalım! (Bölge Mutluluğu Etkileri x1.6)",
                effect: { staff: 0, customer: 0, hq: 0, finance: 0 }
            }
        ]
    },
    // Hırsızlık Salgını Zinciri
    {
        id: "theft_epidemic_1",
        title: "Gizemli Kayıplar (Kısım 1)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🕶️",
        desc: "Fırat panikle yanınıza geliyor: 'Müdürüm, reyonlardaki pahalı kulaklıklar ve telefonlar gizemli şekilde kutularından çıkıyor. Bir hırsızlık çetesi dadanmış olabilir!'",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Güvenlik tedbirlerini artırıp ekibi uyaralım.",
                effect: { staff: -5, customer: 0, hq: 5, finance: -5 },
                nextChainCardId: "theft_epidemic_2a"
            },
            {
                text: "Direkt polise ihbarda bulunun, sivil pusu kuralım.",
                effect: { staff: -10, customer: -5, hq: 10, finance: 0 },
                nextChainCardId: "theft_epidemic_2b"
            }
        ]
    },
    {
        id: "theft_epidemic_2a",
        title: "Kameralar Devrede (Kısım 2)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "📹",
        desc: "Ekip reyonlarda sürekli nöbet tutuyor ama hırsızlar çok profesyonel. Müşteriler takip edildiklerini hissedip rahatsız olmaya başladı.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Müşterilerin çantalarını mağaza çıkışında zorunlu aratın.",
                effect: { staff: -5, customer: -20, hq: 5, finance: 5 },
                nextChainCardId: "theft_epidemic_3_bad"
            },
            {
                text: "Bütçe ayırıp sivil dedektif kiralayalım.",
                effect: { staff: 5, customer: 0, hq: 5, finance: -15 },
                nextChainCardId: "theft_epidemic_3_good"
            }
        ]
    },
    {
        id: "theft_epidemic_2b",
        title: "Polis Pususu (Kısım 2)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🚓",
        desc: "Sivil polisler mağazada bekliyor. Müşteriler ortamdaki gerginliği hissedip hızlıca çıkıyor, satışlar durma noktasında.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Polisleri geri çekelim, normal düzene dönelim.",
                effect: { staff: 10, customer: 15, hq: -10, finance: -5 }
            },
            {
                text: "Biraz daha sabredelim, pusuyu bozmayın.",
                effect: { staff: -10, customer: -15, hq: 10, finance: -5 },
                nextChainCardId: "theft_epidemic_3_catch"
            }
        ]
    },
    {
        id: "theft_epidemic_3_good",
        title: "Çete Çökertildi! (Son)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "⚖️",
        desc: "Harika haber! Kiraladığınız özel sivil dedektif, hırsızlık çetesini suçüstü yakaladı. Kayıp mallar kurtarıldı, Bölge Müdürü tebrik etti!",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Tüm ekibe prim dağıtalım! (Müşteri ve Personel +15)",
                effect: { staff: 15, customer: 15, hq: 10, finance: -10 }
            }
        ]
    },
    {
        id: "theft_epidemic_3_bad",
        title: "Boykot ve Şikayet! (Son)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "📢",
        desc: "Çanta arama uygulaması büyük tepki topladı! Müşteriler mağazayı boykot ediyor. Sosyal medyada itibarımız yerle bir oldu.",
        character: { name: "Gizem", title: "Teknoloji Influencer'ı", emoji: "🤳" },
        options: [
            {
                text: "Resmi olarak özür dileyip çantaları aramayı bırakın.",
                effect: { staff: 10, customer: -25, hq: -20, finance: -10 }
            }
        ]
    },
    {
        id: "theft_epidemic_3_catch",
        title: "Suçüstü Yakalama! (Son)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "👮",
        desc: "Polisler çeteyi mağazadan çıkarken kıskıvrak yakaladı! Mağazanın güvenlik algısı tavan yaptı.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Polislere teşekkür et ve mağaza güvenliğini kutla.",
                effect: { staff: 10, customer: 10, hq: 15, finance: 5 }
            }
        ]
    },
    // Sosyal Medya Linci Zinciri
    {
        id: "social_crisis_1",
        title: "Viral Şikayet Videosu (Kısım 1)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🤳",
        desc: "Gizem heyecanla aradı: 'Müdürüm! Bir müşteri, satış temsilcinizin ona kaba davrandığına dair video paylaşmış. Video şu an 500 bin izlendi ve linç ediliyoruz!'",
        character: { name: "Gizem", title: "Teknoloji Influencer'ı", emoji: "🤳" },
        options: [
            {
                text: "Hemen resmi özür yayınlayıp temsilciyi işten uzaklaştıralım.",
                effect: { staff: -20, customer: 10, hq: 5, finance: -5 },
                nextChainCardId: "social_crisis_2a"
            },
            {
                text: "Acele etmeyin, mağaza kamera kayıtlarını inceleyelim.",
                effect: { staff: 10, customer: -10, hq: -5, finance: 0 },
                nextChainCardId: "social_crisis_2b"
            }
        ]
    },
    {
        id: "social_crisis_2a",
        title: "Personel Grevi! (Son)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🪧",
        desc: "Çalışanı haksız yere uzaklaştırdığınız için mağazadaki tüm ekip kasaları kapattı ve iş bıraktı! Mağaza kilitlendi.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Çalışanı geri çağırıp tüm ekipten özür dileyin.",
                effect: { staff: 25, customer: -15, hq: -15, finance: -10 }
            }
        ]
    },
    {
        id: "social_crisis_2b",
        title: "Gerçek Ortaya Çıktı! (Son)",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🏆",
        desc: "Kamera kayıtlarında müşterinin personele hakaretler ettiği ve bardağı fırlattığı görüldü! Videoyu yayınladınız, tüm kamuoyu sizi savundu, itibarınız arttı.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Haklılığımızı kutla ve ekibe teşekkür et.",
                effect: { staff: 15, customer: 20, hq: 15, finance: 5 }
            }
        ]
    },
    {
        id: "semih_depo_yakalanma",
        title: "Depoda Gizli Aşk",
        category: "PERSONEL YÖNETİMİ",
        emoji: "💖",
        desc: "Kıdemli Satış Semih'in, mağaza deposunda AVM'deki başka bir mağazada çalışan Gizem ile mesai saatinde baş başa yakalandığı haberi geldi. Batıkan Bey olayı duyarsa kurumsal disiplin soruşturması açabilir.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Batıkan Bey duymadan olayın üstünü ört ve Semih'i uyar.",
                effect: { staff: 10, hq: -10, finance: 0, customer: 0 },
                queueEvent: { eventId: "semih_depo_followup_a", delayWeeks: 3 }
            },
            {
                text: "Semih'i direkt bölge müdürlüğüne rapor et, kuralları uygula.",
                effect: { staff: -15, hq: 15, finance: 0, customer: 0 },
                queueEvent: { eventId: "semih_depo_followup_b", delayWeeks: 3 }
            },
            {
                text: "Semih'i satışta rekor kırmaya teşvik et, Gizem'i de Aura Store'a transfer etmeyi öner.",
                effect: { staff: 5, customer: 10, hq: 0, finance: -10 },
                queueEvent: { eventId: "semih_depo_followup_c", delayWeeks: 3 }
            }
        ]
    },
    {
        id: "semih_depo_followup_a",
        title: "Dedikodunun Sonu",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🤫",
        isChainCard: true,
        desc: "Semih'in depodaki flörtünü örtbas etmiştiniz ancak AVM yönetimi durumu Batıkan Bey'e resmi yazı ile bildirmiş! Batıkan Bey size güveninin sarsıldığını söylüyor.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Hatamı kabul ediyorum, Semih'i uyaracağım.",
                effect: { hq: -15, staff: 5 }
            },
            {
                text: "Semih çok iyi ciro getiriyor, onu korumak zorundaydım.",
                effect: { hq: -10, customer: 5 }
            }
        ]
    },
    {
        id: "semih_depo_followup_b",
        title: "Disiplin Rüzgarı",
        category: "ZİNCİRLEME GÖREV",
        emoji: "❄️",
        isChainCard: true,
        desc: "Semih'i disipline verdikten sonra mağazada soğuk rüzgarlar esiyor. Tekniker Fırat, Semih'e yapılanın haksızlık olduğunu savunuyor ve işi yavaşlatıyor.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Fırat'ı da uyar, işinizi düzgün yapın.",
                effect: { staff: -15, hq: 10 }
            },
            {
                text: "Semih ile Fırat'ı yemeğe götürüp arayı düzeltmeye çalış.",
                effect: { staff: 15, finance: -8 }
            }
        ]
    },
    {
        id: "semih_depo_followup_c",
        title: "Gizem'in Aura Etkisi",
        category: "ZİNCİRLEME GÖREV",
        emoji: "✨",
        isChainCard: true,
        desc: "Depo flörtünden sonra Semih ve transfer ettiğiniz Gizem harika bir satış ikilisi oldu. Sosyal medyada mağazayı paylaşıp gençleri buraya çekiyorlar!",
        character: { name: "Gizem", title: "Sosyal Medya Sorumlusu", emoji: "📸" },
        options: [
            {
                text: "Bu enerjiyi ödüllendir, prim ver.",
                effect: { staff: 10, customer: 15, finance: -5 }
            },
            {
                text: "Fazla göze batmasınlar, normal çalışmaya devam.",
                effect: { customer: 5, staff: -5 }
            }
        ]
    },
    {
        id: "firat_gokhan_mining",
        title: "Gizli Madencilik Ağı",
        category: "PERSONEL YÖNETİMİ",
        emoji: "🪙",
        desc: "Tekniker Fırat ve Gökhan'ın, mağaza deposundaki yedek sunucuları kullanarak geceleri gizlice Kripto Para madenciliği yaptığı ortaya çıktı! Elektrik faturası fırladı ancak bir miktar coin kazandılar.",
        character: { name: "Gökhan", title: "Satış Temsilcisi", emoji: "🙋‍♂️" },
        options: [
            {
                text: "Madenciliği hemen sonlandır ve sunuculara el koy, Batıkan Bey'e bildirme.",
                effect: { staff: -10, hq: 10, finance: 5 },
                queueEvent: { eventId: "firat_gokhan_mining_followup_a", delayWeeks: 2 }
            },
            {
                text: "Projeyi destekle ama elde edilen gelirin %50'sini mağaza kasasına aktarmalarını iste.",
                effect: { staff: 15, hq: -15, finance: 15 },
                queueEvent: { eventId: "firat_gokhan_mining_followup_b", delayWeeks: 3 }
            }
        ]
    },
    {
        id: "firat_gokhan_mining_followup_a",
        title: "Fırat'ın Özür Yazılımı",
        category: "ZİNCİRLEME GÖREV",
        emoji: "💾",
        isChainCard: true,
        desc: "Madenciliğe son verdiğiniz için Fırat ve Gökhan yaptıkları hatadan ötürü pişman. Fırat, müşterilerin bekleme süresini azaltacak özel bir kasa otomasyon yazılımı geliştirdi ve hediye etmek istiyor.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Yazılımı sisteme kur ve dene.",
                effect: { customer: 15, staff: 5 }
            },
            {
                text: "Güvenlik riski yaratır, resmi yazılımlar dışında bir şey kullanma.",
                effect: { hq: 10, staff: -5 }
            }
        ]
    },
    {
        id: "firat_gokhan_mining_followup_b",
        title: "Elektrik Krizi",
        category: "ZİNCİRLEME GÖREV",
        emoji: "💥",
        isChainCard: true,
        desc: "Desteklediğiniz kripto madenciliği sunucuları aşırı ısıttı; mağazanın elektrik tesisatı arızalandı ve sigortalar gün boyu attı. AVM yönetimi aşırı tüketim tespit edip mağazaya ağır ceza kesti.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Cezayı sessizce kasadan öde ve sistemi söktür.",
                effect: { finance: -20, staff: -5 }
            },
            {
                text: "Sorumluluğu Fırat ve Gökhan'a yık, onları işten çıkarmakla tehdit et.",
                effect: { staff: -25, hq: 15 }
            }
        ]
    },
    {
        id: "can_enes_altercation",
        title: "İnatçı Müşteri Krizi",
        category: "PERSONEL YÖNETİMİ",
        emoji: "😡",
        desc: "Mağazadaki yoğun saatte, çalışanlarımız Can ve Enes'in haksız iade talep eden kaba bir müşteriyle sözlü tartışmaya girdiği görüldü. Müşteri bağıra çağıra kameraya çekiyor.",
        character: { name: "Enes", title: "Satış Danışmanı", emoji: "🧑‍💻" },
        options: [
            {
                text: "Can ve Enes'i destekle, müşteriden mağazayı terk etmesini iste.",
                effect: { staff: 15, customer: -15, hq: -5 },
                queueEvent: { eventId: "can_enes_altercation_followup_a", delayWeeks: 2 }
            },
            {
                text: "Müşteriden Can ve Enes adına özür dile ve hemen hediye çeki ver.",
                effect: { staff: -15, customer: 15, finance: -5 },
                queueEvent: { eventId: "can_enes_altercation_followup_b", delayWeeks: 2 }
            }
        ]
    },
    {
        id: "can_enes_altercation_followup_a",
        title: "Viral Tartışma",
        category: "ZİNCİRLEME GÖREV",
        emoji: "📱",
        isChainCard: true,
        desc: "Müşterinin Can ve Enes ile tartıştığı video sosyal medyada viral oldu! Ancak halk bizim dik duruşumuzu beğendi ve destek kampanyası başlattı.",
        character: { name: "Can", title: "Mağaza Müdür Yardımcısı", emoji: "🏃‍♂️" },
        options: [
            {
                text: "Sosyal medyada mağazanın duruşunu öven bir açıklama yap.",
                effect: { customer: 20, finance: 10 }
            },
            {
                text: "Yorum yapma, konuyu kapat.",
                effect: { hq: 5 }
            }
        ]
    },
    {
        id: "can_enes_altercation_followup_b",
        title: "Ekip Dayanışması",
        category: "ZİNCİRLEME GÖREV",
        emoji: "🤝",
        isChainCard: true,
        desc: "Müşteriye boyun eğdiğiniz için kırılan Can ve Enes, iş arkadaşlarıyla bir araya gelip sendikal haklar ve çalışma koşulları hakkında konuşmaya başladı.",
        character: { name: "Can", title: "Mağaza Müdür Yardımcısı", emoji: "🏃‍♂️" },
        options: [
            {
                text: "Onlarla konuşup bir hafta sonu izin hakkı tanı.",
                effect: { staff: 20, finance: -5 }
            },
            {
                text: "Disiplinsizliğe izin verme, performans uyarısı yap.",
                effect: { staff: -20, hq: 10 }
            }
        ]
    },
    {
        id: "vip_customer_crisis",
        title: "VIP Müşteri Kaprisi",
        category: "MÜŞTERİ DENEYİMİ",
        emoji: "🕶️",
        desc: "Ünlü bir sanatçı korumalarıyla Aura Store'a geldi ve mağazanın diğer tüm müşterilere kapatılmasını talep ediyor. Aksi halde alışveriş yapmadan gidecek.",
        options: [
            {
                text: "Mağazayı boşalt, VIP deneyime öncelik ver.",
                effect: { customer: -15, finance: 20, hq: 5 }
            },
            {
                text: "Herkes eşit hizmet alır, kibarca sırasını beklemesini söyle.",
                effect: { customer: 15, finance: -10, staff: 10 }
            }
        ]
    },
    {
        id: "mall_blackout",
        title: "AVM Elektrik Kesintisi",
        category: "ANİ OLAY",
        emoji: "🔌",
        desc: "AVM'nin ana jeneratöründe arıza çıktı, Aura Store karanlıkta kaldı. Yedek güç sadece kasaları çalıştırıyor, klimalar ve ışıklar kapalı.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Mağazayı açık tut, telefon ışıklarıyla satışa devam!",
                effect: { staff: -12, customer: -15, finance: 12 }
            },
            {
                text: "Güvenlik riski nedeniyle kapıları kapat ve elektrik gelene kadar bekle.",
                effect: { staff: 10, customer: 5, finance: -15, hq: -5 }
            }
        ]
    },
    {
        id: "gizem_brand_deal",
        title: "Gizem'in Sponsorluk Teklifi",
        category: "PERSONEL YÖNETİMİ",
        emoji: "🤳",
        desc: "Gizem, rakip bir teknoloji markasının reklam yüzü olmak için teklif aldığını söyledi. Eğer giderse bizim mağazanın genç kitlesini de yanında götürebilir.",
        character: { name: "Gizem", title: "Sosyal Medya Sorumlusu", emoji: "📸" },
        options: [
            {
                text: "Daha yüksek bir mağaza primi teklif ederek kalmasını sağla.",
                effect: { staff: 15, finance: -15, customer: 5 }
            },
            {
                text: "Kararına saygı duy, yolu açık olsun.",
                effect: { staff: -10, customer: -15, hq: 5 }
            }
        ]
    },
    {
        id: "competitor_spy",
        title: "Rakip Mağaza Ajanı",
        category: "GÜNLÜK OPERASYON",
        emoji: "🕵️‍♂️",
        desc: "Karşı koridordaki rakip telefon mağazasının çalışanlarından birinin, bizim teşhir ürünlerinin ve fiyat etiketlerinin fotoğraflarını çektiği görüldü.",
        character: { name: "Gökhan", title: "Satış Temsilcisi", emoji: "🙋‍♂️" },
        options: [
            {
                text: "Güvenliği çağırıp mağazadan attır, sert tepki göster.",
                effect: { staff: 5, hq: -10, customer: 5 }
            },
            {
                text: "Görmezden gel, hatta yanına gidip en yeni AuraBook broşürünü hediye et.",
                effect: { customer: 15, hq: 10, staff: -5 }
            }
        ]
    },
    {
        id: "staff_audit_bonus",
        title: "Genel Merkez Gizli Müşterisi",
        category: "BÖLGE İLİŞKİLERİ",
        emoji: "🕵️",
        desc: "Genel Merkez'in mağazamıza gizli bir denetmen gönderdiği dedikodusu yayıldı. Personel çok gergin, kimin denetmen olduğunu çözmeye çalışıyor.",
        character: { name: "Enes", title: "Satış Danışmanı", emoji: "🧑‍💻" },
        options: [
            {
                text: "Tüm müşterilere aşırı kibar davranılması talimatını ver.",
                effect: { staff: -10, customer: 15, hq: 10 }
            },
            {
                text: "Rahat olun, her zamanki Aura kalitesinde hizmet verin.",
                effect: { staff: 15, customer: 5, hq: 0 }
            }
        ]
    },
    {
        id: "eco_friendly_initiative",
        title: "Yeşil Mağaza Hareketi",
        category: "GÜNLÜK OPERASYON",
        emoji: "♻️",
        desc: "Tekniker Fırat, mağazada artık eskiyen pilleri ve elektronik atıkları toplayıp geri dönüşüme kazandıracağımız bir yeşil köşe kurmayı öneriyor.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Bütçe ayır ve köşeyi hemen kur.",
                effect: { hq: 15, customer: 10, finance: -8, staff: 5 }
            },
            {
                text: "Şu an ciroya odaklanmalıyız, gereksiz masraf yapmayalım.",
                effect: { hq: -10, finance: 5 }
            }
        ]
    },
    {
        id: "salary_raise_request",
        title: "Toplu Zam Talebi",
        category: "PERSONEL YÖNETİMİ",
        emoji: "💸",
        desc: "Yıllık enflasyon rakamları açıklandıktan sonra ekip, Can'ı sözcü seçip yanınıza gönderdi: 'Müdürüm, maaşlar eridi. İyileştirme istiyoruz; yoksa AVM'deki diğer mağazalara bakmak zorunda kalacağız.'",
        character: { name: "Can", title: "Mağaza Müdür Yardımcısı", emoji: "🏃‍♂️" },
        options: [
            {
                text: "Bölge yönetimine resmi zam talebi raporu hazırlayıp gönder.",
                effect: { staff: 15, hq: -10, finance: 0 }
            },
            {
                text: "'Bütçe yok' deyip şirket politikasının arkasına sığın.",
                effect: { staff: -20, hq: 5, finance: 5 }
            },
            {
                text: "Kendi inisiyatifinle kasadan satış primi havuzu oluştur.",
                effect: { staff: 10, customer: 5, hq: -5, finance: -12 }
            }
        ]
    },
    {
        id: "sick_leave_wave",
        title: "Grip Salgını",
        category: "ANİ OLAY",
        emoji: "🤒",
        desc: "Mevsimsel grip ekibi vurdu: üç çalışan aynı anda raporlu. Hafta sonu yoğunluğu kapıda ve kasalarda personel eksik kalacak.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Kalan ekiple idare edin, herkes ek vardiyaya kalsın.",
                effect: { staff: -15, customer: -10, finance: 5 }
            },
            {
                text: "Bölgeden geçici destek personeli talep et.",
                effect: { staff: 5, customer: 10, hq: -10, finance: -8 }
            }
        ]
    },
    {
        id: "wrong_shipment",
        title: "Yanlış Sevkiyat",
        category: "GÜNLÜK OPERASYON",
        emoji: "📦",
        desc: "Haftalık sevkiyat kolileri açıldığında sipariş edilen AuraPhone'lar yerine koliler dolusu kılıf ve kablo çıktı. Vitrindeki telefon stoğu tükenmek üzere.",
        character: { name: "Gökhan", title: "Satış Temsilcisi", emoji: "🙋‍♂️" },
        options: [
            {
                text: "Standart iade sürecini bekle, hafta boyu eksik stokla satış yap.",
                effect: { customer: -15, hq: 5, finance: -5 }
            },
            {
                text: "Acil kurye ile doğru ürünleri getirt, masrafı kasadan öde.",
                effect: { customer: 10, staff: 5, finance: -12 }
            }
        ]
    },
    {
        id: "mall_service_fee",
        title: "AVM Aidat Zammı",
        category: "GÜNLÜK OPERASYON",
        emoji: "🧾",
        desc: "AVM yönetimi ortak gider aidatlarına %40 zam yaptığını resmi yazıyla tebliğ etti. Aylık bütçe planlaması altüst oldu.",
        options: [
            {
                text: "Zammı sineye çek, bütçeden öde.",
                effect: { finance: -15, hq: 5 }
            },
            {
                text: "Diğer mağaza müdürleriyle birleşip AVM yönetimine itiraz et.",
                effect: { finance: -5, hq: -10, staff: 5 }
            }
        ]
    },
    {
        id: "till_shortage",
        title: "Kasa Açığı",
        category: "GÜNLÜK OPERASYON",
        emoji: "🧮",
        desc: "Gün sonu sayımında kasada 1.500₺ açık çıktı. İade fişleri ile satış kayıtları tutmuyor ve kimse nedenini bilmiyor.",
        character: { name: "Enes", title: "Satış Danışmanı", emoji: "🧑‍💻" },
        options: [
            {
                text: "Gün boyu kamera ve fiş kayıtlarını didik didik incele.",
                effect: { staff: -10, hq: 10, finance: 5 }
            },
            {
                text: "Açığı kapatıp ekibe kasa disiplini eğitimi planla.",
                effect: { staff: 5, hq: -5, finance: -8 }
            }
        ]
    },
    {
        id: "online_reviews",
        title: "Düşen Çevrim İçi Puanlar",
        category: "PAZARLAMA",
        emoji: "⭐",
        desc: "Mağazanın haritalardaki puanı son şikayet yorumlarıyla 2,9'a düştü. Yeni müşteriler mağazaya gelmeden önce bu yorumları okuyor.",
        character: { name: "Gizem", title: "Sosyal Medya Sorumlusu", emoji: "📸" },
        options: [
            {
                text: "Memnun müşterilere çekilişli yorum kampanyası başlat.",
                effect: { customer: 15, hq: 5, finance: -10 }
            },
            {
                text: "Ekiple mesai sonrası kalıp her olumsuz yoruma tek tek cevap yazın.",
                effect: { staff: -10, customer: 10, hq: 5 }
            }
        ]
    },
    {
        id: "staff_poaching",
        title: "Rakipten Transfer Teklifi",
        category: "PERSONEL YÖNETİMİ",
        emoji: "🧲",
        desc: "Gökhan, karşı koridordaki rakip mağazadan %30 zamlı teklif aldığını dürüstçe söyledi. En iyi aksesuar satıcınız o; gidişi hem ekibi hem ciroyu sarsar.",
        character: { name: "Gökhan", title: "Satış Temsilcisi", emoji: "🙋‍♂️" },
        options: [
            {
                text: "Kasadan karşı teklif yap, ek prim sözü ver.",
                effect: { staff: 10, finance: -10 }
            },
            {
                text: "Bölgeden onun için resmi kadro yükseltmesi talep et.",
                effect: { staff: 15, hq: -12 }
            },
            {
                text: "Yolu açık olsun; kimse vazgeçilmez değildir.",
                effect: { staff: -15, customer: -10, finance: 5 }
            }
        ]
    },
    {
        id: "service_backlog",
        title: "Teknik Servis Yığılması",
        category: "MÜŞTERİ DENEYİMİ",
        emoji: "🛠️",
        desc: "Garanti onarımları merkez serviste yığıldı; bekleme süresi 3 haftayı aştı. Cihazını bekleyen müşteriler her gün mağazayı arayıp kasadaki ekibi meşgul ediyor.",
        character: { name: "Fırat", title: "Teknik Destek Sorumlusu", emoji: "🔧" },
        options: [
            {
                text: "Bekleyen müşterilere teşhir fazlası ödünç cihaz tahsis et.",
                effect: { customer: 15, staff: -5, finance: -10 }
            },
            {
                text: "Prosedürü savun: 'Süreç merkezde, elimizden bir şey gelmez.'",
                effect: { customer: -15, staff: 5, hq: 5 }
            },
            {
                text: "Bölgeye eskalasyon yapıp süreci hızlandırmalarını iste.",
                effect: { customer: 10, hq: -10 }
            }
        ]
    },
    {
        id: "mandatory_training",
        title: "Zorunlu E-Eğitim Haftası",
        category: "BÖLGE YÖNETİMİ",
        emoji: "🎓",
        desc: "Genel merkez, tüm personele bu hafta bitmesi gereken zorunlu yeni ürün eğitimi atadı. Tamamlanma oranı bölge karnenize işlenecek; ama hafta sonu kampanya yoğunluğu var.",
        character: { name: "Batıkan Bey", title: "Bölge Müdürü", emoji: "👔" },
        options: [
            {
                text: "Mesai saatinde sırayla tamamlatın, reyonlar ara ara boş kalsın.",
                effect: { customer: -12, staff: -5, hq: 12 }
            },
            {
                text: "Eğitimi sessizce erteleyin, müşteri her şeyden önce gelir.",
                effect: { customer: 5, staff: 5, hq: -15 }
            }
        ]
    },
    {
        id: "corporate_bulk_order",
        title: "Kurumsal Toplu Sipariş",
        category: "SATIŞ FIRSATI",
        emoji: "🏢",
        desc: "Bir şirket, çalışanlarına dağıtmak üzere 30 adet AuraBook almak istiyor; ancak ödemeyi 60 gün vadeli yapmayı şart koşuyor. Nakit akışı sıkışabilir.",
        character: { name: "Semih", title: "Kıdemli Satış Temsilcisi", emoji: "💬" },
        options: [
            {
                text: "Vadeyi kabul et, bölgeye rekor satışı raporla.",
                effect: { finance: -5, hq: 10, customer: 10 }
            },
            {
                text: "'Sadece peşin çalışırız' de, siparişi riske at.",
                effect: { finance: 5, hq: -10, customer: -5 }
            }
        ]
    }
];
