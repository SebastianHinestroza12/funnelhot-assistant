"use client";

import { Bot } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/25 transition-transform hover:scale-105">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute inset-0 rounded-xl bg-linear-to-tr from-white/0 to-white/10" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-slate-900 tracking-tight">
              Funnelhot AI
            </span>
            <span className="text-xs font-medium text-slate-500">
              Gestión de Asistentes IA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-700">
              Sistema Activo
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
