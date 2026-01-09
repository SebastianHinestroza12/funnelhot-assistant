"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
  assistantSchema,
  type AssistantFormData,
} from "@/features/assistants/schemas/assistant.schema";
import { Language, Tone } from "@/features/assistants/interfaces";
import { DEFAULT_VALUES, RESPONSE_KEYS, RESPONSE_LABELS } from "@/constants";
import { delaySeconds } from "@/utils/delay";

type Props = {
  open: boolean;
  initialData?: AssistantFormData;
  onClose: () => void;
  onSave: (data: AssistantFormData) => Promise<void> | void;
};

export const AssistantModal = ({
  open,
  initialData,
  onClose,
  onSave,
}: Props) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<AssistantFormData>({
    resolver: zodResolver(assistantSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      reset(initialData ?? DEFAULT_VALUES);
      setStep(1);
    }
  }, [open, initialData, reset]);

  const nextStep = async () => {
    const valid = await trigger(["name", "language", "tone"]);
    if (valid) setStep(2);
  };

  const prevStep = () => setStep(1);

  const submit = async (data: AssistantFormData) => {
    setLoading(true);
    const isEdit = Boolean(initialData);

    try {
      await delaySeconds();
      await onSave(data);

      toast.success(
        isEdit
          ? "Asistente actualizado correctamente"
          : "Asistente creado correctamente",
      );

      onClose();
      setStep(1);
    } catch (error) {
      toast.error("Ocurrió un error al guardar el asistente");
    } finally {
      setLoading(false);
    }
  };

  const short = watch("responseLength.short") || 0;
  const medium = watch("responseLength.medium") || 0;
  const long = watch("responseLength.long") || 0;
  const total = short + medium + long;

  const step1Valid =
    watch("name") &&
    watch("name")!.length >= 3 &&
    watch("language") &&
    watch("tone");

  const handleSliderChange = (
    key: (typeof RESPONSE_KEYS)[number],
    value: number,
  ) => {
    const currentValues = {
      short: short,
      medium: medium,
      long: long,
    };

    currentValues[key] = value;
    const currentTotal =
      currentValues.short + currentValues.medium + currentValues.long;

    if (currentTotal > 100) {
      const otherKeys = RESPONSE_KEYS.filter((k) => k !== key);
      const remaining = 100 - value;
      const otherTotal = otherKeys.reduce(
        (sum, k) => sum + currentValues[k],
        0,
      );

      if (otherTotal > 0) {
        otherKeys.forEach((k) => {
          const proportion = currentValues[k] / otherTotal;
          setValue(`responseLength.${k}`, Math.round(remaining * proportion));
        });
      }
    }

    setValue(`responseLength.${key}`, value);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={loading ? undefined : onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="relative rounded-t-2xl sm:rounded-t-3xl bg-blue-600 p-4 sm:p-6 md:p-8 shrink-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm p-1.5 sm:p-2.5 shadow-lg shrink-0"
                      >
                        <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                      </motion.div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                        {initialData ? "Editar Asistente" : "Crear Asistente"}
                      </h2>
                    </div>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-100">
                      Paso {step} de 2 •{" "}
                      {step === 1
                        ? "Configuración básica"
                        : "Longitud de respuestas"}
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="rounded-lg sm:rounded-xl p-1.5 sm:p-2 text-white/80 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-sm shrink-0"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>

                <div className="mt-4 sm:mt-6 flex gap-1.5 sm:gap-2">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className="h-1.5 sm:h-2 flex-1 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden"
                    >
                      {step >= s && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="h-full bg-white shadow-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* NAME */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 block">
                        Nombre del asistente *
                      </label>
                      <input
                        {...register("name")}
                        disabled={loading}
                        className={`w-full rounded-lg sm:rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm transition-all focus:outline-none focus:ring-2 sm:focus:ring-4 ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                        placeholder="Ej: Asistente de Ventas"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 sm:mt-2 text-xs text-red-600 flex items-center gap-1.5"
                        >
                          <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* LANGUAGE */}
                    <Controller
                      name="language"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 block">
                            Idioma *
                          </label>
                          <select
                            {...field}
                            disabled={loading}
                            className="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all"
                          >
                            <option value="">Selecciona un idioma</option>
                            {Object.values(Language).map((l) => (
                              <option key={l} value={l}>
                                {l}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    />

                    {/* TONE */}
                    <Controller
                      name="tone"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2 block">
                            Tono *
                          </label>
                          <select
                            {...field}
                            disabled={loading}
                            className="w-full rounded-lg sm:rounded-xl border-2 border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all"
                          >
                            <option value="">Selecciona un tono</option>
                            {Object.values(Tone).map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="space-y-4 sm:space-y-6">
                      {RESPONSE_KEYS.map((key) => {
                        const config = RESPONSE_LABELS[key];
                        const Icon = config.icon;
                        const value = watch(`responseLength.${key}`) || 0;

                        return (
                          <div key={key} className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                <div
                                  className={`rounded-md sm:rounded-lg bg-linear-to-br ${
                                    key === "short"
                                      ? "from-emerald-100 to-emerald-50"
                                      : key === "medium"
                                      ? "from-blue-100 to-blue-50"
                                      : "from-purple-100 to-purple-50"
                                  } p-1.5 sm:p-2 shrink-0`}
                                >
                                  <Icon
                                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${config.color}`}
                                  />
                                </div>
                                <label className="text-xs sm:text-sm font-semibold text-slate-700 truncate">
                                  Respuesta {config.label}
                                </label>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2">
                                <motion.span
                                  key={value}
                                  initial={{ scale: 1.2, color: "#3b82f6" }}
                                  animate={{ scale: 1, color: "#1e293b" }}
                                  className="text-xl sm:text-2xl font-bold text-slate-800 min-w-10 sm:min-w-14 text-right"
                                >
                                  {value}%
                                </motion.span>
                              </div>
                            </div>
                            <div className="relative px-1">
                              <div className="relative w-full">
                                {/* Input range principal */}
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="5"
                                  value={value}
                                  onChange={(e) =>
                                    handleSliderChange(
                                      key,
                                      Number(e.target.value),
                                    )
                                  }
                                  onTouchStart={(e) => e.stopPropagation()}
                                  onTouchMove={(e) => e.stopPropagation()}
                                  disabled={loading}
                                  className="w-full h-2 sm:h-3 rounded-full appearance-none cursor-pointer transition-all touch-manipulation"
                                  style={{
                                    background: `linear-gradient(to right, ${
                                      key === "short"
                                        ? "#10b981"
                                        : key === "medium"
                                        ? "#3b82f6"
                                        : "#a855f7"
                                    } 0%, ${
                                      key === "short"
                                        ? "#10b981"
                                        : key === "medium"
                                        ? "#3b82f6"
                                        : "#a855f7"
                                    } ${value}%, #e2e8f0 ${value}%, #e2e8f0 100%)`,
                                    WebkitTapHighlightColor: "transparent",
                                  }}
                                />

                                {/* Custom thumb para mejor compatibilidad mobile */}
                                <div
                                  className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
                                  style={{
                                    left: `${value}%`,
                                    marginLeft: "-6px",
                                  }}
                                >
                                  <div
                                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-lg ${
                                      key === "short"
                                        ? "bg-emerald-500"
                                        : key === "medium"
                                        ? "bg-blue-500"
                                        : "bg-purple-500"
                                    }`}
                                  />
                                </div>
                              </div>

                              {isMobile && (
                                <div
                                  className="absolute inset-0 -m-3 cursor-pointer"
                                  onTouchStart={(e) => {
                                    e.preventDefault();
                                    const rect =
                                      e.currentTarget.getBoundingClientRect();
                                    const touch = e.touches[0];
                                    const x = touch.clientX - rect.left;
                                    const percentage = Math.min(
                                      Math.max((x / rect.width) * 100, 0),
                                      100,
                                    );
                                    const roundedValue =
                                      Math.round(percentage / 5) * 5;
                                    handleSliderChange(key, roundedValue);
                                  }}
                                  onTouchMove={(e) => {
                                    e.preventDefault();
                                    const rect =
                                      e.currentTarget.getBoundingClientRect();
                                    const touch = e.touches[0];
                                    const x = touch.clientX - rect.left;
                                    const percentage = Math.min(
                                      Math.max((x / rect.width) * 100, 0),
                                      100,
                                    );
                                    const roundedValue =
                                      Math.round(percentage / 5) * 5;
                                    handleSliderChange(key, roundedValue);
                                  }}
                                />
                              )}
                            </div>

                            {isMobile && (
                              <div className="flex items-center justify-between gap-1">
                                {[0, 25, 50, 75, 100].map((percentage) => (
                                  <button
                                    key={percentage}
                                    type="button"
                                    onClick={() =>
                                      handleSliderChange(key, percentage)
                                    }
                                    className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${
                                      value === percentage
                                        ? key === "short"
                                          ? "bg-emerald-500 text-white"
                                          : key === "medium"
                                          ? "bg-blue-500 text-white"
                                          : "bg-purple-500 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                  >
                                    {percentage}%
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 text-center transition-all ${
                        total === 100
                          ? "border-emerald-300 bg-linear-to-br from-emerald-50 to-green-50 shadow-lg shadow-emerald-100"
                          : total > 100
                          ? "border-red-300 bg-linear-to-br from-red-50 to-rose-50 shadow-lg shadow-red-100"
                          : "border-amber-300 bg-linear-to-br from-amber-50 to-yellow-50 shadow-lg shadow-amber-100"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div
                          className={`rounded-full p-1.5 sm:p-2 ${
                            total === 100
                              ? "bg-emerald-500"
                              : total > 100
                              ? "bg-red-500"
                              : "bg-amber-500"
                          } shrink-0`}
                        >
                          {total === 100 ? (
                            <svg
                              className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-slate-600 truncate">
                            Total configurado
                          </p>
                          <motion.p
                            key={total}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className={`text-2xl sm:text-3xl font-bold ${
                              total === 100
                                ? "text-emerald-700"
                                : total > 100
                                ? "text-red-700"
                                : "text-amber-700"
                            }`}
                          >
                            {total}%
                          </motion.p>
                        </div>
                      </div>
                      {total !== 100 && (
                        <p className="mt-1.5 sm:mt-2 text-xs text-slate-500">
                          {total > 100
                            ? "El total debe ser exactamente 100%"
                            : `Falta ${100 - total}% por configurar`}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-3 sm:p-4 md:p-6 shrink-0">
                <div
                  className={`flex gap-2 sm:gap-3 justify-between ${
                    step === 2 ? "flex-col sm:flex-row" : "flex-col sm:flex-row"
                  }`}
                >
                  {step === 2 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      disabled={loading}
                      className="order-1  cursor-pointer sm:order-0 rounded-lg sm:rounded-xl border-2 border-slate-300 px-4 sm:px-5 py-2.5 font-medium text-slate-700 hover:bg-white hover:border-slate-400 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Anterior
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    disabled={loading}
                    className={`rounded-lg cursor-pointer sm:rounded-xl border-2 border-slate-300 px-4 sm:px-5 py-2.5 font-medium text-slate-700 hover:bg-white hover:border-slate-400 transition-all disabled:opacity-50 text-sm sm:text-base ${
                      step === 2 ? "order-2 sm:order-0" : "order-1"
                    }`}
                  >
                    Cancelar
                  </motion.button>

                  {step === 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      disabled={!step1Valid || loading}
                      className="order-3 rounded-lg cursor-pointer sm:rounded-xl px-4 sm:px-5 py-2.5 font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base shadow-lg shadow-blue-200"
                    >
                      Siguiente
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit(submit)}
                      disabled={loading || total !== 100}
                      className="order-3 cursor-pointer rounded-lg sm:rounded-xl px-4 sm:px-5 py-2.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 text-sm sm:text-base"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </motion.div>
                          Guardando...
                        </span>
                      ) : (
                        "Guardar Asistente"
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
