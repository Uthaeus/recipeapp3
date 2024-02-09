import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";

import { RecipeContext } from "../../store/recipe-context";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { recipes } = useContext(RecipeContext);

    useEffect(() => {
        // fetch(`/api/recipe/${id}`)
        //     .then(res => res.json())
        //     .then(data => setRecipe(data))
        //     .catch(err => console.log(err));
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].id === parseInt(id)) {
                setRecipe(recipes[i]);
            }
        }
        setIsLoading(false);
    }, [recipes, id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="recipe-detail">
            
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}

            <h1>{recipe.title}</h1>

            <p>{recipe.description}</p>

            <p>{recipe.time} min</p>

            <p>{recipe.main_ingredient}</p>

            <ul>
                {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index}>
                        <p>{ingredient.ingredient}</p>
                        <p>{ingredient.ingredientAmount}</p>
                    </li>
                ))}
            </ul>

            <p>{recipe.instructions}</p>
        </div>
    );
}

export default RecipeDetail;