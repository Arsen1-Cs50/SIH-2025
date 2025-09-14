import React, { useState } from 'react';
import { MessageCircle, X, Navigation } from 'lucide-react';

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I can help you with tourist attractions, hotel bookings, travel routes, and local culture & festivals.' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessage = { type: 'user', message: currentMessage };
    setChatMessages([...chatMessages, newMessage]);
    
    setTimeout(() => {
      const botResponse = getBotResponse(currentMessage);
      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);
    
    setCurrentMessage('');
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
      return 'I can help you find great accommodations! We have partnerships with hotels in Ranchi, Deoghar, and Netarhat. Would you like me to show you available options?';
    } else if (lowerMessage.includes('waterfall')) {
      return 'Jharkhand has beautiful waterfalls! Hundru Falls (322 ft) and Dassam Falls are most popular. Best time to visit is during monsoon and winter months.';
    } else if (lowerMessage.includes('temple') || lowerMessage.includes('spiritual')) {
      return 'For spiritual experiences, I recommend Baidyanath Temple in Deoghar, Jagannath Temple in Ranchi, and Rajrappa Temple. All are significant pilgrimage sites.';
    } else if (lowerMessage.includes('wildlife')) {
      return 'For wildlife enthusiasts, visit Betla National Park and Palamau Tiger Reserve. Best time is Nov-Apr when animals are easily spotted near water sources.';
    } else {
      return 'I can provide information about attractions, bookings, travel routes, and local culture. What specific information would you like?';
    }
  };

  return (
    <>
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          <div className="bg-emerald-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-bold">Tourism Assistant</h3>
            <button onClick={() => setChatOpen(false)} className="text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs sm:max-w-sm ${
                  msg.type === 'user' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-emerald-600 text-white p-2 rounded-lg"
              >
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-emerald-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  );
};

export default ChatBot;