"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface PaginationProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export default function PaginationControl({
  totalItems,
  totalPages,
  currentPage,
  pageSize,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(newPage: number) {
    const param = new URLSearchParams(searchParams);
    param.set("page", newPage.toString());

    router.push(`${pathname}?${param.toString()}`);
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4 text-sm text-zinc-400">
      <div>
        Showing{" "}
        <span className="text-white">{totalItems > 0 ? startItem : 0}</span> to{" "}
        <span className="text-white">{endItem}</span> of{" "}
        <span className="text-white">{totalItems}</span> items
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 hover:bg-zinc-800 disabled:opacity-40 transition-colors"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 hover:bg-zinc-800 disabled:opacity-40 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
