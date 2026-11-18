import React from 'react';
import { 
  LayoutDashboard, 
  FolderGit2, 
  MapPin, 
  AlertOctagon, 
  Plus, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  FileCheck2,
  X
} from 'lucide-react';
import { ActivityModule, TemplateDefinition } from '../types/dashboard';
import { DynamicIcon } from './DynamicIcon';

interface SidebarProps {
  currentView: string;
  selectedActivityId: string | null;
  activities: ActivityModule[];
  currentTemplate: TemplateDefinition;
  anomalyCount: number;
  onSelectView: (view: string, activityId?: string | null) => void;
  onOpenMenuManager: () => void;
  onOpenTemplateSelector: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  selectedActivityId,
  activities,
  currentTemplate,
  anomalyCount,
  onSelectView,
  onOpenMenuManager,
  onOpenTemplateSelector,
  mobileOpen,
  onCloseMobile
}) => {
  const visibleActivities = activities
    .filter(a => !a.isHidden)
    .sort((a, b) => a.order - b.order);

  const handleNavClick = (view: string, actId?: string | null) => {
    onSelectView(view, actId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand / Workspace Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm">
              OP
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Dashboard Operasional
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                {currentTemplate.name}
              </div>
            </div>
          </div>
          <button 
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Global Navigation */}
          <div>
            <div className="px-2 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Navigasi Terpadu
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => handleNavClick('overview', null)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                  currentView === 'overview'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="truncate">Ringkasan Operasional</span>
              </button>

              <button
                onClick={() => handleNavClick('materials', null)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                  currentView === 'materials' && !selectedActivityId
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="truncate">Semua Materi & Regulasi</span>
              </button>

              <button
                onClick={() => handleNavClick('field-monitoring', null)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                  currentView === 'field-monitoring' && !selectedActivityId
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="truncate">Monitoring Lapangan Global</span>
              </button>

              <button
                onClick={() => handleNavClick('anomalies', null)}
                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                  currentView === 'anomalies' && !selectedActivityId
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <AlertOctagon className="w-4 h-4 text-rose-500" />
                  <span className="truncate">Evaluasi & Anomali Data</span>
                </div>
                {anomalyCount > 0 && (
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-sm bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300">
                    {anomalyCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Section: Kegiatan Operasional (Dynamic Menus) */}
          <div>
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Kegiatan Terpisah ({visibleActivities.length})
              </span>
              <button
                onClick={onOpenMenuManager}
                className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Kelola susunan menu"
              >
                Atur Menu
              </button>
            </div>

            <nav className="space-y-1">
              {visibleActivities.map((act) => {
                const isSelected = currentView === 'activity-detail' && selectedActivityId === act.id;
                return (
                  <button
                    key={act.id}
                    onClick={() => handleNavClick('activity-detail', act.id)}
                    className={`w-full group flex items-start gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="mt-0.5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                      <DynamicIcon name={act.icon} className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium text-slate-800 dark:text-slate-200">
                        {act.title}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                        {act.code} · {act.targetGoal} {act.targetUnit}
                      </div>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={onOpenMenuManager}
                className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left border border-dashed border-slate-200 dark:border-slate-800 mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Menu Kegiatan Baru</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Template Switcher Box */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Template Aktif
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                {currentTemplate.badge}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate mb-1">
              {currentTemplate.name}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
              {currentTemplate.subtitle}
            </p>
            <button
              onClick={onOpenTemplateSelector}
              className="w-full py-1.5 px-2 text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors text-center"
            >
              Ganti Contoh Template Lain
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
