
import React from 'react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  titleNepali: string;
  description: string;
  price: string;
  rating: number;
  location: string;
  duration: string;
  image: string;
  onBook: () => void;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  titleNepali,
  description,
  price,
  rating,
  location,
  duration,
  image,
  onBook,
  delay = 0
}) => {
  return (
    <AnimatedCard delay={delay} className="overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">🏠</div>
            <div className="text-sm opacity-90">{title}</div>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          {rating}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{titleNepali}</h3>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-red-600">{price}</div>
          <Button 
            onClick={onBook}
            className="bg-red-600 hover:bg-red-700 transition-all duration-200 hover:shadow-lg"
          >
            बुक गर्नुहोस् / Book Now
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default ServiceCard;
