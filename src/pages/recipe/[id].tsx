import { useRouter, useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRecipe, useDeleteRecipe } from "@/hooks/useRecipes";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { AppMessages } from "@/lib/messages";
import Footer from "@/components/Footer";
import { useState } from "react"; 

const RecipeDetails = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { toast } = useToast();
  const { data: recipe, isLoading } = useRecipe(id);
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const { isOpen, openModal, closeModal, handleConfirm } = useConfirmModal();

  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);  // Set deleting state to true when delete starts
    openModal(() => {
      deleteRecipe(recipe._id, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: AppMessages.recipe.deleteSuccess,
          });
          router.push("/");
        },
        onError: () => {
          toast({
            title: "Error",
            description: AppMessages.recipe.deleteError,
            variant: "destructive",
          });
        },
        onSettled: () => {
          setIsDeleting(false);  // Reset deleting state after the request is settled
          closeModal();
        },
      });
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-up">
          {recipe.imageUrl && (
            <div className="relative w-full h-64">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <span className="w-2 h-2 bg-emerald-800 rounded-full mr-3"></span>
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
                    <span className="font-medium text-emerald-800 mr-4">
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
                variant="secondary"
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

      <Footer />
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title="Delete Recipe"
        message={AppMessages.recipe.deleteConfirmation}
        loading={isDeleting}  // Pass the loading state to the modal
      />
    </div>
  );
};

export default RecipeDetails;
