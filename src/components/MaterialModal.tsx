import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Calendar, 
  User, 
  Tag, 
  Check, 
  Plus,
  Eye,
  FileSpreadsheet,
  FileCode,
  File
} from 'lucide-react';
import { MaterialItem, MaterialCategory, ActivityModule } from '../types/dashboard';

interface PreviewMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: MaterialItem | null;
  activityTitle?: string;
}

export const PreviewMaterialModal: React.FC<PreviewMaterialModalProps> = ({
  isOpen,
  onClose,
  material,
  activityTitle
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !material) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'docx':
        return <FileCode className="w-5 h-5 text-blue-500" />;
      default:
        return <File className="w-5 h-5 text-slate-500" />;
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
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 mt-0.5">
              {getFileIcon(material.fileType)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">{material.category}</span>
                <span>·</span>
                <span className="font-mono uppercase">{material.fileType} ({material.fileSize})</span>
                <span>·</span>
                <span className="font-mono">{material.version}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {material.title}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <div className="text-slate-400 text-[11px]">Kegiatan Terkait</div>
              <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                {activityTitle || 'Semua Kegiatan'}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Pengunggah</div>
              <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                {material.uploader}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Terakhir Diperbarui</div>
              <div className="font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                {material.updatedAt}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
              Deskripsi Materi
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {material.description}
            </p>
          </div>

          {/* Document Preview / Summary */}
          {material.summaryContent && (
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
                Ringkasan Isi & Bab Dokumen
              </h4>
              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                {material.summaryContent}
              </div>
            </div>
          )}

          {/* Tags */}
          {material.tags && material.tags.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-400">Kata Kunci:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {material.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="text-xs text-slate-500">
            Telah diunduh <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{material.downloadsCount} kali</span> oleh tim lapangan
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>File Berhasil Diunduh!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen ({material.fileType.toUpperCase()})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityModule[];
  defaultActivityId?: string;
  onAddMaterial: (material: MaterialItem) => void;
}

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  isOpen,
  onClose,
  activities,
  defaultActivityId,
  onAddMaterial
}) => {
  const [title, setTitle] = useState('');
  const [activityId, setActivityId] = useState(defaultActivityId || activities[0]?.id || 'act-general');
  const [category, setCategory] = useState<MaterialCategory>('Pedoman Lapangan');
  const [fileType, setFileType] = useState<'pdf' | 'xlsx' | 'docx' | 'pptx'>('pdf');
  const [fileSize, setFileSize] = useState('2.4 MB');
  const [version, setVersion] = useState('v1.0');
  const [uploader, setUploader] = useState('Admin Operasional');
  const [description, setDescription] = useState('');
  const [summaryContent, setSummaryContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Pedoman, Operasional, Panduan');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newMaterial: MaterialItem = {
      id: `mat-${Date.now()}`,
      activityId,
      title,
      category,
      fileType,
      fileSize: fileSize || '1.5 MB',
      version: version || 'v1.0',
      updatedAt: new Date().toISOString().split('T')[0],
      uploader: uploader || 'Admin Lapangan',
      downloadsCount: 0,
      description: description || 'Dokumen panduan operasional terintegrasi.',
      summaryContent: summaryContent || 'Memuat modul dan ketentuan teknis pelaksanaan kegiatan lapangan.',
      tags
    };

    onAddMaterial(newMaterial);
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
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Unggah Materi & Dokumen Baru
              </h2>
              <p className="text-xs text-slate-500">
                SOP, pedoman lapangan, kuesioner, atau materi pelatihan.
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
              Judul Materi / Dokumen *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Petunjuk Teknis Verifikasi Lapangan 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kegiatan Terkait
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

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kategori Materi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value="Pedoman Lapangan">Pedoman Lapangan</option>
                <option value="SOP & Regulasi">SOP & Regulasi</option>
                <option value="Kuesioner / Formulir">Kuesioner / Formulir</option>
                <option value="Materi Presentasi">Materi Presentasi</option>
                <option value="Data Referensi">Data Referensi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Format File
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs uppercase font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value="pdf">PDF</option>
                <option value="xlsx">XLSX</option>
                <option value="docx">DOCX</option>
                <option value="pptx">PPTX</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ukuran File
              </label>
              <input
                type="text"
                placeholder="3.2 MB"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Versi
              </label>
              <input
                type="text"
                placeholder="v1.0"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Deskripsi Materi
            </label>
            <textarea
              rows={2}
              placeholder="Tuliskan gambaran isi dan instruksi materi ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ringkasan Isi / Catatan Penting
            </label>
            <textarea
              rows={2}
              placeholder="Rangkuman poin-poin utama bab materi untuk preview cepat..."
              value={summaryContent}
              onChange={(e) => setSummaryContent(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tag / Kata Kunci (pisahkan dengan koma)
            </label>
            <input
              type="text"
              placeholder="SOP, Validasi, Kuesioner"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
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
              Simpan & Terbitkan Materi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
