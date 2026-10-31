import { getThemeMeta } from "../data/themesCatalog50";
import { VisualTheme } from "../types/lkpd";

export type TopicDomainId =
  | "ekosistem_tumbuhan"
  | "tubuh_kesehatan"
  | "eksperimen_zat_energi"
  | "bumi_antariksa"
  | "matematika_geometri"
  | "cerita_literasi"
  | "budaya_sejarah_pancasila"
  | "geografi_ekonomi"
  | "koding_teknologi"
  | "paud_bermain";

export interface TopicVisualProfile {
  domainId: TopicDomainId;
  namaDomain: string;
  recommendedTheme: VisualTheme;
  primaryVisualId: string;
  primaryRealisticVisualId: string;
  deskripsiVisualMateri: string;
}

export interface QuestionShowcasePalette {
  frameBorder: string;
  headerGradient: string;
  headerText: string;
  canvasBg: string;
  svgBgStart: string;
  svgBgEnd: string;
  svgFrameStroke: string;
  svgAccentPrimary: string;
  svgAccentSecondary: string;
  isMonochrome?: boolean;
}

export function detectTopicDomainProfile(
  mapel: string,
  materi: string,
  fase = "Fase B"
): TopicVisualProfile {
  const m = (materi || "").toLowerCase();
  const s = (mapel || "").toLowerCase();
  const f = (fase || "").toLowerCase();
  const combined = `${m} ${s}`;

  // 1. PAUD / Early Childhood Playful Topics
  if (
    f.includes("fondasi") ||
    combined.includes("paud") ||
    combined.includes("motorik") ||
    combined.includes("bermain") ||
    (f.includes("fase a") &&
      (m.includes("membilang") || m.includes("hewan") || m.includes("warna")))
  ) {
    return {
      domainId: "paud_bermain",
      namaDomain: "Eksplorasi Anak, Bermain & Numerasi Awal",
      recommendedTheme: VisualTheme.KARTUN_HEWAN,
      primaryVisualId: "vis_paud",
      primaryRealisticVisualId: "vis_real_nature",
      deskripsiVisualMateri:
        "Ilustrasi taman bermain ceria, hewan sahabat anak, dan balok warna-warni sesuai dunia anak.",
    };
  }

  // 2. Coding, Informatics, AI & Robotics
  if (
    m.includes("koding") ||
    m.includes("algoritma") ||
    m.includes("komputasional") ||
    m.includes("pemrograman") ||
    m.includes("robot") ||
    m.includes("kecerdasan artifisial") ||
    m.includes("jaringan komputer") ||
    m.includes("data") ||
    s.includes("informatika") ||
    s.includes("koding") ||
    s.includes("rekayasa perangkat") ||
    s.includes("teknik komputer")
  ) {
    return {
      domainId: "koding_teknologi",
      namaDomain: "Koding, Algoritma & Teknologi Digital",
      recommendedTheme: VisualTheme.KODING_ALGORITMA,
      primaryVisualId: "vis_coding",
      primaryRealisticVisualId: "vis_real_robotics",
      deskripsiVisualMateri:
        "Desain diagram alir komputasional, blok logika pemrograman, dan ilustrasi robotika edukatif.",
    };
  }

  // 3. Human Body, Health, Biology Cells & PJOK
  if (
    m.includes("organ") ||
    m.includes("pernapasan") ||
    m.includes("pencernaan") ||
    m.includes("peredaran darah") ||
    m.includes("jantung") ||
    m.includes("sel") ||
    m.includes("osmosis") ||
    m.includes("genetika") ||
    m.includes("dna") ||
    m.includes("virus") ||
    m.includes("bakteri") ||
    m.includes("gizi") ||
    m.includes("kebugaran") ||
    m.includes("olahraga") ||
    s.includes("pjok") ||
    s.includes("kesehatan") ||
    s.includes("biologi")
  ) {
    return {
      domainId: "tubuh_kesehatan",
      namaDomain: "Biologi Tubuh, Sel, Kesehatan & Olahraga",
      recommendedTheme: VisualTheme.REALISTIK_ANATOMI,
      primaryVisualId: "vis_health",
      primaryRealisticVisualId: "vis_real_lab",
      deskripsiVisualMateri:
        "Visualisasi anatomi tubuh sehat, pengamatan mikroskopik sel, nutrisi, dan aktivitas fisik.",
    };
  }

  // 4. Botany, Photosynthesis, Animals & Ecosystems
  if (
    m.includes("tumbuhan") ||
    m.includes("fotosintesis") ||
    m.includes("ekosistem") ||
    m.includes("rantai makanan") ||
    m.includes("jaring") ||
    m.includes("hewan") ||
    m.includes("metamorfosis") ||
    m.includes("daun") ||
    m.includes("hutan") ||
    m.includes("biodiversitas") ||
    m.includes("makhluk hidup") ||
    s.includes("agribisnis")
  ) {
    const isSenior = f.includes("fase d") || f.includes("fase e") || f.includes("fase f");
    return {
      domainId: "ekosistem_tumbuhan",
      namaDomain: "Tumbuhan, Fotosintesis & Harmoni Ekosistem",
      recommendedTheme: isSenior ? VisualTheme.REALISTIK_ALAM : VisualTheme.SAINS,
      primaryVisualId: "vis_science",
      primaryRealisticVisualId: "vis_real_nature",
      deskripsiVisualMateri:
        "Desain bernuansa hijau botani dengan ilustrasi kloroplas daun, cahaya matahari, dan jaring kehidupan.",
    };
  }

  // 5. Earth, Water Cycle, Weather, Solar System & Disaster Mitigation
  if (
    m.includes("siklus air") ||
    m.includes("hidrologi") ||
    m.includes("tata surya") ||
    m.includes("planet") ||
    m.includes("bumi") ||
    m.includes("cuaca") ||
    m.includes("iklim") ||
    m.includes("gunung") ||
    m.includes("litosfer") ||
    m.includes("atmosfer") ||
    m.includes("bencana") ||
    m.includes("pemanasan global")
  ) {
    const isSpace = m.includes("tata surya") || m.includes("planet") || m.includes("antariksa");
    return {
      domainId: "bumi_antariksa",
      namaDomain: "Sistem Bumi, Siklus Alam & Antariksa",
      recommendedTheme: isSpace ? VisualTheme.REALISTIK_ANTARIKSA : VisualTheme.DESAIN_3D,
      primaryVisualId: isSpace ? "vis_real_astronomy" : "vis_3d",
      primaryRealisticVisualId: "vis_real_astronomy",
      deskripsiVisualMateri:
        "Visualisasi lapisan bumi, siklus hidrologi, atmosfer, dan observatorium tata surya.",
    };
  }

  // 6. Matter, Magnet, Force, Electricity, Energy, Physics & Chemistry Lab
  if (
    m.includes("magnet") ||
    m.includes("gaya") ||
    m.includes("wujud zat") ||
    m.includes("mencair") ||
    m.includes("menguap") ||
    m.includes("listrik") ||
    m.includes("energi") ||
    m.includes("kalor") ||
    m.includes("cahaya") ||
    m.includes("optik") ||
    m.includes("gelombang") ||
    m.includes("reaksi") ||
    m.includes("asam") ||
    m.includes("atom") ||
    m.includes("stoikiometri") ||
    s.includes("fisika") ||
    s.includes("kimia") ||
    s.includes("teknik")
  ) {
    const isElementary =
      f.includes("fase a") || f.includes("fase b") || f.includes("fase c");
    return {
      domainId: "eksperimen_zat_energi",
      namaDomain: "Eksperimen Sains, Gaya, Zat & Energi",
      recommendedTheme: isElementary
        ? VisualTheme.KARTUN
        : VisualTheme.REALISTIK_LABORATORIUM,
      primaryVisualId: isElementary ? "vis_cartoon" : "vis_real_lab",
      primaryRealisticVisualId: "vis_real_lab",
      deskripsiVisualMateri:
        "Tata letak laboratorium eksperimen aktif dengan skema gaya, perubahan zat, dan konversi energi.",
    };
  }

  // 7. Mathematics, Geometry, Numbers, Fractions, Algebra & Statistics
  if (
    m.includes("pecahan") ||
    m.includes("bilangan") ||
    m.includes("geometri") ||
    m.includes("bangun ruang") ||
    m.includes("bangun datar") ||
    m.includes("pythagoras") ||
    m.includes("sudut") ||
    m.includes("aljabar") ||
    m.includes("fungsi") ||
    m.includes("matriks") ||
    m.includes("turunan") ||
    m.includes("integral") ||
    m.includes("peluang") ||
    m.includes("statistika") ||
    m.includes("perkalian") ||
    m.includes("penjumlahan") ||
    s.includes("matematika") ||
    s.includes("akuntansi")
  ) {
    const isYoung = f.includes("fase a") || f.includes("fase b");
    return {
      domainId: "matematika_geometri",
      namaDomain: "Matematika, Bangun Ruang & Penalaran Numerasi",
      recommendedTheme: isYoung
        ? VisualTheme.BALOK_KONSTRUKSI
        : VisualTheme.MILIMETER_MATEMATIKA,
      primaryVisualId: "vis_math",
      primaryRealisticVisualId: "vis_real_robotics",
      deskripsiVisualMateri:
        "Visualisasi bangun ruang presisi, kisi koordinat terukur, dan model representasi numerasi berwarna.",
    };
  }

  // 8. Stories, Comics, Fairy Tales, Poetry, Indonesian & World Languages
  if (
    m.includes("cerita") ||
    m.includes("dongeng") ||
    m.includes("fabel") ||
    m.includes("komik") ||
    m.includes("gambar seri") ||
    m.includes("puisi") ||
    m.includes("pantun") ||
    m.includes("narasi") ||
    m.includes("deskripsi") ||
    m.includes("membaca") ||
    m.includes("kosakata") ||
    m.includes("percakapan") ||
    m.includes("narrative") ||
    m.includes("recount") ||
    s.includes("bahasa")
  ) {
    const isStoryComic =
      m.includes("cerita") ||
      m.includes("dongeng") ||
      m.includes("fabel") ||
      m.includes("komik") ||
      m.includes("gambar seri") ||
      f.includes("fase a") ||
      f.includes("fase b");
    return {
      domainId: "cerita_literasi",
      namaDomain: "Cerita Bergambar, Bahasa & Literasi Kreatif",
      recommendedTheme: isStoryComic ? VisualTheme.KOMIK : VisualTheme.ANIME,
      primaryVisualId: isStoryComic ? "vis_storybook" : "vis_anime",
      primaryRealisticVisualId: "vis_real_heritage",
      deskripsiVisualMateri:
        "Bingkai cerita bergambar berurutan, balon dialog ekspresif, dan ilustrasi literasi naratif.",
    };
  }

  // 9. Pancasila, History, Cultural Heritage, Religion & Fine Arts
  if (
    m.includes("pancasila") ||
    m.includes("sila") ||
    m.includes("budaya") ||
    m.includes("nusantara") ||
    m.includes("kerajaan") ||
    m.includes("sejarah") ||
    m.includes("proklamasi") ||
    m.includes("pergerakan") ||
    m.includes("adat") ||
    m.includes("batik") ||
    m.includes("tari") ||
    m.includes("musik") ||
    m.includes("norma") ||
    m.includes("gotong royong") ||
    m.includes("akhlak") ||
    s.includes("pancasila") ||
    s.includes("sejarah") ||
    s.includes("agama") ||
    s.includes("seni") ||
    s.includes("sosiologi") ||
    s.includes("antropologi")
  ) {
    const isHistory = m.includes("sejarah") || m.includes("kerajaan") || s.includes("sejarah");
    return {
      domainId: "budaya_sejarah_pancasila",
      namaDomain: "Pancasila, Sejarah & Kearifan Budaya Nusantara",
      recommendedTheme: isHistory ? VisualTheme.REALISTIK_SEJARAH : VisualTheme.NUSANTARA,
      primaryVisualId: isHistory ? "vis_real_heritage" : "vis_heritage",
      primaryRealisticVisualId: "vis_real_heritage",
      deskripsiVisualMateri:
        "Ornamen hangat Nusantara, dokumentasi candi & rumah adat bersejarah, serta nilai kebhinekaan.",
    };
  }

  // 10. Geography, Economics, Maps, Maritime & Entrepreneurship
  if (
    m.includes("peta") ||
    m.includes("benua") ||
    m.includes("asean") ||
    m.includes("ekonomi") ||
    m.includes("pasar") ||
    m.includes("permintaan") ||
    m.includes("penawaran") ||
    m.includes("distribusi") ||
    m.includes("inflasi") ||
    m.includes("wirausaha") ||
    m.includes("maritim") ||
    m.includes("pariwisata") ||
    s.includes("ips") ||
    s.includes("geografi") ||
    s.includes("ekonomi") ||
    s.includes("prakarya") ||
    s.includes("bisnis")
  ) {
    return {
      domainId: "geografi_ekonomi",
      namaDomain: "Geografi Wilayah, Ekonomi & Kemaritiman",
      recommendedTheme: VisualTheme.PETA_KARTOGRAFI,
      primaryVisualId: "vis_geography",
      primaryRealisticVisualId: "vis_real_nature",
      deskripsiVisualMateri:
        "Ilustrasi bentang alam kepulauan, konektivitas distribusi wilayah, dan grafik aktivitas ekonomi.",
    };
  }

  return {
    domainId: "ekosistem_tumbuhan",
    namaDomain: "Eksplorasi Kontekstual Kurikulum Merdeka",
    recommendedTheme: VisualTheme.KARTUN,
    primaryVisualId: "vis_cartoon",
    primaryRealisticVisualId: "vis_real_lab",
    deskripsiVisualMateri:
      "Desain lembar kerja ilustratif & realistik yang menyesuaikan topik pembelajaran kelas.",
  };
}

