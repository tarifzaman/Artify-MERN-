import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // এটা ইম্পোর্ট করো
import router from "./routers/router"; // তোমার রাউটার ফাইলের সঠিক পাথ দাও

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
