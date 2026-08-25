"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productQuoteSchema } from "@/lib/validations";
import { ProductQuoteFormData, Product } from "@/types";
import { X, CheckCircle2, Send, Loader2, PackageCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductQuoteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuoteModal({
  product,
  isOpen,
  onClose,
}: ProductQuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductQuoteFormData>({
    resolver: zodResolver(productQuoteSchema),
    defaultValues: {
      productName: product ? product.name : "",
      quantity: 1,
    },
  });

  const onSubmit = async (data: ProductQuoteFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Product Quote Submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative border border-outline-variant/30 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <PackageCheck className="w-4 h-4" />
            <span>Instant Quotation Request</span>
          </div>

          <h3 className="text-xl font-bold text-on-surface font-manrope pr-8">
            {product.name}
          </h3>
          <p className="text-xs text-on-surface-variant mb-6">
            Brand: {product.brand} | Category: {product.category}
          </p>

          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-primary font-manrope">
                Quotation Request Dispatched
              </h4>
              <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                Our procurement team will send you the official price quote and bulk discount sheet to your email.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-xs font-bold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" value={product.name} {...register("productName")} />

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 font-manrope">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  {...register("fullName")}
                  className={`w-full bg-surface-container-low border rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.fullName ? "border-error" : "border-outline-variant/40"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 font-manrope">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    className={`w-full bg-surface-container-low border rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? "border-error" : "border-outline-variant/40"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 font-manrope">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                    className={`w-full bg-surface-container-low border rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? "border-error" : "border-outline-variant/40"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 font-manrope">
                    Company / Entity
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    {...register("companyName")}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 font-manrope">
                    Quantity Required *
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    {...register("quantity", { valueAsNumber: true })}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 font-manrope">
                  Additional Notes or Project Specs
                </label>
                <textarea
                  rows={2}
                  placeholder="Need installation, cabling, AMC warranty addon..."
                  {...register("notes")}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-full font-manrope font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Request Official Quotation</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
