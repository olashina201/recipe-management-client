import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface InstructionsSectionProps {
  instructions: string[];
  onChange: (instructions: string[]) => void;
  error?: string;
}

const InstructionsSection = ({
  instructions,
  onChange,
  error,
}: InstructionsSectionProps) => {
  const addInstruction = () => {
    onChange([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    onChange(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    onChange(newInstructions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700">Instructions</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addInstruction}
          className="text-sm"
        >
          Add Step
        </Button>
      </div>
      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              className={`flex-1 ${error ? 'border-red-500' : ''}`}
            />
            {instructions.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeInstruction(index)}
                className="h-10 w-10 self-start"
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

export default InstructionsSection;