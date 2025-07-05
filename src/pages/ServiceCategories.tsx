import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, Star, MapPin, Hammer, Wrench, Sparkles, Plug } from 'lucide-react';

const ServiceCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'plumber',
      name: 'प्लम्बर',
      nameEn: 'Plumber',
      icon: Wrench,
      color: 'bg-blue-100 text-blue-700',
      providers: 45,
      avgPrice: 'NPR 500-1500',
      rating: 4.6,
      services: ['पाइप मर्मत', 'नल मर्मत', 'बाथरूम फिक्सिङ', 'ड्रेनेज सफाई']
    },
    {
      id: 'electrician',
      name: 'इलेक्ट्रिसियन',
      nameEn: 'Electrician',
      icon: Plug,
      color: 'bg-yellow-100 text-yellow-700',
      providers: 38,
      avgPrice: 'NPR 600-2000',
      rating: 4.7,
      services: ['बत्ति जडान', 'फ्यान मर्मत', 'वायरिङ', 'सकेट मर्मत']
    },
    {
      id: 'cleaning',
      name: 'सफाई सेवा',
      nameEn: 'Cleaning',
      icon: Sparkles,
      color: 'bg-green-100 text-green-700',
      providers: 52,
      avgPrice: 'NPR 800-2500',
      rating: 4.5,
      services: ['घर सफाई', 'कार्पेट सफाई', 'किचन सफाई', 'गिलास सफाई']
    },
    {
      id: 'repair',
      name: 'सामान्य मर्मत',
      nameEn: 'General Repair',
      icon: Hammer,
      color: 'bg-purple-100 text-purple-700',
      providers: 41,
      avgPrice: 'NPR 400-1200',
      rating: 4.4,
      services: ['फर्निचर मर्मत', 'दरवाजा मर्मत', 'झ्याल मर्मत', 'साना काम']
    }
  ];

  const topProviders = [
    {
      id: 1,
      name: 'राम बहादुर श्रेष्ठ',
      service: 'प्लम्बर',
      rating: 4.9,
      reviews: 127,
      location: 'काठमाडौं',
      price: 'NPR 600/hr',
      verified: true,
      available: true
    },
    {
      id: 2,
      name: 'सुनिता गुरुङ',
      service: 'सफाई सेवा',
      rating: 4.8,
      reviews: 89,
      location: 'ललितपुर',
      price: 'NPR 800/day',
      verified: true,
      available: false
    },
    {
      id: 3,
      name: 'दिपक तामाङ',
      service: 'इलेक्ट्रिसियन',
      rating: 4.7,
      reviews: 156,
      location: 'भक्तपुर',
      price: 'NPR 700/hr',
      verified: true,
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-red-700 p-1">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">सेवा कोटेगोरी</h1>
            <p className="text-red-100 text-sm">Service Categories</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="सेवा वा सेवाप्रदायक खोज्नुहोस्..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-white border-0 text-gray-800"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Service Categories */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">मुख्य सेवाहरू</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <category.icon size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{category.name}</h3>
                        <Badge variant="secondary" className="text-xs">{category.nameEn}</Badge>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{category.rating}</span>
                        <span className="text-xs text-gray-500">• {category.providers} प्रदायक</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{category.avgPrice}</p>
                      <div className="flex flex-wrap gap-1">
                        {category.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {category.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.services.length - 2} अन्य
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Top Providers */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>शीर्ष सेवाप्रदायक</span>
              <Badge variant="outline" className="text-xs">Top Rated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProviders.map((provider) => (
              <Card key={provider.id} className="bg-gray-50 border border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{provider.name}</h4>
                          {provider.verified && (
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{provider.service}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={10} />
                          {provider.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-xs text-gray-500">({provider.reviews})</span>
                      </div>
                      <p className="text-sm font-semibold text-green-600">{provider.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={provider.available ? "default" : "secondary"}
                      className={`text-xs ${provider.available ? 'bg-green-600' : 'bg-gray-500'}`}
                    >
                      {provider.available ? 'उपलब्ध' : 'व्यस्त'}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        विवरण
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                        बुक गर्नुहोस्
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceCategories;
