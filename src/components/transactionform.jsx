import React, { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toLocaleDateString()
    });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="card">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount ($)"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit" className="btn-primary">Add Transaction</button>
      </form>
    </div>
  );
}