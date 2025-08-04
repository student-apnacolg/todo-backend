const Task = require('../models/taskModel')

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({error : error.message})
  }
}

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};