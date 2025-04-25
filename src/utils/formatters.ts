/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('si-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a date as a readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

/**
 * Calculate percentage and ensure it doesn't exceed 100%
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  return Math.min(percentage, 100);
};

/**
 * Get appropriate color for budget status
 */
export const getBudgetStatusColor = (spent: number, budget: number): string => {
  const percentage = (spent / budget) * 100;
  if (percentage >= 100) return 'bg-red-500'; // Exceeded
  if (percentage >= 80) return 'bg-amber-500'; // Warning
  return 'bg-green-500'; // On track
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};