import PsychologyIcon from "@mui/icons-material/Psychology";

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-12 text-center">
    <PsychologyIcon className="text-slate-400" fontSize="large" />
    <h3 className="mt-4 font-semibold">No hay asistentes</h3>
    <p className="mt-2 text-sm text-slate-500">
      Crea tu primer asistente para comenzar.
    </p>
  </div>
);
