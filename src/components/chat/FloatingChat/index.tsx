"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, RotateCcw, Send, Sparkles } from "lucide-react";
import type { ChatMessage, Assistant } from "@/features/assistants/interfaces";
import { getMockResponse } from "@/features/chat/mocks/getMockResponse";

type Props = {
  assistant: Assistant;
};

export const FloatingChat = ({ assistant }: Props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center cursor-pointer justify-center rounded-2xl bg-blue-700 text-white shadow-2xl border border-slate-700 hover:bg-blue-800 transition-colors md:h-14 md:w-14"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <MessageCircle className="h-6 w-6 md:h-5 md:w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-4 right-4 left-4 z-50 flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl md:bottom-24 md:right-6 md:left-auto md:h-145 md:w-105 max-h-[85vh]"
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 rounded-t-2xl">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {assistant.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {assistant.language} • {assistant.tone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={resetChat}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    title="Reiniciar conversación"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="rounded-2xl bg-slate-100 p-4 mb-3">
                      <MessageCircle className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Comienza una conversación
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                      Escribe un mensaje para interactuar con {assistant.name}
                    </p>
                  </div>
                )}

                {messages.map((m, index) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-slate-900 text-white shadow-lg"
                          : "bg-white border border-slate-200 text-slate-900 shadow-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2 w-2 rounded-full bg-slate-400"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">
                          Escribiendo
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-slate-200 bg-white p-4 rounded-b-2xl">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="flex-1 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Escribe tu mensaje..."
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-white hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
