
import { DUMMY_DATA } from "../store/DUMMY_DATA";
import RecipeItem from "../components/recipe/recipe-item";

function Home() {

    return (
        <div className="home">
            <h1>Home</h1>

            {DUMMY_DATA.map((recipe) => <RecipeItem key={recipe.id} {...recipe} />)}
        </div>
    );
}

export default Home;