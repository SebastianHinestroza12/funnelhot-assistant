"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-linear-to-br from-slate-50 to-white p-12 text-center"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 0, -10] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-2xl" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 shadow-xl shadow-blue-500/25">
          <BrainCircuit className="h-10 w-10 text-white" />

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
            className="absolute -right-1 -top-1"
          >
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold text-slate-900">
        No hay asistentes creados
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">
        Comienza creando tu primer asistente de IA para automatizar
        conversaciones y entrenar con conocimiento personalizado.
      </p>

      <div className="mt-8 flex items-center gap-2">
        <div className="h-1 w-1 rounded-full bg-blue-400" />
        <div className="h-1 w-1 rounded-full bg-blue-500" />
        <div className="h-1 w-1 rounded-full bg-blue-600" />
      </div>
    </motion.div>
  );
};
