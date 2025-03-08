
import React from 'react';

const partners = [
  { id: 1, name: 'Partenaire 1', logo: '/placeholder.svg' },
  { id: 2, name: 'Partenaire 2', logo: '/placeholder.svg' },
  { id: 3, name: 'Partenaire 3', logo: '/placeholder.svg' },
  { id: 4, name: 'Partenaire 4', logo: '/placeholder.svg' },
  { id: 5, name: 'Partenaire 5', logo: '/placeholder.svg' },
  { id: 6, name: 'Partenaire 6', logo: '/placeholder.svg' },
];

const PartnersCarousel: React.FC = () => {
  return (
    <section 
      id="partenaires" 
      className="py-12 bg-medical-gray overflow-hidden"
    >
      <div className="container">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl md:text-2xl font-medium text-medical-dark-blue mb-2">
            Ils nous font confiance
          </h3>
          <div className="h-1 w-16 bg-medical-blue rounded-full"></div>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className="partner-carousel">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="flex-shrink-0 w-32 h-20 mx-8 flex items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate for infinite scroll effect */}
          {partners.map((partner) => (
            <div 
              key={`duplicate-${partner.id}`} 
              className="flex-shrink-0 w-32 h-20 mx-8 flex items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
