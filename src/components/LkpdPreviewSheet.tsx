import React, { useMemo, useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  FlaskConical,
  ImagePlus,
  LayoutGrid,
  Library,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  QUESTION_TYPES_CATALOG,
  QUESTION_TYPE_LABELS,
  VISUAL_MEDIA_LIBRARY,
  getThemeMeta,
} from "../data/curriculumData";
import {
  QuestionType,
  VisualTheme,
  type LKPDDocument,
  type QuestionItem,
} from "../types/lkpd";
import { computeSmartWorksheetLayout } from "../utils/smartLayoutEngine";
import {
  buildTopicHeaderBannerSvg,
  detectTopicDomainProfile,
} from "../utils/topicDesignEngine";
import {
  QuestionVisualShowcase,
  SafeIllustrationImage,
  SvgDiagramBlock,
} from "./VisualIllustration";

interface LkpdPreviewSheetProps {
  doc: LKPDDocument;
  onChangeDoc: (updated: LKPDDocument) => void;
  isEditing: boolean;
  showAnswerKey: boolean;
  sheetRef: React.RefObject<HTMLDivElement | null>;
  onRegenerateMainDiagram: () => void;
  isRegeneratingMainDiagram: boolean;
  regeneratingQuestionId: string | null;
  onRegenerateQuestionDiagram: (questionId: string) => void;
  onOpenBankSoalModal: () => void;
}

