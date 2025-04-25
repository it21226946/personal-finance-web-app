import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatters';

const Reports: React.FC = () => {
  const { transactions, categories } = useFinance();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Get dates for filtering
  const currentDate = new Date();
  let startDate: Date;
  
  switch (period) {
    case 'week':
      // Start of current week (Sunday)
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      break;
    case 'month':
      // Start of current month
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      break;
    case 'year':
      // Start of current year
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      break;
  }
  
  // Filter transactions by date
  const filteredTransactions = transactions.filter(t => 
    new Date(t.date) >= startDate && new Date(t.date) <= currentDate
  );
  
  // Calculate total income and expenses
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate income by category
  const incomeByCategory = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      const { category, amount } = t;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
  
  // Calculate expenses by category
  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const { category, amount } = t;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
  
  // Sort categories by amount (descending)
  const sortedIncomeCategories = Object.entries(incomeByCategory)
    .sort((a, b) => b[1] - a[1]);
    
  const sortedExpenseCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Financial Reports</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
            
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`px-3 py-1 text-sm font-medium ${
                  period === 'week'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setPeriod('week')}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium ${
                  period === 'month'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setPeriod('month')}
              >
                Month
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium ${
                  period === 'year'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setPeriod('year')}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Income</h3>
              <p className="text-2xl font-semibold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
              <p className="text-2xl font-semibold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Net Savings</h3>
              <p className={`text-2xl font-semibold ${
                totalIncome - totalExpenses >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Income Breakdown</h3>
              
              {sortedIncomeCategories.length === 0 ? (
                <p className="text-gray-500 text-sm">No income data for this period</p>
              ) : (
                <div className="space-y-3">
                  {sortedIncomeCategories.map(([category, amount]) => {
                    const percentage = (amount / totalIncome) * 100;
                    const categoryObj = categories.find(c => c.name === category);
                    const color = categoryObj?.color || '#3B82F6';
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-sm font-medium text-gray-700">{category}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
                            <span className="text-gray-500 ml-1">({percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                        
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: color,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Expense Breakdown</h3>
              
              {sortedExpenseCategories.length === 0 ? (
                <p className="text-gray-500 text-sm">No expense data for this period</p>
              ) : (
                <div className="space-y-3">
                  {sortedExpenseCategories.map(([category, amount]) => {
                    const percentage = (amount / totalExpenses) * 100;
                    const categoryObj = categories.find(c => c.name === category);
                    const color = categoryObj?.color || '#3B82F6';
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-sm font-medium text-gray-700">{category}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
                            <span className="text-gray-500 ml-1">({percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                        
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: color,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                    No transactions for this period
                  </td>
                </tr>
              ) : (
                filteredTransactions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {transaction.description || transaction.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {transaction.category}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;