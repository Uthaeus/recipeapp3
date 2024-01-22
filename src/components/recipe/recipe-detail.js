import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { DUMMY_DATA } from "../../store/DUMMY_DATA";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // fetch(`/api/recipe/${id}`)
        //     .then(res => res.json())
        //     .then(data => setRecipe(data))
        //     .catch(err => console.log(err));
        for (let i = 0; i < DUMMY_DATA.length; i++) {
            if (DUMMY_DATA[i].id === parseInt(id)) {
                setRecipe(DUMMY_DATA[i]);
            }
        }
        setIsLoading(false);
    })

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="recipe-detail">
            <h1>{recipe.title}</h1>

            <p>{recipe.description}</p>

            <p>{recipe.time} min</p>

            <p>{recipe.main_ingredient}</p>

            <ul>
                {recipe.ingredients.map((ingredient, index) => (
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