import React, { useEffect, useMemo, useState } from "react";
import {
  CheckSquare,
  FilePlus2,
  FlaskConical,
  BookOpenText,
  ImagePlus,
  Palette,
  Plus,
  Search,
  Sparkles,
  Square,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import {
  CURRICULUM_PHASES,
  QUESTION_TYPES_CATALOG,
  QUESTION_TYPE_LABELS,
  THEME_FAMILY_TABS,
  VISUAL_MEDIA_LIBRARY,
  VISUAL_THEMES_CATALOG,
  getThemeMeta,
} from "../data/curriculumData";
import {
  QuestionType,
  VisualTheme,
  type QuestionItem,
  type ThemeFamily,
} from "../types/lkpd";
import { detectTopicDomainProfile } from "../utils/topicDesignEngine";
import { QuestionVisualShowcase } from "./VisualIllustration";

interface BankSoalViewProps {
  questions: QuestionItem[];
  onAddQuestionsToBank: (newItems: QuestionItem[]) => void;
  onDeleteQuestionFromBank: (id: string) => void;
  onInsertIntoActiveLkpd: (selected: QuestionItem[]) => void;
  onCreateNewLkpdFromQuestions: (selected: QuestionItem[]) => void;
  onNotify: (msg: string, tone?: "success" | "error" | "info") => void;
  activeTheme?: VisualTheme;
  isModalMode?: boolean;
  onCloseModal?: () => void;
}

export const BankSoalView: React.FC<BankSoalViewProps> = ({
  questions,
  onAddQuestionsToBank,
  onDeleteQuestionFromBank,
  onInsertIntoActiveLkpd,
  onCreateNewLkpdFromQuestions,
  onNotify,
  activeTheme = VisualTheme.KARTUN,
  isModalMode = false,
  onCloseModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFase, setFilterFase] = useState<string>("ALL");
  const [filterTipe, setFilterTipe] = useState<string>("ALL");
  const [onlyIllustrated, setOnlyIllustrated] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewTheme, setPreviewTheme] = useState<VisualTheme>(activeTheme);
  const [previewThemeFamily, setPreviewThemeFamily] = useState<
    "ALL" | ThemeFamily
  >("ALL");

  useEffect(() => {
    setPreviewTheme(activeTheme);
  }, [activeTheme]);

  // AI Bank Soal Generator Drawer State
  const [showAiGenerator, setShowAiGenerator] = useState<boolean>(false);
  const [aiPhaseId, setAiPhaseId] = useState<string>("FASE_B");
  const [aiKelas, setAiKelas] = useState<string>("Kelas 4 SD / MI");
  const [aiMapelMode, setAiMapelMode] = useState<"auto" | "manual">("auto");
  const [aiMapelAuto, setAiMapelAuto] = useState<string>(
    "IPAS (Ilmu Pengetahuan Alam dan Sosial)"
  );
  const [aiMapelManual, setAiMapelManual] = useState<string>("");
  const [aiMateriMode, setAiMateriMode] = useState<"auto" | "manual">("auto");
  const [aiMateriAuto, setAiMateriAuto] = useState<string>(
    "Wujud Zat dan Perubahannya (Mencair, Membeku, Menguap)"
  );
  const [aiMateriManual, setAiMateriManual] = useState<string>("");
  const [aiTipeSoal, setAiTipeSoal] = useState<string>("campuran");
  const [aiJumlah, setAiJumlah] = useState<number>(4);
  const [aiTemaVisual, setAiTemaVisual] = useState<VisualTheme>(activeTheme);
  const [aiSertakanGambar, setAiSertakanGambar] = useState<boolean>(true);
  const [isGeneratingAiSoal, setIsGeneratingAiSoal] = useState<boolean>(false);

  // Manual Question Form Modal
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualPertanyaan, setManualPertanyaan] = useState("");
  const [manualTipe, setManualTipe] = useState<QuestionType>(
    QuestionType.CERITA_BERGAMBAR
  );
  const [manualFase, setManualFase] = useState("Fase B");
  const [manualKelas, setManualKelas] = useState("Kelas 4 SD / MI");
  const [manualMapel, setManualMapel] = useState(
    "IPAS (Ilmu Pengetahuan Alam dan Sosial)"
  );
  const [manualMateri, setManualMateri] = useState("Ekosistem dan Lingkungan");
  const [manualLevel, setManualLevel] = useState("L2 Penerapan");
  const [manualWacana, setManualWacana] = useState("");
  const [manualOpsi, setManualOpsi] = useState<string[]>(["", "", "", ""]);
  const [manualPernyataanBS, setManualPernyataanBS] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [manualAlatEksperimen, setManualAlatEksperimen] = useState("");
  const [manualLangkah, setManualLangkah] = useState<string[]>(["", "", ""]);
  const [manualPasanganKiri, setManualPasanganKiri] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [manualPasanganKanan, setManualPasanganKanan] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [manualKunci, setManualKunci] = useState("");
  const [manualPembahasan, setManualPembahasan] = useState("");
  const [manualSkor, setManualSkor] = useState(20);
  const [manualGambarUrl, setManualGambarUrl] = useState("");

  const aiPhaseObj =
    CURRICULUM_PHASES.find((p) => p.id === aiPhaseId) ?? CURRICULUM_PHASES[2];
  const aiSubjectObj =
    aiPhaseObj.mataPelajaran.find((s) => s.nama === aiMapelAuto) ??
    aiPhaseObj.mataPelajaran[0];

  const groupedAiSubjects = useMemo(() => {
    const groups: Record<string, typeof aiPhaseObj.mataPelajaran> = {};
    for (const sub of aiPhaseObj.mataPelajaran) {
      const cat = sub.kategoriMapel || "Mata Pelajaran";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(sub);
    }
    return Object.entries(groups);
  }, [aiPhaseObj]);

  const handleAiPhaseChange = (id: string) => {
    setAiPhaseId(id);
    const p = CURRICULUM_PHASES.find((item) => item.id === id);
    if (!p) return;
    setAiKelas(p.rentangKelas[0] ?? "");
    const firstSub = p.mataPelajaran[0];
    if (firstSub) {
      const nextMateri = firstSub.daftarMateri[0] ?? "";
      setAiMapelAuto(firstSub.nama);
      setAiMateriAuto(nextMateri);
      const rec = detectTopicDomainProfile(firstSub.nama, nextMateri, p.kodeFase);
      setAiTemaVisual(rec.recommendedTheme);
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (filterFase !== "ALL" && q.fase !== filterFase) return false;
      if (filterTipe !== "ALL" && q.tipe !== filterTipe) return false;
      if (onlyIllustrated && !q.ilustrasiSoalSvg && !q.gambarSoalUrl) return false;
      if (searchQuery.trim() !== "") {
        const kw = searchQuery.toLowerCase();
        const hay = `${q.pertanyaan} ${q.wacanaCerita ?? ""} ${q.mapel ?? ""} ${
          q.materi ?? ""
        } ${q.kelas ?? ""}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
  }, [questions, filterFase, filterTipe, onlyIllustrated, searchQuery]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = useMemo(
    () => questions.filter((q) => selectedIds.includes(q.id)),
    [questions, selectedIds]
  );

  const handleGenerateBankSoalAi = async () => {
    const mapelFinal =
      aiMapelMode === "manual" ? aiMapelManual.trim() : aiMapelAuto;
    const materiFinal =
      aiMateriMode === "manual" ? aiMateriManual.trim() : aiMateriAuto;
    if (!mapelFinal || !materiFinal) {
      onNotify("Lengkapi mata pelajaran dan materi untuk membuat soal AI.", "error");
      return;
    }

    setIsGeneratingAiSoal(true);
    try {
      const res = await fetch("/api/bank-soal/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fase: aiPhaseObj.kodeFase,
          kelas: aiKelas,
          mapel: mapelFinal,
          materi: materiFinal,
          jumlah: aiJumlah,
          tipeSoal: aiTipeSoal,
          sertakanGambar: aiSertakanGambar,
          temaVisual: aiTemaVisual,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat soal baru.");
      setPreviewTheme(aiTemaVisual);
      const created: QuestionItem[] = (data.questions ?? []).map(
        (q: QuestionItem, idx: number) => ({
          ...q,
          id: `ai_bs_${Date.now()}_${idx}`,
          fase: aiPhaseObj.kodeFase,
          kelas: aiKelas,
          mapel: mapelFinal,
          materi: materiFinal,
        })
      );
      onAddQuestionsToBank(created);
      setSelectedIds((prev) => [...prev, ...created.map((c) => c.id)]);
      setShowAiGenerator(false);
      onNotify(
        `${created.length} butir soal baru berhasil ditambahkan ke Bank Soal & dipilih!`,
        "success"
      );
    } catch (err) {
      onNotify(err instanceof Error ? err.message : "Gagal membuat soal AI.", "error");
    } finally {
      setIsGeneratingAiSoal(false);
    }
  };

  const handleSaveManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPertanyaan.trim()) {
      onNotify("Pertanyaan soal tidak boleh kosong.", "error");
      return;
    }
    const isChoiceType =
      manualTipe === QuestionType.PILIHAN_GANDA ||
      manualTipe === QuestionType.PILIHAN_GANDA_KOMPLEKS;
    const isStoryOrCase =
      manualTipe === QuestionType.CERITA_BERGAMBAR ||
      manualTipe === QuestionType.STUDI_KASUS;
    const isStepsType =
      manualTipe === QuestionType.EKSPERIMEN ||
      manualTipe === QuestionType.URUTKAN_LANGKAH;

    const newItem: QuestionItem = {
      id: `usr_bs_${Date.now()}`,
      fase: manualFase,
      kelas: manualKelas,
      mapel: manualMapel.trim() || "Umum",
      materi: manualMateri.trim() || "Materi Pilihan",
      pertanyaan: manualPertanyaan.trim(),
      tipe: manualTipe,
      levelKognitif: manualLevel,
      gambarSoalUrl: manualGambarUrl,
      ilustrasiSoalSvg: "",
      wacanaCerita: isStoryOrCase ? manualWacana.trim() : "",
      opsi: isChoiceType
        ? manualOpsi.map((o, idx) => o.trim() || `Pilihan ${idx + 1}`)
        : [],
      pernyataanBenarSalah:
        manualTipe === QuestionType.BENAR_SALAH
          ? manualPernyataanBS.map((p, idx) => p.trim() || `Pernyataan ${idx + 1}`)
          : [],
      alatEksperimen:
        manualTipe === QuestionType.EKSPERIMEN
          ? manualAlatEksperimen
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean)
          : [],
      langkahEksperimen: isStepsType
        ? manualLangkah.map((l, idx) => l.trim() || `Langkah ${idx + 1}`)
        : [],
      pasanganKiri:
        manualTipe === QuestionType.MENJODOHKAN
          ? manualPasanganKiri.map((k, idx) => k.trim() || `Item ${idx + 1}`)
          : [],
      pasanganKanan:
        manualTipe === QuestionType.MENJODOHKAN
          ? manualPasanganKanan.map((k, idx) => k.trim() || `Pasangan ${idx + 1}`)
          : [],
      kunciJawaban: manualKunci.trim() || "-",
      pembahasan: manualPembahasan.trim(),
      skor: Number(manualSkor) || 20,
    };

    onAddQuestionsToBank([newItem]);
    setSelectedIds((prev) => [...prev, newItem.id]);
    setManualPertanyaan("");
    setManualWacana("");
    setManualGambarUrl("");
    setShowManualModal(false);
    onNotify("Soal buatan guru berhasil disimpan ke Bank Soal.", "success");
  };

  return (
    <div
      className={
        isModalMode
          ? "space-y-5"
          : "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
      }
    >
      {/* Colorful Header Banner */}
      <div
        className={
          isModalMode
            ? "rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 p-4 text-white flex flex-wrap items-center justify-between gap-3"
            : "rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4"
        }
      >
        <div className="space-y-1 max-w-2xl">
          <h1
            className={`font-display font-bold tracking-tight ${
              isModalMode ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
            }`}
          >
            Bank Soal Kreatif Semua Fase (PAUD s.d. SMA/SMK)
          </h1>
          <p className="text-xs sm:text-sm text-sky-50 leading-relaxed">
            Koleksi 10 variasi soal lengkap: Cerita Bergambar, Eksperimen, Benar/Salah, PG Kompleks AKM, Studi Kasus, Urutkan Langkah, Menjodohkan, dan Uraian HOTS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowManualModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-xs sm:text-sm font-semibold text-white cursor-pointer whitespace-nowrap backdrop-blur-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Soal Manual</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAiGenerator((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buat Soal AI</span>
          </button>

          {isModalMode && onCloseModal && (
            <button
              type="button"
              onClick={onCloseModal}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
              aria-label="Tutup jendela Bank Soal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible AI Question Generator Panel */}
      {showAiGenerator && (
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-sky-50/80 to-teal-50/70 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                Generator Bank Soal Bergambar (AI Kurikulum Merdeka)
              </h2>
              <p className="text-xs text-slate-600">
                Pilih mata pelajaran otomatis di semua fase atau ketik topik khusus secara manual.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAiGenerator(false)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Tutup Panel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fase Kurikulum
              </label>
              <select
                value={aiPhaseId}
                onChange={(e) => handleAiPhaseChange(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
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
                Kelas
              </label>
              <select
                value={aiKelas}
                onChange={(e) => setAiKelas(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
              >
                {aiPhaseObj.rentangKelas.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Mata Pelajaran
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setAiMapelMode((m) => (m === "auto" ? "manual" : "auto"))
                  }
                  className="text-[11px] font-semibold text-indigo-700 hover:underline cursor-pointer"
                >
                  {aiMapelMode === "auto" ? "Ketik Manual" : "Pilih Otomatis"}
                </button>
              </div>
              {aiMapelMode === "auto" ? (
                <select
                  value={aiMapelAuto}
                  onChange={(e) => {
                    const nextMapel = e.target.value;
                    setAiMapelAuto(nextMapel);
                    const s = aiPhaseObj.mataPelajaran.find(
                      (item) => item.nama === nextMapel
                    );
                    const nextMateri = s?.daftarMateri[0] ?? "";
                    if (s) setAiMateriAuto(nextMateri);
                    const rec = detectTopicDomainProfile(
                      nextMapel,
                      nextMateri,
                      aiPhaseObj.kodeFase
                    );
                    setAiTemaVisual(rec.recommendedTheme);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                >
                  {groupedAiSubjects.map(([category, subs]) => (
                    <optgroup key={category} label={category}>
                      {subs.map((s) => (
                        <option key={s.id} value={s.nama}>
                          {s.nama}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={aiMapelManual}
                  onChange={(e) => setAiMapelManual(e.target.value)}
                  placeholder="Tulis nama mata pelajaran..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                />
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Materi Pokok
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setAiMateriMode((m) => (m === "auto" ? "manual" : "auto"))
                  }
                  className="text-[11px] font-semibold text-indigo-700 hover:underline cursor-pointer"
                >
                  {aiMateriMode === "auto" ? "Ketik Manual" : "Pilih Otomatis"}
                </button>
              </div>
              {aiMateriMode === "auto" && aiMapelMode === "auto" ? (
                <select
                  value={aiMateriAuto}
                  onChange={(e) => {
                    const nextMateri = e.target.value;
                    setAiMateriAuto(nextMateri);
                    const rec = detectTopicDomainProfile(
                      aiMapelAuto,
                      nextMateri,
                      aiPhaseObj.kodeFase
                    );
                    setAiTemaVisual(rec.recommendedTheme);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                >
                  {(aiSubjectObj?.daftarMateri ?? []).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={aiMateriManual}
                  onChange={(e) => {
                    const nextMateri = e.target.value;
                    setAiMateriManual(nextMateri);
                    if (nextMateri.trim().length > 2) {
                      const rec = detectTopicDomainProfile(
                        aiMapelMode === "manual" ? aiMapelManual : aiMapelAuto,
                        nextMateri,
                        aiPhaseObj.kodeFase
                      );
                      setAiTemaVisual(rec.recommendedTheme);
                    }
                  }}
                  placeholder="Ketik topik soal..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <label className="inline-flex items-center gap-2 font-semibold text-slate-700">
                <span>Bentuk Soal:</span>
                <select
                  value={aiTipeSoal}
                  onChange={(e) => setAiTipeSoal(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900"
                >
                  <option value="campuran">Campuran Variatif (Otomatis)</option>
                  {QUESTION_TYPES_CATALOG.map((qt) => (
                    <option key={qt.id} value={qt.id}>
                      {qt.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="inline-flex items-center gap-2 font-semibold text-slate-700 tabular-nums">
                <span>Jumlah:</span>
                <select
                  value={aiJumlah}
                  onChange={(e) => setAiJumlah(Number(e.target.value))}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900"
                >
                  <option value={2}>2 Soal</option>
                  <option value={3}>3 Soal</option>
                  <option value={4}>4 Soal</option>
                  <option value={5}>5 Soal</option>
                  <option value={6}>6 Soal</option>
                </select>
              </label>

              <label className="inline-flex items-center gap-2 font-semibold text-slate-700">
                <span>Tema & Desain Gambar (50):</span>
                <select
                  value={aiTemaVisual}
                  onChange={(e) => setAiTemaVisual(e.target.value as VisualTheme)}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 max-w-[230px]"
                >
                  {THEME_FAMILY_TABS.filter((tab) => tab.id !== "ALL").map(
                    (fam) => (
                      <optgroup key={fam.id} label={fam.label}>
                        {VISUAL_THEMES_CATALOG.filter(
                          (th) => th.kategoriGaya === fam.id
                        ).map((th) => (
                          <option key={th.id} value={th.id}>
                            #{String(th.nomorUrut).padStart(2, "0")} {th.nama} ({th.gayaGambarLabel})
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                </select>
              </label>

              <label className="inline-flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSertakanGambar}
                  onChange={(e) => setAiSertakanGambar(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Sertakan Ilustrasi Berwarna Sesuai Tema</span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleGenerateBankSoalAi}
              disabled={isGeneratingAiSoal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Wand2 className={`w-4 h-4 ${isGeneratingAiSoal ? "animate-spin" : ""}`} />
              <span>
                {isGeneratingAiSoal ? "Menyusun Soal..." : "Generate ke Bank Soal"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Search & Multi-Filter Control Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan, wacana cerita, mata pelajaran, kelas, atau topik..."
              className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-800"
          >
            <option value="ALL">Semua Bentuk Soal (10 Tipe)</option>
            {QUESTION_TYPES_CATALOG.map((qt) => (
              <option key={qt.id} value={qt.id}>
                {qt.label}
              </option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-sky-200 bg-sky-50/70 text-xs font-semibold text-sky-900 cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              checked={onlyIllustrated}
              onChange={(e) => setOnlyIllustrated(e.target.checked)}
              className="rounded border-slate-300 text-sky-600"
            />
            <span>Hanya Soal Bergambar</span>
          </label>
        </div>

        {/* Interactive Phase Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "ALL", label: "Semua Fase" },
            { id: "Fase Fondasi", label: "Fase Fondasi (PAUD)" },
            { id: "Fase A", label: "Fase A (Kls 1–2)" },
            { id: "Fase B", label: "Fase B (Kls 3–4)" },
            { id: "Fase C", label: "Fase C (Kls 5–6)" },
            { id: "Fase D", label: "Fase D (SMP)" },
            { id: "Fase E", label: "Fase E (Kls 10)" },
            { id: "Fase F", label: "Fase F (Kls 11–12)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterFase(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterFase === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Quick Question Format Filter Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5 pb-1">
          <button
            type="button"
            onClick={() => setFilterTipe("ALL")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              filterTipe === "ALL"
                ? "bg-amber-500 text-white"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
          >
            Semua Bentuk
          </button>
          {QUESTION_TYPES_CATALOG.map((qt) => (
            <button
              key={qt.id}
              type="button"
              onClick={() => setFilterTipe(qt.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterTipe === qt.id
                  ? "bg-teal-600 text-white"
                  : "bg-teal-50/70 text-teal-900 hover:bg-teal-100"
              }`}
            >
              {qt.shortLabel}
            </button>
          ))}
        </div>

        {/* Interactive 50 Tema dan Desain Gambar Preview Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1.5 border-t border-slate-100">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 shrink-0 mr-0.5">
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tema & Desain Gambar (50):</span>
          </span>
          <select
            value={previewThemeFamily}
            onChange={(e) =>
              setPreviewThemeFamily(e.target.value as "ALL" | ThemeFamily)
            }
            className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-800 shrink-0"
            aria-label="Filter kategori tema desain gambar"
          >
            {THEME_FAMILY_TABS.map((fam) => (
              <option key={fam.id} value={fam.id}>
                {fam.shortLabel} ({fam.count})
              </option>
            ))}
          </select>
          {VISUAL_THEMES_CATALOG.filter(
            (th) =>
              previewThemeFamily === "ALL" ||
              th.kategoriGaya === previewThemeFamily
          ).map((th) => {
            const isSelectedTheme = previewTheme === th.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setPreviewTheme(th.id)}
                title={`${th.nama} — ${th.gayaGambarLabel}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                  isSelectedTheme
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${th.swatchGradient}`}
                />
                <span>
                  #{String(th.nomorUrut).padStart(2, "0")} {th.nama}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Bar When Questions Are Selected */}
      {selectedItems.length > 0 && (
        <div className="rounded-2xl border border-sky-300 bg-gradient-to-r from-sky-50 via-indigo-50 to-teal-50 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="text-xs sm:text-sm font-bold text-indigo-950 tabular-nums">
            {selectedItems.length} butir soal terpilih siap dimasukkan ke Lembar Kerja
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-white cursor-pointer whitespace-nowrap"
            >
              Reset Pilihan
            </button>
            <button
              type="button"
              onClick={() => {
                onInsertIntoActiveLkpd(selectedItems);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambahkan ke LKPD Aktif</span>
            </button>
            {!isModalMode && (
              <button
                type="button"
                onClick={() => {
                  onCreateNewLkpdFromQuestions(selectedItems);
                  setSelectedIds([]);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
              >
                <FilePlus2 className="w-3.5 h-3.5" />
                <span>Rakit LKPD Baru dari Soal Ini</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Question Cards Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-3">
          <p className="text-base font-bold text-slate-800">
            Belum ada butir soal yang cocok dengan filter ini
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Coba tampilkan semua bentuk soal atau klik tombol Buat Soal AI untuk menghasilkan soal cerita bergambar, eksperimen, maupun benar/salah sesuai topik Anda.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterFase("ALL");
              setFilterTipe("ALL");
              setOnlyIllustrated(false);
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
          >
            Tampilkan Semua Soal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredQuestions.map((q, qIdx) => {
            const isSelected = selectedIds.includes(q.id);
            const typeLabel = QUESTION_TYPE_LABELS[q.tipe] || q.tipe;
            const currentThemeMeta = getThemeMeta(previewTheme);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border bg-white overflow-hidden transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-sky-600 ring-2 ring-sky-500/40 shadow-sm"
                    : "border-slate-200 hover:border-sky-300"
                }`}
              >
                <div>
                  {/* Theme-Synced Top Color Bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${currentThemeMeta.swatchGradient}`}
                  />

                  <div className="p-5 space-y-3">
                    {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-xs text-slate-500 leading-relaxed tabular-nums">
                        <span className="font-bold text-indigo-700">
                          {q.fase || "Umum"}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>{q.kelas || "-"}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-semibold text-teal-700">
                          {typeLabel}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>{q.levelKognitif}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono">Skor {q.skor}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSelect(q.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                          isSelected
                            ? "bg-sky-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-3.5 h-3.5" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                        <span>{isSelected ? "Terpilih" : "Pilih"}</span>
                      </button>
                    </div>

                    <div className="text-xs font-medium text-slate-600">
                      {q.mapel || "Mata Pelajaran"} — {q.materi || "Topik"}
                    </div>

                    {/* Colorful Theme-Aligned Visual Stimulus Showcase */}
                    {(q.gambarSoalUrl || q.ilustrasiSoalSvg) && (
                      <QuestionVisualShowcase
                        gambarSoalUrl={q.gambarSoalUrl}
                        ilustrasiSoalSvg={q.ilustrasiSoalSvg}
                        questionType={q.tipe}
                        questionIndex={qIdx}
                        temaVisual={previewTheme}
                        themeLabel={currentThemeMeta.nama}
                        altTitle={q.materi || "Ilustrasi Soal"}
                      />
                    )}

                    {/* Story / Case Study Narrative Preview */}
                    {q.wacanaCerita && q.wacanaCerita.trim() !== "" && (
                      <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3 text-xs text-slate-800 leading-relaxed space-y-1">
                        <div className="inline-flex items-center gap-1.5 font-bold text-amber-900">
                          <BookOpenText className="w-3.5 h-3.5" />
                          <span>
                            {q.tipe === "studi_kasus"
                              ? "Wacana Studi Kasus"
                              : "Wacana Cerita Bergambar"}
                          </span>
                        </div>
                        <p>{q.wacanaCerita}</p>
                      </div>
                    )}

                    {/* Experiment / Steps Preview */}
                    {((q.alatEksperimen && q.alatEksperimen.length > 0) ||
                      (q.langkahEksperimen && q.langkahEksperimen.length > 0)) && (
                      <div className="rounded-xl bg-teal-50/70 border border-teal-200/80 p-3 text-xs text-slate-800 space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 font-bold text-teal-900">
                          <FlaskConical className="w-3.5 h-3.5" />
                          <span>
                            {q.tipe === "urutkan_langkah"
                              ? "Pernyataan Tahapan (Acak)"
                              : "Panduan Mini Eksperimen"}
                          </span>
                        </div>
                        {q.alatEksperimen && q.alatEksperimen.length > 0 && (
                          <p className="text-[11px] text-teal-900">
                            <strong>Alat & Bahan:</strong> {q.alatEksperimen.join(", ")}
                          </p>
                        )}
                        {q.langkahEksperimen && q.langkahEksperimen.length > 0 && (
                          <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                            {q.langkahEksperimen.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ol>
                        )}
                      </div>
                    )}

                    {/* Question Stem */}
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {q.pertanyaan}
                    </p>

                    {/* Multiple Choice / Complex MC Options */}
                    {(q.tipe === "pilihan_ganda" ||
                      q.tipe === "pilihan_ganda_kompleks") &&
                      q.opsi.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                          {q.opsi.map((opt, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-1.5"
                            >
                              <span className="font-mono font-semibold mr-1.5 text-indigo-700">
                                {q.tipe === "pilihan_ganda_kompleks"
                                  ? "[ ]"
                                  : `${String.fromCharCode(65 + idx)}.`}
                              </span>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}

                    {/* True / False Statements Preview */}
                    {q.tipe === "benar_salah" &&
                      q.pernyataanBenarSalah &&
                      q.pernyataanBenarSalah.length > 0 && (
                        <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
                          {q.pernyataanBenarSalah.map((st, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2 px-3 py-1.5 border-b last:border-b-0 border-slate-100 bg-slate-50/60"
                            >
                              <span className="text-slate-700">
                                {idx + 1}. {st}
                              </span>
                              <span className="font-mono text-[11px] text-slate-500 shrink-0">
                                [B / S]
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Matching Pairs Preview */}
                    {q.tipe === "menjodohkan" && q.pasanganKiri.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          {q.pasanganKiri.map((leftItem, idx) => (
                            <div
                              key={idx}
                              className="rounded bg-indigo-50/60 border border-indigo-100 px-2 py-1 text-slate-800"
                            >
                              {idx + 1}. {leftItem}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-1">
                          {q.pasanganKanan.map((rightItem, idx) => (
                            <div
                              key={idx}
                              className="rounded bg-amber-50/60 border border-amber-100 px-2 py-1 text-slate-800"
                            >
                              {String.fromCharCode(65 + idx)}. {rightItem}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2 text-xs">
                  <div className="text-slate-600 truncate">
                    <strong className="font-semibold text-slate-800">Kunci:</strong>{" "}
                    {q.kunciJawaban}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onInsertIntoActiveLkpd([q])}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer whitespace-nowrap"
                    >
                      + Sisipkan ke LKPD
                    </button>
                    {q.id.startsWith("usr_") || q.id.startsWith("ai_") ? (
                      <button
                        type="button"
                        onClick={() => onDeleteQuestionFromBank(q.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                        aria-label="Hapus dari Bank Soal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manual Question Creation Modal (All 10 Question Formats Supported) */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Tulis Soal Baru ke Bank Soal
                </h2>
                <p className="text-xs text-slate-500">
                  Mendukung Cerita Bergambar, Eksperimen, Benar/Salah, PG Kompleks, Menjodohkan, & HOTS.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveManualQuestion}
              className="space-y-3.5 text-xs sm:text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fase Kurikulum
                  </label>
                  <select
                    value={manualFase}
                    onChange={(e) => setManualFase(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  >
                    {CURRICULUM_PHASES.map((p) => (
                      <option key={p.id} value={p.kodeFase}>
                        {p.namaFase}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kelas
                  </label>
                  <input
                    type="text"
                    value={manualKelas}
                    onChange={(e) => setManualKelas(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    value={manualMapel}
                    onChange={(e) => setManualMapel(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Materi Pokok
                  </label>
                  <input
                    type="text"
                    value={manualMateri}
                    onChange={(e) => setManualMateri(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bentuk Soal
                  </label>
                  <select
                    value={manualTipe}
                    onChange={(e) => setManualTipe(e.target.value as QuestionType)}
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs"
                  >
                    {QUESTION_TYPES_CATALOG.map((qt) => (
                      <option key={qt.id} value={qt.id}>
                        {qt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Level Kognitif
                  </label>
                  <select
                    value={manualLevel}
                    onChange={(e) => setManualLevel(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs"
                  >
                    <option value="L1 Pemahaman">L1 Pemahaman</option>
                    <option value="L2 Penerapan">L2 Penerapan</option>
                    <option value="L3 Penalaran HOTS">L3 Penalaran HOTS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Skor
                  </label>
                  <input
                    type="number"
                    value={manualSkor}
                    onChange={(e) => setManualSkor(Number(e.target.value) || 10)}
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs tabular-nums"
                  />
                </div>
              </div>

              {/* Conditional Story / Case Narrative */}
              {(manualTipe === QuestionType.CERITA_BERGAMBAR ||
                manualTipe === QuestionType.STUDI_KASUS) && (
                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    {manualTipe === QuestionType.CERITA_BERGAMBAR
                      ? "Wacana Cerita Bergambar"
                      : "Wacana Studi Kasus Kontekstual"}
                  </label>
                  <textarea
                    rows={3}
                    value={manualWacana}
                    onChange={(e) => setManualWacana(e.target.value)}
                    placeholder="Tuliskan cerita pendek atau deskripsi kasus nyata di sekitar siswa..."
                    className="w-full rounded-lg border border-amber-300 bg-amber-50/40 p-2.5 text-xs"
                  />
                </div>
              )}

              {/* Conditional Experiment / Sequence Steps */}
              {(manualTipe === QuestionType.EKSPERIMEN ||
                manualTipe === QuestionType.URUTKAN_LANGKAH) && (
                <div className="space-y-2 rounded-xl border border-teal-200 bg-teal-50/40 p-3">
                  {manualTipe === QuestionType.EKSPERIMEN && (
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1">
                        Alat & Bahan Eksperimen (pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={manualAlatEksperimen}
                        onChange={(e) => setManualAlatEksperimen(e.target.value)}
                        placeholder="Contoh: Gelas bening, Air hangat, Es batu, Sendok"
                        className="w-full rounded-lg border border-teal-300 bg-white px-3 py-1.5 text-xs"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1">
                      {manualTipe === QuestionType.URUTKAN_LANGKAH
                        ? "Daftar Langkah / Peristiwa Acak"
                        : "Langkah Kerja Percobaan"}
                    </label>
                    <div className="space-y-1.5">
                      {manualLangkah.map((stepVal, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={stepVal}
                          onChange={(e) => {
                            const copy = [...manualLangkah];
                            copy[idx] = e.target.value;
                            setManualLangkah(copy);
                          }}
                          placeholder={`Tahap ${idx + 1}...`}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pertanyaan Utama / Instruksi Tugas Siswa
                </label>
                <textarea
                  rows={2}
                  required
                  value={manualPertanyaan}
                  onChange={(e) => setManualPertanyaan(e.target.value)}
                  placeholder="Tuliskan kalimat pertanyaan dengan jelas..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs"
                />
              </div>

              {/* Image Picker: Preset Cartoon/Anime/3D/Storybook OR Upload */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold cursor-pointer">
                    <ImagePlus className="w-4 h-4 text-indigo-700" />
                    <span>
                      {manualGambarUrl ? "Ganti Gambar Unggahan" : "Unggah Gambar Soal"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          const res = reader.result;
                          if (typeof res === "string") {
                            setManualGambarUrl(res);
                          }
                        };
                        reader.readAsDataURL(f);
                      }}
                    />
                  </label>

                  <select
                    value={
                      VISUAL_MEDIA_LIBRARY.some((v) => v.src === manualGambarUrl)
                        ? manualGambarUrl
                        : ""
                    }
                    onChange={(e) => setManualGambarUrl(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700"
                  >
                    <option value="">
                      Atau pilih Foto Realistik / Kartun / Anime / 3D (18 Visual)...
                    </option>
                    {VISUAL_MEDIA_LIBRARY.map((vis) => (
                      <option key={vis.id} value={vis.src}>
                        {vis.isRealisticPhoto ? `[Foto Realistik] ${vis.judul}` : vis.judul}
                      </option>
                    ))}
                  </select>
                </div>

                {manualGambarUrl && (
                  <img
                    src={manualGambarUrl}
                    alt="Pratinjau gambar soal"
                    className="max-h-32 rounded-lg border border-slate-200"
                  />
                )}
              </div>

              {/* Options for PG & PG Kompleks */}
              {(manualTipe === QuestionType.PILIHAN_GANDA ||
                manualTipe === QuestionType.PILIHAN_GANDA_KOMPLEKS) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {manualOpsi.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={val}
                      onChange={(e) => {
                        const copy = [...manualOpsi];
                        copy[idx] = e.target.value;
                        setManualOpsi(copy);
                      }}
                      placeholder={`Pilihan ${String.fromCharCode(65 + idx)}`}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  ))}
                </div>
              )}

              {/* Statements for Benar / Salah */}
              {manualTipe === QuestionType.BENAR_SALAH && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Daftar Pernyataan Benar / Salah
                  </label>
                  {manualPernyataanBS.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={val}
                      onChange={(e) => {
                        const copy = [...manualPernyataanBS];
                        copy[idx] = e.target.value;
                        setManualPernyataanBS(copy);
                      }}
                      placeholder={`Pernyataan ${idx + 1}`}
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  ))}
                </div>
              )}

              {/* Pairs for Menjodohkan */}
              {manualTipe === QuestionType.MENJODOHKAN && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-700">
                      Lajur Kiri (Pernyataan)
                    </span>
                    {manualPasanganKiri.map((val, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const copy = [...manualPasanganKiri];
                          copy[idx] = e.target.value;
                          setManualPasanganKiri(copy);
                        }}
                        placeholder={`Kiri ${idx + 1}`}
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      />
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-700">
                      Lajur Kanan (Pasangan)
                    </span>
                    {manualPasanganKanan.map((val, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const copy = [...manualPasanganKanan];
                          copy[idx] = e.target.value;
                          setManualPasanganKanan(copy);
                        }}
                        placeholder={`Kanan ${String.fromCharCode(65 + idx)}`}
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={manualKunci}
                  onChange={(e) => setManualKunci(e.target.value)}
                  placeholder="Kunci jawaban..."
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  value={manualPembahasan}
                  onChange={(e) => setManualPembahasan(e.target.value)}
                  placeholder="Pembahasan singkat..."
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-xs font-semibold text-white cursor-pointer"
                >
                  Simpan ke Bank Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
