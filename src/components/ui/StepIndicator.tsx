type Props = {
  step: number;
};

export const StepIndicator = ({ step }: Props) => {
  return (
    <div className="mb-4 flex items-center gap-2 text-sm">
      <span
        className={`h-6 w-6 rounded-full text-center leading-6 ${
          step === 1 ? "bg-blue-600 text-white" : "bg-slate-200"
        }`}
      >
        1
      </span>
      <span className="text-slate-500">Datos</span>

      <span className="mx-2 h-px w-8 bg-slate-300" />

      <span
        className={`h-6 w-6 rounded-full text-center leading-6 ${
          step === 2 ? "bg-blue-600 text-white" : "bg-slate-200"
        }`}
      >
        2
      </span>
      <span className="text-slate-500">Configuración</span>
    </div>
  );
};
