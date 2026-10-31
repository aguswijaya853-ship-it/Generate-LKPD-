import React, { useEffect, useMemo, useState } from "react";
import {
  BookmarkCheck,
  Check,
  Download,
  FileCheck2,
  LayoutGrid,
  Library,
  Palette,
  PencilLine,
  RefreshCw,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  CURRICULUM_PHASES,
  LEARNING_MODELS,
  QUESTION_TYPES_CATALOG,
  THEME_FAMILY_TABS,
  VISUAL_THEMES_CATALOG,
  getThemeMeta,
  inferVisualForSubjectAndTheme,
} from "../data/curriculumData";
import {
  QuestionType,
  SmartLayoutMode,
  VisualTheme,
  type LKPDDocument,
  type QuestionItem,
  type SuggestedTopic,
  type ThemeFamily,
} from "../types/lkpd";
import {
  SMART_LAYOUT_OPTIONS,
  computeSmartWorksheetLayout,
} from "../utils/smartLayoutEngine";
import { detectTopicDomainProfile } from "../utils/topicDesignEngine";
import { LkpdPreviewSheet } from "./LkpdPreviewSheet";

interface StudioWorkspaceProps {
  doc: LKPDDocument;
  onChangeDoc: (doc: LKPDDocument) => void;
  sheetRef: React.RefObject<HTMLDivElement | null>;
  showAnswerKey: boolean;
  onToggleAnswerKey: (val: boolean) => void;
  onExportPdf: (includeTeacherGuide: boolean) => void;
  isExportingPdf: boolean;
  onSaveToArchive: (docToSave?: LKPDDocument) => void;
  onOpenBankSoalPicker: () => void;
  onNotify: (message: string, tone?: "success" | "error" | "info") => void;
}

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({
  doc,
  onChangeDoc,
  sheetRef,
  showAnswerKey,
  onToggleAnswerKey,
  onExportPdf,
  isExportingPdf,
  onSaveToArchive,
  onOpenBankSoalPicker,
  onNotify,
}) => {
  const [mobilePane, setMobilePane] = useState<"form" | "preview">("preview");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(() => {
    const found = CURRICULUM_PHASES.find((p) => p.kodeFase === doc.fase);
    return found ? found.id : "FASE_B";
  });
  const [kelas, setKelas] = useState<string>(doc.kelas || "Kelas 4 SD / MI");
  const [semester, setSemester] = useState<string>(doc.semester || "Semester 1");

  const [mapelMode, setMapelMode] = useState<"auto" | "manual">("auto");
  const [mapelAuto, setMapelAuto] = useState<string>(doc.mapel);
  const [mapelManual, setMapelManual] = useState<string>("");

  const [materiMode, setMateriMode] = useState<"auto" | "manual">("auto");
  const [materiAuto, setMateriAuto] = useState<string>(doc.materi);
  const [materiManual, setMateriManual] = useState<string>("");
  const [subMateri, setSubMateri] = useState<string>(doc.subMateri || "");

  // Filter states for the 50 Tema dan Desain Gambar Lembar Kerja
  const [themeCategoryFilter, setThemeCategoryFilter] = useState<
    "ALL" | ThemeFamily
  >("ALL");
  const [themeSearchQuery, setThemeSearchQuery] = useState<string>("");

  // Topic-to-Worksheet Automatic Design Synchronization
  const [autoSyncTopicDesign, setAutoSyncTopicDesign] = useState<boolean>(true);
  const [semuaSoalBergambar, setSemuaSoalBergambar] = useState<boolean>(true);

  const [namaSekolah, setNamaSekolah] = useState<string>(doc.namaSekolah);
  const [namaGuru, setNamaGuru] = useState<string>(doc.namaGuru);
  const [alokasiWaktu, setAlokasiWaktu] = useState<string>(
    doc.alokasiWaktu || "2 x 35 Menit"
  );
  const [modelPembelajaran, setModelPembelajaran] = useState<string>(
    doc.modelPembelajaran || LEARNING_MODELS[0]
  );
  const [jumlahSoal, setJumlahSoal] = useState<number>(5);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([
    QuestionType.CERITA_BERGAMBAR,
    QuestionType.EKSPERIMEN,
    QuestionType.BENAR_SALAH,
    QuestionType.PILIHAN_GANDA,
  ]);
  const [instruksiTambahan, setInstruksiTambahan] = useState<string>("");

  const [isGeneratingLkpd, setIsGeneratingLkpd] = useState<boolean>(false);
  const [isSuggestingTopics, setIsSuggestingTopics] = useState<boolean>(false);
  const [aiSuggestedTopics, setAiSuggestedTopics] = useState<SuggestedTopic[]>(
    []
  );
  const [isRegeneratingMainDiagram, setIsRegeneratingMainDiagram] =
    useState<boolean>(false);
  const [isRestylingQuestionsSvg, setIsRestylingQuestionsSvg] =
    useState<boolean>(false);
  const [regeneratingQuestionId, setRegeneratingQuestionId] = useState<
    string | null
  >(null);

  const currentPhase =
    CURRICULUM_PHASES.find((p) => p.id === selectedPhaseId) ??
    CURRICULUM_PHASES[2];
  const availableSubjects = currentPhase.mataPelajaran;
  const activeSubjectObj =
    availableSubjects.find((s) => s.nama === mapelAuto) ?? availableSubjects[0];
  const availableTopics = activeSubjectObj ? activeSubjectObj.daftarMateri : [];

  const effectiveMapel =
    mapelMode === "manual"
      ? mapelManual.trim() || "Mata Pelajaran Umum"
      : mapelAuto;
  const effectiveMateri =
    materiMode === "manual"
      ? materiManual.trim() || "Topik Pembelajaran"
      : materiAuto;

  // Live Topic Design Profile computed from selected Fase + Mapel + Materi
  const detectedTopicProfile = useMemo(
    () =>
      detectTopicDomainProfile(
        effectiveMapel,
        effectiveMateri,
        currentPhase.kodeFase
      ),
    [effectiveMapel, effectiveMateri, currentPhase.kodeFase]
  );

  const recommendedThemeMeta = useMemo(
    () => getThemeMeta(detectedTopicProfile.recommendedTheme),
    [detectedTopicProfile.recommendedTheme]
  );

  const activeThemeMeta = useMemo(
    () => getThemeMeta(doc.temaVisual),
    [doc.temaVisual]
  );

  // Filtered list of the 50 Tema dan Desain Gambar Lembar Kerja
  const filteredThemes = useMemo(() => {
    const q = themeSearchQuery.trim().toLowerCase();
    return VISUAL_THEMES_CATALOG.filter((t) => {
      if (
        themeCategoryFilter !== "ALL" &&
        t.kategoriGaya !== themeCategoryFilter
      ) {
        return false;
      }
      if (q !== "") {
        const hay = `${t.nama} ${t.gayaGambarLabel} ${t.labelKategori} ${t.deskripsi}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [themeCategoryFilter, themeSearchQuery]);

  // Live Smart Layout CSS Grid computation for StudioWorkspace feedback
  const activeSmartMode = doc.smartLayoutMode ?? SmartLayoutMode.AUTO;
  const smartLayoutPlan = useMemo(
    () => computeSmartWorksheetLayout(doc, isEditing),
    [doc, isEditing]
  );

  useEffect(() => {
    setNamaSekolah(doc.namaSekolah);
    setNamaGuru(doc.namaGuru);
    setKelas(doc.kelas);
    setSemester(doc.semester);
    setAlokasiWaktu(doc.alokasiWaktu);
    setSubMateri(doc.subMateri);
    if (doc.modelPembelajaran) {
      setModelPembelajaran(doc.modelPembelajaran);
    }

    const matchedPhase = CURRICULUM_PHASES.find((p) => p.kodeFase === doc.fase);
    if (matchedPhase) {
      setSelectedPhaseId(matchedPhase.id);
      const matchedSub = matchedPhase.mataPelajaran.find(
        (s) => s.nama === doc.mapel
      );
      if (matchedSub) {
        setMapelMode("auto");
        setMapelAuto(matchedSub.nama);
        if (matchedSub.daftarMateri.includes(doc.materi)) {
          setMateriMode("auto");
          setMateriAuto(doc.materi);
        } else {
          setMateriMode("manual");
          setMateriManual(doc.materi);
        }
      } else {
        setMapelMode("manual");
        setMapelManual(doc.mapel);
        setMateriMode("manual");
        setMateriManual(doc.materi);
      }
    }
  }, [doc.id]);

  // Helper to immediately adapt the live worksheet header, visual illustration, & theme when topic changes
  const syncDocDesignWithSelection = (
    nextFase: string,
    nextKelas: string,
    nextMapel: string,
    nextMateri: string,
    forceAutoTheme = autoSyncTopicDesign
  ) => {
    const profile = detectTopicDomainProfile(nextMapel, nextMateri, nextFase);
    const targetTheme = forceAutoTheme
      ? profile.recommendedTheme
      : doc.temaVisual;
    const matchedTopicVisual = inferVisualForSubjectAndTheme(
      nextMapel,
      targetTheme,
      nextMateri,
      nextFase
    );
    onChangeDoc({
      ...doc,
      fase: nextFase,
      kelas: nextKelas,
      mapel: nextMapel,
      materi: nextMateri,
      gambarUtamaUrl: matchedTopicVisual,
      temaVisual: targetTheme,
    });
  };

  const handlePhaseSelect = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    setAiSuggestedTopics([]);
    const phaseObj = CURRICULUM_PHASES.find((p) => p.id === phaseId);
    if (!phaseObj) return;
    const firstKelas = phaseObj.rentangKelas[0] ?? "";
    const firstSub = phaseObj.mataPelajaran[0];
    setKelas(firstKelas);

    let nextMapel = effectiveMapel;
    let nextMateri = effectiveMateri;
    if (firstSub && mapelMode === "auto") {
      nextMapel = firstSub.nama;
      setMapelAuto(firstSub.nama);
      if (materiMode === "auto") {
        nextMateri = firstSub.daftarMateri[0] ?? "";
        setMateriAuto(nextMateri);
      }
    }
    syncDocDesignWithSelection(
      phaseObj.kodeFase,
      firstKelas,
      nextMapel,
      nextMateri
    );
  };

  const handleDirectKelasSelect = (chosenKelas: string) => {
    setKelas(chosenKelas);
    const ownerPhase = CURRICULUM_PHASES.find((p) =>
      p.rentangKelas.includes(chosenKelas)
    );
    if (ownerPhase && ownerPhase.id !== selectedPhaseId) {
      setSelectedPhaseId(ownerPhase.id);
      setAiSuggestedTopics([]);
      const firstSub = ownerPhase.mataPelajaran[0];
      let nextMapel = effectiveMapel;
      let nextMateri = effectiveMateri;
      if (firstSub && mapelMode === "auto") {
        nextMapel = firstSub.nama;
        setMapelAuto(firstSub.nama);
        if (materiMode === "auto") {
          nextMateri = firstSub.daftarMateri[0] ?? "";
          setMateriAuto(nextMateri);
        }
      }
      syncDocDesignWithSelection(
        ownerPhase.kodeFase,
        chosenKelas,
        nextMapel,
        nextMateri
      );
    } else {
      syncDocDesignWithSelection(
        currentPhase.kodeFase,
        chosenKelas,
        effectiveMapel,
        effectiveMateri
      );
    }
  };

  const handleSubjectAutoSelect = (subName: string) => {
    setMapelAuto(subName);
    setAiSuggestedTopics([]);
    const found = availableSubjects.find((s) => s.nama === subName);
    let nextMateri = effectiveMateri;
    if (found && materiMode === "auto") {
      nextMateri = found.daftarMateri[0] ?? "";
      setMateriAuto(nextMateri);
    }
    syncDocDesignWithSelection(
      currentPhase.kodeFase,
      kelas,
      subName,
      nextMateri
    );
  };

  const handleTopicAutoSelect = (chosenMateri: string) => {
    setMateriAuto(chosenMateri);
    syncDocDesignWithSelection(
      currentPhase.kodeFase,
      kelas,
      effectiveMapel,
      chosenMateri
    );
  };

  const handleManualMateriChange = (typedMateri: string) => {
    setMateriManual(typedMateri);
    if (typedMateri.trim().length >= 3) {
      syncDocDesignWithSelection(
        currentPhase.kodeFase,
        kelas,
        effectiveMapel,
        typedMateri.trim()
      );
    }
  };

  const handleThemeSelect = (themeId: VisualTheme) => {
    setAutoSyncTopicDesign(false);
    const topicImg = inferVisualForSubjectAndTheme(
      effectiveMapel,
      themeId,
      effectiveMateri,
      currentPhase.kodeFase
    );

    onChangeDoc({
      ...doc,
      temaVisual: themeId,
      gambarUtamaUrl: topicImg,
    });
  };

  const handleSmartLayoutChange = (mode: SmartLayoutMode) => {
    onChangeDoc({
      ...doc,
      smartLayoutMode: mode,
    });
    const modeMeta = SMART_LAYOUT_OPTIONS.find((m) => m.id === mode);
    if (modeMeta) {
      onNotify(
        `Smart Layout diubah ke: ${modeMeta.label}`,
        "info"
      );
    }
  };

  const handleEnableAutoTopicDesign = () => {
    setAutoSyncTopicDesign(true);
    syncDocDesignWithSelection(
      currentPhase.kodeFase,
      kelas,
      effectiveMapel,
      effectiveMateri,
      true
    );
    onNotify(
      `Tema & desain gambar diselaraskan otomatis dengan materi (${recommendedThemeMeta.nama}).`,
      "info"
    );
  };

  const toggleQuestionType = (qType: string) => {
    setSelectedQuestionTypes((prev) => {
      if (prev.includes(qType)) {
        return prev.length > 1 ? prev.filter((t) => t !== qType) : prev;
      }
      return [...prev, qType];
    });
  };

  const handleSuggestTopicsAi = async () => {
    setIsSuggestingTopics(true);
    try {
      const res = await fetch("/api/curriculum/suggest-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fase: currentPhase.kodeFase,
          kelas,
          mapel: effectiveMapel,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Gagal mengambil rekomendasi materi.");
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        setAiSuggestedTopics(data.topics);
        onNotify(
          `Berhasil memuat ${data.topics.length} ide materi kreatif AI.`,
          "success"
        );
      }
    } catch (err) {
      onNotify(
        err instanceof Error ? err.message : "Gagal memuat saran materi.",
        "error"
      );
    } finally {
      setIsSuggestingTopics(false);
    }
  };

  const handleGenerateLkpd = async () => {
    if (mapelMode === "manual" && !mapelManual.trim()) {
      onNotify("Silakan tulis nama Mata Pelajaran terlebih dahulu.", "error");
      return;
    }
    if (materiMode === "manual" && !materiManual.trim()) {
      onNotify("Silakan tulis judul Materi Pokok terlebih dahulu.", "error");
      return;
    }

    const chosenTheme = autoSyncTopicDesign
      ? detectedTopicProfile.recommendedTheme
      : doc.temaVisual;

    setIsGeneratingLkpd(true);
    try {
      const res = await fetch("/api/lkpd/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fase: currentPhase.kodeFase,
          kelas,
          semester,
          mapel: effectiveMapel,
          materi: effectiveMateri,
          subMateri,
          alokasiWaktu,
          modelPembelajaran,
          temaVisual: chosenTheme,
          jumlahSoal,
          semuaSoalBergambar,
          tipeSoalPilihan: selectedQuestionTypes,
          instruksiTambahan,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Gagal menyusun LKPD otomatis.");

      const generated = data.lkpd;
      const defaultImg = inferVisualForSubjectAndTheme(
        effectiveMapel,
        chosenTheme,
        effectiveMateri,
        currentPhase.kodeFase
      );

      const newDoc: LKPDDocument = {
        id: `lkpd_${Date.now()}`,
        updatedAt: new Date().toISOString(),
        namaSekolah:
          namaSekolah.trim() || "Satuan Pendidikan Kurikulum Merdeka",
        namaGuru: namaGuru.trim(),
        fase: currentPhase.kodeFase,
        kelas,
        semester,
        mapel: effectiveMapel,
        materi: effectiveMateri,
        subMateri,
        alokasiWaktu,
        modelPembelajaran,
        temaVisual: chosenTheme,
        smartLayoutMode: doc.smartLayoutMode ?? SmartLayoutMode.AUTO,
        judul: generated.judul || `LKPD ${effectiveMateri}`,
        subjudul:
          generated.subjudul || `Eksplorasi Kreatif ${effectiveMapel}`,
        capaianPembelajaran: generated.capaianPembelajaran || "",
        tujuanPembelajaran: Array.isArray(generated.tujuanPembelajaran)
          ? generated.tujuanPembelajaran
          : [],
        petunjukBelajar: Array.isArray(generated.petunjukBelajar)
          ? generated.petunjukBelajar
          : [],
        alatDanBahan: Array.isArray(generated.alatDanBahan)
          ? generated.alatDanBahan
          : [],
        ringkasanMateri: generated.ringkasanMateri || "",
        poinPenting: Array.isArray(generated.poinPenting)
          ? generated.poinPenting
          : [],
        gambarUtamaUrl: defaultImg,
        tampilkanGambarUtama: true,
        ilustrasiUtamaSvg: generated.ilustrasiUtamaSvg || "",
        tampilkanDiagramSvg: Boolean(generated.ilustrasiUtamaSvg),
        keteranganIlustrasi: generated.keteranganIlustrasi || "",
        aktivitasEksplorasi: generated.aktivitasEksplorasi || {
          judulAktivitas: "Aktivitas Pengamatan",
          instruksi: "Lengkapi tabel hasil diskusi berikut!",
          kolomTabel: ["No", "Aspek Pengamatan", "Hasil Temuan"],
          barisContoh: [["1", "", ""]],
        },
        daftarSoal: Array.isArray(generated.daftarSoal)
          ? generated.daftarSoal.map((q: QuestionItem, idx: number) => ({
              ...q,
              id: `gen_q_${Date.now()}_${idx}`,
              fase: currentPhase.kodeFase,
              kelas,
              mapel: effectiveMapel,
              materi: effectiveMateri,
            }))
          : [],
        refleksiSiswa: Array.isArray(generated.refleksiSiswa)
          ? generated.refleksiSiswa
          : [],
      };

      onChangeDoc(newDoc);
      setMobilePane("preview");
      onNotify(
        `LKPD dengan Smart Layout & desain ${getThemeMeta(chosenTheme).nama} berhasil disusun!`,
        "success"
      );
    } catch (err) {
      onNotify(
        err instanceof Error
          ? err.message
          : "Terjadi kendala saat menyusun LKPD.",
        "error"
      );
    } finally {
      setIsGeneratingLkpd(false);
    }
  };

  const handleRegenerateMainDiagram = async () => {
    setIsRegeneratingMainDiagram(true);
    try {
      const res = await fetch("/api/lkpd/regenerate-diagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topik: `${doc.mapel} - ${doc.materi}`,
          materi: doc.materi,
          konteks: `Untuk siswa ${doc.kelas} (${doc.fase})`,
          ukuran: "utama",
          temaVisual: doc.temaVisual,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Gagal membuat ulang diagram.");
      if (data.svg) {
        onChangeDoc({
          ...doc,
          ilustrasiUtamaSvg: data.svg,
          tampilkanDiagramSvg: true,
          keteranganIlustrasi: data.keterangan || doc.keteranganIlustrasi,
        });
        onNotify(
          "Diagram visual materi berhasil diperbarui sesuai tema!",
          "success"
        );
      }
    } catch (err) {
      onNotify(
        err instanceof Error ? err.message : "Gagal memperbarui diagram.",
        "error"
      );
    } finally {
      setIsRegeneratingMainDiagram(false);
    }
  };

  const handleRegenerateQuestionDiagram = async (questionId: string) => {
    const targetQ = doc.daftarSoal.find((q) => q.id === questionId);
    if (!targetQ) return;
    setRegeneratingQuestionId(questionId);
    try {
      const res = await fetch("/api/lkpd/regenerate-diagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topik: targetQ.pertanyaan,
          materi: doc.materi,
          konteks: `Gambar stimulus berwarna soal ${targetQ.tipe} materi ${doc.materi} (${doc.mapel} ${doc.kelas})`,
          ukuran: "soal",
          temaVisual: doc.temaVisual,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Gagal membuat diagram soal.");
      if (data.svg) {
        onChangeDoc({
          ...doc,
          daftarSoal: doc.daftarSoal.map((q) =>
            q.id === questionId ? { ...q, ilustrasiSoalSvg: data.svg } : q
          ),
        });
        onNotify(
          "Ilustrasi soal berhasil digambar ulang sesuai tema desain!",
          "success"
        );
      }
    } catch (err) {
      onNotify(
        err instanceof Error ? err.message : "Gagal membuat diagram soal.",
        "error"
      );
    } finally {
      setRegeneratingQuestionId(null);
    }
  };

  const handleRestyleAllQuestionsSvgAi = async () => {
    if (doc.daftarSoal.length === 0) return;
    setIsRestylingQuestionsSvg(true);
    try {
      const res = await fetch("/api/lkpd/restyle-questions-svg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mapel: doc.mapel,
          materi: doc.materi,
          kelas: doc.kelas,
          temaVisual: doc.temaVisual,
          questions: doc.daftarSoal,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error || "Gagal menyesuaikan ilustrasi soal dengan tema."
        );
      const mapById = new Map<string, string>();
      for (const item of data.illustrations ?? []) {
        if (item.id && item.svg) {
          mapById.set(item.id, item.svg);
        }
      }
      onChangeDoc({
        ...doc,
        daftarSoal: doc.daftarSoal.map((q) => ({
          ...q,
          ilustrasiSoalSvg: mapById.get(q.id) || q.ilustrasiSoalSvg,
        })),
      });
      onNotify(
        `Seluruh ilustrasi soal berhasil digambar berwarna sesuai tema ${
          getThemeMeta(doc.temaVisual).nama
        }!`,
        "success"
      );
    } catch (err) {
      onNotify(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui ilustrasi soal.",
        "error"
      );
    } finally {
      setIsRestylingQuestionsSvg(false);
    }
  };

  const applyIdentityToDoc = (patch: Partial<LKPDDocument>) => {
    onChangeDoc({ ...doc, ...patch });
  };

  const subjectCategories = Array.from(
    new Set(availableSubjects.map((s) => s.kategoriMapel))
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* VIBRANT COLORFUL STUDIO BANNER WITH 50 TEMA & DESAIN GAMBAR SELECTOR */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-800 via-indigo-700 to-teal-700 p-5 sm:p-6 text-white shadow-sm no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              Studio LKPD Smart Layout & 50 Tema Desain Gambar Lembar Kerja
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Dilengkapi Smart Layout CSS Grid yang otomatis menyusun ulang gambar utama, teks materi, dan daftar soal sesuai panjang konten, serta 50 Tema dan Desain Gambar (termasuk Fotografi Realistik, Kartun, Anime, 2D, 3D, Nusantara, & Klasik).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenBankSoalPicker}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <Library className="w-4 h-4" />
              <span>Ambil dari Bank Soal</span>
            </button>
          </div>
        </div>

        {/* Interactive 50 Tema dan Desain Gambar Lembar Kerja Strip */}
        <div className="mt-4 pt-4 border-t border-white/20 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-sky-100">
            <div className="inline-flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" />
              <span>
                Tema dan Desain Gambar Lembar Kerja (50 Desain — Termasuk Realistik):
              </span>
            </div>
            {autoSyncTopicDesign ? (
              <span className="text-amber-200">
                Mode Otomatis Materi Aktif (#{String(recommendedThemeMeta.nomorUrut).padStart(2, "0")}{" "}
                {recommendedThemeMeta.nama})
              </span>
            ) : (
              <button
                type="button"
                onClick={handleEnableAutoTopicDesign}
                className="text-amber-200 hover:text-white underline cursor-pointer"
              >
                Aktifkan Kembali Desain Otomatis Sesuai Materi
              </button>
            )}
          </div>

          {/* 8 Family Filter Tabs in Banner */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {THEME_FAMILY_TABS.map((tab) => {
              const isCatActive = themeCategoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setThemeCategoryFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                    isCatActive
                      ? "bg-amber-300 text-slate-950 shadow-2xs"
                      : "bg-white/10 text-sky-100 hover:bg-white/20"
                  }`}
                >
                  {tab.shortLabel} ({tab.count})
                </button>
              );
            })}
          </div>

          {/* Scrollable Quick Strip of Filtered Themes */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filteredThemes.map((theme) => {
              const isSelected = doc.temaVisual === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeSelect(theme.id)}
                  title={`${theme.nama} — ${theme.gayaGambarLabel}: ${theme.deskripsi}`}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-sm ring-2 ring-amber-300"
                      : "bg-white/12 text-white hover:bg-white/22"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full bg-gradient-to-br ${theme.swatchGradient} shrink-0`}
                  />
                  <span className="font-mono text-[10px] opacity-75">
                    #{String(theme.nomorUrut).padStart(2, "0")}
                  </span>
                  <span>{theme.nama}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Pane Switcher */}
      <div className="lg:hidden flex items-center gap-1 p-1 bg-indigo-100/80 rounded-xl no-print">
        <button
          type="button"
          onClick={() => setMobilePane("form")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            mobilePane === "form"
              ? "bg-white text-indigo-950 shadow-xs"
              : "text-indigo-800/80 hover:text-indigo-950"
          }`}
        >
          1. Pengaturan Materi, Desain & Grid
        </button>
        <button
          type="button"
          onClick={() => setMobilePane("preview")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap tabular-nums cursor-pointer ${
            mobilePane === "preview"
              ? "bg-white text-indigo-950 shadow-xs"
              : "text-indigo-800/80 hover:text-indigo-950"
          }`}
        >
          2. Pratinjau LKPD ({doc.daftarSoal.length} Butir)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT ZONE: COMPLETE CURRICULUM, MODEL, QUESTION TYPE, 50 THEMES & SMART LAYOUT */}
        <aside
          className={`lg:col-span-4 xl:col-span-4 bg-white border border-indigo-100 rounded-2xl p-5 space-y-5 shadow-2xs ${
            mobilePane === "form" ? "block" : "hidden lg:block"
          }`}
        >
          {/* A. Pemilihan Fase, Kelas, Mapel, & Materi */}
          <div className="space-y-3">
            <h2 className="font-display text-base font-bold text-indigo-950">
              A. Jenjang Fase, Kelas & Materi
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Fase Kurikulum
                </label>
                <select
                  value={selectedPhaseId}
                  onChange={(e) => handlePhaseSelect(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {CURRICULUM_PHASES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.namaFase}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Kelas (Otomatis Sinkron)
                </label>
                <select
                  value={kelas}
                  onChange={(e) => handleDirectKelasSelect(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {CURRICULUM_PHASES.map((group) => (
                    <optgroup key={group.id} label={group.namaFase}>
                      {group.rentangKelas.map((kls) => (
                        <option key={kls} value={kls}>
                          {kls}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Mata Pelajaran Lengkap (Otomatis / Manual) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-700">
                  Mata Pelajaran ({availableSubjects.length} Mapel Tersedia)
                </label>
                <div className="flex items-center gap-1 p-0.5 bg-indigo-50 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMapelMode("auto")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      mapelMode === "auto"
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Otomatis
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapelMode("manual")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      mapelMode === "manual"
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tulis Manual
                  </button>
                </div>
              </div>

              {mapelMode === "auto" ? (
                <select
                  value={mapelAuto}
                  onChange={(e) => handleSubjectAutoSelect(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {subjectCategories.map((cat) => (
                    <optgroup key={cat} label={cat}>
                      {availableSubjects
                        .filter((s) => s.kategoriMapel === cat)
                        .map((sub) => (
                          <option key={sub.id} value={sub.nama}>
                            {sub.nama}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={mapelManual}
                  onChange={(e) => {
                    setMapelManual(e.target.value);
                    if (e.target.value.trim().length >= 3) {
                      syncDocDesignWithSelection(
                        currentPhase.kodeFase,
                        kelas,
                        e.target.value.trim(),
                        effectiveMateri
                      );
                    }
                  }}
                  placeholder="Ketik mata pelajaran (misal: Bahasa Sunda, Tata Boga, Koding)"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              )}
            </div>

            {/* Materi Pokok (Otomatis / Saran AI / Manual) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-700">
                  Materi Pokok Pembelajaran
                </label>
                <div className="flex items-center gap-1 p-0.5 bg-indigo-50 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMateriMode("auto")}
                    disabled={
                      mapelMode === "manual" && aiSuggestedTopics.length === 0
                    }
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 ${
                      materiMode === "auto"
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Otomatis
                  </button>
                  <button
                    type="button"
                    onClick={() => setMateriMode("manual")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      materiMode === "manual"
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tulis Manual
                  </button>
                </div>
              </div>

              {materiMode === "auto" &&
              (availableTopics.length > 0 || aiSuggestedTopics.length > 0) ? (
                <select
                  value={materiAuto}
                  onChange={(e) => handleTopicAutoSelect(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {availableTopics.length > 0 && (
                    <optgroup label="Materi Kurikulum Merdeka">
                      {availableTopics.map((topik) => (
                        <option key={topik} value={topik}>
                          {topik}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {aiSuggestedTopics.length > 0 && (
                    <optgroup label="Rekomendasi Materi AI">
                      {aiSuggestedTopics.map((item, idx) => (
                        <option key={idx} value={item.judulMateri}>
                          {item.judulMateri}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  value={materiManual}
                  onChange={(e) => handleManualMateriChange(e.target.value)}
                  placeholder="Ketik judul materi bebas sesuai kebutuhan kelas..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              )}

              {/* Live Topic Design Alignment Feedback Card */}
              <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50/90 via-indigo-50/60 to-amber-50/60 p-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-indigo-950">
                    Desain Materi: {detectedTopicProfile.namaDomain}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {detectedTopicProfile.deskripsiVisualMateri}
                </p>
                <label className="inline-flex items-center gap-2 pt-0.5 text-[11px] font-semibold text-indigo-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSyncTopicDesign}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setAutoSyncTopicDesign(next);
                      if (next) {
                        syncDocDesignWithSelection(
                          currentPhase.kodeFase,
                          kelas,
                          effectiveMapel,
                          effectiveMateri,
                          true
                        );
                      }
                    }}
                    className="rounded border-slate-300 text-indigo-600"
                  />
                  <span>
                    Sesuaikan tema otomatis (#{String(recommendedThemeMeta.nomorUrut).padStart(2, "0")}{" "}
                    {recommendedThemeMeta.nama})
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleSuggestTopicsAi}
                disabled={isSuggestingTopics}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isSuggestingTopics
                    ? "Mencari rekomendasi materi..."
                    : "Minta Ide Materi Kreatif dari AI"}
                </span>
              </button>

              {aiSuggestedTopics.length > 0 && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-2.5 space-y-1.5 max-h-36 overflow-y-auto">
                  {aiSuggestedTopics.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setMateriMode("manual");
                        handleManualMateriChange(t.judulMateri);
                      }}
                      className="w-full text-left rounded-lg bg-white border border-indigo-100 hover:border-indigo-300 px-2.5 py-1.5 text-xs transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-slate-900">
                        {t.judulMateri}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Visual: {t.ideVisual}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              <input
                type="text"
                value={subMateri}
                onChange={(e) => setSubMateri(e.target.value)}
                placeholder="Sub-materi / fokus spesifik (opsional)"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* B. Model Pembelajaran Lengkap & Identitas */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h2 className="font-display text-base font-bold text-indigo-950">
              B. Model Pembelajaran & Identitas
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model Pembelajaran ({LEARNING_MODELS.length} Model Lengkap)
              </label>
              <select
                value={modelPembelajaran}
                onChange={(e) => {
                  setModelPembelajaran(e.target.value);
                  applyIdentityToDoc({ modelPembelajaran: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {LEARNING_MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  value={namaSekolah}
                  onChange={(e) => {
                    setNamaSekolah(e.target.value);
                    applyIdentityToDoc({ namaSekolah: e.target.value });
                  }}
                  placeholder="SD/SMP/SMA/SMK..."
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Guru
                </label>
                <input
                  type="text"
                  value={namaGuru}
                  onChange={(e) => {
                    setNamaGuru(e.target.value);
                    applyIdentityToDoc({ namaGuru: e.target.value });
                  }}
                  placeholder="Nama & gelar"
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    applyIdentityToDoc({ semester: e.target.value });
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900"
                >
                  <option value="Semester 1">Semester 1 (Ganjil)</option>
                  <option value="Semester 2">Semester 2 (Genap)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alokasi Waktu
                </label>
                <input
                  type="text"
                  value={alokasiWaktu}
                  onChange={(e) => {
                    setAlokasiWaktu(e.target.value);
                    applyIdentityToDoc({ alokasiWaktu: e.target.value });
                  }}
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* C. Variasi Bentuk Soal Bergambar Lengkap */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h2 className="font-display text-base font-bold text-indigo-950">
              C. Variasi Bentuk Soal Bergambar
            </h2>

            <div>
              <div className="flex items-center justify-between text-xs mb-1 tabular-nums">
                <label
                  htmlFor="slider-jumlah-soal"
                  className="font-semibold text-slate-700"
                >
                  Jumlah Butir Soal / Aktivitas
                </label>
                <span className="font-mono font-bold text-indigo-700">
                  {jumlahSoal} Butir
                </span>
              </div>
              <input
                id="slider-jumlah-soal"
                type="range"
                min={2}
                max={10}
                step={1}
                value={jumlahSoal}
                onChange={(e) => setJumlahSoal(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <label className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 text-xs font-semibold text-amber-950 cursor-pointer">
              <input
                type="checkbox"
                checked={semuaSoalBergambar}
                onChange={(e) => setSemuaSoalBergambar(e.target.checked)}
                className="mt-0.5 rounded border-amber-400 text-amber-600"
              />
              <span>
                Buat semua butir soal bergambar & berwarna sesuai tema desain
              </span>
            </label>

            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pilih Bentuk Soal (Bisa kombinasi banyak sekaligus):
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {QUESTION_TYPES_CATALOG.map((item) => {
                  const active = selectedQuestionTypes.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleQuestionType(item.id)}
                      title={item.deskripsi}
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap overflow-hidden ${
                        active
                          ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          active ? "opacity-100 text-indigo-600" : "opacity-0"
                        }`}
                      />
                      <span className="truncate">{item.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* D. Tema dan Desain Gambar Lembar Kerja (50 Desain Termasuk Realistik) */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-indigo-950">
                D. Tema dan Desain Gambar Lembar Kerja
              </h2>
              <span className="font-mono text-[11px] font-bold text-indigo-700 tabular-nums shrink-0">
                50 Desain
              </span>
            </div>

            {/* Active Theme Summary Box */}
            <div className="rounded-xl border border-indigo-200/80 bg-indigo-50/50 p-2.5 space-y-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 truncate">
                  <span
                    className={`w-3 h-3 rounded-full bg-gradient-to-br ${activeThemeMeta.swatchGradient} shrink-0`}
                  />
                  <span className="truncate">
                    #{String(activeThemeMeta.nomorUrut).padStart(2, "0")}{" "}
                    {activeThemeMeta.nama}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-700 shrink-0">
                  {activeThemeMeta.gayaGambarLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {activeThemeMeta.deskripsi}
              </p>
            </div>

            {/* Search Input across 50 Themes */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={themeSearchQuery}
                onChange={(e) => setThemeSearchQuery(e.target.value)}
                placeholder="Cari 50 desain: realistik, lab, kartun, 3D, batik..."
                className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Category Filter Buttons (8 Families incl. Realistik) */}
            <div className="flex flex-wrap gap-1">
              {THEME_FAMILY_TABS.map((tab) => {
                const active = themeCategoryFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setThemeCategoryFilter(tab.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer tabular-nums ${
                      active
                        ? "bg-indigo-700 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                    }`}
                  >
                    {tab.shortLabel} ({tab.count})
                  </button>
                );
              })}
            </div>

            {/* Scrollable 2-Column Grid of the 50 Tema & Desain Gambar */}
            <div className="max-h-64 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {filteredThemes.length === 0 ? (
                <p className="col-span-2 text-xs text-slate-500 text-center py-4">
                  Tidak ada tema desain yang cocok dengan kata kunci pencarian.
                </p>
              ) : (
                filteredThemes.map((t) => {
                  const isSelected = doc.temaVisual === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleThemeSelect(t.id)}
                      title={`${t.nama} (${t.gayaGambarLabel}): ${t.deskripsi}`}
                      className={`flex flex-col items-start gap-0.5 px-2.5 py-2 rounded-lg border text-left transition-all cursor-pointer overflow-hidden ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-950 text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 w-full">
                        <span
                          className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${t.swatchGradient} shrink-0`}
                        />
                        <span className="font-mono text-[10px] opacity-70 tabular-nums shrink-0">
                          {String(t.nomorUrut).padStart(2, "0")}.
                        </span>
                        <span className="text-xs font-semibold truncate">
                          {t.nama}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] truncate w-full pl-4 ${
                          isSelected ? "text-sky-200" : "text-slate-500"
                        }`}
                      >
                        {t.gayaGambarLabel}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* E. Smart Layout CSS Grid (Otomatis Responsif Panjang Konten) */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-indigo-950 inline-flex items-center gap-1.5">
                <LayoutGrid className="w-4 h-4 text-indigo-700" />
                <span>E. Smart Layout (CSS Grid)</span>
              </h2>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Menyusun ulang posisi gambar utama, ringkasan teks, dan kartu soal secara otomatis dengan CSS Grid sesuai panjang konten LKPD.
            </p>

            <div className="grid grid-cols-2 gap-1.5">
              {SMART_LAYOUT_OPTIONS.map((opt) => {
                const isSelected = activeSmartMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSmartLayoutChange(opt.id)}
                    title={opt.deskripsi}
                    className={`px-2.5 py-2 rounded-lg border text-xs font-semibold text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-teal-600 bg-teal-50 text-teal-950 shadow-2xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block truncate">{opt.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-teal-200/80 bg-teal-50/50 p-2.5 text-[11px] text-slate-700 space-y-1">
              <div>
                <strong className="font-semibold text-teal-950">
                  Susunan Materi:
                </strong>{" "}
                {smartLayoutPlan.materiLayoutLabel}
              </div>
              <div>
                <strong className="font-semibold text-teal-950">
                  Susunan Soal:
                </strong>{" "}
                {smartLayoutPlan.soalLayoutLabel}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 pt-1">
                Catatan Khusus Guru (Opsional)
              </label>
              <textarea
                rows={2}
                value={instruksiTambahan}
                onChange={(e) => setInstruksiTambahan(e.target.value)}
                placeholder="Misal: Buat cerita tokoh lokal Nusantara dan eksperimen dengan bahan dapur..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleGenerateLkpd}
              disabled={isGeneratingLkpd}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600 hover:from-sky-700 hover:via-indigo-700 hover:to-teal-700 disabled:opacity-60 text-white text-sm font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Wand2
                className={`w-4 h-4 ${isGeneratingLkpd ? "animate-spin" : ""}`}
              />
              <span>
                {isGeneratingLkpd
                  ? "Menyusun LKPD & Ilustrasi..."
                  : "Generate LKPD Sesuai Materi"}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenBankSoalPicker}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/80 text-indigo-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Library className="w-4 h-4 text-indigo-700" />
              <span>Sisipkan Soal dari Bank Soal</span>
            </button>
          </div>
        </aside>

        {/* RIGHT ZONE: WORKSPACE TOOLBAR & LIVE A4 LKPD PREVIEW */}
        <section
          className={`lg:col-span-8 xl:col-span-8 space-y-4 ${
            mobilePane === "preview" || isExportingPdf
              ? "block"
              : "hidden lg:block"
          }`}
        >
          {/* Workspace Control Toolbar */}
          <div className="bg-white border border-indigo-100 rounded-2xl p-3 sm:p-4 space-y-2.5 shadow-2xs no-print">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-indigo-50 rounded-xl">
                  <button
                    type="button"
                    onClick={() => onToggleAnswerKey(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      !showAnswerKey
                        ? "bg-white text-indigo-950 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Lembar Siswa
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleAnswerKey(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      showAnswerKey
                        ? "bg-white text-emerald-800 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    + Kunci & Rubrik Guru
                  </button>
                </div>

                {/* Live Smart Layout CSS Grid Quick Switcher */}
                <label className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50/70 px-2.5 py-1.5 text-xs font-semibold text-teal-950">
                  <LayoutGrid className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span className="hidden sm:inline">Smart Layout:</span>
                  <select
                    value={activeSmartMode}
                    onChange={(e) =>
                      handleSmartLayoutChange(e.target.value as SmartLayoutMode)
                    }
                    className="bg-transparent font-bold text-teal-950 focus:outline-none cursor-pointer"
                    aria-label="Pilih mode Smart Layout CSS Grid"
                  >
                    {SMART_LAYOUT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.shortLabel}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestyleAllQuestionsSvgAi}
                  disabled={
                    isRestylingQuestionsSvg || doc.daftarSoal.length === 0
                  }
                  title="Gambar ulang seluruh ilustrasi vektor soal agar selaras penuh dengan tema desain & materi saat ini"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      isRestylingQuestionsSvg ? "animate-spin" : ""
                    }`}
                  />
                  <span>
                    {isRestylingQuestionsSvg
                      ? "Menggambar Soal..."
                      : "Gambar Soal Sesuai Tema"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    isEditing
                      ? "border-indigo-400 bg-indigo-50 text-indigo-950"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <PencilLine className="w-3.5 h-3.5" />
                  <span>{isEditing ? "Selesai Edit" : "Edit Isi & Gambar"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSaveToArchive(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <BookmarkCheck className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Simpan Arsip</span>
                </button>

                <button
                  type="button"
                  onClick={() => onExportPdf(false)}
                  disabled={isExportingPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 disabled:opacity-50 text-white transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Siswa</span>
                </button>

                <button
                  type="button"
                  onClick={() => onExportPdf(true)}
                  disabled={isExportingPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>PDF + Kunci Guru</span>
                </button>
              </div>
            </div>

            {/* Unboxed Live Layout & Theme Summary Strip */}
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 tabular-nums">
              <span>
                Smart Layout CSS Grid:{" "}
                <strong className="font-semibold text-slate-700">
                  {smartLayoutPlan.materiLayoutLabel}
                </strong>{" "}
                ·{" "}
                <strong className="font-semibold text-slate-700">
                  {smartLayoutPlan.soalLayoutLabel}
                </strong>
              </span>
              <span>
                Desain Aktif:{" "}
                <strong className="font-semibold text-indigo-800">
                  #{String(activeThemeMeta.nomorUrut).padStart(2, "0")}{" "}
                  {activeThemeMeta.nama}
                </strong>{" "}
                ({activeThemeMeta.gayaGambarLabel})
              </span>
            </div>
          </div>

          {isGeneratingLkpd && (
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 px-5 py-4 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-indigo-950">
                  Sedang menyusun LKPD & soal bergambar berwarna sesuai materi "{effectiveMateri}"...
                </p>
                <p className="text-xs text-indigo-800">
                  Menyesuaikan Smart Layout CSS Grid, kop materi ({detectedTopicProfile.namaDomain}), gambar utama, serta ilustrasi pada setiap butir soal.
                </p>
              </div>
            </div>
          )}

          {/* Printable / Exportable A4 Worksheet Stage */}
          <LkpdPreviewSheet
            doc={doc}
            onChangeDoc={onChangeDoc}
            isEditing={isEditing}
            showAnswerKey={showAnswerKey}
            sheetRef={sheetRef}
            onRegenerateMainDiagram={handleRegenerateMainDiagram}
            isRegeneratingMainDiagram={isRegeneratingMainDiagram}
            regeneratingQuestionId={regeneratingQuestionId}
            onRegenerateQuestionDiagram={handleRegenerateQuestionDiagram}
            onOpenBankSoalModal={onOpenBankSoalPicker}
          />
        </section>
      </div>
    </div>
  );
};
