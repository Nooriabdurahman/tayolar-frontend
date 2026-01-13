import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we are on the landing page for transparent styling
    const isLanding = location.pathname === '/';

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isLanding ? 'bg-transparent backdrop-blur-sm border-b border-white/10' : 'bg-white/90 backdrop-blur-md border-b border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group gap-2">
                            <div className={`p-2 rounded-lg ${isLanding ? 'bg-white/10 text-white' : 'bg-indigo-100 text-indigo-600'} group-hover:scale-110 transition-transform`}>
                                <Scissors className="h-6 w-6" />
                            </div>
                            <span className={`text-2xl font-bold ${isLanding ? 'text-white' : 'text-slate-900'}`}>TailorHub</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {/* Updated Links to Routes */}
                        <Link to="/features" className={`text-sm font-medium ${isLanding ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-indigo-600'} transition-colors`}>Features</Link>
                        <Link to="/how-it-works" className={`text-sm font-medium ${isLanding ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-indigo-600'} transition-colors`}>How it Works</Link>
                        <Link to="/testimonials" className={`text-sm font-medium ${isLanding ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-indigo-600'} transition-colors`}>Success Stories</Link>
                        <Link to="/pricing" className={`text-sm font-medium ${isLanding ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-indigo-600'} transition-colors`}>Pricing</Link>

                        {/* Marketplace Actions */}
                        <div className="flex space-x-4">
                            <Link to="/post-job" className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider ${isLanding ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'} transition-all`}>
                                Post Job
                            </Link>
                            <Link to="/create-service" className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider ${isLanding ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-yellow-400 text-black hover:bg-yellow-300'} transition-all shadow-lg shadow-yellow-400/20`}>
                                Create Service
                            </Link>
                        </div>

                        <div className={`h-6 w-px ${isLanding ? 'bg-white/20' : 'bg-slate-300'}`}></div>

                        {user ? (
                            <>
                                <Link to="/dashboard" className={`text-sm font-medium ${isLanding ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-indigo-600'} transition-colors flex items-center`}>
                                    <User className="w-4 h-4 mr-1" />
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className={`text-sm font-medium ${isLanding ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-red-600'} transition-colors flex items-center`}>
                                    <LogOut className="w-4 h-4 mr-1" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`text-sm font-semibold ${isLanding ? 'text-white hover:text-indigo-200' : 'text-slate-700 hover:text-indigo-600'}`}>
                                    Log in
                                </Link>
                                <Link to="/signup" className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${isLanding ? 'text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'} focus:outline-none`}
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <>
                    {/* Backdrop for mobile menu */}
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-2xl z-50 text-slate-900 transform transition-all duration-300 ease-in-out">
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {['Features', 'How it Works', 'Testimonials', 'Pricing'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                                    className="block px-4 py-3 rounded-xl text-lg font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                                <Link
                                    to="/post-job"
                                    className="px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-center text-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Post Job
                                </Link>
                                <Link
                                    to="/create-service"
                                    className="px-4 py-3 rounded-xl bg-yellow-400 text-black font-bold text-center text-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Service
                                </Link>
                            </div>
                            <div className="pt-4 space-y-2">
                                {user ? (
                                    <>
                                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-3 rounded-xl text-lg font-semibold text-slate-700 hover:bg-slate-50">
                                            <User className="w-5 h-5 mr-3" /> Dashboard
                                        </Link>
                                        <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center w-full px-4 py-3 rounded-xl text-lg font-semibold text-red-600 hover:bg-red-50">
                                            <LogOut className="w-5 h-5 mr-3" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-semibold text-slate-700 hover:bg-slate-50 text-center">
                                            Log in
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl bg-indigo-600 text-white font-bold text-center shadow-lg shadow-indigo-200">
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
