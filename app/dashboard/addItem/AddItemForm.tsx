"use client";

import { useState } from "react";

export default function AddItemForm() {
  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [cat, setCat] = useState("");
  const [quan, setQuan] = useState<number>(1);
  const [low, setLow] = useState<number>(5);
  const [desc, setDesc] = useState("");

  const handleClear = () => {
    setItemName("");
    setSku("");
    setCat("");
    setQuan(1);
    setLow(5);
    setDesc("");
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
      <h1 className="text-2xl font-bold">Add New Item</h1>

      <p className="mt-1 text-sm text-zinc-400">Create a new inventory item.</p>

      <form className="mt-8 space-y-6">
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
              required
            />
          </div>
        </div>

        {/* Quantity + Min Quantity */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Quantity</label>

            <input
              type="number"
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
            onClick={handleClear}
          >
            Clear
          </button>

          <button className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-600">
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
}
