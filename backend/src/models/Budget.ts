import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  spent: {
    type: Number,
    default: 0
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Budget', budgetSchema); 