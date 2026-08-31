const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// ======================================================
// ADD TASK
// POST /api/tasks
// ======================================================

router.post('/', async (req, res) => {
  try {
    const {
      userId,
      firestoreId,
      title,
      description,
      dateTime,
      deadline,
      priority,
      completed,
    } = req.body;

    // -------------------------
    // VALIDATION
    // -------------------------

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required',
      });
    }

    if (!firestoreId) {
      return res.status(400).json({
        success: false,
        message: 'firestoreId is required',
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'title is required',
      });
    }

    // -------------------------
    // CREATE TASK
    // -------------------------

    const task = await Task.create({
      userId,
      firestoreId,
      title,
      description: description || '',
      dateTime,
      deadline,
      priority: priority || 'Medium',
      completed: completed ?? false,
    });

    console.log('Task created in MongoDB:', task._id);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.log('Create task error:', error);

    // Duplicate Firestore ID
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Task already exists in MongoDB',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message,
    });
  }
});

// ======================================================
// GET USER TASKS
// GET /api/tasks/user/:userId
// ======================================================

router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log('Get tasks error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to get tasks',
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE TASK USING FIRESTORE ID
// PUT /api/tasks/firestore/:firestoreId
// ======================================================

router.put('/firestore/:firestoreId', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        firestoreId: req.params.firestoreId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found in MongoDB',
      });
    }

    console.log('Task updated in MongoDB:', task._id);

    res.json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.log('Update task error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE TASK USING MONGODB ID
// PUT /api/tasks/:id
// ======================================================

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.log('Update task error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message,
    });
  }
});

// ======================================================
// DELETE TASK USING FIRESTORE ID
// DELETE /api/tasks/firestore/:firestoreId
// ======================================================

router.delete('/firestore/:firestoreId', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      firestoreId: req.params.firestoreId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found in MongoDB',
      });
    }

    console.log('Task deleted from MongoDB:', task._id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.log('Delete task error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message,
    });
  }
});

// ======================================================
// DELETE TASK USING MONGODB ID
// DELETE /api/tasks/:id
// ======================================================

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.log('Delete task error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message,
    });
  }
});

module.exports = router;
