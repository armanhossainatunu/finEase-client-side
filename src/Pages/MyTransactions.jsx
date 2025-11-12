import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const MyTransactions = () => {
  const { user, loading ,setLoading} = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);



  useEffect(() => {
    fetch(`http://localhost:3000/myTransactions?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data fetched successfully my transactions page", data);
        setLoading(false);
        setTransactions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user,setLoading]);

  return (
    <MyContainer>
      <h1 className="text-2xl font-bold my-5">My Transactions</h1>
      <div>
        { loading ? <h1><Loading></Loading></h1> :  transactions.length === 0 ? (
          <h1 className="text-center text-5xl font-bold">
            No Transactions Found
          </h1>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {[...transactions].reverse().map((transaction, index) => (
                  <tr key={transaction._id}>
                    <th>{index + 1}</th>
                    <td>{transaction.category}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.date}</td>
                   
                    <td>
                      <Button>
                        <Link to='/transaction/details'>
                          Details
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MyContainer>
  );
};

export default MyTransactions;
