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
    },
    jamshedpur: {
      name: "Jamshedpur",
      hindiName: "जमशेदपुर",
      description: "Known as the 'Steel City of India', Jamshedpur is an industrial city with beautiful parks and the famous Jubilee Park.",
      hindiDescription: "'भारत की स्टील सिटी' के नाम से मशहूर जमशेदपुर एक औद्योगिक शहर है जिसमें सुंदर पार्क और प्रसिद्ध जुबली पार्क है।",
      highlights: ["Jubilee Park", "Dalma Wildlife Sanctuary", "Tata Steel Zoological Park", "Dimna Lake"],
      hindiHighlights: ["जुबली पार्क", "दलमा वन्यजीव अभयारण्य", "टाटा स्टील जूलॉजिकल पार्क", "डिमना झील"],
      best_time: "October to March",
      hindiBestTime: "अक्टूबर से मार्च",
      type: ["industrial", "city"],
    },
    deoghar: {
      name: "Deoghar",
      hindiName: "देवघर",
      description: "A important Hindu pilgrimage site known for the Baidyanath Temple, one of the twelve Jyotirlingas.",
      hindiDescription: "एक महत्वपूर्ण हिंदू तीर्थ स्थल जो बाबा बैद्यनाथ मंदिर के लिए प्रसिद्ध है, जो बारह ज्योतिर्लिंगों में से एक है।",
      highlights: ["Baidyanath Temple", "Naulakha Mandir", "Satsanga Ashram", "Tapovan"],
      hindiHighlights: ["बैद्यनाथ मंदिर", "नौलखा मंदिर", "सत्संग आश्रम", "तपोवन"],
      best_time: "October to March",
      hindiBestTime: "अक्टूबर से मार्च",
      type: ["religious", "pilgrimage"],
    },
    hazaribagh: {
      name: "Hazaribagh",
      hindiName: "हजारीबाग",
      description: "Known for its national park, beautiful lakes, and pleasant climate. A great destination for wildlife enthusiasts.",
      hindiDescription: "अपने राष्ट्रीय उद्यान, सुंदर झीलों और सुहावने मौसम के लिए जाना जाता है। वन्यजीव प्रेमियों के लिए एक शानदार गंतव्य।",
      highlights: ["Hazaribagh National Park", "Hazaribagh Lake", "Iskon Temple", "Rajrappa Mandir"],
      hindiHighlights: ["हजारीबाग राष्ट्रीय उद्यान", "हजारीबाग झील", "इस्कॉन मंदिर", "राजरप्पा मंदिर"],
      best_time: "October to March",
      hindiBestTime: "अक्टूबर से मार्च",
      type: ["wildlife", "eco-tourism"],
    }
  },
  culture: {
    festivals: ["Sarhul", "Karma", "Tusu", "Holi", "Chhath Puja"],
    hindiFestivals: ["सरहुल", "कर्मा", "टुसू", "होली", "छठ पूजा"],
    tribes: ["Santhal", "Munda", "Oraon", "Ho", "Kharia"],
    hindiTribes: ["संथाल", "मुंडा", "ओराँव", "हो", "खड़िया"],
    languages: ["Hindi", "Santhali", "Mundari", "Ho", "Kurukh"],
    hindiLanguages: ["हिंदी", "संथाली", "मुंडारी", "हो", "कुरुख"],
    cuisine: ["Litti Chokha", "Thekua", "Rugra", "Bamboo Shoot Curry", "Handia"],
    hindiCuisine: ["लिट्टी चोखा", "ठेकुआ", "रुगड़ा", "बांस की कोपल की करी", "हंडिया"]
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
        languages: JHARKHAND_KNOWLEDGE.culture.hindiLanguages || JHARKHAND_KNOWLEDGE.culture.languages,
        cuisine: JHARKHAND_KNOWLEDGE.culture.hindiCuisine || JHARKHAND_KNOWLEDGE.culture.cuisine
      }
    };
  }
  return JHARKHAND_KNOWLEDGE;
};

