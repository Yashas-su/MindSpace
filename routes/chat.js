const express = require('express');
const { body, validationResult } = require('express-validator');
const ChatSession = require('../models/ChatSession');
const aiService = require('../services/aiService');
const { authenticateToken, sensitiveOperationLimit } = require('../middleware/auth');
const encryptionService = require('../config/encryption');

const router = express.Router();

// Start new chat session
router.post('/start', [
  authenticateToken,
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
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
    const { title } = req.body;

    // Generate session ID
    const sessionId = encryptionService.generateSecureToken(24);

    // Create new chat session
    const session = new ChatSession({
      userAnonymousId: user.anonymousId,
      sessionId,
      privacy: {
        autoDelete: true,
        retentionDays: user.privacy.dataRetention || 7
      }
    });

    // Set encrypted title if provided
    if (title) {
      const encryptedTitle = encryptionService.encrypt(title);
      session.encryptedTitle = JSON.stringify(encryptedTitle);
    }

    await session.save();

    res.status(201).json({
      message: 'Chat session started',
      session: {
        sessionId: session.sessionId,
        startedAt: session.startedAt,
        status: session.status
      }
    });

  } catch (error) {
    console.error('Chat start error:', error);
    res.status(500).json({
      error: 'Failed to start chat session',
      message: 'Unable to create new chat session. Please try again.'
    });
  }
});

// Send message to AI
router.post('/message', [
  authenticateToken,
  sensitiveOperationLimit,
  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required'),
  body('message')
    .notEmpty()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters')
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
    const { sessionId, message } = req.body;

    // Find chat session
    const session = await ChatSession.findOne({
      sessionId,
      userAnonymousId: user.anonymousId,
      status: { $in: ['active', 'paused'] }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Chat session not found or has ended'
      });
    }

    // Add user message to session
    await session.addMessage('user', message, 'general');

    // Get AI response
    const aiResponse = await aiService.generateResponse(
      message,
      sessionId,
      { age: 'youth' } // We assume all users are youth
    );

    // Add AI response to session
    await session.addMessage('assistant', aiResponse.response, aiResponse.messageType);

    // Update session analytics
    if (aiResponse.crisisLevel !== 'none') {
      await session.setCrisisLevel(aiResponse.crisisLevel);
    }

    // Update session sentiment
    const lastMessage = session.messages[session.messages.length - 2]; // User message
    if (lastMessage) {
      lastMessage.sentiment = aiResponse.sentiment;
      await session.save();
    }

    res.json({
      message: 'Message sent successfully',
      response: {
        content: aiResponse.response,
        timestamp: new Date(),
        crisisLevel: aiResponse.crisisLevel,
        sentiment: aiResponse.sentiment,
        messageType: aiResponse.messageType
      },
      session: {
        sessionId: session.sessionId,
        status: session.status,
        crisisDetected: session.crisisDetected,
        messageCount: session.analytics.totalMessages
      }
    });

  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: 'Unable to process your message. Please try again.'
    });
  }
});

// Get chat session history
router.get('/session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.params;

    // Find chat session
    const session = await ChatSession.findOne({
      sessionId,
      userAnonymousId: user.anonymousId
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Chat session not found'
      });
    }

    // Get decrypted messages
    const decryptedMessages = session.getDecryptedMessages();

    res.json({
      session: {
        sessionId: session.sessionId,
        status: session.status,
        startedAt: session.startedAt,
        lastMessageAt: session.lastMessageAt,
        endedAt: session.endedAt,
        crisisDetected: session.crisisDetected,
        crisisLevel: session.crisisLevel,
        analytics: session.analytics
      },
      messages: decryptedMessages
    });

  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({
      error: 'Failed to retrieve chat history',
      message: 'Unable to load chat history. Please try again.'
    });
  }
});

