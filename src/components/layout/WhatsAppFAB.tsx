"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

export default function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
      <a
        href="https://wa.me/919999999999?text=Hello%20DADA%27S%20I.T%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Instant Support"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative bg-primary text-white rounded-full w-14 h-14 md:w-16 md:h-16 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-4 focus:ring-primary/30"
      >
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />

        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping pointer-events-none" />

        {/* Tooltip */}
        <div
          className={`absolute right-full mr-4 bg-[#1F3246] text-white px-4 py-2.5 rounded-xl whitespace-nowrap text-xs shadow-xl transition-all duration-200 pointer-events-none ${
            showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
          role="tooltip"
        >
          <div className="font-bold text-primary-container">Instant Support</div>
          <div className="text-surface-variant">Connect via WhatsApp</div>
        </div>
      </a>
    </div>
  );
}
