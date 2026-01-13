import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, Image as ImageIcon, Send } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { LikeButton, ShareButton, FollowButton } from '../components/common/SocialButtons';
import Tailor3DScene from '../components/landing/Tailor3DScene';
import toast from 'react-hot-toast';

const FeedPage = () => {
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchFeed();
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const fetchFeed = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(API_ENDPOINTS.SOCIAL.FEED, { headers });
            setFeedItems(response.data);
        } catch (error) {
            console.error('Error fetching feed:', error);
            // toast.error('Failed to load feed');
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to post');
                return;
            }

            const response = await axios.post(
                API_ENDPOINTS.SOCIAL.POST,
                { content: newPostContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setFeedItems([response.data, ...feedItems]);
            setNewPostContent('');
            toast.success('Posted successfully');
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-2xl mx-auto px-4">

                {/* Create Post Widget */}
                {user && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6"
                    >
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <User className="text-indigo-600" size={20} />
                            </div>
                            <div className="flex-1">
                                <form onSubmit={handleCreatePost}>
                                    <textarea
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder="What's happening in the world of fashion?"
                                        className="w-full bg-slate-50 border-none rounded-lg p-3 focus:ring-2 focus:ring-indigo-200 resize-none"
                                        rows="3"
                                    />
                                    <div className="flex justify-between items-center mt-3">
                                        <button type="button" className="text-slate-400 hover:text-indigo-600">
                                            <ImageIcon size={20} />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!newPostContent.trim()}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <Send size={16} /> Post
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Feed Items */}
                <div className="space-y-6">
                    {feedItems.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {item.author?.name?.[0] || item.client?.name?.[0] || item.tailor?.name?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-slate-900">
                                                {item.author?.name || item.client?.name || item.tailor?.name || 'Unknown User'}
                                            </h3>
                                            {item.type !== 'POST' && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === 'JOB' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                {user && user.id !== (item.author?.id || item.client?.id || item.tailor?.id) && (
                                    <FollowButton targetUserId={item.author?.id || item.client?.id || item.tailor?.id} />
                                )}
                            </div>

                            {/* Content */}
                            <div className="px-4 pb-2">
                                <p className="text-slate-800 whitespace-pre-wrap">{item.content || item.title}</p>
                            </div>

                            {/* Image Attachment */}
                            {item.imageUrl && (
                                <div className="mt-3">
                                    <img src={item.imageUrl} alt="Post content" className="w-full h-64 object-cover" />
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-slate-100 flex items-center justify-between mt-2">
                                <div className="flex items-center gap-6">
                                    <LikeButton
                                        entityId={item.id}
                                        entityType={item.type || 'POST'}
                                        initialCount={item.likes?.length || 0}
                                    // initialLiked={item.likes?.some(l => l.userId === user?.id)} 
                                    />
                                    <button className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
                                        <MessageSquare size={20} />
                                        <span className="text-sm font-medium">Comment</span>
                                    </button>
                                </div>
                                <ShareButton
                                    title={item.title || "Check this out"}
                                    text={item.content}
                                    url={`${window.location.origin}/post/${item.id}`}
                                />
                            </div>
                        </motion.div>
                    ))}

                    {feedItems.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            <p>No posts yet. Be the first to share something!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedPage;
