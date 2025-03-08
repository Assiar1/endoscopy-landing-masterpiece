
import React, { useState, useRef, useEffect } from 'react';
import { Send, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const emailFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Configurer EmailJS pour envoyer à voiceilyas@gmail.com
    const templateParams = {
      to_email: 'voiceilyas@gmail.com',
      from_name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      from_email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      message: (e.currentTarget.elements.namedItem('message') as HTMLTextAreaElement).value
    };

    // Envoyer l'email via EmailJS
    // Vous devez créer un compte sur emailjs.com et configurer un service et un template
    emailjs.send(
      'service_id', // Remplacez par votre service ID
      'template_id', // Remplacez par votre template ID
      templateParams,
      'user_id' // Remplacez par votre user ID
    )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      
      // Reset success indicator after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
      // Reset form
      e.currentTarget.reset();
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer votre message. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    });
  };

  return (
    <section 
      id="contact" 
      className="section-padding bg-white"
    >
      <div className="container">
        <div className="section-title">
          <h2>Contactez-nous</h2>
          <p>
            Vous avez des questions sur le diplôme? Remplissez le formulaire ci-dessous 
            et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div 
          ref={formRef}
          className="max-w-2xl mx-auto mt-12"
        >
          <div 
            ref={(el) => (elementsRef.current[0] = el)}
            className="glass-card p-8 animate-on-scroll"
          >
            <form ref={emailFormRef} onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-medical-dark-blue font-medium mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-medical-light-blue/30 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-medical-dark-blue font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-medical-light-blue/30 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-medical-dark-blue font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-medical-light-blue/30 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`btn ${
                    isSuccess 
                      ? 'bg-green-500 text-white' 
                      : 'btn-primary'
                  } min-w-[150px] relative`}
                >
                  <span className={`inline-flex items-center transition-opacity ${
                    isSubmitting ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {isSuccess ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Envoyé
                      </>
                    ) : (
                      <>
                        Envoyer
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </span>
                  
                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