export function getQuestionShowcasePalette(
  temaVisual: VisualTheme
): QuestionShowcasePalette {
  // Exact overrides for specific signature themes
  if (
    temaVisual === VisualTheme.MINIMALIS ||
    temaVisual === VisualTheme.MANGA_TINTAKLASIK
  ) {
    return {
      frameBorder: "border-slate-800",
      headerGradient:
        temaVisual === VisualTheme.MANGA_TINTAKLASIK
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-900 border-b border-slate-800",
      headerText:
        temaVisual === VisualTheme.MANGA_TINTAKLASIK
          ? "text-white"
          : "text-slate-900",
      canvasBg: "bg-white",
      svgBgStart: "#FFFFFF",
      svgBgEnd: "#FFFFFF",
      svgFrameStroke: "#0F172A",
      svgAccentPrimary: "#0F172A",
      svgAccentSecondary: "#334155",
      isMonochrome: true,
    };
  }

  if (temaVisual === VisualTheme.KOMIK) {
    return {
      frameBorder: "border-slate-900",
      headerGradient:
        "bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-500 text-white",
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-yellow-50/90 via-white to-blue-50/70",
      svgBgStart: "#FEFCE8",
      svgBgEnd: "#EFF6FF",
      svgFrameStroke: "#0F172A",
      svgAccentPrimary: "#1D4ED8",
      svgAccentSecondary: "#D97706",
    };
  }

  if (temaVisual === VisualTheme.PAPAN_KAPUR) {
    return {
      frameBorder: "border-emerald-700",
      headerGradient:
        "bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white",
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/60",
      svgBgStart: "#ECFDF5",
      svgBgEnd: "#FEFCE8",
      svgFrameStroke: "#065F46",
      svgAccentPrimary: "#065F46",
      svgAccentSecondary: "#D97706",
    };
  }

  const meta = getThemeMeta(temaVisual);

  const familyPalettes: Record<string, QuestionShowcasePalette> = {
    realistik: {
      frameBorder: "border-slate-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-slate-50 via-white to-sky-50/50",
      svgBgStart: "#F8FAFC",
      svgBgEnd: "#F0F9FF",
      svgFrameStroke: "#0369A1",
      svgAccentPrimary: "#0F172A",
      svgAccentSecondary: "#0284C7",
    },
    kartun: {
      frameBorder: "border-amber-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-amber-50/80 via-white to-sky-50/70",
      svgBgStart: "#FFFDF2",
      svgBgEnd: "#E0F2FE",
      svgFrameStroke: "#F59E0B",
      svgAccentPrimary: "#EA580C",
      svgAccentSecondary: "#0284C7",
    },
    anime_komik: {
      frameBorder: "border-indigo-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-indigo-50/75 via-white to-pink-50/70",
      svgBgStart: "#EEF2FF",
      svgBgEnd: "#FCE7F3",
      svgFrameStroke: "#6366F1",
      svgAccentPrimary: "#4F46E5",
      svgAccentSecondary: "#EC4899",
    },
    vektor_2d: {
      frameBorder: "border-teal-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-teal-50/70 via-white to-cyan-50/70",
      svgBgStart: "#F0FDFA",
      svgBgEnd: "#ECFEFF",
      svgFrameStroke: "#0D9488",
      svgAccentPrimary: "#059669",
      svgAccentSecondary: "#0284C7",
    },
    tiga_dimensi: {
      frameBorder: "border-violet-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-violet-50/75 via-white to-cyan-50/75",
      svgBgStart: "#F5F3FF",
      svgBgEnd: "#ECFEFF",
      svgFrameStroke: "#7C3AED",
      svgAccentPrimary: "#7C3AED",
      svgAccentSecondary: "#06B6D4",
    },
    artistik_lukis: {
      frameBorder: "border-rose-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-rose-50/70 via-white to-teal-50/70",
      svgBgStart: "#FFF1F2",
      svgBgEnd: "#F0FDFA",
      svgFrameStroke: "#E11D48",
      svgAccentPrimary: "#E11D48",
      svgAccentSecondary: "#0D9488",
    },
    nusantara: {
      frameBorder: "border-amber-400",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/70",
      svgBgStart: "#FFFBEB",
      svgBgEnd: "#FFEDD5",
      svgFrameStroke: "#D97706",
      svgAccentPrimary: "#B45309",
      svgAccentSecondary: "#15803D",
    },
    akademik_cetak: {
      frameBorder: "border-slate-300",
      headerGradient: `bg-gradient-to-r ${meta.swatchGradient} text-white`,
      headerText: "text-white",
      canvasBg: "bg-slate-50/80",
      svgBgStart: "#F8FAFC",
      svgBgEnd: "#EFF6FF",
      svgFrameStroke: "#1E3A8A",
      svgAccentPrimary: "#1E3A8A",
      svgAccentSecondary: "#0369A1",
    },
  };

  return familyPalettes[meta.kategoriGaya] ?? familyPalettes.kartun;
}

