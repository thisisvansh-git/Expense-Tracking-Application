import React, { useState, useEffect } from 'react';
import Summary from './components/summary';
import TransactionForm from './components/transactionform';
import TransactionList from './components/transactionlist';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const localData = localStorage.getItem('transactions');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const exportCSV = () => {
    const headers = 'ID,Description,Amount,Category,Type,Date\n';
    const rows = transactions
      .map(t => `${t.id},"${t.description}",${t.amount},${t.category},${t.type},${t.date}`)
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget_tracker.csv';
    a.click();
  };

  return (
    <div className="container">
      <header>
        <h1>Personal Finance & Budget Tracker</h1>
        <p>Manage your expenses, set budgets, and track performance</p>
      </header>

      <Summary transactions={transactions} />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={exportCSV} className="export-btn">
          Export to CSV
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <TransactionForm onAddTransaction={addTransaction} />
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
}