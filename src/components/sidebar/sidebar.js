

function Sidebar({ recipes, handleFilterChange }) {

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Filter Recipes</h2>

            <h4 className="sidebar-subtitle">Main Ingredients:</h4>

            <ul>
                {recipes.map(recipe => <li onClick={() => handleFilterChange(recipe.main_ingredient)} className="sidebar-filter-item" key={recipe.id}>{recipe.main_ingredient}</li>)}

                <li className="sidebar-filter-item" onClick={() => handleFilterChange("")}>All</li>
            </ul>

        </div>
    );
}

export default Sidebar;