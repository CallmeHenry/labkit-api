import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../config/config.js';

const signAccessToken = (userid) => {
  const token = jwt.sign({ sub: userid }, config.jwtSecret, {
    expiresIn: '7d'
  });
  return token;
};

const register = async (req, res) => {
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

    // Check if this is the first user
    const userCount = await User.countDocuments();
    const isAdmin = userCount === 0;

    const user = await User.create({ 
      email, 
      name, 
      passwordHash,
      position,
      department,
      phone,
      isAdmin
    });
    
    if (user) {
      return res.status(201).json({ isReg: true });
    } else {
      return res.status(400).json({ error: 'Model validation failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email does not match our records' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    
    if (isPasswordMatch) {
      const token = signAccessToken(user._id);
      return res.json({ 
        token,
        user: {
          name: user.name,
          email: user.email,
          position: user.position,
          department: user.department,
          phone: user.phone,
          isAdmin: user.isAdmin,
          _id: user._id
        }
      });
    } else {
      return res.status(401).json({ error: 'Password incorrect' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signout = (req, res) => {
  return res.status(200).json({ message: 'Signed out successfully' });
};

export { register, signin, signout };
