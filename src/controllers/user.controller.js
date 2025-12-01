import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  try {
    const { email, password, name, position, department, phone } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      email, 
      name, 
      passwordHash,
      position,
      department,
      phone
    });
    
    const userResponse = user.toObject();
    delete userResponse.passwordHash;
    
    return res.status(201).json(userResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, position, department, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, position, department, phone },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Check if requesting user is admin
    const requestingUser = await User.findById(req.userid);
    if (!requestingUser || (!requestingUser.isAdmin && requestingUser.isAdmin !== 'true')) {
      return res.status(403).json({ error: 'Only admins can delete users' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
