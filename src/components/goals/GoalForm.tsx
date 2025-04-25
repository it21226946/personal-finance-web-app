import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface GoalFormProps {
  onSubmit: (data: {
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
  }) => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [currentAmount, setCurrentAmount] = useState<string>('0');
  const [deadline, setDeadline] = useState<string>('');

  // Calculate min date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount || !deadline) return;

    const parsedTarget = parseFloat(targetAmount);
    const parsedCurrent = parseFloat(currentAmount || '0');
    if (isNaN(parsedTarget) || parsedTarget <= 0) return;
    if (isNaN(parsedCurrent) || parsedCurrent < 0) return;
    if (parsedCurrent > parsedTarget) return;

    onSubmit({
      title,
      targetAmount: parsedTarget,
      currentAmount: parsedCurrent,
      deadline,
    });

    // Reset form
    setTitle('');
    setTargetAmount('');
    setCurrentAmount('0');
    setDeadline('');
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Create New Goal</h2>
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
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Goal Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
            placeholder="e.g., Emergency Fund, New Car, Vacation"
            required
          />
        </div>

        <div>
          <label
            htmlFor="targetAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
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
            htmlFor="currentAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Savings (Optional)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="currentAmount"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            If you've already started saving for this goal, enter the amount here
          </p>
        </div>

        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Date
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={minDate}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;