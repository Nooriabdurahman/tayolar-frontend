import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

const JobModeration = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Job Moderation</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded flex items-center">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Pending Review
                            </span>
                        </div>

                        <div className="flex items-start mb-4">
                            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mr-4">
                                🧥
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Custom Suit Design #{1200 + i}</h3>
                                <p className="text-sm text-slate-500">Posted by John Doe • 2 hours ago</p>
                            </div>
                        </div>

                        <p className="text-slate-600 mb-6 line-clamp-2">
                            I need a custom 3-piece suit for a wedding. Materials should be provided by the tailor.
                            Budget is flexible but looking for high quality Italian wool.
                        </p>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                                <Check className="w-4 h-4 mr-2" />
                                Approve
                            </button>
                            <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                                <X className="w-4 h-4 mr-2" />
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobModeration;
