import React from "react";
import Banner from "../Components/Header/Banner";
import Budgeting from "../Components/Budgeting";
import Stat from "../Components/Stat";
import Features from "../Components/Features";
import { useLoaderData } from "react-router";
import AccountSummary from "../Components/AccountSummary";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Banner></Banner>
      <Budgeting></Budgeting>
      <AccountSummary></AccountSummary>
      <Features></Features>
      <Stat></Stat>
    </div>
  );
};

export default Home;
