const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, category, taskDate, assignedTo } = req.body;
    const task = new Task({ title, description, category, taskDate, assignedTo, createdBy: req.user.id });
    await task.save();
    // populate assignedTo with name and email
    await task.populate('assignedTo', 'name email');
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      // admin sees tasks they created
      tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 }).populate('assignedTo', 'name email');
    } else {
      // employee sees tasks assigned to them - also populate assignedTo for complete data
      tasks = await Task.find({ assignedTo: req.user.id }).sort({ createdAt: -1 }).populate('createdBy', 'name email').populate('assignedTo', 'name email');
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // permission: only assigned user or admin (creator) can update status/details
    const isAssignedUser = task.assignedTo && task.assignedTo.toString() === req.user.id;
    const isCreator = task.createdBy && task.createdBy.toString() === req.user.id;
    if (!isAssignedUser && !isCreator && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update task' });
    }

    Object.assign(task, req.body);
    await task.save();
    // populate assignedTo with user details before responding
    await task.populate('assignedTo', 'name email');
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
