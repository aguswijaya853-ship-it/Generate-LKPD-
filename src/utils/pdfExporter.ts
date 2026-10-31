import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

export interface PdfExportOptions {
  filename: string;
  includeTeacherGuide?: boolean;
}

interface SectionMeasure {
  el: HTMLElement;
  top: number;
  left: number;
  width: number;
}

/**
 * Renders the A4 LKPD container's `.lkpd-pdf-section` blocks into crisp high-DPI canvases,
 * supporting both full-width blocks and Smart Layout side-by-side multi-column CSS Grid rows
 * without stretching narrow columns or slicing mid-card.
 */
export async function exportLkpdElementToPdf(
  sheetElement: HTMLElement,
  options: PdfExportOptions
): Promise<void> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidthMm = 210;
  const pageHeightMm = 297;
  const marginX = 12;
  const marginTop = 12;
  const marginBottom = 14;
  const printableWidthMm = pageWidthMm - marginX * 2;
  const maxContentY = pageHeightMm - marginBottom;

  const rawSections = Array.from(
    sheetElement.querySelectorAll<HTMLElement>(".lkpd-pdf-section")
  ).filter((el) => el.offsetHeight > 0 && el.offsetWidth > 0);

  const targets = rawSections.length > 0 ? rawSections : [sheetElement];

  // Measure horizontal bounds of content inside the sheet so CSS Grid columns preserve exact X & width
  const measured: SectionMeasure[] = targets.map((el) => {
    const r = el.getBoundingClientRect();
    return {
      el,
      top: r.top,
      left: r.left,
      width: r.width,
    };
  });

  const minLeft = Math.min(...measured.map((m) => m.left));
  const maxRight = Math.max(...measured.map((m) => m.left + m.width));
  const contentSpanPx = Math.max(maxRight - minLeft, 1);

  // Group side-by-side CSS Grid items sharing the same visual top coordinate into rows
  const rowGroups: SectionMeasure[][] = [];
  for (const item of measured) {
    const lastRow = rowGroups[rowGroups.length - 1];
    if (lastRow && Math.abs(item.top - lastRow[0].top) < 14) {
      lastRow.push(item);
    } else {
      rowGroups.push([item]);
    }
  }

  let cursorY = marginTop;

  for (const row of rowGroups) {
    const renderedItems: Array<{
      canvas: HTMLCanvasElement;
      xMm: number;
      wMm: number;
      hMm: number;
    }> = [];

    for (const item of row) {
      const canvas = await toCanvas(item.el, {
        pixelRatio: 2.2,
        backgroundColor: "#ffffff",
        cacheBust: true,
        filter: (node) => {
          if (node instanceof HTMLElement && node.dataset.pdfIgnore === "true") {
            return false;
          }
          return true;
        },
      });

      const relX = Math.max(0, (item.left - minLeft) / contentSpanPx);
      const relW = Math.min(1 - relX, item.width / contentSpanPx);
      const wMm = row.length === 1 && relW > 0.88 ? printableWidthMm : printableWidthMm * relW;
      const xMm = row.length === 1 && relW > 0.88 ? marginX : marginX + printableWidthMm * relX;
      const aspect = canvas.height / Math.max(canvas.width, 1);
      const hMm = wMm * aspect;

      renderedItems.push({ canvas, xMm, wMm, hMm });
    }

    const rowMaxHeightMm = Math.max(...renderedItems.map((r) => r.hMm), 0);
    const maxPageBodyMm = pageHeightMm - marginTop - marginBottom;

    // Single oversized full-width block: slice cleanly across pages
    if (renderedItems.length === 1 && rowMaxHeightMm > maxPageBodyMm) {
      const single = renderedItems[0];
      if (cursorY > marginTop + 2) {
        pdf.addPage();
        cursorY = marginTop;
      }

      const pxPerMm = single.canvas.height / single.hMm;
      let offsetPx = 0;

      while (offsetPx < single.canvas.height) {
        const sliceHeightPx = Math.min(
          Math.floor(maxPageBodyMm * pxPerMm),
          single.canvas.height - offsetPx
        );
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = single.canvas.width;
        sliceCanvas.height = sliceHeightPx;
        const ctx = sliceCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          ctx.drawImage(
            single.canvas,
            0,
            offsetPx,
            single.canvas.width,
            sliceHeightPx,
            0,
            0,
            single.canvas.width,
            sliceHeightPx
          );
          const sliceMm = sliceHeightPx / pxPerMm;
          pdf.addImage(
            sliceCanvas.toDataURL("image/jpeg", 0.95),
            "JPEG",
            single.xMm,
            cursorY,
            single.wMm,
            sliceMm
          );
          cursorY += sliceMm + 3;
        }
        offsetPx += sliceHeightPx;
        if (offsetPx < single.canvas.height) {
          pdf.addPage();
          cursorY = marginTop;
        }
      }
      continue;
    }

    // Move entire CSS Grid row to next A4 page if it doesn't fit remaining height
    if (cursorY + rowMaxHeightMm > maxContentY && cursorY > marginTop + 2) {
      pdf.addPage();
      cursorY = marginTop;
    }

    for (const rItem of renderedItems) {
      pdf.addImage(
        rItem.canvas.toDataURL("image/jpeg", 0.95),
        "JPEG",
        rItem.xMm,
        cursorY,
        rItem.wMm,
        rItem.hMm
      );
    }

    cursorY += rowMaxHeightMm + 3.5;
  }

  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(100, 116, 139);
    const label = options.includeTeacherGuide
      ? `LembarKarya Studio · LKPD & Pegangan Guru · Halaman ${p} dari ${totalPages}`
      : `Lembar Kerja Peserta Didik (LKPD) · Halaman ${p} dari ${totalPages}`;
    pdf.text(label, pageWidthMm / 2, pageHeightMm - 6, { align: "center" });
  }

  const safeName = options.filename
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
  pdf.save(`${safeName || "LKPD_Kurikulum_Merdeka"}.pdf`);
}
