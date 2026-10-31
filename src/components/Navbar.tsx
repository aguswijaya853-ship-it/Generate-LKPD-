import React, { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { AppTab } from "../types/lkpd";

interface NavbarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onQuickDownloadPdf: () => void;
  isExportingPdf: boolean;
  savedCount: number;
  bankSoalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onQuickDownloadPdf,
  isExportingPdf,
  savedCount,
  bankSoalCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AppTab; label: string }[] = [
    { id: AppTab.STUDIO, label: "Studio LKPD" },
    { id: AppTab.BANK_SOAL, label: `Bank Soal (${bankSoalCount})` },
    { id: AppTab.TEMPLATES, label: "Galeri Template" },
    { id: AppTab.ARCHIVE, label: `Arsip LKPD (${savedCount})` },
  ];

  const handleNavClick = (tab: AppTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-indigo-100 shadow-2xs no-print">
      <div className="max-w-[1440px] mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (single text element, one line) */}
        <button
          type="button"
          onClick={() => handleNavClick(AppTab.STUDIO)}
          className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-sky-700 via-indigo-700 to-teal-600 bg-clip-text text-transparent whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded cursor-pointer"
        >
          LembarKarya Studio
        </button>

        {/* Zone 2: Clean Typography Navigation Links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-4 text-sm font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded cursor-pointer ${
                  isActive
                    ? "text-indigo-700 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-sky-500 after:to-indigo-600"
                    : "text-slate-600 hover:text-indigo-700 hover:underline hover:underline-offset-8"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onQuickDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 disabled:opacity-60 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{isExportingPdf ? "Menyiapkan PDF..." : "Unduh PDF"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Seluler"
          className="md:hidden border-t border-indigo-100 bg-white px-4 py-3 space-y-1 shadow-md"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors tabular-nums cursor-pointer ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
