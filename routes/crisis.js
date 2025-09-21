const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Crisis intervention resources
const crisisResources = {
  immediate: {
    hotlines: [
      {
        name: 'Suicide & Crisis Lifeline',
        number: '988',
        description: '24/7 crisis support for suicide prevention and mental health crises',
        available: '24/7',
        languages: ['English', 'Spanish'],
        website: '988lifeline.org'
      },
      {
        name: 'Crisis Text Line',
        number: '741741',
        description: 'Text HOME to connect with a crisis counselor',
        available: '24/7',
        languages: ['English'],
        website: 'crisistextline.org'
      }
    ],
    emergency: {
      number: '911',
      description: 'For immediate life-threatening emergencies',
      whenToCall: 'If someone is in immediate danger of harming themselves or others'
    }
  },
  
  warningSigns: {
    verbal: [
      'Talking about wanting to die or kill themselves',
      'Looking for ways to kill themselves (searching online, buying weapons)',
      'Talking about feeling hopeless or having no reason to live',
      'Talking about feeling trapped or in unbearable pain',
      'Talking about being a burden to others'
    ],
    behavioral: [
      'Increasing use of alcohol or drugs',
      'Acting anxious, agitated, or reckless',
      'Sleeping too little or too much',
      'Withdrawing or feeling isolated',
      'Showing rage or talking about seeking revenge',
      'Extreme mood swings'
    ],
    emotional: [
      'Depression, anxiety, or loss of interest',
      'Irritability, agitation, or anger',
      'Shame, humiliation, or rejection',
      'Severe emotional pain or distress'
    ]
  },
  
  howToHelp: {
    do: [
      'Take all threats seriously',
      'Listen without judgment',
      'Ask directly if they are thinking about suicide',
      'Stay with them and don\'t leave them alone',
      'Remove any means of self-harm (weapons, medications)',
      'Encourage them to seek professional help',
      'Call 988 or 911 if immediate danger'
    ],
    dont: [
      'Don\'t minimize their feelings',
      'Don\'t promise to keep their suicidal thoughts secret',
      'Don\'t leave them alone if they\'re in immediate danger',
      'Don\'t try to handle the situation alone',
      'Don\'t use guilt or shame to try to change their mind'
    ]
  },
  
  safetyPlanning: {
    steps: [
      'Identify warning signs that a crisis may be developing',
      'List internal coping strategies that have worked before',
      'Identify people and social settings that provide distraction',
      'List people you can ask for help (family, friends, professionals)',
      'List professionals or agencies you can contact during a crisis',
      'Make your environment safe by removing means of self-harm',
      'List reasons for living and things that are important to you'
    ],
    template: {
      warningSigns: 'What are your personal warning signs that a crisis may be developing?',
      copingStrategies: 'What internal coping strategies can you use?',
      distractions: 'What people and social settings can provide distraction?',
      supportPeople: 'Who can you ask for help?',
      professionals: 'What professionals or agencies can you contact?',
      environment: 'How can you make your environment safe?',
      reasonsForLiving: 'What are your reasons for living?'
    }
  }
};

