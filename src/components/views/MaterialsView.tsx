import React, { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Plus, 
  FileText, 
  FileSpreadsheet, 
  FileCode,
  Tag
} from 'lucide-react';
import { MaterialItem, ActivityModule, MaterialCategory } from '../../types/dashboard';

interface MaterialsViewProps {
  materials: MaterialItem[];
  activities: ActivityModule[];
  onOpenPreviewMaterial: (mat: MaterialItem) => void;
  onOpenAddMaterial: () => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  materials,
  activities,
  onOpenPreviewMaterial,
  onOpenAddMaterial
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesActivity = selectedActivity === 'all' || m.activityId === selectedActivity;
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesActivity && matchesCategory;
  });

  const getFileBadge = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <span className="font-mono text-rose-600 font-bold">PDF</span>;
      case 'xlsx':
        return <span className="font-mono text-emerald-600 font-bold">XLSX</span>;
      case 'docx':
        return <span className="font-mono text-blue-600 font-bold">DOCX</span>;
      default:
        return <span className="font-mono text-slate-500 uppercase">{fileType}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Repository Dokumen Terpadu
            </span>
            <span>·</span>
            <span className="font-mono">{materials.length} Berkas Tersedia</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Materi, SOP, Regulasi & Panduan Lapangan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Akses seluruh berkas pedoman operasional terpusat, dapat dicari berdasarkan kata kunci, kategori, atau per kegiatan lapangan.
          </p>
        </div>

        <button
          onClick={onOpenAddMaterial}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Unggah Berkas Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari judul materi, kata kunci tag, atau kata dalam deskripsi..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            <option value="all">Semua Kategori</option>
            <option value="Pedoman Lapangan">Pedoman Lapangan</option>
            <option value="SOP & Regulasi">SOP & Regulasi</option>
            <option value="Kuesioner / Formulir">Kuesioner / Formulir</option>
            <option value="Materi Presentasi">Materi Presentasi</option>
            <option value="Data Referensi">Data Referensi</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-3 p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 text-xs">
            Tidak ada dokumen yang sesuai dengan filter pencarian Anda.
          </div>
        ) : (
          filteredMaterials.map((mat) => {
            const act = activities.find(a => a.id === mat.activityId);
            return (
              <div
                key={mat.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{mat.category}</span>
                    <span className="text-[11px] font-mono">{getFileBadge(mat.fileType)} · {mat.fileSize}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {mat.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {mat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="truncate max-w-[180px] font-medium text-slate-600 dark:text-slate-300">
                        {act?.title || 'Kegiatan Umum'}
                      </span>
                      <span className="font-mono">{mat.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span>Oleh: {mat.uploader}</span>
                      <span className="font-mono">{mat.updatedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {mat.downloadsCount}x diunduh
                  </span>

                  <button
                    onClick={() => onOpenPreviewMaterial(mat)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat & Unduh</span>
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
