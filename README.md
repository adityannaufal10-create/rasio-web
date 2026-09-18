# 🌾 RASIO 10.0 : Anatomi Emisi Sistem Pangan ASEAN
### Platform Interaktif Klasterisasi & Ekonometrika Panel-Spasial
> **Tema:** Analisis Sistem Pangan, Ketahanan Pangan, dan Emisi Spasial  
> **Cakupan:** 44 Negara Asia-Pasifik × 64 Tahun (1961–2024) = 2.816 Observasi  
> **Model Utama:** Spatial Durbin Model (SDM) Time-Fixed Effects (AIC 4752.0)  

---

## 🚀 Fitur Utama
1. **Beranda Interaktif (Scroll Storytelling):** Narasi 4 babak ketimpangan regional, emisi alih guna lahan (LUC), dan ketergantungan spasial.
2. **Peta Spasial & 5 Klaster Pangan (`/clustering`):** Peta tematik Leaflet Esri Dark Gray dengan 4 layer (Klaster, LISA Hotspot 2024, LUC, CH4), profil klaster, dan tabel audit 44 negara.
3. **Ekonometrika Spasial (`/spasial`):** Lintasan Global Moran's I 1961–2024 (+0.255 ➔ +0.729) dan dekomposisi limpahan pupuk N₂O LeSage–Pace (>2× efek domestik).
4. **Simulator Kebijakan Limpahan (`/simulator`):** Kalkulator matematis dampak intervensi pupuk kimia, moratorium deforestasi, dan pengairan sawah padi ke tingkat kawasan.
5. **Peramalan Metana ASEAN (`/forecasting`):** Proyeksi deret waktu 2025–2035 dengan validasi silang 2.904 fold-model walk-forward CV (Drift & ARIMA Ensemble).
6. **Dokumentasi Metodologi (`/metodologi`):** Transparansi pemilihan model panel spasial, matriks bobot W k-NN k=4, dan audit pencilan.

---

## 💻 Menjalankan Secara Lokal

```bash
# 1. Masuk ke folder proyek
cd rasio_web

# 2. Instal dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka di browser
http://localhost:5173
```

---

## 🌐 Panduan Deploy ke Vercel

1. Buat repository baru di GitHub (misal: `rasio-web`).
2. Push seluruh folder ini ke repository GitHub tersebut.
3. Masuk ke [https://vercel.com](https://vercel.com) dengan akun GitHub Anda.
4. Klik **Add New...** ➔ **Project** ➔ Pilih repository `rasio-web`.
5. Pengaturan Vercel:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Klik **Deploy** ➔ Website Anda langsung aktif di domain `.vercel.app`!
