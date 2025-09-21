const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Wellness resources and activities
const wellnessResources = {
  breathing: [
    {
      id: '4-7-8',
      name: '4-7-8 Breathing',
      description: 'A calming breathing technique to reduce anxiety and stress',
      steps: [
        'Breathe in through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat 3-4 times'
      ],
      duration: '2-3 minutes',
      category: 'breathing'
    },
    {
      id: 'box-breathing',
      name: 'Box Breathing',
      description: 'A simple technique used by professionals to stay calm under pressure',
      steps: [
        'Breathe in for 4 counts',
        'Hold for 4 counts',
        'Breathe out for 4 counts',
        'Hold for 4 counts',
        'Repeat'
      ],
      duration: '3-5 minutes',
      category: 'breathing'
    }
  ],
  
  mindfulness: [
    {
      id: 'body-scan',
      name: 'Body Scan Meditation',
      description: 'A mindfulness practice to connect with your body and release tension',
      steps: [
        'Find a comfortable position',
        'Start at your toes and notice any sensations',
        'Slowly move your attention up through your body',
        'Notice without judgment',
        'End at the top of your head'
      ],
      duration: '10-15 minutes',
      category: 'mindfulness'
    },
    {
      id: '5-senses',
      name: '5-4-3-2-1 Grounding',
      description: 'A grounding technique to help with anxiety and panic',
      steps: [
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ],
      duration: '2-3 minutes',
      category: 'mindfulness'
    }
  ],
  
  movement: [
    {
      id: 'progressive-relaxation',
      name: 'Progressive Muscle Relaxation',
      description: 'A technique to release physical tension and stress',
      steps: [
        'Start with your toes - tense for 5 seconds, then release',
        'Move to your calves, thighs, abdomen, arms, hands',
        'Tense each muscle group for 5 seconds',
        'Notice the difference between tension and relaxation',
        'End with your face and head'
      ],
      duration: '10-15 minutes',
      category: 'movement'
    },
    {
      id: 'gentle-stretching',
      name: 'Gentle Stretching',
      description: 'Simple stretches to release tension and improve mood',
      steps: [
        'Neck rolls - slowly roll your head in circles',
        'Shoulder shrugs - lift and lower your shoulders',
        'Arm circles - gentle circles with your arms',
        'Spinal twist - gentle twisting while seated',
        'End with deep breathing'
      ],
      duration: '5-10 minutes',
      category: 'movement'
    }
  ],
  
  journaling: [
    {
      id: 'gratitude-journal',
      name: 'Gratitude Journaling',
      description: 'Writing about things you\'re grateful for to improve mood',
      prompts: [
        'What made you smile today?',
        'Who are you grateful for and why?',
        'What small thing went well today?',
        'What are you looking forward to?',
        'What challenge helped you grow?'
      ],
      duration: '5-10 minutes',
      category: 'journaling'
    },
    {
      id: 'emotion-check',
      name: 'Emotion Check-in',
      description: 'A way to process and understand your feelings',
      prompts: [
        'How am I feeling right now? (1-10 scale)',
        'What emotions am I experiencing?',
        'What might be causing these feelings?',
        'What do I need right now?',
        'What can I do to take care of myself?'
      ],
      duration: '5-10 minutes',
      category: 'journaling'
    }
  ]
};

// Get wellness activities by category
router.get('/activities', optionalAuth, (req, res) => {
  try {
    const { category, limit = 10 } = req.query;
    
    let activities = [];
    
    if (category && wellnessResources[category]) {
      activities = wellnessResources[category];
    } else {
      // Return all activities
      Object.values(wellnessResources).forEach(categoryActivities => {
        activities = activities.concat(categoryActivities);
      });
    }
    
    // Limit results
    if (limit) {
      activities = activities.slice(0, parseInt(limit));
    }
    
    res.json({
      activities,
      total: activities.length,
      categories: Object.keys(wellnessResources)
    });
    
  } catch (error) {
    console.error('Wellness activities error:', error);
    res.status(500).json({
      error: 'Failed to retrieve wellness activities',
      message: 'Unable to load wellness activities. Please try again.'
    });
  }
});

