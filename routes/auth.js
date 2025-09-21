const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, authenticateToken, sensitiveOperationLimit } = require('../middleware/auth');
const encryptionService = require('../config/encryption');

const router = express.Router();

// Register new user (anonymous)
router.post('/register', [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('preferences.theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Invalid theme selection')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { password, email, preferences = {} } = req.body;

    // Generate anonymous ID
    const anonymousId = encryptionService.generateSecureToken(16);

    // Check if anonymous ID already exists (very unlikely but possible)
    const existingUser = await User.findOne({ anonymousId });
    if (existingUser) {
      return res.status(409).json({
        error: 'Registration failed',
        message: 'Please try again'
      });
    }

    // Create new user
    const user = new User({
      anonymousId,
      password,
      preferences: {
        theme: preferences.theme || 'auto',
        notifications: preferences.notifications !== false,
        language: preferences.language || 'en'
      },
      privacy: {
        dataRetention: preferences.dataRetention || 30,
        shareAnalytics: preferences.shareAnalytics || false,
        allowCrisisContact: preferences.allowCrisisContact !== false
      }
    });

    // Set email if provided
    if (email) {
      user.email = email; // Will be encrypted in pre-save middleware
    }

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        anonymousId: user.anonymousId,
        preferences: user.preferences,
        privacy: user.privacy,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: 'Unable to create account. Please try again.'
    });
  }
});

// Login user
router.post('/login', [
  body('anonymousId')
    .notEmpty()
    .withMessage('Anonymous ID is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { anonymousId, password } = req.body;

    // Find user
    const user = await User.findByAnonymousId(anonymousId);
    if (!user) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Invalid credentials'
      });
    }

    // Update last active
    user.lastActive = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        anonymousId: user.anonymousId,
        preferences: user.preferences,
        privacy: user.privacy,
        lastActive: user.lastActive
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'Unable to authenticate. Please try again.'
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      user: {
        anonymousId: user.anonymousId,
        preferences: user.preferences,
        privacy: user.privacy,
        status: user.status,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      message: 'Unable to retrieve user information'
    });
  }
});

// Update user preferences
router.put('/preferences', [
  authenticateToken,
  sensitiveOperationLimit,
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Invalid theme selection'),
  body('notifications')
    .optional()
    .isBoolean()
    .withMessage('Notifications must be a boolean value'),
  body('language')
    .optional()
    .isLength({ min: 2, max: 5 })
    .withMessage('Invalid language code')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const user = req.user;
    const { theme, notifications, language, sensitive } = req.body;

    // Update preferences
    if (theme !== undefined) user.preferences.theme = theme;
    if (notifications !== undefined) user.preferences.notifications = notifications;
    if (language !== undefined) user.preferences.language = language;
    
    // Update sensitive preferences if provided
    if (sensitive) {
      user.updatePreferences({ sensitive });
    }

    await user.save();

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });

  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({
      error: 'Failed to update preferences',
      message: 'Unable to save preferences. Please try again.'
    });
  }
});

// Update privacy settings
router.put('/privacy', [
  authenticateToken,
  sensitiveOperationLimit,
  body('dataRetention')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Data retention must be between 1 and 365 days'),
  body('shareAnalytics')
    .optional()
    .isBoolean()
    .withMessage('Share analytics must be a boolean value'),
  body('allowCrisisContact')
    .optional()
    .isBoolean()
    .withMessage('Allow crisis contact must be a boolean value')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const user = req.user;
    const { dataRetention, shareAnalytics, allowCrisisContact } = req.body;

    // Update privacy settings
    if (dataRetention !== undefined) {
      user.privacy.dataRetention = dataRetention;
      // Update data expiry
      user.dataExpiry = new Date(Date.now() + dataRetention * 24 * 60 * 60 * 1000);
    }
    if (shareAnalytics !== undefined) user.privacy.shareAnalytics = shareAnalytics;
    if (allowCrisisContact !== undefined) user.privacy.allowCrisisContact = allowCrisisContact;

    await user.save();

    res.json({
      message: 'Privacy settings updated successfully',
      privacy: user.privacy
    });

  } catch (error) {
    console.error('Privacy update error:', error);
    res.status(500).json({
      error: 'Failed to update privacy settings',
      message: 'Unable to save privacy settings. Please try again.'
    });
  }
});

// Change password
router.put('/password', [
  authenticateToken,
  sensitiveOperationLimit,
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        error: 'Password change failed',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword; // Will be hashed in pre-save middleware
    await user.save();

    res.json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      error: 'Failed to change password',
      message: 'Unable to update password. Please try again.'
    });
  }
});

// Delete account (anonymize data)
router.delete('/account', [
  authenticateToken,
  sensitiveOperationLimit,
  body('password')
    .notEmpty()
    .withMessage('Password is required for account deletion')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const user = req.user;
    const { password } = req.body;

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Account deletion failed',
        message: 'Password is incorrect'
      });
    }

    // Anonymize user data instead of deleting
    user.status = 'deleted';
    user.encryptedEmail = null;
    user.preferences.encrypted = null;
    user.lastActive = new Date();
    
    // Set immediate data expiry for deleted accounts
    user.dataExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await user.save();

    res.json({
      message: 'Account deleted successfully. Your data will be permanently removed within 24 hours.'
    });

  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({
      error: 'Failed to delete account',
      message: 'Unable to delete account. Please try again.'
    });
  }
});

// Verify token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: {
      anonymousId: req.user.anonymousId,
      status: req.user.status
    }
  });
});

module.exports = router;
