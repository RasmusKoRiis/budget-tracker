// src/components/TransactionList.tsx
import React from 'react';
import { useBudget } from '../context/BudgetContext';

export default function TransactionList() {
  const { transactions } = useBudget();
  if (transactions.length === 0) return <p className="text-center text-gray-500">No transactions yet.</p>;
  return (
    <ul className="space-y-2">
      {transactions.map(tx => (
        <li key={tx.id} className="flex justify-between p-3 bg-white rounded-lg">
          <span className={tx.type === 'spend' ? 'text-red-500' : 'text-green-500'}>{tx.type}</span>
          <span>{tx.amount} NOK</span>
        </li>
      ))}
    </ul>
  );
}