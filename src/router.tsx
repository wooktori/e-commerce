import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  { path: "/signup", element: <Signup />, children: [] },
]);

export default router;
