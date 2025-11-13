import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button";
import { FaRightLeft } from "react-icons/fa6";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("desc");
  // sort function
  const sortTransaction = (data, order) => {
    return [...data].sort((a, b) =>
      order === "asc" ? a.amount - b.amount : b.amount - a.amount
    );
  };

  //  handle sort
  const handleSort = (order) => {
    setSort(order);
    setTransactions((prev) => sortTransaction(prev, order));
  };

  //data fetch transactions
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/myTransactions?email=${user.email}`,{
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched transactions:", data);
        const sortedData = sortTransaction(data, sort);
        setTransactions(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user, sort]);

  return (
    <MyContainer className={'mt-16'}>
      <h1 className="text-2xl font-bold my-5">My Transactions</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : transactions.length === 0 ? (
        <h1 className="text-center text-5xl font-bold">
          No Transactions Found
        </h1>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="bg-base-200">
                <th>SN</th>
                <th>Category</th>
                <th>
                  Amount
                  <details className="dropdown inline-block ml-1">
                    <summary className="cursor-pointer z-50"></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1px] w-36 p-2 shadow-sm">
                      <li>
                        <a onClick={() => handleSort("desc")}>
                          High <FaRightLeft />
                          Low
                        </a>
                      </li>
                      <li>
                        <a onClick={() => handleSort("asc")}>
                          Low
                          <FaRightLeft />
                          high
                        </a>
                      </li>
                    </ul>
                  </details>
                </th>
                <th>Type</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <th>{index + 1}</th>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <Button>
                      <Link to="/transaction/details">Details</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MyContainer>
  );
};

export default MyTransactions;
