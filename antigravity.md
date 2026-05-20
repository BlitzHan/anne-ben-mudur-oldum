# Aura Store Müdürü - Simülasyon Oyunu Belgeleri

Bu dosya, projenin mimarisini, mekaniklerini ve teknoloji yığınını tanımlar. Gelecekteki geliştirme oturumlarında yapay zeka ajanlarının bağlamı hızla anlaması için tasarlanmıştır.

---

## 📌 Proje Özeti
- **Proje Adı:** Aura Store Müdürü
- **Konsept:** Premium teknoloji mağazası (Aura Store) müdürlüğü simülasyonu.
- **Tür:** Seçim tabanlı metrik ve kaynak yönetimi (Reigns benzeri).
- **Hedef:** Mağazadaki kaynakları sıfırlamadan (veya iflas etmeden) olabildiğince uzun süre (hafta bazlı) müdürlük yapmak.

---

## 🛠️ Teknoloji Yığını
- **Arayüz/Tasarım:** Saf HTML5, Özel HSL Renk Paletleri içeren Modern Vanilla CSS (Glassmorphism, Neon Parıltılar, CSS Animasyonları), FontAwesome İkon Seti, Google Fonts (Outfit & Inter).
- **Mantık/Motor:** Vanilla Javascript (ES6 Modülleri).
- **Derleyici/Paketleyici:** Vite v5.x
- **Barındırma:** GitHub Pages (Vite build çıktısı `dist` klasörü dağıtılır).

---

## 📊 Oyun Mekanikleri & Metrikler
Oyuncu her hafta önüne gelen olaylara (iki veya üç seçenekli) karar verir. Bu kararlar 4 temel kaynağı doğrudan etkiler:

1. **Personel Morali:** Çalışanların mutluluk oranı. %0 olursa çalışanlar grev yapar ve oyun biter.
2. **Müşteri Deneyimi:** Aura hayranlarının mağaza deneyimi memnuniyeti. %0 olursa boykot başlar ve oyun biter.
3. **Bölge Mutluluk:** Bölge müdürlüğü ve üst yönetimin memnuniyeti. %0 olursa müdür kovulur ve oyun biter.
4. **Kasa Bütçesi:** Mağazanın finansal rezervi. %0 olursa iflas edilir ve oyun biter.

*Tüm metrikler [0, 100] aralığında sınırlıdır.*

---

## ⚙️ Oyun Kurulumu (Onboarding)
Oyun başlamadan önce oyuncu profilini yapılandırır:
1. **Müdür Adı:** Oyuncu adı.
2. **Mağaza Profili Seçimi:**
   - **Yeni Açılan Mağaza:** Personel heveslidir; personel moral kaybı %20 yavaş olur. Ancak tecrübesiz oldukları için müşteri ve kasa kayıpları %20 fazladır.
   - **Köklü Mağaza:** Personel tecrübelidir; personel moral kaybı %20 yavaş olur. Ancak bina eski ve kitle beklentisi yüksek olduğundan müşteri kayıpları %20 fazladır.
   - **Yönetime Yakın Mağaza:** Zengin muhittedir; kasa gelir kazançları %20 fazladır. Ancak sürekli denetim altında olduğu için bölge mutluluk kayıpları %20 fazladır.
3. **Zorluk Seviyesi:**
   - **Kolay:** Puan kayıpları %20 azaltılır (`* 0.8`).
   - **Normal:** Standart puan etkileri.
   - **Zor:** Puan kayıpları %20 artırılır (`* 1.2`).

---

## 📈 Çarpan Mekanizması (`getModifiedEffect`)
Tüm stat değişiklikleri `main.js` içerisindeki `getModifiedEffect(stat, val, eventId)` fonksiyonu üzerinden hesaplanır. Bu sayede zorluk derecesi, mağaza tipi bonusları ve satın alınan pasif yetenekler otomatik olarak hem gerçek uygulamada hem de arayüz önizlemelerinde (hover neon glow ve seçenek etiketleri) tutarlı biçimde yansıtılır.

---

## 🛒 Aylık Rapor ve Geliştirme Pazarı (AVM Konsepti)
Her 4 haftada bir ay sonu değerlendirmesi yapılır:
- **Aylık Hedef:** Oyuncuya her ay başında rastgele bir hedef verilir (örn: "Kasa bütçesini %60 üzerinde tut"). Hedef başarıyla tamamlanırsa bölge yönetiminden ek bütçe ödülü gelir.
- **AVM Geliştirme Pazarı:** Ay sonlarında oyuncu, kasasındaki bütçe ile kalıcı pasif bonuslar sunan geliştirmeler satın alabilir:
  - `staff_meal` (Müşteri Yorumlu Yemek Ödülü): +4% Personel, +4% Müşteri.
  - `store_breakfast` (AVM Kahvaltı Etkinliği): +6% Personel Morali.
  - `gym_deal` (AVM MacFit Spor Anlaşması): +5% Personel, +2% Bölge.
  - `health_insurance` (Özel Sağlık Sigortası): +7% Personel, +3% Bölge.
  - `security_cams` (iCam Entegrasyonu): Hırsızlık kayıplarını %50 azaltır.
  - `heavy_duty_ac` (AVM Klima Entegrasyonu): İklimlendirme krizlerini engeller.
  - `ergonomic_chairs` (Ergonomik Sandalyeler): +3% Personel, sayım kayıplarını %30 azaltır.

---

## 📂 Dosya Yapısı
- `/index.html`: Oyun ekranı, modal yapısı ve kurulum formlarını barındırır.
- `/src/style.css`: Tüm görsellik, animasyonlar ve glassmorphism tasarımları içerir.
- `/src/main.js`: Oyun döngüsü, olay çekimi, durum (state) yönetimi ve UI güncellemeleri.
- `/src/events.js`: Haftalık rastgele gelen olaylar listesi ve seçenek etkileri veri havuzu.
- `/src/shop.js`: Geliştirme pazarında satılan ürünlerin özellikleri.
- `/src/sound.js`: Oyun içi ses efektlerinin (click, swipe, success, gameover) kontrolü.

---

## 🌐 Küresel Liderlik Tablosu (Global Leaderboard)
Liderlik tablosu, tarayıcılardan doğrudan bağlanabilen ücretsiz bir **Supabase (PostgreSQL)** veritabanı altyapısı kullanır.

- **Bağlantı Türü:** REST API (SDK kurmaya gerek kalmadan doğrudan tarayıcı `fetch` istekleriyle çalışır).
- **Tablo Şeması (`leaderboard`):**
  ```sql
  create table leaderboard (
    id bigint generated always as identity primary key,
    name text not null,
    score integer not null,
    difficulty text not null,
    store_type text not null,
    date text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );
  ```
- **Güvenlik Politikası (RLS):** Supabase üzerinde `public` olarak okuma (`SELECT`) ve ekleme (`INSERT`) işlemlerine izin verilmiştir.
- **Yerel Yedekleme (Fallback):** Oyuncu çevrimdışı olduğunda veya veritabanına erişilemediğinde liderlik tablosu otomatik olarak tarayıcının `localStorage` (yerel depolama) verilerini kullanarak oyunu kesintisiz devam ettirir.
- **Anahtarları Değiştirme:** Kendi Supabase veritabanınızı bağlamak isterseniz, `src/main.js` dosyasının en üstünde yer alan `SUPABASE_URL` ve `SUPABASE_ANON_KEY` sabitlerini kendi projenizin değerleriyle değiştirebilirsiniz.
