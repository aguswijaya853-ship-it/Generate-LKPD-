import imgScience from "../assets/images/edu_science_ecosystem_1793405423665.jpg";
import imgMath from "../assets/images/edu_math_geometry_1793405424663.jpg";
import imgLiteracy from "../assets/images/edu_literacy_nusantara_1793405426479.jpg";
import imgPhysics from "../assets/images/edu_physics_renewable_1793405428062.jpg";
import imgGeography from "../assets/images/edu_social_geography_1793405427659.jpg";
import imgCartoon from "../assets/images/style_cartoon_adventure_1793407562437.jpg";
import imgAnime from "../assets/images/style_anime_classroom_1793407564961.jpg";
import img3d from "../assets/images/style_3d_diorama_1793407565481.jpg";
import imgStorybook from "../assets/images/style_storybook_comic_1793407567269.jpg";
import imgCoding from "../assets/images/topic_coding_robotics_1793409682399.jpg";
import imgHealth from "../assets/images/topic_human_body_health_1793409685293.jpg";
import imgPaud from "../assets/images/topic_early_childhood_play_1793409686256.jpg";
import imgHeritage from "../assets/images/topic_history_heritage_nusantara_1793409685854.jpg";
import imgRealLab from "../assets/images/realistic_science_lab_1793414986511.jpg";
import imgRealNature from "../assets/images/realistic_nature_ecosystem_1793414987614.jpg";
import imgRealHeritage from "../assets/images/realistic_nusantara_heritage_1793414991076.jpg";
import imgRealAstronomy from "../assets/images/realistic_earth_astronomy_1793414991719.jpg";
import imgRealRobotics from "../assets/images/realistic_robotics_stem_1793414992162.jpg";
import {
  QuestionType,
  VisualTheme,
  type CurriculumPhase,
  type QuestionTypeMeta,
  type VisualAsset,
} from "../types/lkpd";
import {
  THEME_FAMILY_TABS,
  VISUAL_THEMES_CATALOG,
  getThemeMeta,
} from "./themesCatalog50";
import { detectTopicDomainProfile } from "../utils/topicDesignEngine";

export { THEME_FAMILY_TABS, VISUAL_THEMES_CATALOG, getThemeMeta };

export const VISUAL_MEDIA_LIBRARY: VisualAsset[] = [
  {
    id: "vis_cartoon",
    judul: "Gaya Kartun Ceria — Eksperimen Kelas",
    kategori: "Kartun Ceria",
    src: imgCartoon,
    deskripsi: "Ilustrasi kartun penuh warna siswa bereksperimen sains di kelas yang ceria.",
  },
  {
    id: "vis_anime",
    judul: "Gaya Anime Edukasi — Diskusi Kolaboratif",
    kategori: "Anime Edukasi",
    src: imgAnime,
    deskripsi: "Ilustrasi gaya anime modern siswa berdiskusi dengan buku, bola dunia, dan bangun ruang.",
  },
  {
    id: "vis_3d",
    judul: "Gaya 3D Isometrik — Diorama Alam & Energi",
    kategori: "3D Diorama",
    src: img3d,
    deskripsi: "Ilustrasi render 3D isometrik siklus air, lapisan bumi, hutan, dan energi bersih.",
  },
  {
    id: "vis_storybook",
    judul: "Cerita Bergambar 3 Panel — Pertumbuhan Tanaman",
    kategori: "Cerita & Komik",
    src: imgStorybook,
    deskripsi: "Ilustrasi cerita berurutan 3 panel: menanam biji, menyiram tunas, dan mengamati bunga.",
  },
  {
    id: "vis_science",
    judul: "Vektor 2D Sains — Fotosintesis & Ekosistem",
    kategori: "IPAS & Biologi",
    src: imgScience,
    deskripsi: "Ilustrasi buku teks penampang daun, kloroplas, penyerapan air, dan ekosistem tropis.",
  },
  {
    id: "vis_math",
    judul: "Geometri & Bangun Ruang Tiga Dimensi",
    kategori: "Matematika",
    src: imgMath,
    deskripsi: "Ilustrasi kubus, tabung, prisma segitiga, kerucut, bola, jangka, dan penggaris.",
  },
  {
    id: "vis_literacy",
    judul: "Literasi, Pancasila & Budaya Nusantara",
    kategori: "Bahasa & Budaya",
    src: imgLiteracy,
    deskripsi: "Ilustrasi siswa mengamati taman sekolah dan pendopo tradisional Nusantara.",
  },
  {
    id: "vis_physics",
    judul: "Teknologi, Fisika & Energi Terbarukan",
    kategori: "Fisika & Informatika",
    src: imgPhysics,
    deskripsi: "Ilustrasi skema PLTS surya, turbin angin, dan PLTA menuju jaringan mikrogrid.",
  },
  {
    id: "vis_geography",
    judul: "Bentang Alam, IPS, Geografi & Maritim",
    kategori: "IPS & Ekonomi",
    src: imgGeography,
    deskripsi: "Ilustrasi pegunungan vulkanik, sawah terasering, sungai, dan pelabuhan Nusantara.",
  },
  {
    id: "vis_coding",
    judul: "Koding, Algoritma & Robotika Kelas",
    kategori: "Koding & AI",
    src: imgCoding,
    deskripsi: "Ilustrasi berwarna siswa belajar diagram alir algoritma, blok koding, dan robotika.",
  },
  {
    id: "vis_health",
    judul: "Anatomi Tubuh, Sel, Kesehatan & PJOK",
    kategori: "Tubuh & Kesehatan",
    src: imgHealth,
    deskripsi: "Ilustrasi sains organ tubuh sehat, mikroskop sel, DNA, gizi seimbang, dan olahraga.",
  },
  {
    id: "vis_paud",
    judul: "Taman Bermain Ceria — Hewan, Warna & Angka",
    kategori: "PAUD & SD Awal",
    src: imgPaud,
    deskripsi: "Ilustrasi kartun ceria hewan bersahabat, balok hitung warna-warni, dan sempoa.",
  },
  {
    id: "vis_heritage",
    judul: "Sejarah, Pancasila & Warisan Nusantara",
    kategori: "Sejarah & Nusantara",
    src: imgHeritage,
    deskripsi: "Ilustrasi rumah adat Nusantara, siluet candi, kapal Phinisi, dan budaya kepulauan.",
  },
  {
    id: "vis_real_lab",
    judul: "Realistik — Laboratorium Sains & Optik",
    kategori: "Realistik Lab Sains",
    src: imgRealLab,
    deskripsi: "Fotografi realistik meja praktikum sains, gelas Erlenmeyer pH alami, prisma cahaya, & mikroskop.",
    isRealisticPhoto: true,
  },
  {
    id: "vis_real_nature",
    judul: "Realistik — Ekosistem Alam & Botani Tropis",
    kategori: "Realistik Alam",
    src: imgRealNature,
    deskripsi: "Fotografi dokumenter ekosistem hutan hujan tropis, daun berembun, kupu-kupu, & sungai jernih.",
    isRealisticPhoto: true,
  },
  {
    id: "vis_real_heritage",
    judul: "Realistik — Sejarah, Candi & Budaya Nusantara",
    kategori: "Realistik Sejarah",
    src: imgRealHeritage,
    deskripsi: "Fotografi dokumenter relief candi bersejarah, arsitektur kayu tradisional, tenun ikat, & gamelan.",
    isRealisticPhoto: true,
  },
  {
    id: "vis_real_astronomy",
    judul: "Realistik — Bumi, Bulan & Observatorium Antariksa",
    kategori: "Realistik Antariksa",
    src: imgRealAstronomy,
    deskripsi: "Citra observatorium realistik atmosfer planet Bumi, kawah Bulan, dan planet bercincin.",
    isRealisticPhoto: true,
  },
  {
    id: "vis_real_robotics",
    judul: "Realistik — Rekayasa Robotika, Energi & STEM",
    kategori: "Realistik STEM",
    src: imgRealRobotics,
    deskripsi: "Fotografi studio lengan robotik edukasi, mikrokontroler, panel surya, & jangka sorong presisi.",
    isRealisticPhoto: true,
  },
];

