import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [String],
    category: {
        type: String,
        default: "General"
    }
}, { 
    timestamps: true 
});


const Blog = mongoose.model("Blog", blogSchema);
export default Blog;