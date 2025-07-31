import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Mypage from "./pages/Mypage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  { path: "/signup", element: <Signup />, children: [] },
  { path: "/login", element: <Login />, children: [] },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/mypage",
    element: (
      <ProtectedRoute>
        <Mypage />
      </ProtectedRoute>
    ),
    children: [],
  },
]);

export default router;
