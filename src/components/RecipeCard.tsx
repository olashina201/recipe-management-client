import { Recipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const formattedDate = new Date(recipe.createdAt).toLocaleString();

  return (
    <Link
      href={`/recipe/${recipe._id}`}
      className="group relative bg-white rounded-xl overflow-hidden border border-zinc-100 hover:border-zinc-200 transition-all duration-300 animate-fade-up"
    >
      <div className="relative w-full h-64">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-zinc-100">
            <span className="text-zinc-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-zinc-900 group-hover:text-orange-500 transition-colors">
          {recipe.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
          {recipe.description}
        </p>
        <div className="mt-2 flex items-center text-sm text-zinc-500">
          {/* <ClockIcon className="w-4 h-4 mr-2 text-zinc-400" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
