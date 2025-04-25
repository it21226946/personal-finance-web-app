import React from 'react';
import { CheckCircle as CircleCheck, AlertCircle as CircleAlert, Circle as CircleX } from 'lucide-react';
import { Budget } from '../../types';
import { formatCurrency, calculatePercentage, getBudgetStatusColor } from '../../utils/formatters';

interface BudgetOverviewProps {
  budgets: Budget[];
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets }) => {
  // Sort budgets by percentage spent (highest first)
  const sortedBudgets = [...budgets].sort(
    (a, b) => (b.spent / b.amount) - (a.spent / a.amount)
  );

  // Count budget statuses
  const exceededCount = budgets.filter(b => b.spent >= b.amount).length;
  const warningCount = budgets.filter(b => b.spent < b.amount && b.spent / b.amount >= 0.8).length;
  const onTrackCount = budgets.filter(b => b.spent / b.amount < 0.8).length;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h2>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
          <CircleCheck size={16} className="text-green-500" />
          <div>
            <p className="text-xs text-gray-500">On Track</p>
            <p className="font-medium">{onTrackCount}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
          <CircleAlert size={16} className="text-amber-500" />
          <div>
            <p className="text-xs text-gray-500">Warning</p>
            <p className="font-medium">{warningCount}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
          <CircleX size={16} className="text-red-500" />
          <div>
            <p className="text-xs text-gray-500">Exceeded</p>
            <p className="font-medium">{exceededCount}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedBudgets.slice(0, 5).map((budget) => {
          const percentage = calculatePercentage(budget.spent, budget.amount);
          
          return (
            <div key={budget.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{budget.category}</span>
                <span className="text-gray-600">
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                </span>
              </div>
              
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getBudgetStatusColor(budget.spent, budget.amount)} transition-all duration-500 ease-in-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        
        {budgets.length > 5 && (
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all budgets
          </button>
        )}
      </div>
    </div>
  );
};

export default BudgetOverview;