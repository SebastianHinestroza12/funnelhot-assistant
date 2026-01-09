"use client";

import { useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, Assistant } from "@/features/assistants/interfaces";
import { getMockResponse } from "@/features/chat/mocks/getMockResponse";

type Props = {
  assistant: Assistant;
};

export const FloatingChat = ({ assistant }: Props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: input,
      },
    ]);

    setInput("");
    setLoading(true);

    const mock = getMockResponse(assistant.responseLength);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: mock.content,
        },
      ]);
      setLoading(false);
    }, mock.delay);
  };

  const resetChat = () => {
    setMessages([]);
    setLoading(false);
    setInput("");
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChatBubbleIcon />
      </motion.button>

      {/* PANEL CHAT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[340px] flex-col rounded-xl border bg-white shadow-xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{assistant.name}</p>
                <p className="text-xs text-slate-500">
                  {assistant.language} · {assistant.tone}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="text-slate-500 hover:text-slate-700"
                  title="Reiniciar conversación"
                >
                  <RestartAltIcon fontSize="small" />
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            </div>

            {/* MENSAJES */}
            <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    m.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  {m.content}
                </motion.div>
              ))}

              {loading && (
                <div className="text-xs text-slate-400">Escribiendo…</div>
              )}

              {!loading && messages.length === 0 && (
                <div className="text-xs text-slate-400">
                  Inicia una conversación para probar el asistente
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="flex gap-2 border-t p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded border px-3 py-2 text-sm"
                placeholder="Escribe un mensaje…"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="rounded bg-blue-600 px-3 text-sm text-white"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
