import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Navigation = () => {

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

          <div className="flex items-center space-x-4">
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