export const QUESTION_TYPES_CATALOG: QuestionTypeMeta[] = [
  {
    id: QuestionType.CERITA_BERGAMBAR,
    label: "Cerita Bergambar",
    shortLabel: "Cerita Bergambar",
    deskripsi: "Narasi cerita kontekstual disertai panel ilustrasi visual & pertanyaan pemahaman.",
  },
  {
    id: QuestionType.EKSPERIMEN,
    label: "Eksperimen / Praktikum",
    shortLabel: "Eksperimen",
    deskripsi: "Panduan percobaan mini lengkap alat-bahan, langkah kerja, & kotak pengamatan.",
  },
  {
    id: QuestionType.BENAR_SALAH,
    label: "Benar atau Salah",
    shortLabel: "Benar / Salah",
    deskripsi: "Tabel pernyataan kritis untuk dianalisis kebenarannya oleh peserta didik.",
  },
  {
    id: QuestionType.PILIHAN_GANDA,
    label: "Pilihan Ganda",
    shortLabel: "Pilihan Ganda",
    deskripsi: "Soal objektif 4 pilihan jawaban (A, B, C, D) dengan pengecoh terukur.",
  },
  {
    id: QuestionType.PILIHAN_GANDA_KOMPLEKS,
    label: "PG Kompleks (AKM)",
    shortLabel: "PG Kompleks",
    deskripsi: "Soal model Asesmen Kompetensi Minimum dengan lebih dari satu jawaban benar.",
  },
  {
    id: QuestionType.MENJODOHKAN,
    label: "Menjodohkan Pasangan",
    shortLabel: "Menjodohkan",
    deskripsi: "Memasangkan konsep di lajur kiri dengan definisi/contoh di lajur kanan.",
  },
  {
    id: QuestionType.STUDI_KASUS,
    label: "Studi Kasus Nyata",
    shortLabel: "Studi Kasus",
    deskripsi: "Wacana permasalahan sehari-hari untuk dipecahkan secara kritis oleh siswa.",
  },
  {
    id: QuestionType.URUTKAN_LANGKAH,
    label: "Urutkan Langkah / Kronologi",
    shortLabel: "Urutkan Langkah",
    deskripsi: "Menyusun urutan proses, algoritma, atau peristiwa sejarah yang diacak.",
  },
  {
    id: QuestionType.ISIAN_SINGKAT,
    label: "Isian Singkat",
    shortLabel: "Isian Singkat",
    deskripsi: "Pertanyaan ringkas dengan jawaban istilah kunci, angka, atau konsep spesifik.",
  },
  {
    id: QuestionType.URAIAN,
    label: "Uraian Penalaran (HOTS)",
    shortLabel: "Uraian HOTS",
    deskripsi: "Pertanyaan terbuka yang menuntut argumentasi, perhitungan, atau evaluasi mendalam.",
  },
];

export const QUESTION_TYPE_LABELS: Record<string, string> = {
  pilihan_ganda: "Pilihan Ganda",
  pilihan_ganda_kompleks: "PG Kompleks (AKM)",
  benar_salah: "Benar atau Salah",
  cerita_bergambar: "Cerita Bergambar",
  eksperimen: "Eksperimen / Praktikum",
  menjodohkan: "Menjodohkan",
  studi_kasus: "Studi Kasus",
  urutkan_langkah: "Urutkan Langkah",
  isian_singkat: "Isian Singkat",
  uraian: "Uraian Penalaran HOTS",
};

export function getVisualUrlById(id: string): string {
  const found = VISUAL_MEDIA_LIBRARY.find((v) => v.id === id);
  return found ? found.src : imgScience;
}

export function inferVisualForSubjectAndTheme(
  mapel: string,
  tema?: VisualTheme,
  materi = "",
  fase = "Fase B"
): string {
  const profile = detectTopicDomainProfile(mapel, materi, fase);

  if (tema) {
    const themeMeta = getThemeMeta(tema);
    // When any Realistic theme is chosen, return a photorealistic image matching the topic or theme!
    if (themeMeta.kategoriGaya === "realistik") {
      if (tema !== VisualTheme.REALISTIK_STUDIO) {
        return getVisualUrlById(themeMeta.defaultVisualId);
      }
      return getVisualUrlById(profile.primaryRealisticVisualId);
    }
  }

  if (materi && materi.trim() !== "") {
    return getVisualUrlById(profile.primaryVisualId);
  }

  if (tema) {
    const themeMeta = getThemeMeta(tema);
    return getVisualUrlById(themeMeta.defaultVisualId);
  }

  return getVisualUrlById(profile.primaryVisualId);
}

export function inferVisualForSubject(
  mapel: string,
  materi = "",
  fase = "Fase B"
): string {
  return inferVisualForSubjectAndTheme(mapel, undefined, materi, fase);
}

export const LEARNING_MODELS: string[] = [
  "Discovery Learning (Penemuan Terbimbing)",
  "Problem-Based Learning / PBL (Pemecahan Masalah Kontekstual)",
  "Project-Based Learning / PjBL (Pembelajaran Berbasis Proyek)",
  "Inquiry Learning (Inkuiri & Investigasi Ilmiah)",
  "Experiential Learning (Belajar melalui Praktikum & Pengalaman)",
  "Visual Storytelling (Cerita Bergambar & Kontekstual)",
  "Contextual Teaching and Learning / CTL (Kaitkan Dunia Nyata)",
  "STEAM (Science, Technology, Engineering, Arts, & Mathematics)",
  "Pembelajaran Berdiferensiasi (Visual, Kinestetik, & Auditori)",
  "Cooperative Learning — Jigsaw / Think-Pair-Share / STAD",
  "Game-Based Learning & Misi Eksplorasi Berkelompok",
  "Case-Based Learning (Analisis Studi Kasus Mendalam)",
  "Design Thinking (Empati, Ideasi, Prototipe, & Uji Coba)",
  "Flipped Classroom (Eksplorasi Mandiri & Diskusi Kelas)",
  "Station Rotation Learning (Belajar Berpos / Sudut Aktivitas)",
  "Teaching at the Right Level / TaRL (Sesuai Tahap Capaian)",
];

