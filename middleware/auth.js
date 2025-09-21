const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by anonymous ID
    const user = await User.findByAnonymousId(decoded.anonymousId);
    
    if (!user || user.status !== 'active') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid or inactive user'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Token expired'
      });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Authentication failed'
    });
  }
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      anonymousId: user.anonymousId,
      createdAt: user.createdAt
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d',
      issuer: 'mindspace',
      audience: 'youth-wellness'
    }
  );
};

// Optional authentication (for public features)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByAnonymousId(decoded.anonymousId);
      
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

// Rate limiting for sensitive operations
const sensitiveOperationLimit = (req, res, next) => {
  // This would integrate with express-rate-limit for specific routes
  // For now, we'll use a simple approach
  const userKey = req.user ? req.user.anonymousId : req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  if (!req.rateLimitStore) {
    req.rateLimitStore = new Map();
  }
  
  const userAttempts = req.rateLimitStore.get(userKey) || { count: 0, resetTime: now + windowMs };
  
  if (now > userAttempts.resetTime) {
    userAttempts.count = 0;
    userAttempts.resetTime = now + windowMs;
  }
  
  if (userAttempts.count >= maxAttempts) {
    return res.status(429).json({
      error: 'Too many attempts',
      message: 'Please wait before trying again',
      retryAfter: Math.ceil((userAttempts.resetTime - now) / 1000)
    });
  }
  
  userAttempts.count++;
  req.rateLimitStore.set(userKey, userAttempts);
  
  next();
};

// Validate user age (for youth-focused content)
const validateYouthUser = (req, res, next) => {
  // In a real implementation, you might have age verification
  // For now, we'll assume all users are youth
  req.isYouthUser = true;
  next();
};

module.exports = {
  authenticateToken,
  generateToken,
  optionalAuth,
  sensitiveOperationLimit,
  validateYouthUser
};
