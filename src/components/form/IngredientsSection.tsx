import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

interface IngredientsSectionProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
  error?: string;
}

const IngredientsSection = ({ ingredients, onChange, error }: IngredientsSectionProps) => {
  const addIngredient = () => {
    onChange([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    onChange(newIngredients);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700">Ingredients</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addIngredient}
          className="text-sm"
        >
          Add Ingredient
        </Button>
      </div>
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className={`flex-1 ${error ? 'border-red-500' : ''}`}
            />
            {ingredients.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(index)}
                className="h-10 w-10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default IngredientsSection;