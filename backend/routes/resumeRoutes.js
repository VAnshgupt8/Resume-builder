const express = require('express');
const router = express.Router();

const protect = require('../Middleware/authMiddleware');

const {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');

router.post('/', protect, createResume);
router.get('/', protect, getResumes);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);

module.exports = router;