import { useState } from "react";
import { Recipe, RecipeFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: RecipeFormData) => void;
  isLoading?: boolean;
}

const RecipeForm = ({ initialData, onSubmit, isLoading }: RecipeFormProps) => {
  // Form state
  const [formData, setFormData] = useState<RecipeFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    ingredients: initialData?.ingredients || [""],
    instructions: initialData?.instructions || [""],
    image: undefined,
  });

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    // Check for empty ingredients
    if (formData.ingredients.some((ingredient) => !ingredient.trim())) {
      newErrors.ingredients = "All ingredients are required";
    }

    // Check for empty instructions
    if (formData.instructions.some((instruction) => !instruction.trim())) {
      newErrors.instructions = "All instructions are required";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if form is valid
    setErrors({});

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
          <label className="block text-sm font-medium text-zinc-700">
            Title
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
            placeholder="Recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
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
          <label className="block text-sm font-medium text-zinc-700">
            Image
          </label>
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
              className={`mt-1 ${errors.ingredients ? "border-red-500" : ""}`}
              placeholder={`Ingredient ${index + 1}`}
            />
          ))}
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
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
              className={`mt-1 ${errors.instructions ? "border-red-500" : ""}`}
              placeholder={`Step ${index + 1}`}
            />
          ))}
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
          )}
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
        {isLoading
          ? "Saving..."
          : initialData
          ? "Update Recipe"
          : "Create Recipe"}
      </Button>
    </form>
  );
};

export default RecipeForm;
