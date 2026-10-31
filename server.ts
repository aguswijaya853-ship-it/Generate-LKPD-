import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

const PORT = Number(process.env.PORT) || 3000;

const SERVER_THEME_STYLE_MAP: Record<string, string> = {
  // 1. Realistik & Fotografi Edukasi (8 Desain)
  realistik_studio:
    "Gaya Realistik Studio Edukasi: Gunakan proporsi anatomis & objek nyata akurat, gradasi pencahayaan tiga dimensi halus, bayangan lembut realistis, dan label ilmiah bersih di atas latar studio terang.",
  realistik_alam:
    "Gaya Realistik Dokumenter Alam: Gunakan palet hijau hutan tropis, biru sungai alami, cokelat tanah organik, gradasi cahaya matahari realistis, dan detail flora-fauna proporsional.",
  realistik_laboratorium:
    "Gaya Realistik Laboratorium Sains: Gambar instrumen kaca transparan realistis dengan pantulan cahaya halus, cairan berwarna akurat, skala ukur jelas, dan garis penunjuk ilmiah presisi.",
  realistik_anatomi:
    "Gaya Realistik Atlas Anatomi & Medis: Gunakan gaya ilustrasi atlas biologi/anatomi realistis dengan gradasi organ/jaringan tiga dimensi yang akurat dan garis penunjuk berlabel rapi.",
  realistik_sejarah:
    "Gaya Realistik Cagar Budaya & Sejarah: Gunakan tekstur batu candi realistis, warna terakota, perunggu, dan emas hangat seperti dokumentasi museum sejarah.",
  realistik_antariksa:
    "Gaya Realistik Observatorium Antariksa: Gunakan gradasi bola planet realistis bercahaya atmosfer biru-emas, orbit elips presisi, dan kontras tinggi yang jelas.",
  realistik_teknologi:
    "Gaya Realistik Robotika & Teknik: Gambar komponen metalik realistis, sensor elektronik, jalur PCB perak-sian, dan roda gigi mekanik presisi.",
  realistik_agrikultur:
    "Gaya Realistik Agrikultur & Botani: Gambar struktur akar, batang, daun, biji, dan lapisan tanah subur dengan warna botani alami dan pencahayaan realistis.",

  // 2. Kartun & Dunia Anak (7 Desain)
  kartun:
    "Gaya Kartun Ceria Buku Anak: Gunakan bentuk bulat ramah, garis tepi tegas hangat, ekspresi ceria, warna kuning-oranye-biru-hijau cerah (#FEF3C7, #F59E0B, #38BDF8, #34D399).",
  kartun_petualangan:
    "Gaya Kartun Petualangan Rimba: Gunakan ornamen penjelajah alam, pepohonan rimbun, kompas, dan warna hijau zamrud serta kuning hangat.",
  kartun_chibi:
    "Gaya Kartun Chibi Sahabat Kelas: Gunakan karakter proporsi imut ramah, bintang pastel ceria, dan warna persik, langit, serta mint segar.",
  kartun_hewan:
    "Gaya Kartun Dunia Satwa: Gunakan ilustrasi satwa bersahabat, jejak kaki lucu, dedaunan tropis, dan warna hijau-kuning alami yang hangat.",
  kartun_antariksa:
    "Gaya Kartun Penjelajah Antariksa: Gunakan ilustrasi roket ceria, planet bercincin warna-warni, bintang kuning cerah, dan latar langit lembut.",
  kartun_samudra:
    "Gaya Kartun Bawah Laut & Samudra: Gunakan ilustrasi terumbu karang warna-warni, ikan ramah, gelembung air biru jernih (#E0F2FE, #0284C7, #06B6D4).",
  kartun_dongeng:
    "Gaya Kartun Buku Dongeng: Gunakan ornamen pita cerita, awan lembut, kastil/taman imajinatif, dan warna kuning mentega serta ungu pastel.",

  // 3. Anime, Manga & Komik (6 Desain)
  anime:
    "Gaya Anime Edukasi Modern: Gunakan gradasi langit cerah (#E0E7FF, #38BDF8, #818CF8, #F472B6), kilau bintang bersih, garis rapi modern, dan panel informasi tegas.",
  anime_sakura:
    "Gaya Anime Musim Semi Ceria: Gunakan aksen kelopak bunga merah muda lembut, langit biru jernih, dan pencahayaan hangat khas animasi sekolah.",
  anime_sains:
    "Gaya Anime Klub Sains & Riset: Gunakan bingkai layar futuristik bersih, aksen sian-indigo elektrik, dan diagram eksperimen modern.",
  komik:
    "Gaya Komik Strip & Cerita Bergambar: Gunakan 2-3 kotak panel komik berbingkai tegas (#1E293B), balon kata/label seru kuning (#FACC15), biru (#2563EB), dan merah muda.",
  webtoon_edukasi:
    "Gaya Webtoon Edukasi Modern: Gunakan panel vertikal/horizontal bersih dengan gradasi lembut, balon dialog modern, dan warna pirus-ungu segar.",
  manga_tintaklasik:
    "Gaya Manga Tinta Klasik Hitam Putih: Gunakan garis tinta hitam tajam di atas latar putih bersih, arsiran screentone titik-titik rapi, kontras tinggi ramah fotokopi.",

  // 4. Vektor 2D & Infografis Sains (7 Desain)
  desain_2d:
    "Gaya Flat Vektor 2D Modern: Gunakan bentuk geometris bersih tanpa garis tepi rumit, palet hijau zamrud, pirus, biru, dan koral (#10B981, #0EA5E9, #F97316).",
  sains:
    "Gaya Eksperimen Sains Berwarna: Gunakan ikon tabung reaksi, kaca pembesar, panah siklus ilmiah berlabel jelas dengan warna sian, biru sains, dan hijau.",
  flat_geometris:
    "Gaya Flat Geometris Bauhaus: Gunakan susunan lingkaran, segitiga, dan persegi presisi dengan warna primer modern yang seimbang.",
  infografis_data:
    "Gaya Infografis Data & Statistik: Gunakan bagan batang/lingkaran bersih, ikon kuantitatif tegas, kartu metrik berlabel, dan palet biru-teal-amber.",
  blueprint_teknik:
    "Gaya Blueprint Arsitektur & Teknik: Gunakan latar biru muda teknis (#EFF6FF), garis kisi presisi biru tua (#1D4ED8), ukuran panah dimensi, dan skema konstruksi.",
  peta_kartografi:
    "Gaya Peta Eksplorasi & Kartografi: Gunakan elemen mata angin kompas, garis kontur peta, ikon lokasi geografis, serta warna hijau daratan dan biru samudra.",
  koding_algoritma:
    "Gaya Koding & Algoritma: Gunakan blok flowchart logis, panah keputusan bercabang, ikon robotik/komputasi, dan warna ungu-sian modern.",

  // 5. 3D, Diorama & Kerajinan Visual (6 Desain)
  desain_3d:
    "Gaya 3D Isometrik Modern: Gunakan efek kedalaman 3D, bayangan jatuh lembut, gradasi cahaya timbul (ungu, biru, sian, emas) sehingga objek tampak bervolume.",
  clay_plastisin:
    "Gaya Clay 3D Plastisin Lembut: Gunakan bentuk membulat empuk dengan highlight kilau lembut dan bayangan halus seperti kerajinan lilin mainan berwarna.",
  papercut_origami:
    "Gaya Papercut Lipatan Kertas Berlapis: Gunakan lapisan bentuk potongan kertas warna-warni bertumpuk dengan bayangan tipis antar lapisan.",
  lowpoly_geometri:
    "Gaya Low-Poly Kristal 3D: Gunakan faset poligon segitiga bergradasi warna permata biru-ungu-pirus yang modern dan tegas.",
  balok_konstruksi:
    "Gaya Balok Konstruksi Edukatif: Gunakan susunan modul balok warna-warni presisi (merah, kuning, biru, hijau) yang menyusun struktur objek materi.",
  diorama_ekologi:
    "Gaya Diorama Alam 3D: Gunakan penampang melintang 3D lapisan tanah, air, dan vegetasi seperti maket ekosistem di atas panggung persegi.",

  // 6. Seni Lukis & Artistik (6 Desain)
  pastel:
    "Gaya Pastel Lembut Kreatif: Gunakan warna pastel menenangkan (#FFE4E6, #E0E7FF, #CCFBF1, #FEF3C7) dengan sudut membulat artistik.",
  cat_air_akwarel:
    "Gaya Lukisan Cat Air Akwarel: Gunakan sapuan gradasi warna transparan lembut bernuansa biru langit, hijau daun, dan merah mawar di atas kertas putih.",
  gouache_buku:
    "Gaya Ilustrasi Gouache Buku Cerita: Gunakan warna hangat pekat bertekstur lembut (terakota, kuning mustard, hijau zaitun, biru tua) khas buku cerita klasik.",
  krayon_pensilwarna:
    "Gaya Krayon & Pensil Warna Ceria: Gunakan goresan warna hangat menyenangkan khas karya seni anak di atas kertas gambar putih bersih.",
  papan_kapur:
    "Gaya Papan Tulis Hijau & Kapur Warna: Gunakan latar hijau papan tulis lembut atau krem bersih dengan aksen garis kapur kuning, putih, dan merah muda yang kontras.",
  sketsa_botani:
    "Gaya Sketsa Botani & Jurnal Alam: Gunakan garis pena halus bernuansa sepia/cokelat tua dengan pewarnaan hijau zaitun lembut seperti buku catatan naturalis.",

  // 7. Nusantara & Warisan Budaya (5 Desain)
  nusantara:
    "Gaya Budaya Nusantara: Gunakan palet hangat terakota, emas kunyit, cokelat soga, dan hijau daun (#FEF3C7, #D97706, #92400E, #059669) dengan ornamen geometris Nusantara.",
  batik_pesisir:
    "Gaya Batik Pesisir Cerah: Gunakan motif awan mega mendung dan flora pesisir dengan paduan biru samudra, merah marun, dan emas cerah.",
  tenun_kepulauan:
    "Gaya Tenun Ikat Kepulauan: Gunakan pola geometris tenun Nusantara bernuansa merah bata, nila, dan kuning emas yang ritmis dan rapi.",
  ukiran_tradisi:
    "Gaya Ukiran Kayu & Ornamen Tradisi: Gunakan bingkai sulur ukiran simetris bernuansa cokelat jati hangat, krem gading, dan aksen keemasan.",
  bahari_phinisi:
    "Gaya Bahari Nusantara & Phinisi: Gunakan elemen gelombang laut, layar perahu, kompas pelayaran, serta warna biru laut dalam dan kayu hangat.",

  // 8. Klasik Akademik & Ramah Cetak (5 Desain)
  akademik:
    "Gaya Klasik Akademik Formal: Gunakan tata letak buku teks resmi dengan garis presisi, latar putih bersih, aksen biru dongker (#1E3A8A) dan abu-abu rapi.",
  minimalis:
    "Gaya Hitam Putih Ramah Fotokopi: Gunakan HANYA latar putih (#FFFFFF), garis hitam tegas (#0F172A), dan abu-abu terang (#F1F5F9) tanpa blok gelap pekat agar hemat tinta.",
  jurnal_universitas:
    "Gaya Jurnal Ilmiah & Riset: Gunakan skema diagram terukur, kotak keterangan bernomor presisi, dan palet biru-abu akademik formal.",
  ensiklopedia_serif:
    "Gaya Ensiklopedia Klasik: Gunakan bingkai ganda tipis elegan, warna krem kertas buku klasik (#FFFBEB), dan garis ilustrasi cokelat-hitam tajam.",
  milimeter_matematika:
    "Gaya Kertas Berpetak Milimeter Matematika: Gunakan kisi koordinat tipis rapi di latar belakang, sumbu berlabel jelas, dan bangun/kurva berwarna biru-merah tegas.",
};

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum tersedia di konfigurasi server.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function sanitizeSvgMarkup(raw: string | undefined, width = 640, height = 300): string {
  if (!raw || typeof raw !== "string") return "";
  const match = raw.match(/<svg[\s\S]*?<\/svg>/i);
  if (!match) return "";
  let svg = match[0]
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");

  if (!/viewBox=/i.test(svg)) {
    svg = svg.replace(/<svg/i, `<svg viewBox="0 0 ${width} ${height}"`);
  }
  if (!/xmlns=/i.test(svg)) {
    svg = svg.replace(/<svg/i, `<svg xmlns="http://www.w3.org/2000/svg"`);
  }
  return svg;
}

