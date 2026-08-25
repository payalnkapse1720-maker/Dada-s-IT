"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquiryFormSchema } from "@/lib/validations";
import { InquiryFormData } from "@/types";
import { AlertCircle, CheckCircle2, Send, Loader2, ShieldAlert } from "lucide-react";

interface ConsultationFormProps {
  defaultService?: string;
}

export default function ConsultationForm({ defaultService }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      inquiryType: "technical",
      message: defaultService ? `Inquiring about ${defaultService} requirements.` : "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Form Submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <div className="surface-card p-6 md:p-10 relative overflow-hidden">
      {/* Emergency Badge top right */}
      <div className="absolute top-0 right-0 bg-red-50 text-error px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl font-manrope text-xs font-bold flex items-center gap-1.5 border-l border-b border-error/20">
        <ShieldAlert className="w-4 h-4 text-error" />
        <span>Emergency 24/7 SLA Available</span>
      </div>

      <div className="mb-6 mt-4">
        <h3 className="font-extrabold text-2xl text-on-surface font-manrope">
          Initiate Enterprise Inquiry
        </h3>
        <p className="text-on-surface-variant text-sm mt-1">
          Our certified infrastructure architects will analyze your requirements and respond within 24 hours.
        </p>
      </div>

      {isSuccess ? (
        <div className="p-8 bg-primary-container/10 border border-primary-container/30 rounded-2xl text-center space-y-4">
          <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-primary font-manrope">
            Inquiry Successfully Received
          </h4>
          <p className="text-on-surface-variant text-sm max-w-md mx-auto">
            Thank you for reaching out to DADA&apos;S I.T Services &amp; Security Solutions. A senior solutions engineer has been assigned to your ticket.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-4 px-6 py-2.5 bg-primary text-white rounded-full text-xs font-bold hover:bg-primary/90 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="e.g. Ramesh"
                {...register("firstName")}
                className={`w-full bg-surface-container-low border rounded-xl px-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.firstName ? "border-error focus:ring-error" : "border-outline-variant/40"
                }`}
              />
              {errors.firstName && (
                <p className="text-error text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="e.g. Patil"
                {...register("lastName")}
                className={`w-full bg-surface-container-low border rounded-xl px-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.lastName ? "border-error focus:ring-error" : "border-outline-variant/40"
                }`}
              />
              {errors.lastName && (
                <p className="text-error text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Corporate Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="ramesh@company.com"
                {...register("email")}
                className={`w-full bg-surface-container-low border rounded-xl px-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.email ? "border-error focus:ring-error" : "border-outline-variant/40"
                }`}
              />
              {errors.email && (
                <p className="text-error text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                {...register("phone")}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
              Inquiry Type *
            </label>
            <select
              id="inquiryType"
              {...register("inquiryType")}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="technical">Technical Support / Infrastructure Assessment</option>
              <option value="sales">Sales &amp; Hardware Procurement</option>
              <option value="amc">Annual Maintenance Contract (AMC) / ITFMS</option>
              <option value="partnership">Enterprise Partnership / Vendor Empanelment</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
              Project Details &amp; Requirements *
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Describe your site location, scope of cameras/switches/servers, user count, or timeline..."
              {...register("message")}
              className={`w-full bg-surface-container-low border rounded-xl px-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                errors.message ? "border-error focus:ring-error" : "border-outline-variant/40"
              }`}
            />
            {errors.message && (
              <p className="text-error text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-full font-manrope font-bold text-sm hover:bg-primary/90 transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <span>Submit Enterprise Request</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
