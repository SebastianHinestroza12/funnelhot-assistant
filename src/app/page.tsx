"use client";

import { useState } from "react";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AssistantModal } from "@/components/assistants/AssistantModal";
import { useAssistants } from "@/features/assistants/hooks/useAssistants";
import type { Assistant } from "@/features/assistants/interfaces";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Home() {
  const { assistants, add, update, remove } = useAssistants();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Assistant | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50">
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Asistentes IA</h1>
            <p className="mt-1 text-sm text-slate-500">
              Gestiona y entrena tus asistentes de inteligencia artificial
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
          >
            <Plus className="h-4 w-4" />
            Crear Asistente
          </motion.button>
        </div>

        {assistants.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assistants.map((assistant) => (
              <AssistantCard
                key={assistant.id}
                assistant={assistant}
                onEdit={() => {
                  setEditing(assistant);
                  setOpen(true);
                }}
                onTrain={() => router.push(`/assistants/${assistant.id}`)}
                onDelete={async () => remove(assistant.id)}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <AssistantModal
          open={open}
          initialData={editing ?? undefined}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSave={(data) => {
            if (editing) {
              update({ ...editing, ...data });
            } else {
              add(data);
            }
          }}
        />
      </main>
    </div>
  );
}
