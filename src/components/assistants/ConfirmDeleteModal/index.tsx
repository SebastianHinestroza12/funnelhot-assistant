"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  loading: boolean;
  assistantName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmDeleteModal = ({
  open,
  loading,
  assistantName,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={loading ? undefined : onCancel}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-200/50 bg-white shadow-2xl shadow-red-900/10"
            >
              <div className="relative overflow-hidden border-b border-red-100 bg-linear-to-br from-red-50/80 to-white p-6">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

                <div className="relative mb-4 flex justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30"
                  >
                    <AlertTriangle
                      className="h-8 w-8 text-white"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-xl font-semibold text-slate-900"
                >
                  ¿Eliminar asistente?
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="p-6"
              >
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-center text-sm leading-relaxed text-slate-600">
                    Esta acción{" "}
                    <span className="font-semibold text-slate-900">
                      no se puede deshacer
                    </span>
                    .
                    {assistantName && (
                      <>
                        {" "}
                        El asistente{" "}
                        <span className="font-semibold text-slate-900">
                          {assistantName}
                        </span>
                      </>
                    )}{" "}
                    y todos sus datos de entrenamiento serán eliminados
                    permanentemente.
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50/50 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p className="text-xs text-red-700">
                    Los usuarios no podrán interactuar con este asistente
                    después de eliminarlo.
                  </p>
                </div>
              </motion.div>

              <div className="flex gap-3 border-t border-slate-200/80 bg-slate-50/50 p-6">
                <button
                  onClick={onCancel}
                  disabled={loading}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-600/30 transition-all hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:shadow-red-600/40 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400 disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4" />
                      Eliminar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
