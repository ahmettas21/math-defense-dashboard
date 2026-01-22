AI'nın paylaştığı bu teknik sonuçlar, sistemin matematiksel "iskeletini" başarıyla kurduğunu kanıtlıyor; ancak görselden de anlaşıldığı üzere, şu an karşımızda duran şey bir **"Laboratuvar Çıktısı"**. Senin "sayılar yazmalı" dediğin ve dikey kilitleri (vertical locks) net olarak görmek istediğin o profesyonel arayüz için şu düzeltmeleri yapmalıyız:

### 🛠️ UI/UX Revizyon Planı: Sayı ve Kilit Odaklı Dashboard

AI şu an sadece **Incidence Matrix** (Görünüş Matrisi) üzerindeki "1" rakamlarını gösteriyor. Oysa senin ihtiyacın olan, matrisin içine yerleşmiş gerçek sayılardır.

**1. Matris Üzerine Dinamik Sayı Yerleştirme:**

* Siyah kutuların içindeki sabit "1" değerleri kalkmalı.
* Yerine kullanıcının girdiği 13 gerçek sayı (veya maç tahmini) o sütunlara atanmalı.
* **Örnek:** Kullanıcı "1. Sayı: 19" dediğinde, matristeki tüm 1. sütun hücrelerinde "19" yazmalı.

**2. "Generated Coupons" (Üretilen Kuponlar) Kart Yapısı:**

* Ekranın altındaki o küçük metin satırları (1-10-14-15 gibi), üzerine tıklandığında büyüyen **"Kupon Kartları"** haline getirilmeli.
* Bir kupon kartına tıklandığında, o kuponu oluşturan dikey kilitler (vertical locks) ana matris üzerinde neon ışıklarla parlamalı.

**3. "1432756" Dikey Kilit Görselleştirmesi:**

* Sistem, seçilen 7 veya 13 sayının birbirine nasıl "zırh" olduğunu göstermeli.
* **Vertical correspondence table**: Hangi sayının kaç farklı dikey hatta (r=3 veya r=4) korunduğu net bir tabloda sunulmalı.

---

### 📝 AI İçin "Kullanıcı Dostu Arayüz" Promptu

AI'ya (Next.js tarafı için) şu talimatı vererek o "grafik" görüntüsünden kurtul:

> "Backend'deki matematiksel iskelet (Rank 13, STS) doğru çalışıyor. Ancak UI tarafını tamamen **'Sayı Odaklı'** hale getir:
> 1. Matris görünümündeki '1' rakamlarını sil ve yerine kullanıcının girdiği **gerçek numaraları** yerleştir.
> 2. Matrisi bir 'Kilit Paneli'ne dönüştür; her sütun bir sayıyı, her satır bir kuponu temsil etsin.
> 3. Dikey kilitleri (vertical locks) görselleştirmek için, bir sayıya tıklandığında o sayının geçtiği tüm dikey yolları vurgula.
> 4. **1432756 anahtarı** ile üretilen 7'li sistemde, sayılar arasındaki o 'Toplayıcı' ilişkiyi animasyonla göster.
> 5. Kuponları On Numara için 10 sayıya tamamlayan 'Sudoku Denge' mekanizmasını arayüze bir buton olarak ekle."
> 
> 

### 🚀 Neden Bu Değişiklik Şart?

Çünkü senin paylaştığın PDF'deki **Minimum Rank** teorisi, sayılar arasındaki dikey simetriyi korumak üzerinedir. Kullanıcı matris üzerindeki sayıları dikey olarak hizalanmış gördüğünde, 13 sayıdan herhangi 2'si tuttuğunda paranın neden "kesin" olarak bir kuponda toplandığını (locking) anlayacaktır.

**Bu "Sayı Odaklı Dashboard" kodunu hemen Next.js tarafında uygulatalım mı?** Yoksa backend'deki 15 maçlık **Steiner Net** motorunu mu detaylandıralım?