import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
function NewRecipe() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [amount, setAmount] = useState("");
    const { addRecipe } = useContext(RecipeContext);
    const navigate = useNavigate();

    const addIngredient = () => {
        if (ingredient === "" || amount === "") {
            return;
        }
        setIngredients([...ingredients, { ingredient, amount }]);
        setIngredient("");
        setAmount("");
    }

    const onSubmit = (data) => {
        console.log(data);
        console.log(ingredients);
        addRecipe({
            ...data,
            ingredients
        })
        setIngredients([]);
        reset();
        navigate("/");
    }

    return (
        <div className="new-recipe">
            <h1>New Recipe</h1>

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
                    <label htmlFor="main-ingredient">Main Ingredient</label>
                    <input type="text" className="form-control" {...register("main-ingredient", { required: true })} />
                    {errors["main-ingredient"] && <p className="error">This field is required</p>}
                </div>

                {ingredients.length > 0 && (
                    <div className="new-ingredients-list">
                        {ingredients.map((ingredient, index) => (
                            <div className="new-ingredient" key={index}>
                                <p>{ingredient.ingredient}</p>
                                <p>{ingredient.ingredientAmount}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="ingredient">Ingredient</label>
                    <input type="text" id='ingredient' className="form-control" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="ingredient-amount">Amount</label>
                    <input type="text" id='ingredient-amount' className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>

                <p className="add-ingredient" onClick={addIngredient}>Add Ingredient</p>

                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea className="form-control" rows="8" {...register("instructions", { required: true })} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewRecipe