import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  return (
    <RecipeContextProvider>
      <RouterProvider router={router} />
    </RecipeContextProvider>  
  );
}

export default App;
