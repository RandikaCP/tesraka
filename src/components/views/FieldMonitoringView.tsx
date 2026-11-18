import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Download,
  Filter,
  Layers,
  Clock,
  Compass
} from 'lucide-react';
import { FieldMonitoringLog, ActivityModule } from '../../types/dashboard';

interface FieldMonitoringViewProps {
  fieldLogs: FieldMonitoringLog[];
  activities: ActivityModule[];
  onOpenAddLog: () => void;
}

export const FieldMonitoringView: React.FC<FieldMonitoringViewProps> = ({
  fieldLogs,
  activities,
  onOpenAddLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLogs = fieldLogs.filter(l => {
    const matchesSearch = l.surveyorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.surveyorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActivity = selectedActivity === 'all' || l.activityId === selectedActivity;
    const matchesStatus = statusFilter === 'all' || l.verificationStatus === statusFilter;
    return matchesSearch && matchesActivity && matchesStatus;
  });

  const verifiedCount = fieldLogs.filter(l => l.verificationStatus === 'verified').length;
  const flaggedCount = fieldLogs.filter(l => l.verificationStatus === 'flagged').length;
  const uniqueSurveyors = new Set(fieldLogs.map(l => l.surveyorId)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Monitoring Lapangan Global
            </span>
            <span>·</span>
            <span className="font-mono">{fieldLogs.length} Laporan Tercatat</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Pelacakan Realisasi & Log Surveyor Multi-Kegiatan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Pantau arus pengiriman data dari seluruh surveyor dan pemeriksa lapangan secara real-time antar kegiatan yang terpisah.
          </p>
        </div>

        <button
          onClick={onOpenAddLog}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Input Log Lapangan</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Total Laporan Masuk</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {fieldLogs.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Seluruh wilayah & blok</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 mb-1">Petugas Lapangan Aktif</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {uniqueSurveyors}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Enumerator & Inspector</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Status Valid / Sah</div>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {verifiedCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">
            {fieldLogs.length > 0 ? Math.round((verifiedCount / fieldLogs.length) * 100) : 0}% Tingkat Validitas
          </div>
        </div>

        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/80 bg-rose-50/30 dark:bg-rose-950/20">
          <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold mb-1">Anomali Terdeteksi</div>
          <div className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {flaggedCount}
          </div>
          <div className="text-[10px] text-rose-600/80 dark:text-rose-400 mt-1">Perlu verifikasi atau resurvei</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama surveyor, wilayah, atau kode petugas..."
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
            <option value="all">Semua Menu Kegiatan</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.code})
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            <option value="all">Semua Status Verifikasi</option>
            <option value="verified">Valid (Normal)</option>
            <option value="flagged">Anomali Terdeteksi</option>
          </select>
        </div>
      </div>

      {/* High Density Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Tanggal & ID</th>
                <th className="px-4 py-3">Kegiatan</th>
                <th className="px-4 py-3">Petugas Lapangan</th>
                <th className="px-4 py-3">Wilayah & Koordinat</th>
                <th className="px-4 py-3 text-right">Realisasi Hari Ini</th>
                <th className="px-4 py-3 text-right">Durasi</th>
                <th className="px-4 py-3">Nilai Metrik</th>
                <th className="px-4 py-3">Verifikasi</th>
                <th className="px-4 py-3">Catatan Observasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500 text-xs">
                    Tidak ada laporan monitoring lapangan yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const act = activities.find(a => a.id === log.activityId);
                  return (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono">
                        <div className="text-slate-900 dark:text-white">{log.submissionDate}</div>
                        <div className="text-[10px] text-slate-400">{log.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">
                          {act?.title || 'Kegiatan Umum'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">[{act?.code}]</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900 dark:text-white">{log.surveyorName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{log.surveyorId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-slate-800 dark:text-slate-200">{log.region}</div>
                        {log.coordinates && (
                          <div className="text-[10px] text-slate-400 font-mono">{log.coordinates}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                        {log.targetCompletedToday} / {log.targetAssignedToday} {log.unit}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {log.durationMinutes} mnt
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px]">
                        <span className="text-slate-900 dark:text-white font-semibold">
                          {log.metricValue.toLocaleString('id-ID')}
                        </span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                          {log.metricLabel}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {log.verificationStatus === 'verified' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Valid</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Anomali</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {log.notes}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
