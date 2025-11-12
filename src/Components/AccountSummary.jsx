import React, { useContext, useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const AccountSummary = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  console.log(totalBalance);
  console.log(transactions);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/myTransactions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data fetched successfully db", data);

        const income = data
          .filter((transaction) => transaction.type === "income")
          .reduce((sum, transactions) => sum + Number(transactions.amount), 0);

        const expense = data
          .filter((transaction) => transaction.type === "expense")
          .reduce((sum, transactions) => sum + Number(transactions.amount), 0);
        const balance = income - expense;
        console.log(income, expense, balance);
       
        setTransactions(data);
        
        setTotalBalance({ balance, income, expense });
      })
      .catch((error) => console.log("error fetching transactions", error));
  }, [user]);

  
  return (
    <MyContainer>
      <div>
        <div className="text-center mt-10 mb-5">
          <h1 className="text-3xl font-bold">Account Summary</h1>
          <p className="text-gray-500">
            A quick snapshot of your income, expenses, and total balance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-green-400 text-center space-y-2 rounded py-10">
            <h1 className="text-2xl font-bold">Total Balance</h1>
            <p className="font-bold">
              $ <span>{totalBalance.balance}</span>
            </p>
            <Link to="/income">Balance Details</Link>
          </div>
          <div className="bg-blue-400 text-center space-y-2 rounded py-10">
            <h1 className="text-2xl font-bold">Total Income</h1>
            <p className="font-bold">
              $ <span>{totalBalance.income}</span>
            </p>
            <Link to="/transaction/details">Income Details</Link>
            {/* <Button className="z-10 font-sans">Details</Button> */}
          </div>
          <div className="bg-red-400 text-center space-y-2  rounded py-10">
            <h1 className="text-2xl font-bold">Total Expenses</h1>
            <p className="font-bold">
              $ <span>{totalBalance.expense}</span>
            </p>
            <Link to="/transaction/details" className="hover:border">
              Expenses Details
            </Link>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default AccountSummary;
