// src/App.tsx
import React from 'react';
import { BudgetProvider } from './context/BudgetContext';
import SettingsPanel from './components/SettingsPanel';
import OverviewCard from './components/OverviewCard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';

export default function App() {
  return (
    <BudgetProvider>
      <div className="min-h-screen flex justify-center items-start bg-gray-100 p-6">
        <div className="max-w-4xl w-full grid gap-8 grid-cols-1 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-8">
            <h1 className="text-4xl text-center text-primary">Budget Tracker</h1>
            <SettingsPanel />
          </div>
          {/* Right column */}
          <div className="space-y-8">
            <OverviewCard />
            <section className="p-4 bg-white rounded-2xl shadow-lg">
              <h2 className="section-title text-center mb-4">Transactions</h2>
              <div className="flex justify-center mb-4"><AddTransactionModal /></div>
              <TransactionList />
            </section>
          </div>
        </div>
      </div>
    </BudgetProvider>
  );
}
