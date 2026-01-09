"use client";

import { useParams, useRouter } from "next/navigation";
import { Assistant } from "@/features/assistants/interfaces";
import { getAssistants } from "@/features/assistants/services/assistants.storage";

export default function AssistantTrainingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const assistant: Assistant | undefined = getAssistants().find(
    (a) => a.id === id,
  );

  if (!assistant) {
    router.push("/");
    return null;
  }

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">
          Entrenamiento · {assistant.name}
        </h1>
        <p className="text-sm text-slate-500">
          {assistant.language} · {assistant.tone}
        </p>
      </header>

      <div className="rounded-lg border p-6 text-sm text-slate-500">
        Módulo de entrenamiento (en construcción)
      </div>
    </div>
  );
}
