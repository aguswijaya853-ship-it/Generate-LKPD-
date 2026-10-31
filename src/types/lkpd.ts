export enum AppTab {
  STUDIO = "studio",
  BANK_SOAL = "bank_soal",
  TEMPLATES = "templates",
  ARCHIVE = "archive",
}

export enum SmartLayoutMode {
  AUTO = "auto",
  SPLIT_MAGAZINE = "split_magazine",
  COMPACT_GRID = "compact_grid",
  CLASSIC_STACK = "classic_stack",
}

export enum QuestionType {
  PILIHAN_GANDA = "pilihan_ganda",
  PILIHAN_GANDA_KOMPLEKS = "pilihan_ganda_kompleks",
  BENAR_SALAH = "benar_salah",
  CERITA_BERGAMBAR = "cerita_bergambar",
  EKSPERIMEN = "eksperimen",
  MENJODOHKAN = "menjodohkan",
  STUDI_KASUS = "studi_kasus",
  URUTKAN_LANGKAH = "urutkan_langkah",
  ISIAN_SINGKAT = "isian_singkat",
  URAIAN = "uraian",
}

export type QuestionTypeValue =
  | QuestionType
  | "pilihan_ganda"
  | "pilihan_ganda_kompleks"
  | "benar_salah"
  | "cerita_bergambar"
  | "eksperimen"
  | "menjodohkan"
  | "studi_kasus"
  | "urutkan_langkah"
  | "isian_singkat"
  | "uraian";

export enum VisualTheme {
  // 1. Realistik & Fotografi Edukasi (8 Desain)
  REALISTIK_STUDIO = "realistik_studio",
  REALISTIK_ALAM = "realistik_alam",
  REALISTIK_LABORATORIUM = "realistik_laboratorium",
  REALISTIK_ANATOMI = "realistik_anatomi",
  REALISTIK_SEJARAH = "realistik_sejarah",
  REALISTIK_ANTARIKSA = "realistik_antariksa",
  REALISTIK_TEKNOLOGI = "realistik_teknologi",
  REALISTIK_AGRIKULTUR = "realistik_agrikultur",

  // 2. Kartun & Dunia Anak (7 Desain)
  KARTUN = "kartun",
  KARTUN_PETUALANGAN = "kartun_petualangan",
  KARTUN_CHIBI = "kartun_chibi",
  KARTUN_HEWAN = "kartun_hewan",
  KARTUN_ANTARIKSA = "kartun_antariksa",
  KARTUN_SAMUDRA = "kartun_samudra",
  KARTUN_DONGENG = "kartun_dongeng",

  // 3. Anime, Manga & Komik (6 Desain)
  ANIME = "anime",
  ANIME_SAKURA = "anime_sakura",
  ANIME_SAINS = "anime_sains",
  KOMIK = "komik",
  WEBTOON_EDUKASI = "webtoon_edukasi",
  MANGA_TINTAKLASIK = "manga_tintaklasik",

  // 4. Vektor 2D & Infografis Sains (7 Desain)
  DESAIN_2D = "desain_2d",
  SAINS = "sains",
  FLAT_GEOMETRIS = "flat_geometris",
  INFOGRAFIS_DATA = "infografis_data",
  BLUEPRINT_TEKNIK = "blueprint_teknik",
  PETA_KARTOGRAFI = "peta_kartografi",
  KODING_ALGORITMA = "koding_algoritma",

  // 5. 3D, Diorama & Kerajinan Visual (6 Desain)
  DESAIN_3D = "desain_3d",
  CLAY_PLASTISIN = "clay_plastisin",
  PAPERCUT_ORIGAMI = "papercut_origami",
  LOWPOLY_GEOMETRI = "lowpoly_geometri",
  BALOK_KONSTRUKSI = "balok_konstruksi",
  DIORAMA_EKOLOGI = "diorama_ekologi",

  // 6. Seni Lukis & Artistik (6 Desain)
  PASTEL = "pastel",
  CAT_AIR_AKWAREL = "cat_air_akwarel",
  GOUACHE_BUKU = "gouache_buku",
  KRAYON_PENSILWARNA = "krayon_pensilwarna",
  PAPAN_KAPUR = "papan_kapur",
  SKETSA_BOTANI = "sketsa_botani",

