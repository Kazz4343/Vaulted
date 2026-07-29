'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function SearchInput({placeholder} : {placeholder : string }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    // Updates URL without refreshing the whole page
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={searchParams.get("q")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none focus:border-zinc-600 w-full max-w-md"
    />
  );
}
