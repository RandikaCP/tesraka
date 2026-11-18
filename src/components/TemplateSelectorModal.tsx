import React from 'react';
import { 
  X, 
  Check, 
  LayoutGrid, 
  BarChart3, 
  HardHat, 
  Sprout, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { TemplateDefinition, TemplateId } from '../types/dashboard';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: TemplateDefinition[];
  currentTemplateId: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  templates,
  currentTemplateId,
  onSelectTemplate
}) => {
  if (!isOpen) return null;

  const getTemplateIcon = (id: TemplateId) => {
    switch (id) {
      case 'survey-census':
        return <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'construction-infra':
        return <HardHat className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'community-training':
        return <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'quality-compliance':
        return <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <LayoutGrid className="w-5 h-5 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Katalog Template Operasional
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-mono">4 Opsi Siap Pakai</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Pilih Contoh Template Struktur Dashboard
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Note */}
        <div className="px-6 py-3.5 bg-blue-50/60 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            Setiap template di bawah telah dilengkapi dengan <strong>struktur kegiatan terpisah</strong>, <strong>repository materi & panduan</strong>, <strong>log monitoring lapangan</strong>, serta <strong>aturan deteksi evaluasi anomali/outlier</strong> yang relevan dengan industrinya. Anda juga dapat menambah, mengedit, atau menghapus menu setelah memilih template.
          </div>
        </div>

        {/* Template Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {templates.map((tmpl) => {
            const isCurrent = tmpl.id === currentTemplateId;
            return (
              <div
                key={tmpl.id}
                className={`flex flex-col justify-between p-5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-slate-900 dark:border-white ring-1 ring-slate-900 dark:ring-white bg-slate-50/50 dark:bg-slate-800/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      {getTemplateIcon(tmpl.id)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {tmpl.badge}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900">
                          Aktif
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                    {tmpl.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {tmpl.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Fitur & Karakteristik Utama:
                    </div>
                    {tmpl.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="text-slate-400 mt-0.5">·</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-2 text-[11px] text-slate-400 dark:text-slate-500">
                    <span className="font-medium text-slate-600 dark:text-slate-400">Target Pengguna: </span>
                    {tmpl.targetIndustry}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {tmpl.defaultActivitiesCount} Kegiatan Terintegrasi
                  </span>

                  <button
                    onClick={() => {
                      onSelectTemplate(tmpl.id);
                      onClose();
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      isCurrent
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-default'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Sedang Digunakan</span>
                      </>
                    ) : (
                      <>
                        <span>Terapkan Template Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500">
          <span>Struktur menu dan data kustom Anda dapat selalu dimodifikasi lewat tombol <strong>Kelola Menu</strong>.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
