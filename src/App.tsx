import React, { useState, useEffect } from 'react';
import { 
  TemplateId, 
  ActivityModule, 
  MaterialItem, 
  FieldMonitoringLog, 
  AnomalyEvaluation,
  ActivityFeatures,
  ResolutionStatus
} from './types/dashboard';
import { 
  TEMPLATE_DEFINITIONS, 
  getTemplateData 
} from './data/templates';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TemplateSelectorModal } from './components/TemplateSelectorModal';
import { MenuManagerModal } from './components/MenuManagerModal';
import { PreviewMaterialModal, AddMaterialModal } from './components/MaterialModal';
import { AddFieldLogModal } from './components/FieldLogModal';
import { AnomalyDetailModal } from './components/AnomalyDetailModal';

// Views
import { OverviewView } from './components/views/OverviewView';
import { ActivityDetailView } from './components/views/ActivityDetailView';
import { MaterialsView } from './components/views/MaterialsView';
import { FieldMonitoringView } from './components/views/FieldMonitoringView';
import { AnomalyEvaluationView } from './components/views/AnomalyEvaluationView';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Current Template
  const [currentTemplateId, setCurrentTemplateId] = useState<TemplateId>('survey-census');
  
  // Data state
  const initialData = getTemplateData('survey-census');
  const [activities, setActivities] = useState<ActivityModule[]>(initialData.activities);
  const [materials, setMaterials] = useState<MaterialItem[]>(initialData.materials);
  const [fieldLogs, setFieldLogs] = useState<FieldMonitoringLog[]>(initialData.fieldLogs);
  const [anomalies, setAnomalies] = useState<AnomalyEvaluation[]>(initialData.anomalies);

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('overview');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isMenuManagerOpen, setIsMenuManagerOpen] = useState(false);
  const [isAddLogOpen, setIsAddLogOpen] = useState(false);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [defaultActivityIdForModal, setDefaultActivityIdForModal] = useState<string | undefined>(undefined);
  const [previewMaterial, setPreviewMaterial] = useState<MaterialItem | null>(null);
  const [inspectAnomaly, setInspectAnomaly] = useState<AnomalyEvaluation | null>(null);

  const currentTemplate = TEMPLATE_DEFINITIONS.find(t => t.id === currentTemplateId) || TEMPLATE_DEFINITIONS[0];

  // Template switch handler
  const handleSelectTemplate = (templateId: TemplateId) => {
    setCurrentTemplateId(templateId);
    const data = getTemplateData(templateId);
    setActivities(data.activities);
    setMaterials(data.materials);
    setFieldLogs(data.fieldLogs);
    setAnomalies(data.anomalies);
    setCurrentView('overview');
    setSelectedActivityId(null);
  };

  // Activity Menu updates
  const handleSaveActivities = (updatedActivities: ActivityModule[]) => {
    setActivities(updatedActivities);
    if (selectedActivityId && !updatedActivities.find(a => a.id === selectedActivityId)) {
      setCurrentView('overview');
      setSelectedActivityId(null);
    }
  };

  const handleUpdateActivityFeatures = (id: string, features: ActivityFeatures) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, enabledFeatures: features } : a));
  };

  // Add Log
  const handleAddLog = (newLog: FieldMonitoringLog, detectedAnomaly?: AnomalyEvaluation) => {
    setFieldLogs(prev => [newLog, ...prev]);
    if (detectedAnomaly) {
      setAnomalies(prev => [detectedAnomaly, ...prev]);
    }
  };

  // Add Material
  const handleAddMaterial = (newMaterial: MaterialItem) => {
    setMaterials(prev => [newMaterial, ...prev]);
  };

  // Update Anomaly Status
  const handleUpdateAnomalyStatus = (id: string, newStatus: ResolutionStatus, notes: string) => {
    setAnomalies(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          resolutionStatus: newStatus,
          resolutionNotes: notes
        };
      }
      return a;
    }));
  };

  // View Navigation
  const handleSelectView = (view: string, activityId?: string | null) => {
    setCurrentView(view);
    setSelectedActivityId(activityId || null);
  };

  const handleOpenAddLogWithActivity = (actId?: string) => {
    setDefaultActivityIdForModal(actId || selectedActivityId || activities[0]?.id);
    setIsAddLogOpen(true);
  };

  const handleOpenAddMaterialWithActivity = (actId?: string) => {
    setDefaultActivityIdForModal(actId || selectedActivityId || activities[0]?.id);
    setIsAddMaterialOpen(true);
  };

  // Compute view title for header breadcrumb
  const getViewTitle = () => {
    if (currentView === 'activity-detail' && selectedActivityId) {
      const act = activities.find(a => a.id === selectedActivityId);
      return act ? act.title : 'Detail Kegiatan';
    }
    switch (currentView) {
      case 'materials':
        return 'Semua Materi & Regulasi';
      case 'field-monitoring':
        return 'Monitoring Lapangan Global';
      case 'anomalies':
        return 'Pusat Evaluasi & Deteksi Outlier';
      case 'overview':
      default:
        return 'Ringkasan Operasional Terpadu';
    }
  };

  const selectedActivity = activities.find(a => a.id === selectedActivityId);
  const openAnomalyCount = anomalies.filter(a => a.resolutionStatus === 'open').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900">
      {/* Top Header */}
      <Header
        currentTemplate={currentTemplate}
        onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
        onOpenMenuManager={() => setIsMenuManagerOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleSidebarMobile={() => setMobileSidebarOpen(true)}
        currentViewTitle={getViewTitle()}
      />

      <div className="flex-1 flex">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          selectedActivityId={selectedActivityId}
          activities={activities}
          currentTemplate={currentTemplate}
          anomalyCount={openAnomalyCount}
          onSelectView={handleSelectView}
          onOpenMenuManager={() => setIsMenuManagerOpen(true)}
          onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <div className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
            {currentView === 'overview' && (
              <OverviewView
                currentTemplate={currentTemplate}
                activities={activities}
                materials={materials}
                fieldLogs={fieldLogs}
                anomalies={anomalies}
                onSelectActivity={(id) => handleSelectView('activity-detail', id)}
                onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
                onOpenMenuManager={() => setIsMenuManagerOpen(true)}
                onOpenAddLog={() => handleOpenAddLogWithActivity()}
                onOpenAddMaterial={() => handleOpenAddMaterialWithActivity()}
                onInspectAnomaly={(anom) => setInspectAnomaly(anom)}
                onNavigateView={(v) => handleSelectView(v, null)}
              />
            )}

            {currentView === 'activity-detail' && selectedActivity && (
              <ActivityDetailView
                activity={selectedActivity}
                materials={materials}
                fieldLogs={fieldLogs}
                anomalies={anomalies}
                onOpenPreviewMaterial={(mat) => setPreviewMaterial(mat)}
                onOpenAddMaterial={(actId) => handleOpenAddMaterialWithActivity(actId)}
                onOpenAddLog={(actId) => handleOpenAddLogWithActivity(actId)}
                onInspectAnomaly={(anom) => setInspectAnomaly(anom)}
                onUpdateActivityFeatures={handleUpdateActivityFeatures}
              />
            )}

            {currentView === 'materials' && (
              <MaterialsView
                materials={materials}
                activities={activities}
                onOpenPreviewMaterial={(mat) => setPreviewMaterial(mat)}
                onOpenAddMaterial={() => handleOpenAddMaterialWithActivity()}
              />
            )}

            {currentView === 'field-monitoring' && (
              <FieldMonitoringView
                fieldLogs={fieldLogs}
                activities={activities}
                onOpenAddLog={() => handleOpenAddLogWithActivity()}
              />
            )}

            {currentView === 'anomalies' && (
              <AnomalyEvaluationView
                anomalies={anomalies}
                activities={activities}
                onInspectAnomaly={(anom) => setInspectAnomaly(anom)}
              />
            )}
          </div>

          {/* Clean Editorial Footer */}
          <footer className="mt-auto px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/50 dark:bg-slate-900/50">
            <div>
              <span>Sistem Dashboard Operasional Terpadu Multi-Kegiatan</span>
              <span className="mx-2">·</span>
              <span className="font-mono">Versi 2.4.0</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <button 
                onClick={() => setIsTemplateSelectorOpen(true)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Ganti Contoh Template ({currentTemplate.badge})
              </button>
              <span>·</span>
              <button 
                onClick={() => setIsMenuManagerOpen(true)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Kelola Struktur Menu
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Modals */}
      <TemplateSelectorModal
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        templates={TEMPLATE_DEFINITIONS}
        currentTemplateId={currentTemplateId}
        onSelectTemplate={handleSelectTemplate}
      />

      <MenuManagerModal
        isOpen={isMenuManagerOpen}
        onClose={() => setIsMenuManagerOpen(false)}
        activities={activities}
        onSaveActivities={handleSaveActivities}
      />

      <AddFieldLogModal
        isOpen={isAddLogOpen}
        onClose={() => setIsAddLogOpen(false)}
        activities={activities}
        defaultActivityId={defaultActivityIdForModal}
        onAddLog={handleAddLog}
      />

      <AddMaterialModal
        isOpen={isAddMaterialOpen}
        onClose={() => setIsAddMaterialOpen(false)}
        activities={activities}
        defaultActivityId={defaultActivityIdForModal}
        onAddMaterial={handleAddMaterial}
      />

      <PreviewMaterialModal
        isOpen={!!previewMaterial}
        onClose={() => setPreviewMaterial(null)}
        material={previewMaterial}
        activityTitle={activities.find(a => a.id === previewMaterial?.activityId)?.title}
      />

      <AnomalyDetailModal
        isOpen={!!inspectAnomaly}
        onClose={() => setInspectAnomaly(null)}
        anomaly={inspectAnomaly}
        activityTitle={activities.find(a => a.id === inspectAnomaly?.activityId)?.title}
        onUpdateStatus={handleUpdateAnomalyStatus}
      />
    </div>
  );
}
