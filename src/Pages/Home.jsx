import React from "react";
import Banner from "../Components/Header/Banner";
import Budgeting from "../Components/Budgeting";
import Stat from "../Components/Stat";
import Features from "../Components/Features";
import AccountSummary from "../Components/AccountSummary";

const Home = () => {
 
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
