import React, { useState } from 'react';
import { 
  X, 
  AlertOctagon, 
  CheckCircle, 
  RefreshCcw, 
  Search, 
  ArrowUpRight,
  ShieldAlert,
  AlertTriangle,
  Info
} from 'lucide-react';
import { AnomalyEvaluation, ResolutionStatus } from '../types/dashboard';

interface AnomalyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  anomaly: AnomalyEvaluation | null;
  activityTitle?: string;
  onUpdateStatus: (id: string, newStatus: ResolutionStatus, notes: string) => void;
}

export const AnomalyDetailModal: React.FC<AnomalyDetailModalProps> = ({
  isOpen,
  onClose,
  anomaly,
  activityTitle,
  onUpdateStatus
}) => {
  const [resolutionStatus, setResolutionStatus] = useState<ResolutionStatus>(
    anomaly?.resolutionStatus || 'open'
  );
  const [notes, setNotes] = useState(anomaly?.resolutionNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !anomaly) return null;

  const handleSave = () => {
    onUpdateStatus(anomaly.id, resolutionStatus, notes);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
            [Anomali Kritis]
          </span>
        );
      case 'high':
        return (
          <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
            [Deviasi Tinggi]
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-mono font-medium text-blue-600 dark:text-blue-400">
            [Peringatan Moderat]
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mt-0.5">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                {getSeverityBadge(anomaly.severity)}
                <span>·</span>
                <span>{anomaly.category}</span>
                <span>·</span>
                <span className="font-mono">Z-Score: {anomaly.zScore > 0 ? `+${anomaly.zScore}` : anomaly.zScore}σ</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {anomaly.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {/* Metadata bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <div className="text-slate-400 text-[11px]">Kegiatan</div>
              <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                {activityTitle || 'Kegiatan Terkait'}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Entitas / Petugas</div>
              <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                {anomaly.entityName}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Terdeteksi Pada</div>
              <div className="font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                {anomaly.dateDetected}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Status Evaluasi</div>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5 uppercase text-[10px]">
                {anomaly.resolutionStatus.replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Statistical Comparison Box */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Komparasi Nilai Data vs Ambang Batas Wajar (Outlier Analysis)
            </div>

            <div className="grid grid-cols-3 gap-3 text-center py-2">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-400">Batas Normal Minimal</div>
                <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-1 tabular-nums">
                  {anomaly.expectedMin.toLocaleString('id-ID')} {anomaly.unit}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                <div className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold">
                  Nilai Teramati (Outlier)
                </div>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-300 mt-1 tabular-nums">
                  {anomaly.observedValue.toLocaleString('id-ID')} {anomaly.unit}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] text-slate-400">Batas Normal Maksimal</div>
                <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-1 tabular-nums">
                  {anomaly.expectedMax.toLocaleString('id-ID')} {anomaly.unit}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {anomaly.description}
            </p>
          </div>

          {/* Audit Recommendation */}
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Rekomendasi Tindak Lanjut / Audit Lapangan:</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
              {anomaly.auditRecommendation}
            </p>
          </div>

          {/* Resolution Actions */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-900 dark:text-white block">
              Tindakan Evaluasi & Putusan Penanganan:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setResolutionStatus('open')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors ${
                  resolutionStatus === 'open'
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                1. Buka (Open)
              </button>

              <button
                type="button"
                onClick={() => setResolutionStatus('investigating')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors ${
                  resolutionStatus === 'investigating'
                    ? 'border-amber-600 bg-amber-600 text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                2. Investigasi
              </button>

              <button
                type="button"
                onClick={() => setResolutionStatus('confirmed_valid')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors ${
                  resolutionStatus === 'confirmed_valid'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                3. Sah / Valid
              </button>

              <button
                type="button"
                onClick={() => setResolutionStatus('rejected_resurvey')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors ${
                  resolutionStatus === 'rejected_resurvey'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                4. Tolak / Resurvei
              </button>
            </div>

            <div className="space-y-1 mt-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Catatan Berita Acara & Tindak Lanjut
              </label>
              <textarea
                rows={2}
                placeholder="Tuliskan alasan keputusan, hasil komunikasi dengan petugas atau pengawas lapangan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Status Tersimpan!</span>
              </>
            ) : (
              <span>Simpan Keputusan Evaluasi</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
