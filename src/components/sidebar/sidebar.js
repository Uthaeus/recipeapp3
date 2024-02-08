

function Sidebar({ recipes, handleFilterChange }) {

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Filter Recipes</h2>

            <h4 className="sidebar-subtitle">Main Ingredient:</h4>

            <ul>
                {recipes.map(recipe => <li onClick={() => handleFilterChange(recipe.main_ingredient)} className="sidebar-filter-item" key={recipe.id}>{recipe.main_ingredient}</li>)}

                <li className="sidebar-filter-item" onClick={() => handleFilterChange("")}>All</li>
            </ul>

            <h4 className="sidebar-subtitle">Time:</h4>

            <ul>
                <li className="sidebar-filter-item" onClick={() => handleFilterChange("15")} >15 min</li>
                <li className="sidebar-filter-item" onClick={() => handleFilterChange("30")} >30 min</li>
                <li className="sidebar-filter-item" onClick={() => handleFilterChange("45")} >45 min</li>
                <li className="sidebar-filter-item" onClick={() => handleFilterChange("60")} >60 min</li>
            </ul>

        </div>
    );
}

export default Sidebar;