import { Language, Tone } from "@/features/assistants/interfaces";
import { AssistantFormData } from "@/features/assistants/schemas/assistant.schema";

export const KEY = "assistants";

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
