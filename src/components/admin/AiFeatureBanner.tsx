'use client';

import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AiFeatureBannerProps {
  onOpenAiModal: () => void;
}

export const AiFeatureBanner: React.FC<AiFeatureBannerProps> = ({ onOpenAiModal }) => {
  return (
    <section className="bg-linear-to-r from-heritage-card via-heritage-forest/25 to-heritage-card border border-heritage-amber/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-heritage-amber">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-heritage-amber/20 border border-heritage-amber/40 flex items-center justify-center text-heritage-amber shrink-0 shadow-md">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-heritage-amber animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-heritage-amber text-heritage-wood text-[10px] font-extrabold rounded-md uppercase tracking-wider shadow-xs">
              RENCANA FITUR AI
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-heritage-cream">
              AI Smart Stock & Demand Predictor
            </h3>
          </div>
          <p className="text-xs text-heritage-tan leading-relaxed max-w-3xl">
            Fitur AI Rencana Pengembangan: AI Smart Stock & Demand Predictor yang memprediksi lonjakan pembeli dan kebutuhan adonan kelapa/gula aren berdasarkan cuaca dan hari libur di Malang.
          </p>
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={onOpenAiModal}
        className="shrink-0 flex items-center gap-1.5 font-extrabold text-xs self-end sm:self-center active:scale-95 transition-transform"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Lihat Konsep AI →</span>
      </Button>
    </section>
  );
};
