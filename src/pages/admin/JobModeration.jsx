import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { API_ENDPOINTS } from '../../config/api';

const JobModeration = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_ENDPOINTS.ADMIN.JOBS, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs for moderation:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (jobId, action) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_ENDPOINTS.ADMIN.JOBS}/${jobId}/${action}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success(`Job ${action}ed successfully`);
            fetchJobs(); // Refresh list
        } catch (error) {
            console.error(`Error ${action}ing job:`, error);
            toast.error(`Failed to ${action} job`);
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            <h2 className="text-2xl font-bold text-slate-800">Job Moderation</h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.length > 0 ? (
                        jobs.map((job, i) => (
                            <div key={job.id || i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded flex items-center ${job.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            job.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                        {job.status || 'Pending Review'}
                                    </span>
                                </div>

                                <div className="flex items-start mb-4">
                                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mr-4 text-2xl">
                                        {job.category === 'Alteration' ? '✂️' : '🧥'}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                                        <p className="text-sm text-slate-500">Posted by {job.user?.name || 'User'} • {new Date(job.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <p className="text-slate-600 mb-6 line-clamp-2">
                                    {job.description}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAction(job.id, 'approve')}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(job.id, 'reject')}
                                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500">
                            No jobs pending moderation
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobModeration;
