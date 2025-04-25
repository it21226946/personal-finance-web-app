import React from 'react';
import { FinancialSummary } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface SpendingChartProps {
  summary: FinancialSummary;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ summary }) => {
  const { spendingByCategory } = summary;
  
  // Calculate total spending for percentage calculations
  const totalSpending = spendingByCategory.reduce((total, item) => total + item.amount, 0);
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h2>
      
      {spendingByCategory.length === 0 ? (
        <p className="text-gray-500 py-4 text-center text-sm">No spending data available</p>
      ) : (
        <div className="space-y-6">
          <div className="relative pt-1">
            <div className="flex h-4 overflow-hidden rounded-full bg-gray-100">
              {spendingByCategory.map((item, index) => {
                const width = (item.amount / totalSpending) * 100;
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center overflow-hidden transition-all duration-500"
                    style={{
                      width: `${width}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spendingByCategory.map((item, index) => {
              const percentage = ((item.amount / totalSpending) * 100).toFixed(1);
              
              return (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-baseline text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingChart;