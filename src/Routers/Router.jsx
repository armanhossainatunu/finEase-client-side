import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import MyTransactions from "../Pages/MyTransactions";
import AddTransaction from "../Pages/AddTransaction";
import Reports from "../Pages/Reports ";
import About from "../Pages/About";

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
    ],
  },
]);

export default router;
