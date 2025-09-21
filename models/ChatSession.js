const mongoose = require('mongoose');
const encryptionService = require('../config/encryption');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  encryptedContent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative', 'crisis'] },
  messageType: { type: String, enum: ['general', 'crisis', 'wellness', 'resource_request'], default: 'general' }
});

const chatSessionSchema = new mongoose.Schema({
  userAnonymousId: { type: String, required: true, index: true },
  encryptedTitle: String,
  messages: [messageSchema],
  status: { type: String, enum: ['active', 'paused', 'ended', 'crisis_escalated'], default: 'active' },
  crisisDetected: { type: Boolean, default: false },
  crisisLevel: { type: String, enum: ['low', 'medium', 'high', 'immediate'] },
  analytics: {
    totalMessages: { type: Number, default: 0 },
    sessionDuration: { type: Number, default: 0 },
    topicsDiscussed: [{ type: String, enum: ['anxiety', 'depression', 'stress', 'relationships', 'school', 'family', 'identity', 'other'] }],
    wellnessScore: { type: Number, min: 1, max: 10 }
  },
  privacy: {
    autoDelete: { type: Boolean, default: true },
    retentionDays: { type: Number, default: 7 }
  },
  startedAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now },
  endedAt: Date,
  expiresAt: Date
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.encryptedTitle;
      delete ret.__v;
      return ret;
    }
  }
});

// TTL index
chatSessionSchema.index({ userAnonymousId: 1, startedAt: -1 });
chatSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
chatSessionSchema.index({ crisisDetected: 1, crisisLevel: 1 });

// Pre-save
chatSessionSchema.pre('save', function(next) {
  this.analytics.totalMessages = this.messages.length;
  if (this.messages.length) {
    this.lastMessageAt = this.messages[this.messages.length - 1].timestamp;
  }
  if (this.endedAt) {
    this.analytics.sessionDuration = Math.round((this.endedAt - this.startedAt) / 60000);
  }
  if (!this.expiresAt) {
    const days = (this.privacy && this.privacy.retentionDays) || 7;
    this.expiresAt = new Date(Date.now() + days * 86400000);
  }
  next();
});

// Instance methods
chatSessionSchema.methods.addMessage = function(role, content, messageType = 'general') {
  const encryptedContent = JSON.stringify(encryptionService.encrypt(content));
  this.messages.push({ role, encryptedContent, messageType, timestamp: new Date() });
  return this.save();
};

chatSessionSchema.methods.getDecryptedMessages = function() {
  return this.messages.map(msg => {
    try {
      const decrypted = encryptionService.decrypt(JSON.parse(msg.encryptedContent));
      return { ...msg.toObject(), content: decrypted, encryptedContent: undefined };
    } catch (err) {
      console.error(`Error decrypting message ${msg._id}:`, err);
      return { ...msg.toObject(), content: '[Could not decrypt]', encryptedContent: undefined };
    }
  });
};

chatSessionSchema.methods.setCrisisLevel = function(level) {
  this.crisisDetected = true;
  this.crisisLevel = level;
  if (level === 'immediate') this.status = 'crisis_escalated';
  return this.save();
};

chatSessionSchema.methods.endSession = function() {
  this.status = 'ended';
  this.endedAt = new Date();
  return this.save();
};

// Static methods
chatSessionSchema.statics.findByUser = function(userAnonymousId, limit = 10) {
  return this.find({ userAnonymousId }).sort({ startedAt: -1 }).limit(limit);
};

chatSessionSchema.statics.findCrisisSessions = function() {
  return this.find({ crisisDetected: true, status: { $ne: 'crisis_escalated' } })
             .sort({ lastMessageAt: -1 });
};

chatSessionSchema.statics.cleanupExpiredSessions = async function() {
  const result = await this.deleteMany({ expiresAt: { $lt: new Date() } });
  console.log(`Cleaned up ${result.deletedCount} expired chat sessions`);
  return result;
};

module.exports = mongoose.model('ChatSession', chatSessionSchema);
