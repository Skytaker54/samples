import React, { useState } from 'react';
import RecipeList from './RecipeList';
import Recipe from './Recipe';

export default function App() {
  const [state, setState] = useState({});
  function showRecipe(recipe) {
    setState({
      recipe
    });
  }
  const { recipe: r } = state;
  return (
    <div className='w-100'>
      <header className="row m-1 justify-content-center align-items-center b-border">
        <div className="ps-5 d- col-8">
          <div className="logo d-flex align-items-center justify-content-center ">
            <h1 className="logo-text">Feastastica | Recipes</h1>
          </div>
        </div>
        <div className="ps-5 col-3 selectForm">
          <RecipeList showRecipe={r => showRecipe(r)} />
        </div>
      </header>
      <article className="row m-1 justify-content-end">
        <Recipe r={r} />
      </article>
    </div>
  )
}

