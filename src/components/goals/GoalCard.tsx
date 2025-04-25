import React from 'react';
import { Trash2 } from 'lucide-react';
import { Goal } from '../../types';
import { formatCurrency, calculatePercentage, formatDate } from '../../utils/formatters';

interface GoalCardProps {
  goal: Goal;
  onDelete: (id: string) => void;
  onContribute: (id: string, amount: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete, onContribute }) => {
  const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount);
  const [contributeAmount, setContributeAmount] = React.useState<string>('');
  const [showContribute, setShowContribute] = React.useState<boolean>(false);
  
  const handleContribute = () => {
    const amount = parseFloat(contributeAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    onContribute(goal.id, amount);
    setContributeAmount('');
    setShowContribute(false);
  };
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500">Current</p>
          <p className="font-medium">{formatCurrency(goal.currentAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Target</p>
          <p className="font-medium">{formatCurrency(goal.targetAmount)}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm mb-3">
        <div className="text-gray-500">
          <span className="font-medium text-blue-600">{percentage.toFixed(0)}%</span> complete
        </div>
        <div className="text-gray-500">
          Deadline: <span className="font-medium">{formatDate(goal.deadline)}</span>
        </div>
      </div>
      
      {showContribute ? (
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={contributeAmount}
              onChange={(e) => setContributeAmount(e.target.value)}
              placeholder="Amount"
              className="pl-7 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full"
              min="0"
              step="0.01"
            />
          </div>
          <button
            onClick={handleContribute}
            className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => setShowContribute(false)}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setShowContribute(true)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Contribute
          </button>
          <button
            className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Details
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalCard;