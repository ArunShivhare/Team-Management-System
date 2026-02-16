const User = require('../models/User');
const Task = require('../models/Task');

exports.getUsers = async (req, res) => {
  try {
    // only admin can get users
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
    // return employees created by this admin
    const users = await User.find({ role: 'employee', createdBy: req.user.id }).select('name email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashed, role: 'employee', createdBy: req.user.id });
    await user.save();
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.createdBy && user.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    // Unassign tasks assigned to this user
    await Task.updateMany({ assignedTo: user._id }, { $unset: { assignedTo: "" } });

    await User.findByIdAndDelete(user._id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
