import { QuestionType, type QuestionItem } from "../types/lkpd";
import { getVisualUrlById } from "./curriculumData";

export const INITIAL_BANK_SOAL: QuestionItem[] = [
  {
    id: "bs_cerita_01",
    fase: "Fase A",
    kelas: "Kelas 2 SD / MI",
    mapel: "Bahasa Indonesia",
    materi: "Menceritakan Urutan Peristiwa dari Komik / Gambar Seri",
    tipe: QuestionType.CERITA_BERGAMBAR,
    levelKognitif: "L2 Penerapan",
    gambarSoalUrl: getVisualUrlById("vis_storybook"),
    wacanaCerita:
      "Pada hari Minggu pagi, Bima menanam sebutir biji bunga matahari di dalam pot tanah liat berisi tanah subur (Panel 1). Setiap pagi sebelum berangkat sekolah, Bima rajin menyiram tunas tanamannya di bawah sinar matahari hangat (Panel 2). Dua bulan kemudian, bunga-bunga warna-warni mekar indah hingga mengundang kupu-kupu cantik datang, dan Bima menggambarnya di buku sketsa (Panel 3).",
    pertanyaan:
      "Berdasarkan gambar seri dan cerita Bima di atas: (1) Apa yang dilakukan Bima pada gambar tengah agar tanamannya tumbuh subur? (2) Pesan baik apa yang dapat kita tiru dari sikap Bima?",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 175" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="175" rx="12" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.8"/>
      <rect x="16" y="18" width="138" height="138" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
      <text x="85" y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#92400E">1. Menanam Biji</text>
      <polygon points="62,108 108,108 100,142 70,142" fill="#EA580C"/>
      <ellipse cx="85" cy="108" rx="23" ry="6" fill="#78350F"/>
      <circle cx="85" cy="88" r="6" fill="#B45309"/>
      <path d="M85 68 L85 80" stroke="#0284C7" stroke-width="2" stroke-dasharray="3 2"/>
      <rect x="171" y="18" width="138" height="138" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.8"/>
      <text x="240" y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#075985">2. Menyiram Tunas</text>
      <circle cx="286" cy="56" r="12" fill="#FACC15"/>
      <polygon points="217,112 263,112 255,142 225,142" fill="#EA580C"/>
      <path d="M240 112 L240 84" stroke="#16A34A" stroke-width="3.5" stroke-linecap="round"/>
      <ellipse cx="231" cy="92" rx="9" ry="5" fill="#22C55E"/>
      <ellipse cx="249" cy="88" rx="9" ry="5" fill="#22C55E"/>
      <circle cx="215" cy="70" r="3" fill="#0EA5E9"/><circle cx="224" cy="78" r="3" fill="#0EA5E9"/>
      <rect x="326" y="18" width="138" height="138" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.8"/>
      <text x="395" y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">3. Bunga Mekar</text>
      <polygon points="372,114 418,114 410,142 380,142" fill="#EA580C"/>
      <path d="M395 114 L395 76" stroke="#15803D" stroke-width="4"/>
      <circle cx="395" cy="68" r="18" fill="#FACC15"/>
      <circle cx="395" cy="68" r="9" fill="#92400E"/>
      <circle cx="430" cy="60" r="5" fill="#EC4899"/><circle cx="437" cy="64" r="4" fill="#A855F7"/>
    </svg>`,
    opsi: [],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban:
      "(1) Menyiram tunas tanaman secara rutin di tempat yang cukup cahaya matahari. (2) Sikap tekun, sabar, bertanggung jawab, dan menyayangi tanaman.",
    pembahasan:
      "Soal Cerita Bergambar melatih literasi visual dan kemampuan menghubungkan urutan gambar dengan isi cerita.",
    skor: 20,
  },
  {
    id: "bs_eksperimen_01",
    fase: "Fase B",
    kelas: "Kelas 4 SD / MI",
    mapel: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    materi: "Gaya di Sekitar Kita: Gaya Otot, Gesek, Pegas, Gravitasi, & Magnet",
    tipe: QuestionType.EKSPERIMEN,
    levelKognitif: "L3 Penalaran",
    gambarSoalUrl: getVisualUrlById("vis_cartoon"),
    pertanyaan:
      "Lakukan percobaan 'Benda Magnetis vs Non-Magnetis' sesuai langkah di bawah ini! Catat benda mana saja yang ditarik kuat oleh magnet, lalu tuliskan kesimpulan bahan penyusun benda magnetis!",
    alatEksperimen: [
      "1 buah magnet batang atau magnet U",
      "Klip kertas besi & paku kecil",
      "Penghapus karet, pensil kayu, & penggaris plastik",
      "Selembar kertas tipis sebagai penghalang uji tembus",
    ],
    langkahEksperimen: [
      "Siapkan seluruh benda uji di atas meja kelompokmu secara rapi.",
      "Dekatkan kutub magnet secara perlahan ke klip kertas, paku, karet, kayu, dan plastik.",
      "Uji pula apakah magnet masih dapat menarik klip kertas jika dihalangi selembar kertas tipis.",
      "Gambar atau catat hasil temuanmu pada kotak pengamatan dan tulis kesimpulannya!",
    ],
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 175" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="175" rx="12" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.8"/>
      <rect x="26" y="56" width="84" height="38" rx="6" fill="#EF4444"/>
      <text x="68" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#FFFFFF">UTARA</text>
      <rect x="110" y="56" width="84" height="38" rx="6" fill="#0284C7"/>
      <text x="152" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#FFFFFF">SELATAN</text>
      <path d="M202 64 Q232 52 254 58" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="4 3"/>
      <path d="M202 86 Q232 98 254 92" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="4 3"/>
      <rect x="262" y="22" width="194" height="58" rx="10" fill="#DCFCE7" stroke="#10B981" stroke-width="1.8"/>
      <text x="359" y="43" text-anchor="middle" font-size="12" font-weight="700" fill="#065F46">Ditarik Kuat (Magnetis)</text>
      <text x="359" y="64" text-anchor="middle" font-size="11" font-weight="600" fill="#047857">Paku Besi · Klip Baja · Peniti</text>
      <rect x="262" y="94" width="194" height="58" rx="10" fill="#FFE4E6" stroke="#F43F5E" stroke-width="1.8"/>
      <text x="359" y="115" text-anchor="middle" font-size="12" font-weight="700" fill="#9F1239">Tidak Ditarik (Non-Magnetis)</text>
      <text x="359" y="136" text-anchor="middle" font-size="11" font-weight="600" fill="#BE123C">Pensil Kayu · Karet · Plastik</text>
      <text x="110" y="128" text-anchor="middle" font-size="11" font-weight="700" fill="#B45309">Medan Magnet Kutub</text>
    </svg>`,
    opsi: [],
    pernyataanBenarSalah: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban:
      "Benda yang ditarik magnet: klip kertas besi dan paku kecil (logam feromagnetik). Karet, kayu, dan plastik tidak ditarik (non-magnetis). Gaya magnet dapat menembus penghalang tipis seperti kertas.",
    pembahasan:
      "Eksperimen langsung membuktikan sifat magnet menarik logam tertentu (besi, baja, nikel, kobalt) dan menembus benda tipis.",
    skor: 25,
  },
  {
    id: "bs_benarsalah_01",
    fase: "Fase B",
    kelas: "Kelas 4 SD / MI",
    mapel: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    materi: "Wujud Zat dan Perubahannya (Mencair, Membeku, Menguap, Mengembun)",
    tipe: QuestionType.BENAR_SALAH,
    levelKognitif: "L2 Penerapan",
    pertanyaan:
      "Analisislah peristiwa perubahan wujud zat dalam kehidupan sehari-hari berikut, kemudian berilah tanda centang (✓) pada kolom Benar atau Salah!",
    pernyataanBenarSalah: [
      "Es batu yang diletakkan di ruang terbuka berubah menjadi air karena menerima kalor (mencair).",
      "Titik-titik air di bagian luar gelas berisi air es berasal dari air di dalam gelas yang merembes menembus kaca.",
      "Pakaian basah yang dijemur di bawah terik matahari menjadi kering karena peristiwa penguapan.",
      "Kapur barus di lemari pakaian lama-kelamaan mengecil karena mengalami peristiwa membeku.",
    ],
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 168" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="168" rx="12" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.8"/>
      <rect x="22" y="34" width="112" height="98" rx="12" fill="#DBEAFE" stroke="#0284C7" stroke-width="2"/>
      <rect x="56" y="50" width="44" height="34" rx="6" fill="#93C5FD" stroke="#1D4ED8" stroke-width="1.5"/>
      <text x="78" y="104" text-anchor="middle" font-size="13" font-weight="700" fill="#1E3A8A">PADAT</text>
      <text x="78" y="121" text-anchor="middle" font-size="10.5" fill="#1D4ED8">Es / Kapur Barus</text>
      <text x="160" y="72" text-anchor="middle" font-size="11.5" font-weight="700" fill="#EA580C">Mencair →</text>
      <text x="160" y="98" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0284C7">← Membeku</text>
      <rect x="186" y="34" width="108" height="98" rx="12" fill="#D1FAE5" stroke="#059669" stroke-width="2"/>
      <path d="M240 48 Q256 70 256 80 A16 16 0 1 1 224 80 Q224 70 240 48 Z" fill="#10B981"/>
      <text x="240" y="108" text-anchor="middle" font-size="13" font-weight="700" fill="#064E3B">CAIR</text>
      <text x="240" y="123" text-anchor="middle" font-size="10.5" fill="#047857">Air Segar</text>
      <text x="320" y="72" text-anchor="middle" font-size="11.5" font-weight="700" fill="#EA580C">Menguap →</text>
      <text x="320" y="98" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0284C7">← Embun</text>
      <rect x="348" y="34" width="110" height="98" rx="12" fill="#FCE7F3" stroke="#DB2777" stroke-width="2"/>
      <path d="M380 82 Q380 68 394 68 Q402 58 414 64 Q426 64 426 76 L426 82 Z" fill="#F472B6"/>
      <text x="403" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#831843">GAS</text>
      <text x="403" y="122" text-anchor="middle" font-size="10.5" fill="#9D174D">Uap Air / Gas</text>
    </svg>`,
    opsi: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban:
      "1: Benar, 2: Salah (embun berasal dari uap air udara luar yang mendingin), 3: Benar, 4: Salah (menyublim).",
    pembahasan:
      "Titik air di luar gelas es merupakan pengembunan uap air udara sekitar, sedangkan kapur barus habis karena menyublim (padat ke gas).",
    skor: 20,
  },
  {
    id: "bs_pgkompleks_01",
    fase: "Fase C",
    kelas: "Kelas 5 SD / MI",
    mapel: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    materi: "Harmoni dalam Ekosistem: Rantai & Jaring-Jaring Makanan",
    tipe: QuestionType.PILIHAN_GANDA_KOMPLEKS,
    levelKognitif: "L3 Penalaran",
    pertanyaan:
      "Perhatikan skema rantai makanan sawah berikut! Berilah tanda centang (✓) pada SEMUA pernyataan yang BENAR apabila populasi ular sawah menurun drastis!",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 172" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="172" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <circle cx="445" cy="26" r="14" fill="#FACC15"/>
      <rect x="16" y="46" width="96" height="86" rx="12" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
      <path d="M56 86 L64 60 L72 86" fill="none" stroke="#15803D" stroke-width="3"/>
      <circle cx="64" cy="58" r="5" fill="#EAB308"/>
      <text x="64" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#14532D">Padi</text>
      <text x="64" y="122" text-anchor="middle" font-size="10.5" fill="#166534">Produsen</text>
      <text x="125" y="94" text-anchor="middle" font-size="18" font-weight="700" fill="#059669">➔</text>
      <rect x="138" y="46" width="96" height="86" rx="12" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
      <ellipse cx="186" cy="74" rx="16" ry="11" fill="#92400E"/>
      <circle cx="174" cy="64" r="5" fill="#B45309"/>
      <text x="186" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#78350F">Tikus</text>
      <text x="186" y="122" text-anchor="middle" font-size="10.5" fill="#92400E">Konsumen I</text>
      <text x="247" y="94" text-anchor="middle" font-size="18" font-weight="700" fill="#D97706">➔</text>
      <rect x="260" y="46" width="96" height="86" rx="12" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>
      <path d="M286 78 Q302 58 318 78 Q330 90 338 70" fill="none" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
      <text x="308" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#7F1D1D">Ular Sawah</text>
      <text x="308" y="122" text-anchor="middle" font-size="10.5" fill="#991B1B">Konsumen II</text>
      <text x="369" y="94" text-anchor="middle" font-size="18" font-weight="700" fill="#DC2626">➔</text>
      <rect x="382" y="46" width="84" height="86" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
      <path d="M404 76 Q424 56 444 76" fill="none" stroke="#0369A1" stroke-width="3.5" stroke-linecap="round"/>
      <text x="424" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#0C4A6E">Elang</text>
      <text x="424" y="122" text-anchor="middle" font-size="10.5" fill="#0369A1">Konsumen III</text>
    </svg>`,
    opsi: [
      "Populasi tikus sawah meningkat pesat karena berkurangnya pemangsa alami.",
      "Hasil panen padi petani meningkat subur karena tidak ada gangguan hama.",
      "Elang kesulitan memperoleh makanan di area sawah tersebut.",
      "Tanaman padi terancam gagal panen akibat serangan hama tikus yang melonjak.",
    ],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban: "Pernyataan 1, 3, dan 4 benar.",
    pembahasan:
      "Berkurangnya ular memicu ledakan populasi tikus (pernyataan 1), merusak tanaman padi (pernyataan 4), dan mengurangi sumber mangsa bagi burung elang (pernyataan 3).",
    skor: 20,
  },
  {
    id: "bs_urutkan_01",
    fase: "Fase C",
    kelas: "Kelas 5 SD / MI",
    mapel: "Informatika & Koding Dasar",
    materi: "Berpikir Komputasional: Dekomposisi, Pola, & Urutan Algoritma",
    tipe: QuestionType.URUTKAN_LANGKAH,
    levelKognitif: "L2 Penerapan",
    gambarSoalUrl: getVisualUrlById("vis_coding"),
    pertanyaan:
      "Tuliskan angka 1 sampai 4 pada kotak di samping kiri agar langkah algoritma 'Menanak Nasi dengan Rice Cooker' tersusun secara logis dari awal hingga matang!",
    langkahEksperimen: [
      "Tekan tombol 'Cook' pada rice cooker dan tunggu hingga lampu berpindah ke mode 'Warm'.",
      "Cuci beras dengan air bersih sebanyak 2 kali lalu buang air cuciannya.",
      "Takar beras menggunakan gelas ukur dan masukkan ke dalam panci dalam rice cooker.",
      "Tambahkan air bersih sesuai garis takaran, keringkan bagian luar panci, lalu hubungkan steker listrik.",
    ],
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="150" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <rect x="20" y="36" width="94" height="78" rx="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
      <text x="67" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#92400E">INPUT</text>
      <text x="67" y="90" text-anchor="middle" font-size="10.5" fill="#B45309">Beras &amp; Air</text>
      <text x="132" y="80" text-anchor="middle" font-size="18" font-weight="700" fill="#0284C7">➔</text>
      <rect x="150" y="36" width="176" height="78" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
      <text x="238" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="#075985">PROSES ALGORITMA</text>
      <text x="238" y="88" text-anchor="middle" font-size="10.5" fill="#0369A1">Urutan Langkah 1 → 2 → 3 → 4</text>
      <text x="344" y="80" text-anchor="middle" font-size="18" font-weight="700" fill="#059669">➔</text>
      <rect x="362" y="36" width="98" height="78" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
      <text x="411" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#14532D">OUTPUT</text>
      <text x="411" y="90" text-anchor="middle" font-size="10.5" fill="#15803D">Nasi Matang</text>
    </svg>`,
    opsi: [],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban:
      "Urutan benar: (1) Takar beras -> (2) Cuci beras -> (3) Tambah air & hubungkan listrik -> (4) Tekan tombol Cook.",
    pembahasan:
      "Algoritma menuntut urutan instruksi yang logis dan tidak terbalik agar menghasilkan output yang tepat.",
    skor: 15,
  },
  {
    id: "bs_studikasus_01",
    fase: "Fase D",
    kelas: "Kelas 8 SMP / MTs",
    mapel: "Ilmu Pengetahuan Sosial (IPS)",
    materi: "Kegiatan Ekonomi: Permintaan, Penawaran, Harga Pasar, & Literasi Finansial",
    tipe: QuestionType.STUDI_KASUS,
    levelKognitif: "L3 Penalaran",
    gambarSoalUrl: getVisualUrlById("vis_geography"),
    wacanaCerita:
      "Menjelang musim penghujan lebat, jalur jalan pegunungan dari Desa Sukamakmur (sentra sayur mayur) menuju pasar kota sempat terhambat tanah longsor kecil selama 4 hari. Akibatnya, pasokan cabai dan tomat di pasar kota berkurang separuh sementara permintaan rumah tangga dan warung makan tetap tinggi.",
    pertanyaan:
      "Berdasarkan studi kasus tersebut: (a) Bagaimana dampak hambatan distribusi terhadap harga cabai dan tomat di pasar kota maupun pendapatan petani di desa? (b) Usulkan 2 solusi konkret bagi pemerintah daerah dan koperasi petani!",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 155" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="155" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <polygon points="30,115 78,42 126,115" fill="#22C55E" stroke="#15803D" stroke-width="1.8"/>
      <text x="78" y="135" text-anchor="middle" font-size="11.5" font-weight="700" fill="#14532D">Sentra Tani Desa</text>
      <line x1="138" y1="88" x2="322" y2="88" stroke="#DC2626" stroke-width="3.5" stroke-dasharray="6 4"/>
      <rect x="190" y="54" width="84" height="26" rx="6" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
      <text x="232" y="71" text-anchor="middle" font-size="10.5" font-weight="700" fill="#991B1B">Jalur Terhambat</text>
      <rect x="342" y="52" width="106" height="64" rx="10" fill="#DBEAFE" stroke="#0284C7" stroke-width="2"/>
      <text x="395" y="79" text-anchor="middle" font-size="12" font-weight="700" fill="#1E3A8A">Pasar Kota</text>
      <text x="395" y="99" text-anchor="middle" font-size="10.5" font-weight="600" fill="#DC2626">Pasokan ↓ Harga ↑</text>
    </svg>`,
    opsi: [],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban:
      "(a) Di pasar kota harga melonjak karena penawaran turun, sedangkan di desa sayur menumpuk/membusuk sehingga petani merugi. (b) Perbaikan drainase lereng/jalur alternatif dan penyediaan gudang pendingin (cold storage) / pengolahan saus cabai kering di koperasi desa.",
    pembahasan:
      "Mengaitkan konektivitas antarruang geografis dengan mekanisme penawaran dan ketahanan ekonomi petani.",
    skor: 25,
  },
  {
    id: "bs_paud_01",
    fase: "Fase Fondasi",
    kelas: "TK B / RA B (Usia 5–6 Tahun)",
    mapel: "Dasar-Dasar Matematika & Numerasi Awal",
    materi: "Membilang dan Mencocokkan Jumlah Buah & Benda (1–10)",
    tipe: QuestionType.PILIHAN_GANDA,
    levelKognitif: "L1 Pemahaman",
    gambarSoalUrl: getVisualUrlById("vis_paud"),
    pertanyaan:
      "Perhatikan gambar buah apel merah dan jeruk kuning di bawah ini! Berapakah jumlah seluruh buah apel merah?",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="180" rx="12" fill="#FFFBEB" stroke="#F59E0B"/>
      <rect x="20" y="22" width="212" height="136" rx="12" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.8"/>
      <text x="126" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="#B45309">Keranjang Apel Merah</text>
      <circle cx="62" cy="92" r="18" fill="#EF4444"/><ellipse cx="70" cy="72" rx="6" ry="3.5" fill="#22C55E"/>
      <circle cx="118" cy="92" r="18" fill="#EF4444"/><ellipse cx="126" cy="72" rx="6" ry="3.5" fill="#22C55E"/>
      <circle cx="174" cy="92" r="18" fill="#EF4444"/><ellipse cx="182" cy="72" rx="6" ry="3.5" fill="#22C55E"/>
      <circle cx="62" cy="134" r="18" fill="#EF4444"/><ellipse cx="70" cy="114" rx="6" ry="3.5" fill="#22C55E"/>
      <circle cx="118" cy="134" r="18" fill="#EF4444"/><ellipse cx="126" cy="114" rx="6" ry="3.5" fill="#22C55E"/>
      <circle cx="174" cy="134" r="18" fill="#EF4444"/><ellipse cx="182" cy="114" rx="6" ry="3.5" fill="#22C55E"/>
      <rect x="248" y="22" width="212" height="136" rx="12" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="1.8"/>
      <text x="354" y="45" text-anchor="middle" font-size="13" font-weight="700" fill="#0369A1">Keranjang Jeruk Segar</text>
      <circle cx="300" cy="108" r="20" fill="#F97316"/><ellipse cx="308" cy="86" rx="6" ry="3.5" fill="#16A34A"/>
      <circle cx="355" cy="108" r="20" fill="#F97316"/><ellipse cx="363" cy="86" rx="6" ry="3.5" fill="#16A34A"/>
      <circle cx="410" cy="108" r="20" fill="#F97316"/><ellipse cx="418" cy="86" rx="6" ry="3.5" fill="#16A34A"/>
    </svg>`,
    opsi: ["4 buah apel", "5 buah apel", "6 buah apel", "9 buah apel"],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban: "C (6 buah apel)",
    pembahasan:
      "Pada keranjang sebelah kiri terdapat 3 apel di baris atas dan 3 apel di baris bawah, sehingga jumlah seluruh apel merah adalah 3 + 3 = 6 buah.",
    skor: 15,
  },
  {
    id: "bs_fase_a_02",
    fase: "Fase A",
    kelas: "Kelas 1 SD / MI",
    mapel: "Pendidikan Pancasila",
    materi: "Simbol dan Bunyi Kelima Sila pada Perisai Garuda Pancasila",
    tipe: QuestionType.MENJODOHKAN,
    levelKognitif: "L1 Pemahaman",
    pertanyaan:
      "Amati kartu simbol berwarna di bawah ini, lalu pasangkan nama simbol sila Pancasila di lajur kiri dengan bunyi sila yang tepat di lajur kanan!",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 148" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="148" rx="12" fill="#FFFBEB" stroke="#F59E0B"/>
      <rect x="22" y="24" width="96" height="100" rx="10" fill="#1E293B" stroke="#FACC15" stroke-width="2"/>
      <polygon points="70,40 76,58 94,58 80,68 85,86 70,76 55,86 60,68 46,58 64,58" fill="#FACC15"/>
      <text x="70" y="112" text-anchor="middle" font-size="10.5" font-weight="700" fill="#FDE047">Sila Ke-1</text>
      <rect x="135" y="24" width="96" height="100" rx="10" fill="#FFFFFF" stroke="#16A34A" stroke-width="2"/>
      <circle cx="183" cy="60" r="20" fill="#16A34A"/>
      <rect x="179" y="76" width="8" height="16" fill="#78350F"/>
      <text x="183" y="112" text-anchor="middle" font-size="10.5" font-weight="700" fill="#15803D">Sila Ke-3</text>
      <rect x="248" y="24" width="96" height="100" rx="10" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>
      <path d="M276 54 Q296 76 316 54 L308 82 L284 82 Z" fill="#1E293B"/>
      <path d="M272 48 Q266 36 280 44" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M320 48 Q326 36 312 44" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/>
      <text x="296" y="112" text-anchor="middle" font-size="10.5" font-weight="700" fill="#991B1B">Sila Ke-4</text>
      <rect x="361" y="24" width="96" height="100" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
      <path d="M396 86 Q388 62 400 44" fill="none" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
      <path d="M422 86 Q430 62 418 44" fill="none" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
      <text x="409" y="112" text-anchor="middle" font-size="10.5" font-weight="700" fill="#92400E">Sila Ke-5</text>
    </svg>`,
    opsi: [],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [
      "Bintang Emas",
      "Pohon Beringin",
      "Kepala Banteng",
      "Padi dan Kapas",
    ],
    pasanganKanan: [
      "Persatuan Indonesia",
      "Keadilan Sosial bagi Seluruh Rakyat Indonesia",
      "Ketuhanan Yang Maha Esa",
      "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
    ],
    kunciJawaban:
      "Bintang Emas -> Sila 1; Pohon Beringin -> Sila 3; Kepala Banteng -> Sila 4; Padi dan Kapas -> Sila 5",
    pembahasan:
      "Setiap simbol perisai Garuda Pancasila melambangkan nilai luhur sila ke-1 hingga ke-5 secara berurutan.",
    skor: 20,
  },
  {
    id: "bs_fase_b_01",
    fase: "Fase B",
    kelas: "Kelas 4 SD / MI",
    mapel: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    materi: "Tumbuhan Sumber Kehidupan: Bagian Tubuh & Fotosintesis",
    tipe: QuestionType.PILIHAN_GANDA,
    levelKognitif: "L2 Penerapan",
    pertanyaan:
      "Perhatikan skema proses fotosintesis pada daun di bawah ini! Zat yang diserap melalui stomata daun (huruf X) dan zat hasil fotosintesis yang dilepaskan ke udara (huruf Y) secara berturut-turut adalah...",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="200" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <circle cx="76" cy="46" r="24" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>
      <text x="76" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="#B45309">Cahaya Matahari</text>
      <path d="M106 56 L176 86" stroke="#F59E0B" stroke-width="3.5" stroke-dasharray="5 3"/>
      <path d="M168 106 Q245 48 322 106 Q245 164 168 106 Z" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
      <line x1="176" y1="106" x2="314" y2="106" stroke="#DCFCE7" stroke-width="2"/>
      <text x="245" y="103" text-anchor="middle" font-size="13.5" font-weight="700" fill="#FFFFFF">DAUN HIJAU</text>
      <text x="245" y="121" text-anchor="middle" font-size="10.5" font-weight="600" fill="#ECFDF5">(Klorofil)</text>
      <rect x="34" y="128" width="104" height="38" rx="9" fill="#DBEAFE" stroke="#0284C7" stroke-width="2"/>
      <text x="86" y="152" text-anchor="middle" font-size="13" font-weight="700" fill="#075985">Gas X Masuk?</text>
      <path d="M138 144 L182 122" stroke="#0284C7" stroke-width="3"/>
      <rect x="346" y="48" width="104" height="38" rx="9" fill="#DCFCE7" stroke="#059669" stroke-width="2"/>
      <text x="398" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="#065F46">Gas Y Keluar?</text>
      <path d="M312 92 L346 70" stroke="#059669" stroke-width="3"/>
      <rect x="155" y="160" width="180" height="26" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
      <text x="245" y="177" text-anchor="middle" font-size="11" font-weight="700" fill="#92400E">↑ Air dari Akar + Hasil Glukosa</text>
    </svg>`,
    opsi: [
      "Oksigen (O2) dan Karbon dioksida (CO2)",
      "Karbon dioksida (CO2) dan Oksigen (O2)",
      "Nitrogen (N2) dan Uap Air (H2O)",
      "Uap Air (H2O) dan Karbon monoksida (CO)",
    ],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban: "B (Karbon dioksida dan Oksigen)",
    pembahasan:
      "Daun menyerap gas karbon dioksida (X) melalui stomata dan melepaskan gas oksigen (Y).",
    skor: 20,
  },
  {
    id: "bs_fase_d_01",
    fase: "Fase D",
    kelas: "Kelas 8 SMP / MTs",
    mapel: "Matematika",
    materi: "Teorema Pythagoras dan Garis Singgung Lingkaran",
    tipe: QuestionType.PILIHAN_GANDA,
    levelKognitif: "L2 Penerapan",
    pertanyaan:
      "Sebuah tangga disandarkan pada dinding tembok tegak lurus seperti pada gambar berwarna berikut. Jika jarak ujung bawah tangga ke tembok 1,5 meter dan tinggi tembok yang dicapai tangga 2 meter, berapakah panjang tangga (c)?",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 195" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="195" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <rect x="138" y="28" width="28" height="128" rx="4" fill="#F97316" stroke="#C2410C" stroke-width="2"/>
      <polygon points="166,40 166,156 296,156" fill="#DBEAFE" opacity="0.7"/>
      <rect x="110" y="156" width="250" height="10" rx="4" fill="#22C55E"/>
      <rect x="166" y="140" width="16" height="16" fill="#FEF08A" stroke="#0284C7" stroke-width="2"/>
      <line x1="166" y1="40" x2="296" y2="156" stroke="#7C3AED" stroke-width="6" stroke-linecap="round"/>
      <rect x="62" y="82" width="68" height="26" rx="6" fill="#FFFBEB" stroke="#D97706" stroke-width="1.5"/>
      <text x="96" y="99" text-anchor="middle" font-size="12" font-weight="700" fill="#92400E">b = 2,0 m</text>
      <text x="232" y="182" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0369A1">a = 1,5 m</text>
      <rect x="242" y="68" width="84" height="28" rx="7" fill="#F3E8FF" stroke="#7C3AED" stroke-width="1.8"/>
      <text x="284" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#5B21B6">c = ? m</text>
    </svg>`,
    opsi: ["2,2 meter", "2,5 meter", "3,0 meter", "3,5 meter"],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban: "B (2,5 meter)",
    pembahasan:
      "c² = a² + b² = (1,5)² + (2,0)² = 2,25 + 4,00 = 6,25. Maka c = √6,25 = 2,5 meter.",
    skor: 20,
  },
  {
    id: "bs_fase_e_02",
    fase: "Fase E",
    kelas: "Kelas 10 SMA / MA",
    mapel: "Ekonomi (IPS)",
    materi: "Permintaan, Penawaran, Elastisitas, dan Terbentuknya Harga Keseimbangan Pasar",
    tipe: QuestionType.PILIHAN_GANDA,
    levelKognitif: "L2 Penerapan",
    pertanyaan:
      "Berdasarkan grafik keseimbangan pasar komoditas beras lokal berikut, titik ekuilibrium pasar (E) tercapai pada tingkat harga dan kuantitas...",
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="200" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <polygon points="80,40 232.5,95 80,95" fill="#DBEAFE" opacity="0.65"/>
      <polygon points="80,95 232.5,95 80,150" fill="#DCFCE7" opacity="0.65"/>
      <line x1="80" y1="24" x2="80" y2="165" stroke="#1E293B" stroke-width="2.5"/>
      <line x1="80" y1="165" x2="405" y2="165" stroke="#1E293B" stroke-width="2.5"/>
      <text x="70" y="22" text-anchor="end" font-size="11.5" font-weight="700" fill="#0F172A">Harga (Rp)</text>
      <text x="415" y="169" font-size="11.5" font-weight="700" fill="#0F172A">Q (Ton)</text>
      <line x1="102" y1="40" x2="358" y2="150" stroke="#0284C7" stroke-width="3.2" stroke-linecap="round"/>
      <text x="366" y="153" font-size="12" font-weight="700" fill="#0284C7">D (Permintaan)</text>
      <line x1="102" y1="150" x2="358" y2="40" stroke="#059669" stroke-width="3.2" stroke-linecap="round"/>
      <text x="366" y="44" font-size="12" font-weight="700" fill="#059669">S (Penawaran)</text>
      <line x1="80" y1="95" x2="232.5" y2="95" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="232.5" y1="95" x2="232.5" y2="165" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="232.5" cy="95" r="7" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
      <rect x="245" y="77" width="84" height="24" rx="6" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
      <text x="287" y="93" text-anchor="middle" font-size="11" font-weight="700" fill="#991B1B">Titik Ekuilibrium</text>
      <text x="72" y="99" text-anchor="end" font-size="12" font-weight="700" fill="#B45309">14.000</text>
      <text x="232.5" y="183" text-anchor="middle" font-size="12" font-weight="700" fill="#B45309">250</text>
    </svg>`,
    opsi: [
      "Harga Rp12.000/kg dan jumlah 200 ton",
      "Harga Rp14.000/kg dan jumlah 250 ton",
      "Harga Rp14.000/kg dan jumlah 350 ton",
      "Harga Rp250/kg dan jumlah 14.000 ton",
    ],
    pernyataanBenarSalah: [],
    alatEksperimen: [],
    langkahEksperimen: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban: "B (Harga Rp14.000/kg dan jumlah 250 ton)",
    pembahasan:
      "Titik potong kurva D dan S menunjukkan harga keseimbangan Rp14.000 dan kuantitas 250 ton.",
    skor: 20,
  },
  {
    id: "bs_fase_f_01",
    fase: "Fase F",
    kelas: "Kelas 11 SMA / MA",
    mapel: "Biologi",
    materi: "Transpor Membran Sel: Difusi, Osmosis, dan Transpor Aktif",
    tipe: QuestionType.EKSPERIMEN,
    levelKognitif: "L3 Penalaran",
    gambarSoalUrl: getVisualUrlById("vis_health"),
    pertanyaan:
      "Praktikum Laboratorium Osmosis: Ikuti prosedur perendaman silinder umbi kentang berikut, amati diagram tabung U berwarna di bawah, lalu jelaskan perubahan tekstur serta massa kentang pada larutan gula 20%!",
    alatEksperimen: [
      "3 potong silinder umbi kentang ukuran sama (massa awal @ 4,0 gram)",
      "Gelas kimia A (Akuades 0%) & Gelas kimia B (Larutan gula pekat 20%)",
      "Neraca digital, pinset, tisu pengering, & stopwatch",
    ],
    langkahEksperimen: [
      "Timbang massa awal masing-masing potongan kentang menggunakan neraca digital.",
      "Masukkan kentang pertama ke Gelas A (akuades) dan kentang kedua ke Gelas B (larutan gula 20%) selama 30 menit.",
      "Angkat kentang dengan pinset, keringkan permukaannya perlahan, lalu timbang kembali massa akhirnya.",
    ],
    ilustrasiSoalSvg: `<svg viewBox="0 0 480 185" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="185" rx="12" fill="#F8FAFC" stroke="#CBD5E1"/>
      <rect x="167" y="48" width="38" height="106" fill="#FDE68A"/>
      <rect x="275" y="72" width="38" height="82" fill="#BAE6FD"/>
      <rect x="205" y="118" width="70" height="36" fill="#E0F2FE"/>
      <path d="M165 24 L165 125 Q165 157 197 157 L283 157 Q315 157 315 125 L315 24" fill="none" stroke="#1E293B" stroke-width="3"/>
      <path d="M205 24 L205 117 L275 117 L275 24" fill="none" stroke="#1E293B" stroke-width="3"/>
      <line x1="240" y1="115" x2="240" y2="158" stroke="#EF4444" stroke-width="3.5" stroke-dasharray="4 3"/>
      <circle cx="184" cy="74" r="4" fill="#D97706"/><circle cx="188" cy="96" r="4" fill="#D97706"/><circle cx="180" cy="116" r="4" fill="#D97706"/>
      <path d="M262 138 L218 138" stroke="#0284C7" stroke-width="2.5"/>
      <text x="90" y="78" text-anchor="middle" font-size="11.5" font-weight="700" fill="#B45309">Gula 20%</text>
      <text x="90" y="95" text-anchor="middle" font-size="10.5" fill="#92400E">(Hipertonik)</text>
      <text x="390" y="78" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0369A1">Akuades 0%</text>
      <text x="390" y="95" text-anchor="middle" font-size="10.5" fill="#0284C7">(Hipotonik)</text>
      <text x="240" y="176" text-anchor="middle" font-size="11" font-weight="700" fill="#DC2626">← Aliran Molekul Air menembus Membran Sel</text>
    </svg>`,
    opsi: [],
    pernyataanBenarSalah: [],
    pasanganKiri: [],
    pasanganKanan: [],
    kunciJawaban:
      "Pada larutan gula 20% (hipertonik), massa kentang berkurang dan teksturnya menjadi lembek/layu karena molekul air keluar dari vakuola sel kentang menuju larutan gula secara osmosis (plasmolisis).",
    pembahasan:
      "Air berpindah dari potensial air tinggi (dalam sel kentang) menuju potensial air rendah (larutan gula pekat).",
    skor: 25,
  },
];
