import React from "react";
import { useLoaderData, useParams } from "react-router";
import MyContainer from "../Components/MyContainer";

const UpdateTransactions = () => {
  const { _id } = useParams();
  const data = useLoaderData();
  const transaction = data.find((transaction) => transaction.id === _id);
  console.log("update transaction", transaction);

  return (
    <MyContainer>
      <form className="flex flex-col max-w-md mx-auto ">
        {/* Checkbox Field */}
        <div className="mt-5">
          <label className="block text-start  font-bold ">Type</label>
          <div className="flex justify-center items-center rounded gap-5">
            <label className="block text-start  font-bold" htmlFor="amount">
              Income
            </label>
            <input
              type="radio"
              name="type"
              defaultValue={transaction.type === "income"}
              required
              className="radio radio-primary"
            />
            <label
              className="block text-start  font-bold mb-2"
              htmlFor="amount"
            >
              Expense
            </label>
            <input
              type="radio"
              name="type"
              defaultValue={transaction.expense}
              required
              className="radio radio-primary"
            />
          </div>
        </div>
        {/* Description Field */}
        <div className="mt-5">
          <label
            className="block text-start  font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            placeholder="Enter description"
            defaultValue={transaction.description}
          ></textarea>
        </div>
        {/* Category Field */}
        <div>
          <label
            className="block text-start  font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="category"
            type="text"
            list="browsers"
            defaultValue={transaction.category}
            placeholder="Enter category"
          />
          <datalist id="browsers">
            <div className="flex">
              <div>
                <option value="Salary" />
                <option value="Loan Payment" />
                <option value="Freelance Income" />
                <option value="Transportation" />
                <option value="Business Profit" />
                <option value="Investments" />
              </div>
              <div>
                <option value="Internet & Phone Bill" />
                <option value="Travel" />
                <option value="Food & Groceries" />
                <option value="Rent Income" />
                <option value="Utilities (Electricity, Gas, Water)" />
                <option value="House Rent" />
                <option value="Other Income" />
              </div>
            </div>
          </datalist>
        </div>
        {/* Amount Field */}
        <div className="mt-5">
          <label className="block text-start  font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="amount"
            type="number"
            defaultValue={transaction.amount}
            placeholder="Enter amount"
          />
        </div>
        {/* Date Field */}
        <div className="mt-5">
          <label className="block text-start  font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            type="date"
            defaultValue={transaction.date}
            placeholder="Enter date"
          />
        </div>

        <button className="btn btn-primary mt-5">Update</button>
      </form>
    </MyContainer>
  );
};

export default UpdateTransactions;
