import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";

import { RecipeContext } from "../../store/recipe-context";
import defaultImage from '../../assets/images/pasta_image.png';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { recipes, setRecipeList } = useContext(RecipeContext);
    const navigate = useNavigate();

    useEffect(() => {
        setRecipe(recipes.find((recipe) => recipe.id === id));
        setIsLoading(false);
    }, [recipes, id]);

    const deleteRecipe = async () => {
        try {
            const docRef = doc(db, "recipes", id);
            console.log('deleting recipe...');
            await deleteDoc(docRef);
            console.log('deleted recipe...');
            setRecipeList(recipes.filter((recipe) => recipe.id !== id));
            navigate('/');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    }

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
            <Link to='/'>Home</Link>
            <button onClick={() => deleteRecipe}>Delete Recipe</button>
        </div>
    );
}

export default RecipeDetail;