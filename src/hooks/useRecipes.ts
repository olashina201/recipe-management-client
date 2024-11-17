import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe, RecipeFormData } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all recipes
export const useRecipes = (page: number, limit: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any>({
    queryKey: ["recipes", page, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/recipes?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      return data;
    },
  });
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
          imageUrl: image,
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

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`${API_URL}/recipes/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          // Attempt to extract error message from the response
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete recipe");
        }
        // Handle cases where there is no response body (e.g., 204 No Content)
        if (response.status === 204) {
          return { message: "Deleted successfully" }; // Optional custom return
        }
        // Parse the successful response
        const data = await response.json();
        console.log("Delete response:", data); // Log the actual response
        return data;
      } catch (error) {
        console.error("Delete API error:", error); // Log the error for debugging
        throw error; // Ensure the mutation handles the error
      }
    },
    onSuccess: () => {
      // Invalidate and refetch recipes list
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error); // Additional logging
    },
  });
};
