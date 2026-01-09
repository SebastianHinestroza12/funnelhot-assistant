import { Language, Tone } from "@/features/assistants/interfaces";
import { AssistantFormData } from "@/features/assistants/schemas/assistant.schema";

export const KEY = "assistants";

export const DEFAULT_VALUES: AssistantFormData = {
  name: "",
  language: Language.Español,
  tone: Tone.Profesional,
  responseLength: {
    short: 0,
    medium: 0,
    long: 0,
  },
  audioEnabled: false,
};
