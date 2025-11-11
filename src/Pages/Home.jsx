import React from "react";
import Banner from "../Components/Header/Banner";
import Budgeting from "../Components/Budgeting";
import Stat from "../Components/Stat";
import Features from "../Components/Features";
import { useLoaderData } from "react-router";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Banner></Banner>
      <Budgeting></Budgeting>
      <div>
        <h1 className="text-3xl font-bold text-center my-10">Testimonial</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
          {data.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p>{item.name}</p>
                <p>{item.category}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 my-10">
        {data.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Features></Features>
      <Stat></Stat>
    </div>
  );
};

export default Home;