function getSvgStylePrompt(temaVisual = "kartun", materi = ""): string {
  const topicNote = materi
    ? `Wajib menggambar objek visual ikonik yang relevan langsung dengan materi "${materi}". `
    : "";
  const instruction =
    SERVER_THEME_STYLE_MAP[temaVisual] ?? SERVER_THEME_STYLE_MAP.kartun;
  return `${topicNote}${instruction}`;
}

function formatGeminiError(err: unknown): { status: number; message: string } {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("API_KEY_INVALID") || msg.includes("PERMISSION_DENIED") || msg.includes("403")) {
    return {
      status: 403,
      message:
        "Kunci API Gemini tidak valid atau belum diatur. Silakan periksa panel Settings > Secrets.",
    };
  }
  if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("429")) {
    return {
      status: 429,
      message:
        "Batas kuota permintaan AI tercapai. Silakan tunggu beberapa saat atau tingkatkan kuota pada Settings > Secrets.",
    };
  }
  return {
    status: 500,
    message: `Gagal memproses permintaan AI: ${msg}`,
  };
}

const QUESTION_ITEM_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    pertanyaan: {
      type: Type.STRING,
      description: "Kalimat pertanyaan atau instruksi utama soal",
    },
    tipe: {
      type: Type.STRING,
      description:
        "Salah satu dari: pilihan_ganda, pilihan_ganda_kompleks, benar_salah, cerita_bergambar, eksperimen, menjodohkan, studi_kasus, urutkan_langkah, isian_singkat, uraian",
    },
    levelKognitif: {
      type: Type.STRING,
      description: "L1 Pemahaman, L2 Penerapan, atau L3 Penalaran",
    },
    ilustrasiSoalSvg: {
      type: Type.STRING,
      description:
        "Kode <svg viewBox='0 0 480 200' xmlns='http://www.w3.org/2000/svg'> ilustrasi visual berwarna kaya elemen (bukan sekadar kotak teks polos) sesuai tema desain & materi soal",
    },
    wacanaCerita: {
      type: Type.STRING,
      description:
        "Teks cerita pendek menarik (wajib diisi jika tipe cerita_bergambar atau studi_kasus, selain itu boleh string kosong)",
    },
    opsi: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "4 pilihan jawaban jika tipe pilihan_ganda atau pilihan_ganda_kompleks (tanpa awalan huruf A/B/C/D), selain itu array kosong",
    },
    pernyataanBenarSalah: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "3-4 kalimat pernyataan untuk dinilai Benar/Salah jika tipe benar_salah, selain itu array kosong",
    },
    alatEksperimen: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "Daftar 3-4 alat dan bahan jika tipe eksperimen, selain itu array kosong",
    },
    langkahEksperimen: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "Langkah percobaan berurutan jika tipe eksperimen, ATAU 4 langkah yang sengaja DIACAK urutannya jika tipe urutkan_langkah, selain itu array kosong",
    },
    pasanganKiri: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 item lajur kiri jika tipe menjodohkan, selain itu array kosong",
    },
    pasanganKanan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "3-4 item lajur kanan (diacak) jika tipe menjodohkan, selain itu array kosong",
    },
    kunciJawaban: { type: Type.STRING },
    pembahasan: { type: Type.STRING },
    skor: { type: Type.INTEGER },
  },
  required: [
    "pertanyaan",
    "tipe",
    "levelKognitif",
    "ilustrasiSoalSvg",
    "wacanaCerita",
    "opsi",
    "pernyataanBenarSalah",
    "alatEksperimen",
    "langkahEksperimen",
    "pasanganKiri",
    "pasanganKanan",
    "kunciJawaban",
    "pembahasan",
    "skor",
  ],
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "12mb" }));

  // 1. Suggest Curriculum Topics
  app.post("/api/curriculum/suggest-topics", async (req: Request, res: Response) => {
    try {
      const { fase, kelas, mapel } = req.body ?? {};
      if (!fase || !kelas || !mapel) {
        res
          .status(400)
          .json({ error: "Parameter fase, kelas, dan mata pelajaran wajib diisi." });
        return;
      }

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Berikan 6 rekomendasi materi pokok Kurikulum Merdeka Indonesia yang konkret, menarik, kreatif, dan sesuai untuk ${fase} (${kelas}) pada mata pelajaran "${mapel}". Pastikan mencakup aktivitas visual, eksperimen, atau cerita kontekstual.`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            "Anda adalah pengembang Kurikulum Merdeka Kementerian Pendidikan Indonesia. Berikan materi pokok yang akurat sesuai tingkat perkembangan kognitif siswa.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                judulMateri: { type: Type.STRING },
                ringkasanCP: { type: Type.STRING },
                ideVisual: { type: Type.STRING },
              },
              required: ["judulMateri", "ringkasanCP", "ideVisual"],
            },
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "[]").trim());
      res.json({ topics: parsed });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({ error: formatted.message });
    }
  });

  // 2. Generate Complete Topic-Aligned & Theme-Illustrated LKPD
  app.post("/api/lkpd/generate", async (req: Request, res: Response) => {
    try {
      const {
        fase = "Fase B",
        kelas = "Kelas 4 SD / MI",
        semester = "Semester 1",
        mapel = "IPAS",
        materi = "Fotosintesis pada Tumbuhan",
        subMateri = "",
        alokasiWaktu = "2 x 35 Menit",
        modelPembelajaran = "Discovery Learning (Penemuan Terbimbing)",
        temaVisual = "kartun",
        jumlahSoal = 5,
        semuaSoalBergambar = true,
        tipeSoalPilihan = [
          "cerita_bergambar",
          "eksperimen",
          "benar_salah",
          "pilihan_ganda",
        ],
        instruksiTambahan = "",
      } = req.body ?? {};

      const safeCount = Math.min(Math.max(Number(jumlahSoal) || 5, 2), 10);
      const allowedTypes =
        Array.isArray(tipeSoalPilihan) && tipeSoalPilihan.length > 0
          ? tipeSoalPilihan.join(", ")
          : "pilihan_ganda, cerita_bergambar, benar_salah, uraian";
      const svgStyleHint = getSvgStylePrompt(temaVisual, materi);

      const ai = getGenAIClient();
      const prompt = `Susun sebuah Lembar Kerja Peserta Didik (LKPD) Kurikulum Merdeka yang desain isi, aktivitas eksplorasi, dan seluruh ilustrasi visualnya SANGAT SESUAI dengan materi "${materi}" serta bertema desain "${temaVisual}":
- Fase: ${fase}
- Kelas: ${kelas} (${semester})
- Mata Pelajaran: ${mapel}
- Materi Pokok: ${materi}${subMateri ? ` (Sub-materi: ${subMateri})` : ""}
- Alokasi Waktu: ${alokasiWaktu}
- Model Pembelajaran: ${modelPembelajaran}
- Tema Desain Visual: ${temaVisual} (${svgStyleHint})
- Jumlah Soal/Aktivitas: ${safeCount} butir
- Variasi Bentuk Soal yang WAJIB digunakan secara proporsional: ${allowedTypes}
${instruksiTambahan ? `- Catatan Khusus Guru: ${instruksiTambahan}` : ""}

Ketentuan Desain Sesuai Materi & Soal Bergambar Berwarna:
1. Seluruh isi LKPD (judul kreatif, petunjuk, alat/bahan, tabel eksplorasi, dan soal) WAJIB kontekstual dan spesifik membahas "${materi}".
2. Buat "ilustrasiUtamaSvg" berupa kode <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg"> yang kaya warna, menggunakan bentuk objek visual nyata tentang "${materi}" (misal gambar daun/matahari, bangun ruang, alat eksperimen, peta, alur cerita, atau blok robotik — JANGAN hanya kotak kosong), mengikuti gaya "${svgStyleHint}" dengan label Bahasa Indonesia rapi tanpa bertumpuk.
3. Untuk soal-soal di "daftarSoal":
   - ${
     semuaSoalBergambar
       ? `WAJIB sertakan "ilustrasiSoalSvg" (<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">) yang menarik, penuh warna sesuai tema "${temaVisual}", dan menggambarkan objek/adegan soal pada SETIAP butir soal!`
       : `Sertakan "ilustrasiSoalSvg" berwarna sesuai tema "${temaVisual}" minimal pada soal cerita_bergambar, eksperimen, dan soal analisis visual.`
   }
   - "cerita_bergambar": WAJIB isi "wacanaCerita" (3-5 kalimat menarik) DAN buat "ilustrasiSoalSvg" berupa 2-3 panel adegan cerita berwarna!
   - "eksperimen": WAJIB isi "alatEksperimen" dan "langkahEksperimen" yang relevan dengan "${materi}" serta gambar alat percobaan berwarna di "ilustrasiSoalSvg"!
   - "benar_salah": WAJIB isi "pernyataanBenarSalah" (3-4 pernyataan).
   - "pilihan_ganda" & "pilihan_ganda_kompleks": WAJIB isi "opsi" (4 pilihan tanpa awalan A./B./C./D.).
   - "menjodohkan": WAJIB isi "pasanganKiri" dan "pasanganKanan" (3-4 pasangan).
   - "studi_kasus": WAJIB isi "wacanaCerita" kasus nyata terkait "${materi}".
   - "urutkan_langkah": WAJIB isi "langkahEksperimen" dengan 4 tahapan dalam urutan ACAK.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            "Anda adalah desainer instruksional ahli Kurikulum Merdeka Indonesia sekaligus ilustrator buku pelajaran berwarna. Buat LKPD yang sangat selaras dengan materi pilihan guru, dengan ilustrasi vektor SVG multi-warna yang hidup, estetis sesuai tema visual, dan teks label rapi tidak bertumpuk.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              judul: { type: Type.STRING },
              subjudul: { type: Type.STRING },
              capaianPembelajaran: { type: Type.STRING },
              tujuanPembelajaran: { type: Type.ARRAY, items: { type: Type.STRING } },
              petunjukBelajar: { type: Type.ARRAY, items: { type: Type.STRING } },
              alatDanBahan: { type: Type.ARRAY, items: { type: Type.STRING } },
              ringkasanMateri: { type: Type.STRING },
              poinPenting: { type: Type.ARRAY, items: { type: Type.STRING } },
              ilustrasiUtamaSvg: { type: Type.STRING },
              keteranganIlustrasi: { type: Type.STRING },
              aktivitasEksplorasi: {
                type: Type.OBJECT,
                properties: {
                  judulAktivitas: { type: Type.STRING },
                  instruksi: { type: Type.STRING },
                  kolomTabel: { type: Type.ARRAY, items: { type: Type.STRING } },
                  barisContoh: {
                    type: Type.ARRAY,
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
                required: ["judulAktivitas", "instruksi", "kolomTabel", "barisContoh"],
              },
              daftarSoal: {
                type: Type.ARRAY,
                items: QUESTION_ITEM_SCHEMA,
              },
              refleksiSiswa: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              "judul",
              "subjudul",
              "capaianPembelajaran",
              "tujuanPembelajaran",
              "petunjukBelajar",
              "alatDanBahan",
              "ringkasanMateri",
              "poinPenting",
              "ilustrasiUtamaSvg",
              "keteranganIlustrasi",
              "aktivitasEksplorasi",
              "daftarSoal",
              "refleksiSiswa",
            ],
          },
        },
      });

      const rawJson = JSON.parse((response.text ?? "{}").trim());
      rawJson.ilustrasiUtamaSvg = sanitizeSvgMarkup(rawJson.ilustrasiUtamaSvg, 640, 280);
      if (Array.isArray(rawJson.daftarSoal)) {
        rawJson.daftarSoal = rawJson.daftarSoal.map((q: Record<string, unknown>) => ({
          ...q,
          ilustrasiSoalSvg: sanitizeSvgMarkup(String(q.ilustrasiSoalSvg ?? ""), 480, 200),
        }));
      }

      res.json({ lkpd: rawJson });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({ error: formatted.message });
    }
  });

  // 3. Regenerate Theme-Aware & Topic-Matched Educational SVG Diagram
  app.post("/api/lkpd/regenerate-diagram", async (req: Request, res: Response) => {
    try {
      const {
        topik,
        materi = "",
        konteks = "",
        ukuran = "utama",
        temaVisual = "kartun",
      } = req.body ?? {};
      if (!topik) {
        res.status(400).json({ error: "Topik diagram wajib diisi." });
        return;
      }

      const w = ukuran === "soal" ? 480 : 640;
      const h = ukuran === "soal" ? 200 : 280;
      const styleInstruction = getSvgStylePrompt(temaVisual, materi || topik);

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Buat ilustrasi vektor edukatif berwarna <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"> yang sangat menarik, kaya ilustrasi bentuk objek (bukan sekadar kotak teks), dan proporsional untuk topik: "${topik}". ${
          konteks ? `Konteks: ${konteks}.` : ""
        }
Arahan Gaya Desain & Warna Tema: ${styleInstruction}
Gunakan kombinasi bentuk visual ilustratif, gradasi warna harmonis, dan label Bahasa Indonesia yang jelas tanpa saling menumpuk.`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              svg: { type: Type.STRING },
              keterangan: { type: Type.STRING },
            },
            required: ["svg", "keterangan"],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      const cleanSvg = sanitizeSvgMarkup(parsed.svg, w, h);
      res.json({ svg: cleanSvg, keterangan: parsed.keterangan ?? "" });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({ error: formatted.message });
    }
  });

  // 4. Batch Restyle / Generate Colorful Question Illustrations Matching Theme & Topic
  app.post("/api/lkpd/restyle-questions-svg", async (req: Request, res: Response) => {
    try {
      const {
        mapel = "IPAS",
        materi = "Materi Pembelajaran",
        kelas = "Kelas 4 SD",
        temaVisual = "kartun",
        questions = [],
      } = req.body ?? {};

      if (!Array.isArray(questions) || questions.length === 0) {
        res.status(400).json({ error: "Daftar soal kosong." });
        return;
      }

      const styleInstruction = getSvgStylePrompt(temaVisual, materi);
      const compactQuestions = questions.slice(0, 8).map((q: Record<string, unknown>) => ({
        id: String(q.id ?? ""),
        tipe: String(q.tipe ?? "pilihan_ganda"),
        pertanyaan: String(q.pertanyaan ?? ""),
        wacanaCerita: String(q.wacanaCerita ?? ""),
      }));

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Buat ilustrasi vektor berwarna <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg"> yang menarik, hidup, dan selaras dengan tema desain "${temaVisual}" serta materi "${materi}" (${mapel} - ${kelas}) untuk masing-masing butir soal berikut:
${JSON.stringify(compactQuestions, null, 2)}

Arahan Gaya Tema "${temaVisual}": ${styleInstruction}
Pastikan setiap SVG menampilkan objek/adegan visual berwarna yang membantu siswa memahami soal tersebut, dan semua teks label rapi tidak bertumpuk!`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                svg: { type: Type.STRING },
              },
              required: ["id", "svg"],
            },
          },
        },
      });

      const items = JSON.parse((response.text ?? "[]").trim()).map(
        (item: { id: string; svg: string }) => ({
          id: item.id,
          svg: sanitizeSvgMarkup(item.svg, 480, 200),
        })
      );

      res.json({ illustrations: items });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({ error: formatted.message });
    }
  });

  // 5. Generate Bank Soal Items via AI (with Theme-Matched Colorful Illustrations)
  app.post("/api/bank-soal/generate", async (req: Request, res: Response) => {
    try {
      const {
        fase = "Fase B",
        kelas = "Kelas 4 SD / MI",
        mapel = "IPAS",
        materi = "Wujud Zat dan Perubahannya",
        jumlah = 4,
        tipeSoal = "campuran",
        temaVisual = "kartun",
        sertakanGambar = true,
      } = req.body ?? {};

      const count = Math.min(Math.max(Number(jumlah) || 4, 1), 6);
      const styleInstruction = getSvgStylePrompt(temaVisual, materi);
      const ai = getGenAIClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Buat ${count} butir soal Bank Soal Kurikulum Merdeka yang menarik dan bergambar penuh warna sesuai materi untuk:
- Fase: ${fase} (${kelas})
- Mata Pelajaran: ${mapel}
- Materi: ${materi}
- Tema Desain Ilustrasi Soal: ${temaVisual} (${styleInstruction})
- Bentuk Soal: ${
          tipeSoal === "campuran"
            ? "variasikan antara cerita_bergambar, eksperimen, benar_salah, pilihan_ganda, pilihan_ganda_kompleks, studi_kasus, atau uraian"
            : `WAJIB semua bertipe "${tipeSoal}"`
        }
- Gambar Stimulus SVG: ${
          sertakanGambar
            ? `WAJIB sertakan ilustrasi/panel cerita berwarna <svg viewBox='0 0 480 200' xmlns='http://www.w3.org/2000/svg'> pada SETIAP soal mengikuti gaya "${styleInstruction}"!`
            : "Kosongkan ilustrasiSoalSvg."
        }
Pastikan field khusus tiap tipe soal (wacanaCerita untuk cerita_bergambar/studi_kasus, pernyataanBenarSalah untuk benar_salah, alatEksperimen & langkahEksperimen untuk eksperimen, langkahEksperimen acak untuk urutkan_langkah) terisi lengkap!`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: QUESTION_ITEM_SCHEMA,
          },
        },
      });

      const items = JSON.parse((response.text ?? "[]").trim()).map(
        (q: Record<string, unknown>) => ({
          ...q,
          ilustrasiSoalSvg: sanitizeSvgMarkup(String(q.ilustrasiSoalSvg ?? ""), 480, 200),
        })
      );

      res.json({ questions: items });
    } catch (err) {
      const formatted = formatGeminiError(err);
      res.status(formatted.status).json({ error: formatted.message });
    }
  });

  const distPath = path.join(process.cwd(), "dist");
  const isProd =
    process.env.NODE_ENV === "production" ||
    (process.env.npm_lifecycle_event === "start" &&
      fs.existsSync(path.join(distPath, "index.html")));

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LembarKarya Studio server berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer();
