export type TemplateId = 
  | 'survey-census'
  | 'construction-infra'
  | 'community-training'
  | 'quality-compliance'
  | 'custom';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  targetIndustry: string;
  recommendedFor: string;
  accentColor: string;
  highlights: string[];
  defaultActivitiesCount: number;
}

export type ActivityStatus = 'active' | 'planning' | 'review' | 'completed';

export interface ActivityFeatures {
  materials: boolean;
  fieldMonitoring: boolean;
  outlierDetection: boolean;
  quickReports: boolean;
  teamLogs: boolean;
}

export interface ActivityModule {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  icon: string; // key of lucide icon
  pic: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  targetGoal: number;
  targetUnit: string;
  startDate: string;
  endDate: string;
  status: ActivityStatus;
  enabledFeatures: ActivityFeatures;
  order: number;
  isHidden?: boolean;
}

export type MaterialCategory = 
  | 'SOP & Regulasi'
  | 'Pedoman Lapangan'
  | 'Kuesioner / Formulir'
  | 'Materi Presentasi'
  | 'Data Referensi';

export interface MaterialItem {
  id: string;
  activityId: string; // specific activity ID or 'all'
  title: string;
  category: MaterialCategory;
  fileType: 'pdf' | 'xlsx' | 'docx' | 'pptx' | 'zip' | 'mp4';
  fileSize: string;
  version: string;
  updatedAt: string;
  uploader: string;
  downloadsCount: number;
  description: string;
  summaryContent?: string;
  tags: string[];
}

export type VerificationStatus = 'verified' | 'pending' | 'flagged' | 'rejected';

export interface FieldMonitoringLog {
  id: string;
  activityId: string;
  submissionDate: string;
  surveyorName: string;
  surveyorId: string;
  region: string;
  targetCompletedToday: number;
  targetAssignedToday: number;
  unit: string;
  durationMinutes: number;
  metricValue: number;
  metricLabel: string;
  verificationStatus: VerificationStatus;
  coordinates?: string;
  notes: string;
  photoUrl?: string;
}

export type AnomalySeverity = 'critical' | 'high' | 'medium';
export type AnomalyCategory = 
  | 'Durasi Janggal'
  | 'Ekstrem Nilai/Skor'
  | 'Disparitas Geospasial'
  | 'Inkonsistensi Logika'
  | 'Deviasi Anggaran';

export type ResolutionStatus = 
  | 'open'
  | 'investigating'
  | 'confirmed_valid'
  | 'rejected_resurvey';

export interface AnomalyEvaluation {
  id: string;
  activityId: string;
  logId?: string;
  title: string;
  dateDetected: string;
  metricName: string;
  observedValue: number;
  expectedMin: number;
  expectedMax: number;
  unit: string;
  zScore: number;
  severity: AnomalySeverity;
  category: AnomalyCategory;
  entityName: string;
  description: string;
  auditRecommendation: string;
  resolutionStatus: ResolutionStatus;
  resolvedBy?: string;
  resolutionNotes?: string;
}

export interface DashboardState {
  currentTemplateId: TemplateId;
  activities: ActivityModule[];
  materials: MaterialItem[];
  fieldLogs: FieldMonitoringLog[];
  anomalies: AnomalyEvaluation[];
}
