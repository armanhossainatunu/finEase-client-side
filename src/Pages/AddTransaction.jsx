import React, { useContext, useState } from "react";
import MyContainer from "../Components/MyContainer";
import Button from "../Components/Button";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "../Components/Loading";

const AddTransaction = () => {
  const [date, setDate] = useState("");
  const { user, loading } = useContext(AuthContext);
  // console.log(totalBalance,setTotalBalance)
  const navigate = useNavigate();
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const amount = parseFloat(form.amount.value);
    const email = form.email.value;
    const category = form.category.value;
    const type = form.type.value;
    const description = form.description.value;
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
    }
    // Safeguard: Expense cannot reduce balance below 1
    // if (type === "expense" && amount <= totalBalance.balance) {
    //   toast.error("Expense too high! You can't reduce your balance below 1.");
    //   return;
    // }

    const transaction = {
      name,
      amount,
      category,
      email,
      description,
      type,
      date,
      uid: user.uid,
    };
    
    if (!name || !amount || !date || !category || !type || !description) {
      toast.error("All fields are required");
      return;
    }

    fetch("http://localhost:3000/myTransactions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Transaction Successfully");
          form.reset();
          navigate("/myTransactions");
          setDate("");

          // Update totalBalance state
          // let newBalance =
          //   type === "income"
          //     ? totalBalance.balance + amount
          //     : totalBalance.balance - amount;

          // if (newBalance <= 0) newBalance = 1; // safeguard

          // setTotalBalance({
          //   balance: newBalance,
          //   income: totalBalance.income + (type === "income" ? amount : 0),
          //   expense: totalBalance.expense + (type === "expense" ? amount : 0),
          // });
        }
      });
  };

  if (loading) {
    return <div><Loading></Loading></div>;
  }

  return (
    <MyContainer className="mt-17">
      <div className=" min-h-screen max-w-lg mx-auto text-center shadow-2xl p-10 border ">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div></div>
          <h1 className="text-3xl font-bold">Add Transaction</h1>
          {/* Date Field */}
          <div>
            <input
              className="appearance-none border rounded w-full py-2 leading-tight focus:outline-none focus:shadow-outline"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </div>
        <form onSubmit={handleAddTransaction} className="mt-10">
          <div className="flex flex-col gap-5">
            {/* Name Field */}
            <div className="w-full">
              <label
                className="block text-start  font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                defaultValue={user?.displayName}
                placeholder="Enter name"
              />
            </div>
            {/* Email Field */}
            <div className="w-full">
              <label
                className="block text-start  font-bold mb-2"
                htmlFor="name"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="email"
                defaultValue={user?.email}
                placeholder="Enter email"
              />
            </div>
            {/* Amount Field */}
            <div className="w-full">
              <label
                className="block text-start  font-bold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                name="amount"
                type="number"
                min={"1"}
                required
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
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
                  value="income"
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
                  value="expense"
                  required
                  className="radio radio-primary"
                />
              </div>
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
            ></textarea>
          </div>
          <div className="mt-5">
            <Button>Add Transaction</Button>
          </div>
        </form>
      </div>
    </MyContainer>
  );
};

export default AddTransaction;
