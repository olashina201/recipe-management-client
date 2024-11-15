import { Recipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link
      href={`/recipe/${recipe._id}`}
      className="group relative bg-white rounded-xl overflow-hidden border border-zinc-100 hover:border-zinc-200 transition-all duration-300 animate-fade-up"
    >
      <div className="aspect-w-16 aspect-h-9 bg-zinc-100">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={100}
            height={100}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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
      </div>
    </Link>
  );
};

export default RecipeCard;
