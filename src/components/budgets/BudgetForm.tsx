import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Category } from '../../types';

interface BudgetFormProps {
  categories: Category[];
  onSubmit: (data: {
    category: string;
    amount: number;
    period: 'weekly' | 'monthly' | 'yearly';
  }) => void;
  onCancel: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  categories,
  onSubmit,
  onCancel,
}) => {
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  // Filter to only show expense categories
  const expenseCategories = categories.filter((cat) => cat.type === 'expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    onSubmit({
      category,
      amount: parsedAmount,
      period,
    });

    // Reset form
    setCategory('');
    setAmount('');
    setPeriod('monthly');
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Create New Budget
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget Period
          </label>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                period === 'weekly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setPeriod('weekly')}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                period === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                period === 'yearly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setPeriod('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Create Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;