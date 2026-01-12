import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Save, Lock, DollarSign, Percent, Info, Upload, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

const AdminSettings = () => {
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvc: '',
    });
    const [cardImage, setCardImage] = useState(null);
    const [cardImagePreview, setCardImagePreview] = useState(null);
    const [existingCard, setExistingCard] = useState(null);
    const [commissionRate, setCommissionRate] = useState(10);
    const [commissionLoading, setCommissionLoading] = useState(false);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                // Don't set Content-Type for FormData - browser will set it with boundary
            },
        };
    };

    const getJsonHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    };

    // Load existing card and commission settings
    useEffect(() => {
        loadActiveCard();
        loadCommissionSettings();
    }, []);

    const loadActiveCard = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.ADMIN.CARDS_ACTIVE, getJsonHeaders());
            if (response.data) {
                setExistingCard(response.data);
                setCardData({
                    cardNumber: response.data.cardNumber || '',
                    cardHolder: response.data.cardHolder || '',
                    expiry: response.data.expiry || '',
                    cvc: response.data.cvc || '',
                });
                setCardImagePreview(response.data.imageUrl || null);
            }
        } catch (error) {
            console.error('Error loading card:', error);
            // Card might not exist yet, that's okay
        }
    };

    const loadCommissionSettings = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.ADMIN.COMMISSION_SETTINGS, getJsonHeaders());
            if (response.data) {
                setCommissionRate(response.data.rate || 10);
            }
        } catch (error) {
            console.error('Error loading commission settings:', error);
        }
    };

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCardImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCardImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteCard = async () => {
        if (!existingCard || !window.confirm('Are you sure you want to delete this payment card?')) return;

        setCardLoading(true);
        try {
            await axios.delete(`${API_ENDPOINTS.ADMIN.CARDS}/${existingCard.id}`, getJsonHeaders());
            setExistingCard(null);
            setCardData({ cardNumber: '', cardHolder: '', expiry: '', cvc: '' });
            setCardImagePreview(null);
            toast.success('Card deleted successfully');
        } catch (error) {
            console.error('Error deleting card:', error);
            toast.error('Failed to delete card');
        } finally {
            setCardLoading(false);
        }
    };

    const handleSaveCard = async (e) => {
        e.preventDefault();
        setCardLoading(true);

        try {
            const formData = new FormData();
            formData.append('cardNumber', cardData.cardNumber.replace(/\s/g, ''));
            formData.append('cardHolder', cardData.cardHolder);
            formData.append('expiry', cardData.expiry);
            formData.append('cvc', cardData.cvc);
            if (cardImage) {
                formData.append('image', cardImage);
            }

            let response;
            if (existingCard) {
                // Update existing card
                response = await axios.put(
                    `${API_ENDPOINTS.ADMIN.CARDS}/${existingCard.id}`,
                    formData,
                    getAuthHeaders()
                );
            } else {
                // Create new card
                response = await axios.post(
                    API_ENDPOINTS.ADMIN.CARDS,
                    formData,
                    getAuthHeaders()
                );
            }

            setExistingCard(response.data);
            toast.success('Payment card saved successfully!');
            setCardImage(null); // Clear the file input
        } catch (error) {
            console.error('Error saving card:', error);
            toast.error(error.response?.data?.message || 'Failed to save card');
        } finally {
            setCardLoading(false);
        }
    };

    const handleSaveCommission = async () => {
        setCommissionLoading(true);

        try {
            const response = await axios.put(
                API_ENDPOINTS.ADMIN.COMMISSION_SETTINGS,
                { rate: commissionRate },
                getJsonHeaders()
            );
            toast.success(`Commission rate set to ${commissionRate}%`);
        } catch (error) {
            console.error('Error saving commission:', error);
            toast.error(error.response?.data?.message || 'Failed to save commission rate');
        } finally {
            setCommissionLoading(false);
        }
    };

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
                            {cardImagePreview && (
                                <img
                                    src={cardImagePreview}
                                    alt="Card"
                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                />
                            )}
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
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Card Image (Optional)
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <div className="w-full px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2 text-slate-600">
                                            <Upload className="w-5 h-5" />
                                            {cardImage ? 'Change Image' : 'Upload Image'}
                                        </div>
                                    </label>
                                    {cardImagePreview && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCardImage(null);
                                                setCardImagePreview(existingCard?.imageUrl || null);
                                            }}
                                            className="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

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

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    disabled={cardLoading}
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    <Save className="w-5 h-5" />
                                    {cardLoading ? 'Saving...' : existingCard ? 'Update Card' : 'Save Card'}
                                </button>
                                {existingCard && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteCard}
                                        disabled={cardLoading}
                                        className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        <X className="w-5 h-5" />
                                        Delete
                                    </button>
                                )}
                            </div>
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
                            disabled={commissionLoading}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            <Save className="w-5 h-5" />
                            {commissionLoading ? 'Saving...' : 'Save Commission Rate'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminSettings;
