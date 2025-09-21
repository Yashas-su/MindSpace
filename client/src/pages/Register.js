import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import encryptionService from './encryption.js';

const userSchema = new mongoose.Schema({
  encryptedEmail: String,

  password: {
    type: String,
    required: true,
    minlength: 8
  },

  anonymousId: { type: String, index: true, unique: true },

  preferences: {
    encrypted: String,
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
  },

  privacy: {
    dataRetention: { type: Number, default: 30 },
    shareAnalytics: { type: Boolean, default: false },
    allowCrisisContact: { type: Boolean, default: true }
  },

  status: { type: String, enum: ['active', 'suspended', 'deleted'], default: 'active' },

  lastActive: { type: Date, default: Date.now },
  dataExpiry: Date
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.password;
      delete ret.encryptedEmail;
      delete ret.__v;
      return ret;
    }
  }
});

// TTL index
userSchema.index({ dataExpiry: 1 }, { expireAfterSeconds: 0 });

// Hooks
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, rounds);
  }

  if (!this.dataExpiry) {
    const days = this.privacy?.dataRetention || 30;
    this.dataExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  this.lastActive = new Date();
  next();
});

// Methods
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.getDecryptedEmail = function () {
  if (!this.encryptedEmail) return null;
  return encryptionService.decrypt(JSON.parse(this.encryptedEmail));
};

const User = mongoose.model('User', userSchema);
export { User };
