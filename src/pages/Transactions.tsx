import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import { useFinance } from '../context/FinanceContext';

const Transactions: React.FC = () => {
  const { transactions, categories, addTransaction, deleteTransaction } = useFinance();
  const [showForm, setShowForm] = useState(false);

  const handleAddTransaction = (data: {
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => {
    addTransaction({
      ...data,
      userId: 'user1', // In a real app, this would be the current user's ID
    });
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your income and expenses
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList
            transactions={transactions}
            categories={categories}
            onDelete={deleteTransaction}
          />
        </div>

        {showForm && (
          <div className="lg:col-span-1">
            <TransactionForm
              categories={categories}
              onSubmit={handleAddTransaction}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;