export const CURRICULUM_PHASES: CurriculumPhase[] = [
  // =========================================================================
  // 1. FASE FONDASI (PAUD / TK / RA / KB)
  // =========================================================================
  {
    id: "FONDASI",
    kodeFase: "Fase Fondasi",
    namaFase: "Fase Fondasi (PAUD / TK / RA)",
    jenjang: "PAUD",
    badgeGradient: "from-pink-500 to-amber-500",
    rentangKelas: [
      "KB (Usia 3–4 Tahun)",
      "TK A / RA A (Usia 4–5 Tahun)",
      "TK B / RA B (Usia 5–6 Tahun)",
    ],
    mataPelajaran: [
      {
        id: "paud_agama",
        nama: "Nilai Agama dan Budi Pekerti",
        kategoriMapel: "Elemen Inti PAUD",
        capaianUmum: "Anak mengenal ciptaan Tuhan, membiasakan doa harian, jujur, santun, dan menyayangi makhluk hidup.",
        daftarMateri: [
          "Mensyukuri Ciptaan Tuhan: Manusia, Hewan, dan Tumbuhan",
          "Kata Ajaib Sehari-hari: Tolong, Maaf, Permisi, & Terima Kasih",
          "Aku Anak Jujur, Sopan, dan Suka Menolong Teman",
          "Menjaga Kebersihan Diri dan Lingkungan Kelas Bersama",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "paud_jati_diri",
        nama: "Jati Diri (Sosial Emosional & Motorik)",
        kategoriMapel: "Elemen Inti PAUD",
        capaianUmum: "Anak mengenali emosi diri, identitas keluarga, kemandirian, gerak motorik kasar-halus, dan hidup sehat.",
        daftarMateri: [
          "Mengenal Identitas Diriku, Tubuhku, dan Keluargaku",
          "Mengenal Ekspresi Emosi: Senang, Sedih, Terkejut, & Sabar",
          "Makanan Sehat Bergizi dan Kebiasaan Mencuci Tangan",
          "Permainan Tradisional dan Aturan Bermain Bergiliran",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "paud_literasi",
        nama: "Dasar-Dasar Literasi & Cerita Anak",
        kategoriMapel: "Literasi & STEAM",
        capaianUmum: "Anak menyimak cerita bergambar, mengenal bunyi huruf awal, kosakata benda sekitar, dan menceritakan ulang.",
        daftarMateri: [
          "Cerita Bergambar: Petualangan di Kebun Binatang",
          "Mengenal Huruf Awal Nama Benda dan Hewan Kesayangan",
          "Menyusun Urutan Gambar Kegiatan dari Bangun Pagi",
          "Mengenal Profesi di Sekitar Kita (Dokter, Petani, Guru, Pemadam)",
        ],
        visualDefaultId: "vis_storybook",
      },
      {
        id: "paud_numerasi",
        nama: "Dasar-Dasar Matematika & Numerasi Awal",
        kategoriMapel: "Literasi & STEAM",
        capaianUmum: "Anak membilang benda 1–20, mengenal bentuk geometri dasar, ukuran panjang-pendek, dan pola berulang.",
        daftarMateri: [
          "Membilang dan Mencocokkan Jumlah Buah & Benda (1–10)",
          "Pola Berulang Warna dan Bentuk Geometri (Lingkaran, Segitiga, Persegi)",
          "Membandingkan Ukuran: Besar–Kecil, Tinggi–Rendah, Banyak–Sedikit",
          "Mengelompokkan Benda Berdasarkan Warna dan Bentuk",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "paud_sains_rekayasa",
        nama: "Eksplorasi Sains & Rekayasa Sederhana (STEAM)",
        kategoriMapel: "Literasi & STEAM",
        capaianUmum: "Anak mengamati fenomena alam sederhana melalui percobaan bermain air, warna, magnet, dan tanaman.",
        daftarMateri: [
          "Eksperimen Seru: Benda Terapung dan Benda Tenggelam",
          "Percobaan Pencampuran Warna Pelangi dengan Air",
          "Menanam Biji Kacang Hijau dan Mengamati Tunas Tumbuh",
          "Mengenal Cuaca: Cerah, Hujan, Pelangi, dan Siang–Malam",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "paud_seni",
        nama: "Seni Kreatif, Musik, Gerak & Lagu",
        kategoriMapel: "Seni & Budaya",
        capaianUmum: "Anak mengekspresikan imajinasi melalui menggambar, mewarnai, kolase, lipat kertas, dan irama lagu anak.",
        daftarMateri: [
          "Kolase dan Mewarnai Gambar Hewan Laut & Hutan",
          "Mengenal Alat Musik Ritmis dan Gerak Lagu Daerah",
          "Kreasi Bentuk dari Plastisin dan Lipatan Kertas Origami",
        ],
        visualDefaultId: "vis_storybook",
      },
      {
        id: "paud_p5",
        nama: "Projek Profil Pelajar Pancasila (P5 PAUD)",
        kategoriMapel: "Kokurikuler P5",
        capaianUmum: "Anak bekerja sama dalam projek perayaan budaya Nusantara, cinta bumi, dan imajinasi kreatif.",
        daftarMateri: [
          "Aku Cinta Indonesia: Mengenal Pakaian & Rumah Adat",
          "Sayangi Bumi Kita: Memilah Sampah Daun dan Plastik",
          "Pasar Sehat Cilik: Bermain Peran Jual Beli Buah Lokal",
        ],
        visualDefaultId: "vis_literacy",
      },
    ],
  },

  // =========================================================================
  // 2. FASE A (KELAS 1 – 2 SD / MI)
  // =========================================================================
  {
    id: "FASE_A",
    kodeFase: "Fase A",
    namaFase: "Fase A (Kelas 1 – 2 SD / MI)",
    jenjang: "SD",
    badgeGradient: "from-amber-500 to-orange-500",
    rentangKelas: ["Kelas 1 SD / MI", "Kelas 2 SD / MI"],
    mataPelajaran: [
      {
        id: "a_pai",
        nama: "Pendidikan Agama Islam & Budi Pekerti",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengenal huruf hijaiyah, rukun iman, rukun Islam, kebersihan thaharah, dan akhlak terpuji kepada orang tua serta guru.",
        daftarMateri: [
          "Mengenal Rukun Islam, Rukun Iman, dan Kalimat Thayyibah",
          "Huruf Hijaiyah Berharakat dan Surah-Surah Pendek Pilihan",
          "Hidup Bersih: Tata Cara Berwudu dan Menjaga Kebersihan",
          "Akhlak Terpuji: Kasih Sayang, Jujur, dan Hormat kepada Orang Tua",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "a_agama_umum",
        nama: "Pendidikan Agama (Kristen/Katolik/Hindu/Buddha/Khonghucu)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mensyukuri karunia Tuhan melalui ciptaan-Nya, keluarga, kerukunan teman, serta perbuatan kasih sehari-hari.",
        daftarMateri: [
          "Tuhan Menciptakan Alam Semesta dan Diriku yang Istimewa",
          "Keluarga sebagai Anugerah Tuhan dan Sikap Saling Mengasihi",
          "Hidup Rukun dan Saling Menolong Tanpa Membeda-bedakan Teman",
          "Merawat Tanaman dan Hewan Peliharaan di Rumah",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "a_pancasila",
        nama: "Pendidikan Pancasila",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengenal simbol sila-sila Pancasila, aturan di keluarga dan sekolah, serta identitas keberagaman teman.",
        daftarMateri: [
          "Simbol dan Bunyi Kelima Sila pada Perisai Garuda Pancasila",
          "Mematuhi Aturan Tertib di Rumah dan di Lingkungan Sekolah",
          "Keberagaman Identitas Diri, Fisik, dan Hobi Teman Sekelas",
          "Kerja Sama Gotong Royong Menjaga Kebersihan Kelas",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "a_bindo",
        nama: "Bahasa Indonesia",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menyimak cerita bergambar, membaca suku kata dan kalimat sederhana, serta menulis cerita pengalaman.",
        daftarMateri: [
          "Membaca Cerita Bergambar & Penggunaan Huruf Kapital serta Titik",
          "Mengenal Kalimat Ajakan, Perintah, Tolong, dan Maaf",
          "Menceritakan Urutan Peristiwa dari Komik / Gambar Seri",
          "Kosakata Keselamatan di Rumah dan di Jalan Raya",
        ],
        visualDefaultId: "vis_storybook",
      },
      {
        id: "a_matematika",
        nama: "Matematika",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami bilangan cacah sampai 100, penjumlahan-pengurangan, waktu/panjang, bangun datar-ruang, dan piktogram.",
        daftarMateri: [
          "Nilai Tempat Puluhan & Satuan serta Penjumlahan-Pengurangan sampai 100",
          "Mengenal Bangun Datar dan Bangun Ruang di Sekitar Kita",
          "Membaca Jam Analog dan Mengukur Panjang Benda",
          "Mengenal Pecahan Setengah (1/2) dan Seperempat (1/4) Visual",
          "Mengelompokkan Data Benda dalam Piktogram Gambar",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "a_pjok",
        nama: "Pendidikan Jasmani, Olahraga, & Kesehatan (PJOK)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mempraktikkan gerak dasar lokomotor, non-lokomotor, manipulatif, serta menjaga kebersihan tubuh.",
        daftarMateri: [
          "Gerak Dasar Lokomotor: Berjalan, Berlari, dan Melompat",
          "Gerak Non-Lokomotor: Membungkuk, Mengayun, dan Keseimbangan",
          "Gerak Manipulatif: Melempar dan Menangkap Bola Kecil/Besar",
          "Menjaga Kebersihan Gigi, Kuku, Pakaian, dan Jajanan Sehat",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "a_seni_rupa",
        nama: "Seni Rupa",
        kategoriMapel: "Seni & Pilihan",
        capaianUmum: "Peserta didik mengenali unsur garis, bentuk geometris-organik, warna primer-sekunder, dan kolase gunting tempel.",
        daftarMateri: [
          "Eksplorasi Garis Lurus, Lengkung, Zig-zag, dan Bentuk Alam",
          "Eksperimen Pencampuran Warna Primer Menjadi Warna Sekunder",
          "Membuat Kolase dan Montase Bertema Taman Impian",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "a_seni_musik",
        nama: "Seni Musik",
        kategoriMapel: "Seni & Pilihan",
        capaianUmum: "Peserta didik mengenali bunyi alam dan bunyi buatan, ketukan irama cepat-lambat, serta menyanyikan lagu nasional/anak.",
        daftarMateri: [
          "Membedakan Sumber Bunyi Alam dan Bunyi Alat Musik",
          "Pola Ketukan Birama Sederhana dengan Tepuk Tangan",
          "Menyanyikan Lagu Anak dan Lagu Wajib Nasional dengan Ekspresi",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "a_seni_tari_teater",
        nama: "Seni Tari & Seni Teater",
        kategoriMapel: "Seni & Pilihan",
        capaianUmum: "Peserta didik menirukan gerak hewan/alam sekitar serta mengekspresikan mimik wajah tokoh cerita.",
        daftarMateri: [
          "Menirukan Gerak Kupu-Kupu, Kelinci, dan Pohon Tertiup Angin",
          "Bermain Peran & Ekspresi Wajah Tokoh Dongeng Nusantara",
        ],
        visualDefaultId: "vis_storybook",
      },
      {
        id: "a_binggris",
        nama: "Bahasa Inggris",
        kategoriMapel: "Pilihan",
        capaianUmum: "Peserta didik mengenal sapaan bahasa Inggris sederhana, angka, warna, benda kelas, dan anggota keluarga.",
        daftarMateri: [
          "Greetings, Introductions, and Saying Thank You",
          "Numbers 1–20, Colors, and Classroom Objects",
          "My Family, Pets, and Favorite Fruits",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "a_mulok_p5",
        nama: "Muatan Lokal Bahasa Daerah & Projek P5",
        kategoriMapel: "Muatan Lokal & P5",
        capaianUmum: "Peserta didik mengenal kosakata santun bahasa daerah, permainan tradisional, dan projek kebersihan lingkungan.",
        daftarMateri: [
          "Bahasa Santun kepada Orang Tua & Mengenal Nama Hewan dalam Bahasa Daerah",
          "Permainan Tradisional Daerahku dan Lagu Dolanan Anak",
          "Projek P5: Bekal Makanan Sehat Tanpa Sampah Plastik",
        ],
        visualDefaultId: "vis_literacy",
      },
    ],
  },

  // =========================================================================
  // 3. FASE B (KELAS 3 – 4 SD / MI)
  // =========================================================================
  {
    id: "FASE_B",
    kodeFase: "Fase B",
    namaFase: "Fase B (Kelas 3 – 4 SD / MI)",
    jenjang: "SD",
    badgeGradient: "from-sky-500 to-emerald-500",
    rentangKelas: ["Kelas 3 SD / MI", "Kelas 4 SD / MI"],
    mataPelajaran: [
      {
        id: "b_ipas",
        nama: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami bagian tumbuhan, fotosintesis, wujud zat, siklus hidup, gaya-energi, serta keragaman bentang alam sosial.",
        daftarMateri: [
          "Tumbuhan Sumber Kehidupan: Bagian Tubuh & Fotosintesis",
          "Wujud Zat dan Perubahannya (Mencair, Membeku, Menguap, Mengembun)",
          "Siklus Hidup Makhluk Hidup (Metamorfosis Sempurna & Tidak Sempurna)",
          "Gaya di Sekitar Kita: Gaya Otot, Gesek, Pegas, Gravitasi, & Magnet",
          "Mengubah Bentuk Energi dalam Kehidupan Sehari-hari",
          "Bentang Alam Daerahku, Peta Kabupaten, & Profesi Masyarakat",
        ],
        visualDefaultId: "vis_science",
      },
      {
        id: "b_matematika",
        nama: "Matematika",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menguasai bilangan cacah sampai 10.000, pecahan senilai-desimal-persen, keliling-luas bangun datar, sudut, dan diagram batang.",
        daftarMateri: [
          "Pecahan Senilai, Pecahan Desimal, dan Persen Visual",
          "Keliling dan Luas Persegi, Persegi Panjang, dan Segitiga",
          "Operasi Hitung Perkalian, Pembagian, Faktor, & Kelipatan",
          "Pengukuran Sudut dengan Busur Derajat pada Bangun Datar",
          "Menyajikan dan Menafsirkan Data dalam Piktogram & Diagram Batang",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "b_bindo",
        nama: "Bahasa Indonesia",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menemukan ide pokok-pendukung, kalimat transitif-intransitif, teks prosedur bergambar, dan wawancara.",
        daftarMateri: [
          "Menentukan Ide Pokok dan Ide Pendukung Paragraf Informatif",
          "Kalimat Transitif, Intransitif, dan Kosakata Baru dalam Cerita",
          "Menulis Teks Prosedur & Petunjuk Penggunaan Alat Bergambar",
          "Laporan Hasil Wawancara dan Cerita Pengalaman Berkesan",
        ],
        visualDefaultId: "vis_storybook",
      },
      {
        id: "b_pancasila",
        nama: "Pendidikan Pancasila",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami hak dan kewajiban di rumah/sekolah, aturan lingkungan desa/kelurahan, serta Bhinneka Tunggal Ika.",
        daftarMateri: [
          "Hak dan Kewajiban Anak di Rumah, Sekolah, dan Masyarakat",
          "Menghargai Keragaman Suku, Rumah Adat, & Tarian Nusantara",
          "Musyawarah Mufakat dan Aturan di Lingkungan Desa/Kelurahan",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "b_pai",
        nama: "Pendidikan Agama Islam & Budi Pekerti",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami Asmaulhusna, kisah keteladanan Nabi, ketentuan salat wajib/jumat, dan sikap menghargai sesama.",
        daftarMateri: [
          "Teladan Mulia Asmaulhusna dan Sikap Rendah Hati",
          "Indahnya Saling Menghargai dalam Keragaman (Q.S. Al-Hujurat: 13)",
          "Ketentuan Salat Fardu, Salat Berjamaah, dan Zikir",
          "Kisah Keteladanan Hijrah Nabi Muhammad saw.",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "b_agama_umum",
        nama: "Pendidikan Agama (Kristen/Katolik/Hindu/Buddha/Khonghucu)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami pemeliharaan Tuhan dalam alam, sepuluh perintah/ajaran kasih, disiplin beribadah, dan peduli sesama.",
        daftarMateri: [
          "Kemahakuasaan Tuhan dalam Peristiwa Alam dan Musim",
          "Mengamalkan Kasih, Kejujuran, dan Pengampunan kepada Sesama",
          "Tanggung Jawab Merawat Keutuhan Ciptaan di Lingkungan Sekitar",
        ],
        visualDefaultId: "vis_science",
      },
      {
        id: "b_binggris",
        nama: "Bahasa Inggris",
        kategoriMapel: "Wajib / Pilihan",
        capaianUmum: "Peserta didik berkomunikasi dalam kalimat bahasa Inggris sederhana terkait kegiatan harian, waktu, ruangan rumah, dan transportasi.",
        daftarMateri: [
          "Daily Activities, Hobbies, and Telling the Time",
          "Rooms in a House and Prepositions of Place",
          "Public Places, Transportation, and Going to School",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "b_pjok",
        nama: "Pendidikan Jasmani, Olahraga, & Kesehatan (PJOK)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengombinasikan pola gerak dasar permainan bola, senam lantai sederhana, aktivitas air, dan pola istirahat sehat.",
        daftarMateri: [
          "Kombinasi Gerak Dasar Permainan Bola Besar & Bola Kecil",
          "Senam Lantai: Keseimbangan, Berguling, dan Kelenturan Tubuh",
          "Memilih Makanan Bergizi Seimbang dan Bahaya Jajanan Tidak Higienis",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "b_seni_rupa",
        nama: "Seni Rupa",
        kategoriMapel: "Seni",
        capaianUmum: "Peserta didik menggambar komposisi simetris, perspektif sederhana, ragam hias dekoratif daerah, dan daur ulang kriya.",
        daftarMateri: [
          "Menggambar Rumah Tetangga dan Komposisi Perspektif Sederhana",
          "Ragam Hias Dekoratif Flora, Fauna, dan Motif Batik Daerah",
          "Kriya Daur Ulang Botol Plastik Menjadi Tempat Alat Tulis",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "b_seni_musik_tari_teater",
        nama: "Seni Musik, Seni Tari, & Seni Teater",
        kategoriMapel: "Seni",
        capaianUmum: "Peserta didik mengenal tinggi-rendah nada, alat musik melodis/ritmis daerah, gerak tari kreasi daerah, dan pantomim.",
        daftarMateri: [
          "Mengenal Tangga Nada serta Alat Musik Tradisional & Modern",
          "Gerak Dasar Tari Daerah Bertema Alam dan Pertanian",
          "Seni Peran Pantomim dan Dialog Cerita Rakyat Nusantara",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "b_mulok_p5",
        nama: "Bahasa Daerah (Muatan Lokal) & Projek P5",
        kategoriMapel: "Muatan Lokal & P5",
        capaianUmum: "Peserta didik memahami cerita rakyat daerah, aksara/kosakata daerah dasar, dan projek kearifan lokal/gaya hidup berkelanjutan.",
        daftarMateri: [
          "Cerita Rakyat Daerah dan Pesan Moral Kearifan Lokal",
          "Mengenal Kosakata Unggah-Ungguh / Santun Bahasa Daerah",
          "Projek P5: Membuat Kompos Organik & Kebun Sayur Sekolah",
        ],
        visualDefaultId: "vis_geography",
      },
    ],
  },

  // =========================================================================
  // 4. FASE C (KELAS 5 – 6 SD / MI)
  // =========================================================================
  {
    id: "FASE_C",
    kodeFase: "Fase C",
    namaFase: "Fase C (Kelas 5 – 6 SD / MI)",
    jenjang: "SD",
    badgeGradient: "from-teal-500 to-cyan-600",
    rentangKelas: ["Kelas 5 SD / MI", "Kelas 6 SD / MI"],
    mataPelajaran: [
      {
        id: "c_ipas",
        nama: "IPAS (Ilmu Pengetahuan Alam dan Sosial)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menganalisis sistem organ manusia, ekosistem, gelombang cahaya-bunyi, listrik, tata surya, geografis Indonesia, & sejarah kemerdekaan.",
        daftarMateri: [
          "Harmoni dalam Ekosistem: Rantai & Jaring-Jaring Makanan",
          "Cahaya dan Sifatnya (Merambat Lurus, Dipantulkan, Dibiaskan) & Bunyi",
          "Sistem Pernapasan, Pencernaan, dan Rangka-Otot Manusia",
          "Rangkaian Listrik Seri-Paralel dan Penghematan Energi",
          "Menjelajah Sistem Tata Surya serta Rotasi & Revolusi Bumi",
          "Kondisi Geografis Indonesia & Perjuangan Kemerdekaan Bangsa",
        ],
        visualDefaultId: "vis_3d",
      },
      {
        id: "c_matematika",
        nama: "Matematika",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menguasai pecahan campuran, rasio/skala, luas lingkaran, volume & jaring-jaring bangun ruang, serta statistika dasar.",
        daftarMateri: [
          "Volume dan Jaring-Jaring Kubus, Balok, Prisma, & Tabung",
          "Operasi Hitung Pecahan Campuran, Desimal, dan Rasio Perbandingan",
          "Unsur, Keliling, dan Luas Lingkaran Kontekstual",
          "Skala Peta dan Sistem Koordinat Berpetak",
          "Pengolahan Data: Mean (Rata-Rata), Median, Modus, & Diagram",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "c_bindo",
        nama: "Bahasa Indonesia",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menganalisis fakta-opini, teks eksplanasi ilmiah, unsur intrinsik-majas, formulir/surat resmi, dan pidato persuasif.",
        daftarMateri: [
          "Membedakan Fakta dan Opini pada Iklan serta Berita",
          "Menulis Teks Eksplanasi Ilmiah Fenomena Alam dan Sosial",
          "Majas Metafora, Personifikasi, Hiperbola, & Unsur Intrinsik Cerita",
          "Mengisi Formulir, Menulis Surat Resmi, dan Naskah Pidato",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "c_pancasila",
        nama: "Pendidikan Pancasila",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengamalkan nilai sila Pancasila sebagai satu kesatuan, norma hukum/adat, musyawarah, dan persatuan provinsi NKRI.",
        daftarMateri: [
          "Pengamalan Sila-Sila Pancasila sebagai Satu Kesatuan Utuh",
          "Macam-Macam Norma (Agama, Kesusilaan, Kesopanan, Hukum) & Hak-Kewajiban",
          "Keberagaman Provinsi di Indonesia dan Semangat Gotong Royong",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "c_pai",
        nama: "Pendidikan Agama Islam & Budi Pekerti",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami hukum bacaan tajwid dasar, zakat-infak-sedekah, kisah Khulafaurrasyidin, dan toleransi beragama.",
        daftarMateri: [
          "Menyayangi Anak Yatim (Q.S. Al-Ma'un) dan Indahnya Berbagi Zakat & Sedekah",
          "Iman kepada Hari Akhir serta Qada dan Qadar",
          "Kisah Keteladanan Khulafaurrasyidin dan Sikap Toleransi",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "c_agama_umum",
        nama: "Pendidikan Agama (Kristen/Katolik/Hindu/Buddha/Khonghucu)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menghayati nilai pelayanan kasih, kejujuran, perdamaian dalam masyarakat majemuk, dan tanggung jawab ekologis.",
        daftarMateri: [
          "Melayani Sesama dengan Kasih dan Kerendahan Hati",
          "Menjadi Pembawa Damai di Tengah Keberagaman Masyarakat",
          "Bijaksana Menggunakan Teknologi dan Menjaga Kelestarian Alam",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "c_informatika",
        nama: "Informatika & Koding Dasar",
        kategoriMapel: "Wajib / Pilihan",
        capaianUmum: "Peserta didik menerapkan berpikir komputasional (dekomposisi, pola, algoritma blok), perangkat komputer, dan keamanan digital.",
        daftarMateri: [
          "Berpikir Komputasional: Dekomposisi, Pola, & Urutan Algoritma",
          "Pemrograman Visual Blok (Logika Urutan & Perulangan Sederhana)",
          "Sistem Komputer (Hardware-Software) & Keamanan Jejak Digital",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "c_binggris",
        nama: "Bahasa Inggris",
        kategoriMapel: "Wajib / Pilihan",
        capaianUmum: "Peserta didik memahami teks deskriptif pendek, rasa makanan/harga, profesi, serta kalimat masa lampau dan rencana masa depan sederhana.",
        daftarMateri: [
          "Tastes of Food & Drinks and Asking Prices",
          "Health Problems, Clothes, and Describing People",
          "Simple Past Activities & My Future Dreams",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "c_pjok",
        nama: "Pendidikan Jasmani, Olahraga, & Kesehatan (PJOK)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menerapkan variasi-kombinasi gerak permainan invasi/net/lapangan, kebugaran jasmani, P3K ringan, dan kesehatan remaja awal.",
        daftarMateri: [
          "Variasi Gerak Dasar Permainan Sepak Bola, Voli Mini, & Kasti",
          "Latihan Kebugaran Jasmani: Daya Tahan Jantung, Kekuatan, & Kelincahan",
          "Pertolongan Pertama pada Cedera Ringan (P3K) & Kesehatan Masa Pubertas",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "c_seni_budaya",
        nama: "Seni Budaya (Seni Rupa, Musik, Tari, & Teater)",
        kategoriMapel: "Seni",
        capaianUmum: "Peserta didik berkarya simpul makrame/anyaman, notasi musik ansambel, pola lantai tari daerah, dan pementasan drama pendek.",
        daftarMateri: [
          "Seni Rupa: Prinsip Ritme, Simpul Makrame, dan Kerajinan Anyaman Nusantara",
          "Seni Musik: Notasi Angka/Balok dan Bermain Musik Ansambel Sekolah",
          "Seni Tari & Teater: Pola Lantai Tari Kreasi Berkelompok & Naskah Drama",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "c_mulok_p5",
        nama: "Bahasa Daerah (Muatan Lokal) & Projek P5",
        kategoriMapel: "Muatan Lokal & P5",
        capaianUmum: "Peserta didik mengapresiasi sastra/aksara daerah serta merancang projek kewirausahaan cilik dan rekayasa lingkungan.",
        daftarMateri: [
          "Membaca Aksara/Sastra Daerah dan Pidato Ringkas Bahasa Daerah",
          "Projek P5 Kewirausahaan: Kreasi Olahan Pangan Sehat Lokal",
          "Projek P5 Rekayasa: Penjernih Air Sederhana untuk Lingkungan",
        ],
        visualDefaultId: "vis_geography",
      },
    ],
  },

  // =========================================================================
  // 5. FASE D (KELAS 7 – 9 SMP / MTs)
  // =========================================================================
  {
    id: "FASE_D",
    kodeFase: "Fase D",
    namaFase: "Fase D (Kelas 7 – 9 SMP / MTs)",
    jenjang: "SMP",
    badgeGradient: "from-indigo-500 to-sky-600",
    rentangKelas: ["Kelas 7 SMP / MTs", "Kelas 8 SMP / MTs", "Kelas 9 SMP / MTs"],
    mataPelajaran: [
      {
        id: "d_ipa",
        nama: "Ilmu Pengetahuan Alam (IPA)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menganalisis hakikat sains, sel, klasifikasi makhluk hidup, suhu-kalor, gerak-gaya, getaran-gelombang, tekanan, listrik-magnet, genetika, & bioteknologi.",
        daftarMateri: [
          "Hakikat Ilmu Sains, Pengukuran, dan Keselamatan Kerja Laboratorium",
          "Struktur & Fungsi Sel serta Sistem Pencernaan & Peredaran Darah",
          "Suhu, Kalor, Pemuaian, dan Perpindahan Kalor",
          "Gerak Lurus, Hukum Newton, Usaha, dan Pesawat Sederhana",
          "Getaran, Gelombang, Cahaya, dan Alat Optik",
          "Listrik Statis-Dinamis, Hukum Ohm, Kemagnetan, & Energi Terbarukan",
          "Pewarisan Sifat (Hukum Mendel) dan Bioteknologi Konvensional-Modern",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "d_matematika",
        nama: "Matematika",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menguasai bilangan bulat-rasional, aljabar, persamaan/fungsi linear, Pythagoras, lingkaran, bangun ruang sisi datar-lengkung, transformasi geometri, & peluang.",
        daftarMateri: [
          "Bentuk Aljabar, Persamaan Linear Satu Variabel, & Perbandingan Senilai-Berbalik Nilai",
          "Sistem Persamaan Linear Dua Variabel (SPLDV) & Fungsi Linear",
          "Teorema Pythagoras dan Garis Singgung Lingkaran",
          "Bangun Ruang Sisi Datar (Kubus, Balok, Prisma, Limas) & Sisi Lengkung (Tabung, Kerucut, Bola)",
          "Transformasi Geometri (Translasi, Refleksi, Rotasi, Dilatasi) & Kesebangunan",
          "Statistika Penyebaran Data dan Peluang Kejadian Empirik-Teoretik",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "d_ips",
        nama: "Ilmu Pengetahuan Sosial (IPS)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menganalisis konektivitas keruangan, perubahan iklim, kegiatan ekonomi pasar-digital, interaksi/mobilitas sosial, serta sejarah kolonialisme hingga reformasi.",
        daftarMateri: [
          "Konektivitas Antarruang, Peta Topografi, dan Potensi Sumber Daya Alam Indonesia",
          "Kegiatan Ekonomi: Permintaan, Penawaran, Harga Pasar, & Literasi Finansial",
          "Perdagangan Antarpulau, Ekonomi Maritim, dan Kerja Sama Ekonomi Internasional",
          " Bentuk Interaksi Sosial, Mobilitas Sosial, dan Perubahan Budaya Era Digital",
          "Sejarah Jalur Rempah, Pergerakan Nasional, hingga Kemerdekaan Indonesia",
        ],
        visualDefaultId: "vis_geography",
      },
      {
        id: "d_bindo",
        nama: "Bahasa Indonesia",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengevaluasi dan memproduksi teks deskripsi, cerita fantasi/puisi rakyat, teks prosedur, LHO, berita, iklan, eksposisi, persuasi, laporan percobaan, & pidato.",
        daftarMateri: [
          "Teks Deskripsi Objek Nusantara & Cerita Fantasi Imajinatif",
          "Teks Laporan Hasil Observasi (LHO) & Teks Eksposisi Ilmiah Populer",
          "Menganalisis Unsur Berita Aktual, Iklan, Slogan, dan Poster",
          "Menulis Teks Laporan Percobaan & Teks Pidato Persuasif",
          "Teks Tanggapan Kritis dan Cerita Inspiratif",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "d_binggris",
        nama: "Bahasa Inggris",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengomunikasikan teks descriptive, recount, narrative, procedure, dan report sederhana secara lisan, tulisan, dan multimodal.",
        daftarMateri: [
          "Descriptive Text: Describing People, Tourist Attractions, & Endemic Animals",
          "Recount Text: Sharing Personal Experiences & School Events",
          "Procedure Text: Recipes, Manuals, and Eco-Friendly Tips",
          "Narrative Text: Indonesian Folktales & Fables",
          "Report Text: Natural Phenomena and Technology",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "d_pancasila",
        nama: "Pendidikan Pancasila",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami sejarah kelahiran Pancasila, UUD NRI Tahun 1945, tata urutan peraturan perundang-undangan, kebinekaan, & bela negara.",
        daftarMateri: [
          "Sejarah Kelahiran Pancasila dan Kedudukan Pancasila sebagai Dasar Negara",
          "Norma, Hak-Kewajiban, dan Tata Urutan Peraturan Perundang-undangan RI",
          "Pelestarian Budaya Nasional dan Harmoni dalam Keberagaman Masyarakat",
          "Menjaga Keutuhan Wilayah NKRI dan Literasi Kewarganegaraan Digital",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "d_informatika",
        nama: "Informatika",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menerapkan berpikir komputasional struktur data dasar, algoritma flowchart/pemrograman, sistem komputer biner, jaringan internet, & analisis data.",
        daftarMateri: [
          "Berpikir Komputasional: Struktur Data Graf/Pohon & Representasi Biner",
          "Algoritma, Flowchart, dan Pemrograman Visual/Prosedural",
          "Jaringan Komputer, Enkripsi Sederhana, dan Keamanan Siber",
          "Pengolahan & Visualisasi Data dengan Lembar Kerja (Spreadsheet)",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "d_pai",
        nama: "Pendidikan Agama Islam & Budi Pekerti",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik memahami tajwid nun sukun/mim sukun/mad, iman kepada malaikat-kitab-rasul, salat jamak-qasar, zakat-haji-kurban, & peradaban Islam.",
        daftarMateri: [
          "Al-Qur'an dan Sunah sebagai Pedoman Hidup serta Hukum Tajwid",
          "Rukhsah dalam Ibadah: Salat Jamak dan Qasar dalam Perjalanan",
          "Ibadah Kurban, Akikah, serta Menghindari Gibah dan Tabayun di Media Sosial",
          "Sejarah Kemajuan Ilmu Pengetahuan pada Masa Bani Umayyah & Abbasiyah",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "d_agama_umum",
        nama: "Pendidikan Agama (Kristen/Katolik/Hindu/Buddha/Khonghucu)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik mengembangkan ketangguhan iman remaja, etika pergaulan bertanggung jawab, moderasi beragama, dan kepedulian sosial.",
        daftarMateri: [
          "Bertumbuh Menjadi Remaja Beriman, Tangguh, dan Bertanggung Jawab",
          "Persahabatan Sejati dan Etika Pergaulan di Era Digital",
          "Moderasi Beragama dan Kerja Sama Sosial Lintas Iman",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "d_pjok",
        nama: "Pendidikan Jasmani, Olahraga, & Kesehatan (PJOK)",
        kategoriMapel: "Wajib",
        capaianUmum: "Peserta didik menguasai teknik spesifik permainan bola besar/kecil, atletik, bela diri pencak silat, kebugaran jasmani, dan pencegahan pergaulan bebas.",
        daftarMateri: [
          "Teknik Spesifik Permainan Bola Basket, Bola Voli, & Sepak Bola",
          "Atletik (Lari Jarak Pendek, Lompat Jauh) & Bela Diri Pencak Silat",
          "Komponen Kebugaran Jasmani serta Pola Makan Sehat dan Pencegahan NAPZA",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "d_seni_budaya",
        nama: "Seni Budaya (Seni Rupa, Musik, Tari, & Teater)",
        kategoriMapel: "Seni & Pilihan",
        capaianUmum: "Peserta didik membuat gambar ilustrasi/poster tipografi, aransemen ansambel lagu daerah, komposisi tari tradisi-kreasi, dan pemeranan teater.",
        daftarMateri: [
          "Seni Rupa: Menggambar Perspektif, Poster Ilustrasi, & Desain Ragam Hias",
          "Seni Musik: Teknik Vokal Unisono/Vokal Grup dan Ansambel Musik Daerah",
          "Seni Tari & Teater: Level serta Pola Lantai Tari Tradisional & Olah Peran Teater",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "d_prakarya",
        nama: "Prakarya (Kerajinan, Rekayasa, Budidaya, & Pengolahan)",
        kategoriMapel: "Pilihan",
        capaianUmum: "Peserta didik merancang produk kerajinan serat/bahan lunak-keras, rekayasa alat listrik rumah tangga, budidaya tanaman sayur/ikan, & pengolahan pangan lokal.",
        daftarMateri: [
          "Kerajinan Bahan Serat Alam, Bahan Lunak, dan Limbah Keras",
          "Rekayasa: Konstruksi Miniatur Jembatan & Instalasi Listrik Sederhana",
          "Budidaya Tanaman Sayuran/Obat (Hidroponik) & Pengolahan Pangan Buah-Serealia",
        ],
        visualDefaultId: "vis_3d",
      },
      {
        id: "d_mulok_bk_p5",
        nama: "Bahasa Daerah / Bahasa Asing Pilihan / P5 SMP",
        kategoriMapel: "Muatan Lokal & P5",
        capaianUmum: "Peserta didik mengapresiasi budaya daerah, percakapan bahasa asing dasar, serta projek suara demokrasi dan rekayasa teknologi.",
        daftarMateri: [
          "Teks Cerita Cekak / Pantun / Aksara Daerah & Budaya Lokal",
          "Projek P5 Suara Demokrasi: Simulasi Pemilihan & Debat Santun OSIS",
          "Projek P5 Gaya Hidup Berkelanjutan: Audit Sampah & Eco-Enzyme Sekolah",
        ],
        visualDefaultId: "vis_geography",
      },
    ],
  },

  // =========================================================================
  // 6. FASE E (KELAS 10 SMA / MA / SMK)
  // =========================================================================
  {
    id: "FASE_E",
    kodeFase: "Fase E",
    namaFase: "Fase E (Kelas 10 SMA / MA / SMK)",
    jenjang: "SMA/SMK",
    badgeGradient: "from-violet-600 to-indigo-600",
    rentangKelas: ["Kelas 10 SMA / MA", "Kelas 10 SMK / MAK"],
    mataPelajaran: [
      {
        id: "e_matematika",
        nama: "Matematika",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menguasai eksponen-logaritma, barisan-deret, vektor, SPLTV/SPtLDV, fungsi kuadrat, trigonometri segitiga siku-siku, dan statistika-peluang.",
        daftarMateri: [
          "Eksponen, Bentuk Akar, dan Logaritma dalam Pemodelan Pertumbuhan",
          "Barisan dan Deret Aritmetika serta Geometri Kontekstual",
          "Sistem Persamaan Linear Tiga Variabel (SPLTV) & Fungsi Kuadrat",
          "Perbandingan Trigonometri Segitiga Siku-Siku (Sudut Elevasi & Depresi)",
          "Statistika Kuartil/Jangkauan dan Peluang Kejadian Majemuk Dasar",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "e_fisika",
        nama: "Fisika (IPA)",
        kategoriMapel: "Rumpun IPA",
        capaianUmum: "Peserta didik menerapkan hakikat fisika, pengukuran alat presisi, ketidakpastian, konversi energi terbarukan, serta pemanasan global.",
        daftarMateri: [
          "Besaran, Dimensi, Angka Penting, & Pengukuran Jangka Sorong / Mikrometer",
          "Usaha, Hukum Kekekalan Energi, & Pembangkit Energi Terbarukan",
          "Pemanasan Global, Efek Rumah Kaca, dan Teknologi Ramah Iklim",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "e_kimia",
        nama: "Kimia (IPA)",
        kategoriMapel: "Rumpun IPA",
        capaianUmum: "Peserta didik memahami Kimia Hijau, nanoteknologi, struktur atom-konfigurasi elektron, tabel periodik, ikatan kimia dasar, dan hukum dasar kimia.",
        daftarMateri: [
          "12 Prinsip Kimia Hijau (Green Chemistry) dalam Kehidupan & Industri",
          "Perkembangan Model Atom, Konfigurasi Elektron, & Sifat Keperiodikan Unsur",
          "Tata Nama Senyawa, Persamaan Reaksi, & Hukum-Hukum Dasar Kimia",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "e_biologi",
        nama: "Biologi (IPA)",
        kategoriMapel: "Rumpun IPA",
        capaianUmum: "Peserta didik menganalisis tingkat keanekaragaman hayati Indonesia, peranan virus & monera/fungi, perubahan lingkungan, serta ekosistem-biogeokimia.",
        daftarMateri: [
          "Keanekaragaman Hayati Indonesia (Tingkat Gen, Jenis, Ekosistem) & Konservasi",
          "Struktur, Replikasi Virus, dan Peranannya dalam Bidang Kesehatan",
          "Komponen Ekosistem, Piramida Ekologi, & Daur Biogeokimia (Karbon-Nitrogen)",
          "Inovasi Bioteknologi Lingkungan dan Penanganan Pencemaran",
        ],
        visualDefaultId: "vis_science",
      },
      {
        id: "e_ekonomi",
        nama: "Ekonomi (IPS)",
        kategoriMapel: "Rumpun IPS",
        capaianUmum: "Peserta didik menganalisis kelangkaan-biaya peluang, sistem ekonomi, keseimbangan pasar, elastisitas, bank sentral, sistem pembayaran, & OJK.",
        daftarMateri: [
          "Kelangkaan Sumber Daya, Skala Prioritas, dan Biaya Peluang (Opportunity Cost)",
          "Permintaan, Penawaran, Elastisitas, dan Terbentuknya Harga Keseimbangan Pasar",
          "Bank Sentral, Sistem Pembayaran Non-Tunai (QRIS), dan Lembaga Jasa Keuangan",
        ],
        visualDefaultId: "vis_geography",
      },
      {
        id: "e_geografi",
        nama: "Geografi (IPS)",
        kategoriMapel: "Rumpun IPS",
        capaianUmum: "Peserta didik memahami konsep/prinsip geografi, peta-penginderaan jauh-SIG, serta dinamika litosfer, pedosfer, atmosfer, dan hidrosfer.",
        daftarMateri: [
          "Konsep Dasar Geografi, Pemetaan, Penginderaan Jauh, dan SIG",
          "Dinamika Litosfer: Tektonisme, Vulkanisme, Seisme, & Mitigasi Bencana",
          "Dinamika Atmosfer (Cuaca-Iklim) dan Hidrosfer (Perairan Darat & Laut)",
        ],
        visualDefaultId: "vis_3d",
      },
      {
        id: "e_sosiologi",
        nama: "Sosiologi (IPS)",
        kategoriMapel: "Rumpun IPS",
        capaianUmum: "Peserta didik menganalisis fungsi sosiologi, identitas sosial, tindakan-interaksi sosial, lembaga sosial, gejala sosial, dan metode penelitian sosial.",
        daftarMateri: [
          "Identitas Diri, Tindakan Sosial, dan Hubungan Interaksi Sosial",
          "Peran Lembaga Sosial dalam Mewujudkan Tertib Masyarakat",
          "Ragam Gejala Sosial dan Rancangan Penelitian Sosial Sederhana",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "e_sejarah",
        nama: "Sejarah",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik memahami konsep berpikir kronologis-diakronis-sinkronis, asal-usul nenek moyang Nusantara, jalur rempah Hindu-Buddha, dan kesultanan Islam.",
        daftarMateri: [
          "Konsep Berpikir Sejarah (Diakronis, Sinkronis, Kausalitas) & Penelitian Sumber",
          "Asal-Usul Leluhur Bangsa Indonesia dan Kebudayaan Praaksara",
          "Jaringan Perdagangan Jalur Rempah Masa Kerajaan Hindu-Buddha & Islam",
        ],
        visualDefaultId: "vis_geography",
      },
      {
        id: "e_bindo",
        nama: "Bahasa Indonesia",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik mengevaluasi dan mencipta teks LHO objektif, teks anekdot kritis, hikayat-cerpen, teks negosiasi, biografi tokoh, dan puisi.",
        daftarMateri: [
          "Laporan Hasil Observasi Ilmiah & Mengkritisi Fenomena lewat Teks Anekdot",
          "Nilai Kearifan dalam Teks Hikayat Klasik dan Cerpen Modern",
          "Seni Berkomunikasi melalui Teks Negosiasi & Keteladanan Teks Biografi",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "e_binggris",
        nama: "Bahasa Inggris",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menganalisis dan menyusun teks descriptive, recount, exposition/analytical, narrative, dan multimodal tentang isu remaja/lingkungan.",
        daftarMateri: [
          "Sports Events, Healthy Lifestyle, & Descriptive Multimodal Text",
          "Analytical Exposition: Digital Literacy, Graffiti Art, & Environment",
          "Fractured Stories & Narrative Texts",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "e_pancasila",
        nama: "Pendidikan Pancasila",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menganalisis gagasan pendiri bangsa tentang Pancasila, konstitusi UUD NRI 1945, Bhinneka Tunggal Ika global, dan sengketa batas NKRI.",
        daftarMateri: [
          "Perbandingan Gagasan Pendiri Bangsa dalam Perumusan Pancasila",
          "Budaya Taat Hukum dan Hierarki Peraturan Perundang-undangan",
          "Kolaborasi Lintas Budaya serta Kedaulatan Wilayah Perbatasan NKRI",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "e_informatika",
        nama: "Informatika",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menerapkan algoritma pencarian-pengurutan, arsitektur komputer-OS, jaringan komunikasi data, pemrograman Python/C, & dampak sosial informatika.",
        daftarMateri: [
          "Algoritma Pencarian (Searching), Pengurutan (Sorting), Stack & Queue",
          "Arsitektur Sistem Komputer, Gerbang Logika, dan Sistem Operasi",
          "Algoritma & Pemrograman Dasar (Variabel, Percabangan, Perulangan, Array)",
          "Analisis Data Publik & Dampak Sosial Kecerdasan Artifisial",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "e_pai_agama",
        nama: "Pendidikan Agama & Budi Pekerti",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menghayati etos kerja berkompetisi dalam kebaikan, syu'abul iman, fikih muamalah keuangan syariah/etika ekonomi, dan sejarah dakwah Nusantara.",
        daftarMateri: [
          "Kompetisi dalam Kebaikan, Etos Kerja, dan Syu'abul Iman",
          "Prinsip Muamalah: Asuransi, Perbankan, dan Koperasi Berkeadilan",
          "Menjauhi Pergaulan Bebas serta Meneladani Penyebaran Agama Damai di Nusantara",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "e_pjok_seni_pkwu",
        nama: "PJOK, Seni Budaya, & Prakarya Kewirausahaan",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik merancang strategi taktik permainan olahraga, pameran/pertunjukan seni, dan perencanaan usaha kerajinan/pengolahan.",
        daftarMateri: [
          "Taktik Penyerangan & Pertahanan Permainan Bola Besar serta Kebugaran",
          "Apresiasi Karya Seni Rupa/Musik/Tari Kontemporer & Kurasi Pameran",
          "Ideasi Produk Kreatif Berbasis Budaya Lokal & Perhitungan Biaya Produksi",
        ],
        visualDefaultId: "vis_cartoon",
      },
      {
        id: "e_smk_kejuruan",
        nama: "Dasar-Dasar Program Keahlian SMK & Projek IPAS",
        kategoriMapel: "Kejuruan SMK",
        capaianUmum: "Peserta didik memahami proses bisnis industri, K3LH (Keselamatan & Kesehatan Kerja), budaya kerja 5R, serta keterampilan dasar program keahlian SMK.",
        daftarMateri: [
          "Keselamatan, Kesehatan Kerja, Lingkungan Hidup (K3LH) & Budaya Kerja 5R",
          "Proses Bisnis Industri Teknologi, Jaringan, Otomotif, Bisnis, atau Pariwisata",
          "Projek IPAS SMK: Mitigasi Bencana, Energi, & Pengolahan Limbah Kerja",
        ],
        visualDefaultId: "vis_physics",
      },
    ],
  },

  // =========================================================================
  // 7. FASE F (KELAS 11 – 12 SMA / MA / SMK)
  // =========================================================================
  {
    id: "FASE_F",
    kodeFase: "Fase F",
    namaFase: "Fase F (Kelas 11 – 12 SMA / MA / SMK)",
    jenjang: "SMA/SMK",
    badgeGradient: "from-cyan-600 to-blue-700",
    rentangKelas: [
      "Kelas 11 SMA / MA",
      "Kelas 12 SMA / MA",
      "Kelas 11 SMK / MAK",
      "Kelas 12 SMK / MAK",
    ],
    mataPelajaran: [
      {
        id: "f_matematika_umum",
        nama: "Matematika Umum",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menguasai komposisi & invers fungsi, lingkaran, matriks, bunga majemuk/anuitas finansial, kombinatorika, dan analisis regresi korelasi.",
        daftarMateri: [
          "Komposisi Fungsi dan Fungsi Invers dalam Pemodelan",
          "Matematika Finansial: Bunga Tunggal, Bunga Majemuk, dan Anuitas Pinjaman",
          "Kaidah Pencacahan, Permutasi, Kombinasi, dan Peluang Bersyarat",
          "Diagram Pencar (Scatter Plot), Korelasi, dan Regresi Linear",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "f_matematika_lanjut",
        nama: "Matematika Tingkat Lanjut",
        kategoriMapel: "Pilihan MIPA",
        capaianUmum: "Peserta didik menguasai bilangan kompleks, polinomial, matriks transformasi geometri, vektor ruang, fungsi trigonometri, limit, turunan, & integral kalkulus.",
        daftarMateri: [
          "Polinomial (Suku Banyak), Teorema Sisa, dan Matriks Transformasi Geometri",
          "Limit Fungsi, Turunan (Diferensial), dan Masalah Optimasi Maksimum-Minimum",
          "Integral Tak Tentu & Integral Tentu untuk Luas Daerah dan Volume Benda Putar",
          "Distribusi Peluang Binomial dan Distribusi Normal",
        ],
        visualDefaultId: "vis_math",
      },
      {
        id: "f_fisika",
        nama: "Fisika",
        kategoriMapel: "Pilihan MIPA",
        capaianUmum: "Peserta didik menganalisis kinematika vektor, dinamika rotasi, fluida statis-dinamis, termodinamika, gelombang cahaya-bunyi, listrik AC/DC, induksi magnetik, & fisika modern.",
        daftarMateri: [
          "Kinematika Gerak Parabola, Dinamika Rotasi, & Kesetimbangan Benda Tegar",
          "Fluida Statis (Hukum Archimedes-Pascal) & Fluida Dinamis (Asas Bernoulli)",
          "Termodinamika: Hukum I & II serta Efisiensi Siklus Mesin Kalor",
          "Rangkaian Arus Searah (Kirchhoff), Induksi Elektromagnetik, & Arus Bolak-Balik",
          "Relativitas Khusus, Efek Fotolistrik, dan Fisika Inti Radioaktivitas",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "f_kimia",
        nama: "Kimia",
        kategoriMapel: "Pilihan MIPA",
        capaianUmum: "Peserta didik menganalisis stoikiometri larutan, termokimia, laju reaksi, kesetimbangan kimia, asam-basa-buffer-hidrolisis, koloid, redoks-elektrokimia, & kimia organik polimer.",
        daftarMateri: [
          "Termokimia (Perubahan Entalpi ΔH, Hukum Hess) & Laju Reaksi",
          "Kesetimbangan Kimia (Kc, Kp, dan Pergeseran Azas Le Chatelier)",
          "Larutan Asam-Basa, Titrasi, Larutan Penyangga (Buffer), & Hidrolisis Garam",
          "Sel Volta, Elektrolisis (Hukum Faraday), dan Pencegahan Korosi Logam",
          "Gugus Fungsi Senyawa Karbon, Makromolekul, dan Polimer",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "f_biologi",
        nama: "Biologi",
        kategoriMapel: "Pilihan MIPA",
        capaianUmum: "Peserta didik menganalisis transpor membran sel, fisiologi sistem organ manusia, enzim-metabolisme seluler, materi genetik DNA-RNA, pembelahan sel, evolusi, & bioteknologi molekuler.",
        daftarMateri: [
          "Transpor Membran Sel: Difusi, Osmosis, dan Transpor Aktif",
          "Sistem Koordinasi Saraf-Hormon, Sistem Imunitas, & Sistem Reproduksi",
          "Enzim dan Metabolisme Sel (Katabolisme Respirasi Aerob & Anabolisme Fotosintesis)",
          "Substansi Genetika (DNA, RNA, Sintesis Protein) & Pembelahan Mitosis-Meiosis",
          "Hukum Hereditas, Mutasi, Evolusi, dan Rekayasa Genetika Bioteknologi",
        ],
        visualDefaultId: "vis_science",
      },
      {
        id: "f_ekonomi",
        nama: "Ekonomi & Akuntansi",
        kategoriMapel: "Pilihan IPS",
        capaianUmum: "Peserta didik menganalisis badan usaha, pendapatan nasional, ketenagakerjaan, indeks harga-inflasi, kebijakan moneter-fiskal, APBN/APBD, perdagangan internasional, & siklus akuntansi.",
        daftarMateri: [
          "Pendapatan Nasional, Pertumbuhan Ekonomi, dan Ketenagakerjaan",
          "Indeks Harga, Inflasi, serta Kebijakan Moneter dan Kebijakan Fiskal (APBN)",
          "Perdagangan Internasional, Kurs Valuta Asing, & Kerja Sama Ekonomi Global",
          "Persamaan Dasar Akuntansi dan Siklus Akuntansi Perusahaan Jasa & Dagang",
        ],
        visualDefaultId: "vis_geography",
      },
      {
        id: "f_geografi",
        nama: "Geografi",
        kategoriMapel: "Pilihan IPS",
        capaianUmum: "Peserta didik menganalisis posisi strategis maritim Indonesia, sebaran flora-fauna, ketahanan pangan-energi, dinamika kependudukan, tata ruang wilayah, & kerja sama negara maju-berkembang.",
        daftarMateri: [
          "Posisi Strategis Indonesia sebagai Poros Maritim & Sebaran Flora-Fauna",
          "Pengelolaan Sumber Daya Alam, Ketahanan Pangan, Industri, & Energi Baru",
          "Dinamika Kependudukan (Bonus Demografi) dan Keragaman Budaya Nasional",
          "Tata Ruang Wilayah, Interaksi Desa-Kota, dan Indeks Pembangunan Wilayah",
        ],
        visualDefaultId: "vis_geography",
      },
      {
        id: "f_sosiologi_antropologi",
        nama: "Sosiologi & Antropologi",
        kategoriMapel: "Pilihan IPS & Budaya",
        capaianUmum: "Peserta didik menganalisis kelompok sosial, permasalahan sosial, konflik & integrasi perdamaian, perubahan sosial globalisasi, etnografi budaya, & pemberdayaan komunitas.",
        daftarMateri: [
          "Dinamika Kelompok Sosial, Kesetaraan, dan Permasalahan Sosial",
          "Resolusi Konflik Sosial dan Membangun Harmoni Integrasi Masyarakat",
          "Globalisasi, Masyarakat Digital, dan Pemberdayaan Komunitas Lokal",
          "Antropologi: Etnografi Keberagaman Bahasa, Adat, dan Tradisi Lisan Nusantara",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "f_sejarah",
        nama: "Sejarah & Sejarah Tingkat Lanjut",
        kategoriMapel: "Wajib & Pilihan",
        capaianUmum: "Peserta didik menganalisis kolonialisme Barat, kebangkitan nasional, pendudukan Jepang, Proklamasi, mempertahankan kemerdekaan, Demokrasi Liberal-Terpimpin, Orde Baru, Reformasi, & sejarah dunia.",
        daftarMateri: [
          "Perlawanan Daerah terhadap Kolonialisme dan Pergerakan Kebangkitan Nasional",
          "Proklamasi Kemerdekaan 1945 & Perjuangan Diplomasi-Fisik Mempertahankan RI",
          "Dinamika Politik-Ekonomi Indonesia Masa Demokrasi Parlementer hingga Reformasi",
          "Sejarah Dunia: Revolusi Industri, Perang Dunia, Perang Dingin, & Peran Aktif RI",
        ],
        visualDefaultId: "vis_geography",
      },
      {
        id: "f_bindo",
        nama: "Bahasa Indonesia & Bahasa Indonesia Tingkat Lanjut",
        kategoriMapel: "Wajib & Pilihan",
        capaianUmum: "Peserta didik mengevaluasi dan memproduksi teks argumentasi ketahanan nasional, berita inovasi, cerpen sejarah, proposal karya ilmiah, kritik sastra, teks editorial, & esai.",
        daftarMateri: [
          "Teks Argumentasi Ketahanan Pangan, Budaya, dan Energi Lokal",
          "Menyusun Proposal Kegiatan dan Karya Tulis Ilmiah Remaja",
          "Menganalisis Isu Aktual dalam Teks Editorial / Tajuk Rencana & Esai Kritis",
          "Apresiasi Kritik Sastra, Drama, dan Penulisan Cerpen Sejarah",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "f_binggris_asing",
        nama: "Bahasa Inggris & Bahasa Asing Pilihan (Arab/Jepang/Mandarin/Jerman)",
        kategoriMapel: "Wajib & Pilihan Bahasa",
        capaianUmum: "Peserta didik menguasai teks hortatory exposition, discussion text, analytical essay, academic presentation, serta komunikasi lintas budaya bahasa asing pilihan.",
        daftarMateri: [
          "Hortatory Exposition: Environmental Action, Renewable Energy, & Netiquette",
          "Discussion Text: Pros and Cons of Artificial Intelligence & Cashless Society",
          "Job Application Letter, Curriculum Vitae (CV), & Interview Communication",
          "Bahasa Asing Pilihan: Perkenalan Budaya, Kehidupan Sekolah, & Pariwisata",
        ],
        visualDefaultId: "vis_anime",
      },
      {
        id: "f_informatika",
        nama: "Informatika & Kecerdasan Artifisial Dasar",
        kategoriMapel: "Pilihan MIPA / Teknik",
        capaianUmum: "Peserta didik mengembangkan aplikasi web/mobile sederhana, basis data relasional SQL, jaringan IoT, analisis sains data, dan konsep dasar machine learning.",
        daftarMateri: [
          "Basis Data Relasional, Pemodelan ERD, dan Query Data",
          "Pengembangan Algoritma Terapan, Struktur Data, & Antarmuka Web",
          "Internet of Things (IoT) Sensor Cerdas & Etika Kecerdasan Artifisial",
        ],
        visualDefaultId: "vis_physics",
      },
      {
        id: "f_pancasila_pai",
        nama: "Pendidikan Pancasila & Pendidikan Agama Budi Pekerti",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik mempraktikkan demokrasi konstitusional, perlindungan HAM, antikorupsi, toleransi moderasi beragama, serta etika keilmuan dan keluarga.",
        daftarMateri: [
          "Demokrasi berdasarkan UUD NRI 1945, Perlindungan HAM, & Perilaku Antikorupsi",
          "Peran Indonesia dalam Perdamaian Dunia dan Tantangan Ideologi Global",
          "Berpikir Kritis & Mencintai IPTEK, Moderasi Beragama, serta Etika Bermasyarakat",
        ],
        visualDefaultId: "vis_literacy",
      },
      {
        id: "f_pkwu_pjok_seni",
        nama: "Prakarya Kewirausahaan (PKWU), PJOK, & Seni Budaya",
        kategoriMapel: "Wajib Umum",
        capaianUmum: "Peserta didik menyusun rencana bisnis (Business Model Canvas), analisis BEP/HPP, pemasaran digital, pola hidup aktif bugar, serta pameran/pagelaran karya seni.",
        daftarMateri: [
          "Business Model Canvas (BMC), Perhitungan HPP, & Titik Impas (Break-Even Point)",
          "Strategi Branding, Kemasan Produk Kreatif, dan Pemasaran Digital",
          "Program Latihan Kebugaran Mandiri & Manajemen Pagelaran Karya Seni",
        ],
        visualDefaultId: "vis_3d",
      },
      {
        id: "f_smk_konsentrasi",
        nama: "Konsentrasi Keahlian SMK & Produk Kreatif Kewirausahaan (PKK)",
        kategoriMapel: "Kejuruan SMK",
        capaianUmum: "Peserta didik menguasai standar operasional prosedur (SOP) industri konsentrasi keahlian, pembuatan prototipe produk/jasa, kendali mutu (QC), & kesiapan PKL/kerja.",
        daftarMateri: [
          "Perancangan Prototipe Produk/Jasa, Gambar Kerja, & Standar Kendali Mutu (QC)",
          "Troubleshooting Sistem Teknis / Layanan Pelanggan sesuai SOP Industri",
          "Persiapan Praktik Kerja Lapangan (PKL), Portofolio Karier, & Wirausaha Mandiri",
        ],
        visualDefaultId: "vis_physics",
      },
    ],
  },
];
