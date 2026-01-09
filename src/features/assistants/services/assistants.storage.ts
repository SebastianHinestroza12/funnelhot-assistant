import { KEY } from "@/constants";
import { Assistant } from "@/features/assistants/interfaces";
import { ASSISTANTS_SEED } from "@/features/assistants/data/assistants.seed";


export const getAssistants = (): Assistant[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(KEY);

  if (!stored) {
    localStorage.setItem(KEY, JSON.stringify(ASSISTANTS_SEED));
    return ASSISTANTS_SEED;
  }

  return JSON.parse(stored);
};

export const saveAssistants = (assistants: Assistant[]) => {
  localStorage.setItem(KEY, JSON.stringify(assistants));
};

export const createAssistant = (assistant: Assistant) => {
  const assistants = getAssistants();
  saveAssistants([...assistants, assistant]);
};

export const updateAssistant = (updated: Assistant) => {
  const assistants = getAssistants().map((a) =>
    a.id === updated.id ? updated : a,
  );
  saveAssistants(assistants);
};

export const deleteAssistant = (id: string) => {
  const assistants = getAssistants().filter((a) => a.id !== id);
  saveAssistants(assistants);
};
