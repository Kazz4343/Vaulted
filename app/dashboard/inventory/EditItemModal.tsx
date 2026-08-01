"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateItem } from "@/lib/actions/inventory";

interface EditableItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  description: string | null;
  category: { name: string } | null;
}

interface EditItemModalProps {
  item: EditableItem;
  onClose: () => void;
}

export default function EditItemModal({ item, onClose }: EditItemModalProps) {
  const router = useRouter();

  const [itemName, setItemName] = useState(item.name);
  const [sku, setSku] = useState(item.sku);
  const [cat, setCat] = useState(item.category?.name || "");
  const [quan, setQuan] = useState<number>(item.quantity);
  const [low, setLow] = useState<number>(item.minQuantity);
  const [desc, setDesc] = useState(item.description || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const res = await updateItem(item.id, {
      name: itemName,
      sku: sku,
      categoryName: cat,
      quantity: quan,
      minQuantity: low,
      description: desc,
    });

    setIsSubmitting(false);

    if (res.success) {
      router.refresh();
      onClose();
    } else {
      setFeedback({ type: "error", message: res.err || "An error occurred." });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Edit Item</h1>
            <p className="mt-1 text-sm text-zinc-400">Update details for {item.name}.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {feedback && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm border ${
              feedback.type === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Item Name</label>

            <input
              className="w-full rounded-lg border-2 bg-zinc-950 px-4 py-2 outline-none focus:border-red-500 transition-colors focus:ring-1 focus:ring-red-500"
              placeholder="Mechanical Keyboard"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          {/* SKU + Category */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium">SKU</label>

              <input
                className="w-full rounded-lg border-2 bg-zinc-950 px-4 py-2 outline-none focus:border-red-500 transition-colors focus:ring-1 focus:ring-red-500"
                placeholder="KB-001"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>

              <input
                className="w-full rounded-lg border-2 bg-zinc-950 px-4 py-2 outline-none focus:border-red-500 transition-colors focus:ring-1 focus:ring-red-500"
                placeholder="Electronics, Food, etc..."
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
            </div>
          </div>

          {/* Quantity + Min Quantity */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Quantity</label>

              <input
                type="number"
                min={0}
                className="w-full rounded-lg border-2 bg-zinc-950 px-4 py-2 outline-none focus:border-red-500 transition-colors focus:ring-1 focus:ring-red-500"
                value={quan}
                onChange={(e) => setQuan(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Low Stock Alert
              </label>

              <input
                type="number"
                min={0}
                className="w-full rounded-lg border-2 bg-zinc-950 px-4 py-2 outline-none focus:border-red-500 transition-colors focus:ring-1 focus:ring-red-500"
                value={low}
                onChange={(e) => setLow(Number(e.target.value))}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>

            <textarea
              rows={4}
              className="w-full rounded-lg border bg-zinc-950 px-4 py-2 outline-none focus:border-red-500 transition-colors focus:ring-1 focus:ring-red-500"
              placeholder="Optional...."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-zinc-700 px-5 py-2"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-600 disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}