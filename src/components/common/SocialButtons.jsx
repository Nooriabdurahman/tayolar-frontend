import React, { useState } from 'react';
import { Heart, Share2, UserPlus, UserCheck } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import toast from 'react-hot-toast';

export const LikeButton = ({ entityId, entityType, initialLiked, initialCount, size = 20 }) => {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialCount || 0);
    const [loading, setLoading] = useState(false);

    const handleLike = async (e) => {
        e.preventDefault(); // Prevent parent click (e.g., if card is a link)
        e.stopPropagation();

        if (loading) return;
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to like');
                return;
            }

            const response = await axios.post(
                `${API_ENDPOINTS.SOCIAL.LIKE}`,
                { entityId, entityType },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setLiked(response.data.liked);
            setLikeCount(prev => response.data.liked ? prev + 1 : prev - 1);
        } catch (error) {
            console.error('Error liking:', error);
            toast.error('Failed to like');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
        >
            <Heart size={size} fill={liked ? "currentColor" : "none"} />
            <span className="text-sm font-medium">{likeCount}</span>
        </button>
    );
};

export const ShareButton = ({ title, text, url }) => {
    const handleShare = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || 'Tayolar',
                    text: text || 'Check this out on Tayolar!',
                    url: url || window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url || window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    return (
        <button onClick={handleShare} className="text-slate-500 hover:text-indigo-600 transition-colors">
            <Share2 size={20} />
        </button>
    );
};

export const FollowButton = ({ targetUserId, initialFollowing }) => {
    const [following, setFollowing] = useState(initialFollowing);
    const [loading, setLoading] = useState(false);

    const handleFollow = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (loading) return;
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to follow');
                return;
            }

            const response = await axios.post(
                `${API_ENDPOINTS.SOCIAL.FOLLOW}`,
                { targetUserId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setFollowing(response.data.following);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error following:', error);
            toast.error(error.response?.data?.message || 'Failed to follow');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleFollow}
            disabled={loading}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${following
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
        >
            {following ? (
                <>
                    <UserCheck size={14} /> Following
                </>
            ) : (
                <>
                    <UserPlus size={14} /> Follow
                </>
            )}
        </button>
    );
};
