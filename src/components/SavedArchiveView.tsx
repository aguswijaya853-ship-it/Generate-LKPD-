import React, { useState } from "react";
import { Copy, ExternalLink, FilePlus2, Search, Trash2 } from "lucide-react";
import { getThemeMeta } from "../data/curriculumData";
import type { LKPDDocument } from "../types/lkpd";
import { SafeIllustrationImage } from "./VisualIllustration";

interface SavedArchiveViewProps {
  savedDocs: LKPDDocument[];
  onOpenInStudio: (doc: LKPDDocument) => void;
  onDuplicateDoc: (doc: LKPDDocument) => void;
  onDeleteDoc: (id: string) => void;
  onGoCreateNew: () => void;
}

export const SavedArchiveView: React.FC<SavedArchiveViewProps> = ({
  savedDocs,
  onOpenInStudio,
  onDuplicateDoc,
  onDeleteDoc,
  onGoCreateNew,
}) => {
  const [query, setQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = savedDocs.filter((doc) => {
    if (!query.trim()) return true;
    const kw = query.toLowerCase();
    return `${doc.judul} ${doc.mapel} ${doc.materi} ${doc.kelas} ${doc.fase}`
      .toLowerCase()
      .includes(kw);
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Colorful Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Arsip LKPD Tersimpan
          </h1>
          <p className="text-xs sm:text-sm text-sky-50">
            Koleksi Lembar Kerja Peserta Didik bergambar yang telah Anda susun dan simpan di perangkat ini.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-xs cursor-pointer whitespace-nowrap"
        >
          <FilePlus2 className="w-4 h-4" />
          <span>Susun LKPD Baru</span>
        </button>
      </div>

      {savedDocs.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul LKPD, mata pelajaran, atau kelas..."
            className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
      )}

      {savedDocs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Arsip LKPD Anda Masih Kosong
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Setiap LKPD yang Anda klik Simpan Arsip di Studio LKPD maupun Galeri Template akan tersimpan rapi di halaman ini agar siap dibuka kembali kapan saja.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onGoCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-xs sm:text-sm font-semibold text-white cursor-pointer"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Buka Studio & Simpan LKPD Pertama</span>
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm font-medium text-slate-700">
            Tidak ditemukan LKPD dengan kata kunci "{query}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const formattedDate = new Date(item.updatedAt).toLocaleDateString(
              "id-ID",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );
            const isConfirming = confirmDeleteId === item.id;
            const themeMeta = getThemeMeta(item.temaVisual);

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-sky-300 transition-colors"
              >
                <div>
                  <div
                    className={`h-2 w-full bg-gradient-to-r ${themeMeta.swatchGradient}`}
                  />
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <SafeIllustrationImage
                      src={item.gambarUtamaUrl}
                      alt={item.judul}
                      fallbackTitle={item.materi}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="text-xs text-slate-500 tabular-nums leading-relaxed">
                      <span className="font-bold text-indigo-700">
                        {item.fase}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{item.kelas}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="font-semibold text-teal-700">
                        {themeMeta.nama}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{item.daftarSoal.length} Soal</span>
                      <span aria-hidden="true"> · </span>
                      <span>{formattedDate}</span>
                    </div>
                    <h2 className="font-display text-base font-bold text-slate-900 leading-snug">
                      {item.judul}
                    </h2>
                    <p className="text-xs font-medium text-slate-600">
                      {item.mapel} · {item.materi}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onDuplicateDoc(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
                      title="Duplikat LKPD"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplikat</span>
                    </button>

                    {isConfirming ? (
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteDoc(item.id);
                          setConfirmDeleteId(null);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                      >
                        Yakin Hapus?
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="p-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                        aria-label="Hapus LKPD dari arsip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenInStudio(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
                  >
                    <span>Buka & Unduh</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
