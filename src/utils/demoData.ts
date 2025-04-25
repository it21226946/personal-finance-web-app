import { Transaction, Budget, Goal, Category } from '../types';

export const generateDemoData = () => {
  const userId = 'user1';
  
  const categories: Category[] = [
    { id: 'cat1', name: 'Salary', type: 'income', color: '#10B981' },
    { id: 'cat2', name: 'Freelance', type: 'income', color: '#3B82F6' },
    { id: 'cat3', name: 'Housing', type: 'expense', color: '#F97316' },
    { id: 'cat4', name: 'Food', type: 'expense', color: '#8B5CF6' },
    { id: 'cat5', name: 'Transportation', type: 'expense', color: '#EC4899' },
    { id: 'cat6', name: 'Entertainment', type: 'expense', color: '#F59E0B' },
    { id: 'cat7', name: 'Healthcare', type: 'expense', color: '#EF4444' },
    { id: 'cat8', name: 'Shopping', type: 'expense', color: '#6366F1' },
    { id: 'cat9', name: 'Utilities', type: 'expense', color: '#14B8A6' },
    { id: 'cat10', name: 'Other', type: 'expense', color: '#71717A' }
  ];

  const transactions: Transaction[] = [
    { 
      id: 't1', 
      amount: 100000, 
      type: 'income', 
      category: 'Salary', 
      description: 'Monthly salary', 
      date: '2025-04-01', 
      userId 
    },
    { 
      id: 't2', 
      amount: 55000, 
      type: 'income', 
      category: 'Freelance', 
      description: 'Web development project', 
      date: '2025-04-08', 
      userId 
    },
    { 
      id: 't3', 
      amount: 20000, 
      type: 'expense', 
      category: 'Housing', 
      description: 'Rent payment', 
      date: '2025-04-05', 
      userId 
    },
    { 
      id: 't4', 
      amount: 25000, 
      type: 'expense', 
      category: 'Food', 
      description: 'Grocery shopping', 
      date: '2025-04-10', 
      userId 
    },
    { 
      id: 't5', 
      amount: 10000, 
      type: 'expense', 
      category: 'Transportation', 
      description: 'Gas', 
      date: '2025-04-12', 
      userId 
    },
    { 
      id: 't6', 
      amount: 5000, 
      type: 'expense', 
      category: 'Entertainment', 
      description: 'Movie night', 
      date: '2025-04-15', 
      userId 
    },
    { 
      id: 't7', 
      amount: 5000, 
      type: 'expense', 
      category: 'Utilities', 
      description: 'Electric bill', 
      date: '2025-04-18', 
      userId 
    },
    { 
      id: 't8', 
      amount: 15000, 
      type: 'expense', 
      category: 'Shopping', 
      description: 'New clothes', 
      date: '2025-04-20', 
      userId 
    }
  ];

  const budgets: Budget[] = [
    { id: 'b1', category: 'Housing', amount: 25000, spent: 20000, period: 'monthly', userId },
    { id: 'b2', category: 'Food', amount: 25000, spent: 18000, period: 'monthly', userId },
    { id: 'b3', category: 'Transportation', amount: 10000, spent: 8000, period: 'monthly', userId },
    { id: 'b4', category: 'Entertainment', amount: 5000, spent: 1000, period: 'monthly', userId },
    { id: 'b5', category: 'Utilities', amount: 5000, spent: 2000, period: 'monthly', userId },
    { id: 'b6', category: 'Shopping', amount: 15000, spent: 10000, period: 'monthly', userId }
  ];

  const goals: Goal[] = [
    { 
      id: 'g1', 
      title: 'Emergency Fund', 
      targetAmount: 10000, 
      currentAmount: 5000, 
      deadline: '2025-12-31', 
      userId 
    },
    { 
      id: 'g2', 
      title: 'Vacation', 
      targetAmount: 10000, 
      currentAmount: 8000, 
      deadline: '2025-08-31', 
      userId 
    },
    { 
      id: 'g3', 
      title: 'New Laptop', 
      targetAmount: 200000, 
      currentAmount: 58000, 
      deadline: '2025-06-30', 
      userId 
    }
  ];

  return { transactions, budgets, goals, categories };
};