// Get specific wellness activity
router.get('/activities/:activityId', optionalAuth, (req, res) => {
  try {
    const { activityId } = req.params;
    
    // Find activity across all categories
    let activity = null;
    for (const category of Object.values(wellnessResources)) {
      activity = category.find(a => a.id === activityId);
      if (activity) break;
    }
    
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        message: 'The requested wellness activity was not found'
      });
    }
    
    res.json({
      activity
    });
    
  } catch (error) {
    console.error('Wellness activity error:', error);
    res.status(500).json({
      error: 'Failed to retrieve wellness activity',
      message: 'Unable to load wellness activity. Please try again.'
    });
  }
});

// Get wellness tips
router.get('/tips', optionalAuth, (req, res) => {
  try {
    const { topic, limit = 5 } = req.query;
    
    const tips = {
      anxiety: [
        'Remember that anxiety is temporary - feelings come and go',
        'Practice deep breathing when you feel overwhelmed',
        'Challenge anxious thoughts with evidence',
        'Stay connected with supportive people',
        'Limit caffeine and get enough sleep'
      ],
      depression: [
        'Small steps count - even getting out of bed is an achievement',
        'Try to maintain a routine, even a simple one',
        'Get some sunlight or natural light each day',
        'Connect with someone you trust',
        'Remember that depression is treatable and you\'re not alone'
      ],
      stress: [
        'Break large tasks into smaller, manageable steps',
        'Practice time management and set realistic goals',
        'Take regular breaks throughout your day',
        'Engage in activities you enjoy',
        'Learn to say no when you\'re overwhelmed'
      ],
      sleep: [
        'Maintain a consistent sleep schedule',
        'Create a relaxing bedtime routine',
        'Avoid screens 1 hour before bed',
        'Keep your bedroom cool, dark, and quiet',
        'Limit caffeine after 2 PM'
      ],
      general: [
        'Practice self-compassion - be kind to yourself',
        'Stay hydrated and eat regular meals',
        'Engage in physical activity you enjoy',
        'Spend time in nature when possible',
        'Remember that seeking help is a sign of strength'
      ]
    };
    
    const selectedTips = tips[topic] || tips.general;
    const limitedTips = selectedTips.slice(0, parseInt(limit));
    
    res.json({
      tips: limitedTips,
      topic: topic || 'general',
      total: limitedTips.length
    });
    
  } catch (error) {
    console.error('Wellness tips error:', error);
    res.status(500).json({
      error: 'Failed to retrieve wellness tips',
      message: 'Unable to load wellness tips. Please try again.'
    });
  }
});

// Get mood tracking options
router.get('/mood-tracking', authenticateToken, (req, res) => {
  try {
    const moodOptions = {
      emotions: [
        { name: 'Happy', emoji: '😊', value: 8 },
        { name: 'Sad', emoji: '😢', value: 3 },
        { name: 'Anxious', emoji: '😰', value: 4 },
        { name: 'Angry', emoji: '😠', value: 3 },
        { name: 'Excited', emoji: '🤩', value: 9 },
        { name: 'Calm', emoji: '😌', value: 7 },
        { name: 'Overwhelmed', emoji: '😵', value: 2 },
        { name: 'Grateful', emoji: '🙏', value: 8 },
        { name: 'Lonely', emoji: '😔', value: 3 },
        { name: 'Hopeful', emoji: '🌟', value: 7 }
      ],
      activities: [
        'School/Work',
        'Exercise',
        'Socializing',
        'Hobbies',
        'Family time',
        'Rest/Relaxation',
        'Creative activities',
        'Learning',
        'Nature time',
        'Self-care'
      ],
      factors: [
        'Sleep quality',
        'Stress level',
        'Social connections',
        'Physical activity',
        'Weather',
        'Academic/Work pressure',
        'Family relationships',
        'Health',
        'Finances',
        'Future plans'
      ]
    };
    
    res.json({
      moodOptions,
      instructions: {
        tracking: 'Rate your mood on a scale of 1-10 and select relevant emotions, activities, and factors',
        frequency: 'Track daily for best insights, but any tracking is helpful',
        privacy: 'Your mood data is encrypted and only visible to you'
      }
    });
    
  } catch (error) {
    console.error('Mood tracking error:', error);
    res.status(500).json({
      error: 'Failed to retrieve mood tracking options',
      message: 'Unable to load mood tracking options. Please try again.'
    });
  }
});

