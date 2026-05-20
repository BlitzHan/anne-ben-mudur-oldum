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

## 📊 Yönetilmesi Gereken 4 Kritik Metrik
Müdür olarak her hafta karşınıza gelen kritik kararlarda seçimler yapmalısınız. Amacınız aşağıdaki 4 metriğin herhangi birini **%0** seviyesine düşürmemektir:

*   **👥 Personel Morali:** Çalışanların motivasyonu. Sıfırlanırsa ekip greve gider.
*   **😊 Müşteri Deneyimi:** Aura hayranlarının mağaza memnuniyeti. Sıfırlanırsa boykot başlar.
*   **🤵 Bölge Mutluluk:** Bölge müdürlüğü ve genel merkezin sizden memnuniyeti. Sıfırlanırsa kovulursunuz.
*   **💰 Kasa Bütçesi:** Mağazanın finansal rezervi. Sıfırlanırsa mağaza iflas eder.

---

## ⚙️ Oyuna Giriş & Mağaza Profilleri
Oyuna başlarken adınızı girdikten sonra, farklı avantaj ve dezavantajlara sahip 3 mağaza profilinden birini ve zorluk seviyenizi seçersiniz:

1.  **Yeni Açılan Mağaza:** Personel heveslidir, moral kayıpları %20 daha yavaş olur. Ancak tecrübesiz oldukları için müşteri ve kasa kayıpları %20 fazladır.
2.  **Köklü Mağaza:** Personel tecrübelidir, moral kayıpları %20 daha yavaş olur. Ancak bina eski ve kitle beklentisi yüksek olduğundan müşteri kayıpları %20 fazladır.
3.  **Yönetime Yakın Mağaza:** Zengin bir muhittedir, kasa gelir kazançları %20 fazladır. Ancak sürekli gözetim altında olduğunuz için bölge mutluluk kayıpları %20 fazladır.

---

## 🛒 AVM Geliştirme Pazarı & Aylık Hedefler
*   **Aylık Hedefler:** Her ay başında bölge yönetimi size bir hedef belirler. Hedefi tutturursanız ay sonunda kasa bütçenize ek prim kazanırsınız.
*   **Geliştirme Pazarı:** Kazandığınız bütçeleri ay sonu raporunda mağazayı geliştirmek için harcayabilirsiniz. Alınan pasif geliştirmeler şunlardır:
    *   🍔 **Müşteri Yorumlu Yemek Ödülü:** Müşteri yorumuna göre personele lüks yemekler. (Her ay sonu +4% Personel Morali, +4% Müşteri Deneyimi)
    *   🥞 **AVM Kahvaltı Etkinliği:** Pazar sabahları ekip kahvaltısı. (Her ay sonu +6% Personel Morali)
    *   💪 **AVM MacFit Spor Anlaşması:** Çalışanlara indirimli spor üyeliği. (Her ay sonu +5% Personel Morali, +2% Bölge Mutluluğu)
    *   🏥 **Özel Sağlık Sigortası:** Ekip için geniş kapsamlı sigorta. (Her ay sonu +7% Personel Morali, +3% Bölge Mutluluğu)
    *   🛡️ **AVM iCam Güvenlik Entegrasyonu:** Hırsızlık olaylarındaki kayıpları %50 azaltır.
    *   ❄️ **AVM Klima & Vent Entegrasyonu:** Mağaza içi klimaların çökme olasılığını sıfırlar.
    *   💺 **Ergonomik Personel Koltukları:** Ay sonu +3% Personel Morali sağlar, sayım/denetim kayıplarını %30 hafifletir.

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
