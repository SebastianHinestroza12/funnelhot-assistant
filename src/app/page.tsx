"use client";

import { useState } from "react";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAssistants } from "@/features/assistants/hooks/useAssistants";
import { AssistantModal } from "@/components/assistants/AssistantModal";
import { Assistant } from "@/features/assistants/interfaces";
import { useRouter } from "next/navigation";

export default function Home() {
  const { assistants, add, update, remove } = useAssistants();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Assistant | null>(null);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Asistentes</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
        >
          Crear Asistente
        </button>
      </div>

      {assistants.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assistants.map((a) => (
            <AssistantCard
              key={a.id}
              assistant={a}
              onEdit={() => {
                setEditing(a);
                setOpen(true);
              }}
              onTrain={() => router.push(`/assistants/${a.id}`)}
              onDelete={() => remove(a.id)}
            />
          ))}
        </div>
      )}

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
    </div>
  );
}
