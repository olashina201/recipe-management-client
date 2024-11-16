/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
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

          {/* Right Column - Image and Reviews */}
          <div className="relative">
            <div className="relative w-full h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt="Delicious meal"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Review Cards */}
            <Card className="absolute top-1/4 left-0 transform -translate-x-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[250px] animate-fade-in">
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <span className="font-medium">Anastasia</span>
                </div>
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <p className="text-sm text-gray-600">
                  It&apos;s an easy recipe that is quick to make and delicious!
                </p>
              </CardContent>
            </Card>

            <Card className="absolute bottom-1/4 right-0 transform translate-x-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[250px] animate-fade-in">
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <span className="font-medium">Hannah Lewis</span>
                </div>
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <p className="text-sm text-gray-600">
                  Great and delicious recipe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
