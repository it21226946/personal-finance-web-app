import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BudgetCard from '../components/budgets/BudgetCard';
import BudgetForm from '../components/budgets/BudgetForm';
import { useFinance } from '../context/FinanceContext';

const Budgets: React.FC = () => {
  const { budgets, categories, addBudget, deleteBudget } = useFinance();
  const [showForm, setShowForm] = useState(false);

  const handleAddBudget = (data: {
    category: string;
    amount: number;
    period: 'weekly' | 'monthly' | 'yearly';
  }) => {
    addBudget({
      ...data,
      spent: 0, // New budgets start with zero spent
      userId: 'user1', // In a real app, this would be the current user's ID
    });
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600 mt-1">
            Set and manage your spending limits
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showForm && (
          <div className="lg:col-span-1">
            <BudgetForm
              categories={categories}
              onSubmit={handleAddBudget}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className={`${showForm ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {budgets.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets yet</h3>
              <p className="text-gray-500 mb-4">
                Start managing your finances by creating your first budget
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Create Budget
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onDelete={deleteBudget}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Budgets;