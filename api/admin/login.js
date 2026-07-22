module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Admin credentials
  const ADMIN_USERNAME = 'GEET02100102';
  const ADMIN_PASSWORD = '02100102';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token: 'admin_token_' + Date.now()
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
};
