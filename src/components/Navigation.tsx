import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-zinc-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Recipes
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-orange-500"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/create"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/create"
                  ? "text-orange-500"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
