
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'bot', text: string}[]>([
    {type: 'bot', text: 'Bonjour ! Je suis le chatbot du Diplôme Universitaire en Endoscopie Digestive. Comment puis-je vous aider ?'}
  ]);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = message.trim();
    setChatHistory([...chatHistory, {type: 'user', text: userMessage}]);
    setMessage('');
    
    // Simulate bot response - in a real app, this would be an API call
    setTimeout(() => {
      let botResponse = '';
      const lowerCaseMessage = userMessage.toLowerCase();
      
      if (lowerCaseMessage.includes('admission') || lowerCaseMessage.includes('conditions')) {
        botResponse = "Le programme est ouvert aux médecins spécialistes, gastro-entérologues, et internes en dernière année de spécialisation. Un CV et une lettre de motivation sont requis pour l'inscription.";
      } else if (lowerCaseMessage.includes('durée') || lowerCaseMessage.includes('formation')) {
        botResponse = "La formation s'étend sur 12 mois, avec des modules théoriques en ligne et des sessions pratiques en présentiel réparties tout au long de l'année.";
      } else if (lowerCaseMessage.includes('évaluation') || lowerCaseMessage.includes('examen')) {
        botResponse = "Les évaluations comprennent des examens théoriques, des évaluations pratiques sur simulateurs, et la présentation d'un mémoire de fin de formation.";
      } else if (lowerCaseMessage.includes('international') || lowerCaseMessage.includes('reconnu')) {
        botResponse = "Oui, notre diplôme est reconnu par plusieurs associations internationales d'endoscopie digestive et offre des crédits de formation continue valables dans l'Union Européenne.";
      } else if (lowerCaseMessage.includes('frais') || lowerCaseMessage.includes('prix') || lowerCaseMessage.includes('coût')) {
        botResponse = "Les frais d'inscription varient selon votre statut et pays d'origine. Nous proposons des tarifs préférentiels pour les médecins des pays en développement. Contactez-nous pour plus d'informations.";
      } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email')) {
        botResponse = "Vous pouvez nous contacter par email à voiceilyas@gmail.com ou en utilisant le formulaire de contact en bas de page.";
      } else {
        botResponse = "Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler ? Vous pouvez me demander des informations sur les conditions d'admission, la durée de la formation, les évaluations, la reconnaissance internationale, ou les frais d'inscription.";
      }
      
      setChatHistory(prev => [...prev, {type: 'bot', text: botResponse}]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-medical-blue text-white p-3 rounded-full shadow-lg hover:bg-medical-dark-blue transition-colors z-50"
        aria-label="Chat avec nous"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-xl z-50 flex flex-col border border-gray-200">
          <div className="bg-medical-blue text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-medium">Assistant virtuel DU Endoscopie</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-grow max-h-96 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((entry, index) => (
              <div 
                key={index} 
                className={`flex ${entry.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    entry.type === 'user' 
                      ? 'bg-medical-light-blue text-medical-dark-blue rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {entry.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-3 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-medical-blue"
            />
            <button 
              type="submit"
              className="bg-medical-blue text-white px-4 py-2 rounded-r-lg hover:bg-medical-dark-blue"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
