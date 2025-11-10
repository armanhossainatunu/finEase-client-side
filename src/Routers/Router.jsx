import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import MyTransactions from "../Pages/MyTransactions";
import AddTransaction from "../Pages/AddTransaction";
import Reports from "../Pages/Reports ";
import About from "../Pages/About";
import UpdateProfile from "../Pages/UpdateProfile";
import PrivateRoute from "../Context/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/MyTransactions",
        element: <MyTransactions></MyTransactions>,
      },
      {
        path: "/AddTransaction",
        element: <AddTransaction></AddTransaction>,
      },
      {
        path: "/Reports",
        element: <Reports></Reports>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/auth/update",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);

export default router;