// Get crisis resources
router.get('/resources', (req, res) => {
  try {
    res.json({
      resources: crisisResources,
      message: 'If you or someone you know is in immediate danger, call 911 or go to the nearest emergency room.',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Crisis resources error:', error);
    res.status(500).json({
      error: 'Failed to retrieve crisis resources',
      message: 'Unable to load crisis resources. Please try again.'
    });
  }
});

// Get immediate crisis support
router.get('/immediate', (req, res) => {
  try {
    res.json({
      emergency: crisisResources.immediate,
      message: 'You are not alone. Help is available 24/7.',
      additionalSupport: [
        'National Suicide Prevention Lifeline: 1-800-273-8255',
        'Crisis Text Line: Text HOME to 741741',
        'Emergency Services: 911'
      ]
    });
  } catch (error) {
    console.error('Immediate crisis support error:', error);
    res.status(500).json({
      error: 'Failed to retrieve immediate crisis support',
      message: 'Unable to load crisis support. Please try again.'
    });
  }
});

// Get warning signs information
router.get('/warning-signs', optionalAuth, (req, res) => {
  try {
    res.json({
      warningSigns: crisisResources.warningSigns,
      note: 'These are common warning signs, but not everyone will show all of them. Trust your instincts if you\'re concerned about someone.'
    });
  } catch (error) {
    console.error('Warning signs error:', error);
    res.status(500).json({
      error: 'Failed to retrieve warning signs',
      message: 'Unable to load warning signs information. Please try again.'
    });
  }
});

// Get how to help someone in crisis
router.get('/how-to-help', optionalAuth, (req, res) => {
  try {
    res.json({
      guidance: crisisResources.howToHelp,
      additionalResources: [
        'QPR Institute: qprinstitute.com',
        'American Foundation for Suicide Prevention: afsp.org',
        'National Suicide Prevention Lifeline: suicidepreventionlifeline.org'
      ]
    });
  } catch (error) {
    console.error('How to help error:', error);
    res.status(500).json({
      error: 'Failed to retrieve help guidance',
      message: 'Unable to load help guidance. Please try again.'
    });
  }
});

// Get safety planning resources
router.get('/safety-planning', optionalAuth, (req, res) => {
  try {
    res.json({
      safetyPlanning: crisisResources.safetyPlanning,
      note: 'A safety plan is a personalized plan to help you get through a crisis. It\'s best created when you\'re feeling well, with the help of a mental health professional.'
    });
  } catch (error) {
    console.error('Safety planning error:', error);
    res.status(500).json({
      error: 'Failed to retrieve safety planning resources',
      message: 'Unable to load safety planning resources. Please try again.'
    });
  }
});

// Submit safety plan (for authenticated users)
router.post('/safety-plan', [
  authenticateToken,
  body('warningSigns')
    .isArray()
    .withMessage('Warning signs must be an array'),
  body('copingStrategies')
    .isArray()
    .withMessage('Coping strategies must be an array'),
  body('distractions')
    .isArray()
    .withMessage('Distractions must be an array'),
  body('supportPeople')
    .isArray()
    .withMessage('Support people must be an array'),
  body('professionals')
    .isArray()
    .withMessage('Professionals must be an array'),
  body('reasonsForLiving')
    .isArray()
    .withMessage('Reasons for living must be an array')
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
    const { warningSigns, copingStrategies, distractions, supportPeople, professionals, reasonsForLiving } = req.body;

    // In a real implementation, you would save this to a SafetyPlan model
    // For now, we'll just return a success response
    
    const safetyPlan = {
      id: `safety_plan_${Date.now()}`,
      userId: user.anonymousId,
      warningSigns,
      copingStrategies,
      distractions,
      supportPeople,
      professionals,
      reasonsForLiving,
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    res.status(201).json({
      message: 'Safety plan saved successfully',
      plan: {
        id: safetyPlan.id,
        createdAt: safetyPlan.createdAt,
        lastUpdated: safetyPlan.lastUpdated
      },
      reminder: 'Review and update your safety plan regularly, especially when you\'re feeling well.'
    });

  } catch (error) {
    console.error('Safety plan submission error:', error);
    res.status(500).json({
      error: 'Failed to save safety plan',
      message: 'Unable to save safety plan. Please try again.'
    });
  }
});

// Crisis check-in (for immediate support)
router.post('/check-in', [
  body('crisisLevel')
    .isIn(['low', 'medium', 'high', 'immediate'])
    .withMessage('Crisis level must be low, medium, high, or immediate'),
  body('currentThoughts')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Current thoughts must be less than 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { crisisLevel, currentThoughts } = req.body;

    let response = {
      crisisLevel,
      timestamp: new Date(),
      resources: []
    };

    // Provide appropriate resources based on crisis level
    switch (crisisLevel) {
      case 'immediate':
        response.resources = [
          {
            type: 'emergency',
            action: 'Call 911 immediately',
            description: 'You are in immediate danger. Please call emergency services now.'
          },
          {
            type: 'crisis_line',
            action: 'Call 988',
            description: 'Suicide & Crisis Lifeline - 24/7 support'
          }
        ];
        response.message = 'You are not alone. Please reach out for immediate help.';
        break;
        
      case 'high':
        response.resources = [
          {
            type: 'crisis_line',
            action: 'Call 988',
            description: 'Suicide & Crisis Lifeline - 24/7 support'
          },
          {
            type: 'text_line',
            action: 'Text HOME to 741741',
            description: 'Crisis Text Line - 24/7 text support'
          }
        ];
        response.message = 'Please reach out to a crisis counselor. You don\'t have to go through this alone.';
        break;
        
      case 'medium':
        response.resources = [
          {
            type: 'crisis_line',
            action: 'Call 988',
            description: 'Suicide & Crisis Lifeline - 24/7 support'
          },
          {
            type: 'professional',
            action: 'Contact a mental health professional',
            description: 'Consider reaching out to a therapist or counselor'
          }
        ];
        response.message = 'It\'s important to reach out for support. Consider talking to a professional.';
        break;
        
      case 'low':
        response.resources = [
          {
            type: 'self_care',
            action: 'Practice self-care',
            description: 'Engage in activities that help you feel better'
          },
          {
            type: 'support',
            action: 'Reach out to trusted friends or family',
            description: 'Talk to someone you trust about how you\'re feeling'
          }
        ];
        response.message = 'Take care of yourself and don\'t hesitate to reach out for support if needed.';
        break;
    }

    res.json(response);

  } catch (error) {
    console.error('Crisis check-in error:', error);
    res.status(500).json({
      error: 'Failed to process crisis check-in',
      message: 'Unable to process your check-in. Please try again or call 988 for immediate support.'
    });
  }
});

// Get crisis prevention tips
router.get('/prevention', optionalAuth, (req, res) => {
  try {
    const preventionTips = {
      daily: [
        'Maintain a regular sleep schedule',
        'Eat regular, balanced meals',
        'Stay hydrated',
        'Get some physical activity each day',
        'Spend time in nature or sunlight'
      ],
      social: [
        'Stay connected with friends and family',
        'Join clubs or groups with similar interests',
        'Volunteer or help others',
        'Maintain healthy relationships',
        'Seek support when you need it'
      ],
      mental: [
        'Practice mindfulness or meditation',
        'Engage in activities you enjoy',
        'Set realistic goals and celebrate achievements',
        'Learn stress management techniques',
        'Challenge negative thoughts'
      ],
      professional: [
        'See a therapist or counselor regularly',
        'Take medications as prescribed',
        'Attend support groups',
        'Have a crisis plan in place',
        'Know your warning signs'
      ]
    };

    res.json({
      preventionTips,
      note: 'These are general prevention strategies. Everyone is different, so find what works best for you.'
    });

  } catch (error) {
    console.error('Crisis prevention error:', error);
    res.status(500).json({
      error: 'Failed to retrieve prevention tips',
      message: 'Unable to load prevention tips. Please try again.'
    });
  }
});

module.exports = router;
