import {
  SmartLayoutMode,
  type LKPDDocument,
  type QuestionItem,
} from "../types/lkpd";

export type MateriSectionLayoutVariant =
  | "split_visual_text_5_7"
  | "bento_dual_visual"
  | "editorial_two_column_prose"
  | "classic_vertical_stack";

export interface QuestionGridPlacement {
  colSpanClass: string;
  isHalfWidth: boolean;
  internalSplitVisual: boolean;
}

export interface SmartWorksheetLayoutPlan {
  effectiveMode: SmartLayoutMode;
  tujuanColSpanClass: string;
  petunjukColSpanClass: string;
  materiLayoutVariant: MateriSectionLayoutVariant;
  materiLayoutLabel: string;
  soalLayoutLabel: string;
  questionPlacements: QuestionGridPlacement[];
  compactPairCount: number;
  wideCardCount: number;
}

export const SMART_LAYOUT_OPTIONS: Array<{
  id: SmartLayoutMode;
  label: string;
  shortLabel: string;
  deskripsi: string;
}> = [
  {
    id: SmartLayoutMode.AUTO,
    label: "Smart Otomatis (Adaptif Konten)",
    shortLabel: "Smart Otomatis",
    deskripsi:
      "Menyusun ulang gambar utama, ringkasan teks, dan kartu soal dengan CSS Grid secara otomatis sesuai panjang konten LKPD.",
  },
  {
    id: SmartLayoutMode.SPLIT_MAGAZINE,
    label: "Grid Majalah (Split Gambar & Teks)",
    shortLabel: "Split Majalah",
    deskripsi:
      "Menempatkan gambar utama & ilustrasi soal berdampingan secara horizontal dengan teks agar lebih proporsional.",
  },
  {
    id: SmartLayoutMode.COMPACT_GRID,
    label: "Grid Padat 2 Kolom (Hemat Halaman)",
    shortLabel: "Grid Padat",
    deskripsi:
      "Memaksimalkan susunan 2 kolom CSS Grid untuk daftar soal sehingga LKPD dengan banyak butir soal lebih ringkas.",
  },
  {
    id: SmartLayoutMode.CLASSIC_STACK,
    label: "Alur Vertikal Klasik (1 Kolom)",
    shortLabel: "Vertikal Klasik",
    deskripsi:
      "Menyusun seluruh gambar, materi, dan soal berurutan satu kolom penuh dari atas ke bawah.",
  },
];

function isQuestionNaturallyCompact(
  q: QuestionItem,
  mode: SmartLayoutMode
): boolean {
  // Complex wide widgets always benefit from 12-column width
  if (q.tipe === "eksperimen" || q.tipe === "menjodohkan") {
    return false;
  }

  const narrativeLen = (q.wacanaCerita ?? "").trim().length;
  const stemLen = (q.pertanyaan ?? "").trim().length;
  const optionsChars = (q.opsi ?? []).reduce((sum, o) => sum + o.length, 0);
  const bsCount = (q.pernyataanBenarSalah ?? []).length;

  if (mode === SmartLayoutMode.COMPACT_GRID) {
    if (narrativeLen > 180) return false;
    return stemLen + narrativeLen + optionsChars * 0.4 < 340 && bsCount <= 4;
  }

  // In AUTO or SPLIT_MAGAZINE mode:
  if (q.tipe === "cerita_bergambar" || q.tipe === "studi_kasus") {
    return false;
  }
  if (narrativeLen > 40) {
    return false;
  }

  const totalTextScore = stemLen + optionsChars * 0.45 + bsCount * 28;
  return totalTextScore < 235;
}

