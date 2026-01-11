import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp, Percent, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
    const [commissionRate, setCommissionRate] = useState(10);
    const [totalCommissions, setTotalCommissions] = useState(0);

    useEffect(() => {
        // Load saved commission rate
        const savedRate = localStorage.getItem('adminCommissionRate');
        if (savedRate) setCommissionRate(parseFloat(savedRate));
        
        // Load total commissions (from localStorage for demo)
        const savedCommissions = localStorage.getItem('adminTotalCommissions') || '0';
        setTotalCommissions(parseFloat(savedCommissions));
    }, []);

    const stats = [
        { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-500' },
        { label: 'Active Jobs', value: '56', change: '+5%', icon: ShoppingBag, color: 'bg-green-500' },
        { label: 'Total Commissions', value: `$${totalCommissions.toFixed(2)}`, change: `Rate: ${commissionRate}%`, icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Commission Rate', value: `${commissionRate}%`, change: 'Before work done', icon: Percent, color: 'bg-orange-500' },
    ];

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
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-600 font-medium">{stat.change}</span>
                            <span className="text-slate-400 ml-2">vs last month</span>
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
                            Current Rate: <span className="font-bold">{commissionRate}%</span> (deducted before work completion)
                        </p>
                        <p className="text-purple-100 text-sm">
                            Total Earned: <span className="font-bold">${totalCommissions.toFixed(2)}</span>
                        </p>
                    </div>
                    <div className="p-4 bg-white/20 rounded-xl backdrop-blur-md">
                        <CreditCard className="w-8 h-8" />
                    </div>
                </div>
                <p className="text-purple-200 text-xs mt-4">
                    💡 Money from commissions goes to your payment card (configure in Settings)
                </p>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-medium text-slate-500">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">User #{1000 + i}</td>
                                    <td className="px-6 py-4">Posted a new job requirement</td>
                                    <td className="px-6 py-4">2 hours ago</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