export const LkpdPreviewSheet: React.FC<LkpdPreviewSheetProps> = ({
  doc,
  onChangeDoc,
  isEditing,
  showAnswerKey,
  sheetRef,
  onRegenerateMainDiagram,
  isRegeneratingMainDiagram,
  regeneratingQuestionId,
  onRegenerateQuestionDiagram,
  onOpenBankSoalModal,
}) => {
  const mainImageUploadRef = useRef<HTMLInputElement | null>(null);
  const activeThemeMeta = useMemo(
    () => getThemeMeta(doc.temaVisual),
    [doc.temaVisual]
  );
  const style = activeThemeMeta.sheetTokens;
  const isMinimalis =
    doc.temaVisual === VisualTheme.MINIMALIS ||
    doc.temaVisual === VisualTheme.MANGA_TINTAKLASIK;

  // Compute responsive CSS Grid Smart Layout based on content lengths & visuals
  const smartLayout = useMemo(
    () => computeSmartWorksheetLayout(doc, isEditing),
    [doc, isEditing]
  );

  // Detect topic-specific visual profile and custom header vector artwork
  const topicProfile = useMemo(
    () => detectTopicDomainProfile(doc.mapel, doc.materi, doc.fase),
    [doc.mapel, doc.materi, doc.fase]
  );

  const headerMotifSvg = useMemo(
    () => buildTopicHeaderBannerSvg(topicProfile.domainId, doc.temaVisual),
    [topicProfile.domainId, doc.temaVisual]
  );

  const totalSkor = doc.daftarSoal.reduce(
    (acc, q) => acc + (Number(q.skor) || 0),
    0
  );

  const hasMainImg = Boolean(doc.tampilkanGambarUtama && doc.gambarUtamaUrl);
  const hasMainSvg = Boolean(doc.tampilkanDiagramSvg && doc.ilustrasiUtamaSvg);
  const materiParagraphs = useMemo(
    () =>
      doc.ringkasanMateri
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    [doc.ringkasanMateri]
  );

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === "string") {
        onChangeDoc({
          ...doc,
          gambarUtamaUrl: dataUrl,
          tampilkanGambarUtama: true,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleQuestionImageUpload = (questionId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === "string") {
        onChangeDoc({
          ...doc,
          daftarSoal: doc.daftarSoal.map((q) =>
            q.id === questionId ? { ...q, gambarSoalUrl: dataUrl } : q
          ),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const updateQuestion = (qId: string, patch: Partial<QuestionItem>) => {
    onChangeDoc({
      ...doc,
      daftarSoal: doc.daftarSoal.map((q) =>
        q.id === qId ? { ...q, ...patch } : q
      ),
    });
  };

  const moveQuestion = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= doc.daftarSoal.length) return;
    const next = [...doc.daftarSoal];
    const [removed] = next.splice(index, 1);
    next.splice(target, 0, removed);
    onChangeDoc({ ...doc, daftarSoal: next });
  };

  const deleteQuestion = (qId: string) => {
    onChangeDoc({
      ...doc,
      daftarSoal: doc.daftarSoal.filter((q) => q.id !== qId),
    });
  };

  const addBlankQuestion = (
    chosenType: QuestionType = QuestionType.CERITA_BERGAMBAR
  ) => {
    const newQ: QuestionItem = {
      id: `manual_q_${Date.now()}`,
      pertanyaan:
        chosenType === QuestionType.EKSPERIMEN
          ? "Lakukan percobaan sederhana berikut lalu tuliskan kesimpulan hasil pengamatanmu!"
          : chosenType === QuestionType.BENAR_SALAH
          ? "Berilah tanda centang (✓) pada kolom Benar atau Salah untuk setiap pernyataan berikut!"
          : "Tuliskan pertanyaan atau aktivitas untuk siswa di sini...",
      tipe: chosenType,
      levelKognitif: "L2 Penerapan",
      ilustrasiSoalSvg: "",
      wacanaCerita:
        chosenType === QuestionType.CERITA_BERGAMBAR ||
        chosenType === QuestionType.STUDI_KASUS
          ? "Tuliskan paragraf cerita bergambar atau wacana studi kasus kontekstual di sini..."
          : "",
      opsi:
        chosenType === QuestionType.PILIHAN_GANDA ||
        chosenType === QuestionType.PILIHAN_GANDA_KOMPLEKS
          ? [
              "Pernyataan / Pilihan A",
              "Pernyataan / Pilihan B",
              "Pernyataan / Pilihan C",
              "Pernyataan / Pilihan D",
            ]
          : [],
      pernyataanBenarSalah:
        chosenType === QuestionType.BENAR_SALAH
          ? [
              "Pernyataan pertama untuk dianalisis siswa.",
              "Pernyataan kedua untuk dianalisis siswa.",
              "Pernyataan ketiga untuk dianalisis siswa.",
            ]
          : [],
      alatEksperimen:
        chosenType === QuestionType.EKSPERIMEN
          ? ["Alat/bahan 1", "Alat/bahan 2", "Alat/bahan 3"]
          : [],
      langkahEksperimen:
        chosenType === QuestionType.EKSPERIMEN ||
        chosenType === QuestionType.URUTKAN_LANGKAH
          ? ["Langkah kegiatan 1", "Langkah kegiatan 2", "Langkah kegiatan 3"]
          : [],
      pasanganKiri:
        chosenType === QuestionType.MENJODOHKAN
          ? ["Konsep 1", "Konsep 2", "Konsep 3"]
          : [],
      pasanganKanan:
        chosenType === QuestionType.MENJODOHKAN
          ? ["Pasangan A", "Pasangan B", "Pasangan C"]
          : [],
      kunciJawaban: "Tuliskan kunci jawaban di sini",
      pembahasan: "Tuliskan pedoman penskoran atau pembahasan singkat",
      skor: 20,
    };
    onChangeDoc({ ...doc, daftarSoal: [...doc.daftarSoal, newQ] });
  };

  // Reusable helper blocks for Section 03 Smart CSS Grid variants
  const renderMainPhotoBlock = (extraHeightClass = "max-h-[290px]") => {
    if (!hasMainImg) return null;
    const isRealistic = activeThemeMeta.kategoriGaya === "realistik";
    return (
      <div
        className={`overflow-hidden rounded-xl border ${
          isRealistic ? "border-slate-300 shadow-xs" : "border-white shadow-2xs"
        } bg-white flex flex-col justify-between h-full`}
      >
        <SafeIllustrationImage
          src={doc.gambarUtamaUrl}
          alt={doc.materi}
          fallbackTitle={doc.materi}
          className={`w-full ${extraHeightClass} object-cover ${
            isMinimalis ? "grayscale contrast-125" : ""
          }`}
        />
        {isRealistic && (
          <div className="px-3 py-1.5 bg-slate-900 text-white text-[11px] flex items-center justify-between gap-2">
            <span className="font-medium truncate">
              Visual Referensi Nyata: {doc.materi}
            </span>
            <span className="text-sky-300 shrink-0">
              {activeThemeMeta.gayaGambarLabel}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderPoinPentingCallout = () => {
    if (doc.poinPenting.length === 0) return null;
    return (
      <div className={`rounded-xl border ${style.calloutSurface} p-3.5 h-full`}>
        <p className="text-xs font-bold text-slate-900 mb-1.5">
          Intisari Konsep Penting ({doc.materi}):
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs sm:text-[13px] leading-relaxed text-slate-700">
          {doc.poinPenting.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      ref={sheetRef}
      className={`w-full max-w-[840px] mx-auto bg-white rounded-2xl shadow-sm p-5 sm:p-8 lg:p-10 space-y-6 text-slate-900 ${style.sheetOuterBorder}`}
    >
      {/* SECTION 1: KOP SEKOLAH, ORNAMEN VISUAL MATERI, JUDUL LKPD, & IDENTITAS SISWA */}
      <div className="lkpd-pdf-section space-y-4">
        <div className={`rounded-2xl p-5 sm:p-6 ${style.headerBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs opacity-95 mb-3 tabular-nums">
            <span className="font-semibold">
              {doc.namaSekolah || "Satuan Pendidikan Kurikulum Merdeka"}
            </span>
            <span>
              {doc.fase} · {doc.kelas} · {doc.semester} · {doc.alokasiWaktu}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8 space-y-1.5">
              {isEditing ? (
                <div className="space-y-2" data-pdf-ignore="true">
                  <input
                    type="text"
                    value={doc.judul}
                    onChange={(e) =>
                      onChangeDoc({ ...doc, judul: e.target.value })
                    }
                    className={`w-full rounded-lg px-3 py-1.5 font-display text-xl sm:text-2xl font-bold border ${
                      isMinimalis
                        ? "bg-slate-50 text-slate-900 border-slate-300"
                        : "bg-white/15 text-white border-white/30 placeholder:text-white/60"
                    }`}
                  />
                  <input
                    type="text"
                    value={doc.subjudul}
                    onChange={(e) =>
                      onChangeDoc({ ...doc, subjudul: e.target.value })
                    }
                    className={`w-full rounded-lg px-3 py-1 text-sm border ${
                      isMinimalis
                        ? "bg-slate-50 text-slate-700 border-slate-300"
                        : "bg-white/10 text-white/95 border-white/25"
                    }`}
                  />
                </div>
              ) : (
                <>
                  <h1 className="font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight">
                    {doc.judul}
                  </h1>
                  {doc.subjudul && (
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isMinimalis ? "text-slate-600" : "text-white/90"
                      }`}
                    >
                      {doc.subjudul}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Topic-Matched Vector Artwork Emblem */}
            <div className="sm:col-span-4 flex justify-end">
              <div
                className="w-full max-w-[215px] lkpd-svg-container"
                dangerouslySetInnerHTML={{ __html: headerMotifSvg }}
              />
            </div>
          </div>

          <div
            className={`mt-3.5 pt-3 border-t text-xs flex flex-wrap items-center justify-between gap-2 ${
              isMinimalis
                ? "border-slate-200 text-slate-600"
                : "border-white/25 text-white/95"
            }`}
          >
            <span>
              Mata Pelajaran:{" "}
              <strong className="font-semibold">{doc.mapel}</strong> · Materi:{" "}
              <strong className="font-semibold">{doc.materi}</strong>
            </span>
            <span>
              {topicProfile.namaDomain} · Tema #{String(activeThemeMeta.nomorUrut).padStart(2, "0")}{" "}
              {activeThemeMeta.nama} ({activeThemeMeta.gayaGambarLabel})
            </span>
          </div>
          <div
            className={`mt-1 text-xs flex flex-wrap items-center justify-between gap-2 ${
              isMinimalis ? "text-slate-500" : "text-white/85"
            }`}
          >
            <span>Model: {doc.modelPembelajaran.split("(")[0].trim()}</span>
            {doc.namaGuru && <span>Guru Penyusun: {doc.namaGuru}</span>}
          </div>
        </div>

        {/* Kolom Identitas Peserta Didik */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border ${style.headerBorder} p-4 bg-white text-xs sm:text-sm`}
        >
          <div className="flex items-center gap-2 border-b border-dashed border-slate-300 pb-2">
            <span className="font-semibold text-slate-700 shrink-0 w-32">
              Nama Siswa / Kel.:
            </span>
            <span className="text-slate-400 select-none truncate">
              ............................................................
            </span>
          </div>
          <div className="flex items-center gap-2 border-b border-dashed border-slate-300 pb-2">
            <span className="font-semibold text-slate-700 shrink-0 w-28">
              Kelas / Absen:
            </span>
            <span className="text-slate-400 select-none truncate">
              ............................................................
            </span>
          </div>
          <div className="flex items-center gap-2 border-b sm:border-b-0 border-dashed border-slate-300 pb-2 sm:pb-0">
            <span className="font-semibold text-slate-700 shrink-0 w-32">
              Hari / Tanggal:
            </span>
            <span className="text-slate-400 select-none truncate">
              ............................................................
            </span>
          </div>
          <div className="flex items-center gap-2 tabular-nums">
            <span className="font-semibold text-slate-700 shrink-0 w-28">
              Nilai / Paraf:
            </span>
            <span className="text-slate-400 select-none truncate">
              .................. (Skor Maks: {totalSkor})
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: TUJUAN PEMBELAJARAN & PETUNJUK PENGERJAAN (SMART CSS GRID PROPORTIONAL COLUMNS) */}
      <div className="lkpd-pdf-section grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        <div
          className={`${smartLayout.tujuanColSpanClass} rounded-xl border ${style.headerBorder} ${style.sectionSurface} p-4`}
        >
          <h2
            className={`font-display text-sm font-bold ${style.accentText} mb-2`}
          >
            01. Tujuan Pembelajaran
          </h2>
          {isEditing ? (
            <textarea
              data-pdf-ignore="true"
              rows={4}
              value={doc.tujuanPembelajaran.join("\n")}
              onChange={(e) =>
                onChangeDoc({
                  ...doc,
                  tujuanPembelajaran: e.target.value
                    .split("\n")
                    .filter((line) => line.trim() !== ""),
                })
              }
              className="w-full text-xs rounded-lg border border-slate-300 bg-white p-2.5 text-slate-800"
              placeholder="Satu tujuan pembelajaran per baris"
            />
          ) : (
            <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-700">
              {doc.tujuanPembelajaran.map((tp, idx) => (
                <li key={idx}>{tp}</li>
              ))}
            </ol>
          )}
        </div>

        <div
          className={`${smartLayout.petunjukColSpanClass} rounded-xl border ${style.headerBorder} bg-white p-4`}
        >
          <h2
            className={`font-display text-sm font-bold ${style.accentText} mb-2`}
          >
            02. Petunjuk Belajar & Alat Bahan
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-xs sm:text-[13px] leading-relaxed text-slate-700">
            {doc.petunjukBelajar.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ol>
          {doc.alatDanBahan.length > 0 && (
            <p className="mt-2.5 pt-2 border-t border-slate-200 text-xs text-slate-600">
              <strong className="font-semibold text-slate-800">
                Alat & Sumber:
              </strong>{" "}
              {doc.alatDanBahan.join(" · ")}
            </p>
          )}
        </div>
      </div>

      {/* SECTION 3: STIMULUS VISUAL & MATERI INTI (SMART LAYOUT CSS GRID ENGINE) */}
      <div
        className={`lkpd-pdf-section rounded-xl border ${style.headerBorder} ${style.sectionSurface} p-4 sm:p-5 space-y-4`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2
              className={`font-display text-base font-bold ${style.accentText}`}
            >
              03. Eksplorasi Visual & Materi Inti: {doc.materi}
            </h2>
            <p className="text-xs text-slate-600">
              {topicProfile.deskripsiVisualMateri}
            </p>
          </div>

          {!isEditing && (
            <span
              data-pdf-ignore="true"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>{smartLayout.materiLayoutLabel}</span>
            </span>
          )}

          {isEditing && (
            <div
              data-pdf-ignore="true"
              className="flex flex-wrap items-center gap-2"
            >
              <input
                ref={mainImageUploadRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => mainImageUploadRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                <span>Unggah Gambar Sendiri</span>
              </button>
              <button
                type="button"
                onClick={onRegenerateMainDiagram}
                disabled={isRegeneratingMainDiagram}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    isRegeneratingMainDiagram ? "animate-spin" : ""
                  }`}
                />
                <span>
                  {isRegeneratingMainDiagram
                    ? "Menggambar..."
                    : "Gambar Ulang Diagram Materi (AI)"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Topic Visual Asset Selector in Edit Mode (18 Assets incl. Realistic Photos) */}
        {isEditing && (
          <div
            data-pdf-ignore="true"
            className="rounded-xl border border-indigo-200 bg-white p-3 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-800">
                Koleksi Gambar & Foto Realistik Materi (18 Visual Siap Pakai):
              </span>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-1.5 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doc.tampilkanGambarUtama}
                    onChange={(e) =>
                      onChangeDoc({
                        ...doc,
                        tampilkanGambarUtama: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-indigo-600"
                  />
                  <span>Tampilkan Gambar Utama</span>
                </label>
                <label className="inline-flex items-center gap-1.5 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doc.tampilkanDiagramSvg}
                    onChange={(e) =>
                      onChangeDoc({
                        ...doc,
                        tampilkanDiagramSvg: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-indigo-600"
                  />
                  <span>Tampilkan Skema Vektor</span>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {VISUAL_MEDIA_LIBRARY.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() =>
                    onChangeDoc({
                      ...doc,
                      gambarUtamaUrl: asset.src,
                      tampilkanGambarUtama: true,
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                    doc.gambarUtamaUrl === asset.src
                      ? "bg-indigo-600 text-white border-indigo-600 font-semibold"
                      : asset.isRealisticPhoto
                      ? "bg-emerald-50/80 text-emerald-950 border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {asset.isRealisticPhoto ? `Foto: ${asset.kategori}` : asset.kategori}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SMART CSS GRID VARIANT 1: SPLIT VISUAL (5 COLS) & MATERI TEXT (7 COLS) */}
        {smartLayout.materiLayoutVariant === "split_visual_text_5_7" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            <div className="md:col-span-5 flex flex-col justify-between gap-2.5">
              {hasMainImg
                ? renderMainPhotoBlock("h-full min-h-[220px] max-h-[340px]")
                : hasMainSvg && (
                    <SvgDiagramBlock
                      svgMarkup={doc.ilustrasiUtamaSvg}
                      temaVisual={doc.temaVisual}
                    />
                  )}
              {doc.keteranganIlustrasi && (
                <p className="text-xs text-slate-600 italic leading-snug">
                  {doc.keteranganIlustrasi}
                </p>
              )}
            </div>

            <div className="md:col-span-7 rounded-xl bg-white border border-slate-200/80 p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5 text-sm leading-relaxed text-slate-800">
                {materiParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {renderPoinPentingCallout()}
            </div>
          </div>
        )}

        {/* SMART CSS GRID VARIANT 2: BENTO DUAL VISUAL (6+6 VISUALS, 7+5 PROSE & CALLOUT) */}
        {smartLayout.materiLayoutVariant === "bento_dual_visual" && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              <div className="md:col-span-6">
                {renderMainPhotoBlock("h-full min-h-[200px] max-h-[260px]")}
              </div>
              <div className="md:col-span-6 flex flex-col justify-center">
                <SvgDiagramBlock
                  svgMarkup={doc.ilustrasiUtamaSvg}
                  temaVisual={doc.temaVisual}
                />
              </div>
            </div>

            {doc.keteranganIlustrasi && (
              <p className="text-xs text-slate-600 text-center italic">
                {doc.keteranganIlustrasi}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              <div
                className={`${
                  doc.poinPenting.length > 0 ? "md:col-span-7" : "md:col-span-12"
                } rounded-xl bg-white border border-slate-200/80 p-4 space-y-2.5 text-sm leading-relaxed text-slate-800`}
              >
                {materiParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {doc.poinPenting.length > 0 && (
                <div className="md:col-span-5">{renderPoinPentingCallout()}</div>
              )}
            </div>
          </div>
        )}

        {/* SMART CSS GRID VARIANT 3: EDITORIAL TWO-COLUMN PROSE FOR LONG CONTENT */}
        {smartLayout.materiLayoutVariant === "editorial_two_column_prose" && (
          <div className="space-y-4">
            {(hasMainImg || hasMainSvg) && (
              <div className="space-y-2">
                {hasMainImg && renderMainPhotoBlock("max-h-[270px]")}
                {hasMainSvg && (
                  <SvgDiagramBlock
                    svgMarkup={doc.ilustrasiUtamaSvg}
                    temaVisual={doc.temaVisual}
                  />
                )}
                {doc.keteranganIlustrasi && (
                  <p className="text-xs text-slate-600 text-center italic">
                    {doc.keteranganIlustrasi}
                  </p>
                )}
              </div>
            )}

            <div className="rounded-xl bg-white border border-slate-200/80 p-4 space-y-3.5">
              <div
                className={`grid grid-cols-1 ${
                  materiParagraphs.length >= 2 ? "md:grid-cols-2" : "md:grid-cols-1"
                } gap-4 text-sm leading-relaxed text-slate-800`}
              >
                {materiParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {renderPoinPentingCallout()}
            </div>
          </div>
        )}

        {/* SMART CSS GRID VARIANT 4: CLASSIC VERTICAL STACK & INLINE EDIT MODE */}
        {smartLayout.materiLayoutVariant === "classic_vertical_stack" && (
          <div className="space-y-4">
            {hasMainImg && renderMainPhotoBlock("max-h-[290px]")}

            {hasMainSvg && (
              <SvgDiagramBlock
                svgMarkup={doc.ilustrasiUtamaSvg}
                temaVisual={doc.temaVisual}
              />
            )}

            {doc.keteranganIlustrasi && (
              <p className="text-xs text-slate-600 text-center italic">
                {doc.keteranganIlustrasi}
              </p>
            )}

            <div className="rounded-xl bg-white border border-slate-200/80 p-4 space-y-3">
              {isEditing ? (
                <textarea
                  data-pdf-ignore="true"
                  rows={5}
                  value={doc.ringkasanMateri}
                  onChange={(e) =>
                    onChangeDoc({ ...doc, ringkasanMateri: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm leading-relaxed text-slate-800"
                />
              ) : (
                <div className="space-y-2.5 text-sm leading-relaxed text-slate-800">
                  {materiParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              )}

              {renderPoinPentingCallout()}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: AKTIVITAS EKSPLORASI / TABEL PENGAMATAN SISWA */}
      {doc.aktivitasEksplorasi &&
        doc.aktivitasEksplorasi.kolomTabel.length > 0 && (
          <div
            className={`lkpd-pdf-section rounded-xl border ${style.headerBorder} bg-white p-4 sm:p-5 space-y-3`}
          >
            <h2
              className={`font-display text-base font-bold ${style.accentText}`}
            >
              04.{" "}
              {doc.aktivitasEksplorasi.judulAktivitas ||
                "Lembar Aktivitas Eksplorasi"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {doc.aktivitasEksplorasi.instruksi}
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-300">
              <table className="w-full border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className={style.tableHeaderBg}>
                    {doc.aktivitasEksplorasi.kolomTabel.map((col, idx) => (
                      <th
                        key={idx}
                        className="border-b border-r last:border-r-0 border-slate-300 px-3 py-2.5 text-left font-semibold"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {doc.aktivitasEksplorasi.barisContoh.map((row, rIdx) => (
                    <tr key={rIdx} className="bg-white">
                      {doc.aktivitasEksplorasi.kolomTabel.map((_, cIdx) => {
                        const cellText = row[cIdx] ?? "";
                        return (
                          <td
                            key={cIdx}
                            className="border-b last:border-b-0 border-r last:border-r-0 border-slate-300 px-3 py-3.5 align-top text-slate-700 min-w-[110px]"
                          >
                            {cellText || (
                              <span className="text-slate-300 select-none">
                                .................................
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* SECTION 5: LATIHAN SOAL & AKTIVITAS TERPADU BERGAMBAR (SMART CSS GRID) */}
      <div className="space-y-4">
        <div className="lkpd-pdf-section flex flex-wrap items-center justify-between gap-2 pt-1">
          <div>
            <h2
              className={`font-display text-base font-bold ${style.accentText}`}
            >
              05. Aktivitas & Soal Bergambar ({activeThemeMeta.nama})
            </h2>
            <p className="text-xs text-slate-500">
              Amati setiap gambar referensi, panel cerita, atau skema berwarna di bawah ini sebelum menuliskan jawabanmu!
            </p>
          </div>

          {!isEditing && doc.daftarSoal.length > 0 && (
            <span
              data-pdf-ignore="true"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>{smartLayout.soalLayoutLabel}</span>
            </span>
          )}

          {isEditing && (
            <div
              data-pdf-ignore="true"
              className="flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                onClick={onOpenBankSoalModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 cursor-pointer"
              >
                <Library className="w-3.5 h-3.5" />
                <span>Ambil dari Bank Soal</span>
              </button>
              <button
                type="button"
                onClick={() => addBlankQuestion(QuestionType.CERITA_BERGAMBAR)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-white hover:bg-amber-600 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Cerita Bergambar</span>
              </button>
              <button
                type="button"
                onClick={() => addBlankQuestion(QuestionType.EKSPERIMEN)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>+ Eksperimen</span>
              </button>
              <button
                type="button"
                onClick={() => addBlankQuestion(QuestionType.PILIHAN_GANDA)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Soal Baru</span>
              </button>
            </div>
          )}
        </div>

        {/* RESPONSIVE 12-COLUMN CSS GRID FOR QUESTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {doc.daftarSoal.map((soal, index) => {
            const isRegenThis = regeneratingQuestionId === soal.id;
            const tipeLabel =
              QUESTION_TYPE_LABELS[soal.tipe] ?? "Uraian Penalaran";
            const placement = smartLayout.questionPlacements[index] ?? {
              colSpanClass: "md:col-span-12",
              isHalfWidth: false,
              internalSplitVisual: false,
            };

            const questionContentBody = (
              <div className="space-y-3">
                {/* Wacana Cerita Bergambar atau Studi Kasus */}
                {(soal.tipe === "cerita_bergambar" ||
                  soal.tipe === "studi_kasus" ||
                  Boolean(soal.wacanaCerita)) &&
                  (isEditing ? (
                    <div data-pdf-ignore="true">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Teks Narasi Cerita Bergambar / Wacana Studi Kasus:
                      </label>
                      <textarea
                        rows={3}
                        value={soal.wacanaCerita ?? ""}
                        onChange={(e) =>
                          updateQuestion(soal.id, {
                            wacanaCerita: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-amber-300 bg-amber-50/40 p-2.5 text-xs sm:text-sm text-slate-800"
                      />
                    </div>
                  ) : soal.wacanaCerita ? (
                    <div
                      className={`rounded-xl border ${style.calloutSurface} p-3.5 text-xs sm:text-sm leading-relaxed text-slate-800`}
                    >
                      <p className="font-semibold text-slate-900 mb-1">
                        {soal.tipe === "cerita_bergambar"
                          ? "Simak Cerita Bergambar Berikut:"
                          : "Wacana Studi Kasus:"}
                      </p>
                      <p>{soal.wacanaCerita}</p>
                    </div>
                  ) : null)}

                {/* Kotak Alat & Langkah khusus Tipe EKSPERIMEN */}
                {soal.tipe === "eksperimen" && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 space-y-2.5 text-xs sm:text-[13px]">
                    <p className="font-bold text-emerald-950">
                      Panduan Kegiatan Eksperimen / Praktikum Siswa
                    </p>
                    {(soal.alatEksperimen?.length ?? 0) > 0 && (
                      <div>
                        <span className="font-semibold text-emerald-900">
                          Alat & Bahan:{" "}
                        </span>
                        <span className="text-slate-700">
                          {(soal.alatEksperimen ?? []).join(" · ")}
                        </span>
                      </div>
                    )}
                    {(soal.langkahEksperimen?.length ?? 0) > 0 && (
                      <div>
                        <p className="font-semibold text-emerald-900 mb-1">
                          Langkah Percobaan:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-slate-800">
                          {(soal.langkahEksperimen ?? []).map((step, sIdx) => (
                            <li key={sIdx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}

                {/* Teks Pertanyaan Utama */}
                {isEditing ? (
                  <div data-pdf-ignore="true" className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={soal.tipe}
                        onChange={(e) => {
                          const nextType = e.target.value as QuestionItem["tipe"];
                          updateQuestion(soal.id, {
                            tipe: nextType,
                            opsi:
                              (nextType === "pilihan_ganda" ||
                                nextType === "pilihan_ganda_kompleks") &&
                              soal.opsi.length === 0
                                ? [
                                    "Pilihan A",
                                    "Pilihan B",
                                    "Pilihan C",
                                    "Pilihan D",
                                  ]
                                : soal.opsi,
                            pernyataanBenarSalah:
                              nextType === "benar_salah" &&
                              (!soal.pernyataanBenarSalah ||
                                soal.pernyataanBenarSalah.length === 0)
                                ? [
                                    "Pernyataan 1...",
                                    "Pernyataan 2...",
                                    "Pernyataan 3...",
                                  ]
                                : soal.pernyataanBenarSalah,
                          });
                        }}
                        className="rounded-md border border-slate-300 px-2.5 py-1 text-xs bg-white"
                      >
                        {QUESTION_TYPES_CATALOG.map((qt) => (
                          <option key={qt.id} value={qt.id}>
                            {qt.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min={5}
                        max={100}
                        value={soal.skor}
                        onChange={(e) =>
                          updateQuestion(soal.id, {
                            skor: Number(e.target.value) || 10,
                          })
                        }
                        className="w-24 rounded-md border border-slate-300 px-2.5 py-1 text-xs bg-white tabular-nums"
                        aria-label="Skor Soal"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={soal.pertanyaan}
                      onChange={(e) =>
                        updateQuestion(soal.id, { pertanyaan: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-900"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {soal.pertanyaan}
                  </p>
                )}

                {/* RENDER 1: PILIHAN GANDA */}
                {soal.tipe === "pilihan_ganda" && (
                  <div
                    className={`grid grid-cols-1 ${
                      placement.isHalfWidth ? "" : "sm:grid-cols-2"
                    } gap-2 pt-1`}
                  >
                    {(soal.opsi.length > 0 ? soal.opsi : ["", "", "", ""]).map(
                      (opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        return (
                          <div
                            key={optIdx}
                            className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800"
                          >
                            <span
                              className={`font-mono font-bold ${style.accentText} shrink-0`}
                            >
                              {letter}.
                            </span>
                            {isEditing ? (
                              <input
                                data-pdf-ignore="true"
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const nextOpsi = [...soal.opsi];
                                  nextOpsi[optIdx] = e.target.value;
                                  updateQuestion(soal.id, { opsi: nextOpsi });
                                }}
                                className="w-full border-b border-slate-300 focus:outline-none text-xs sm:text-sm"
                              />
                            ) : (
                              <span>{opt}</span>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {/* RENDER 2: PILIHAN GANDA KOMPLEKS (AKM) */}
                {soal.tipe === "pilihan_ganda_kompleks" && (
                  <div className="space-y-2 pt-1">
                    <p
                      className={`text-[11px] font-semibold ${style.accentText}`}
                    >
                      Petunjuk: Berilah tanda centang (✓) pada kotak di depan pernyataan yang benar (jawaban benar lebih dari satu)!
                    </p>
                    <div className="space-y-1.5">
                      {(soal.opsi.length > 0 ? soal.opsi : ["", "", "", ""]).map(
                        (opt, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800"
                          >
                            <span className="inline-block w-4 h-4 mt-0.5 rounded border border-slate-400 bg-slate-50 shrink-0" />
                            <span>{opt}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* RENDER 3: BENAR ATAU SALAH */}
                {soal.tipe === "benar_salah" && (
                  <div className="overflow-x-auto rounded-lg border border-slate-300 pt-0.5">
                    <table className="w-full border-collapse text-xs sm:text-[13px]">
                      <thead>
                        <tr className={style.tableHeaderBg}>
                          <th className="border-b border-r border-slate-300 px-3 py-2 text-left font-semibold">
                            Pernyataan Analisis
                          </th>
                          <th className="border-b border-r border-slate-300 px-2 py-2 text-center font-semibold w-16">
                            Benar
                          </th>
                          <th className="border-b border-slate-300 px-2 py-2 text-center font-semibold w-16">
                            Salah
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(soal.pernyataanBenarSalah &&
                        soal.pernyataanBenarSalah.length > 0
                          ? soal.pernyataanBenarSalah
                          : soal.opsi.length > 0
                          ? soal.opsi
                          : ["Pernyataan 1", "Pernyataan 2", "Pernyataan 3"]
                        ).map((stmt, sIdx) => (
                          <tr key={sIdx} className="bg-white">
                            <td className="border-b last:border-b-0 border-r border-slate-300 px-3 py-2.5 text-slate-800">
                              {sIdx + 1}. {stmt}
                            </td>
                            <td className="border-b last:border-b-0 border-r border-slate-300 px-2 py-2.5 text-center">
                              <span className="inline-block w-4 h-4 rounded border border-slate-400" />
                            </td>
                            <td className="border-b last:border-b-0 border-slate-300 px-2 py-2.5 text-center">
                              <span className="inline-block w-4 h-4 rounded border border-slate-400" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* RENDER 4: URUTKAN LANGKAH / KRONOLOGI */}
                {soal.tipe === "urutkan_langkah" && (
                  <div className="space-y-2 pt-1">
                    {(soal.langkahEksperimen && soal.langkahEksperimen.length > 0
                      ? soal.langkahEksperimen
                      : soal.opsi
                    ).map((stepText, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800"
                      >
                        <span className="inline-flex items-center justify-center w-9 h-7 rounded border border-slate-400 bg-slate-50 font-mono text-xs text-slate-400 shrink-0">
                          ...
                        </span>
                        <span>{stepText}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* RENDER 5: MENJODOHKAN */}
                {soal.tipe === "menjodohkan" && (
                  <div className="grid grid-cols-2 gap-4 pt-1 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-700 text-xs">
                        Pernyataan (Lajur A)
                      </p>
                      {soal.pasanganKiri.map((kiri, kIdx) => (
                        <div
                          key={kIdx}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 flex items-center justify-between gap-2"
                        >
                          <span>
                            {kIdx + 1}. {kiri}
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full border border-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-700 text-xs">
                        Pasangan (Lajur B)
                      </p>
                      {soal.pasanganKanan.map((kanan, rIdx) => (
                        <div
                          key={rIdx}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 flex items-center gap-2"
                        >
                          <span className="w-2.5 h-2.5 rounded-full border border-slate-500 shrink-0" />
                          <span>
                            {String.fromCharCode(65 + rIdx)}. {kanan}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RENDER 6: ISIAN SINGKAT */}
                {soal.tipe === "isian_singkat" && (
                  <div className="pt-2">
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-500 truncate">
                      Jawaban Singkat: ........................................................................................
                    </div>
                  </div>
                )}

                {/* RENDER 7: EKSPERIMEN OBSERVATION & CONCLUSION BOX */}
                {soal.tipe === "eksperimen" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-3 h-28 flex flex-col justify-between">
                      <span className="text-[11px] font-semibold text-slate-600">
                        Kotak Sketsa / Catatan Hasil Pengamatan:
                      </span>
                      <span className="text-[11px] text-slate-300">
                        (Gambar atau catat perubahan yang diamati di sini)
                      </span>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-3">
                      <span className="block text-[11px] font-semibold text-slate-700">
                        Kesimpulan Ilmiah Kelompok:
                      </span>
                      <div className="border-b border-dashed border-slate-300 h-3.5" />
                      <div className="border-b border-dashed border-slate-300 h-3.5" />
                      <div className="border-b border-dashed border-slate-300 h-3.5" />
                    </div>
                  </div>
                )}

                {/* RENDER 8: URAIAN / CERITA BERGAMBAR / STUDI KASUS ANSWER LINES */}
                {(soal.tipe === "uraian" ||
                  soal.tipe === "cerita_bergambar" ||
                  soal.tipe === "studi_kasus") && (
                  <div className="pt-1">
                    <div className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-3">
                      <span className="block text-[11px] font-semibold text-slate-600">
                        Lembar Jawaban Siswa:
                      </span>
                      <div className="border-b border-dashed border-slate-300 h-4" />
                      <div className="border-b border-dashed border-slate-300 h-4" />
                      <div className="border-b border-dashed border-slate-300 h-4" />
                    </div>
                  </div>
                )}
              </div>
            );

            return (
              <div
                key={soal.id || index}
                className={`lkpd-pdf-section ${placement.colSpanClass} rounded-xl border ${style.headerBorder} ${style.questionCardBg} p-4 sm:p-5 flex flex-col justify-between space-y-3.5`}
              >
                <div className="space-y-3.5">
                  {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-200/70 pb-2 tabular-nums">
                    <div className="flex flex-wrap items-center gap-1.5 font-medium text-slate-700">
                      <span className={`font-mono font-bold ${style.accentText}`}>
                        Butir {String(index + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-900">
                        {tipeLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{soal.levelKognitif}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">Skor {soal.skor}</span>
                    </div>

                    {isEditing && (
                      <div
                        data-pdf-ignore="true"
                        className="flex flex-wrap items-center gap-1"
                      >
                        <select
                          value={
                            VISUAL_MEDIA_LIBRARY.some(
                              (v) => v.src === soal.gambarSoalUrl
                            )
                              ? soal.gambarSoalUrl
                              : ""
                          }
                          onChange={(e) =>
                            updateQuestion(soal.id, {
                              gambarSoalUrl: e.target.value,
                            })
                          }
                          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700"
                          aria-label="Pilih ilustrasi materi untuk soal"
                        >
                          <option value="">Pilih Gambar / Foto...</option>
                          {VISUAL_MEDIA_LIBRARY.map((v) => (
                            <option key={v.id} value={v.src}>
                              {v.isRealisticPhoto ? `Foto: ${v.kategori}` : v.kategori}
                            </option>
                          ))}
                        </select>

                        <label className="inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 cursor-pointer">
                          <ImagePlus className="w-3.5 h-3.5" />
                          <span>Unggah</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleQuestionImageUpload(soal.id, f);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => onRegenerateQuestionDiagram(soal.id)}
                          disabled={isRegenThis}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 cursor-pointer"
                        >
                          <RefreshCw
                            className={`w-3.5 h-3.5 ${
                              isRegenThis ? "animate-spin" : ""
                            }`}
                          />
                          <span>
                            {isRegenThis ? "Menggambar..." : "Gambar AI Sesuai Tema"}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveQuestion(index, -1)}
                          disabled={index === 0}
                          className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-35 cursor-pointer"
                          aria-label="Geser ke atas"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveQuestion(index, 1)}
                          disabled={index === doc.daftarSoal.length - 1}
                          className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-35 cursor-pointer"
                          aria-label="Geser ke bawah"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteQuestion(soal.id)}
                          className="p-1 rounded border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 cursor-pointer"
                          aria-label="Hapus butir soal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* SMART CSS GRID INTERNAL SPLIT (5 COLS VISUAL + 7 COLS QUESTION) OR STACKED */}
                  {placement.internalSplitVisual && !isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-5">
                        <QuestionVisualShowcase
                          gambarSoalUrl={soal.gambarSoalUrl}
                          ilustrasiSoalSvg={soal.ilustrasiSoalSvg}
                          questionType={soal.tipe}
                          questionIndex={index}
                          temaVisual={doc.temaVisual}
                          themeLabel={activeThemeMeta.nama}
                          altTitle={soal.materi || doc.materi}
                        />
                      </div>
                      <div className="md:col-span-7">{questionContentBody}</div>
                    </div>
                  ) : (
                    <>
                      <QuestionVisualShowcase
                        gambarSoalUrl={soal.gambarSoalUrl}
                        ilustrasiSoalSvg={soal.ilustrasiSoalSvg}
                        questionType={soal.tipe}
                        questionIndex={index}
                        temaVisual={doc.temaVisual}
                        themeLabel={activeThemeMeta.nama}
                        altTitle={soal.materi || doc.materi}
                      />
                      {questionContentBody}
                    </>
                  )}
                </div>

                {/* Edit Kunci Jawaban dalam Mode Edit */}
                {isEditing && (
                  <div
                    data-pdf-ignore="true"
                    className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Kunci Jawaban Guru:
                      </label>
                      <input
                        type="text"
                        value={soal.kunciJawaban}
                        onChange={(e) =>
                          updateQuestion(soal.id, {
                            kunciJawaban: e.target.value,
                          })
                        }
                        className="w-full rounded border border-slate-300 bg-white px-2.5 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Pembahasan / Kriteria Skor:
                      </label>
                      <input
                        type="text"
                        value={soal.pembahasan}
                        onChange={(e) =>
                          updateQuestion(soal.id, { pembahasan: e.target.value })
                        }
                        className="w-full rounded border border-slate-300 bg-white px-2.5 py-1 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: REFLEKSI DIRI PESERTA DIDIK */}
      {doc.refleksiSiswa.length > 0 && (
        <div
          className={`lkpd-pdf-section rounded-xl border ${style.headerBorder} bg-white p-4 sm:p-5 space-y-3`}
        >
          <h2
            className={`font-display text-base font-bold ${style.accentText}`}
          >
            06. Refleksi Diri Peserta Didik
          </h2>
          <p className="text-xs text-slate-600">
            Berilah tanda centang (✓) pada kolom yang paling menggambarkan pengalaman belajarmu hari ini!
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-300">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className={style.tableHeaderBg}>
                  <th className="border-b border-r border-slate-300 px-3 py-2 text-left font-semibold">
                    Pernyataan Refleksi Belajar
                  </th>
                  <th className="border-b border-r border-slate-300 px-2.5 py-2 text-center font-semibold w-24">
                    Sudah Paham
                  </th>
                  <th className="border-b border-r border-slate-300 px-2.5 py-2 text-center font-semibold w-24">
                    Perlu Latihan
                  </th>
                  <th className="border-b border-slate-300 px-2.5 py-2 text-center font-semibold w-24">
                    Belum Paham
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.refleksiSiswa.map((refItem, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="border-b last:border-b-0 border-r border-slate-300 px-3 py-2.5 text-slate-800">
                      {refItem}
                    </td>
                    <td className="border-b last:border-b-0 border-r border-slate-300 px-2 py-2.5 text-center">
                      <span className="inline-block w-4 h-4 rounded border border-slate-400" />
                    </td>
                    <td className="border-b last:border-b-0 border-r border-slate-300 px-2 py-2.5 text-center">
                      <span className="inline-block w-4 h-4 rounded border border-slate-400" />
                    </td>
                    <td className="border-b last:border-b-0 border-slate-300 px-2 py-2.5 text-center">
                      <span className="inline-block w-4 h-4 rounded border border-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 7: LAMPIRAN KUNCI JAWABAN & RUBRIK GURU */}
      {showAnswerKey && (
        <div className="lkpd-pdf-section rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2">
            <h2 className="font-display text-base font-bold text-emerald-900">
              Lampiran Pegangan Guru: Kunci Jawaban & Pedoman Penskoran
            </h2>
            <span className="font-mono text-xs font-semibold text-emerald-800 tabular-nums">
              Total Skor Maksimal: {totalSkor} Poin
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {doc.daftarSoal.map((soal, idx) => (
              <div
                key={soal.id || idx}
                className="rounded-lg border border-emerald-200/80 bg-white p-3 text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2 font-semibold text-slate-900 tabular-nums">
                  <span>
                    Butir {String(idx + 1).padStart(2, "0")} (
                    {QUESTION_TYPE_LABELS[soal.tipe] ?? soal.tipe}) · Kunci:{" "}
                    {soal.kunciJawaban}
                  </span>
                  <span className="font-mono text-emerald-800 shrink-0">
                    Skor: {soal.skor}
                  </span>
                </div>
                {soal.pembahasan && (
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="font-medium text-slate-800">
                      Pembahasan:
                    </strong>{" "}
                    {soal.pembahasan}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-900 font-medium tabular-nums">
            Rumus Nilai Akhir = (Perolehan Skor Siswa ÷ {totalSkor || 100}) × 100
          </p>
        </div>
      )}
    </div>
  );
};