export function computeSmartWorksheetLayout(
  doc: LKPDDocument,
  isEditing: boolean
): SmartWorksheetLayoutPlan {
  const mode = doc.smartLayoutMode ?? SmartLayoutMode.AUTO;

  // During inline editing, provide generous full-width controls for effortless typing
  if (isEditing || mode === SmartLayoutMode.CLASSIC_STACK) {
    return {
      effectiveMode: mode,
      tujuanColSpanClass: "md:col-span-6",
      petunjukColSpanClass: "md:col-span-6",
      materiLayoutVariant: "classic_vertical_stack",
      materiLayoutLabel: isEditing
        ? "Mode Edit Leluasa (1 Kolom)"
        : "Alur Vertikal Klasik (1 Kolom)",
      soalLayoutLabel: "Kartu Soal Lebar Penuh (1 Kolom)",
      questionPlacements: doc.daftarSoal.map(() => ({
        colSpanClass: "md:col-span-12",
        isHalfWidth: false,
        internalSplitVisual: false,
      })),
      compactPairCount: 0,
      wideCardCount: doc.daftarSoal.length,
    };
  }

  // 1. Balance Section 02 (Tujuan Pembelajaran vs Petunjuk & Alat)
  const tujuanChars = doc.tujuanPembelajaran.join(" ").length;
  const petunjukChars =
    doc.petunjukBelajar.join(" ").length + doc.alatDanBahan.join(" ").length;

  let tujuanColSpanClass = "md:col-span-6";
  let petunjukColSpanClass = "md:col-span-6";
  if (tujuanChars > petunjukChars * 1.45) {
    tujuanColSpanClass = "md:col-span-7";
    petunjukColSpanClass = "md:col-span-5";
  } else if (petunjukChars > tujuanChars * 1.45) {
    tujuanColSpanClass = "md:col-span-5";
    petunjukColSpanClass = "md:col-span-7";
  }

  // 2. Smart CSS Grid for Section 03 (Gambar Utama, Diagram SVG & Teks Materi)
  const hasMainImg = Boolean(doc.tampilkanGambarUtama && doc.gambarUtamaUrl);
  const hasMainSvg = Boolean(doc.tampilkanDiagramSvg && doc.ilustrasiUtamaSvg);
  const visualCount = (hasMainImg ? 1 : 0) + (hasMainSvg ? 1 : 0);
  const ringkasanChars = doc.ringkasanMateri.trim().length;
  const paragraphs = doc.ringkasanMateri
    .split(/\n\s*\n/)
    .filter((p) => p.trim() !== "");

  let materiLayoutVariant: MateriSectionLayoutVariant = "split_visual_text_5_7";
  let materiLayoutLabel = "Split Gambar & Teks (Grid 5:7)";

  if (mode === SmartLayoutMode.SPLIT_MAGAZINE) {
    if (visualCount >= 2) {
      materiLayoutVariant = "bento_dual_visual";
      materiLayoutLabel = "Grid Bento 2 Visual & Intisari";
    } else if (visualCount === 1) {
      materiLayoutVariant = "split_visual_text_5_7";
      materiLayoutLabel = "Grid Majalah Split (5:7)";
    } else {
      materiLayoutVariant = "editorial_two_column_prose";
      materiLayoutLabel = "Teks Editorial 2 Kolom";
    }
  } else {
    // AUTO & COMPACT_GRID analyze content length dynamically
    if (visualCount >= 2) {
      materiLayoutVariant = "bento_dual_visual";
      materiLayoutLabel = "Grid Bento 2 Visual & Materi";
    } else if (ringkasanChars > 660 && paragraphs.length >= 2) {
      materiLayoutVariant = "editorial_two_column_prose";
      materiLayoutLabel = "Editorial Teks Panjang 2 Kolom";
    } else if (visualCount === 1) {
      materiLayoutVariant = "split_visual_text_5_7";
      materiLayoutLabel = "Split Gambar & Teks (Grid 5:7)";
    } else {
      materiLayoutVariant = "classic_vertical_stack";
      materiLayoutLabel = "Teks Fokus Penuh";
    }
  }

  // 3. Smart CSS Grid for Section 05 (Daftar Soal)
  // Pair consecutive compact questions into 6+6 columns so numbering stays strictly sequential
  // and zero orphan half-empty grid cells ever appear!
  const totalQ = doc.daftarSoal.length;
  const rawCompactFlags = doc.daftarSoal.map((q) =>
    totalQ >= 2 ? isQuestionNaturallyCompact(q, mode) : false
  );

  const placements: QuestionGridPlacement[] = new Array(totalQ);
  let compactPairCount = 0;
  let wideCardCount = 0;

  let i = 0;
  while (i < totalQ) {
    const currentQ = doc.daftarSoal[i];
    const hasVisual = Boolean(
      (currentQ.gambarSoalUrl && currentQ.gambarSoalUrl.trim() !== "") ||
        (currentQ.ilustrasiSoalSvg &&
          currentQ.ilustrasiSoalSvg.trim().startsWith("<svg"))
    );

    if (
      rawCompactFlags[i] &&
      i + 1 < totalQ &&
      rawCompactFlags[i + 1] &&
      mode !== SmartLayoutMode.SPLIT_MAGAZINE
    ) {
      // Pair i and i+1 side-by-side in a balanced 2-column CSS Grid row (6 + 6 = 12)!
      placements[i] = {
        colSpanClass: "md:col-span-6",
        isHalfWidth: true,
        internalSplitVisual: false,
      };
      placements[i + 1] = {
        colSpanClass: "md:col-span-6",
        isHalfWidth: true,
        internalSplitVisual: false,
      };
      compactPairCount += 1;
      i += 2;
    } else if (
      mode === SmartLayoutMode.COMPACT_GRID &&
      rawCompactFlags[i] &&
      i + 1 < totalQ
    ) {
      placements[i] = {
        colSpanClass: "md:col-span-6",
        isHalfWidth: true,
        internalSplitVisual: false,
      };
      placements[i + 1] = {
        colSpanClass: "md:col-span-6",
        isHalfWidth: true,
        internalSplitVisual: false,
      };
      compactPairCount += 1;
      i += 2;
    } else {
      // Full-width 12-column card: if it has an illustration, use horizontal 5:7 CSS Grid inside the card!
      placements[i] = {
        colSpanClass: "md:col-span-12",
        isHalfWidth: false,
        internalSplitVisual: hasVisual,
      };
      wideCardCount += 1;
      i += 1;
    }
  }

  const soalLayoutLabel =
    compactPairCount > 0 && wideCardCount > 0
      ? `Grid Hibrida (${compactPairCount * 2} Soal 2-Kolom + ${wideCardCount} Kartu Lebar)`
      : compactPairCount > 0
      ? `Grid Padat 2 Kolom (${compactPairCount * 2} Butir)`
      : wideCardCount > 0
      ? `Grid Kartu Split Visual-Teks (${wideCardCount} Butir)`
      : "Belum Ada Soal";

  return {
    effectiveMode: mode,
    tujuanColSpanClass,
    petunjukColSpanClass,
    materiLayoutVariant,
    materiLayoutLabel,
    soalLayoutLabel,
    questionPlacements: placements,
    compactPairCount,
    wideCardCount,
  };
}
