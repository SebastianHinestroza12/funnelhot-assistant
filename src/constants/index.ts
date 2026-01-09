import { Language, Tone } from "@/features/assistants/interfaces";
import { AssistantFormData } from "@/features/assistants/schemas/assistant.schema";
import {
  Zap,
  MessageSquare,
  FileText,
  Globe,
  Bot,
  Brain,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const KEY = "assistants";

export const RESPONSE_KEYS = ["short", "medium", "long"] as const;

export const DEFAULT_VALUES: AssistantFormData = {
  name: "",
  language: Language.Español,
  tone: Tone.Profesional,
  responseLength: {
    short: 30,
    medium: 50,
    long: 20,
  },
  audioEnabled: false,
};

export const RESPONSE_LABELS: Record<
  (typeof RESPONSE_KEYS)[number],
  { label: string; icon: LucideIcon; color: string }
> = {
  short: { label: "Corta", icon: Zap, color: "text-emerald-600" },
  medium: { label: "Media", icon: MessageSquare, color: "text-blue-600" },
  long: { label: "Larga", icon: FileText, color: "text-purple-600" },
};

export const FEATURES = [
  {
    icon: Bot,
    title: "Asistentes Inteligentes",
    description:
      "Crea asistentes de IA personalizados con diferentes tonos y personalidades",
  },
  {
    icon: MessageSquare,
    title: "Respuestas Personalizadas",
    description:
      "Configura la longitud y estilo de las respuestas según tus necesidades",
  },
  {
    icon: Brain,
    title: "Entrenamiento Avanzado",
    description:
      "Entrena a tus asistentes con prompts específicos para tu negocio",
  },
  {
    icon: Globe,
    title: "Multiidioma",
    description:
      "Soporta múltiples idiomas para interacciones globales con tus leads",
  },
  {
    icon: Zap,
    title: "Automatización",
    description: "Automatiza tus interacciones y ahorra tiempo valioso",
  },
  {
    icon: Sparkles,
    title: "Interfaz Intuitiva",
    description:
      "Gestión simple y poderosa de todos tus asistentes en un solo lugar",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96] as const,
    },
  },
};