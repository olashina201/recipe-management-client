import { useState } from "react";
import { Recipe, RecipeFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "./form/ImageUpload";
import IngredientsSection from "./form/IngredientsSection";
import InstructionsSection from "./form/InstructionsSection";
import { Alert, AlertDescription } from "./ui/alert";

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: RecipeFormData) => void;
  isLoading?: boolean;
}

const RecipeForm = ({ initialData, onSubmit, isLoading }: RecipeFormProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RecipeFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    ingredients: initialData?.ingredients || [""],
    instructions: initialData?.instructions || [""],
    image: undefined,
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.ingredients.some(ingredient => !ingredient.trim())) {
      newErrors.ingredients = "All ingredients must be filled out";
    }

    if (formData.instructions.some(instruction => !instruction.trim())) {
      newErrors.instructions = "All instructions must be filled out";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">Title</label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Recipe title"
            className={`w-full ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && (
            <Alert variant="destructive">
              <AlertDescription>{errors.title}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">Description (Optional)</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Brief description of the recipe"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">Image (Optional)</label>
          <ImageUpload
            onChange={(file) =>
              setFormData((prev) => ({ ...prev, image: file }))
            }
          />
        </div>

        <IngredientsSection
          ingredients={formData.ingredients}
          onChange={(ingredients) =>
            setFormData((prev) => ({ ...prev, ingredients }))
          }
          error={errors.ingredients}
        />

        <InstructionsSection
          instructions={formData.instructions}
          onChange={(instructions) =>
            setFormData((prev) => ({ ...prev, instructions }))
          }
          error={errors.instructions}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Recipe" : "Create Recipe"}
      </Button>
    </form>
  );
};

export default RecipeForm;