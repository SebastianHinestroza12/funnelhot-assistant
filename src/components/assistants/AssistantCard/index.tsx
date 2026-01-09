"use client";

import { useState } from "react";
import type { Assistant } from "@/features/assistants/interfaces";
import { toast } from "react-toastify";
import { delaySeconds } from "@/utils/delay";
import { ConfirmDeleteModal } from "@/components/assistants/ConfirmDeleteModal";
import { motion } from "framer-motion";
import { Pencil, Trash2, Bot, MessageSquare } from "lucide-react";

type Props = {
  assistant: Assistant;
  onEdit: () => void;
  onTrain: () => void;
  onDelete: () => Promise<void>;
};

export const AssistantCard = ({
  assistant,
  onEdit,
  onTrain,
  onDelete,
}: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await delaySeconds();
      await onDelete();

      toast.success("Asistente eliminado correctamente");
    } catch {
      toast.error("Error al eliminar el asistente");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <ConfirmDeleteModal
        open={confirmOpen}
        loading={loading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className="group relative rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200"
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-50/0 to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:from-blue-50/30 group-hover:to-transparent group-hover:opacity-100" />

        <div className="relative space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                  {assistant.name}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {assistant.language} · {assistant.tone}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <span>
              Creado:{" "}
              {assistant.createdAt
                ? new Date(assistant.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onTrain}
              className="flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30"
            >
              <MessageSquare className="h-4 w-4" />
              Entrenar
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
            >
              <Pencil className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmOpen(true)}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
