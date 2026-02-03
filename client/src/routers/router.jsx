import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import Myfavorites from "../pages/Myfavorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/add-artwork", element: <AddArtwork /> },
      { path: "/my-gallery", element: <MyGallery /> },
      { path: "/favorites", element: <Myfavorites /> }, // Navbar-এর লিঙ্কের সাথে মিলিয়ে
    ],
  },
]);

export default router;