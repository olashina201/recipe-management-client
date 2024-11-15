import { useMutation } from "@tanstack/react-query";
import { Recipe } from "@/lib/types";

type CreateRecipeInput = Omit<Recipe, "_id" | "createdAt" | "updatedAt">;

export const useCreateRecipe = () => {
  return useMutation({
    mutationFn: async (data: CreateRecipeInput) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      return response.json() as Promise<Recipe>;
    },
  });
};