  // 7. Nusantara & Warisan Budaya (5 Desain)
  NUSANTARA = "nusantara",
  BATIK_PESISIR = "batik_pesisir",
  TENUN_KEPULAUAN = "tenun_kepulauan",
  UKIRAN_TRADISI = "ukiran_tradisi",
  BAHARI_PHINISI = "bahari_phinisi",

  // 8. Klasik Akademik & Ramah Cetak (5 Desain)
  AKADEMIK = "akademik",
  MINIMALIS = "minimalis",
  JURNAL_UNIVERSITAS = "jurnal_universitas",
  ENSIKLOPEDIA_SERIF = "ensiklopedia_serif",
  MILIMETER_MATEMATIKA = "milimeter_matematika",
}

export type ThemeFamily =
  | "realistik"
  | "kartun"
  | "anime_komik"
  | "vektor_2d"
  | "tiga_dimensi"
  | "artistik_lukis"
  | "nusantara"
  | "akademik_cetak";

export interface SheetThemeTokens {
  sheetOuterBorder: string;
  headerBg: string;
  headerBorder: string;
  accentText: string;
  sectionSurface: string;
  calloutSurface: string;
  tableHeaderBg: string;
  questionCardBg: string;
}

export interface ThemeMeta {
  id: VisualTheme;
  nomorUrut: number;
  nama: string;
  kategoriGaya: ThemeFamily;
  labelKategori: string;
  gayaGambarLabel: string;
  deskripsi: string;
  swatchGradient: string;
  defaultVisualId: string;
  aiSvgInstruction: string;
  sheetTokens: SheetThemeTokens;
}

export interface QuestionTypeMeta {
  id: QuestionType;
  label: string;
  shortLabel: string;
  deskripsi: string;
}

export interface VisualAsset {
  id: string;
  judul: string;
  kategori: string;
  src: string;
  deskripsi: string;
  isRealisticPhoto?: boolean;
}

export interface CurriculumSubject {
  id: string;
  nama: string;
  kategoriMapel: string;
  capaianUmum: string;
  daftarMateri: string[];
  visualDefaultId: string;
}

export interface CurriculumPhase {
  id: string;
  kodeFase: string;
  namaFase: string;
  jenjang: string;
  badgeGradient: string;
  rentangKelas: string[];
  mataPelajaran: CurriculumSubject[];
}

export interface QuestionItem {
  id: string;
  pertanyaan: string;
  tipe: QuestionTypeValue;
  levelKognitif: string;
  ilustrasiSoalSvg?: string;
  gambarSoalUrl?: string;
  wacanaCerita?: string;
  opsi: string[];
  pernyataanBenarSalah?: string[];
  langkahEksperimen?: string[];
  alatEksperimen?: string[];
  pasanganKiri: string[];
  pasanganKanan: string[];
  kunciJawaban: string;
  pembahasan: string;
  skor: number;
  fase?: string;
  kelas?: string;
  mapel?: string;
  materi?: string;
}

export interface ExplorationActivity {
  judulAktivitas: string;
  instruksi: string;
  kolomTabel: string[];
  barisContoh: string[][];
}

export interface LKPDDocument {
  id: string;
  updatedAt: string;
  namaSekolah: string;
  namaGuru: string;
  fase: string;
  kelas: string;
  semester: string;
  mapel: string;
  materi: string;
  subMateri: string;
  alokasiWaktu: string;
  modelPembelajaran: string;
  temaVisual: VisualTheme;
  smartLayoutMode?: SmartLayoutMode;
  judul: string;
  subjudul: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  petunjukBelajar: string[];
  alatDanBahan: string[];
  ringkasanMateri: string;
  poinPenting: string[];
  gambarUtamaUrl: string;
  tampilkanGambarUtama: boolean;
  ilustrasiUtamaSvg: string;
  tampilkanDiagramSvg: boolean;
  keteranganIlustrasi: string;
  aktivitasEksplorasi: ExplorationActivity;
  daftarSoal: QuestionItem[];
  refleksiSiswa: string[];
}

export interface SuggestedTopic {
  judulMateri: string;
  ringkasanCP: string;
  ideVisual: string;
}
