import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, CheckCircle, Wallet, Smartphone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });

    const paymentMethods = [
        { id: 'card', name: 'Credit Card', icon: CreditCard, color: 'bg-indigo-600' },
        { id: 'paypal', name: 'PayPal', icon: Globe, color: 'bg-blue-600' },
        { id: 'binance', name: 'Binance Pay', icon: Wallet, color: 'bg-yellow-500' },
        { id: 'wallet', name: 'Google/Apple', icon: Smartphone, color: 'bg-black' },
    ];

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
            <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Order Summary (Left Column) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 h-fit"
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
                    <div className="space-y-3">
                        <div className="flex justify-between text-white/80 text-sm">
                            <span>Subtotal</span>
                            <span>$19.00</span>
                        </div>
                        <div className="flex justify-between text-white/80 text-sm">
                            <span>Tax</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between text-white/80 text-sm">
                            <span>Discount</span>
                            <span className="text-green-400">-$0.00</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xl font-bold text-white pt-6 mt-6 border-t border-white/20">
                        <span>Total Due</span>
                        <span className="text-3xl text-yellow-400">$19.00</span>
                    </div>

                    <div className="mt-8 p-4 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                        <p className="text-indigo-200 text-xs text-center">
                            Secure 256-bit SSL encrypted payment.
                            100% money-back guarantee for 30 days.
                        </p>
                    </div>
                </motion.div>

                {/* Payment Method Selection & Form (Right Column - Wider) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Method Selector */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 group ${paymentMethod === method.id
                                        ? 'bg-white/20 border-yellow-400 shadow-lg shadow-yellow-400/10 scale-105'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className={`p-2 rounded-full ${method.color} text-white shadow-lg`}>
                                    <method.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-sm font-semibold ${paymentMethod === method.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                    {method.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Content Area */}
                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {paymentMethod === 'card' && (
                                <motion.div
                                    key="card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h3 className="text-xl font-bold text-white mb-6">Credit or Debit Card</h3>

                                    {/* Card Visual */}
                                    <div className="mb-8 w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-2xl relative overflow-hidden border border-white/10">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                        <div className="h-full flex flex-col justify-between relative z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md shadow-sm"></div>
                                                <span className="font-mono text-lg tracking-widest text-white/50">PREMIUM</span>
                                            </div>
                                            <div className="font-mono text-xl sm:text-2xl tracking-widest my-4 text-shadow">
                                                {cardData.number || '•••• •••• •••• ••••'}
                                            </div>
                                            <div className="flex justify-between items-end font-mono">
                                                <div>
                                                    <div className="text-[10px] opacity-70 mb-1">CARD HOLDER</div>
                                                    <div className="uppercase tracking-wider text-sm truncate max-w-[120px]">{cardData.name || 'YOUR NAME'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] opacity-70 mb-1">EXPIRES</div>
                                                    <div className="text-sm">{cardData.expiry || 'MM/YY'}</div>
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
                                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-white/90 mb-1">Expiry</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={cardData.expiry}
                                                        onChange={handleInputChange}
                                                        placeholder="MM/YY"
                                                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 outline-none"
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
                                                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        >
                                            {loading ? 'Processing...' : 'Pay $19.00'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {paymentMethod === 'paypal' && (
                                <motion.div
                                    key="paypal"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
                                        <Globe className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Pay with PayPal</h3>
                                    <p className="text-white/60 mb-8 max-w-sm mx-auto">
                                        You will be redirected to PayPal to complete your purchase securely.
                                    </p>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                                    >
                                        <span className="italic font-serif font-black mr-2">P</span>
                                        Proceed to PayPal
                                    </button>
                                </motion.div>
                            )}

                            {paymentMethod === 'binance' && (
                                <motion.div
                                    key="binance"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-[#FCD535] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-500/30">
                                        <span className="text-3xl font-bold text-black">₿</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Binance Pay</h3>
                                    <p className="text-white/60 mb-6">Scan QR to pay with USDT, BTC, or ETH.</p>

                                    <div className="bg-white p-4 rounded-xl w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                                        {/* Mock QR Code */}
                                        <div className="w-full h-full bg-slate-900 pattern-isometric pattern-opacity-100 pattern-size-4"></div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-[#FCD535] hover:bg-[#eebb00] text-black py-4 rounded-xl font-bold text-lg transition-all shadow-lg transform hover:-translate-y-1"
                                    >
                                        I have sent the payment
                                    </button>
                                </motion.div>
                            )}

                            {paymentMethod === 'wallet' && (
                                <motion.div
                                    key="wallet"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8 space-y-4"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-6">Digital Wallets</h3>

                                    <button onClick={handleSubmit} className="w-full bg-black hover:bg-zinc-800 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center border border-white/20">
                                        <div className="flex items-center">
                                            <span className="mr-2"></span> Pay
                                        </div>
                                    </button>

                                    <button onClick={handleSubmit} className="w-full bg-white hover:bg-slate-100 text-black py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center">
                                        <div className="flex items-center">
                                            <span className="text-blue-500 font-bold mr-1">G</span>
                                            <span className="text-red-500 font-bold mr-1">o</span>
                                            <span className="text-yellow-500 font-bold mr-1">o</span>
                                            <span className="text-blue-500 font-bold mr-1">g</span>
                                            <span className="text-green-500 font-bold mr-1">l</span>
                                            <span className="text-red-500 font-bold mr-2">e</span>
                                            Pay
                                        </div>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Simple Star Icon Component
const Star = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export default CheckoutPage;
