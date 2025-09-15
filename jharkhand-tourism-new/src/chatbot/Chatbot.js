// src/chatbot/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import ChatbotService from './ChatbotService';
import './Chatbot.css';

// Language Switcher Component (improved accessibility and labels)
const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', emoji: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', emoji: '🇮🇳' }
  ];

  const current = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="language-switcher">
      <button 
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={currentLanguage === 'hi' ? 'भाषा बदलें' : 'Change language'}
        title={currentLanguage === 'hi' ? 'भाषा बदलें' : 'Change language'}
      >
        <span aria-hidden="true">{current?.emoji || '🌐'}</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown" role="listbox" aria-label={currentLanguage === 'hi' ? 'भाषा चयनकर्ता' : 'Language selector'}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
              role="option"
              aria-selected={currentLanguage === language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
            >
              <span className="language-emoji" aria-hidden="true">{language.emoji}</span>
              <span className="language-name">{language.nativeName} ({language.name})</span>
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
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChat}>
          <span>💬</span>
          {currentLanguage === 'hi' ? 'यात्रा सहायक' : 'Travel Assistant'}
        </button>
      )}
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>{currentLanguage === 'hi' ? 'झारखंड पर्यटन सहायक' : 'Jharkhand Tourism Assistant'}</h3>
            <div className="header-controls">
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
              <button className="close-btn" onClick={toggleChat}>×</button>
            </div>
          </div>
          
          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>{currentLanguage === 'hi' ? 'नमस्ते! 👋 मैं आपका झारखंड ट्रैवल असिस्टेंट हूं।' : 'Namaste! 👋 I\'m your Jharkhand travel assistant.'}</p>
                <p>{currentLanguage === 'hi' ? 'आज मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूं?' : 'How can I help you plan your trip today?'}</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <span className="message-time">
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {showOptions && messages.length === 0 && (
              <div className="quick-options">
                <p>{currentLanguage === 'hi' ? 'त्वरित प्रश्न:' : 'Quick questions:'}</p>
                {quickOptions[currentLanguage].map((option, index) => (
                  <button
                    key={index}
                    className="quick-option-btn"
                    onClick={() => handleQuickOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentLanguage === 'hi' ? 'झारखंड पर्यटन के बारे में पूछें...' : 'Ask about Jharkhand tourism...'}
              disabled={isLoading}
            />
            <button 
              onClick={() => handleSendMessage()} 
              disabled={isLoading || !inputMessage.trim()}
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