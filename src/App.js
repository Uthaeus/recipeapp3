import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { addRecipe } from "./store/recipe-context";

import RecipeContextProvider from './store/recipe-context';

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import NewRecipe from "./components/recipe/new-recipe";
import RecipeDetail from "./components/recipe/recipe-detail";

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
      }
    ]
  }
])
function App() {

  useEffect(() => {
    getDocs(collection(db, "recipes"))
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          addRecipe({
            id: doc.id,
            ...doc.data()
          })
        })
      })
  }, [])
  
  return (
    <RecipeContextProvider>
      <RouterProvider router={router} />
    </RecipeContextProvider>  
  );
}

export default App;
