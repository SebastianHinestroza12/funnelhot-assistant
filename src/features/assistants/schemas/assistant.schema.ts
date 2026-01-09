import { z } from "zod";
import { Language, Tone } from "@/features/assistants/interfaces";

export const assistantSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  language: z.nativeEnum(Language),
  tone: z.nativeEnum(Tone),
  responseLength: z
    .object({
      short: z.number().min(0),
      medium: z.number().min(0),
      long: z.number().min(0),
    })
    .refine((v) => v.short + v.medium + v.long === 100, {
      message: "La suma debe ser 100%",
    }),
  audioEnabled: z.boolean(),
});

export type AssistantFormData = z.infer<typeof assistantSchema>;
