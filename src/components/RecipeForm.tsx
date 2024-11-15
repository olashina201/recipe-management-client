import { useState } from "react";
import { Recipe, RecipeFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: RecipeFormData) => void;
  isLoading?: boolean;
}

const RecipeForm = ({ initialData, onSubmit, isLoading }: RecipeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<RecipeFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    ingredients: initialData?.ingredients || [""],
    instructions: initialData?.instructions || [""],
    image: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Title</label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mt-1"
            placeholder="Recipe title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="mt-1"
            placeholder="Brief description of the recipe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Image</label>
          <Input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">
            Ingredients
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <Input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...formData.ingredients];
                newIngredients[index] = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  ingredients: newIngredients,
                }));
              }}
              className="mt-1"
              placeholder={`Ingredient ${index + 1}`}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addIngredient}
            className="mt-2"
          >
            Add Ingredient
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">
            Instructions
          </label>
          {formData.instructions.map((instruction, index) => (
            <Textarea
              key={index}
              value={instruction}
              onChange={(e) => {
                const newInstructions = [...formData.instructions];
                newInstructions[index] = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  instructions: newInstructions,
                }));
              }}
              className="mt-1"
              placeholder={`Step ${index + 1}`}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addInstruction}
            className="mt-2"
          >
            Add Step
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Recipe" : "Create Recipe"}
      </Button>
    </form>
  );
};

export default RecipeForm;