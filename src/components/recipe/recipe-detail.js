import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { RecipeContext } from "../../store/recipe-context";
import defaultImage from '../../assets/images/pasta_image.png';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { recipes } = useContext(RecipeContext);

    useEffect(() => {
        setRecipe(recipes.find((recipe) => recipe.id === id));
        setIsLoading(false);
    }, [recipes, id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="recipe-detail">

            {recipe.image ? <img src={recipe.image} alt={recipe.title} /> : <img src={defaultImage} alt={recipe.title} />}

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

            <Link to={`/recipe/${id}/edit`}>Edit Recipe</Link>
        </div>
    );
}

export default RecipeDetail;