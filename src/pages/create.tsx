import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { RecipeFormData } from "@/lib/types";
import RecipeForm from "@/components/RecipeForm";
import Navigation from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";

const CreateRecipe = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createRecipe, isPending } = useMutation({
    mutationFn: async (data: RecipeFormData) => {
      // Replace with actual API call
      console.log("Creating recipe:", data);
      return Promise.resolve({ id: "new-recipe" });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Recipe created successfully",
      });
      router.push("/"); // Navigate to the home page
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_error) => {
      toast({
        title: "Error",
        description: "Failed to create recipe",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">
            Create New Recipe
          </h1>
          <RecipeForm onSubmit={createRecipe} isLoading={isPending} />
        </div>
      </main>
    </div>
  );
};

export default CreateRecipe;
