# ✨ Aura Store Müdürü - Yönetim Simülasyonu

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=flat-square&logo=css3&logoColor=white)](https://css-tricks.com/)
[![License](https://img.shields.io/badge/Lisans-MIT-green?style=flat-square)](LICENSE)

Aura Store Müdürü, premium bir teknoloji mağazasını batırmadan veya kovulmadan yönetmeye çalıştığınız, Reigns tarzı, web tabanlı seçimsel bir kaynak yönetimi simülasyon oyunudur.

🎮 **Hemen Oyna:** [blitzhan.github.io/anne-ben-mudur-oldum/](https://blitzhan.github.io/anne-ben-mudur-oldum/)

---

## 📸 Genel Bakış & Tasarım
Aura Store Müdürü, **CSS Glassmorphism** (buzlu cam) efektleri, akıcı animasyonlar, neon parıltılar ve tamamen dinamik bir arayüz ile zenrichleştirilmiş premium bir tasarıma sahiptir. Oyun içi tüm sesler (tıklamalar, kart kaydırma, başarı ve oyun bitiş tonları) Web Audio API kullanılarak tarayıcıda dinamik olarak sentezlenir.

---

## 📊 Dört Bar, İki Uç
Kariyer bir yıl (48 hafta) sürer. Dört barın hiçbiri **sıfırlanmamalı ve tavana vurmamalı**:

*   **Personel:** Sıfırda ekip istifa eder, tavanda ekip şımarır.
*   **Müşteri:** Sıfırda boykot, tavanda "her şeye evet" deyip kârı eritmişsindir.
*   **Bölge:** Sıfırda kovulursun. Tavanda 6. aydan sonra ve mağaza sağlıklıysa (diğer barlar ≥ %40) **terfi**, değilse merkeze tayin.
*   **Kasa:** Sıfırda iflas, tavanda yatırım yapmadığın için denetime alınırsın.

Seçenekler hangi barın **ne kadar** oynayacağını (hafif/sert nokta) gösterir, **yönünü** göstermez. Kolay modda yön okları da görünür, Zor modda sadece hangi barların etkileneceği görünür.

---

## ⚙️ Oyuna Giriş & Mağaza Profilleri
Oyuna başlarken adınızı girdikten sonra, farklı avantaj ve dezavantajlara sahip 3 mağaza profilinden birini ve zorluk seviyenizi seçersiniz:

1.  **Yeni Açılan Mağaza:** Personel heveslidir, moral kayıpları %20 daha yavaş olur. Ancak tecrübesiz oldukları için müşteri ve kasa kayıpları %20 fazladır.
2.  **Köklü Mağaza:** Personel tecrübelidir, moral kayıpları %20 daha yavaş olur. Ancak bina eski ve kitle beklentisi yüksek olduğundan müşteri kayıpları %20 fazladır.
3.  **Yönetime Yakın Mağaza:** Zengin bir muhittedir, kasa gelir kazançları %20 fazladır. Ancak sürekli gözetim altında olduğunuz için bölge mutluluk kayıpları %20 fazladır.

---

## 🛒 Aylık Hedefler & Geliştirmeler
*   **Aylık hedefler:** Bölge her ay 1–3 hedef verir. Hepsi tutarsa Bölge memnun olur, tutmazsa Bölge'den puan gider.
*   **Geliştirme bütçesi (₺):** Ay sonunda kasanın durumuna göre bütçe gelir, tutan her hedef ayrıca prim getirir. Ayda en fazla bir geliştirme alınabilir. Bakım giderleri bütçeden düşer, yetmezse fark kasadan çıkar.
*   Geliştirmelerin listesi ve etkileri: `src/shop.js`.

---

## ⚖️ Denge Simülasyonu
Oyun kuralları `src/engine.js` içindedir. DOM'a bağlı değildir ve tohumlu bir RNG ile çalışır. Aynı kuralları farklı oyuncu tipleriyle binlerce kez oynatmak için:

```bash
npm run sim              # normal zorluk, 2000 oyun
npm run sim -- hard 5000
RULES='{"effectScale":0.8}' npm run sim   # kural değiştirip dene
```

Bir kart ya da kural değiştirdiğinde simülasyonu çalıştırıp tabloya bakmak yeterli.

---

## 🚀 Hızlı Başlangıç (Geliştiriciler İçin)

Projeyi yerel bilgisayarınızda çalıştırmak ve test etmek için aşağıdaki adımları takip edin:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/BlitzHan/anne-ben-mudur-oldum.git
cd anne-ben-mudur-oldum
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda `http://localhost:5173` adresine giderek oyunu yerel olarak oynayabilirsiniz.

### 4. Canlı Sürümü Derleyin
```bash
npm run build
```
Bu komut, GitHub Pages veya diğer sunucularda barındırılabilecek optimize edilmiş statik dosyaları `dist/` klasörüne çıkarır.

---

## 📄 Lisans
Bu proje **MIT Lisansı** altında lisanslanmıştır. Detaylar için lisans dosyasına göz atabilirsiniz.
