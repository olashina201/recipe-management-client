/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter, useParams } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import Navigation from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";
import { useRecipe, useEditRecipe } from "@/hooks/useRecipes";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { RecipeFormData } from "@/lib/types";

const EditRecipe = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  // Safe check for params being null or undefined
  const id = params?.id;

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
  const { data: recipe, isLoading } = useRecipe(id!);
  const { mutateAsync: uploadImage } = useCloudinaryUpload();
  const { mutate: editRecipe, isPending: isUpdating } = useEditRecipe(id!);

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

  const handleSubmit = async (data: RecipeFormData) => {
    let image: string | undefined;

      if (data.image) {
        image = await uploadImage(data.image);
      }
    
    editRecipe({
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          instructions: data.instructions,
          imageUrl: image,
        }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Recipe updated successfully",
        });
        router.push(`/recipe/${id}`);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update recipe",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">Edit Recipe</h1>
          <RecipeForm
            initialData={recipe}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
          />
        </div>
      </main>
    </div>
  );
};

export default EditRecipe;
