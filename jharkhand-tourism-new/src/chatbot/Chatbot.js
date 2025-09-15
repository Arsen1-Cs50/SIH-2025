// src/chatbot/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import ChatbotService from './ChatbotService';

// Language Switcher Component (improved accessibility and labels)
const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', emoji: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', emoji: '🇮🇳' }
  ];

  const current = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative mr-2">
      <button 
        className="bg-transparent border-2 border-green-600 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-base transition-all hover:bg-green-600 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={currentLanguage === 'hi' ? 'भाषा बदलें' : 'Change language'}
        title={currentLanguage === 'hi' ? 'भाषा बदलें' : 'Change language'}
      >
        <span aria-hidden="true">{current?.emoji || '🌐'}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px] mt-1" role="listbox" aria-label={currentLanguage === 'hi' ? 'भाषा चयनकर्ता' : 'Language selector'}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`flex items-center gap-2 px-3 py-2 w-full text-left transition-colors text-xs ${currentLanguage === language.code ? 'bg-green-50 text-green-800' : 'text-black hover:bg-gray-100'}`}
              role="option"
              aria-selected={currentLanguage === language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
            >
              <span className="text-sm" aria-hidden="true">{language.emoji}</span>
              <span className="font-medium">{language.nativeName} ({language.name})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  // Predefined quick options
  const quickOptions = {
    en: [
      "Best places to visit in Jharkhand?",
      "Eco-tourism destinations",
      "Cultural festivals",
      "Adventure activities",
      "Plan my itinerary",
      "Accommodation options"
    ],
    hi: [
      "झारखंड में घूमने की सबसे अच्छी जगहें?",
      "ईको-टूरिज्म स्थल",
      "सांस्कृतिक त्योहार",
      "साहसिक गतिविधियाँ",
      "मेरी यात्रा योजना बनाएं",
      "आवास विकल्प"
    ]
  };

  // On mount: load saved language preference only
  useEffect(() => {
    const savedLanguage = localStorage.getItem('chatbot_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Removed loading chat history to keep conversation in-memory only

  const handleSendMessage = async (message = null) => {
    const finalMessage = message || inputMessage.trim();
    if (!finalMessage) return;

    // Add user message to chat
    const userMessage = { 
      type: 'user', 
      text: finalMessage, 
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowOptions(false);

    try {
      // Send to service
      const response = await ChatbotService.sendMessage(finalMessage);
      
      // Add bot response to chat
      const botMessage = { 
        type: 'bot', 
        text: response.response, 
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update language if changed by the service
      if (response.language && response.language !== currentLanguage) {
        setCurrentLanguage(response.language);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        type: 'bot', 
        text: currentLanguage === 'hi' 
          ? "क्षमा करें, मैं अभी उत्तर देने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।" 
          : "Sorry, I'm having trouble responding. Please try again later.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickOptionClick = (option) => {
    handleSendMessage(option);
  };

  const handleLanguageChange = async (languageCode) => {
    try {
      const result = ChatbotService.setLanguage(languageCode);
      if (result.success) {
        setCurrentLanguage(languageCode);
        localStorage.setItem('chatbot_language', languageCode);
        // Add language change confirmation message
        const confirmationMessage = {
          type: 'bot',
          text: languageCode === 'hi' 
            ? "भाषा हिंदी में बदल दी गई है! 🌐" 
            : "Language changed to English! 🌐",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, confirmationMessage]);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowOptions(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      if (timestamp instanceof Date) {
        return timestamp.toLocaleTimeString();
      } else if (typeof timestamp === 'string') {
        return new Date(timestamp).toLocaleTimeString();
      }
      return new Date().toLocaleTimeString();
    } catch (error) {
      return new Date().toLocaleTimeString();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] font-sans">
      {!isOpen && (
        <button aria-label={currentLanguage === 'hi' ? 'चैटबॉट खोलें' : 'Open chatbot'} className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 px-5 py-3 rounded-full cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center gap-2 font-semibold transition-all text-sm hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] animate-bounce-slow" onClick={toggleChat}>
          <span>💬</span>
          {currentLanguage === 'hi' ? 'यात्रा सहायक' : 'Travel Assistant'}
        </button>
      )}
      {isOpen && (
        <div className="w-[92vw] max-w-[380px] h-[62vh] max-h-[560px] bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all">
          <div className="bg-gradient-to-br from-green-600 to-green-800/95 text-white p-4 flex items-center justify-between shrink-0 shadow-[inset_0_-6px_20px_rgba(0,0,0,0.15)]">
            <h3 className="m-0 text-base font-semibold">{currentLanguage === 'hi' ? 'झारखंड पर्यटन सहायक' : 'Jharkhand Tourism Assistant'}</h3>
            <div className="flex items-center gap-1">
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
              <button aria-label={currentLanguage === 'hi' ? 'चैट बंद करें' : 'Close chat'} className="bg-white/10 border-0 text-white text-xl cursor-pointer p-0 w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60" onClick={toggleChat}>×</button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100/70 flex flex-col gap-3 scroll-smooth">
            {messages.length === 0 && (
              <div className="text-center p-5 bg-white/90 backdrop-blur rounded-xl mb-2 shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/5 leading-relaxed">
                <p className="m-2 text-slate-600 text-sm">{currentLanguage === 'hi' ? 'नमस्ते! 👋 मैं आपका झारखंड ट्रैवल असिस्टेंट हूं।' : 'Namaste! 👋 I\'m your Jharkhand travel assistant.'}</p>
                <p className="m-2 text-slate-600 text-sm">{currentLanguage === 'hi' ? 'आज मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूं?' : 'How can I help you plan your trip today?'}</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col animate-[fadeIn_0.3s_ease] ${msg.type === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                <div className={`flex items-end gap-2 max-w-[90%] ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type !== 'user' && (
                    <div className="shrink-0 w-7 h-7 rounded-full bg-white ring-1 ring-black/5 shadow-sm grid place-items-center">🤖</div>
                  )}
                  <div className={`px-4 py-3 rounded-2xl break-words leading-snug text-sm ${msg.type === 'user' ? 'bg-gradient-to-br from-green-600 to-green-700 text-white rounded-br-md shadow-[0_6px_16px_rgba(22,163,74,0.3)]' : 'bg-white/95 text-slate-800 rounded-bl-md shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5'}`}>
                    {msg.text}
                  </div>
                  {msg.type === 'user' && (
                    <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white grid place-items-center shadow">🧑</div>
                  )}
                </div>
                <span className={`text-[11px] text-gray-500 mt-1 px-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="self-start">
                <div className="px-4 py-3 rounded-2xl bg-white/95 rounded-bl-md w-fit shadow ring-1 ring-black/5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:200ms]"></span>
                    <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:400ms]"></span>
                  </div>
                </div>
              </div>
            )}
            {showOptions && messages.length === 0 && (
              <div className="mt-2 bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
                <p className="m-0 mb-2 text-xs text-slate-600 font-medium">{currentLanguage === 'hi' ? 'त्वरित प्रश्न:' : 'Quick questions:'}</p>
                {quickOptions[currentLanguage].map((option, index) => (
                  <button
                    key={index}
                    className="bg-white text-slate-700 rounded-2xl px-3 py-2 m-1 text-xs cursor-pointer transition-all truncate max-w-full ring-1 ring-black/5 hover:bg-green-600 hover:text-white hover:ring-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    onClick={() => handleQuickOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200/80 bg-white/90 backdrop-blur flex gap-2 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentLanguage === 'hi' ? 'झारखंड पर्यटन के बारे में पूछें...' : 'Ask about Jharkhand tourism...'}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full outline-none text-sm bg-white text-slate-800 transition-[border-color,box-shadow] focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.15)] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button 
              onClick={() => handleSendMessage()} 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-green-600 text-white border-0 px-5 py-3 rounded-full cursor-pointer font-medium text-sm min-w-[60px] transition-all enabled:hover:bg-green-700 enabled:hover:-translate-y-0.5 enabled:shadow-[0_10px_20px_rgba(22,163,74,0.25)] disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500/60"
            >
              {currentLanguage === 'hi' ? 'भेजें' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;