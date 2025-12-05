import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import Home from "@/pages/Home"
import City from "@/pages/City"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: "city/:cityName",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <City />
      }
    ]
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App