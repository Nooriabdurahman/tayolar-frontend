import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'number') {
            value = value.replace(/\D/g, '').substring(0, 16);
            value = value.match(/.{1,4}/g)?.join(' ') || value;
        } else if (name === 'expiry') {
            value = value.replace(/\D/g, '').substring(0, 4);
            if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2);
        } else if (name === 'cvc') {
            value = value.replace(/\D/g, '').substring(0, 3);
        }
        setCardData({ ...cardData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <CheckCircle className="h-10 w-10 text-green-500" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">Payment Successful!</p>
                                <p className="mt-1 text-sm text-gray-500">Welcome to Premium. Redirecting...</p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
            setTimeout(() => navigate('/dashboard'), 2000);
        }, 2000);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
            </div>
            <Toaster position="top-center" />
            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 h-fit"
                >
                    <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
                        <div className="flex items-center">
                            <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                                <Star className="h-6 w-6 text-white fill-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Premium Plan</h3>
                                <p className="text-sm text-white/70">Monthly subscription</p>
                            </div>
                        </div>
                        <span className="font-bold text-lg text-yellow-400">$19.00</span>
                    </div>
                    <div className="flex justify-between items-center text-white/80 mb-2">
                        <span>Subtotal</span>
                        <span>$19.00</span>
                    </div>
                    <div className="flex justify-between items-center text-white/80 mb-6">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-white pt-4 border-t border-white/20">
                        <span>Total</span>
                        <span className="text-2xl text-yellow-400">$19.00</span>
                    </div>
                </motion.div>

                {/* Payment Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
                        Payment Details <Lock className="ml-2 h-5 w-5 text-white/70" />
                    </h2>

                    {/* Card Visualization */}
                    <div className="mb-8 w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                        <div className="h-full flex flex-col justify-between relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-8 bg-yellow-500/80 rounded-md"></div>
                                <span className="font-mono text-lg tracking-widest">CREDIT</span>
                            </div>
                            <div className="font-mono text-2xl tracking-widest my-4">
                                {cardData.number || '•••• •••• •••• ••••'}
                            </div>
                            <div className="flex justify-between items-end font-mono">
                                <div>
                                    <div className="text-xs opacity-70 mb-1">CARD HOLDER</div>
                                    <div className="uppercase tracking-wider">{cardData.name || 'YOUR NAME'}</div>
                                </div>
                                <div>
                                    <div className="text-xs opacity-70 mb-1">EXPIRES</div>
                                    <div>{cardData.expiry || 'MM/YY'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-1">Card Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                <input
                                    type="text"
                                    name="number"
                                    value={cardData.number}
                                    onChange={handleInputChange}
                                    placeholder="0000 0000 0000 0000"
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-1">Card Holder Name</label>
                            <input
                                type="text"
                                name="name"
                                value={cardData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="block w-full px-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-1">Expiry Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardData.expiry}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-1">CVC</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={cardData.cvc}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Pay $19.00'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

// Start Icon Component (Fixed Import Issue)
const Star = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export default CheckoutPage;
