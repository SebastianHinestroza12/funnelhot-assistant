"use client";

import PsychologyIcon from "@mui/icons-material/Psychology";
import Chip from "@mui/material/Chip";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <PsychologyIcon />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              Funnelhot
            </span>
            <span className="text-xs text-slate-500">
              Gestión de Asistentes IA
            </span>
          </div>

          <Chip
            label="Módulo"
            size="small"
            color="primary"
            variant="outlined"
          />
        </div>

        {/* Placeholder para futuro */}
        <div className="text-xs text-slate-400">Prueba Técnica</div>
      </div>
    </header>
  );
}
