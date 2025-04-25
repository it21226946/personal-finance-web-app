import React from 'react';
import { Trash2 } from 'lucide-react';
import { Budget } from '../../types';
import { formatCurrency, calculatePercentage, getBudgetStatusColor } from '../../utils/formatters';

interface BudgetCardProps {
  budget: Budget;
  onDelete: (id: string) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onDelete }) => {
  const percentage = calculatePercentage(budget.spent, budget.amount);
  const statusColor = getBudgetStatusColor(budget.spent, budget.amount);
  const remaining = budget.amount - budget.spent;
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
        <button
          onClick={() => onDelete(budget.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-500">Budget</span>
        <span className="font-medium">{formatCurrency(budget.amount)}</span>
      </div>
      
      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-500">Spent</span>
        <span className="font-medium">{formatCurrency(budget.spent)}</span>
      </div>
      
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${statusColor} transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{percentage.toFixed(0)}% spent</span>
        <span className={`font-medium ${remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
          {remaining < 0 ? 'Exceeded by ' : 'Remaining: '}
          {formatCurrency(Math.abs(remaining))}
        </span>
      </div>
    </div>
  );
};

export default BudgetCard;