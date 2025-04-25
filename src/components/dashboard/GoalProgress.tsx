import React from 'react';
import { Goal } from '../../types';
import { formatCurrency, calculatePercentage, formatDate } from '../../utils/formatters';

interface GoalProgressProps {
  goals: Goal[];
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  // Sort goals by progress percentage (closest to target first)
  const sortedGoals = [...goals].sort(
    (a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount)
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Savings Goals</h2>
      
      <div className="space-y-4">
        {sortedGoals.length === 0 ? (
          <p className="text-gray-500 py-4 text-center text-sm">No goals set</p>
        ) : (
          sortedGoals.map((goal) => {
            const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="space-y-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    <p className="text-xs text-gray-500">
                      Deadline: {formatDate(goal.deadline)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">{percentage.toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
        
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all goals
        </button>
      </div>
    </div>
  );
};

export default GoalProgress;