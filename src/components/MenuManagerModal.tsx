import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Check, 
  Layers, 
  SlidersHorizontal,
  FolderGit2,
  MapPin,
  AlertOctagon,
  FileText,
  Users
} from 'lucide-react';
import { ActivityModule, ActivityFeatures } from '../types/dashboard';
import { DynamicIcon } from './DynamicIcon';

interface MenuManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityModule[];
  onSaveActivities: (activities: ActivityModule[]) => void;
}

const AVAILABLE_ICONS = [
  'BarChart3',
  'MapPin',
  'Layers',
  'Zap',
  'HardHat',
  'ShieldCheck',
  'ShieldAlert',
  'Store',
  'Sprout',
  'ClipboardCheck',
  'Wrench',
  'Users',
  'Briefcase',
  'Database'
];

export const MenuManagerModal: React.FC<MenuManagerModalProps> = ({
  isOpen,
  onClose,
  activities,
  onSaveActivities
}) => {
  const [list, setList] = useState<ActivityModule[]>(activities);
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [editingActivity, setEditingActivity] = useState<ActivityModule | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BarChart3');
  const [targetGoal, setTargetGoal] = useState(100);
  const [targetUnit, setTargetUnit] = useState('Target');
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [picName, setPicName] = useState('');
  const [picRole, setPicRole] = useState('');
  const [picPhone, setPicPhone] = useState('');
  const [picEmail, setPicEmail] = useState('');
  
  const [features, setFeatures] = useState<ActivityFeatures>({
    materials: true,
    fieldMonitoring: true,
    outlierDetection: true,
    quickReports: true,
    teamLogs: true
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setCode('');
    setCategory('Operasional');
    setDescription('');
    setIcon('BarChart3');
    setTargetGoal(500);
    setTargetUnit('Unit');
    setStartDate('2026-11-01');
    setEndDate('2026-12-31');
    setPicName('');
    setPicRole('Koordinator Wilayah');
    setPicPhone('+62 812-0000-0000');
    setPicEmail('pic@operasional.id');
    setFeatures({
      materials: true,
      fieldMonitoring: true,
      outlierDetection: true,
      quickReports: true,
      teamLogs: true
    });
    setEditingActivity(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setActiveTab('add');
  };

  const handleStartEdit = (act: ActivityModule) => {
    setEditingActivity(act);
    setTitle(act.title);
    setCode(act.code);
    setCategory(act.category);
    setDescription(act.description);
    setIcon(act.icon);
    setTargetGoal(act.targetGoal);
    setTargetUnit(act.targetUnit);
    setStartDate(act.startDate);
    setEndDate(act.endDate);
    setPicName(act.pic.name);
    setPicRole(act.pic.role);
    setPicPhone(act.pic.phone);
    setPicEmail(act.pic.email);
    setFeatures(act.enabledFeatures);
    setActiveTab('edit');
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    if (activeTab === 'add') {
      const newActivity: ActivityModule = {
        id: `act-custom-${Date.now()}`,
        title,
        code: code.toUpperCase(),
        category: category || 'Umum',
        description: description || 'Kegiatan operasional terintegrasi.',
        icon,
        targetGoal: Number(targetGoal) || 100,
        targetUnit: targetUnit || 'Unit',
        startDate,
        endDate,
        status: 'active',
        enabledFeatures: features,
        order: list.length + 1,
        pic: {
          name: picName || 'Penanggung Jawab',
          role: picRole || 'Koordinator',
          phone: picPhone || '+62 812-3456-7890',
          email: picEmail || 'pic@operasional.id'
        }
      };
      const updated = [...list, newActivity];
      setList(updated);
      onSaveActivities(updated);
    } else if (activeTab === 'edit' && editingActivity) {
      const updated = list.map((item) => {
        if (item.id === editingActivity.id) {
          return {
            ...item,
            title,
            code: code.toUpperCase(),
            category,
            description,
            icon,
            targetGoal: Number(targetGoal) || 100,
            targetUnit,
            startDate,
            endDate,
            enabledFeatures: features,
            pic: {
              name: picName,
              role: picRole,
              phone: picPhone,
              email: picEmail
            }
          };
        }
        return item;
      });
      setList(updated);
      onSaveActivities(updated);
    }

    resetForm();
    setActiveTab('list');
  };

  const handleDelete = (id: string) => {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
    onSaveActivities(updated);
    setDeleteConfirmId(null);
  };

  const handleToggleHide = (id: string) => {
    const updated = list.map((item) => {
      if (item.id === id) {
        return { ...item, isHidden: !item.isHidden };
      }
      return item;
    });
    setList(updated);
    onSaveActivities(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === list.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...list];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // re-assign order numbers
    const final = reordered.map((item, idx) => ({ ...item, order: idx + 1 }));
    setList(final);
    onSaveActivities(final);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Pengelola Struktur Menu & Fitur Kegiatan
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tambah, kurangi, atur urutan, dan sesuaikan fitur masing-masing menu operasional.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 pt-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab('list');
                setDeleteConfirmId(null);
              }}
              className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === 'list'
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Daftar Menu Kegiatan ({list.length})
            </button>
            <button
              onClick={handleStartAdd}
              className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'add'
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Menu Baru</span>
            </button>
            {activeTab === 'edit' && (
              <span className="pb-2.5 text-xs font-semibold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white">
                Edit: {editingActivity?.title}
              </span>
            )}
          </div>
        </div>

        {/* Tab 1: Menu List */}
        {activeTab === 'list' && (
          <div className="p-6 max-h-[65vh] overflow-y-auto space-y-3">
            {list.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Belum ada menu kegiatan</div>
                <p className="text-xs text-slate-500 mt-1 mb-4">Tambahkan menu pertama untuk mengelola kegiatan lapangan.</p>
                <button
                  onClick={handleStartAdd}
                  className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg"
                >
                  Tambah Kegiatan Sekarang
                </button>
              </div>
            ) : (
              list.map((act, index) => (
                <div
                  key={act.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    act.isHidden
                      ? 'bg-slate-100/60 dark:bg-slate-800/30 border-dashed border-slate-300 dark:border-slate-700 opacity-70'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex flex-col gap-0.5 text-slate-400">
                      <button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Geser ke atas"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === list.length - 1}
                        className="p-1 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Geser ke bawah"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <DynamicIcon name={act.icon} className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {act.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          [{act.code}]
                        </span>
                        {act.isHidden && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                            (Disembunyikan)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <span>{act.category}</span>
                        <span>·</span>
                        <span className="font-mono">Target: {act.targetGoal} {act.targetUnit}</span>
                        <span>·</span>
                        <span>PIC: {act.pic.name}</span>
                      </div>

                      {/* Enabled Features Strip */}
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                        <span className="font-medium text-slate-500 dark:text-slate-400">Fitur:</span>
                        {act.enabledFeatures.materials && <span className="text-slate-600 dark:text-slate-300">Materi</span>}
                        {act.enabledFeatures.fieldMonitoring && (
                          <>
                            <span>·</span>
                            <span className="text-slate-600 dark:text-slate-300">Monitoring Lapangan</span>
                          </>
                        )}
                        {act.enabledFeatures.outlierDetection && (
                          <>
                            <span>·</span>
                            <span className="text-slate-600 dark:text-slate-300">Deteksi Outlier</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    <button
                      onClick={() => handleToggleHide(act.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title={act.isHidden ? 'Tampilkan di Sidebar' : 'Sembunyikan dari Sidebar'}
                    >
                      {act.isHidden ? <EyeOff className="w-4 h-4 text-amber-500" /> : <Eye className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleStartEdit(act)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Menu Ini"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {deleteConfirmId === act.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(act.id)}
                          className="px-2 py-1 text-[11px] font-semibold bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
                        >
                          Hapus!
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 text-[11px] text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(act.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Hapus Menu Kegiatan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2 & 3: Add / Edit Form */}
        {(activeTab === 'add' || activeTab === 'edit') && (
          <form onSubmit={handleSaveItem} className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Menu Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Survei Ketahanan Pangan Daerah"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kode / Singkatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="SKPD-26"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono uppercase rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kategori Kegiatan
                </label>
                <input
                  type="text"
                  placeholder="Survei / Infrastruktur / Kepatuhan"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Pilih Ikon Tampilan
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {AVAILABLE_ICONS.map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setIcon(iconName)}
                      className={`p-2 rounded-lg border transition-colors shrink-0 ${
                        icon === iconName
                          ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <DynamicIcon name={iconName} className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Deskripsi Singkat & Tujuan Operasional
              </label>
              <textarea
                rows={2}
                placeholder="Jelaskan ruang lingkup kegiatan dan metode pengawasannya..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
              />
            </div>

            {/* Target and Dates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Capaian
                </label>
                <input
                  type="number"
                  min="1"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Satuan Target
                </label>
                <input
                  type="text"
                  placeholder="Rumah Tangga / Titik / Peserta"
                  value={targetUnit}
                  onChange={(e) => setTargetUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* PIC details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Penanggung Jawab (PIC)
                </label>
                <input
                  type="text"
                  placeholder="Nama lengkap PIC"
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Jabatan / Unit Kerja
                </label>
                <input
                  type="text"
                  placeholder="Koordinator Lapangan / QA Manager"
                  value={picRole}
                  onChange={(e) => setPicRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Active Features Selection */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                Pilih Fitur-Fitur Aktif untuk Menu Kegiatan Ini:
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Anda dapat mengaktifkan atau menonaktifkan fitur tertentu untuk menyesuaikan dengan kebutuhan operasional.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.materials}
                    onChange={(e) => setFeatures({ ...features, materials: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Repository Materi & Panduan
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.fieldMonitoring}
                    onChange={(e) => setFeatures({ ...features, fieldMonitoring: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Monitoring Lapangan Real-time
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.outlierDetection}
                    onChange={(e) => setFeatures({ ...features, outlierDetection: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Deteksi Evaluasi & Anomali
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab('list');
                }}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors"
              >
                {activeTab === 'add' ? 'Tambahkan ke Menu' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        {activeTab === 'list' && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs">
            <span className="text-slate-500">
              Perubahan struktur menu langsung tersimpan dan tercermin pada sidebar & navigasi.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
