const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    fullName: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    summary: String,

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],

    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],

    skills: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);