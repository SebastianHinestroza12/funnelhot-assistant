"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getAssistants,
  saveAssistantRules,
} from "@/features/assistants/services/assistants.storage";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Bot,
  MessageSquare,
  FileText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button, Card } from "@mui/material";
import { FloatingChat } from "@/components/chat/FloatingChat";

export default function AssistantTrainingPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const assistant = getAssistants().find((a) => a.id === id);

  const [rules, setRules] = useState(assistant?.rules ?? "");
  const [saved, setSaved] = useState(false);
  const [charCount, setCharCount] = useState(rules.length);

  useEffect(() => {
    if (!assistant) {
      router.push("/home");
    }
  }, [assistant, router]);

  if (!assistant) {
    return null;
  }

  const handleSaveRules = () => {
    saveAssistantRules(assistant.id, rules);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRulesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setRules(newValue);
    setCharCount(newValue.length);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/home">
            <Button
              variant="contained"
              size="medium"
              className="gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a asistentes
            </Button>
          </Link>

          <Card className="border-slate-200 bg-white p-6 mt-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900">
                    {assistant.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {assistant.language}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      {assistant.tone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Entrenamiento del Asistente
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Define instrucciones, reglas y comportamiento específico para este
              asistente
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              <textarea
                value={rules}
                onChange={handleRulesChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                rows={12}
                placeholder="Ejemplo:&#10;&#10;- Siempre responde de manera amigable y profesional&#10;- Usa ejemplos prácticos cuando sea posible&#10;- Si no sabes algo, admítelo honestamente&#10;- Mantén las respuestas concisas y al punto&#10;- Usa formato markdown para mejor legibilidad"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {charCount} caracteres
                </span>

                {rules.trim() && (
                  <span className="text-xs text-slate-500">
                    {rules.trim().split("\n").length} líneas
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                onClick={handleSaveRules}
                disabled={saved}
                className="gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600"
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Guardado exitosamente
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar entrenamiento
                  </>
                )}
              </Button>

              {saved && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Los cambios han sido guardados
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <FloatingChat assistant={assistant} />
    </div>
  );
}
