import React from 'react';

export default function Summary({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="dashboard-grid">
      <div className="card summary-card">
        <div>
          <h3>Total Income</h3>
          <div className="amount income">+${income.toFixed(2)}</div>
        </div>
      </div>
      <div className="card summary-card">
        <div>
          <h3>Total Expenses</h3>
          <div className="amount expense">-${expense.toFixed(2)}</div>
        </div>
      </div>
      <div className="card summary-card">
        <div>
          <h3>Net Balance</h3>
          <div className={`amount ${balance >= 0 ? 'balance' : 'expense'}`}>
            ${balance.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}