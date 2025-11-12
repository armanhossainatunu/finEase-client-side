// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthContext";

// const TransactionDetails = () => {
//   const { user } = useContext(AuthContext);
//   const [transactions, setTransactions] = useState([]);

//   console.log(transactions);

//   useEffect(() => {
//     fetch(`http://localhost:3000/myTransactions?email=${user?.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("data fetched successfully my transactions page", data);
//         setTransactions(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [user]);

//   return (
//     <div>
//       <h1>Transaction Details</h1>
//     </div>
//   );
// };

// export default TransactionDetails;

import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const TransactionDetails = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  // Delete Transaction
  const handelDelete = (id) => {
    fetch(`http://localhost:3000/transaction/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
          setTransactions((prev) => prev.filter((t) => t._id !== id));
        } else {
          ("failed to delete");
        }
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  };
  // Fetch Transactions
  useEffect(() => {
    fetch(`http://localhost:3000/myTransactions?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <MyContainer>
       <Loading></Loading>
      </MyContainer>
    );
  }

  // Separate Income & Expense
  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const renderTable = (data, type) => {
    if (data.length === 0) {
      return (
        <p className="text-center text-gray-500 mt-3">
          No {type} Transactions Yet
        </p>
      );
    }

    return (
      <>
        <div className="overflow-x-auto mt-3">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {[...data]
                .reverse()
                .slice(0, visibleCount)
                .map((transaction, index) => (
                  <tr key={transaction._id}>
                    <th>{index + 1}</th>
                    <td>{transaction.category}</td>
                    <td>
                      {type === "Income" ? (
                        <span className="text-green-600 font-semibold">
                          ${transaction.amount}
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          ${transaction.amount}
                        </span>
                      )}
                    </td>
                    <td>{transaction.date}</td>
                    <td>{transaction.Time}</td>
                    <td>
                      <Button>
                        <Link to={`/update/${transaction._id}`}>Update</Link>
                      </Button>
                    </td>
                    <td>
                      <Button>
                        <p onClick={() => handelDelete(transaction._id)}>
                          Delete
                        </p>
                      </Button>
                    </td>
                    <td>
                      <Button>
                        <Link to={`/details/${transaction._id}`}>Details</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Show More / Less */}
        <div className="text-center mt-4">
          {visibleCount < data.length && (
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={() =>
                setVisibleCount((prev) => Math.min(prev + 5, data.length))
              }
            >
              Show More
            </button>
          )}
          {visibleCount >= data.length && data.length > 5 && (
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
              onClick={() => setVisibleCount(5)}
            >
              Show Less
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <MyContainer>
      <h1 className="text-3xl font-bold text-center mb-6">
        My Transactions 💼
      </h1>

      {/* Income Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          💰 Income Transactions
        </h2>
        {renderTable(incomeTransactions, "Income")}
      </div>

      {/* Expense Section */}
      <div>
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          💸 Expense Transactions
        </h2>
        {renderTable(expenseTransactions, "Expense")}
      </div>
    </MyContainer>
  );
};

export default TransactionDetails;
