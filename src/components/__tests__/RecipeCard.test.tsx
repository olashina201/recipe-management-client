import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from '../RecipeCard';

const mockRecipe = {
  id: '1',
  title: 'Test Recipe',
  description: 'Test Description',
  ingredients: ['ingredient 1'],
  instructions: ['instruction 1'],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('RecipeCard', () => {
  it('renders recipe title and description', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays no image placeholder when image is not provided', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText('No image')).toBeInTheDocument();
  });
});