// src/components/AddTransactionModal.tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useBudget } from '../context/BudgetContext';
import { v4 as uuid } from 'uuid';

export default function AddTransactionModal() {
  const { addTransaction } = useBudget();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'spend'|'save'>('spend');

  const handleAdd = () => {
    if (amount > 0) {
      addTransaction({ id: uuid(), amount, type, date: new Date() });
      setAmount(0);
      setOpen(false);
    }
  };

  const modal = (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }} onClick={() => setOpen(false)} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', border: '4px solid #3F51B5', borderRadius: '1rem', padding: '2rem', width: '300px', zIndex: 1001 }}>
        <h2 style={{ margin: 0, marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 700, color: '#3F51B5' }}>Add Transaction</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Type</label>
            <select value={type} onChange={e => setType(e.target.value as any)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}>
              <option value="spend">Spend</option>
              <option value="save">Save</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Amount (NOK)</label>
            <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', gap: '0.5rem' }}>
          <button onClick={() => setOpen(false)} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleAdd} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', background: '#FF4081', color: '#fff', textTransform: 'uppercase', cursor: 'pointer' }}>Add</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: '#FF4081', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
        <span style={{ fontSize: '1.5rem', lineHeight: 1, marginRight: '0.25rem' }}>+</span>Add Transaction
      </button>
      {open && ReactDOM.createPortal(modal, document.body)}
    </>
  );
}