// Get user's chat sessions
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, offset = 0 } = req.query;

    const sessions = await ChatSession.findByUser(
      user.anonymousId,
      parseInt(limit)
    ).skip(parseInt(offset));

    const sessionSummaries = sessions.map(session => ({
      sessionId: session.sessionId,
      status: session.status,
      startedAt: session.startedAt,
      lastMessageAt: session.lastMessageAt,
      endedAt: session.endedAt,
      crisisDetected: session.crisisDetected,
      messageCount: session.analytics.totalMessages,
      sessionDuration: session.analytics.sessionDuration,
      topicsDiscussed: session.analytics.topicsDiscussed
    }));

    res.json({
      sessions: sessionSummaries,
      total: sessionSummaries.length
    });

  } catch (error) {
    console.error('Chat sessions error:', error);
    res.status(500).json({
      error: 'Failed to retrieve chat sessions',
      message: 'Unable to load chat sessions. Please try again.'
    });
  }
});

// End chat session
router.post('/end/:sessionId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.params;

    // Find chat session
    const session = await ChatSession.findOne({
      sessionId,
      userAnonymousId: user.anonymousId,
      status: { $in: ['active', 'paused'] }
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Chat session not found or already ended'
      });
    }

    // End session
    await session.endSession();

    // Clear AI conversation history for privacy
    aiService.clearConversationHistory(sessionId);

    res.json({
      message: 'Chat session ended successfully',
      session: {
        sessionId: session.sessionId,
        endedAt: session.endedAt,
        totalMessages: session.analytics.totalMessages,
        sessionDuration: session.analytics.sessionDuration
      }
    });

  } catch (error) {
    console.error('End chat error:', error);
    res.status(500).json({
      error: 'Failed to end chat session',
      message: 'Unable to end chat session. Please try again.'
    });
  }
});

// Pause chat session
router.post('/pause/:sessionId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.params;

    // Find chat session
    const session = await ChatSession.findOne({
      sessionId,
      userAnonymousId: user.anonymousId,
      status: 'active'
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Chat session not found or not active'
      });
    }

    // Pause session
    session.status = 'paused';
    await session.save();

    res.json({
      message: 'Chat session paused successfully',
      session: {
        sessionId: session.sessionId,
        status: session.status
      }
    });

  } catch (error) {
    console.error('Pause chat error:', error);
    res.status(500).json({
      error: 'Failed to pause chat session',
      message: 'Unable to pause chat session. Please try again.'
    });
  }
});

// Resume chat session
router.post('/resume/:sessionId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.params;

    // Find chat session
    const session = await ChatSession.findOne({
      sessionId,
      userAnonymousId: user.anonymousId,
      status: 'paused'
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Chat session not found or not paused'
      });
    }

    // Resume session
    session.status = 'active';
    await session.save();

    res.json({
      message: 'Chat session resumed successfully',
      session: {
        sessionId: session.sessionId,
        status: session.status
      }
    });

  } catch (error) {
    console.error('Resume chat error:', error);
    res.status(500).json({
      error: 'Failed to resume chat session',
      message: 'Unable to resume chat session. Please try again.'
    });
  }
});

// Get wellness suggestions
router.get('/wellness-suggestions', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { mood = 'general' } = req.query;

    const suggestions = await aiService.generateWellnessSuggestions(
      { age: 'youth' },
      mood
    );

    res.json({
      suggestions,
      mood,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Wellness suggestions error:', error);
    res.status(500).json({
      error: 'Failed to get wellness suggestions',
      message: 'Unable to retrieve wellness suggestions. Please try again.'
    });
  }
});

// Get conversation summary (anonymized)
router.get('/summary/:sessionId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.params;

    // Verify session belongs to user
    const session = await ChatSession.findOne({
      sessionId,
      userAnonymousId: user.anonymousId
    });

    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'Chat session not found'
      });
    }

    // Get anonymized summary
    const summary = aiService.getConversationSummary(sessionId);

    res.json({
      summary,
      session: {
        sessionId: session.sessionId,
        startedAt: session.startedAt,
        messageCount: session.analytics.totalMessages
      }
    });

  } catch (error) {
    console.error('Conversation summary error:', error);
    res.status(500).json({
      error: 'Failed to get conversation summary',
      message: 'Unable to retrieve conversation summary. Please try again.'
    });
  }
});

module.exports = router;
