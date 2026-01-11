import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Save, Lock, DollarSign, Percent, Info } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminSettings = () => {
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvc: '',
    });
    const [commissionRate, setCommissionRate] = useState(10);

    const handleCardInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'cardNumber') {
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

    const handleSaveCard = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Payment card saved successfully!');
            // Store in localStorage for demo
            localStorage.setItem('adminCard', JSON.stringify(cardData));
        }, 1500);
    };

    const handleSaveCommission = () => {
        localStorage.setItem('adminCommissionRate', commissionRate.toString());
        toast.success(`Commission rate set to ${commissionRate}%`);
    };

    // Load saved data
    React.useEffect(() => {
        const savedCard = localStorage.getItem('adminCard');
        const savedRate = localStorage.getItem('adminCommissionRate');
        if (savedCard) setCardData(JSON.parse(savedCard));
        if (savedRate) setCommissionRate(parseFloat(savedRate));
    }, []);

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Settings</h1>
                <p className="text-slate-600">Manage payment card and commission settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Card Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Payment Card</h2>
                                <p className="text-indigo-100 text-sm">Money from commissions goes here</p>
                            </div>
                            <CreditCard className="w-12 h-12 text-white/80" />
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Card Visualization */}
                        <div className="mb-6 w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <div className="h-full flex flex-col justify-between relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-8 bg-yellow-500/80 rounded-md"></div>
                                    <Lock className="w-6 h-6 text-white/60" />
                                </div>
                                <div className="font-mono text-xl tracking-widest">
                                    {cardData.cardNumber || '•••• •••• •••• ••••'}
                                </div>
                                <div className="flex justify-between items-end font-mono text-sm">
                                    <div>
                                        <div className="text-xs opacity-70 mb-1">CARD HOLDER</div>
                                        <div className="uppercase">{cardData.cardHolder || 'YOUR NAME'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-70 mb-1">EXPIRES</div>
                                        <div>{cardData.expiry || 'MM/YY'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSaveCard} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={cardData.cardNumber}
                                    onChange={handleCardInputChange}
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Card Holder Name
                                </label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    value={cardData.cardHolder}
                                    onChange={handleCardInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardData.expiry}
                                        onChange={handleCardInputChange}
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={cardData.cvc}
                                        onChange={handleCardInputChange}
                                        placeholder="123"
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save Payment Card'}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Commission Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Commission Settings</h2>
                                <p className="text-green-100 text-sm">Set commission rate (deducted before work)</p>
                            </div>
                            <Percent className="w-12 h-12 text-white/80" />
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="mb-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Current Commission Rate</h3>
                                    <p className="text-sm text-slate-600">Commission is deducted before work completion</p>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Commission Rate (%)
                                    </label>
                                    <span className="text-3xl font-bold text-green-600">{commissionRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="30"
                                    step="0.5"
                                    value={commissionRate}
                                    onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>0%</span>
                                    <span>30%</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-semibold mb-1">How it works:</p>
                                        <ul className="list-disc list-inside space-y-1 text-blue-700">
                                            <li>Commission is deducted before work is completed</li>
                                            <li>Money goes to your payment card above</li>
                                            <li>Example: $100 job → ${(100 * commissionRate / 100).toFixed(2)} commission</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSaveCommission}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Save Commission Rate
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminSettings;

