import React, { useEffect, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link } from "react-router";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/myTransactions")
      .then((res) => res.json())
      .then((data) => {
        console.log("data fetched successfully my transactions page", data);
        setTransactions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <MyContainer>
      <h1>My Transactions Page</h1>
     
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead >
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Details</th>

              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td><Link to={`/update/${transaction.id}`}>Update</Link></td>
                  <td><button>Delete</button></td>
                  <td><Link to={`/details/${transaction.id}`}>Details</Link></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MyContainer>
  );
};

export default MyTransactions;