/**
 * Dynamically adapts any SVG stimulus diagram so its backdrop gradient,
 * outer border stroke, and theme accents match any of the 50 VisualTheme designs!
 */
export function adaptQuestionSvgToTheme(
  svgMarkup: string,
  temaVisual: VisualTheme
): string {
  if (!svgMarkup || !svgMarkup.trim().startsWith("<svg")) {
    return svgMarkup;
  }

  const pal = getQuestionShowcasePalette(temaVisual);
  const meta = getThemeMeta(temaVisual);
  const gradId = `lkpd_bg_${temaVisual}`;

  const extraDecor =
    meta.kategoriGaya === "realistik"
      ? `<g opacity="0.5" stroke="${pal.svgAccentSecondary}" stroke-width="1.5" fill="none" pointer-events="none">
          <path d="M10 22 L10 10 L22 10"/>
          <path d="M470 22 L470 10 L458 10"/>
          <path d="M10 178 L10 190 L22 190"/>
          <path d="M470 178 L470 190 L458 190"/>
        </g>`
      : temaVisual === VisualTheme.BLUEPRINT_TEKNIK ||
        temaVisual === VisualTheme.MILIMETER_MATEMATIKA
      ? `<g opacity="0.24" stroke="${pal.svgAccentSecondary}" stroke-width="0.6" pointer-events="none">
          <line x1="0" y1="40" x2="640" y2="40" stroke-dasharray="2 4"/>
          <line x1="0" y1="100" x2="640" y2="100" stroke-dasharray="2 4"/>
          <line x1="0" y1="160" x2="640" y2="160" stroke-dasharray="2 4"/>
          <line x1="120" y1="0" x2="120" y2="280" stroke-dasharray="2 4"/>
          <line x1="360" y1="0" x2="360" y2="280" stroke-dasharray="2 4"/>
        </g>`
      : meta.kategoriGaya === "anime_komik" && temaVisual !== VisualTheme.KOMIK
      ? `<g opacity="0.55" pointer-events="none">
          <path d="M18 14 L20 20 L26 22 L20 24 L18 30 L16 24 L10 22 L16 20 Z" fill="${pal.svgAccentSecondary}"/>
          <path d="M462 14 L464 19 L469 21 L464 23 L462 28 L460 23 L455 21 L460 19 Z" fill="${pal.svgAccentPrimary}"/>
        </g>`
      : temaVisual === VisualTheme.KOMIK
      ? `<rect x="4" y="4" width="98.3%" height="95%" rx="8" fill="none" stroke="#0F172A" stroke-width="2.2" pointer-events="none"/>`
      : meta.kategoriGaya === "tiga_dimensi"
      ? `<g opacity="0.22" stroke="${pal.svgAccentPrimary}" stroke-width="0.7" pointer-events="none">
          <line x1="0" y1="36" x2="640" y2="36" stroke-dasharray="3 5"/>
          <line x1="0" y1="165" x2="640" y2="165" stroke-dasharray="3 5"/>
        </g>`
      : meta.kategoriGaya === "nusantara"
      ? `<g opacity="0.45" fill="${pal.svgAccentPrimary}" pointer-events="none">
          <polygon points="14,8 20,14 14,20 8,14"/>
          <polygon points="466,8 472,14 466,20 460,14"/>
        </g>`
      : "";

  const defsBlock = `<defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${pal.svgBgStart}"/>
      <stop offset="100%" stop-color="${pal.svgBgEnd}"/>
    </linearGradient>
  </defs>`;

  let adapted = svgMarkup.replace(
    /<rect([^>]*?)\sfill=["'](#F8FAFC|#FFFBEB|#FFFFFF|#F1F5F9|#EEF2FF|#F5F3FF)["']([^>]*?)\/>/i,
    (_full, before, _oldFill, after) => {
      const cleanedBefore = before.replace(/\sstroke=["'][^"']*["']/i, "");
      const cleanedAfter = after.replace(/\sstroke=["'][^"']*["']/i, "");
      const strokeWidth = temaVisual === VisualTheme.KOMIK ? "2.5" : "1.8";
      return `<rect${cleanedBefore} fill="url(#${gradId})" stroke="${pal.svgFrameStroke}" stroke-width="${strokeWidth}"${cleanedAfter}/>`;
    }
  );

  adapted = adapted.replace(/<svg([^>]*)>/i, `<svg$1>${defsBlock}${extraDecor}`);
  return adapted;
}

export function buildTopicHeaderBannerSvg(
  domainId: TopicDomainId,
  temaVisual: VisualTheme
): string {
  const isMono =
    temaVisual === VisualTheme.MINIMALIS ||
    temaVisual === VisualTheme.MANGA_TINTAKLASIK;
  const strokeMain = isMono ? "#0F172A" : "#FFFFFF";
  const accentGold = isMono ? "#CBD5E1" : "#FDE047";
  const accentMint = isMono ? "#E2E8F0" : "#6EE7B7";
  const accentCoral = isMono ? "#CBD5E1" : "#FDA4AF";
  const accentSky = isMono ? "#E2E8F0" : "#7DD3FC";
  const cardFill = isMono ? "#F8FAFC" : "rgba(255,255,255,0.16)";
  const cardStroke = isMono ? "#0F172A" : "rgba(255,255,255,0.38)";

  let artwork = "";

  switch (domainId) {
    case "ekosistem_tumbuhan":
      artwork = `
        <circle cx="176" cy="28" r="15" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.6"/>
        <path d="M52 84 Q56 42 98 36 Q94 78 52 84 Z" fill="${accentMint}" stroke="${strokeMain}" stroke-width="1.8"/>
        <path d="M54 82 L90 44" stroke="${strokeMain}" stroke-width="1.6"/>
        <path d="M98 86 Q116 50 152 54 Q134 88 98 86 Z" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.6"/>
        <circle cx="34" cy="40" r="5" fill="${accentSky}"/>
        <circle cx="144" cy="30" r="4" fill="${accentCoral}"/>
      `;
      break;

    case "tubuh_kesehatan":
      artwork = `
        <path d="M32 62 L58 62 L68 36 L82 82 L96 46 L106 62 L136 62" fill="none" stroke="${accentGold}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M168 42 C168 32 154 28 148 38 C142 28 128 32 128 42 C128 58 148 70 148 76 C148 70 168 58 168 42 Z" fill="${accentCoral}" stroke="${strokeMain}" stroke-width="1.8"/>
        <circle cx="192" cy="64" r="14" fill="none" stroke="${accentMint}" stroke-width="2"/>
        <circle cx="192" cy="64" r="5" fill="${accentSky}"/>
      `;
      break;

    case "eksperimen_zat_energi":
      artwork = `
        <path d="M56 26 L74 26 L74 44 L92 80 Q94 86 86 86 L44 86 Q36 86 38 80 L56 44 Z" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.8"/>
        <path d="M44 72 L86 72 L90 82 L40 82 Z" fill="${accentMint}"/>
        <circle cx="65" cy="58" r="4" fill="${accentGold}"/>
        <circle cx="72" cy="48" r="3" fill="${accentCoral}"/>
        <path d="M132 34 L132 64 Q132 82 152 82 Q172 82 172 64 L172 34" fill="none" stroke="${accentCoral}" stroke-width="7" stroke-linecap="round"/>
        <polygon points="196,26 182,56 196,56 186,84 212,50 197,50" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.2"/>
      `;
      break;

    case "bumi_antariksa":
      artwork = `
        <circle cx="82" cy="54" r="24" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.8"/>
        <path d="M66 46 Q82 38 96 50 Q84 66 68 62 Z" fill="${accentMint}"/>
        <ellipse cx="82" cy="54" rx="40" ry="11" fill="none" stroke="${accentGold}" stroke-width="2.2" transform="rotate(-18 82 54)"/>
        <circle cx="166" cy="34" r="12" fill="${accentGold}"/>
        <path d="M138 80 Q138 66 152 66 Q158 56 172 60 Q186 60 186 74 L186 80 Z" fill="${strokeMain}" opacity="0.88"/>
      `;
      break;

    case "matematika_geometri":
      artwork = `
        <polygon points="62,24 94,40 94,74 62,90 30,74 30,40" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.8"/>
        <line x1="62" y1="24" x2="62" y2="57" stroke="${strokeMain}" stroke-width="1.5"/>
        <line x1="94" y1="40" x2="62" y2="57" stroke="${strokeMain}" stroke-width="1.5"/>
        <line x1="30" y1="40" x2="62" y2="57" stroke="${strokeMain}" stroke-width="1.5"/>
        <polygon points="148,26 182,84 114,84" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.8"/>
        <circle cx="194" cy="40" r="12" fill="${accentCoral}" stroke="${strokeMain}" stroke-width="1.6"/>
      `;
      break;

    case "cerita_literasi":
      artwork = `
        <path d="M36 34 Q72 28 104 40 L104 84 Q72 72 36 78 Z" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.8"/>
        <path d="M172 34 Q136 28 104 40 L104 84 Q136 72 172 78 Z" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.8"/>
        <rect x="148" y="18" width="56" height="30" rx="10" fill="${accentCoral}" stroke="${strokeMain}" stroke-width="1.6"/>
        <circle cx="164" cy="33" r="2.5" fill="${strokeMain}"/>
        <circle cx="176" cy="33" r="2.5" fill="${strokeMain}"/>
        <circle cx="188" cy="33" r="2.5" fill="${strokeMain}"/>
      `;
      break;

    case "budaya_sejarah_pancasila":
      artwork = `
        <polygon points="110,20 166,48 54,48" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.8"/>
        <polygon points="110,34 182,58 38,58" fill="${accentCoral}" stroke="${strokeMain}" stroke-width="1.8"/>
        <rect x="64" y="58" width="92" height="28" fill="${cardFill}" stroke="${strokeMain}" stroke-width="1.6"/>
        <line x1="88" y1="58" x2="88" y2="86" stroke="${strokeMain}" stroke-width="1.6"/>
        <line x1="132" y1="58" x2="132" y2="86" stroke="${strokeMain}" stroke-width="1.6"/>
        <polygon points="194,24 198,34 208,34 200,40 203,50 194,44 185,50 188,40 180,34 190,34" fill="${accentGold}"/>
      `;
      break;

    case "geografi_ekonomi":
      artwork = `
        <polygon points="32,82 68,32 102,82" fill="${accentMint}" stroke="${strokeMain}" stroke-width="1.8"/>
        <polygon points="78,82 108,44 138,82" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.6"/>
        <rect x="148" y="58" width="12" height="26" rx="2" fill="${accentSky}"/>
        <rect x="166" y="44" width="12" height="40" rx="2" fill="${accentMint}"/>
        <rect x="184" y="28" width="12" height="56" rx="2" fill="${accentGold}"/>
        <path d="M146 52 L168 38 L192 22" fill="none" stroke="${accentCoral}" stroke-width="2.4" stroke-linecap="round"/>
      `;
      break;

    case "koding_teknologi":
      artwork = `
        <rect x="42" y="30" width="64" height="52" rx="12" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.8"/>
        <line x1="74" y1="18" x2="74" y2="30" stroke="${strokeMain}" stroke-width="2"/>
        <circle cx="74" cy="16" r="4" fill="${accentGold}"/>
        <circle cx="60" cy="52" r="5" fill="#0F172A"/>
        <circle cx="88" cy="52" r="5" fill="#0F172A"/>
        <path d="M62 68 Q74 75 86 68" fill="none" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/>
        <rect x="128" y="28" width="68" height="20" rx="6" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.5"/>
        <rect x="128" y="58" width="68" height="20" rx="6" fill="${accentMint}" stroke="${strokeMain}" stroke-width="1.5"/>
        <line x1="106" y1="56" x2="128" y2="38" stroke="${strokeMain}" stroke-width="1.8"/>
        <line x1="106" y1="56" x2="128" y2="68" stroke="${strokeMain}" stroke-width="1.8"/>
      `;
      break;

    case "paud_bermain":
    default:
      artwork = `
        <circle cx="58" cy="42" r="18" fill="${accentGold}" stroke="${strokeMain}" stroke-width="1.8"/>
        <rect x="102" y="48" width="32" height="32" rx="6" fill="${accentCoral}" stroke="${strokeMain}" stroke-width="1.8"/>
        <rect x="138" y="48" width="32" height="32" rx="6" fill="${accentSky}" stroke="${strokeMain}" stroke-width="1.8"/>
        <rect x="120" y="18" width="32" height="30" rx="6" fill="${accentMint}" stroke="${strokeMain}" stroke-width="1.8"/>
        <circle cx="194" cy="40" r="10" fill="${accentGold}"/>
      `;
      break;
  }

  return `<svg viewBox="0 0 228 104" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="224" height="100" rx="16" fill="${cardFill}" stroke="${cardStroke}" stroke-width="1.5"/>
    ${artwork}
  </svg>`;
}