// Rule-based response generator
const generateResponse = (message, language = 'en') => {
  const lowerMessage = message.toLowerCase();
  const currentKnowledge = getTranslatedKnowledge(language);
  const destinations = currentKnowledge.destinations;
  
  // Check cache first
  const cacheKey = `${message}_${language}`;
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse && (Date.now() - cachedResponse.timestamp < CACHE_DURATION)) {
    return cachedResponse.response;
  }
  
  let response = '';
  
  // Language detection and switching
  if (/(हिंदी|hindi|language|भाषा)/i.test(message) && /(change|switch|बदलो|करें)/i.test(message)) {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    response = newLanguage === 'hi' ? 
      "भाषा हिंदी में बदल दी गई है! 🌐" : 
      "Language changed to English! 🌐";
    
    responseCache.set(cacheKey, {
      response: response,
      timestamp: Date.now()
    });
    
    return response;
  }
  
  // Greetings
  if (language === 'hi') {
    if (/(नमस्ते|हैलो|हाय|hi|hello)/.test(lowerMessage)) {
      response = "नमस्ते! 👋 मैं आपका झारखंड ट्रैवल असिस्टेंट हूं। आपकी यात्रा की योजना बनाने में मैं आपकी कैसे मदद कर सकता हूं?";
    }
    else if (/(धन्यवाद|thank you|thanks)/.test(lowerMessage)) {
      response = "आपका स्वागत है! 😊 क्या आप झारखंड के बारे में कुछ और जानना चाहेंगे?";
    }
    else if (/(पर्यटन स्थल|जगह|destination|place)/.test(lowerMessage)) {
      const destinationNames = Object.values(destinations).map(d => d.name).join(', ');
      response = `झारखंड के प्रमुख पर्यटन स्थल: ${destinationNames}। किस स्थान के बारे में अधिक जानना चाहेंगे? 🗺️`;
    }
    else if (/(नेतरहाट|netarhat)/.test(lowerMessage)) {
      const dest = destinations.netarhat;
      response = `${dest.name}: ${dest.description}\nमुख्य आकर्षण: ${dest.highlights.join(', ')}\nसबसे अच्छा समय: ${dest.best_time} 🏞️`;
    }
    else if (/(रांची|ranchi)/.test(lowerMessage)) {
      const dest = destinations.ranchi;
      response = `${dest.name}: ${dest.description}\nमुख्य आकर्षण: ${dest.highlights.join(', ')}\nसबसे अच्छा समय: ${dest.best_time} 🌊`;
    }
    else if (/(जमशेदपुर|jamshedpur)/.test(lowerMessage)) {
      const dest = destinations.jamshedpur;
      response = `${dest.name}: ${dest.description}\nमुख्य आकर्षण: ${dest.highlights.join(', ')}\nसबसे अच्छा समय: ${dest.best_time} 🏭`;
    }
    else if (/(देवघर|deoghar)/.test(lowerMessage)) {
      const dest = destinations.deoghar;
      response = `${dest.name}: ${dest.description}\nमुख्य आकर्षण: ${dest.highlights.join(', ')}\nसबसे अच्छा समय: ${dest.best_time} 🛕`;
    }
    else if (/(हजारीबाग|hazaribagh)/.test(lowerMessage)) {
      const dest = destinations.hazaribagh;
      response = `${dest.name}: ${dest.description}\nमुख्य आकर्षण: ${dest.highlights.join(', ')}\nसबसे अच्छा समय: ${dest.best_time} 🦌`;
    }
    else if (/(संस्कृति|culture|त्योहार|festival)/.test(lowerMessage)) {
      response = `झारखंड की समृद्ध संस्कृति में शामिल हैं:\nत्योहार: ${currentKnowledge.culture.festivals.join(', ')}\nजनजातियाँ: ${currentKnowledge.culture.tribes.join(', ')}\nभाषाएँ: ${currentKnowledge.culture.languages.join(', ')}\nपारंपरिक भोजन: ${currentKnowledge.culture.cuisine.join(', ')} 🎭`;
    }
    else if (/(यात्रा कार्यक्रम|itinerary|plan|योजना)/.test(lowerMessage)) {
      response = "मैं आपके लिए एक यात्रा कार्यक्रम बना सकता हूं! कृपया बताएं:\n1. आप कितने दिनों की यात्रा की योजना बना रहे हैं?\n2. आपकी रुचियाँ क्या हैं? (जैसे प्रकृति, संस्कृति, तीर्थयात्रा, वन्यजीव) 📅";
    }
    else {
      response = "मैं आपको झारखंड का पता लगाने में मदद करने के लिए यहां हूं! आप मुझसे पर्यटन स्थलों, संस्कृति, आवास, परिवहन या यात्रा योजना के बारे में पूछ सकते हैं। मैं नेतरहाट, रांची, जमशेदपुर, देवघर, हजारीबाग और झारखंड की संस्कृति के बारे में जानकारी प्रदान कर सकता हूं। 🌄";
    }
  } else {
    // English responses
    if (/(hello|hi|hey|namaste)/.test(lowerMessage)) {
      response = "Namaste! 👋 I'm your Jharkhand travel assistant. How can I help you plan your trip today?";
    }
    else if (/(thanks|thank you|dhanyavad)/.test(lowerMessage)) {
      response = "You're welcome! 😊 Is there anything else you'd like to know about Jharkhand?";
    }
    else if (/(destination|place|tourist|attraction)/.test(lowerMessage)) {
      const destinationNames = Object.values(destinations).map(d => d.name).join(', ');
      response = `Popular tourist destinations in Jharkhand: ${destinationNames}. Which place would you like to know more about? 🗺️`;
    }
    else if (/(netarhat)/.test(lowerMessage)) {
      const dest = destinations.netarhat;
      response = `${dest.name}: ${dest.description}\nHighlights: ${dest.highlights.join(', ')}\nBest time: ${dest.best_time} 🏞️`;
    }
    else if (/(ranchi)/.test(lowerMessage)) {
      const dest = destinations.ranchi;
      response = `${dest.name}: ${dest.description}\nHighlights: ${dest.highlights.join(', ')}\nBest time: ${dest.best_time} 🌊`;
    }
    else if (/(jamshedpur)/.test(lowerMessage)) {
      const dest = destinations.jamshedpur;
      response = `${dest.name}: ${dest.description}\nHighlights: ${dest.highlights.join(', ')}\nBest time: ${dest.best_time} 🏭`;
    }
    else if (/(deoghar)/.test(lowerMessage)) {
      const dest = destinations.deoghar;
      response = `${dest.name}: ${dest.description}\nHighlights: ${dest.highlights.join(', ')}\nBest time: ${dest.best_time} 🛕`;
    }
    else if (/(hazaribagh)/.test(lowerMessage)) {
      const dest = destinations.hazaribagh;
      response = `${dest.name}: ${dest.description}\nHighlights: ${dest.highlights.join(', ')}\nBest time: ${dest.best_time} 🦌`;
    }
    else if (/(culture|festival|tribe)/.test(lowerMessage)) {
      response = `Jharkhand's rich culture includes:\nFestivals: ${currentKnowledge.culture.festivals.join(', ')}\nTribes: ${currentKnowledge.culture.tribes.join(', ')}\nLanguages: ${currentKnowledge.culture.languages.join(', ')}\nTraditional Cuisine: ${currentKnowledge.culture.cuisine.join(', ')} 🎭`;
    }
    else if (/(itinerary|plan|tour|travel)/.test(lowerMessage)) {
      response = "I can create a travel itinerary for you! Please tell me:\n1. How many days are you planning to travel?\n2. What are your interests? (e.g., nature, culture, pilgrimage, wildlife) 📅";
    }
    else {
      response = "I'm here to help you explore Jharkhand! You can ask me about tourist destinations, cultural information, accommodation, transportation, or itinerary planning. I can provide information about Netarhat, Ranchi, Jamshedpur, Deoghar, Hazaribagh, and Jharkhand's culture. 🌄";
    }
  }
  
  responseCache.set(cacheKey, {
    response: response,
    timestamp: Date.now()
  });
  
  return response;
};

