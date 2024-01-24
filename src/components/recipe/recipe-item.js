import { Link } from "react-router-dom";

import image from '../../assets/images/overtime_image2.jpeg';
function RecipeItem(props) {

    return (
        <Link to={`/recipe/${props.id}`} className="recipe-item" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <h2 className="recipe-item-title">{props.title}</h2>

            <div className="recipe-item-details">
                <p className="recipe-item-description">{props.description}</p>
                <p className="recipe-item-time">{props.time} min</p>
            </div>
        </Link>
    );
}

export default RecipeItem;