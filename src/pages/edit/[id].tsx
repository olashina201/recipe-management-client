import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Recipe, RecipeFormData } from "@/lib/types";
import RecipeForm from "@/components/RecipeForm";
import Navigation from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";

const EditRecipe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 

  const { toast } = useToast();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () =>
      // Replace with actual API call
      Promise.resolve({
        id: "1",
        title: "Classic Margherita Pizza",
        description: "A traditional Italian pizza with fresh basil and mozzarella",
        ingredients: ["Pizza dough", "Tomatoes", "Mozzarella", "Basil"],
        instructions: [
          "Prepare the pizza dough",
          "Add fresh tomato sauce",
          "Top with mozzarella and basil",
          "Bake in a hot oven",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Recipe),
  });

  const { mutate: updateRecipe, isPending: isUpdating } = useMutation({
    mutationFn: async (data: RecipeFormData) => {
      // Replace with actual API call
      console.log("Updating recipe:", id, data);
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Recipe updated successfully",
      });
      router.push(`/recipe/${id}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update recipe",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-zinc-200 rounded w-3/4"></div>
            <div className="h-64 bg-zinc-200 rounded"></div>
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

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">
            Edit Recipe
          </h1>
          <RecipeForm
            initialData={recipe}
            onSubmit={updateRecipe}
            isLoading={isUpdating}
          />
        </div>
      </main>
    </div>
  );
};

export default EditRecipe;