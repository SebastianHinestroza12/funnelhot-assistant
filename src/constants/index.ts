import { Language, Tone } from "@/features/assistants/interfaces";
import { AssistantFormData } from "@/features/assistants/schemas/assistant.schema";
import { Zap, MessageSquare, FileText } from "lucide-react";
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