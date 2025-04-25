import express from 'express';
import Goal from '../models/Goal';

const router = express.Router();

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.query.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

// Create a goal
router.post('/', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error creating goal' });
  }
});

// Update a goal
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error updating goal' });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

// Update goal progress
router.patch('/:id/progress', async (req, res) => {
  try {
    const { amount } = req.body;
    const goal = await Goal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const newAmount = goal.currentAmount + amount;
    goal.currentAmount = newAmount > goal.targetAmount ? goal.targetAmount : newAmount;
    await goal.save();

    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error updating goal progress' });
  }
});

export default router; 