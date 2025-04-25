import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { FinancialSummary as FinancialSummaryType } from '../../types';

interface FinancialSummaryProps {
  summary: FinancialSummaryType;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ summary }) => {
  const { totalIncome, totalExpenses, balance } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Total Income</h3>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <TrendingUp size={16} className="text-white" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-white">{formatCurrency(totalIncome)}</p>
        <p className="text-xs text-white/80 mt-1">Current period</p>
      </div>

      <div className="bg-gradient-to-br from-red-400 to-rose-500 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Total Expenses</h3>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <TrendingDown size={16} className="text-white" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-white">{formatCurrency(totalExpenses)}</p>
        <p className="text-xs text-white/80 mt-1">Current period</p>
      </div>

      <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Current Balance</h3>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <DollarSign size={16} className="text-white" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-white">{formatCurrency(balance)}</p>
        <p className="text-xs text-white/80 mt-1">Net savings</p>
      </div>
    </div>
  );
};

export default FinancialSummary;