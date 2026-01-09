"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getAssistants,
  saveAssistantRules,
} from "@/features/assistants/services/assistants.storage";
import { FloatingChat } from "@/components/chat/FloatingChat";

export default function AssistantTrainingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const assistant = getAssistants().find((a) => a.id === id);

  const [rules, setRules] = useState(assistant?.rules ?? "");
  const [saved, setSaved] = useState(false);

  if (!assistant) {
    router.push("/");
    return null;
  }

  // Guardar entrenamiento
  const handleSaveRules = () => {
    saveAssistantRules(assistant.id, rules);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <div className="space-y-10">
        {/* HEADER */}
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">
            Entrenamiento · {assistant.name}
          </h1>
          <p className="text-sm text-slate-500">
            {assistant.language} · {assistant.tone}
          </p>
        </header>

        {/* ENTRENAMIENTO */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Entrenamiento</h2>

          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            className="w-full rounded-lg border p-3 text-sm"
            rows={6}
            placeholder="Define instrucciones, reglas y comportamiento del asistente..."
          />

          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveRules}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Guardar entrenamiento
            </button>

            {saved && (
              <span className="text-sm text-green-600">
                Entrenamiento guardado ✔
              </span>
            )}
          </div>
        </section>
      </div>

      {/* CHAT FLOTANTE */}
      <FloatingChat assistant={assistant} />
    </>
  );
}
