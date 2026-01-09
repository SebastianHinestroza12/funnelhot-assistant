export enum Language {
  Español = "Español",
  Inglés = "Inglés",
  Portugués = "Portugués",
}

export enum Tone {
  Formal = "Formal",
  Casual = "Casual",
  Profesional = "Profesional",
  Amigable = "Amigable",
}

export interface TrainingData {
  rules: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}


export interface ResponseLength {
  short: number;
  medium: number;
  long: number;
}

export interface Assistant {
  id: string;
  name: string;
  language: Language;
  tone: Tone;
  responseLength: ResponseLength;
  audioEnabled: boolean;
  rules?: string;
  createdAt?: string;
}
