import React from 'react';

export default function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div className="card">
      <h2>Transaction History</h2>
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No transactions added yet.</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className={`transaction-item ${t.type}`}>
              <div>
                <strong>{t.description}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {t.category} • {t.date}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteTransaction(t.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}