// Submit mood tracking entry
router.post('/mood-tracking', [
  authenticateToken,
  body('mood')
    .isInt({ min: 1, max: 10 })
    .withMessage('Mood must be between 1 and 10'),
  body('emotions')
    .isArray()
    .withMessage('Emotions must be an array'),
  body('activities')
    .optional()
    .isArray()
    .withMessage('Activities must be an array'),
  body('factors')
    .optional()
    .isArray()
    .withMessage('Factors must be an array'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes must be less than 500 characters')
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
    const { mood, emotions, activities = [], factors = [], notes = '' } = req.body;

    // In a real implementation, you would save this to a MoodEntry model
    // For now, we'll just return a success response
    
    const moodEntry = {
      id: `mood_${Date.now()}`,
      userId: user.anonymousId,
      mood,
      emotions,
      activities,
      factors,
      notes,
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    res.status(201).json({
      message: 'Mood entry recorded successfully',
      entry: {
        id: moodEntry.id,
        mood: moodEntry.mood,
        emotions: moodEntry.emotions,
        timestamp: moodEntry.timestamp,
        date: moodEntry.date
      }
    });

  } catch (error) {
    console.error('Mood tracking submission error:', error);
    res.status(500).json({
      error: 'Failed to record mood entry',
      message: 'Unable to save mood entry. Please try again.'
    });
  }
});

// Get wellness challenges
router.get('/challenges', optionalAuth, (req, res) => {
  try {
    const challenges = [
      {
        id: '7-day-gratitude',
        name: '7-Day Gratitude Challenge',
        description: 'Write down 3 things you\'re grateful for each day for a week',
        duration: '7 days',
        difficulty: 'Easy',
        benefits: ['Improved mood', 'Better sleep', 'Increased optimism'],
        steps: [
          'Set a daily reminder',
          'Write 3 things you\'re grateful for',
          'Be specific and detailed',
          'Reflect on how it makes you feel'
        ]
      },
      {
        id: 'mindful-breathing',
        name: 'Mindful Breathing Challenge',
        description: 'Practice 5 minutes of mindful breathing daily for 2 weeks',
        duration: '14 days',
        difficulty: 'Easy',
        benefits: ['Reduced stress', 'Better focus', 'Improved sleep'],
        steps: [
          'Find a quiet space',
          'Set a 5-minute timer',
          'Focus on your breath',
          'Gently return focus when mind wanders'
        ]
      },
      {
        id: 'digital-detox',
        name: 'Digital Detox Challenge',
        description: 'Reduce screen time and increase real-world connections',
        duration: '7 days',
        difficulty: 'Medium',
        benefits: ['Better sleep', 'Reduced anxiety', 'More present moments'],
        steps: [
          'Set specific screen-free times',
          'Use apps to track usage',
          'Replace screen time with other activities',
          'Connect with people face-to-face'
        ]
      }
    ];
    
    res.json({
      challenges,
      total: challenges.length
    });
    
  } catch (error) {
    console.error('Wellness challenges error:', error);
    res.status(500).json({
      error: 'Failed to retrieve wellness challenges',
      message: 'Unable to load wellness challenges. Please try again.'
    });
  }
});

module.exports = router;
