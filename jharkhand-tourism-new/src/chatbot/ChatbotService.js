// src/chatbot/ChatbotService.js
const JHARKHAND_KNOWLEDGE = {
  destinations: {
    netarhat: {
      name: "Netarhat",
      hindiName: "नेतरहाट",
      description: "Netarhat is known as the 'Queen of Chotanagpur' and is famous for its breathtaking sunrises and sunsets. It's a perfect hill station for nature lovers.",
      hindiDescription: "नेतरहाट 'छोटानागपुर की रानी' के नाम से जाना जाता है और अपने लुभावने सूर्योदय और सूर्यास्त के लिए प्रसिद्ध है। यह प्रकृति प्रेमियों के लिए एक आदर्श हिल स्टेशन है।",
      highlights: ["Sunrise Point", "Sunset Point", "Upper Ghaghri Falls", "Lower Ghaghri Falls", "Magnolia Point"],
      hindiHighlights: ["सनराइज पॉइंट", "सनसेट पॉइंट", "अपर घाघरी फॉल्स", "लोअर घाघरी फॉल्स", "मैग्नोलिया पॉइंट"],
      best_time: "October to March",
      hindiBestTime: "अक्टूबर से मार्च",
      type: ["eco-tourism", "hill station"],
    },
    ranchi: {
      name: "Ranchi",
      hindiName: "रांची",
      description: "Capital city of Jharkhand, known for its waterfalls, temples, and pleasant climate.",
      hindiDescription: "झारखंड की राजधानी शहर, अपने झरनों, मंदिरों और सुहावने मौसम के लिए जाना जाता है।",
      highlights: ["Hundru Falls", "Jonha Falls", "Rock Garden", "Tagore Hill", "Pahari Mandir"],
      hindiHighlights: ["हुंडरू फॉल्स", "जोन्हा फॉल्स", "रॉक गार्डन", "टैगोर हिल", "पहाड़ी मंदिर"],
      best_time: "Throughout the year",
      hindiBestTime: "पूरे साल",
      type: ["cultural", "eco-tourism"],
    }
    // Add other destinations with Hindi translations...
  },
  culture: {
    festivals: ["Sarhul", "Karma", "Tusu", "Holi", "Chhath Puja"],
    hindiFestivals: ["सरहुल", "कर्मा", "टुसू", "होली", "छठ पूजा"],
    tribes: ["Santhal", "Munda", "Oraon", "Ho", "Kharia"],
    hindiTribes: ["संथाल", "मुंडा", "ओराँव", "हो", "खड़िया"],
    languages: ["Hindi", "Santhali", "Mundari", "Ho", "Kurukh"],
    hindiLanguages: ["हिंदी", "संथाली", "मुंडारी", "हो", "कुरुख"]
  }
};

// Language management
const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', emoji: '🇺🇸' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', emoji: '🇮🇳' }
};

// Cache system
const responseCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

// Helper functions
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getSessionId = () => {
  try {
    let sessionId = localStorage.getItem('chatbot_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('chatbot_session_id', sessionId);
    }
    return sessionId;
  } catch (error) {
    return generateSessionId();
  }
};

const getCurrentLanguage = () => {
  try {
    return localStorage.getItem('chatbot_language') || 'en';
  } catch (error) {
    return 'en';
  }
};

