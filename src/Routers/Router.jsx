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
import Update from "../Pages/UpdateTransactions";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/myTransactions"),
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/MyTransactions",
        element: (
          <PrivateRoute>
            <MyTransactions></MyTransactions>
          </PrivateRoute>
        ),
      },
      {
        path: "/AddTransaction",
        element: (
          <PrivateRoute>
            <AddTransaction></AddTransaction>
          </PrivateRoute>
        ),
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
        path: "/update/:_id",
        element: (
          <PrivateRoute>
            <Update></Update>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/myTransactions"),
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);

export default router;
