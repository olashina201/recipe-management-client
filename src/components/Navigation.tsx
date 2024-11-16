import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

const Navigation = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-emerald-800/80 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white flex items-center gap-2"
            >
              <span className="text-2xl">🍳</span>
              Recipe
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {isSearchExpanded ? (
                <div className="animate-fade-in flex items-center bg-white/10 rounded-lg px-3 py-1">
                  <Input
                    type="search"
                    placeholder="Search recipes..."
                    className="bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 w-[200px]"
                    autoFocus
                    onBlur={() => setIsSearchExpanded(false)}
                  />
                  <Search className="h-5 w-5 text-white/70" />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setIsSearchExpanded(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Link href="/create">
              <Button
                variant="secondary"
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Recipe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
