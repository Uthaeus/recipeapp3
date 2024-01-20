import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import NewRecipe from "./components/recipe/new-recipe";

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
        path: '/new-recipe',
        element: <NewRecipe />
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router} />;
}

export default App;
