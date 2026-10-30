"use client";

import React from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AdminConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}: AdminConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-outline-variant/30 text-on-surface"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDestructive
                  ? "bg-red-50 text-error"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-xl font-bold font-manrope mb-2">{title}</h3>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            {message}
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-bold font-manrope rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-5 py-2.5 text-xs font-bold font-manrope rounded-xl text-white transition-all flex items-center gap-2 shadow-sm ${
                isDestructive
                  ? "bg-error hover:bg-error/90"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
