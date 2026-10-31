import {
  SmartLayoutMode,
  VisualTheme,
  type LKPDDocument,
} from "../types/lkpd";
import { getVisualUrlById } from "./curriculumData";
import { INITIAL_BANK_SOAL } from "./bankSoalData";

export const TEMPLATE_LKPD_LIST: LKPDDocument[] = [
  {
    id: "tpl_realistik_lab_sains",
    updatedAt: "2026-10-30T12:00:00.000Z",
    namaSekolah: "SMA Sains Nusantara 01",
    namaGuru: "Ibu Citra Maharani, S.Pd., M.Sc.",
    fase: "Fase E",
    kelas: "Kelas 10 SMA / MA",
    semester: "Semester 1",
    mapel: "Kimia (IPA)",
    materi: "Metode Ilmiah, Keselamatan Kerja Laboratorium, & Perubahan Materi",
    subMateri: "Observasi Fotografi Realistik Alat Gelas Kimia & Reaksi Larutan",
    alokasiWaktu: "2 x 45 Menit",
    modelPembelajaran:
      "Inquiry Learning (Inkuiri & Investigasi Ilmiah)",
    temaVisual: VisualTheme.REALISTIK_LABORATORIUM,
    smartLayoutMode: SmartLayoutMode.AUTO,
    judul:
      "Investigasi Laboratorium Realistik: Keselamatan Kerja & Indikator Reaksi Kimia",
    subjudul:
      "LKPD Desain Gambar Realistik Laboratorium — Dilengkapi Smart Layout CSS Grid & Praktikum Terukur",
    capaianPembelajaran:
      "Peserta didik menerapkan prosedur keselamatan kerja di laboratorium kimia, mengenali fungsi alat gelas presisi, serta menganalisis ciri-ciri reaksi kimia melalui pengamatan empiris.",
    tujuanPembelajaran: [
      "Mengidentifikasi fungsi mikroskop optik, labu Erlenmeyer, gelas kimia, dan tabung reaksi secara akurat.",
      "Menganalisis perubahan warna, suhu, dan pembentukan endapan sebagai bukti terjadinya reaksi kimia.",
      "Menyusun laporan hasil pengamatan laboratorium secara objektif dan sistematis.",
    ],
    petunjukBelajar: [
      "Amati foto realistik peralatan laboratorium dan skema vektor berlabel pada bagian eksplorasi materi.",
      "Gunakan jas praktikum dan kacamata pelindung sebelum melakukan pengujian larutan.",
      "Catat setiap perubahan fisik maupun kimia pada tabel observasi dan jawab butir soal analisis.",
    ],
    alatDanBahan: [
      "Labu Erlenmeyer & Gelas Kimia 250 mL",
      "Tabung reaksi & pipet tetes",
      "Larutan indikator asam-basa alami",
    ],
    ringkasanMateri:
      "Laboratorium sains merupakan ruang investigasi ilmiah yang menuntut ketelitian pengukuran dan kepatuhan terhadap prosedur keselamatan kerja. Alat ukur volume presisi seperti gelas ukur dan pipet volume berbeda fungsinya dengan wadah reaksi seperti gelas kimia (beaker glass) maupun labu Erlenmeyer yang dirancang untuk proses pencampuran dan titrasi.\n\nKetika dua zat direaksikan di dalam tabung reaksi, terjadinya perubahan kimia menghasilkan zat baru yang dapat dikenali melalui empat indikator utama: perubahan warna larutan yang mencolok, pelepasan atau penyerapan kalor (perubahan suhu), terbentuknya gelembung gas, serta munculnya endapan padat di dasar tabung.",
    poinPenting: [
      "Membaca meniskus cekung larutan bening harus sejajar dengan pandangan mata pada skala ukur.",
      "Empat tanda utama reaksi kimia: perubahan warna, perubahan suhu, timbul gas, dan terbentuk endapan.",
      "Selalu tuangkan asam pekat perlahan melalui dinding wadah ke dalam air, bukan sebaliknya.",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_real_lab"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="240" rx="16" fill="#F0F9FF" stroke="#0284C7" stroke-width="2"/>
      <text x="320" y="30" text-anchor="middle" font-size="15" font-weight="700" fill="#0C4A6E">Empat Indikator Empiris Terjadinya Reaksi Kimia</text>
      <rect x="28" y="54" width="136" height="156" rx="12" fill="#FFFFFF" stroke="#0EA5E9" stroke-width="1.8"/>
      <circle cx="96" cy="96" r="22" fill="#0284C7"/>
      <text x="96" y="101" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">01</text>
      <text x="96" y="142" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">Perubahan Warna</text>
      <text x="96" y="164" text-anchor="middle" font-size="11" fill="#475569">Indikator berubah</text>
      <text x="96" y="180" text-anchor="middle" font-size="11" fill="#475569">biru ke merah muda</text>
      <rect x="178" y="54" width="136" height="156" rx="12" fill="#FFFFFF" stroke="#10B981" stroke-width="1.8"/>
      <circle cx="246" cy="96" r="22" fill="#059669"/>
      <text x="246" y="101" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">02</text>
      <text x="246" y="142" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">Timbulnya Gas</text>
      <text x="246" y="164" text-anchor="middle" font-size="11" fill="#475569">Gelembung CO2 / H2</text>
      <text x="246" y="180" text-anchor="middle" font-size="11" fill="#475569">pada permukaan zat</text>
      <rect x="328" y="54" width="136" height="156" rx="12" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.8"/>
      <circle cx="396" cy="96" r="22" fill="#D97706"/>
      <text x="396" y="101" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">03</text>
      <text x="396" y="142" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">Endapan Padat</text>
      <text x="396" y="164" text-anchor="middle" font-size="11" fill="#475569">Zat sukar larut</text>
      <text x="396" y="180" text-anchor="middle" font-size="11" fill="#475569">mengendap di dasar</text>
      <rect x="478" y="54" width="134" height="156" rx="12" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.8"/>
      <circle cx="545" cy="96" r="22" fill="#DC2626"/>
      <text x="545" y="101" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">04</text>
      <text x="545" y="142" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">Perubahan Suhu</text>
      <text x="545" y="164" text-anchor="middle" font-size="11" fill="#475569">Reaksi eksoterm</text>
      <text x="545" y="180" text-anchor="middle" font-size="11" fill="#475569">maupun endoterm</text>
    </svg>`,
    tampilkanDiagramSvg: true,
    keteranganIlustrasi:
      "Gambar 1. Dokumentasi realistik perangkat gelas laboratorium dan skema empat indikator reaksi kimia.",
    aktivitasEksplorasi: {
      judulAktivitas: "Tabel Observasi Alat Gelas & Perubahan Reaksi Larutan",
      instruksi:
        "Amati peralatan pada foto referensi laboratorium serta catat hasil uji pencampuran larutan berikut!",
      kolomTabel: [
        "Nama Alat / Sampel Uji",
        "Fungsi Presisi / Perlakuan",
        "Pengamatan Visual",
        "Kesimpulan (Fisika / Kimia)",
      ],
      barisContoh: [
        [
          "Soda kue + Asam cuka",
          "Dicampur dalam Erlenmeyer",
          "Muncul gelembung gas & dinding dingin",
          "Perubahan Kimia (Endoterm)",
        ],
        ["Larutan ekstrak bunga telang + Air jeruk", "", "", ""],
        ["Garam dapur dilarutkan dalam akuades", "", "", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[11], INITIAL_BANK_SOAL[2], INITIAL_BANK_SOAL[8]],
    refleksiSiswa: [
      "Saya memahami perbedaan fungsi alat ukur presisi dan wadah reaksi di laboratorium.",
      "Saya mampu mengidentifikasi indikator terjadinya reaksi kimia berdasarkan bukti pengamatan nyata.",
    ],
  },
  {
    id: "tpl_kartun_eksperimen",
    updatedAt: "2026-10-30T11:00:00.000Z",
    namaSekolah: "SD Negeri Merdeka Ceria 01",
    namaGuru: "Ibu Siti Rahmawati, S.Pd.",
    fase: "Fase B",
    kelas: "Kelas 4 SD / MI",
    semester: "Semester 1",
    mapel: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    materi: "Gaya di Sekitar Kita: Gaya Otot, Gesek, Pegas, Gravitasi, & Magnet",
    subMateri: "Eksperimen Seru Magnet, Cerita Sains, & Perubahan Wujud",
    alokasiWaktu: "2 x 35 Menit",
    modelPembelajaran: "Experiential Learning (Belajar melalui Praktikum & Pengalaman)",
    temaVisual: VisualTheme.KARTUN,
    judul: "Petualangan Ilmuwan Cilik: Rahasia Gaya Magnet & Zat di Sekitar Kita!",
    subjudul: "LKPD Desain Kartun Ceria — Dilengkapi Eksperimen Mini, Benar/Salah, & Soal Visual",
    capaianPembelajaran:
      "Peserta didik memanfaatkan gejala kemagnetan dalam kehidupan sehari-hari serta mengidentifikasi perubahan wujud zat melalui percobaan sederhana.",
    tujuanPembelajaran: [
      "Membuktikan sifat tarikan magnet terhadap benda logam dan non-logam melalui eksperimen kelompok.",
      "Menganalisis kebenaran pernyataan ilmiah terkait peristiwa mencair, menguap, dan mengembun.",
      "Menyajikan hasil pengamatan percobaan secara jujur, rapi, dan kreatif.",
    ],
    petunjukBelajar: [
      "Tulis nama lengkap dan nama kelompokmu pada kotak identitas di atas.",
      "Siapkan alat eksperimen bersama teman kelompok dengan tertib dan hati-hati.",
      "Kerjakan variasi aktivitas: Eksperimen Mini, Tabel Benar/Salah, dan Pilihan Ganda Bergambar!",
    ],
    alatDanBahan: ["Magnet batang", "Klip kertas & paku kecil", "Pensil kayu, penghapus, & kertas"],
    ringkasanMateri:
      "Pernahkah kamu memperhatikan pintu kulkas yang dapat menutup rapat sendiri atau kompas yang selalu menunjuk arah utara dan selatan? Itu semua bekerja berkat gaya magnet! Magnet memiliki dua kutub, yaitu Kutub Utara (U) dan Kutub Selatan (S).\n\nKutub yang senama bila didekatkan akan tolak-menolak, sedangkan kutub yang berbeda nama akan tarik-menarik. Benda yang dapat ditarik kuat oleh magnet disebut benda magnetis (seperti besi, baja, dan nikel), sedangkan kayu, karet, dan plastik termasuk benda non-magnetis.",
    poinPenting: [
      "Magnet memiliki 2 kutub: Utara (N) dan Selatan (S); kutub tak senama tarik-menarik.",
      "Gaya magnet mampu menembus penghalang tipis seperti kertas atau plastik tipis.",
      "Selain gaya, benda di sekitar kita juga mengalami perubahan wujud karena menerima/melepas kalor.",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_cartoon"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="240" rx="16" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2"/>
      <text x="320" y="30" text-anchor="middle" font-size="15" font-weight="700" fill="#92400E">Sifat Kutub Magnet &amp; Pengelompokan Benda</text>
      <rect x="40" y="55" width="120" height="44" rx="8" fill="#EF4444"/>
      <text x="100" y="83" text-anchor="middle" font-size="15" font-weight="700" fill="#FFFFFF">UTARA (U)</text>
      <rect x="160" y="55" width="120" height="44" rx="8" fill="#0EA5E9"/>
      <text x="220" y="83" text-anchor="middle" font-size="15" font-weight="700" fill="#FFFFFF">SELATAN (S)</text>
      <text x="320" y="83" text-anchor="middle" font-size="18" font-weight="700" fill="#059669">⇄ Tarik</text>
      <rect x="360" y="55" width="120" height="44" rx="8" fill="#EF4444"/>
      <text x="420" y="83" text-anchor="middle" font-size="15" font-weight="700" fill="#FFFFFF">UTARA (U)</text>
      <rect x="480" y="55" width="120" height="44" rx="8" fill="#0EA5E9"/>
      <text x="540" y="83" text-anchor="middle" font-size="15" font-weight="700" fill="#FFFFFF">SELATAN (S)</text>
      <rect x="40" y="128" width="265" height="86" rx="12" fill="#DCFCE7" stroke="#10B981" stroke-width="1.8"/>
      <text x="172" y="154" text-anchor="middle" font-size="13" font-weight="700" fill="#065F46">Benda Magnetis (Ditarik Magnet)</text>
      <text x="172" y="178" text-anchor="middle" font-size="12" fill="#047857">Paku Besi · Klip Baja · Jarum · Peniti</text>
      <rect x="335" y="128" width="265" height="86" rx="12" fill="#FFE4E6" stroke="#F43F5E" stroke-width="1.8"/>
      <text x="467" y="154" text-anchor="middle" font-size="13" font-weight="700" fill="#9F1239">Benda Non-Magnetis (Tidak Ditarik)</text>
      <text x="467" y="178" text-anchor="middle" font-size="12" fill="#BE123C">Kayu · Karet Penghapus · Kertas · Plastik</text>
    </svg>`,
    tampilkanDiagramSvg: true,
    keteranganIlustrasi:
      "Gambar 1. Eksperimen sains seru di kelas beserta skema sifat interaksi kutub magnet.",
    aktivitasEksplorasi: {
      judulAktivitas: "Tabel Pengamatan Detektif Magnet Kelas",
      instruksi:
        "Dekatkan magnet ke benda-benda berikut di mejamu, lalu beri tanda (✓) dan tulis bahan pembuatnya!",
      kolomTabel: ["Nama Benda Uji", "Bahan Pembuat", "Ditarik Magnet?", "Kuat / Lemah / Tidak"],
      barisContoh: [
        ["Klip kertas", "Logam besi/baja", "Ya, ditarik", "Ditarik kuat"],
        ["Pensil tulis", "", "", ""],
        ["Uang logam / Sendok", "", "", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[1], INITIAL_BANK_SOAL[2], INITIAL_BANK_SOAL[8]],
    refleksiSiswa: [
      "Aku senang melakukan eksperimen magnet bersama teman sekelompok.",
      "Aku dapat membedakan benda magnetis dan non-magnetis di sekitarku.",
      "Aku memahami perubahan wujud mencair, menguap, dan mengembun.",
    ],
  },
  {
    id: "tpl_komik_cerita_fase_a",
    updatedAt: "2026-10-30T10:30:00.000Z",
    namaSekolah: "SD Kreatif Pelita Nusantara",
    namaGuru: "Bapak Andi Pratama, S.Pd.",
    fase: "Fase A",
    kelas: "Kelas 2 SD / MI",
    semester: "Semester 1",
    mapel: "Bahasa Indonesia",
    materi: "Menceritakan Urutan Peristiwa dari Komik / Gambar Seri",
    subMateri: "Cerita Bergambar Merawat Tanaman & Kalimat Santun",
    alokasiWaktu: "2 x 35 Menit",
    modelPembelajaran: "Visual Storytelling (Cerita Bergambar & Kontekstual)",
    temaVisual: VisualTheme.KOMIK,
    judul: "Komik Cerita Seri: Kebun Bunga Matahari Bima",
    subjudul: "Lembar Kerja Cerita Bergambar, Menjodohkan, & Membilang Ceria",
    capaianPembelajaran:
      "Peserta didik mampu memahami pesan dari cerita bergambar berurutan serta mengungkapkan kembali alur peristiwa dengan kalimat sederhana yang santun.",
    tujuanPembelajaran: [
      "Mengurutkan peristiwa awal, tengah, dan akhir berdasarkan komik 3 panel.",
      "Menuliskan kalimat tanggapan sederhana dengan huruf kapital di awal kalimat dan tanda titik.",
    ],
    petunjukBelajar: [
      "Perhatikan urutan gambar dari kiri ke kanan seperti membaca komik!",
      "Bacalah cerita pendek dengan suara pelan lalu jawab pertanyaannya.",
    ],
    alatDanBahan: ["Pensil tulis", "Pensil warna untuk menghias catatan"],
    ringkasanMateri:
      "Gambar seri adalah rangkaian gambar yang menceritakan suatu peristiwa secara berurutan dari awal hingga akhir. Dengan mengamati ekspresi tokoh dan kegiatan di setiap kotak panel, kita dapat menyusun cerita yang runtut dan menarik!",
    poinPenting: [
      "Amati tokoh, latar tempat, dan benda pada setiap panel gambar.",
      "Gunakan kata penghubung urutan seperti: Mula-mula, Kemudian, dan Akhirnya.",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_storybook"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: "",
    tampilkanDiagramSvg: false,
    keteranganIlustrasi: "Gambar 1. Urutan 3 panel cerita: Menanam biji, menyiram tunas, dan bunga mekar.",
    aktivitasEksplorasi: {
      judulAktivitas: "Menulis Kalimat Cerita Tiap Panel Gambar",
      instruksi: "Tuliskan 1 kalimat pendek yang menceritakan kegiatan pada masing-masing panel gambar!",
      kolomTabel: ["Nomor Panel", "Waktu Kejadian", "Kalimat Cerita Buatanmu"],
      barisContoh: [
        ["Panel 1 (Kiri)", "Hari Minggu pagi", "Bima menanam biji bunga di dalam pot tanah."],
        ["Panel 2 (Tengah)", "", ""],
        ["Panel 3 (Kanan)", "", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[0], INITIAL_BANK_SOAL[7], INITIAL_BANK_SOAL[6]],
    refleksiSiswa: [
      "Aku dapat menceritakan kembali isi gambar seri dengan lancar.",
      "Aku sudah menggunakan huruf kapital di awal kalimat.",
    ],
  },
  {
    id: "tpl_3d_ekosistem_fase_c",
    updatedAt: "2026-10-30T10:00:00.000Z",
    namaSekolah: "SD Harapan Bangsa",
    namaGuru: "Ibu Dewi Lestari, M.Pd.",
    fase: "Fase C",
    kelas: "Kelas 5 SD / MI",
    semester: "Semester 1",
    mapel: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
    materi: "Harmoni dalam Ekosistem: Rantai & Jaring-Jaring Makanan",
    subMateri: "Siklus Alam, Jaring Makanan, & Algoritma Sehari-hari",
    alokasiWaktu: "2 x 35 Menit",
    modelPembelajaran: "STEAM (Science, Technology, Engineering, Arts, & Mathematics)",
    temaVisual: VisualTheme.DESAIN_3D,
    judul: "Eksplorasi Diorama 3D Bumi: Siklus Air, Energi, & Harmoni Ekosistem",
    subjudul: "LKPD Desain 3D Isometrik — Dilengkapi Soal PG Kompleks AKM & Urutan Kronologi",
    capaianPembelajaran:
      "Peserta didik menganalisis keterkaitan komponen biotik dan abiotik (air, cahaya, tanah) dalam menjaga keseimbangan ekosistem bumi.",
    tujuanPembelajaran: [
      "Mengidentifikasi hubungan siklus air dan hutan terhadap kelangsungan jaring-jaring makanan.",
      "Menyelesaikan soal Pilihan Ganda Kompleks (AKM) tentang dinamika populasi sawah.",
    ],
    petunjukBelajar: [
      "Amati diorama 3D lapisan bumi, hutan, sungai, dan awan hujan pada gambar utama.",
      "Pada soal PG Kompleks, kamu boleh memberi tanda centang pada lebih dari satu jawaban benar!",
    ],
    alatDanBahan: ["Buku siswa IPAS", "Alat tulis"],
    ringkasanMateri:
      "Bumi kita bekerja seperti sistem raksasa yang saling terhubung! Hutan hijau membantu menyerap air hujan ke dalam lapisan tanah, sungai mengalirkan air bersih ke pemukiman dan lautan, lalu panas matahari menguapkan air kembali menjadi awan hujan. Di dalamnya, tumbuhan, hewan, dan manusia hidup berdampingan dalam jaring-jaring kehidupan.",
    poinPenting: [
      "Komponen abiotik (air, tanah, udara, cahaya matahari) menopang kehidupan komponen biotik.",
      "Menjaga kelestarian hutan berarti menjaga ketersediaan air bersih dan keseimbangan rantai makanan.",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_3d"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: INITIAL_BANK_SOAL[3].ilustrasiSoalSvg || "",
    tampilkanDiagramSvg: true,
    keteranganIlustrasi: "Gambar 1. Diorama 3D siklus hidrologi, lapisan tanah, dan rantai makanan ekosistem.",
    aktivitasEksplorasi: {
      judulAktivitas: "Pengamatan Komponen Biotik & Abiotik pada Diorama 3D",
      instruksi: "Temukan komponen hidup (biotik) dan tak hidup (abiotik) yang tampak pada ilustrasi diorama 3D!",
      kolomTabel: ["Komponen pada Gambar", "Jenis (Biotik / Abiotik)", "Peran bagi Lingkungan"],
      barisContoh: [
        ["Pepohonan Hutan", "Biotik", "Menghasilkan oksigen & menahan air tanah"],
        ["Aliran Sungai & Awan", "", ""],
        ["Cahaya Matahari", "", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[3], INITIAL_BANK_SOAL[4]],
    refleksiSiswa: [
      "Saya memahami hubungan antara kelestarian hutan, air, dan rantai makanan.",
      "Saya teliti mengerjakan soal Pilihan Ganda Kompleks yang memiliki banyak jawaban benar.",
    ],
  },
  {
    id: "tpl_anime_smp_fase_d",
    updatedAt: "2026-10-30T09:15:00.000Z",
    namaSekolah: "SMP Negeri 1 Cendekia",
    namaGuru: "Bapak Hendra Kusuma, S.Pd., M.Si.",
    fase: "Fase D",
    kelas: "Kelas 8 SMP / MTs",
    semester: "Semester 1",
    mapel: "Ilmu Pengetahuan Sosial (IPS)",
    materi: "Kegiatan Ekonomi: Permintaan, Penawaran, Harga Pasar, & Literasi Finansial",
    subMateri: "Studi Kasus Distribusi Antardaerah & Matematika Kontekstual",
    alokasiWaktu: "2 x 40 Menit",
    modelPembelajaran: "Problem-Based Learning / PBL (Pemecahan Masalah Kontekstual)",
    temaVisual: VisualTheme.ANIME,
    judul: "Misi Kolaborasi Klub Riset: Konektivitas Wilayah & Stabilitas Harga",
    subjudul: "LKPD Tema Anime Edukasi — Studi Kasus Nyata & Penalaran Kontekstual SMP",
    capaianPembelajaran:
      "Peserta didik menganalisis pengaruh konektivitas antarruang terhadap kegiatan distribusi ekonomi serta merumuskan solusi masalah kelangkaan pangan lokal.",
    tujuanPembelajaran: [
      "Menganalisis dampak gangguan transportasi terhadap kurva penawaran dan fluktuasi harga pasar.",
      "Merumuskan solusi kreatif berbasis koperasi dan teknologi bagi petani daerah.",
    ],
    petunjukBelajar: [
      "Bentuk kelompok diskusi beranggotakan 3–4 orang seperti pada klub riset kelas.",
      "Baca wacana Studi Kasus dengan cermat dan tuliskan argumentasi solusimu secara sistematis.",
    ],
    alatDanBahan: ["Buku IPS Kelas 8", "Alat tulis & penggaris"],
    ringkasanMateri:
      "Kelancaran arus barang dari daerah produsen (pedesaan/pertanian) menuju daerah konsumen (perkotaan) sangat bergantung pada kualitas jaringan jalan, jembatan, dan transportasi laut. Ketika jalur distribusi lancar, biaya logistik rendah dan harga barang terjangkau bagi masyarakat sekaligus menguntungkan petani.",
    poinPenting: [
      "Distribusi menjembatani kesenjangan sumber daya antarruang (desa penghasil sayur & kota pusat jasa).",
      "Inovasi pengolahan pascapanen meningkatkan daya tahan dan nilai tambah produk pertanian.",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_anime"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: "",
    tampilkanDiagramSvg: false,
    keteranganIlustrasi: "Gambar 1. Diskusi kelompok menganalisis peta konektivitas wilayah dan data ekonomi.",
    aktivitasEksplorasi: {
      judulAktivitas: "Peta Masalah & Solusi Distribusi Komoditas Daerah",
      instruksi: "Diskusikan 2 komoditas unggulan daerahmu beserta tantangan distribusinya!",
      kolomTabel: ["Komoditas Unggulan", "Daerah Penghasil", "Kendala Distribusi", "Ide Inovasi Kelompok"],
      barisContoh: [
        ["Sayur & Cabai Segar", "Dataran tinggi desa", "Mudah layu saat perjalanan jauh", "Kemasan berventilasi & pasar tani digital"],
        ["Ikan Laut Segar", "", "", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[5], INITIAL_BANK_SOAL[9]],
    refleksiSiswa: [
      "Saya mampu mengaitkan kondisi geografis dengan naik-turunnya harga barang di pasar.",
      "Saya aktif menyampaikan gagasan solusi saat diskusi kelompok.",
    ],
  },
  {
    id: "tpl_2d_sma_fase_e",
    updatedAt: "2026-10-30T08:30:00.000Z",
    namaSekolah: "SMA Negeri Unggulan Harapan",
    namaGuru: "Ibu Ratna Wulandari, S.E., M.Pd.",
    fase: "Fase E",
    kelas: "Kelas 10 SMA / MA",
    semester: "Semester 1",
    mapel: "Fisika (IPA)",
    materi: "Usaha, Hukum Kekekalan Energi, & Pembangkit Energi Terbarukan",
    subMateri: "Analisis Efisiensi Mikrogrid Surya-Angin-Hidro & Ekonomi Energi",
    alokasiWaktu: "2 x 45 Menit",
    modelPembelajaran: "Project-Based Learning / PjBL (Pembelajaran Berbasis Proyek)",
    temaVisual: VisualTheme.DESAIN_2D,
    judul: "Rancang Bangun Mikrogrid Energi Bersih untuk Kepulauan Indonesia",
    subjudul: "LKPD Desain Vektor 2D Modern — Integrasi Fisika Energi & Ekonomi",
    capaianPembelajaran:
      "Peserta didik menganalisis transformasi energi pada pembangkit listrik terbarukan serta merancang solusi penyediaan energi bersih sesuai potensi geografis lokal.",
    tujuanPembelajaran: [
      "Mengidentifikasi urutan perubahan bentuk energi pada sistem PLTS, PLTB, dan PLTA.",
      "Mengevaluasi kombinasi pembangkit listrik hibrida yang paling efisien untuk wilayah pesisir.",
    ],
    petunjukBelajar: [
      "Amati skema infografis vektor 2D pembangkit listrik energi bersih.",
      "Lengkapi tabel audit potensi energi sebelum menjawab soal analisis.",
    ],
    alatDanBahan: ["Kalkulator ilmiah", "Alat tulis"],
    ringkasanMateri:
      "Transisi menuju energi terbarukan memanfaatkan sumber daya alam yang pulih secara berkelanjutan seperti radiasi surya (fotovoltaik), energi kinetik angin, dan energi potensial gravitasi air terjun. Penggabungan beberapa sumber energi dalam satu jaringan cerdas (smart microgrid) mengatasi kendala cuaca harian.",
    poinPenting: [
      "Sel surya (PV) mengubah energi foton cahaya langsung menjadi arus searah (DC) lalu diubah inverter menjadi AC.",
      "PLTA mengubah energi potensial air (Ep = m·g·h) menjadi energi kinetik turbin dan energi listrik generator.",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_physics"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: INITIAL_BANK_SOAL[10].ilustrasiSoalSvg || "",
    tampilkanDiagramSvg: false,
    keteranganIlustrasi: "Gambar 1. Skema vektor 2D konversi energi surya, angin, dan hidro menuju jaringan mikrogrid.",
    aktivitasEksplorasi: {
      judulAktivitas: "Matriks Perbandingan Pembangkit Energi Terbarukan",
      instruksi: "Lengkapi analisis konversi energi serta keunggulan dan tantangan tiap pembangkit!",
      kolomTabel: ["Jenis Pembangkit", "Transformasi Energi", "Waktu Operasi Optimal", "Lokasi Ideal"],
      barisContoh: [
        ["PLTS (Panel Surya)", "Cahaya → Listrik DC → Listrik AC", "Siang hari cerah (08.00–16.00)", "Atap gedung / dataran terbuka"],
        ["PLTB (Turbin Angin)", "", "", ""],
        ["PLTMH (Mikrohidro)", "", "", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[10]],
    refleksiSiswa: [
      "Saya memahami prinsip kekekalan dan konversi energi pada pembangkit listrik bersih.",
      "Saya dapat merancang solusi energi sesuai karakteristik wilayah Indonesia.",
    ],
  },
  {
    id: "tpl_klasik_sma_fase_f",
    updatedAt: "2026-10-30T08:00:00.000Z",
    namaSekolah: "SMA Sains Nusantara",
    namaGuru: "Dr. Bagus Prasetyo, M.Si.",
    fase: "Fase F",
    kelas: "Kelas 11 SMA / MA",
    semester: "Semester 1",
    mapel: "Biologi",
    materi: "Transpor Membran Sel: Difusi, Osmosis, dan Transpor Aktif",
    subMateri: "Lembar Kerja Praktikum Laboratorium Osmosis Jaringan Tumbuhan",
    alokasiWaktu: "2 x 45 Menit",
    modelPembelajaran: "Inquiry Learning (Inkuiri & Investigasi Ilmiah)",
    temaVisual: VisualTheme.AKADEMIK,
    judul: "Praktikum Biologi Sel: Potensial Air & Keseimbangan Osmotik Membran",
    subjudul: "LKPD Desain Klasik Akademik — Dilengkapi Panduan Eksperimen Lab & Analisis Data",
    capaianPembelajaran:
      "Peserta didik merancang dan melaksanakan penyelidikan ilmiah transpor pasif melintasi membran semipermeabel serta menginterpretasikan perubahan massa jaringan.",
    tujuanPembelajaran: [
      "Melaksanakan prosedur pengukuran perubahan massa jaringan kentang pada larutan hipotonik, isotonik, dan hipertonik.",
      "Menjelaskan peristiwa turgiditas dan plasmolisis sel tumbuhan berdasarkan arah gradien potensial air.",
    ],
    petunjukBelajar: [
      "Patuhi keselamatan kerja laboratorium selama menggunakan alat kaca dan neraca digital.",
      "Catat data kuantitatif hingga satu angka di belakang koma secara akurat.",
    ],
    alatDanBahan: ["Silinder kentang", "Akuades & larutan sukrosa 5%, 20%", "Neraca digital & gelas kimia"],
    ringkasanMateri:
      "Membran plasma memiliki sifat selektif permeabel. Pada peristiwa osmosis, molekul pelarut (air) berdifusi melintasi membran semipermeabel dari larutan berkonsentrasi zat terlarut rendah (hipotonik) menuju larutan berkonsentrasi zat terlarut tinggi (hipertonik) hingga tercapai kesetimbangan isotonik.",
    poinPenting: [
      "Sel tumbuhan dalam larutan hipotonik menyerap air hingga mengalami tekanan turgor (turgid).",
      "Sel tumbuhan dalam larutan hipertonik kehilangan air sehingga membran plasma terlepas dari dinding sel (plasmolisis).",
    ],
    gambarUtamaUrl: getVisualUrlById("vis_science"),
    tampilkanGambarUtama: true,
    ilustrasiUtamaSvg: INITIAL_BANK_SOAL[11].ilustrasiSoalSvg || "",
    tampilkanDiagramSvg: true,
    keteranganIlustrasi: "Gambar 1. Struktur jaringan sel tumbuhan dan model kesetimbangan tabung U osmosis.",
    aktivitasEksplorasi: {
      judulAktivitas: "Tabel Data Kuantitatif Praktikum Osmosis",
      instruksi: "Hitung selisih massa (Δm) dan tentukan kondisi sel setelah perendaman 30 menit!",
      kolomTabel: ["Larutan Uji", "Massa Awal (g)", "Massa Akhir (g)", "Δ Massa & Kondisi Sel"],
      barisContoh: [
        ["0% (Akuades)", "4,0 g", "4,6 g", "+0,6 g — Hipotonik (Sel Turgid)"],
        ["5% Sukrosa", "4,0 g", "4,0 g", ""],
        ["20% Sukrosa", "4,0 g", "3,3 g", ""],
      ],
    },
    daftarSoal: [INITIAL_BANK_SOAL[11]],
    refleksiSiswa: [
      "Saya mampu melaksanakan praktikum osmosis dan mengolah data perubahan massa dengan cermat.",
      "Saya dapat membedakan kondisi sel turgid, normal, dan plasmolisis.",
    ],
  },
];
