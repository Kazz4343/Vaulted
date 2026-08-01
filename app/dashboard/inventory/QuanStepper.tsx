"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adjustQuantity } from "@/lib/actions/inventory";

interface QuantityStepperProps {
  itemId: string;
  quantity: number;
}

export default function QuantityStepper({ itemId, quantity }: QuantityStepperProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleAdjust = (delta: number) => {
    // Don't let quantity go below 0 client-side either
    if (delta < 0 && quantity <= 0) return;

    setError(null);

    startTransition(async () => {
      const res = await adjustQuantity(itemId, delta);

      if (!res.success) {
        setError(res.err || "Failed to update");
        return;
      }

      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
        <button
          type="button"
          onClick={() => handleAdjust(-1)}
          disabled={isPending || quantity <= 0}
          className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Decrease quantity"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <span className="w-10 text-center font-semibold text-white tabular-nums">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => handleAdjust(1)}
          disabled={isPending}
          className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 transition-colors"
          aria-label="Increase quantity"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}