const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET_KEY = 'your_secret_key'; // 🔐 use env variable later

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  console.log('🔹 Register request received:', { username, role });

  try {
    const hash = await bcrypt.hash(password, 10);
    console.log('🔹 Password hashed successfully');

    const newUser = await User.create({ username, password_hash: hash, role });
    console.log('✅ User created successfully:', { user_id: newUser.user_id, username: newUser.username, role: newUser.role });

    res.status(201).json({ user_id: newUser.user_id, username: newUser.username, role: newUser.role });
  } catch (error) {
    console.error('⚠️ User registration failed:', error);
    res.status(400).json({ error: 'User registration failed' });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('🔹 Login attempt for username:', username);

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.warn('⚠️ User not found:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('✅ User found:', user.username);

    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      console.warn('⚠️ Invalid password for user:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('✅ Password valid for user:', username);

    // Generate tokens
    const accessToken = jwt.sign(
      { user_id: user.user_id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1m' }
    );

    const refreshToken = jwt.sign(
      { user_id: user.user_id },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    console.log('🔹 Generated refresh token for user:', username);

    user.refresh_token = refreshToken; 

    // Save refresh token using user.save()
    await user.save({ fields: ['refresh_token'] }); // ensure only refresh_token is updated
    console.log('✅ Refresh token saved for user:', username);

    res.json({ accessToken, refreshToken });

  } catch (error) {
    console.error('❌ Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};


exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  console.log('🔹 Refresh token request received');

  if (!refreshToken) {
    console.warn('⚠️ No refresh token provided');
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    console.log('🔹 Looking for user with this refresh token...');
    const user = await User.findOne({ where: { refresh_token: refreshToken } });

    if (!user) {
      console.warn('⚠️ Invalid refresh token, no user found');
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    console.log('✅ User found:', user.username);

    jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('❌ JWT verification failed:', err.message);
        return res.status(403).json({ error: 'Invalid refresh token' });
      }

      console.log('✅ Refresh token verified for user:', user.username);

      const newAccessToken = jwt.sign(
        { user_id: user.user_id, role: user.role },
        SECRET_KEY,
        { expiresIn: '1m' } // short-lived access token
      );

      console.log('🔹 New access token generated for user:', user.username);

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('❌ Token refresh failed:', error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
};


exports.logout = async (req, res) => {
  const { user_id } = req.body;
  console.log('🔹 Logout request received for user_id:', user_id);

  try {
    const [updatedRows] = await User.update(
      { refresh_token: null },
      { where: { user_id } }
    );

    if (updatedRows === 0) {
      console.warn('⚠️ No user found with user_id:', user_id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('✅ User logged out successfully:', user_id);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('⚠️ Logout failed for user_id:', user_id, 'Error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};


