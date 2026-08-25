"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqsData } from "@/data/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1000px] mx-auto bg-background">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 font-manrope">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Clarifications &amp; Details</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg mt-2">
          Everything you need to know about our SLAs, AMC structures, hardware procurement, and deployment protocols.
        </p>
      </div>

      <div className="space-y-4">
        {faqsData.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="surface-card rounded-2xl border border-outline-variant/30 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-manrope font-bold text-base md:text-lg text-on-surface hover:text-primary transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <div
                  className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary text-white" : "text-on-surface-variant"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm md:text-base text-on-surface-variant leading-relaxed border-t border-outline-variant/10">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
