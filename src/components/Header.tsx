import React from 'react';
import { 
  Sun, 
  Moon, 
  LayoutGrid, 
  Menu, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { TemplateDefinition } from '../types/dashboard';

interface HeaderProps {
  currentTemplate: TemplateDefinition;
  onOpenTemplateSelector: () => void;
  onOpenMenuManager: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebarMobile: () => void;
  currentViewTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTemplate,
  onOpenTemplateSelector,
  onOpenMenuManager,
  darkMode,
  onToggleDarkMode,
  onToggleSidebarMobile,
  currentViewTitle
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 px-4 lg:px-8 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Zone 1: Brand Wordmark & Context */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSidebarMobile}
          className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            OPSTRACK INDONESIA
          </span>
          <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">/</span>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">{currentTemplate.name}</span>
          </div>
        </div>
      </div>

      {/* Zone 2: Breadcrumb / Active Context Indicator */}
      <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-medium text-slate-900 dark:text-slate-200 truncate max-w-xs">
          {currentViewTitle}
        </span>
      </div>

      {/* Zone 3: Primary Actions (Template Switcher & Menu Manager) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenTemplateSelector}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
          title="Pilih dan bandingkan template dashboard lain"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span className="hidden sm:inline">Pilih Template</span>
          <span className="sm:hidden">Template</span>
        </button>

        <button
          onClick={onOpenMenuManager}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white rounded-lg transition-colors whitespace-nowrap shadow-xs"
          title="Tambah, hapus, dan atur struktur menu kegiatan"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Kelola Menu</span>
        </button>

        <button
          onClick={onToggleDarkMode}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
