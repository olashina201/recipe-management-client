import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "@/components/RecipeCard";
import Navigation from "@/components/Navigation";
import { Recipe } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Temporary mock data
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh basil and mozzarella",
    ingredients: ["Pizza dough", "Tomatoes", "Mozzarella", "Basil"],
    instructions: ["Prepare dough", "Add toppings", "Bake"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh basil and mozzarella",
    ingredients: ["Pizza dough", "Tomatoes", "Mozzarella", "Basil"],
    instructions: ["Prepare dough", "Add toppings", "Bake"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // ... keep existing code (mock recipes)
];

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [page, setPage] = useState(1);
  
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", page],
    queryFn: () => {
      // Simulate pagination with mock data
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return Promise.resolve({
        recipes: mockRecipes.slice(start, end),
        totalPages: Math.ceil(mockRecipes.length / ITEMS_PER_PAGE),
      });
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Recipes</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-white rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recipes?.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {recipes?.totalPages && recipes.totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: recipes.totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={pageNumber === page}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={page === recipes.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;