import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../Components/MyContainer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../Context/AuthContext";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/myTransactions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  //Pie Chart: Category-wise totals
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 };
      acc[t.category].value += Number(t.amount);
      return acc;
    }, {})
  );

  //Bar Chart: Monthly totals
  const monthlyData = Object.values(
    transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString("en-US", {
        month: "short",
      });
      if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
      if (t.type === "income") acc[month].income += Number(t.amount);
      else acc[month].expense += Number(t.amount);
      return acc;
    }, {})
  );

  // Chart colors
  const COLORS = [
    "#875DF8",
    "#34D399",
    "#FBBF24",
    "#EF4444",
    "#3B82F6",
    "#A855F7",
  ];

  return (
    <MyContainer className='pb-6 mt-16'>
      <h1 className="text-3xl font-bold pt-4 text-center">Financial Reports</h1>
      <p className="text-center mb-3">
        A detailed summary of your income, expenses, and financial trends.
      </p>

      {loading ? (
        <h2 className="text-center text-xl">Loading...</h2>
      ) : transactions.length === 0 ? (
        <h2 className="text-center text-xl">No transactions found</h2>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart: Categories */}
          <div className="bg-base-300 shadow-xl rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              💰 Expenses by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx={"50%"}
                  cy={"50%"}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey={"value"}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Monthly totals */}
          <div className="bg-base-300 shadow-xl rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              📅 Monthly Income & Expenses
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#34D399" name="Income" />
                <Bar dataKey="expense" fill="#EF4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </MyContainer>
  );
};

export default Reports;
