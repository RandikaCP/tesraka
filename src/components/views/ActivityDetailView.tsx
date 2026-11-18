import React, { useState } from 'react';
import { 
  FolderGit2, 
  MapPin, 
  AlertOctagon, 
  Settings, 
  Plus, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  Phone,
  Mail,
  Calendar,
  Layers,
  Search,
  Filter,
  FileText
} from 'lucide-react';
import { 
  ActivityModule, 
  MaterialItem, 
  FieldMonitoringLog, 
  AnomalyEvaluation,
  ActivityFeatures
} from '../../types/dashboard';
import { DynamicIcon } from '../DynamicIcon';

interface ActivityDetailViewProps {
  activity: ActivityModule;
  materials: MaterialItem[];
  fieldLogs: FieldMonitoringLog[];
  anomalies: AnomalyEvaluation[];
  onOpenPreviewMaterial: (mat: MaterialItem) => void;
  onOpenAddMaterial: (activityId: string) => void;
  onOpenAddLog: (activityId: string) => void;
  onInspectAnomaly: (anomaly: AnomalyEvaluation) => void;
  onUpdateActivityFeatures: (id: string, features: ActivityFeatures) => void;
}

export const ActivityDetailView: React.FC<ActivityDetailViewProps> = ({
  activity,
  materials,
  fieldLogs,
  anomalies,
  onOpenPreviewMaterial,
  onOpenAddMaterial,
  onOpenAddLog,
  onInspectAnomaly,
  onUpdateActivityFeatures
}) => {
  // Determine default tab based on enabled features
  const defaultTab = activity.enabledFeatures.fieldMonitoring 
    ? 'monitoring' 
    : activity.enabledFeatures.materials 
      ? 'materials' 
      : 'anomalies';

  const [activeTab, setActiveTab] = useState<'monitoring' | 'materials' | 'anomalies' | 'settings'>(defaultTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter logs & materials for this activity
  const actLogs = fieldLogs.filter(l => l.activityId === activity.id);
  const actMaterials = materials.filter(m => m.activityId === activity.id);
  const actAnomalies = anomalies.filter(a => a.activityId === activity.id);

  // Computations
  const totalCompleted = actLogs.reduce((acc, l) => acc + l.targetCompletedToday, 0);
  const completionPercentage = activity.targetGoal > 0 
    ? Math.min(100, Math.round((totalCompleted / activity.targetGoal) * 100)) 
    : 0;

  // Filtered field logs
  const filteredLogs = actLogs.filter(l => {
    const matchesSearch = l.surveyorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.surveyorId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Activity Header Card */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
              <DynamicIcon name={activity.icon} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">[{activity.code}]</span>
                <span>·</span>
                <span>{activity.category}</span>
                <span>·</span>
                <span className="font-mono">{activity.startDate} s/d {activity.endDate}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {activity.title}
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>

          {/* PIC card */}
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs shrink-0 min-w-[240px]">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Penanggung Jawab (PIC)
            </div>
            <div className="font-bold text-slate-900 dark:text-white">
              {activity.pic.name}
            </div>
            <div className="text-[11px] text-slate-500 mb-1.5">
              {activity.pic.role}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono space-y-0.5">
              <div>{activity.pic.phone}</div>
              <div>{activity.pic.email}</div>
            </div>
          </div>
        </div>

        {/* Realization Progress Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Realisasi Lapangan</span>
              <span>·</span>
              <span className="font-mono">
                {totalCompleted.toLocaleString('id-ID')} dari target {activity.targetGoal.toLocaleString('id-ID')} {activity.targetUnit}
              </span>
            </div>
            <div className="font-mono font-bold text-sm text-slate-900 dark:text-white tabular-nums">
              {completionPercentage}%
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
        {activity.enabledFeatures.fieldMonitoring && (
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'monitoring'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Monitoring Lapangan ({actLogs.length})</span>
          </button>
        )}

        {activity.enabledFeatures.materials && (
          <button
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'materials'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Materi & Dokumen ({actMaterials.length})</span>
          </button>
        )}

        {activity.enabledFeatures.outlierDetection && (
          <button
            onClick={() => setActiveTab('anomalies')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'anomalies'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span>Evaluasi & Outlier ({actAnomalies.length})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'settings'
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan Fitur Menu</span>
        </button>
      </div>

      {/* TAB 1: Monitoring Lapangan */}
      {activeTab === 'monitoring' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari nama surveyor, wilayah, atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="all">Semua Status</option>
                <option value="verified">Terverifikasi</option>
                <option value="flagged">Perlu Tinjau / Anomali</option>
              </select>
            </div>

            <button
              onClick={() => onOpenAddLog(activity.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Input Log Monitoring Baru</span>
            </button>
          </div>

          {/* Table of logs */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Tanggal & ID</th>
                    <th className="px-4 py-3">Petugas / Surveyor</th>
                    <th className="px-4 py-3">Wilayah Lapangan</th>
                    <th className="px-4 py-3 text-right">Realisasi Hari Ini</th>
                    <th className="px-4 py-3 text-right">Durasi (Mnt)</th>
                    <th className="px-4 py-3">Status Verifikasi</th>
                    <th className="px-4 py-3">Catatan Lapangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-xs">
                        Belum ada laporan monitoring lapangan yang sesuai.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <div className="text-slate-900 dark:text-white">{log.submissionDate}</div>
                          <div className="text-[10px] text-slate-400">{log.id}</div>
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
                          {log.durationMinutes}
                        </td>
                        <td className="px-4 py-3">
                          {log.verificationStatus === 'verified' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Valid</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Anomali Terdeteksi</span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                          {log.notes}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Materi & Dokumen */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Dokumen pedoman, formulir, dan SOP yang dapat diakses oleh petugas untuk kegiatan ini.
            </div>
            <button
              onClick={() => onOpenAddMaterial(activity.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Unggah Materi Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actMaterials.length === 0 ? (
              <div className="col-span-2 p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 text-xs">
                Belum ada materi untuk kegiatan ini. Klik &quot;Unggah Materi Baru&quot; untuk menambahkan dokumen.
              </div>
            ) : (
              actMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{mat.category}</span>
                      <span className="font-mono uppercase">{mat.fileType} ({mat.fileSize})</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {mat.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Versi {mat.version}</span>
                      <span>Diperbarui: {mat.updatedAt}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenPreviewMaterial(mat)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Dokumen</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Evaluasi & Deteksi Outlier */}
      {activeTab === 'anomalies' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Mesin Evaluasi Anomali & Deteksi Outlier Data
                </h3>
                <p className="text-xs text-slate-500">
                  Data lapangan diuji terhadap batas toleransi IQR & Z-Score untuk mengidentifikasi indikasi kecurangan, salah input, atau anomali fisik.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                {actAnomalies.length} Kasus Terdeteksi
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {actAnomalies.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 text-xs">
                Tidak ada data anomali atau outlier pada kegiatan ini. Semua data dalam rentang wajar.
              </div>
            ) : (
              actAnomalies.map((anom) => (
                <div
                  key={anom.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                        [{anom.category}]
                      </span>
                      <span>·</span>
                      <span className="font-mono text-slate-500">Z-Score: {anom.zScore > 0 ? `+${anom.zScore}` : anom.zScore}σ</span>
                      <span>·</span>
                      <span className="text-slate-400 font-mono">{anom.dateDetected}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {anom.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                      {anom.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Entitas: {anom.entityName}
                      </span>
                      <span>·</span>
                      <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                        Nilai: {anom.observedValue.toLocaleString('id-ID')} {anom.unit} (Wajar: {anom.expectedMin.toLocaleString('id-ID')} - {anom.expectedMax.toLocaleString('id-ID')})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onInspectAnomaly(anom)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors whitespace-nowrap"
                    >
                      Investigasi & Putusan
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Pengaturan Fitur Menu Kegiatan */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Konfigurasi Fitur Menu: {activity.title}
          </h3>
          <p className="text-xs text-slate-500">
            Aktifkan atau nonaktifkan modul spesifik untuk menyesuaikan struktur kegiatan ini sesuai kebutuhan operasional.
          </p>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={activity.enabledFeatures.fieldMonitoring}
                onChange={(e) => onUpdateActivityFeatures(activity.id, {
                  ...activity.enabledFeatures,
                  fieldMonitoring: e.target.checked
                })}
                className="rounded text-slate-900 focus:ring-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Modul Monitoring Lapangan
                </div>
                <div className="text-[11px] text-slate-500">
                  Pelacakan realisasi harian, surveyor id, koordinat GPS, dan log entri.
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={activity.enabledFeatures.materials}
                onChange={(e) => onUpdateActivityFeatures(activity.id, {
                  ...activity.enabledFeatures,
                  materials: e.target.checked
                })}
                className="rounded text-slate-900 focus:ring-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Modul Repository Materi & Dokumen
                </div>
                <div className="text-[11px] text-slate-500">
                  Penyimpanan dokumen SOP, buku pedoman, formulir kuesioner, dan materi pengawasan.
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={activity.enabledFeatures.outlierDetection}
                onChange={(e) => onUpdateActivityFeatures(activity.id, {
                  ...activity.enabledFeatures,
                  outlierDetection: e.target.checked
                })}
                className="rounded text-slate-900 focus:ring-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Modul Evaluasi Anomali & Deteksi Outlier
                </div>
                <div className="text-[11px] text-slate-500">
                  Uji statistik Z-score/IQR untuk memfilter data aneh, wawancara kilat, atau deviasi angka.
                </div>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
