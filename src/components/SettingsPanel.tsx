// src/components/SettingsPanel.tsx
import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

export default function SettingsPanel() {
  const { payday, remaining, setPayday, setRemaining, resetAll } = useBudget();
  const [date, setDate] = useState(payday);
  const [amt, setAmt] = useState(remaining);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <div className="flex flex-col space-y-4">
        <label className="block">
          <span>Payday</span>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="mt-1 w-full p-3 border rounded-lg"
          />
        </label>
        <label className="block">
          <span>Remaining after bills</span>
          <input
            type="number"
            value={amt}
            onChange={e => setAmt(+e.target.value)}
            className="mt-1 w-full p-3 border rounded-lg"
          />
        </label>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => { setPayday(date); setRemaining(amt); }}
          className="flex-1 py-3 bg-primary text-white uppercase rounded-lg hover:scale-105 transition"
        >
          Save Settings
        </button>
        <button
          onClick={resetAll}
          className="flex-1 py-3 bg-red-500 text-white uppercase rounded-lg hover:scale-105 transition"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}