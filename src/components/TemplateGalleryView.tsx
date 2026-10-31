import React, { useState } from "react";
import { ArrowRight, BookmarkPlus, Palette } from "lucide-react";
import { getThemeMeta } from "../data/curriculumData";
import type { LKPDDocument } from "../types/lkpd";
import { SafeIllustrationImage } from "./VisualIllustration";

interface TemplateGalleryViewProps {
  templates: LKPDDocument[];
  onUseTemplate: (tpl: LKPDDocument) => void;
  onSaveCopyToArchive: (tpl: LKPDDocument) => void;
}

export const TemplateGalleryView: React.FC<TemplateGalleryViewProps> = ({
  templates,
  onUseTemplate,
  onSaveCopyToArchive,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  const filtered = templates.filter((tpl) => {
    if (selectedLevel === "ALL") return true;
    if (selectedLevel === "PAUD") return tpl.fase === "Fase Fondasi";
    if (selectedLevel === "SD") {
      return (
        tpl.fase === "Fase A" || tpl.fase === "Fase B" || tpl.fase === "Fase C"
      );
    }
    if (selectedLevel === "SMP") return tpl.fase === "Fase D";
    if (selectedLevel === "SMA") {
      return tpl.fase === "Fase E" || tpl.fase === "Fase F";
    }
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Vibrant Gradient Header */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 p-6 text-white shadow-sm flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Galeri Template LKPD Berwarna & Bergambar
          </h1>
          <p className="text-xs sm:text-sm text-indigo-50 leading-relaxed">
            Koleksi LKPD siap pakai dengan Smart Layout CSS Grid serta 50 Tema dan Desain Gambar (termasuk Fotografi Realistik, Kartun, Anime, 3D Isometrik, Komik Cerita, Vektor 2D, & Klasik Akademik) untuk seluruh jenjang Kurikulum Merdeka.
          </p>
        </div>

        {/* Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-white/15 backdrop-blur-xs rounded-xl overflow-x-auto">
          {[
            { id: "ALL", label: "Semua Jenjang" },
            { id: "PAUD", label: "PAUD (Fondasi)" },
            { id: "SD", label: "SD / MI (Fase A–C)" },
            { id: "SMP", label: "SMP / MTs (Fase D)" },
            { id: "SMA", label: "SMA / SMK (Fase E–F)" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSelectedLevel(btn.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedLevel === btn.id
                  ? "bg-white text-indigo-950 shadow-xs"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => {
          const themeMeta = getThemeMeta(tpl.temaVisual);

          return (
            <article
              key={tpl.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between transition-all hover:border-indigo-300 hover:shadow-sm"
            >
              <div>
                {/* Theme Swatch Top Accent */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${themeMeta.swatchGradient}`}
                />

                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <SafeIllustrationImage
                    src={tpl.gambarUtamaUrl}
                    alt={tpl.judul}
                    fallbackTitle={tpl.materi}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
                  <div className="text-xs text-slate-500 tabular-nums leading-relaxed">
                    <span className="font-bold text-indigo-700">{tpl.fase}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{tpl.kelas}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-semibold text-teal-700 inline-flex items-center gap-1">
                      <Palette className="w-3 h-3 inline" />
                      {themeMeta.nama}
                    </span>
                    <span aria-hidden="true"> · </span>
                    <span>{tpl.daftarSoal.length} Aktivitas/Soal</span>
                  </div>

                  <h2 className="font-display text-lg font-bold text-slate-900 leading-snug">
                    {tpl.judul}
                  </h2>

                  <p className="text-xs font-semibold text-slate-700">
                    {tpl.mapel} — {tpl.materi}
                  </p>

                  <p className="text-[11px] font-medium text-indigo-700">
                    Model: {tpl.modelPembelajaran}
                  </p>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {tpl.capaianPembelajaran}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSaveCopyToArchive(tpl)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer whitespace-nowrap"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Simpan Salinan</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUseTemplate(tpl)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-xs font-semibold text-white cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  <span>Gunakan di Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
