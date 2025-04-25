import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
      
      <div className="divide-y divide-gray-100">
        {transactions.length === 0 ? (
          <p className="text-gray-500 py-4 text-center text-sm">No recent transactions</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight size={16} className="text-green-600" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.category}</p>
                  <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))
        )}
      </div>
      
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View all transactions
      </button>
    </div>
  );
};

export default RecentTransactions;