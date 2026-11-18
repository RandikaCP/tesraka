import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Sliders, 
  Filter, 
  CheckCircle, 
  RefreshCcw, 
  ArrowUpRight, 
  ShieldAlert, 
  Info,
  BarChart2
} from 'lucide-react';
import { AnomalyEvaluation, ActivityModule, AnomalySeverity, ResolutionStatus } from '../../types/dashboard';

interface AnomalyEvaluationViewProps {
  anomalies: AnomalyEvaluation[];
  activities: ActivityModule[];
  onInspectAnomaly: (anomaly: AnomalyEvaluation) => void;
}

export const AnomalyEvaluationView: React.FC<AnomalyEvaluationViewProps> = ({
  anomalies,
  activities,
  onInspectAnomaly
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [zScoreSensitivity, setZScoreSensitivity] = useState<'2.0' | '2.5' | '3.0'>('2.5');

  // Filter anomalies based on sensitivity and user filters
  const filteredAnomalies = anomalies.filter(a => {
    // Check sensitivity
    const threshold = parseFloat(zScoreSensitivity);
    const passesSensitivity = Math.abs(a.zScore) >= (threshold - 0.5);

    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.metricName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActivity = selectedActivity === 'all' || a.activityId === selectedActivity;
    const matchesSeverity = selectedSeverity === 'all' || a.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || a.resolutionStatus === selectedStatus;

    return passesSensitivity && matchesSearch && matchesActivity && matchesSeverity && matchesStatus;
  });

  const criticalCount = anomalies.filter(a => a.severity === 'critical').length;
  const openCount = anomalies.filter(a => a.resolutionStatus === 'open').length;
  const investigatingCount = anomalies.filter(a => a.resolutionStatus === 'investigating').length;
  const resolvedCount = anomalies.filter(a => a.resolutionStatus === 'confirmed_valid' || a.resolutionStatus === 'rejected_resurvey').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[11px]">
              Mesin Evaluasi Mutu & Integritas Data
            </span>
            <span>·</span>
            <span className="font-mono">{anomalies.length} Kasus Outlier Teridentifikasi</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Pusat Deteksi Anomali & Evaluasi Outlier Operasional
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Sistem evaluasi berbasis deviasi statistik (Z-Score & IQR) untuk mendeteksi wawancara fiktif, angka lonjakan ekstrem, anomali GPS, dan deviasi mutu lapangan.
          </p>
        </div>

        {/* Sensitivity Selector */}
        <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs shrink-0">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Sensitivitas Uji Ambang Z-Score
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            {(['2.0', '2.5', '3.0'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setZScoreSensitivity(lvl)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  zScoreSensitivity === lvl
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                ±{lvl}σ
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/80 bg-rose-50/30 dark:bg-rose-950/20">
          <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold mb-1">Anomali Kritis (Prioritas A)</div>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {criticalCount}
          </div>
          <div className="text-[10px] text-rose-600/80 dark:text-rose-400 mt-1">Z-Score &gt; |3.0σ| atau fatal</div>
        </div>

        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-950/80 bg-amber-50/30 dark:bg-amber-950/20">
          <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">Belum Ditindaklanjuti (Open)</div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {openCount}
          </div>
          <div className="text-[10px] text-amber-600/80 dark:text-amber-400 mt-1">Menunggu review audit</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Dalam Investigasi Lapangan</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {investigatingCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Klarifikasi surveyor / cek fisik</div>
        </div>

        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-950/80 bg-emerald-50/30 dark:bg-emerald-950/20">
          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">Selesai Dievaluasi</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {resolvedCount}
          </div>
          <div className="text-[10px] text-emerald-700/80 dark:text-emerald-400 mt-1">Dikonfirmasi valid / resurvei</div>
        </div>
      </div>

      {/* Visual Statistical Distribution Strip */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-slate-500" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Visualisasi Sebaran Data Normal vs Outlier (Distribusi Deviasi Standar)
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">Ambang: ±{zScoreSensitivity}σ</span>
        </div>

        {/* Visual Axis Diagram */}
        <div className="pt-2">
          <div className="relative h-12 w-full rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center px-4 overflow-hidden">
            {/* Safe Zone (Middle 60%) */}
            <div className="absolute left-[20%] right-[20%] top-0 bottom-0 bg-emerald-100/60 dark:bg-emerald-950/40 border-x border-emerald-300 dark:border-emerald-800 flex items-center justify-center">
              <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wider">
                Zona Wajar (Mean ± 2σ)
              </span>
            </div>

            {/* Left Outlier Zone */}
            <div className="absolute left-0 w-[20%] top-0 bottom-0 bg-rose-100/50 dark:bg-rose-950/40 flex items-center justify-start pl-3">
              <span className="text-[9px] font-mono text-rose-700 dark:text-rose-400 font-bold uppercase">
                Outlier Bawah
              </span>
            </div>

            {/* Right Outlier Zone */}
            <div className="absolute right-0 w-[20%] top-0 bottom-0 bg-rose-100/50 dark:bg-rose-950/40 flex items-center justify-end pr-3">
              <span className="text-[9px] font-mono text-rose-700 dark:text-rose-400 font-bold uppercase">
                Outlier Atas
              </span>
            </div>

            {/* Points Plot */}
            {anomalies.map((anom, idx) => {
              // map z-score from [-5, +5] to [2%, 98%]
              const posPercent = Math.min(96, Math.max(4, 50 + (anom.zScore * 9.5)));
              return (
                <button
                  key={anom.id}
                  onClick={() => onInspectAnomaly(anom)}
                  title={`${anom.title} (${anom.observedValue} ${anom.unit}) - Z: ${anom.zScore}σ`}
                  className="absolute z-10 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-600 dark:bg-rose-500 border-2 border-white dark:border-slate-900 shadow-sm hover:scale-125 transition-transform"
                  style={{ left: `${posPercent}%` }}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1.5 px-1">
            <span>-4σ (Defisit Ekstrem)</span>
            <span>-2σ</span>
            <span>0 (Rata-rata Normal)</span>
            <span>+2σ</span>
            <span>+4σ (Lonjakan Ekstrem)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama anomali, entitas/petugas, atau deskripsi temuan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            <option value="all">Semua Kegiatan</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.code})
              </option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            <option value="all">Semua Tingkat Keparahan</option>
            <option value="critical">Kritis (Prioritas A)</option>
            <option value="high">Tinggi (Prioritas B)</option>
            <option value="medium">Moderat (Prioritas C)</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            <option value="all">Semua Status Putusan</option>
            <option value="open">Belum Ditindak (Open)</option>
            <option value="investigating">Sedang Diinvestigasi</option>
            <option value="confirmed_valid">Telah Dikonfirmasi Valid</option>
            <option value="rejected_resurvey">Ditolak / Resurvei Wajib</option>
          </select>
        </div>
      </div>

      {/* Anomaly Cards List */}
      <div className="space-y-3">
        {filteredAnomalies.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 text-xs">
            Tidak ada anomali atau outlier yang sesuai dengan kriteria filter saat ini.
          </div>
        ) : (
          filteredAnomalies.map((anom) => {
            const act = activities.find(a => a.id === anom.activityId);
            return (
              <div
                key={anom.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      [{anom.category}]
                    </span>
                    <span>·</span>
                    <span className="font-mono text-slate-500">
                      Z-Score: {anom.zScore > 0 ? `+${anom.zScore}` : anom.zScore}σ
                    </span>
                    <span>·</span>
                    <span className="text-slate-400 font-mono">{anom.dateDetected}</span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {act?.title || 'Kegiatan Umum'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {anom.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                    {anom.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs pt-1 flex-wrap">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Entitas / Titik: <strong className="text-slate-900 dark:text-white">{anom.entityName}</strong>
                    </span>
                    <span>·</span>
                    <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                      Nilai Data: {anom.observedValue.toLocaleString('id-ID')} {anom.unit} (Wajar: {anom.expectedMin.toLocaleString('id-ID')} - {anom.expectedMax.toLocaleString('id-ID')})
                    </span>
                    <span>·</span>
                    <span className="font-mono text-[11px] text-slate-500 uppercase">
                      Status: {anom.resolutionStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => onInspectAnomaly(anom)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors whitespace-nowrap"
                  >
                    <span>Investigasi & Putusan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
