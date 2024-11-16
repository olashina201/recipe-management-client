import { useRouter } from "next/navigation";
import { RecipeFormData } from "@/lib/types";
import RecipeForm from "@/components/RecipeForm";
import Navigation from "@/components/Navigation";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import { useToast } from "@/hooks/useToast";
import Footer from "@/components/Footer";

const CreateRecipe = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutateAsync: uploadImage } = useCloudinaryUpload();
  const { mutate: createRecipe, isPending } = useCreateRecipe();

  const handleSubmit = async (data: RecipeFormData) => {
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
            showToast({
              type: 'success',
              message: "Recipe created successfully",
            });
            router.push("/");
          },
          onError: () => {
            showToast({
              type: "error",
              message: "Failed to create recipe",
            });
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast({
        type: "error",
        message: "Failed to upload image",
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
          <RecipeForm onSubmit={handleSubmit} isLoading={isPending} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateRecipe;
