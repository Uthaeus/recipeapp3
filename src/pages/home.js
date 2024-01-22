
import { DUMMY_DATA } from "../store/DUMMY_DATA";
import RecipeItem from "../components/recipe/recipe-item";
import Sidebar from "../components/sidebar/sidebar";

function Home() {

    return (
        <div className="home">
            <div className="home-left">

                {DUMMY_DATA.map((recipe) => <RecipeItem key={recipe.id} {...recipe} />)}
            </div>

            <div className="home-right">
                <Sidebar />
            </div>
        </div>
    );
}

export default Home;