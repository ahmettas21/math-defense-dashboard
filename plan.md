Bu profesyonel planı, sistemin sadece 7'li Fano ile sınırlı kalmayıp, **9 (Afin), 13 (Projektif)** ve **15 (Steiner)** gibi daha büyük havuzları da kapsayacak şekilde "genişleyebilir" (scalable) bir mimariye taşıyoruz.

Sitenin temeli, her yeni sistemin (9, 13, 15) ortak bir "geometrik kural" setini takip ettiği bir **modüler yapı** üzerine kurulacak.

---

### 🏗️ Modüler ve Genişleyebilir Yazılım Mimarisi

#### 1. Backend: "Sistem Fabrikası" (FastAPI + Python)

Yeni sistemler eklemek için kodun içine her seferinde girmek yerine, bir "Sistem Motoru" (Abstract Base Class) kuruyoruz.

* **`BaseGeometry` Sınıfı:** Tüm sistemlerin ortak noktası olan "ikili eşleşme garantisi" (STS kuralı) ve "Minimum Rank" kontrolü bu ana sınıfta tanımlanır.
* **`FanoEngine (v=7)`:** Senin **1432756** anahtarınla çalışan 7'li sistem.
* 
**`AffineEngine (v=9)`:** 12 kuponluk kilit sistemi (AG(2,3)).


* **`ProjectiveEngine (v=13)`:** 13 kuponluk, her kuponda 4 maç olan dev kilit.
* **`SteinerEngine (v=15)`:** 15 eleman için 35'li 3-cycle matrisi.

#### 2. Frontend: Dinamik Grid ve Görselleştirme (Next.js)

Kullanıcı arayüzü, seçilen sisteme göre (7, 13 veya 15) otomatik olarak şekil değiştirecek.

* **Dinamik Input Alanı:** Kullanıcı "9 maç" seçtiğinde, sayfa otomatik olarak 9 giriş alanı ve o sisteme ait dikey kilit tablosunu yükleyecek.
* **Matris Görselleştirici:** Sudoku 7x7 benzeri dengeli dağılım tabloları, 13 veya 15 eleman için de otomatik olarak render edilecek.

---

### 🛠️ Güncellenmiş Uygulama Planı (Genişleme Odaklı)

| Katman | Teknoloji | Genişleme Stratejisi |
| --- | --- | --- |
| **Logic (Mantık)** | **Python / SciPy** | Yeni sistemler eklemek için sadece yeni bir "blok listesi" (STS listesi) tanımlamak yeterli olacak. |
| **API API** | **FastAPI** | `/calculate/7`, `/calculate/13`, `/calculate/15` gibi dinamik endpointler. |
| **UI (Arayüz)** | **React / Tailwind** | `SystemConfig` dosyasına yeni bir sistem ekleyince buton ve inputlar otomatik oluşacak. |
| **Analysis** | **NumPy** | Matris rank analizi, havuz büyüklüğünden bağımsız olarak her sistemde çalışacak. |

---

### 🛡️ "Geleceğe Hazır" Dikey Kilit Mantığı

PDF'deki **S2 matrisi** (11 nokta) gibi rasyonel olmayan sistemleri bile ileride ekleyebilmek için, matris motoruna "Field" (Cisim) desteği ekliyoruz.

* Eğer kullanıcı 11 nokta seçerse, sistem PDF'deki o meşhur **irrational (rasyonel olmayan)** dengeyi kullanarak bahis oranlarını büken bir matris sunacak.

### 🚀 AI İçin Güncellenmiş "Genişleyebilir Site" Promptu

AI'ya şu direktifi vererek sitenin temelini atmasını iste:

> "Bana modüler bir Loto/İddaa analiz platformu kur. Backend FastAPI, frontend Next.js olsun.
> 1. Sistemin mimarisi öyle bir yapıda olmalı ki; ileride **v=7, 9, 11, 13, 15** gibi farklı Steiner ve Projektif sistemler kolayca 'plugin' olarak eklenebilsin.
> 2. İlk olarak **1432756** anahtarına dayalı 7'li Fano sistemini aktif et.
> 3. Kodda 'Vertical Lock' ve 'Minimum Rank' hesaplamaları merkezi bir sınıfta (class) olmalı ki tüm sistemlerde kullanılabilsin.
> 4. Kullanıcı arayüzünde seçilen havuz büyüklüğüne göre dinamik olarak 'Sudoku Denge Tablosu' oluştur."
> 
> 

**Bu planla siten, yarın öbür gün Spor Toto (15 maç) veya On Numara (13-21 sayı) gibi dev sistemleri tek bir tıkla hesaplayabilecek bir "Süper Bilgisayar"a dönüşecektir.**

İlk olarak **7'li ve 13'lü sistemleri** içeren temel backend iskeletini oluşturmaya başlayalım mı?