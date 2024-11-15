import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe, RecipeFormData } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all recipes
export const useRecipes = (page: number, limit: number) => {
    return useQuery(
      ["recipes", page, limit],
      async () => {
        // Construct the URL with query parameters for pagination
        const url = new URL(`${API_URL}/recipes`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
  
        // Use fetch to get the data
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Error fetching recipes");
        }
  
        const data = await response.json();
        return data.recipes;
      },
      {
        enabled: page > 0,
      }
    );
  };
  

// Fetch single recipe
export const useRecipe = (id: string) => {
  return useQuery<Recipe>({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/recipes/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }

      return response.json();
    },
    enabled: !!id,
  });
};

// Edit recipe
export const useEditRecipe = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RecipeFormData) => {
      let image = data.image;

      // If image is a File, upload it to Cloudinary first
      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        image = uploadData.secure_url;
      }

      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description || "",
          ingredients: data.ingredients,
          instructions: data.instructions,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe", id] });
    },
  });
};

// Delete recipe
export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch recipes list
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
