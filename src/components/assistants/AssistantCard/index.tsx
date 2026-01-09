"use client";

import { useState } from "react";
import { Assistant } from "@/features/assistants/interfaces";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  assistant: Assistant;
  onEdit: () => void;
  onDelete: () => void;
  onTrain: () => void;
};

export const AssistantCard = ({
  assistant,
  onEdit,
  onDelete,
  onTrain,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
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

          <MenuItem onClick={
            ()=> {
              setAnchorEl(null);
              onTrain();
            }
            }>Entrenar</MenuItem>
          <MenuItem onClick={() => {
            setAnchorEl(null)
            onDelete()
          }} className="text-red-600">
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
  );
};
