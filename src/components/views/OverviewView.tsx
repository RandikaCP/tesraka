import React from 'react';
import { 
  BarChart3, 
  MapPin, 
  FolderGit2, 
  AlertOctagon, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Layers, 
  LayoutGrid,
  Users,
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { 
  ActivityModule, 
  FieldMonitoringLog, 
  AnomalyEvaluation, 
  MaterialItem,
  TemplateDefinition 
} from '../../types/dashboard';
import { DynamicIcon } from '../DynamicIcon';

interface OverviewViewProps {
  currentTemplate: TemplateDefinition;
  activities: ActivityModule[];
  materials: MaterialItem[];
  fieldLogs: FieldMonitoringLog[];
  anomalies: AnomalyEvaluation[];
  onSelectActivity: (id: string) => void;
  onOpenTemplateSelector: () => void;
  onOpenMenuManager: () => void;
  onOpenAddLog: () => void;
  onOpenAddMaterial: () => void;
  onInspectAnomaly: (anomaly: AnomalyEvaluation) => void;
  onNavigateView: (view: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentTemplate,
  activities,
  materials,
  fieldLogs,
  anomalies,
  onSelectActivity,
  onOpenTemplateSelector,
  onOpenMenuManager,
  onOpenAddLog,
  onOpenAddMaterial,
  onInspectAnomaly,
  onNavigateView
}) => {
  const visibleActivities = activities.filter(a => !a.isHidden);
  const openAnomalies = anomalies.filter(a => a.resolutionStatus === 'open');

  // Compute total target and completed
  const totalTarget = visibleActivities.reduce((acc, a) => acc + a.targetGoal, 0);
  const totalCompleted = fieldLogs.reduce((acc, l) => acc + l.targetCompletedToday, 0);
  const completionPercentage = totalTarget > 0 ? Math.min(100, Math.round((totalCompleted / totalTarget) * 100)) : 0;

  return (
    <div className="space-y-6">
      {/* Template Announcement & Switcher Banner */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Template Aktif:
            </span>
            <span className="font-mono text-slate-700 dark:text-slate-300">
              {currentTemplate.name}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>{currentTemplate.badge}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {currentTemplate.description}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenTemplateSelector}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Lihat 4 Contoh Template Lain</span>
          </button>
          <button
            onClick={onOpenMenuManager}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sesuaikan Struktur Menu</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Kegiatan Lapangan</span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {visibleActivities.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
            <span>Aktif & Terpisah pada Menu</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Realisasi Target Fisik</span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {completionPercentage}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            {totalCompleted.toLocaleString('id-ID')} / {totalTarget.toLocaleString('id-ID')} kumulatif
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Repository Materi</span>
            <FolderGit2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {materials.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            SOP, Formulir & Pedoman Teknis
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/80 bg-rose-50/40 dark:bg-rose-950/20">
          <div className="flex items-center justify-between text-xs text-rose-700 dark:text-rose-400 font-semibold mb-2">
            <span>Anomali & Outlier Data</span>
            <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-300">
            {openAnomalies.length}
          </div>
          <div className="text-[11px] text-rose-600/90 dark:text-rose-400 mt-1">
            {anomalies.length - openAnomalies.length} telah dievaluasi/ditindak
          </div>
        </div>
      </div>

      {/* Grid of Dynamic Activities (Menu Terpisah) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Menu Kegiatan Operasional
            </h2>
            <p className="text-xs text-slate-500">
              Pilih menu kegiatan di bawah untuk membuka monitoring, materi dokumen, dan deteksi anomali masing-masing.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMenuManager}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Kegiatan</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleActivities.map((act) => {
            const actLogs = fieldLogs.filter(l => l.activityId === act.id);
            const actAnomalies = anomalies.filter(a => a.activityId === act.id && a.resolutionStatus === 'open');
            const actMaterials = materials.filter(m => m.activityId === act.id);
            const actCompleted = actLogs.reduce((acc, l) => acc + l.targetCompletedToday, 0);
            const actPct = act.targetGoal > 0 ? Math.min(100, Math.round((actCompleted / act.targetGoal) * 100)) : 0;

            return (
              <div
                key={act.id}
                onClick={() => onSelectActivity(act.id)}
                className="group flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-xs transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      <DynamicIcon name={act.icon} className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
                        {act.code}
                      </span>
                      {actAnomalies.length > 0 && (
                        <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                          [{actAnomalies.length} Anomali]
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors line-clamp-1">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Capaian Lapangan</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        {actPct}% ({actCompleted.toLocaleString('id-ID')} / {act.targetGoal.toLocaleString('id-ID')} {act.targetUnit})
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-300"
                        style={{ width: `${actPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Feature Strip */}
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{actMaterials.length} Materi</span>
                    <span>·</span>
                    <span>{actLogs.length} Log Lapangan</span>
                    <span>·</span>
                    <span>PIC: {act.pic.name.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>Buka Menu Kegiatan</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Outlier Alerts & Recent Field Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outlier Radar / Anomaly Alerts */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Evaluasi Hasil & Deteksi Anomali Terbaru
              </h3>
            </div>
            <button
              onClick={() => onNavigateView('anomalies')}
              className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
            >
              <span>Semua Anomali</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {openAnomalies.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                Seluruh data kegiatan saat ini berada dalam batas statistik normal.
              </div>
            ) : (
              openAnomalies.slice(0, 3).map((anom) => (
                <div
                  key={anom.id}
                  onClick={() => onInspectAnomaly(anom)}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                      [{anom.category}] · Z: {anom.zScore > 0 ? `+${anom.zScore}` : anom.zScore}σ
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {anom.dateDetected}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {anom.title}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{anom.entityName}</span>
                    <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                      Nilai: {anom.observedValue} {anom.unit} (Wajar: {anom.expectedMin}-{anom.expectedMax})
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Field Monitoring Entries */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Log Monitoring Lapangan Terbaru
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddLog}
                className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300"
              >
                + Input Log
              </button>
              <button
                onClick={() => onNavigateView('field-monitoring')}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <span>Semua Log</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {fieldLogs.slice(0, 3).map((log) => {
              const act = activities.find(a => a.id === log.activityId);
              return (
                <div
                  key={log.id}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      {act?.code || 'OPS'} · {log.region}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {log.submissionDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {log.surveyorName} ({log.surveyorId})
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {log.targetCompletedToday} {log.unit}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                    <span className="truncate max-w-xs">{log.notes}</span>
                    <span className="font-mono">Durasi: {log.durationMinutes} mnt</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
