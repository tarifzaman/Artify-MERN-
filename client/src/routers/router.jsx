import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import Favorites from "../pages/Favorites";
import Register from "../components/Register";
import Login from "../components/Login";
import UpdateArtwork from "../pages/UpdateArtwork"; // ১. ইমপোর্ট করুন

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/add-artwork", element: <AddArtwork /> },
      { path: "/my-gallery", element: <MyGallery /> },
      { 
        path: "/update-artwork/:id", // ২. ডাইনামিক আইডি সহ পাথ যোগ করুন
        element: <UpdateArtwork /> 
      },
      { path: "/favorites", element: <Favorites /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;