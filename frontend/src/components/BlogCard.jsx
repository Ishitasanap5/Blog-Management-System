import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

const BlogCard = ({ blog, onDelete }) => {
    const { user } = useContext(AuthContext);
    if (!blog) return null;

    const isAuthor = user?.id === blog.author?._id;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
            {blog.thumbnail && (
                <img src={blog.thumbnail} className="h-48 w-full object-cover" alt="thumb" />
            )}
            <div className="p-5 flex-1">
                <span className="text-xs font-bold text-blue-500 uppercase">{blog.category || 'General'}</span>
                <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{blog.content}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">By {blog.author?.name || 'Unknown'}</span>
                    {isAuthor && (
                        <div className="flex gap-2">
                            <button onClick={() => onDelete(blog._id)} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default BlogCard;