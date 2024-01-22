
import { DUMMY_DATA } from "../store/DUMMY_DATA";
import RecipeItem from "../components/recipe/recipe-item";

function Home() {

    return (
        <div className="home">
            <div className="home-left">

                {DUMMY_DATA.map((recipe) => <RecipeItem key={recipe.id} {...recipe} />)}
            </div>

            <div className="home-right">
                <h1>Right</h1>
            </div>
        </div>
    );
}

export default Home;