// Simple itinerary generator
const generateItinerary = (preferences, language = 'en') => {
  const { days = 3, interests = [] } = preferences;
  const currentKnowledge = getTranslatedKnowledge(language);
  
  let itinerary = '';
  
  if (language === 'hi') {
    itinerary = `झारखंड के लिए ${days}-दिन का यात्रा कार्यक्रम (${interests.join(', ')} पर केंद्रित):\n\n`;
    
    if (days >= 3) {
      itinerary += "दिन 1: रांची में झरने और मंदिरों का भ्रमण\n";
      itinerary += "दिन 2: नेतरहाट की प्राकृतिक सुंदरता का आनंद\n";
      if (days >= 4) itinerary += "दिन 3: देवघर में तीर्थयात्रा\n";
      if (days >= 5) itinerary += "दिन 4: हजारीबाग में वन्यजीव सफारी\n";
      if (days >= 6) itinerary += "दिन 5: जमशेदपुर में औद्योगिक दर्शन\n";
    } else {
      itinerary += "कम से कम 3 दिनों की योजना बनाने की सलाह दी जाती है ताकि झारखंड की विविधता का पूरा आनंद लिया जा सके।";
    }
    
    itinerary += "\n\nविस्तृत योजना के लिए कृपया हमारी वेबसाइट देखें या स्थानीय टूर ऑपरेटर से संपर्क करें।";
  } else {
    itinerary = `${days}-day itinerary for Jharkhand (focusing on ${interests.join(', ')}):\n\n`;
    
    if (days >= 3) {
      itinerary += "Day 1: Explore waterfalls and temples in Ranchi\n";
      itinerary += "Day 2: Enjoy natural beauty in Netarhat\n";
      if (days >= 4) itinerary += "Day 3: Pilgrimage in Deoghar\n";
      if (days >= 5) itinerary += "Day 4: Wildlife safari in Hazaribagh\n";
      if (days >= 6) itinerary += "Day 5: Industrial tour in Jamshedpur\n";
    } else {
      itinerary += "We recommend planning at least 3 days to fully enjoy Jharkhand's diversity.";
    }
    
    itinerary += "\n\nFor detailed planning, please visit our website or contact a local tour operator.";
  }
  
  return itinerary;

};

