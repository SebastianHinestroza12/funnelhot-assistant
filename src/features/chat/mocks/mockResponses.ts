export type ResponseSize = "short" | "medium" | "long";

export interface MockResponse {
  size: ResponseSize;
  content: string;
  delay: number;
}

export const MOCK_RESPONSES: MockResponse[] = [
  // SHORT
  {
    size: "short",
    content: "Claro, entendido 👍",
    delay: 800,
  },
  {
    size: "short",
    content: "Perfecto, vamos a ello.",
    delay: 700,
  },

  // MEDIUM
  {
    size: "medium",
    content:
      "Entiendo tu solicitud. Voy a ayudarte con esta información de forma clara y directa.",
    delay: 1200,
  },
  {
    size: "medium",
    content:
      "Buena pregunta. A continuación te explico cómo funciona y qué opciones tienes.",
    delay: 1400,
  },

  // LONG
  {
    size: "long",
    content:
      "Excelente consulta. Para resolver esto correctamente, es importante entender el contexto, los posibles escenarios y la mejor estrategia a seguir. Te explico todo paso a paso para que quede completamente claro.",
    delay: 2000,
  },
  {
    size: "long",
    content:
      "Gracias por tu mensaje. He analizado lo que necesitas y a continuación te doy una explicación detallada con recomendaciones prácticas y consideraciones importantes.",
    delay: 2300,
  },
];
