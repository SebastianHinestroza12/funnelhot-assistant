"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  assistantSchema,
  AssistantFormData,
} from "@/features/assistants/schemas/assistant.schema";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Language, Tone } from "@/features/assistants/interfaces";
import { DEFAULT_VALUES } from "@/constants";
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

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    control,
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

  const submit = async (data: AssistantFormData) => {
    setLoading(true);

    const isEdit = Boolean(initialData);
    const toastId = toast.loading(
      isEdit ? "Actualizando asistente..." : "Creando asistente...",
    );

    try {
      await delaySeconds();
      await onSave(data);

      toast.update(toastId, {
        render: isEdit
          ? "Asistente actualizado correctamente"
          : "Asistente creado correctamente",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onClose();
      setStep(1);
    } catch {
      toast.update(toastId, {
        render: "Ocurrió un error, intenta nuevamente",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => setStep(1);

  const short = watch("responseLength.short") || 0;
  const medium = watch("responseLength.medium") || 0;
  const long = watch("responseLength.long") || 0;
  const total = short + medium + long;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {initialData ? "Editar Asistente" : "Crear Asistente"}
      </DialogTitle>

      <DialogContent className="pt-2 space-y-4">
        <StepIndicator step={step} />

        {/* PASO 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <TextField
              label="Nombre del asistente"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={
                errors.name?.message ??
                "Ej: Asistente de Ventas, Soporte Técnico"
              }
            />

            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Idioma principal" fullWidth>
                  {Object.values(Language).map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Tono de comunicación"
                  fullWidth
                >
                  {Object.values(Tone).map((tone) => (
                    <MenuItem key={tone} value={tone}>
                      {tone}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <TextField
              label="Respuestas cortas (%)"
              type="number"
              fullWidth
              {...register("responseLength.short", { valueAsNumber: true })}
            />
            <TextField
              label="Respuestas medias (%)"
              type="number"
              fullWidth
              {...register("responseLength.medium", { valueAsNumber: true })}
            />
            <TextField
              label="Respuestas largas (%)"
              type="number"
              fullWidth
              {...register("responseLength.long", { valueAsNumber: true })}
            />

            <Alert severity={total === 100 ? "success" : "warning"}>
              Total configurado: {total}% (debe ser 100%)
            </Alert>

            {errors.responseLength && (
              <Alert severity="error">{errors.responseLength.message}</Alert>
            )}

            <FormControlLabel
              control={<Checkbox {...register("audioEnabled")} />}
              label="Habilitar respuestas de audio"
            />
          </div>
        )}
      </DialogContent>

      <DialogActions className="flex justify-between px-6 pb-4">
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>

        {step === 1 ? (
          <Button variant="contained" onClick={nextStep} disabled={loading}>
            Siguiente
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outlined" onClick={prevStep} disabled={loading}>
              Atrás
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit(submit)}
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={18} /> : <SaveIcon />
              }
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        )}
      </DialogActions>
    </Dialog>
  );
};
