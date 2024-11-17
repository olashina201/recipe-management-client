/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              The Easiest Way
              <br />
              To Make Your
              <br />
              Favorite Meal
            </h1>
            <p className="text-lg text-gray-200 max-w-lg">
              Discover 1000+ recipes in your hand with the best recipe. Help you
              to find the easiest way to cook.
            </p>
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg"
            >
              Explore Recipes
            </Button>
          </div>

          <div className="relative">
            <div className="relative w-full h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt="Delicious meal"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
