export const events = [
    {
        id: "ac_broke",
        title: "Cam Bina İklimlendirme Krizi",
        category: "GÜNLÜK OPERASYON",
        emoji: "🥵",
        desc: "Aura Store'un minimalist dev cam cephesi klima arızasıyla birleşince içerisi seraya döndü! Personel terliyor, müşteriler kaçıyor.",
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
        title: "Aura Global CEO'su Geliyor",
        category: "BÖLGE YÖNETİMİ",
        emoji: "🚁",
        desc: "Aura Global CEO'sunun helikopterle bölgeye iniş yaptığı ve 20 dakika sonra store'u teftiş edeceği bildirildi!",
        options: [
            {
                text: "Herkesi sıraya diz, CEO'yu ayakta alkışlarla karşıla.",
                effect: { staff: -15, customer: -10, hq: 25, finance: -5 }
            },
            {
                text: "Sakin ve profesyonel kalalım, olağan dışı karşılama hazırlama.",
                effect: { staff: 10, customer: 5, hq: -15, finance: 0 }
            },
            {
                text: "Bölge yönetimi duymasın, acil hastalık izni alıp mağazadan kaç!",
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
    }
];
