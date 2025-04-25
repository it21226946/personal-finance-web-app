import React from 'react';
import { Plus } from 'lucide-react';
import FinancialSummary from '../components/dashboard/FinancialSummary';
import BudgetOverview from '../components/dashboard/BudgetOverview';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import GoalProgress from '../components/dashboard/GoalProgress';
import SpendingChart from '../components/dashboard/SpendingChart';
import { useFinance } from '../context/FinanceContext';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { budgets, goals, summary } = useFinance();
  
  const navigateToTransactions = () => {
    onNavigate('transactions');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/80">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={navigateToTransactions}
            className="inline-flex items-center px-4 py-2 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium 
            hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="mb-6">
        <FinancialSummary summary={summary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
            <SpendingChart summary={summary} />
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
            <RecentTransactions transactions={summary.recentTransactions} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
            <BudgetOverview budgets={budgets} />
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
            <GoalProgress goals={goals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;