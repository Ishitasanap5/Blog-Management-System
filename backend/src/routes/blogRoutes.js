import express from 'express';
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', getAllBlogs);
router.post('/create', protect, createBlog);
router.put('/update/:id', protect, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

export default router;