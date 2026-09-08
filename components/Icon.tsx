import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Compass,
  Download,
  Eye,
  FileCheck,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  HeartHandshake,
  Home,
  Info,
  Languages,
  Lightbulb,
  Mail,
  MapPin,
  Mic,
  Phone,
  Plane,
  Printer,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/** String keys let /data files reference icons without importing components. */
export const iconMap: Record<string, LucideIcon> = {
  award: Award,
  book: BookOpen,
  briefcase: Briefcase,
  building: Building2,
  calendar: Calendar,
  check: CheckCircle2,
  clipboard: ClipboardList,
  clock: Clock,
  compass: Compass,
  download: Download,
  eye: Eye,
  file: FileText,
  fileCheck: FileCheck,
  filter: Filter,
  globe: Globe,
  graduation: GraduationCap,
  heart: HeartHandshake,
  home: Home,
  info: Info,
  languages: Languages,
  lightbulb: Lightbulb,
  mail: Mail,
  mapPin: MapPin,
  mic: Mic,
  phone: Phone,
  plane: Plane,
  printer: Printer,
  quote: Quote,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  users: Users,
  wallet: Wallet,
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/* ------------------------------------------------------------------ brands */
/* lucide-react v1 removed brand marks, so these are hand-authored. */

type BrandProps = { className?: string };

// TikTok lives in its own file (see components/icons/TikTokIcon.tsx); re-exported
// here so every brand mark can still be imported from one place.
export { TikTokIcon } from "./icons/TikTokIcon";

export function WhatsAppIcon({ className = "h-5 w-5" }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.943c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.582 0 11.941-5.359 11.944-11.943 0-3.191-1.24-6.191-3.495-8.447" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881" />
    </svg>
  );
}

export function GlobeBrandIcon({ className = "h-5 w-5" }: BrandProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
