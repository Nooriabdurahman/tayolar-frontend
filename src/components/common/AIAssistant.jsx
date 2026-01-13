import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I am the Tayolar AI Assistant. Ask me anything about finding tailors or posting jobs!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(API_ENDPOINTS.AI.CHAT || 'https://tayolar-backend.onrender.com/api/ai/chat', { message: userMsg });
            setMessages(prev => [...prev, { role: 'bot', text: response.data.response }]);
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {isOpen ? (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            <h3 className="font-semibold">Tayolar Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 rounded p-1">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-slate-500 text-xs px-3 py-2 rounded-xl shadow-sm">
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-slate-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 hover:scale-110 transition-all"
                >
                    <MessageCircle size={28} />
                </button>
            )}
        </div>
    );
};

export default AIAssistant;
