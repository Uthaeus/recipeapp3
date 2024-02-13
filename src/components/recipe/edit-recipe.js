import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

import { RecipeContext } from "../../store/recipe-context";
import { db } from "../../firebase-config";
import { storage } from "../../firebase-config";

function EditRecipe() {

    const { id } = useParams();

    const { recipes, setRecipeList } = useContext(RecipeContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [amount, setAmount] = useState("");
    const [recipe, setRecipe] = useState({});

    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRecipe(recipes.find((recipe) => recipe.id === +id));   
        setIngredients(recipes.find((recipe) => recipe.id === +id).ingredients);
        setImage(recipes.find((recipe) => recipe.id === +id).image); 
        setIsLoading(false);
    }, [recipes, id]);

    const addIngredient = () => {
        if (ingredient === "" || amount === "") {
            return;
        }
        setIngredients([...ingredients, { ingredient, amount }]);
        setIngredient("");
        setAmount("");
    }

    const deleteRecipe = async () => {
        const docRef = doc(db, "recipes", id);
        await deleteDoc(docRef);
        navigate('/');
    }

    const onSubmit = async (data) => {
        // try {
        //     if (imageUpload) {
        //         const imageRef = ref(storage, `images/${imageUpload.name}`);
        //         await uploadBytes(imageRef, imageUpload);
        //         const downloadURL = await getDownloadURL(imageRef);
        //         setImage(downloadURL);
        //     }

        //     const newRecipe = {
        //         title: data.title,
        //         description: data.description,
        //         time: data.time,
        //         main_ingredient: data.main_ingredient,
        //         ingredients: ingredients,
        //         instructions: data.instructions,
        //         image: image
        //     }

        //     const index = recipes.findIndex((recipe) => recipe.id === id);

        //     recipes[index] = newRecipe;

        //     setRecipeList([...recipes]);

        //     const docRef = doc(db, "recipes", id);
        //     await updateDoc(docRef, newRecipe);

        //     navigate('/');
        // } catch (error) {
        //     console.error('Error updating recipe:', error);
        // }
        console.log('updating recipe...', data, ingredients);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-recipe">

            <h1>Edit Recipe</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={recipe.title}
                                {...register("title", { required: true })}
                            />
                            {errors.title && <p>This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input
                                type="number"
                                id="time"
                                name="time"
                                defaultValue={recipe.time}
                                {...register("time", { required: true })}
                            />
                            {errors.time && <p>This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="main_ingredient">Main Ingredient</label>
                            <input
                                type="text"
                                id="main_ingredient"
                                name="main_ingredient"
                                defaultValue={recipe.main_ingredient}
                                {...register("main_ingredient", { required: true })}
                            />
                            {errors.main_ingredient && <p>This field is required</p>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={recipe.description}
                                {...register("description", { required: true })}
                            />
                            {errors.description && <p>This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                defaultValue={recipe.instructions}
                                rows="5"
                                {...register("instructions", { required: true })}
                            />
                            {errors.instructions && <p>This field is required</p>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <p className="edit-ingredient-title">Current Ingredients</p>
                        <div className="form-group">
                            <ul>
                                {ingredients?.map((ingredient, index) => (
                                    <li key={index}>
                                        <p>{ingredient.ingredient}</p>
                                        <p>{ingredient.amount}</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIngredients(ingredients.filter((i) => i !== ingredient));
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="ingredient">Ingredient</label>
                            <input
                                type="text"
                                id="ingredient"
                                name="ingredient"
                                value={ingredient}
                                onChange={(event) => setIngredient(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="text"
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                            />
                        </div>

                        <p className="add-ingredient-btn" onClick={addIngredient}>Add Ingredient</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <p>Current Image:</p>
                        <img src={recipe.image} alt={recipe.title} width='80%' />
                    </div>
                    
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Update Recipe</button>
            </form>

            <Link to="/">Back to Home</Link>
            <button onClick={() => deleteRecipe} className="delete-recipe-btn">Delete</button>
        </div>
    )
}

export default EditRecipe