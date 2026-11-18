import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Plus, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  UserCheck
} from 'lucide-react';
import { FieldMonitoringLog, ActivityModule, AnomalyEvaluation } from '../types/dashboard';

interface AddFieldLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityModule[];
  defaultActivityId?: string;
  onAddLog: (log: FieldMonitoringLog, detectedAnomaly?: AnomalyEvaluation) => void;
}

export const AddFieldLogModal: React.FC<AddFieldLogModalProps> = ({
  isOpen,
  onClose,
  activities,
  defaultActivityId,
  onAddLog
}) => {
  const [activityId, setActivityId] = useState(defaultActivityId || activities[0]?.id || '');
  const [surveyorName, setSurveyorName] = useState('');
  const [surveyorId, setSurveyorId] = useState('');
  const [region, setRegion] = useState('');
  const [targetCompletedToday, setTargetCompletedToday] = useState(5);
  const [targetAssignedToday, setTargetAssignedToday] = useState(5);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [metricValue, setMetricValue] = useState(50);
  const [metricLabel, setMetricLabel] = useState('Nilai Evaluasi Pengawasan');
  const [coordinates, setCoordinates] = useState('-7.7956, 110.3695');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentActivity = activities.find(a => a.id === activityId) || activities[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyorName.trim() || !region.trim()) return;

    const logId = `log-${Date.now()}`;
    const dateToday = new Date().toISOString().split('T')[0];

    // Simple anomaly detection rule for demonstration:
    // If duration < 15 mins or targetCompleted > 2x assigned or metricValue is extreme
    let status: 'verified' | 'flagged' = 'verified';
    let anomalyObj: AnomalyEvaluation | undefined = undefined;

    if (durationMinutes < 15) {
      status = 'flagged';
      anomalyObj = {
        id: `anom-${Date.now()}`,
        activityId,
        logId,
        title: `Durasi Lapangan Sangat Singkat (${durationMinutes} menit)`,
        dateDetected: dateToday,
        metricName: 'Durasi Pengerjaan',
        observedValue: durationMinutes,
        expectedMin: 30,
        expectedMax: 90,
        unit: 'menit',
        zScore: -3.2,
        severity: 'critical',
        category: 'Durasi Janggal',
        entityName: `Petugas ${surveyorName} (${region})`,
        description: `Waktu pengerjaan tercatat ${durationMinutes} menit, jauh di bawah standar minimal pengawasan 30 menit. Terindikasi pengerjaan terburu-buru atau entri palsu.`,
        auditRecommendation: 'Lakukan verifikasi silang via telepon ke responden atau tinjau geotag foto sebelum memverifikasi laporan.',
        resolutionStatus: 'open'
      };
    }

    const newLog: FieldMonitoringLog = {
      id: logId,
      activityId,
      submissionDate: dateToday,
      surveyorName,
      surveyorId: surveyorId || `PCL-${Math.floor(100 + Math.random() * 900)}`,
      region,
      targetCompletedToday: Number(targetCompletedToday),
      targetAssignedToday: Number(targetAssignedToday),
      unit: currentActivity?.targetUnit || 'Unit',
      durationMinutes: Number(durationMinutes),
      metricValue: Number(metricValue),
      metricLabel: metricLabel || 'Capaian Harian',
      verificationStatus: status,
      coordinates,
      notes: notes || 'Pelaksanaan monitoring lapangan selesai sesuai target harian.'
    };

    onAddLog(newLog, anomalyObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Input Laporan Monitoring Lapangan
              </h2>
              <p className="text-xs text-slate-500">
                Pencatatan realisasi capaian harian surveyor/petugas pengawas.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Pilih Kegiatan Operasional *
            </label>
            <select
              value={activityId}
              onChange={(e) => setActivityId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            >
              {activities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} ({a.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nama Petugas / Surveyor *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Rian Pratama"
                value={surveyorName}
                onChange={(e) => setSurveyorName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nomor ID Petugas
              </label>
              <input
                type="text"
                placeholder="PCL-045 / QC-08"
                value={surveyorId}
                onChange={(e) => setSurveyorId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Wilayah / Titik Lokasi *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Kab. Sleman - Blok Sensus 002"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Koordinat GPS Lapangan
              </label>
              <input
                type="text"
                placeholder="-7.7956, 110.3695"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Realisasi Hari Ini
              </label>
              <input
                type="number"
                min="0"
                value={targetCompletedToday}
                onChange={(e) => setTargetCompletedToday(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target Ditugaskan
              </label>
              <input
                type="number"
                min="1"
                value={targetAssignedToday}
                onChange={(e) => setTargetAssignedToday(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Durasi (Menit)
              </label>
              <input
                type="number"
                min="1"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Label Variabel Pengukuran
              </label>
              <input
                type="text"
                value={metricLabel}
                onChange={(e) => setMetricLabel(e.target.value)}
                placeholder="Rata-rata Durasi / Nilai Uji / Skor"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nilai Angka Terukur
              </label>
              <input
                type="number"
                step="any"
                value={metricValue}
                onChange={(e) => setMetricValue(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Catatan Observasi Lapangan
            </label>
            <textarea
              rows={2}
              placeholder="Catatan kondisi responden, kendala jalan, cuaca, atau klarifikasi..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors"
            >
              Kirim Log Monitoring
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
