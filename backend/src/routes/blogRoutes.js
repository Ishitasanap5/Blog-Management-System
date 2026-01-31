import express from 'express';
import { uploadThumbnail } from '../controllers/uploadController.js';
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '../controllers/blogController.js';
import upload from '../config/multer.js'; // <- memory storage
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', getAllBlogs);
router.post('/create', protect, createBlog);
router.put('/update/:id', protect, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

// Use memory upload + Cloudinary
router.post('/upload', protect, upload.single('image'), uploadThumbnail);

export default router;
