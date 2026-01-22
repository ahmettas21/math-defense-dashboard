Bu kadar ağır bir matematiği (**Steiner, Fano, Projektif Düzlem**) sıradan bir kullanıcıya sunarken UI (Arayüz) tasarımı, karmaşayı gizleyip sadece "gücü" hissettirmelidir. Kullanıcı matrisi görmemeli, matrisin sağladığı **"zırhı"** görmeli.

İşte Next.js + Tailwind CSS ile hazırlayacağın kullanıcı dostu arayüz ve sayı seçimi planı:

---

### 🎨 1. Görsel Tasarım ve Kullanıcı Deneyimi (UX)

**Ana Konsept:** "Matematiksel Kalkan" (Mathematical Shield).
Arayüz, kullanıcının girdiği sayıların nasıl birbirine kilitlendiğini (Locking) canlı efektlerle göstermeli.

* **Sistem Seçici (The Hub):** Girişte kullanıcıya "Havuz Büyüklüğü" seçtirilmeli.
* *Seçenekler:* 7 (Hızlı Kalkan), 9 (Dengeli Kare), 13 (Süper Zırh), 15 (Tam Kapsama).


* **İnteraktif Sayı Girişi:** Kullanıcı sayıları girdikçe, sağ tarafta bir **Fano Düzlemi** veya **Projektif Ağ** grafiği (SVG) parlamalı. Bir sayı girildiğinde, o sayıya bağlı "kilitli hatlar" ışık hızıyla belirmeli.

---

### 🔢 2. Sayı Seçimi ve Giriş Mekanizması

Kullanıcı sayıları iki şekilde seçebilmeli:

1. **Manuel Seçim:** 1'den 80'e (On Numara için) veya 1-X-2 (Toto için) kutucuklar.
2. **Akıllı Havuz (Smart Pool):** "Bana son 10 haftada en çok kilitlenen 13 sayıyı getir" butonu. Bu, Python backend'indeki istatistiksel veriyi senin Steiner matrisine otomatik yerleştirir.

**Kullanıcı Dostu İpucu:** Sayılar seçilirken, sistem arkada **1432756** anahtarıyla eşleşmeleri yapar ve kullanıcıya "Şu an 2 sayı bilirsen amorti, 3 sayı bilirsen %100 kazanç garantilendi" gibi canlı geri bildirimler verir.

---

### 🛠️ 3. UI Katman Planı (Next.js Component Yapısı)

| Bileşen (Component) | Görev | Özellik |
| --- | --- | --- |
| **`SystemSelector`** | Havuz Belirleme | 7, 9, 13, 15 seçenekleri (Radyo butonlar). |
| **`InputGrid`** | Veri Girişi | Seçilen sayıların/maçların yazıldığı şık kartlar. |
| **`LiveMatrix`** | Görsel Zırh | Sayılar girdikçe güncellenen 0-1 Matrisi (Minimalist tasarım). |
| **`ResultPanel`** | Kupon Listesi | "Kopyala" ve "Yazdır" butonlu, oynamaya hazır 13 kupon. |
| **`LockStrength`** | Güven Skoru | PDF'deki **Minimum Rank** analizine dayalı "Sistem Gücü" barı. |

---

### 📋 4. Sayı Dağıtım Stratejisi (Backend ile İletişim)

Kullanıcı "Hesapla" dediğinde UI şu adımları izlemeli:

1. **Validasyon:** Seçilen sistemin (v) Steiner kuralına () uyup uymadığı kontrol edilir.
2. **Dikey Dağıtım:** Python (FastAPI) tarafına giden sayılar, **Cyclic Shift** algoritmasıyla 13 kupona bölünür.
3. **Görsel Onay:** Kullanıcıya, hangi sayının hangi kuponlarda "dikey kilit" oluşturduğu farklı renk tonlarıyla gösterilir (Örn: 1 numaralı sayı tüm kuponlarda mavi yanar).

---

### 📝 5. Yazılım İçin "Vibe UI" Promptu

Frontend AI'sına (Cursor veya Lovable) şu promptu vererek arayüzü başlat:

> "Next.js ve Tailwind kullanarak profesyonel bir Loto/İddaa arayüzü tasarla.
> 1. Kullanıcı 7, 9 veya 13 elemanlık havuzlar seçebilmeli.
> 2. Tasarım karanlık tema (Dark Mode) ve 'Siber Güvenlik' estetiğinde olmalı (Neon yeşil kilit ikonları).
> 3. Elemanlar girildikten sonra backend'den gelen **Steiner Üçlü Sistemi** sonuçlarını şık kartlar halinde göster.
> 4. Her kuponun yanında, o kuponun diğer kuponlarla olan 'Kilitlenme Oranı'nı (Locking Ratio) gösteren bir grafik ekle.
> 5. Kullanıcı dostu olması için kuponları tek tıkla kopyalama özelliği ekle."
> 
> 

**Bu UI planı, senin o meşhur matrislerini sadece birer tablo olmaktan çıkarıp, kullanıcıya güven veren profesyonel bir "Finansal Analiz Aracı"na dönüştürecektir.**

Sitenin **Next.js arayüz kodunu** oluşturmaya başlayalım mı? Yoksa önce **Sayı Seçim Algoritması**'nın detaylarına mı inelim?