const setCurrentLanguage = (languageCode) => {
  try {
    if (SUPPORTED_LANGUAGES[languageCode]) {
      localStorage.setItem('chatbot_language', languageCode);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getTranslatedKnowledge = (language = 'en') => {
  if (language === 'hi') {
    // Return Hindi version of knowledge base
    return {
      destinations: Object.fromEntries(
        Object.entries(JHARKHAND_KNOWLEDGE.destinations).map(([key, value]) => [
          key,
          {
            name: value.hindiName || value.name,
            description: value.hindiDescription || value.description,
            highlights: value.hindiHighlights || value.highlights,
            best_time: value.hindiBestTime || value.best_time,
            type: value.type
          }
        ])
      ),
      culture: {
        festivals: JHARKHAND_KNOWLEDGE.culture.hindiFestivals || JHARKHAND_KNOWLEDGE.culture.festivals,
        tribes: JHARKHAND_KNOWLEDGE.culture.hindiTribes || JHARKHAND_KNOWLEDGE.culture.tribes,
        languages: JHARKHAND_KNOWLEDGE.culture.hindiLanguages || JHARKHAND_KNOWLEDGE.culture.languages
      }
    };
  }
  return JHARKHAND_KNOWLEDGE;
};

const saveChatToLocal = (sessionId, message, response, metadata = {}) => {
  try {
    const chatHistory = JSON.parse(localStorage.getItem('chat_history') || '{}');
    if (!chatHistory[sessionId]) {
      chatHistory[sessionId] = [];
    }
    
    chatHistory[sessionId].push({
      message,
      response,
      timestamp: new Date().toISOString(),
      language: metadata.language || getCurrentLanguage(),
      metadata
    });
    
    if (chatHistory[sessionId].length > 50) {
      chatHistory[sessionId] = chatHistory[sessionId].slice(-50);
    }
    
    localStorage.setItem('chat_history', JSON.stringify(chatHistory));
  } catch (error) {
    console.warn('Error saving chat to local storage:', error);
  }
};

const getChatHistoryFromLocal = (sessionId) => {
  try {
    const chatHistory = JSON.parse(localStorage.getItem('chat_history') || '{}');
    return chatHistory[sessionId] || [];
  } catch (error) {
    console.warn('Error reading chat history:', error);
    return [];
  }
};

// OpenAI API Integration with multilingual support
const callOpenAI = async (message, conversationHistory = [], language = 'en') => {
  const cacheKey = `${message}_${language}_${conversationHistory.length}`;
  const cachedResponse = responseCache.get(cacheKey);
  
  if (cachedResponse && (Date.now() - cachedResponse.timestamp < CACHE_DURATION)) {
    return cachedResponse.response;
  }

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const currentKnowledge = getTranslatedKnowledge(language);
  const systemPrompt = language === 'hi' ?
    `आप झारखंड पर्यटन के लिए एक सहायक ट्रैवल असिस्टेंट हैं। हिंदी में जवाब दें।

मुख्य ज्ञान:
${JSON.stringify(currentKnowledge, null, 2)}

दिशा-निर्देश:
- वार्तालाप शैली में लेकिन व्यवसायिक रहें
- कभी-कभी इमोजी का प्रयोग करें (1-2 प्रति उत्तर)
- उत्तर 150 शब्दों से कम रखें
- झारखंड-विशिष्ट जानकारी पर ध्यान दें
- अनुवर्ती प्रश्न सुझाएं
- अगर पता नहीं है, तो कहें "मेरे पास यह जानकारी नहीं है लेकिन मैं आपकी मदद कर सकता हूं..."
- यात्रा कार्यक्रम के लिए स्पष्टीकरण प्रश्न पूछें` :
    `You are a helpful travel assistant for Jharkhand Tourism. Respond in ${language}.

KEY KNOWLEDGE:
${JSON.stringify(currentKnowledge, null, 2)}

GUIDELINES:
- Be conversational but professional
- Use emojis sparingly (1-2 per response)
- Keep responses under 150 words
- Focus on Jharkhand-specific information
- Suggest follow-up questions
- If unsure, say "I don't have that information but I can help you with..."
- For itinerary requests, ask clarifying questions`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-8),
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    responseCache.set(cacheKey, {
      response: aiResponse,
      timestamp: Date.now()
    });

    return aiResponse;

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

// Enhanced fallback responses with multilingual support
const getFallbackResponse = (message, language = 'en') => {
  const lowerMessage = message.toLowerCase();
  const currentKnowledge = getTranslatedKnowledge(language);

  if (language === 'hi') {
    // Hindi fallback responses
    if (/(नमस्ते|हैलो|हाय|hi|hello)/.test(lowerMessage)) {
      return "नमस्ते! 👋 मैं आपका झारखंड ट्रैवल असिस्टेंट हूं। आपकी यात्रा की योजना बनाने में मैं आपकी कैसे मदद कर सकता हूं?";
    }
    
    if (/(नेतरहाट|hill station|netarhat)/.test(lowerMessage)) {
      const dest = currentKnowledge.destinations.netarhat;
      return `${dest.name}: ${dest.description}\nमुख्य आकर्षण: ${dest.highlights.join(', ')}\nसबसे अच्छा समय: ${dest.best_time}`;
    }

    if (/(धन्यवाद|thank you|thanks)/.test(lowerMessage)) {
      return "आपका स्वागत है! 😊 क्या आप झारखंड के बारे में कुछ और जानना चाहेंगे?";
    }

    return "मैं आपको झारखंड का पता लगाने में मदद करने के लिए यहां हूं! आप मुझसे पर्यटन स्थलों, संस्कृति, आवास, परिवहन या यात्रा योजना के बारे में पूछ सकते हैं।";
  }

  // English fallback responses
  if (/(hello|hi|hey|namaste)/.test(lowerMessage)) {
    return "Namaste! 👋 I'm your Jharkhand travel assistant. How can I help you plan your trip today?";
  }
  
  if (/(netarhat|hill station)/.test(lowerMessage)) {
    const dest = currentKnowledge.destinations.netarhat;
    return `${dest.name}: ${dest.description}\nHighlights: ${dest.highlights.join(', ')}\nBest time: ${dest.best_time}`;
  }

  if (/(thanks|thank you|dhanyavad)/.test(lowerMessage)) {
    return "You're welcome! 😊 Is there anything else you'd like to know about Jharkhand?";
  }

  return "I'm here to help you explore Jharkhand! You can ask me about tourist destinations, cultural information, accommodation, transportation, or itinerary planning.";
};

// Main service function with language support
const sendMessage = async (message, sessionId = null) => {
  const currentSessionId = sessionId || getSessionId();
  const currentLanguage = getCurrentLanguage();
  const startTime = Date.now();
  
  try {
    const history = getChatHistoryFromLocal(currentSessionId);
    const conversationHistory = history.flatMap(item => [
      { role: 'user', content: item.message },
      { role: 'assistant', content: item.response }
    ]);

    // Check if user is requesting language change
    if (/(हिंदी|hindi|language|भाषा)/i.test(message) && /(change|switch|बदलो|करें)/i.test(message)) {
      const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
      setCurrentLanguage(newLanguage);
      const response = newLanguage === 'hi' ? 
        "भाषा हिंदी में बदल दी गई है! 🌐" : 
        "Language changed to English! 🌐";
      
      saveChatToLocal(currentSessionId, message, response, { 
        source: 'language_change',
        language: newLanguage
      });
      
      return {
        response: response,
        session_id: currentSessionId,
        language: newLanguage
      };
    }

    const response = await callOpenAI(message, conversationHistory, currentLanguage);
    
    saveChatToLocal(currentSessionId, message, response, { 
      source: 'openai',
      language: currentLanguage,
      response_time: Date.now() - startTime
    });
    
    return {
      response: response,
      session_id: currentSessionId,
      language: currentLanguage
    };

  } catch (error) {
    console.error('Error in sendMessage:', error);
    
    const fallbackResponse = getFallbackResponse(message, getCurrentLanguage());
    
    saveChatToLocal(currentSessionId, message, fallbackResponse, { 
      source: 'fallback',
      error: error.message,
      language: getCurrentLanguage()
    });
    
    return {
      response: fallbackResponse,
      session_id: currentSessionId,
      error: error.message,
      language: getCurrentLanguage()
    };
  }
};

// Enhanced service object with language methods
const ChatbotService = {
  sendMessage,
  getRecommendations: async (preferences) => {
    const currentLanguage = getCurrentLanguage();
    try {
      const { days = 3, interests = [] } = preferences;
      const prompt = currentLanguage === 'hi' ?
        `${days}-दिन का झारखंड के लिए यात्रा कार्यक्रम बनाएं जो ${interests.join(', ')} पर केंद्रित हो।` :
        `Create a ${days}-day itinerary for Jharkhand focusing on ${interests.join(', ')}.`;
      
      const response = await callOpenAI(prompt, [], currentLanguage);
      
      return {
        itinerary: response,
        days: days,
        interests: interests,
        language: currentLanguage
      };
    } catch (error) {
      return { error: currentLanguage === 'hi' ? 
        "अभी सिफारिशें उत्पन्न करने में समस्या हो रही है।" : 
        "I'm having trouble generating recommendations right now." 
      };
    }
  },

  getChatHistory: async () => {
    const sessionId = getSessionId();
    const history = getChatHistoryFromLocal(sessionId);
    return { messages: history };
  },

  getCurrentLanguage: () => ({
    code: getCurrentLanguage(),
    ...SUPPORTED_LANGUAGES[getCurrentLanguage()]
  }),

  setLanguage: (languageCode) => {
    if (SUPPORTED_LANGUAGES[languageCode]) {
      const success = setCurrentLanguage(languageCode);
      return {
        success,
        language: SUPPORTED_LANGUAGES[languageCode],
        message: success ? 
          `Language changed to ${SUPPORTED_LANGUAGES[languageCode].name}` :
          'Failed to change language'
      };
    }
    return { success: false, message: 'Unsupported language' };
  },

  getSupportedLanguages: () => Object.values(SUPPORTED_LANGUAGES),

  clearSession: () => {
    localStorage.removeItem('chatbot_session_id');
    responseCache.clear();
  },

  exportChatHistory: () => {
    const sessionId = getSessionId();
    const history = getChatHistoryFromLocal(sessionId);
    return JSON.stringify(history, null, 2);
  }
};

export default ChatbotService;