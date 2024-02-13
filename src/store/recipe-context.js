import { createContext, useState } from "react";

export const RecipeContext = createContext({
    recipes: [],
    addRecipe: () => {},
    removeRecipe: () => {},
    setRecipeList: () => {}
});



const RecipeContextProvider = ({ children }) => {

    const [recipes, setRecipes] = useState([]);

    const addRecipe = (recipe) => {
        setRecipes(prev => [...prev, recipe]);
    }

    const removeRecipe = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }

    const setRecipeList = (recipeList) => {
        setRecipes(recipeList);
    }

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe, setRecipeList }}>{children}</RecipeContext.Provider>
    );
}

export default RecipeContextProvider