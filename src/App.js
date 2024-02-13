import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useContext } from "react";

import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { RecipeContext } from "./store/recipe-context";

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import NewRecipe from "./components/recipe/new-recipe";
import RecipeDetail from "./components/recipe/recipe-detail";
import EditRecipe from "./components/recipe/edit-recipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/recipe/new',
        element: <NewRecipe />
      },
      {
        path: '/recipe/:id',
        element: <RecipeDetail />
      },
      {
        path: '/recipe/:id/edit',
        element: <EditRecipe />
      }
    ]
  }
])
function App() {
  const { recipes, setRecipeList } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipes = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      setRecipeList(recipesList);
    }
    
    if (recipes.length === 0) {
      console.log('setting recipes');
      getRecipes();
    }
  }, []);
  
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;
