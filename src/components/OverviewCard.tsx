// src/components/OverviewCard.tsx
import React from 'react';
import { useBudget } from '../context/BudgetContext';

export default function OverviewCard() {
  const { remaining, transactions, daysLeft } = useBudget();

  // Recalculate on every render:
  const spent = transactions
    .filter((t) => t.type === 'spend')
    .reduce((sum, t) => sum + t.amount, 0);

  const saved = transactions
    .filter((t) => t.type === 'save')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentRemaining = Math.max(0, remaining - spent - saved);
  const dailyAllowance = daysLeft > 0
    ? Math.max(0, currentRemaining / daysLeft)
    : 0;
  const potentialSavings = Math.max(
    0,
    currentRemaining - dailyAllowance * daysLeft
  );
  const actualSavings = saved;

  const cards = [
    { title: 'Remaining', value: `${currentRemaining.toFixed(0)} NOK` },
    { title: 'Daily Allowance', value: `${dailyAllowance.toFixed(0)} NOK` },
    { title: 'Potential Savings', value: `${potentialSavings.toFixed(0)} NOK` },
    { title: 'Actual Savings', value: `${actualSavings.toFixed(0)} NOK` },
    { title: 'Days Left', value: `${daysLeft}` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {cards.map((c) => (
        <div key={c.title} className="p-2 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col gap-1">
            <h3 className="text-secondary text-xs font-semibold uppercase leading-none">
              {c.title}
            </h3>
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffbe0b',
                textDecoration: 'underline',
                margin: 0,
              }}
            >
              {c.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
