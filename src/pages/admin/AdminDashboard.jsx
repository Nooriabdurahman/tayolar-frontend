import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp, Percent, CreditCard } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

const AdminDashboard = () => {
    const [commissionRate, setCommissionRate] = useState(10);
    const [totalCommissions, setTotalCommissions] = useState(0);
    const [statsData, setStatsData] = useState({
        totalUsers: 0,
        activeJobs: 0,
        totalEarnings: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch stats
                const statsRes = await axios.get(API_ENDPOINTS.ADMIN.COMMISSION_STATS, { headers });
                if (statsRes.data) {
                    setTotalCommissions(statsRes.data.totalCommission || 0);
                    setStatsData({
                        totalUsers: statsRes.data.totalUsers || 0,
                        activeJobs: statsRes.data.activeJobs || 0,
                        totalEarnings: statsRes.data.totalVolume || 0
                    });
                }

                // Fetch commission settings
                const settingsRes = await axios.get(API_ENDPOINTS.ADMIN.COMMISSION_SETTINGS, { headers });
                if (settingsRes.data) {
                    setCommissionRate(settingsRes.data.rate || 10);
                }

                // Fetch recent commissions/activity
                const activityRes = await axios.get(API_ENDPOINTS.ADMIN.COMMISSIONS, { headers });
                if (activityRes.data) {
                    setRecentActivity(activityRes.data.slice(0, 5));
                }

            } catch (error) {
                console.error('Error fetching admin dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        { label: 'Total Users', value: statsData.totalUsers.toLocaleString(), change: 'N/A', icon: Users, color: 'bg-blue-500' },
        { label: 'Active Jobs', value: statsData.activeJobs.toString(), change: 'N/A', icon: ShoppingBag, color: 'bg-green-500' },
        { label: 'Total Commissions', value: `$${totalCommissions.toFixed(2)}`, change: `Rate: ${commissionRate}%`, icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Market Volume', value: `$${statsData.totalEarnings.toFixed(2)}`, change: 'Total', icon: TrendingUp, color: 'bg-orange-500' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Commission Info */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Commission System</h3>
                        <p className="text-purple-100 text-sm mb-1">
                            Current Rate: <span className="font-bold">{commissionRate}%</span> (deducted automatically)
                        </p>
                        <p className="text-purple-100 text-sm">
                            Total Earned: <span className="font-bold">${totalCommissions.toFixed(2)}</span>
                        </p>
                    </div>
                    <div className="p-4 bg-white/20 rounded-xl backdrop-blur-md">
                        <CreditCard className="w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Recent Commissions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-medium text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Commission</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((item, i) => (
                                    <tr key={item.id || i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">#{item.orderId || 'ORD-' + (1000 + i)}</td>
                                        <td className="px-6 py-4">${item.amount?.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-green-600 font-bold">${item.commissionAmount?.toFixed(2)}</td>
                                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                Received
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No recent activity</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
