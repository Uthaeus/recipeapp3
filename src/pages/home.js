import { useContext, useState, useEffect } from "react";

import { RecipeContext } from "../store/recipe-context";

import RecipeItem from "../components/recipe/recipe-item";
import Sidebar from "../components/sidebar/sidebar";

function Home() {
    const [recipeFilter, setRecipeFilter] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const { recipes } = useContext(RecipeContext);

    useEffect(() => {
        if (recipeFilter === "") {
            setFilteredRecipes(recipes);
        } else {
            setFilteredRecipes(recipes.filter((recipe) => recipe.main_ingredient === recipeFilter));
        }
        console.log(recipes);
    }, [recipes, recipeFilter]);

    const handleFilterChange = (f) => {
        setRecipeFilter(f);
    }

    return (
        <div className="home">
            <div className="home-left">
                {filteredRecipes.map( recipe => <RecipeItem key={recipe.id} {...recipe} /> )}
            </div>

            <div className="home-right">
                <Sidebar recipes={recipes} handleFilterChange={handleFilterChange}  />
            </div>
        </div>
    );
}

export default Home;