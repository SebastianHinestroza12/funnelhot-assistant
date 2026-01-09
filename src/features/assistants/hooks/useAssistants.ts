"use client";

import { useState } from "react";
import {
  getAssistants,
  createAssistant,
  updateAssistant,
  deleteAssistant,
} from "@/features/assistants/services/assistants.storage";
import { Assistant } from "@/features/assistants/interfaces";

export const useAssistants = () => {
  const [assistants, setAssistants] = useState<Assistant[]>(() =>
    getAssistants(),
  );

  const add = (data: Omit<Assistant, "id" | "createdAt">) => {
    const assistant: Assistant = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    createAssistant(assistant);
    setAssistants((prev) => [...prev, assistant]);
  };

  const update = (assistant: Assistant) => {
    updateAssistant(assistant);
    setAssistants((prev) =>
      prev.map((a) => (a.id === assistant.id ? assistant : a)),
    );
  };

  const remove = (id: string) => {
    deleteAssistant(id);
    setAssistants((prev) => prev.filter((a) => a.id !== id));
  };

  return {
    assistants,
    add,
    update,
    remove,
  };
};
