import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Transaction, 
  Budget, 
  Goal, 
  Category, 
  FinancialSummary 
} from '../types';
import { generateDemoData } from '../utils/demoData';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  categories: Category[];
  summary: FinancialSummary;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (id: string, amount: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    budgetStatus: { onTrack: 0, warning: 0, exceeded: 0 },
    recentTransactions: [],
    spendingByCategory: []
  });

  // Load demo data when the component mounts
  useEffect(() => {
    const demoData = generateDemoData();
    setTransactions(demoData.transactions);
    setBudgets(demoData.budgets);
    setGoals(demoData.goals);
    setCategories(demoData.categories);
    
    // Calculate summary
    updateSummary(demoData.transactions, demoData.budgets);
  }, []);

  // Update summary whenever transactions or budgets change
  useEffect(() => {
    updateSummary(transactions, budgets);
  }, [transactions, budgets]);

  const updateSummary = (currentTransactions: Transaction[], currentBudgets: Budget[]) => {
    const income = currentTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = currentTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate spending by category
    const expensesByCategory = currentTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
      }, {} as Record<string, number>);

    const spendingByCategory = Object.entries(expensesByCategory).map(([category, amount]) => {
      const categoryObj = categories.find(c => c.name === category);
      return {
        category,
        amount,
        color: categoryObj?.color || '#3B82F6'
      };
    });

    // Calculate budget status
    const budgetStatus = {
      onTrack: 0,
      warning: 0,
      exceeded: 0
    };

    currentBudgets.forEach(budget => {
      const percentage = budget.spent / budget.amount;
      if (percentage > 1) {
        budgetStatus.exceeded++;
      } else if (percentage > 0.8) {
        budgetStatus.warning++;
      } else {
        budgetStatus.onTrack++;
      }
    });

    setSummary({
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
      budgetStatus,
      recentTransactions: [...currentTransactions].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, 5),
      spendingByCategory
    });
  };

  // Transaction functions
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9)
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    
    // Update budget spent amounts if it's an expense
    if (transaction.type === 'expense') {
      const updatedBudgets = budgets.map(budget => {
        if (budget.category === transaction.category) {
          return { ...budget, spent: budget.spent + transaction.amount };
        }
        return budget;
      });
      setBudgets(updatedBudgets);
    }
  };

  const updateTransaction = (transaction: Transaction) => {
    const oldTransaction = transactions.find(t => t.id === transaction.id);
    
    // Update transactions
    setTransactions(transactions.map(t => 
      t.id === transaction.id ? transaction : t
    ));
    
    // Update budget spent amounts if category or amount changed for expenses
    if (oldTransaction && (oldTransaction.category !== transaction.category || 
       oldTransaction.amount !== transaction.amount)) {
      
      const updatedBudgets = [...budgets];
      
      // If old transaction was an expense, remove its amount from the old category budget
      if (oldTransaction.type === 'expense') {
        const oldBudgetIndex = updatedBudgets.findIndex(b => b.category === oldTransaction.category);
        if (oldBudgetIndex >= 0) {
          updatedBudgets[oldBudgetIndex] = {
            ...updatedBudgets[oldBudgetIndex],
            spent: updatedBudgets[oldBudgetIndex].spent - oldTransaction.amount
          };
        }
      }
      
      // If new transaction is an expense, add its amount to the new category budget
      if (transaction.type === 'expense') {
        const newBudgetIndex = updatedBudgets.findIndex(b => b.category === transaction.category);
        if (newBudgetIndex >= 0) {
          updatedBudgets[newBudgetIndex] = {
            ...updatedBudgets[newBudgetIndex],
            spent: updatedBudgets[newBudgetIndex].spent + transaction.amount
          };
        }
      }
      
      setBudgets(updatedBudgets);
    }
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    // Remove transaction
    setTransactions(transactions.filter(t => t.id !== id));
    
    // Update budget spent amount if it was an expense
    if (transaction.type === 'expense') {
      setBudgets(budgets.map(budget => {
        if (budget.category === transaction.category) {
          return { ...budget, spent: budget.spent - transaction.amount };
        }
        return budget;
      }));
    }
  };

  // Budget functions
  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = {
      ...budget,
      id: Math.random().toString(36).substring(2, 9)
    };
    setBudgets([...budgets, newBudget]);
  };

  const updateBudget = (budget: Budget) => {
    setBudgets(budgets.map(b => b.id === budget.id ? budget : b));
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  // Goal functions
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Math.random().toString(36).substring(2, 9)
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (goal: Goal) => {
    setGoals(goals.map(g => g.id === goal.id ? goal : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateGoalProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newAmount = goal.currentAmount + amount;
        return { ...goal, currentAmount: newAmount > goal.targetAmount ? goal.targetAmount : newAmount };
      }
      return goal;
    }));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      goals,
      categories,
      summary,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addBudget,
      updateBudget,
      deleteBudget,
      addGoal,
      updateGoal,
      deleteGoal,
      updateGoalProgress,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};