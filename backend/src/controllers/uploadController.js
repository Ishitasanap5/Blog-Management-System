import cloudinary from '../config/cloudinary.js';

export const uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file buffer to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "blog_thumbnails" } // optional folder
    );

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url // Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
