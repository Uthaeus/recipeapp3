import { Link } from "react-router-dom";
function RecipeItem(props) {

    return (
        <Link to={`/recipe/${props.id}`} className="recipe-item">
            <h2 className="recipe-item-title">{props.title}</h2>
            <p className="recipe-item-description">{props.description}</p>
            <p className="recipe-item-time">{props.time} min</p>
        </Link>
    );
}

export default RecipeItem;