'use client';

import React, { useEffect } from 'react';

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  client?: string;
  slot: string;
  format?: string;
  responsive?: string;
  layoutKey?: string;
  label?: string; // Optional label "Advertisement"
}

export const AdSense: React.FC<AdSenseProps> = ({ 
  className, 
  style, 
  client = "ca-pub-REPLACE_ME", 
  slot, 
  format = "auto", 
  responsive = "true",
  layoutKey,
  label
}) => {
  useEffect(() => {
    try {
      // Safely push to adsbygoogle
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []); // Run once on mount

  return (
    <div className={`ad-container my-6 overflow-hidden flex flex-col items-center ${className || ''}`}>
      {label && (
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 self-center bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
          {label}
        </span>
      )}
      <div className="w-full">
        <ins className="adsbygoogle"
             style={{ display: 'block', minHeight: '100px', ...style }}
             data-ad-client={client}
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive={responsive}
             data-ad-layout-key={layoutKey}>
        </ins>
      </div>
    </div>
  );
};