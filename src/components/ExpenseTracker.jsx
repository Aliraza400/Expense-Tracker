import React, { useEffect, useState } from "react";

const myExpense = "expenses";
const getLocalStorageExpenseData = () => {
  const rawExpense = localStorage.getItem(myExpense);
  if (!rawExpense) return [];

  return JSON.parse(rawExpense);
};
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(getLocalStorageExpenseData);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  

  const handleExpenses = (e) => {
    e.preventDefault();
    if (description && amount) {
      setExpenses([
        ...expenses,
        {
          description,
          amount: parseFloat(amount),
        },
      ]);
      setAmount("");
      setDescription("");
    }
  };

  localStorage.setItem(myExpense, JSON.stringify(expenses));

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0)
  return (
    <div className="bg-gray-200 min-h-screen p-16">
      <div className="bg-white shadow-lg mx-auto w-6/12 p-16 rounded-lg">
        <form onSubmit={handleExpenses} className="flex flex-col gap-4">
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter Description"
            className="border border-gray-300 p-3 rounded text-lg font-medium outline-none"
            value={description}
          />
          <input
            type="number"
            placeholder="Expenses"
            className="border border-gray-300 p-3 rounded text-lg font-medium outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-md text-white text-lg">
            Add Expense
          </button>
        </form>
        <ul className="flex  flex-col gap-4 mt-6">
          {expenses.map((item, index) => (
            <li
              key={index}
              className="bg-gray-200 w-full p-6 rounded-md flex items-center justify-between"
            >
              <span className="text-lg font-base">{item.description}</span>
              <span className="text-lg font-base">₹{item.amount}</span>
              
            </li>
          ))}
        </ul>
        <div className="flex flex-col">
          <label className="text-lg font-bold block text-center mt-4">
            Total: ₹{totalExpense}
          </label>

          <button
            onClick={() => setExpenses([])}
            className="w-fit mx-auto mt-6 font-semibold text-lg text-white bg-indigo-500 px-6 py-2 rounded-md"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
