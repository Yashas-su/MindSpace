const express = require('express');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Mental health resources and information
const mentalHealthResources = {
  crisis: {
    hotlines: [
      {
        name: 'Suicide & Crisis Lifeline',
        number: '988',
        text: 'Text HOME to 741741',
        description: '24/7 crisis support for suicide prevention and mental health crises',
        available: '24/7',
        languages: ['English', 'Spanish']
      },
      {
        name: 'Crisis Text Line',
        number: '741741',
        description: 'Text HOME to connect with a crisis counselor',
        available: '24/7',
        languages: ['English']
      },
      {
        name: 'National Suicide Prevention Lifeline',
        number: '1-800-273-8255',
        description: '24/7 suicide prevention and crisis intervention',
        available: '24/7',
        languages: ['English', 'Spanish']
      }
    ],
    warningSigns: [
      'Talking about wanting to die or kill themselves',
      'Looking for ways to kill themselves',
      'Talking about feeling hopeless or having no reason to live',
      'Talking about feeling trapped or in unbearable pain',
      'Talking about being a burden to others',
      'Increasing use of alcohol or drugs',
      'Acting anxious, agitated, or reckless',
      'Sleeping too little or too much',
      'Withdrawing or feeling isolated',
      'Showing rage or talking about seeking revenge',
      'Extreme mood swings'
    ]
  },
  
  professional: {
    types: [
      {
        type: 'Therapist/Counselor',
        description: 'Licensed mental health professionals who provide talk therapy',
        specialties: ['Individual therapy', 'Group therapy', 'Family therapy'],
        howToFind: 'Ask your doctor, check insurance provider directory, or use online directories'
      },
      {
        type: 'Psychiatrist',
        description: 'Medical doctors who can prescribe medication and provide therapy',
        specialties: ['Medication management', 'Psychiatric evaluation', 'Treatment planning'],
        howToFind: 'Ask your doctor for referral, check with insurance, or contact local mental health centers'
      },
      {
        type: 'School Counselor',
        description: 'Counselors available at your school for academic and personal support',
        specialties: ['Academic support', 'Crisis intervention', 'Resource referral'],
        howToFind: 'Contact your school\'s counseling office or student services'
      },
      {
        type: 'Peer Support Specialist',
        description: 'People with lived experience who provide support and guidance',
        specialties: ['Peer support', 'Recovery coaching', 'Resource navigation'],
        howToFind: 'Contact local mental health organizations or recovery centers'
      }
    ],
    howToPrepare: [
      'Write down your concerns and questions',
      'List any symptoms you\'re experiencing',
      'Note any medications you\'re taking',
      'Think about your goals for therapy',
      'Prepare questions about their approach and experience'
    ]
  },
  
  selfHelp: {
    books: [
      {
        title: 'The Anxiety and Phobia Workbook',
        author: 'Edmund J. Bourne',
        description: 'A comprehensive workbook for managing anxiety and phobias',
        ageRange: 'Teen to Adult'
      },
      {
        title: 'Feeling Good: The New Mood Therapy',
        author: 'David D. Burns',
        description: 'Cognitive behavioral therapy techniques for depression',
        ageRange: 'Adult'
      },
      {
        title: 'The Mindful Teen',
        author: 'Dzung X. Vo',
        description: 'Mindfulness practices specifically for teenagers',
        ageRange: 'Teen'
      }
    ],
    apps: [
      {
        name: 'Headspace',
        description: 'Meditation and mindfulness app with guided sessions',
        features: ['Guided meditations', 'Sleep stories', 'Focus exercises'],
        cost: 'Free with premium options'
      },
      {
        name: 'Calm',
        description: 'Meditation, sleep, and relaxation app',
        features: ['Meditation sessions', 'Sleep stories', 'Breathing exercises'],
        cost: 'Free with premium options'
      },
      {
        name: 'Moodpath',
        description: 'Mood tracking and mental health assessment app',
        features: ['Daily mood tracking', 'Mental health insights', 'Educational content'],
        cost: 'Free with premium options'
      }
    ]
  },
  
  support: {
    online: [
      {
        name: '7 Cups',
        description: 'Online therapy and emotional support',
        features: ['Free chat with trained listeners', 'Online therapy options', 'Support groups'],
        website: '7cups.com'
      },
      {
        name: 'BetterHelp',
        description: 'Online therapy platform with licensed therapists',
        features: ['Video, phone, and chat therapy', 'Flexible scheduling', 'Specialized therapists'],
        website: 'betterhelp.com'
      },
      {
        name: 'Talkspace',
        description: 'Online therapy with licensed mental health professionals',
        features: ['Text, video, and audio therapy', 'Unlimited messaging', 'Specialized care'],
        website: 'talkspace.com'
      }
    ],
    communities: [
      {
        name: 'Reddit Mental Health Communities',
        description: 'Peer support communities on various mental health topics',
        features: ['Peer support', 'Resource sharing', 'Anonymous participation'],
        note: 'Always verify information and seek professional help when needed'
      },
      {
        name: 'NAMI (National Alliance on Mental Illness)',
        description: 'Support groups and educational programs',
        features: ['Support groups', 'Educational programs', 'Advocacy'],
        website: 'nami.org'
      }
    ]
  }
};

