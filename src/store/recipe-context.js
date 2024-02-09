import { createContext, useState } from "react";

export const RecipeContext = createContext({
    recipes: [],
    addRecipe: () => {},
    removeRecipe: () => {}
});



const RecipeContextProvider = ({ children }) => {

    const [recipes, setRecipes] = useState([]);

    const addRecipe = (recipe) => {
        setRecipes([...recipes, recipe]);
    }

    const removeRecipe = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>{children}</RecipeContext.Provider>
    );
}

export default RecipeContextProvider