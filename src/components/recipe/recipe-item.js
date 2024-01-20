
function RecipeItem(props) {

    return (
        <div className="recipe-item">
            <h2 className="recipe-item-title">{props.title}</h2>
            <p className="recipe-item-description">{props.description}</p>
            <p className="recipe-item-time">{props.time} min</p>
        </div>
    );
}

export default RecipeItem;