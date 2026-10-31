import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { INITIAL_BANK_SOAL } from "./data/bankSoalData";
import { getVisualUrlById } from "./data/curriculumData";
import { TEMPLATE_LKPD_LIST } from "./data/templateLkpdData";
import {
  AppTab,
  type LKPDDocument,
  type QuestionItem,
} from "./types/lkpd";
import { exportLkpdElementToPdf } from "./utils/pdfExporter";
import { detectTopicDomainProfile } from "./utils/topicDesignEngine";
import { Navbar } from "./components/Navbar";
import { StudioWorkspace } from "./components/StudioWorkspace";
import { BankSoalView } from "./components/BankSoalView";
import { TemplateGalleryView } from "./components/TemplateGalleryView";
import { SavedArchiveView } from "./components/SavedArchiveView";

const STORAGE_SAVED_DOCS = "lkstudio_saved_docs_v3";
const STORAGE_BANK_SOAL = "lkstudio_bank_soal_v3";

interface ToastNotice {
  id: number;
  message: string;
  tone: "success" | "error" | "info";
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.STUDIO);

  // Saved LKPDs in localStorage (with seamless migration of user-saved v1/v2 docs)
  const [savedDocs, setSavedDocs] = useState<LKPDDocument[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_DOCS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const legacy =
        localStorage.getItem("lkstudio_saved_docs_v2") ||
        localStorage.getItem("lkstudio_saved_docs_v1");
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
          const userCustomDocs = parsedLegacy.filter(
            (d: LKPDDocument) => d.id !== TEMPLATE_LKPD_LIST[0]?.id
          );
          return [TEMPLATE_LKPD_LIST[0], ...userCustomDocs];
        }
      }
    } catch {
      // ignore corrupted storage
    }
    return [TEMPLATE_LKPD_LIST[0]];
  });

  // Active LKPD in Studio
  const [activeDoc, setActiveDoc] = useState<LKPDDocument>(() => {
    return savedDocs[0] ?? TEMPLATE_LKPD_LIST[0];
  });

  // Bank Soal persisted in localStorage (merging any custom questions from v1/v2 with upgraded colorful INITIAL_BANK_SOAL)
  const [bankSoal, setBankSoal] = useState<QuestionItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BANK_SOAL);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const legacyV2 =
        localStorage.getItem("lkstudio_bank_soal_v2") ||
        localStorage.getItem("lkstudio_bank_soal_v1");
      if (legacyV2) {
        const parsedLegacy: QuestionItem[] = JSON.parse(legacyV2);
        if (Array.isArray(parsedLegacy)) {
          const customQuestions = parsedLegacy.filter(
            (q) => q.id.startsWith("usr_") || q.id.startsWith("ai_")
          );
          return [...customQuestions, ...INITIAL_BANK_SOAL];
        }
      }
    } catch {
      // ignore corrupted storage
    }
    return INITIAL_BANK_SOAL;
  });

  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [bankSoalModalOpen, setBankSoalModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastNotice | null>(null);

  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_DOCS, JSON.stringify(savedDocs));
    } catch {
      // ignore quota exceeded
    }
  }, [savedDocs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BANK_SOAL, JSON.stringify(bankSoal));
    } catch {
      // ignore quota exceeded
    }
  }, [bankSoal]);

  const notify = (
    message: string,
    tone: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now();
    setToast({ id, message, tone });
    window.setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4200);
  };

  // Save or update LKPD in Archive
  const handleSaveToArchive = (docToSave: LKPDDocument = activeDoc) => {
    const stamped: LKPDDocument = {
      ...docToSave,
      updatedAt: new Date().toISOString(),
    };
    setSavedDocs((prev) => {
      const exists = prev.some((d) => d.id === stamped.id);
      if (exists) {
        return prev.map((d) => (d.id === stamped.id ? stamped : d));
      }
      return [stamped, ...prev];
    });
    notify(`"${stamped.judul}" berhasil disimpan ke Arsip LKPD.`, "success");
  };

  // Export High-Resolution A4 PDF
  const handleExportPdf = async (includeTeacherGuide: boolean) => {
    if (isExportingPdf) return;
    const prevShowKey = showAnswerKey;
    setIsExportingPdf(true);

    if (activeTab !== AppTab.STUDIO) {
      setActiveTab(AppTab.STUDIO);
    }
    if (showAnswerKey !== includeTeacherGuide) {
      setShowAnswerKey(includeTeacherGuide);
    }

    // Allow DOM & mobile layout state to settle before rasterizing sections
    await new Promise((resolve) => window.setTimeout(resolve, 180));

    try {
      if (!sheetRef.current) {
        throw new Error("Lembar pratinjau LKPD belum siap.");
      }
      const suffix = includeTeacherGuide ? "Pegangan_Guru" : "Lembar_Siswa";
      await exportLkpdElementToPdf(sheetRef.current, {
        filename: `LKPD_${activeDoc.kelas}_${activeDoc.mapel}_${suffix}`,
        includeTeacherGuide,
      });
      notify(
        includeTeacherGuide
          ? "PDF LKPD + Kunci Jawaban Guru berhasil diunduh!"
          : "PDF Lembar Kerja Siswa berhasil diunduh!",
        "success"
      );
    } catch (err) {
      notify(
        err instanceof Error ? err.message : "Gagal mengekspor dokumen ke PDF.",
        "error"
      );
    } finally {
      setShowAnswerKey(prevShowKey);
      setIsExportingPdf(false);
    }
  };

  // Insert Questions from Bank Soal into Active LKPD
  const handleInsertQuestionsIntoActiveLkpd = (items: QuestionItem[]) => {
    const cloned = items.map((q, idx) => ({
      ...q,
      id: `ins_${Date.now()}_${idx}_${q.id}`,
    }));
    setActiveDoc((prev) => ({
      ...prev,
      daftarSoal: [...prev.daftarSoal, ...cloned],
    }));
    setBankSoalModalOpen(false);
    setActiveTab(AppTab.STUDIO);
    notify(
      `${cloned.length} butir soal dari Bank Soal ditambahkan ke LKPD aktif.`,
      "success"
    );
  };

  // Assemble Brand-New LKPD directly from Selected Bank Soal Questions
  const handleCreateNewLkpdFromQuestions = (items: QuestionItem[]) => {
    if (items.length === 0) return;
    const first = items[0];
    const mapel = first.mapel || "Mata Pelajaran Terpadu";
    const materi = first.materi || "Evaluasi Materi Pilihan";
    const fase = first.fase || "Fase B";
    const kelas = first.kelas || "Kelas 4 SD / MI";
    const topicProfile = detectTopicDomainProfile(mapel, materi, fase);

    const newDoc: LKPDDocument = {
      id: `lkpd_bs_${Date.now()}`,
      updatedAt: new Date().toISOString(),
      namaSekolah: activeDoc.namaSekolah || "Satuan Pendidikan Kurikulum Merdeka",
      namaGuru: activeDoc.namaGuru || "",
      fase,
      kelas,
      semester: "Semester 1 (Ganjil)",
      mapel,
      materi,
      subMateri: "Latihan Terpadu dari Bank Soal",
      alokasiWaktu: "2 x 35 Menit",
      modelPembelajaran: "Discovery Learning (Penemuan Terbimbing)",
      temaVisual: topicProfile.recommendedTheme,
      judul: `Lembar Kerja & Aktivitas: ${materi}`,
      subjudul: `Disusun dari ${items.length} Butir Bank Soal Terpilih (${kelas})`,
      capaianPembelajaran: `Peserta didik memahami dan menerapkan konsep ${materi} pada mata pelajaran ${mapel} sesuai ${fase}.`,
      tujuanPembelajaran: [
        `Menyelesaikan aktivitas dan soal kontekstual terkait materi ${materi} secara tepat.`,
        "Menganalisis cerita bergambar, eksperimen, atau diagram stimulus dengan runtut.",
      ],
      petunjukBelajar: [
        "Tuliskan nama lengkap dan kelas pada kolom identitas di bagian atas.",
        "Amati setiap ilustrasi cerita, langkah eksperimen, atau diagram sebelum menjawab.",
        "Periksa kembali kelengkapan jawaban sebelum dikumpulkan kepada guru.",
      ],
      alatDanBahan: ["Alat tulis lengkap", "Buku catatan materi"],
      ringkasanMateri: `Lembar kerja ini dirancang untuk memperdalam pemahaman konsep serta penalaranmu pada topik ${materi} (${mapel}). Perhatikan setiap informasi visual yang tersedia pada soal dengan cermat.`,
      poinPenting: [
        "Baca setiap wacana cerita bergambar, tabel pernyataan, atau instruksi percobaan dengan teliti.",
        "Tuliskan alasan atau kesimpulan menggunakan bahasamu sendiri secara jelas.",
      ],
      gambarUtamaUrl: getVisualUrlById(topicProfile.primaryVisualId),
      tampilkanGambarUtama: true,
      ilustrasiUtamaSvg: "",
      tampilkanDiagramSvg: false,
      keteranganIlustrasi: `${topicProfile.namaDomain} — ${topicProfile.deskripsiVisualMateri}`,
      aktivitasEksplorasi: {
        judulAktivitas: "Catatan Konsep Kunci Siswa",
        instruksi:
          "Sebelum mengerjakan latihan soal, tuliskan 2 istilah penting yang kamu ketahui tentang topik ini!",
        kolomTabel: [
          "No.",
          "Istilah / Konsep Penting",
          "Penjelasan Menurut Bahasamu",
        ],
        barisContoh: [
          ["1", "", ""],
          ["2", "", ""],
        ],
      },
      daftarSoal: items.map((q, idx) => ({
        ...q,
        id: `new_bs_q_${Date.now()}_${idx}`,
      })),
      refleksiSiswa: [
        `Saya mampu menyelesaikan aktivitas dan soal terkait ${materi} dengan percaya diri.`,
        "Saya mencatat bagian materi yang masih perlu didiskusikan bersama guru.",
      ],
    };

    setActiveDoc(newDoc);
    setActiveTab(AppTab.STUDIO);
    notify("LKPD baru berhasil dirakit dari Bank Soal terpilih!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50/75 via-indigo-50/35 to-amber-50/50 text-slate-900">
      {/* Top Navigation Bar (Strict 3-Zone Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onQuickDownloadPdf={() => handleExportPdf(showAnswerKey)}
        isExportingPdf={isExportingPdf}
        savedCount={savedDocs.length}
        bankSoalCount={bankSoal.length}
      />

      {/* Non-blocking Inline Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 max-w-md rounded-xl border bg-white shadow-lg px-4 py-3 flex items-start gap-3 no-print border-sky-200"
        >
          {toast.tone === "success" && (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          {toast.tone === "error" && (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          {toast.tone === "info" && (
            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          )}
          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
            {toast.message}
          </p>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-700 shrink-0 cursor-pointer"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1">
        {activeTab === AppTab.STUDIO && (
          <StudioWorkspace
            doc={activeDoc}
            onChangeDoc={setActiveDoc}
            sheetRef={sheetRef}
            showAnswerKey={showAnswerKey}
            onToggleAnswerKey={setShowAnswerKey}
            onExportPdf={handleExportPdf}
            isExportingPdf={isExportingPdf}
            onSaveToArchive={handleSaveToArchive}
            onOpenBankSoalPicker={() => setBankSoalModalOpen(true)}
            onNotify={notify}
          />
        )}

        {activeTab === AppTab.BANK_SOAL && (
          <BankSoalView
            questions={bankSoal}
            onAddQuestionsToBank={(items) =>
              setBankSoal((prev) => [...items, ...prev])
            }
            onDeleteQuestionFromBank={(id) =>
              setBankSoal((prev) => prev.filter((q) => q.id !== id))
            }
            onInsertIntoActiveLkpd={handleInsertQuestionsIntoActiveLkpd}
            onCreateNewLkpdFromQuestions={handleCreateNewLkpdFromQuestions}
            onNotify={notify}
            activeTheme={activeDoc.temaVisual}
          />
        )}

        {activeTab === AppTab.TEMPLATES && (
          <TemplateGalleryView
            templates={TEMPLATE_LKPD_LIST}
            onUseTemplate={(tpl) => {
              const copy: LKPDDocument = {
                ...tpl,
                id: `lkpd_tpl_${Date.now()}`,
                updatedAt: new Date().toISOString(),
              };
              setActiveDoc(copy);
              setActiveTab(AppTab.STUDIO);
              notify(`Template "${tpl.judul}" dimuat ke Studio LKPD.`, "success");
            }}
            onSaveCopyToArchive={(tpl) => {
              const copy: LKPDDocument = {
                ...tpl,
                id: `saved_tpl_${Date.now()}`,
                updatedAt: new Date().toISOString(),
              };
              handleSaveToArchive(copy);
            }}
          />
        )}

        {activeTab === AppTab.ARCHIVE && (
          <SavedArchiveView
            savedDocs={savedDocs}
            onOpenInStudio={(doc) => {
              setActiveDoc(doc);
              setActiveTab(AppTab.STUDIO);
            }}
            onDuplicateDoc={(doc) => {
              const dup: LKPDDocument = {
                ...doc,
                id: `dup_${Date.now()}`,
                judul: `${doc.judul} (Salinan)`,
                updatedAt: new Date().toISOString(),
              };
              setSavedDocs((prev) => [dup, ...prev]);
              notify("Salinan LKPD berhasil ditambahkan ke Arsip.", "success");
            }}
            onDeleteDoc={(id) => {
              setSavedDocs((prev) => prev.filter((d) => d.id !== id));
              notify("LKPD dihapus dari Arsip.", "info");
            }}
            onGoCreateNew={() => setActiveTab(AppTab.STUDIO)}
          />
        )}
      </main>

      {/* Bank Soal Quick-Picker Modal inside Studio */}
      {bankSoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-xl">
            <BankSoalView
              questions={bankSoal}
              onAddQuestionsToBank={(items) =>
                setBankSoal((prev) => [...items, ...prev])
              }
              onDeleteQuestionFromBank={(id) =>
                setBankSoal((prev) => prev.filter((q) => q.id !== id))
              }
              onInsertIntoActiveLkpd={handleInsertQuestionsIntoActiveLkpd}
              onCreateNewLkpdFromQuestions={handleCreateNewLkpdFromQuestions}
              onNotify={notify}
              activeTheme={activeDoc.temaVisual}
              isModalMode={true}
              onCloseModal={() => setBankSoalModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="border-t border-sky-200/70 bg-white/90 backdrop-blur-xs py-5 px-4 sm:px-6 lg:px-8 mt-10 no-print">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>
            LembarKarya Studio — Penyusun LKPD Bergambar & Bank Soal Lengkap Kurikulum Merdeka (PAUD s.d. SMA/SMK)
          </p>
          <div className="flex items-center gap-4 font-medium">
            <button
              type="button"
              onClick={() => setActiveTab(AppTab.STUDIO)}
              className="hover:text-indigo-700 cursor-pointer"
            >
              Studio LKPD
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(AppTab.BANK_SOAL)}
              className="hover:text-indigo-700 cursor-pointer"
            >
              Bank Soal
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(AppTab.TEMPLATES)}
              className="hover:text-indigo-700 cursor-pointer"
            >
              Galeri Template
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
