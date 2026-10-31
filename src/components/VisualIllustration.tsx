import React, { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { VisualTheme } from "../types/lkpd";
import {
  adaptQuestionSvgToTheme,
  getQuestionShowcasePalette,
} from "../utils/topicDesignEngine";

interface SafeImageProps {
  src?: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export const SafeIllustrationImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-amber-50/40 to-emerald-50 border border-slate-200 rounded-xl p-6 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 text-sky-600 mb-2" />
        <p className="text-sm font-semibold text-slate-800">{fallbackTitle}</p>
        <p className="text-xs text-slate-500 mt-1">Ilustrasi Materi Pembelajaran</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface SvgDiagramBlockProps {
  svgMarkup?: string;
  caption?: string;
  temaVisual?: VisualTheme;
}

export const SvgDiagramBlock: React.FC<SvgDiagramBlockProps> = ({
  svgMarkup,
  caption,
  temaVisual = VisualTheme.KARTUN,
}) => {
  const palette = getQuestionShowcasePalette(temaVisual);

  const themedSvg = useMemo(() => {
    if (!svgMarkup || !svgMarkup.trim().startsWith("<svg")) return "";
    return adaptQuestionSvgToTheme(svgMarkup, temaVisual);
  }, [svgMarkup, temaVisual]);

  if (!themedSvg) {
    return null;
  }

  return (
    <div
      className={`rounded-xl border ${palette.frameBorder} ${palette.canvasBg} p-3 sm:p-4`}
    >
      <div
        className={`lkpd-svg-container w-full overflow-hidden ${
          palette.isMonochrome ? "grayscale contrast-125" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: themedSvg }}
      />
      {caption && (
        <p className="mt-2 text-xs text-slate-600 text-center italic">{caption}</p>
      )}
    </div>
  );
};

interface QuestionVisualShowcaseProps {
  gambarSoalUrl?: string;
  ilustrasiSoalSvg?: string;
  questionType: string;
  questionIndex: number;
  temaVisual: VisualTheme;
  themeLabel?: string;
  altTitle?: string;
}

export const QuestionVisualShowcase: React.FC<QuestionVisualShowcaseProps> = ({
  gambarSoalUrl,
  ilustrasiSoalSvg,
  questionType,
  questionIndex,
  temaVisual,
  themeLabel,
  altTitle,
}) => {
  const hasImage = Boolean(gambarSoalUrl && gambarSoalUrl.trim() !== "");
  const hasSvg = Boolean(
    ilustrasiSoalSvg && ilustrasiSoalSvg.trim().startsWith("<svg")
  );

  const themedSvg = useMemo(() => {
    if (!hasSvg || !ilustrasiSoalSvg) return "";
    return adaptQuestionSvgToTheme(ilustrasiSoalSvg, temaVisual);
  }, [hasSvg, ilustrasiSoalSvg, temaVisual]);

  if (!hasImage && !hasSvg) {
    return null;
  }

  const palette = getQuestionShowcasePalette(temaVisual);

  const visualHeaderTitle =
    questionType === "cerita_bergambar"
      ? "Panel Ilustrasi Cerita Bergambar"
      : questionType === "eksperimen"
      ? "Ilustrasi & Skema Percobaan Siswa"
      : questionType === "studi_kasus"
      ? "Ilustrasi Konteks Studi Kasus"
      : questionType === "urutkan_langkah"
      ? "Visual Alur Tahapan Kegiatan"
      : "Ilustrasi Visual Stimulus Soal";

  return (
    <div
      className={`rounded-xl border ${palette.frameBorder} overflow-hidden ${palette.canvasBg}`}
    >
      {/* Theme-Colored Visual Stimulus Header Strip */}
      <div
        className={`px-3.5 py-2 text-xs flex flex-wrap items-center justify-between gap-2 ${palette.headerGradient}`}
      >
        <span className="font-semibold tracking-tight">{visualHeaderTitle}</span>
        {themeLabel && (
          <span className="opacity-90 text-[11px] font-medium">
            Gaya {themeLabel}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 space-y-3">
        {hasImage && gambarSoalUrl && (
          <div className="overflow-hidden rounded-lg border border-white/80 bg-white shadow-2xs">
            <SafeIllustrationImage
              src={gambarSoalUrl}
              alt={altTitle || `Ilustrasi Soal ${questionIndex + 1}`}
              fallbackTitle={altTitle || `Ilustrasi Soal ${questionIndex + 1}`}
              className={`max-h-56 w-full mx-auto object-cover ${
                palette.isMonochrome ? "grayscale contrast-125" : ""
              }`}
            />
          </div>
        )}

        {hasSvg && themedSvg && (
          <div
            className={`lkpd-svg-container w-full overflow-hidden rounded-lg ${
              palette.isMonochrome ? "grayscale contrast-125" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: themedSvg }}
          />
        )}
      </div>
    </div>
  );
};
