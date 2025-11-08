import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
