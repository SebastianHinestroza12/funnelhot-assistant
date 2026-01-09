"use client";

import { useState } from "react";
import { Assistant } from "@/features/assistants/interfaces";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { delaySeconds } from "@/utils/delay";
import { ConfirmDeleteModal } from "@/components/assistants/ConfirmDeleteModal";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const toastId = toast.loading("Eliminando asistente...");

    try {
      await delaySeconds(1200);
      await onDelete();

      toast.update(toastId, {
        render: "Asistente eliminado correctamente",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch {
      toast.update(toastId, {
        render: "Error al eliminar el asistente",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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

      <div className="relative rounded-xl border bg-white p-4 shadow-sm">
        <div className="absolute right-2 top-2">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onEdit();
              }}
            >
              Editar
            </MenuItem>

            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onTrain();
              }}
            >
              Entrenar
            </MenuItem>

            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setConfirmOpen(true);
              }}
              className="text-red-600"
            >
              Eliminar
            </MenuItem>
          </Menu>
        </div>

        <h3 className="text-lg font-semibold">{assistant.name}</h3>
        <p className="text-sm text-slate-500">
          {assistant.language} · {assistant.tone}
        </p>

        <div className="mt-3 text-xs text-slate-400">
          Creado:{" "}
          {assistant.createdAt
            ? new Date(assistant.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
    </>
  );
};
