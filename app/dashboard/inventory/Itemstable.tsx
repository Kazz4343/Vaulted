"use client";

import { useState } from "react";
import QuantityStepper from "./QuanStepper";
import EditItemModal from "./EditItemModal";

interface TableItem {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  quantity: number;
  minQuantity: number;
  category: { name: string } | null;
}

interface ItemsTableProps {
  items: TableItem[];
}

export default function ItemsTable({ items }: ItemsTableProps) {
  const [editingItem, setEditingItem] = useState<TableItem | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 font-medium">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {items.map((item) => {
              const isOutOfStock = item.quantity === 0;
              const isLowStock = item.quantity <= item.minQuantity && !isOutOfStock;

              return (
                <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 font-medium text-white">{item.name}</td>
                  <td className="p-4 font-mono text-xs text-zinc-400">{item.sku}</td>
                  <td className="p-4 text-zinc-300">
                    {item.category?.name || "Uncategorized"}
                  </td>
                  <td className="p-4">
                    <QuantityStepper itemId={item.id} quantity={item.quantity} />
                  </td>
                  <td className="p-4">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => setEditingItem(item)}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-soft-accent transition-colors text-xs font-medium"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <EditItemModal item={editingItem} onClose={() => setEditingItem(null)} />
      )}
    </>
  );
}