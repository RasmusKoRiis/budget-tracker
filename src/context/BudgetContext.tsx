// src/context/BudgetContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Transaction = {
  id: string
  amount: number
  type: 'spend' | 'save'
  date: Date
  comment?: string    // ← new optional field
}

type BudgetContextType = {
  payday: string;
  remaining: number;
  transactions: Transaction[];
  daysLeft: number;
  setPayday: (d: string) => void;
  setRemaining: (amt: number) => void;
  addTransaction: (t: Transaction) => void;
  resetAll: () => void;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Load settings
  const [payday, setPaydayRaw] = useState<string>(() => localStorage.getItem('payday') || '');
  const [remaining, setRemainingRaw] = useState<number>(() => Number(localStorage.getItem('remaining') || '0'));

  // Load & persist transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      try { return JSON.parse(stored).map((t: any) => ({ ...t, date: new Date(t.date) })); }
      catch { return []; }
    }
    return [];
  });
  useEffect(() => { localStorage.setItem('transactions', JSON.stringify(transactions)); }, [transactions]);

  // Derived daysLeft
  const now = new Date();
  let nextPay = payday ? new Date(payday) : new Date();
  if (payday && nextPay <= now) nextPay.setMonth(nextPay.getMonth() + 1);
  const daysLeft = payday
    ? Math.max(1, Math.ceil((nextPay.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Persist settings
  useEffect(() => { localStorage.setItem('payday', payday); }, [payday]);
  useEffect(() => { localStorage.setItem('remaining', String(remaining)); }, [remaining]);

  // Actions
  const setPayday = (d: string) => setPaydayRaw(d);
  const setRemaining = (amt: number) => setRemainingRaw(amt);
  const addTransaction = (t: Transaction) => setTransactions(prev => [...prev, t]);
  const resetAll = () => {
    setPaydayRaw('');
    setRemainingRaw(0);
    setTransactions([]);
    localStorage.removeItem('payday');
    localStorage.removeItem('remaining');
    localStorage.removeItem('transactions');
  };

  return (
    <BudgetContext.Provider value={{ payday, remaining, transactions, daysLeft, setPayday, setRemaining, addTransaction, resetAll }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudget must be used within BudgetProvider');
  return ctx;
};