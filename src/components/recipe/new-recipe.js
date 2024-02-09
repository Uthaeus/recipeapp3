import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { RecipeContext } from "../../store/recipe-context";
import { db } from "../../firebase-config";
import { storage } from "../../firebase-config";

function NewRecipe() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [amount, setAmount] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const { addRecipe } = useContext(RecipeContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (imageUpload) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(imageUpload);
        }
    }, [imageUpload]);

    const addIngredient = () => {
        if (ingredient === "" || amount === "") {
            return;
        }
        setIngredients([...ingredients, { ingredient, amount }]);
        setIngredient("");
        setAmount("");
    }

    const uploadImage = async () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + Date.now()}`);
        try {
            await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
        } catch (e) {
            console.error("Error uploading image: ", e);
        }
    }

    const onSubmit = async (data) => {
        let newRecipeId;

        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                ...data,
                ingredients: ingredients,
                image: imageUrl
            });
            newRecipeId = docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        addRecipe({
            ...data,
            ingredients,
            id: newRecipeId,
            image: imageUrl
        });
        navigate("/");
    }

    return (
        <div className="new-recipe">
            <h1 className="new-recipe-title">New Recipe</h1>

            <div className="new-image-container">
                <div className="new-image-input-wrapper">
                    <input type='file' className="new-image-input" onChange={(e) => setImageUpload(e.target.files[0])} />
                    <button className="new-image-button" onClick={uploadImage}>Upload Image</button>
                </div>

                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="new-image-preview" />
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" {...register("title", { required: true })} />
                    {errors.title && <p className="error">This field is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" {...register("description", { required: true })} />
                    {errors.description && <p className="error">This field is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="text" className="form-control" {...register("time", { required: true })} />
                    {errors.time && <p className="error">This field is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="main_ingredient">Main Ingredient</label>
                    <input type="text" className="form-control" {...register("main_ingredient", { required: true })} />
                    {errors["main_ingredient"] && <p className="error">This field is required</p>}
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="ingredient">Ingredient</label>
                            <input type="text" id='ingredient' className="form-control" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" id='amount' className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        <p className="add-ingredient" onClick={addIngredient}>Add Ingredient</p>
                    </div>

                    <div className="col-6">
                        {ingredients.length > 0 && (
                            <div className="new-ingredients-list">
                                {ingredients.map((ingredient, index) => (
                                    <div className="new-ingredient-item" key={index}>
                                        <p className="new-ingredient">{ingredient.ingredient}</p>
                                        <p className="new-amt">{ingredient.amount}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea className="form-control" rows="8" {...register("instructions", { required: true })} />
                </div>

                <button type="submit" className="btn btn-primary">Create Recipe</button>
            </form>
        </div>
    );
}

export default NewRecipe