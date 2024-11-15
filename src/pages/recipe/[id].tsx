/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter, useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRecipe, useDeleteRecipe } from "@/hooks/useRecipes";
import { useToast } from "@/components/ui/use-toast";

const RecipeDetails = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  // Safe check for params being null or undefined
  const id = params?.id;

  // Handle case where id is null or undefined
  if (!id) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <p className="text-zinc-600">Invalid Recipe ID</p>
        </div>
      </div>
    );
  }

  const { toast } = useToast();
  const { data: recipe, isLoading } = useRecipe(id);
  const { mutate: deleteRecipe } = useDeleteRecipe();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-zinc-200 rounded w-3/4"></div>
            <div className="h-64 bg-zinc-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-200 rounded w-1/4"></div>
              <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <p className="text-zinc-600">Recipe not found</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteRecipe(recipe._id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Recipe deleted successfully",
        });
        router.push("/");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete recipe",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-up">
          {recipe.imageUrl && (
            <div className="aspect-w-16 aspect-h-9 bg-zinc-100">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-3xl font-bold text-zinc-900">{recipe.title}</h1>
            <p className="mt-4 text-lg text-zinc-600">{recipe.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900">
                Ingredients
              </h2>
              <ul className="mt-4 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-zinc-600">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900">
                Instructions
              </h2>
              <ol className="mt-4 space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex text-zinc-600">
                    <span className="font-medium text-orange-500 mr-4">
                      {index + 1}.
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex space-x-4">
              <Button
                onClick={() => router.push(`/edit/${recipe._id}`)}
                variant="outline"
              >
                Edit Recipe
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Recipe
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
