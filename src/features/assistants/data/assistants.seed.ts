import { Assistant, Language, Tone } from "@/features/assistants/interfaces";

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

  {
    id: "3",
    name: "Asistente de Marketing Digital",
    language: Language.Portugués,
    tone: Tone.Casual,
    responseLength: {
      short: 25,
      medium: 45,
      long: 30,
    },
    audioEnabled: false,
    rules:
      "Eres un experto en marketing digital. Propón ideas creativas, campañas, copies y estrategias enfocadas en conversión y crecimiento.",
    createdAt: new Date().toISOString(),
  },

  {
    id: "4",
    name: "Asistente de Atención al Cliente",
    language: Language.Español,
    tone: Tone.Formal,
    responseLength: {
      short: 40,
      medium: 40,
      long: 20,
    },
    audioEnabled: true,
    rules:
      "Atiendes a clientes con empatía y paciencia. Responde de forma clara, tranquilizadora y orientada a resolver inquietudes.",
    createdAt: new Date().toISOString(),
  },
];
