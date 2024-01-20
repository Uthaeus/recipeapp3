import { NavLink } from "react-router-dom";

function MainNavigation() {
    
    return (
        <nav className="main-navigation">
            <div className="main-navigation-left">
                <NavLink to="/" className={({ isActive }) => isActive ? "active-link main-navigation-link" : "main-navigation-link"} end>Home</NavLink>
            </div>

            <div className="main-navigation-right">
                <NavLink to="/about" className={({ isActive }) => isActive ? "active-link main-navigation-link" : "main-navigation-link"}>About</NavLink>
            </div>
        </nav>
    );
}

export default MainNavigation;