// Main service function
const sendMessage = async (message) => {
  const currentLanguage = getCurrentLanguage();
  
  try {
    const response = generateResponse(message, currentLanguage);
    return {
      response: response,
      language: currentLanguage
    };
  } catch (error) {
    console.error('Error in sendMessage:', error);
    const fallbackResponse = currentLanguage === 'hi' ? 
      "क्षमा करें, अभी कुछ तकनीकी समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।" : 
      "Sorry, I'm experiencing some technical issues. Please try again later.";
    
    return {
      response: fallbackResponse,
      error: error.message,
      language: currentLanguage
    };
  }
};

// Enhanced service object with language methods
const ChatbotService = {
  sendMessage,
  getRecommendations: async (preferences) => {
    const currentLanguage = getCurrentLanguage();
    try {
      const itinerary = generateItinerary(preferences, currentLanguage);
      
      return {
        itinerary: itinerary,
        days: preferences.days || 3,
        interests: preferences.interests || [],
        language: currentLanguage
      };
    } catch (error) {
      return { error: currentLanguage === 'hi' ? 
        "अभी सिफारिशें उत्पन्न करने में समस्या हो रही है।" : 
        "I'm having trouble generating recommendations right now." 
      };
    }
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
    responseCache.clear();
  },
};

export default ChatbotService;