import multer from "multer";

// Store uploaded files in memory (RAM) instead of disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
