import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Trash2, Filter } from 'lucide-react';
import { Transaction, Category } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  categories,
  onDelete,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by type
    if (filterType !== 'all' && transaction.type !== filterType) return false;
    
    // Filter by category
    if (filterCategory !== 'all' && transaction.category !== filterCategory) return false;
    
    // Filter by search term
    if (
      searchTerm &&
      !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  
  filteredTransactions.forEach((transaction) => {
    const date = transaction.date;
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    groupedTransactions[date].push(transaction);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Get unique categories from the transactions
  const uniqueCategories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-md border ${
                showFilters || filterType !== 'all' || filterCategory !== 'all'
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {filteredTransactions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500">No transactions found</p>
          {(filterType !== 'all' || filterCategory !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setFilterType('all');
                setFilterCategory('all');
                setSearchTerm('');
              }}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {sortedDates.map((date) => (
            <div key={date} className="py-2">
              <div className="px-4 py-2 bg-gray-50">
                <p className="text-sm font-medium text-gray-500">
                  {formatDate(date)}
                </p>
              </div>
              
              {groupedTransactions[date].map((transaction) => {
                const categoryObj = categories.find(
                  (c) => c.name === transaction.category
                );
                const categoryColor = categoryObj?.color || '#3B82F6';
                
                return (
                  <div
                    key={transaction.id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          transaction.type === 'income'
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUpRight size={16} className="text-green-600" />
                        ) : (
                          <ArrowDownRight size={16} className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description || transaction.category}
                        </p>
                        <div className="flex items-center mt-1">
                          <div
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: categoryColor }}
                          ></div>
                          <p className="text-xs text-gray-500">
                            {transaction.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div
                        className={`font-medium mr-4 ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}{' '}
                        {formatCurrency(transaction.amount)}
                      </div>
                      
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;