import { Assistant , Language, Tone} from "@/features/assistants/interfaces";

export const ASSISTANTS_SEED: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: Language.Español,
    tone: Tone.Profesional,
    responseLength: {
      short: 30,
      medium: 50,
      long: 20,
    },
    audioEnabled: true,
    rules:
      "Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: Language.Inglés,
    tone: Tone.Amigable,
    responseLength: {
      short: 20,
      medium: 30,
      long: 50,
    },
    audioEnabled: false,
    rules:
      "Ayudas a resolver problemas técnicos de manera clara y paso a paso.",
    createdAt: new Date().toISOString(),
  },
];
