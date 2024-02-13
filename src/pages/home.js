import { useContext, useState, useEffect } from "react";

import { RecipeContext } from "../store/recipe-context";

import RecipeItem from "../components/recipe/recipe-item";
import Sidebar from "../components/sidebar/sidebar";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [recipeFilter, setRecipeFilter] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const { recipes } = useContext(RecipeContext);

    useEffect(() => {
        setFilteredRecipes(recipes);
        setIsLoading(false);
    }, [recipes]);

    const handleFilterChange = (f) => {
        setRecipeFilter(f);
    }

    if (isLoading) {
        return <p>Loading...</p>;
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