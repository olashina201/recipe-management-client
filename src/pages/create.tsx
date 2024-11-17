import { useRouter } from "next/navigation";
import { RecipeFormData } from "@/lib/types";
import RecipeForm from "@/components/RecipeForm";
import Navigation from "@/components/Navigation";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const CreateRecipe = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: uploadImage } = useCloudinaryUpload();
  const { mutate: createRecipe } = useCreateRecipe();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: RecipeFormData) => {
    setIsLoading(true); // Start loading immediately
    try {
      let image: string | undefined;

      if (data.image) {
        image = await uploadImage(data.image);
      }

      createRecipe(
        {
          title: data.title,
          description: data.description || "",
          ingredients: data.ingredients,
          instructions: data.instructions,
          imageUrl: image,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Recipe created successfully",
              variant: "success",
            });
            router.push("/");
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to create recipe",
              variant: "destructive",
            });
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">
            Create New Recipe
          </h1>
          <RecipeForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateRecipe;
