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

export const MOCK_RESPONSES = [
  "Claro, puedo ayudarte con eso.",
  "Entiendo tu solicitud.",
  "Vamos a resolverlo paso a paso.",
  "Buena pregunta, aquí tienes la respuesta.",
];