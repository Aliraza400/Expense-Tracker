import React, { useState } from 'react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = (e) => {
    e.preventDefault();
    if (description && amount) {
      setExpenses([...expenses, { description, amount: parseFloat(amount) }]);
      setDescription('');
      setAmount('');
    }
  };

  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Expense Tracker</h1>
      
      {/* ExpenseForm */}
      <form onSubmit={addExpense} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Expense Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Add Expense
        </button>
      </form>
      
      {/* ExpenseList */}
      <ul className="mb-4">
        {expenses.map((expense, index) => (
          <li key={index} className="bg-gray-100 p-4 mb-2 rounded-md flex justify-between">
            <span>{expense.description}</span>
            <span>${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      
      {/* Total Expense */}
      <div className="text-2xl font-bold text-center">
        Total: ${totalExpense.toFixed(2)}
      </div>
    </div>
  );
};

export default Expenses;
