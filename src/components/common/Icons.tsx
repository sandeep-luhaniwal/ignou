"use client";

import React from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Upload,
  Check,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  ClipboardList,
  PenTool,
  Headphones,
  ShieldCheck,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";

interface IconsProps {
  icon: string;
  className?: string;
}

const Icons: React.FC<IconsProps> = ({ icon, className = "" }) => {
  // Convert standard names to lowercase and handle variation
  const iconName = icon.toLowerCase().trim();

  switch (iconName) {
    case "search":
      return <Search className={className} size={18} />;
    case "dropdown":
    case "chevron-down":
      return <ChevronDown className={className} size={18} />;
    case "vertical-dots":
    case "more-vertical":
      return <MoreVertical className={className} size={18} />;
    case "upload":
      return <Upload className={className} size={18} />;
    case "check":
      return <Check className={className} size={18} />;
    case "alert":
    case "alert-circle":
      return <AlertCircle className={className} size={18} />;
    case "help":
    case "help-circle":
      return <HelpCircle className={className} size={18} />;
    case "phone":
    case "phone-call":
      return <PhoneCall className={className} size={18} />;
    case "arrow":
    case "arrow-right":
      return <ArrowRight className={className} size={18} />;
    case "check-circle":
      return <CheckCircle className={className} size={18} />;
    case "graduation":
    case "graduation-cap":
      return <GraduationCap className={className} size={18} />;
    case "clipboard":
    case "clipboard-list":
      return <ClipboardList className={className} size={18} />;
    case "pen":
    case "pen-tool":
      return <PenTool className={className} size={18} />;
    case "support":
    case "headphones":
      return <Headphones className={className} size={18} />;
    case "shield":
    case "shield-check":
      return <ShieldCheck className={className} size={18} />;
    case "star":
      return <Star className={className} size={18} />;
    case "eye":
      return <Eye className={className} size={18} />;
    case "eye-off":
      return <EyeOff className={className} size={18} />;
    default:
      // Fallback to a help icon or search icon so it doesn't crash
      return <HelpCircle className={className} size={18} />;
  }
};

export default Icons;
