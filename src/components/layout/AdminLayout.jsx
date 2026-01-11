import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Shield } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    // Simple mock auth check
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('adminAuth') === 'true');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Jobs', path: '/admin/jobs', icon: MessageSquare },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials as requested
        if (loginData.email === 'admin@gmail.com' && loginData.password === 'admin') {
            setIsAdmin(true);
            localStorage.setItem('adminAuth', 'true');
            setError('');
        } else {
            setError('Invalid Admin Credentials');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem('adminAuth');
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                    <div className="text-center mb-8">
                        <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
                        <p className="text-slate-500">Please verify your credentials</p>
                    </div>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="••••••••"
                            />
                        </div>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-colors">
                            Access Panel
                        </button>
                    </form>
                    <div className="mt-6 text-center text-xs text-slate-400">
                        Restricted Area • Authorized Personnel Only
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 flex items-center border-b border-slate-800">
                    <Shield className="h-8 w-8 text-indigo-500 mr-2" />
                    <span className="text-xl font-bold">AdminPanel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {navItems.find(i => isActive(i.path))?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            A
                        </div>
                        <span className="ml-2 text-sm font-medium text-slate-700">Administrator</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