// Get crisis resources
router.get('/crisis', (req, res) => {
  try {
    res.json({
      resources: mentalHealthResources.crisis,
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

// Get professional help resources
router.get('/professional', optionalAuth, (req, res) => {
  try {
    res.json({
      resources: mentalHealthResources.professional,
      additionalInfo: {
        insurance: 'Check with your insurance provider for covered mental health services',
        slidingScale: 'Many therapists offer sliding scale fees based on income',
        freeServices: 'Community mental health centers often provide free or low-cost services',
        confidentiality: 'Mental health professionals are bound by confidentiality laws'
      }
    });
  } catch (error) {
    console.error('Professional resources error:', error);
    res.status(500).json({
      error: 'Failed to retrieve professional resources',
      message: 'Unable to load professional resources. Please try again.'
    });
  }
});

// Get self-help resources
router.get('/self-help', optionalAuth, (req, res) => {
  try {
    res.json({
      resources: mentalHealthResources.selfHelp,
      disclaimer: 'These resources are for informational purposes only and do not replace professional mental health care.'
    });
  } catch (error) {
    console.error('Self-help resources error:', error);
    res.status(500).json({
      error: 'Failed to retrieve self-help resources',
      message: 'Unable to load self-help resources. Please try again.'
    });
  }
});

// Get support resources
router.get('/support', optionalAuth, (req, res) => {
  try {
    res.json({
      resources: mentalHealthResources.support,
      safety: 'Always prioritize your safety and seek professional help when needed'
    });
  } catch (error) {
    console.error('Support resources error:', error);
    res.status(500).json({
      error: 'Failed to retrieve support resources',
      message: 'Unable to load support resources. Please try again.'
    });
  }
});

// Get all resources
router.get('/all', optionalAuth, (req, res) => {
  try {
    res.json({
      resources: mentalHealthResources,
      lastUpdated: new Date(),
      disclaimer: 'This information is for educational purposes only and does not replace professional mental health care.'
    });
  } catch (error) {
    console.error('All resources error:', error);
    res.status(500).json({
      error: 'Failed to retrieve resources',
      message: 'Unable to load resources. Please try again.'
    });
  }
});

// Search resources
router.get('/search', optionalAuth, (req, res) => {
  try {
    const { q: query, category } = req.query;
    
    if (!query) {
      return res.status(400).json({
        error: 'Search query required',
        message: 'Please provide a search query'
      });
    }
    
    const searchResults = [];
    const searchQuery = query.toLowerCase();
    
    // Search through all resources
    Object.entries(mentalHealthResources).forEach(([categoryName, categoryData]) => {
      if (category && category !== categoryName) return;
      
      // Search hotlines
      if (categoryData.hotlines) {
        categoryData.hotlines.forEach(resource => {
          if (resource.name.toLowerCase().includes(searchQuery) ||
              resource.description.toLowerCase().includes(searchQuery)) {
            searchResults.push({
              ...resource,
              category: 'crisis',
              type: 'hotline'
            });
          }
        });
      }
      
      // Search professional types
      if (categoryData.types) {
        categoryData.types.forEach(resource => {
          if (resource.type.toLowerCase().includes(searchQuery) ||
              resource.description.toLowerCase().includes(searchQuery)) {
            searchResults.push({
              ...resource,
              category: 'professional',
              type: 'professional'
            });
          }
        });
      }
      
      // Search books
      if (categoryData.books) {
        categoryData.books.forEach(resource => {
          if (resource.title.toLowerCase().includes(searchQuery) ||
              resource.author.toLowerCase().includes(searchQuery) ||
              resource.description.toLowerCase().includes(searchQuery)) {
            searchResults.push({
              ...resource,
              category: 'selfHelp',
              type: 'book'
            });
          }
        });
      }
      
      // Search apps
      if (categoryData.apps) {
        categoryData.apps.forEach(resource => {
          if (resource.name.toLowerCase().includes(searchQuery) ||
              resource.description.toLowerCase().includes(searchQuery)) {
            searchResults.push({
              ...resource,
              category: 'selfHelp',
              type: 'app'
            });
          }
        });
      }
    });
    
    res.json({
      query,
      results: searchResults,
      total: searchResults.length,
      categories: Object.keys(mentalHealthResources)
    });
    
  } catch (error) {
    console.error('Resource search error:', error);
    res.status(500).json({
      error: 'Failed to search resources',
      message: 'Unable to search resources. Please try again.'
    });
  }
});

// Get resource by ID
router.get('/:resourceId', optionalAuth, (req, res) => {
  try {
    const { resourceId } = req.params;
    
    // This would typically fetch from a database
    // For now, we'll return a placeholder response
    res.json({
      message: 'Individual resource endpoint - to be implemented',
      resourceId,
      note: 'This endpoint would return detailed information about a specific resource'
    });
    
  } catch (error) {
    console.error('Individual resource error:', error);
    res.status(500).json({
      error: 'Failed to retrieve resource',
      message: 'Unable to load resource. Please try again.'
    });
  }
});

module.exports = router;
