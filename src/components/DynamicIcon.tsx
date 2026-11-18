import React from 'react';
import { 
  BarChart3, 
  MapPin, 
  Layers, 
  Zap, 
  HardHat, 
  ShieldCheck, 
  ShieldAlert, 
  Store, 
  Sprout, 
  ClipboardCheck, 
  FileText, 
  Folder, 
  Wrench, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Activity,
  Briefcase,
  Sliders,
  Database
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'HardHat':
      return <HardHat className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Store':
      return <Store className={className} />;
    case 'Sprout':
      return <Sprout className={className} />;
    case 'ClipboardCheck':
      return <ClipboardCheck className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Sliders':
      return <Sliders className={className} />;
    case 'Database':
      return <Database className={className} />;
    default:
      return <Activity className={className} />;
  }
};
