import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  { path: "/signup", element: <Signup />, children: [] },
  { path: "/login", element: <Login />, children: [] },
]);

export default router;
