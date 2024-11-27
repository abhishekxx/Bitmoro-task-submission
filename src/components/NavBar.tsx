import { debounce } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    debounce((value: string) => onSearch(value), 500),
    [onSearch]
  );

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 bg-gradient-to-b from-netflix-black/80 to-transparent px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-red-500 lg:text-2xl text-xl font-bold">
            <Link href="/">
                MOVIEFLIX
            </Link>
        </div>
        <div className="relative flex items-center" ref={searchRef}>
          <button
            onClick={toggleSearch}
            className="text-white hover:text-netflix-red transition-colors p-2"
          >
            <Search className="h-5 w-5" />
          </button>
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              showSearch
                ? "opacity-100 translate-x-0 lg:w-64"
                : "opacity-0 translate-x-4 w-0"
            }`}
          >
            <input
              className="bg-black/50 border-gray/50 text-white placeholder:text-gray flex h-10 lg:w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search movies..."
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}