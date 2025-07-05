
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ServiceCard from '@/components/ServiceCard';
import { Search, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: 'House Cleaning',
      titleNepali: 'घर सफाई',
      description: 'पूर्ण घर सफाई सेवा, सबै कोठा र बाथरूम सहित',
      price: 'रू २,५००',
      rating: 4.8,
      location: 'काठमाडौं',
      duration: '२-३ घण्टा',
      image: '/placeholder-cleaning.jpg',
      category: 'cleaning'
    },
    {
      id: 2,
      title: 'Plumbing Service',
      titleNepali: 'नल मर्मत',
      description: 'पाइप लिकेज, नल मर्मत, र सबै प्लम्बिङ समस्या',
      price: 'रू १,५००',
      rating: 4.6,
      location: 'पाटन',
      duration: '१-२ घण्टा',
      image: '/placeholder-plumbing.jpg',
      category: 'repair'
    },
    {
      id: 3,
      title: 'Electrical Work',
      titleNepali: 'बिजुली काम',
      description: 'वायरिङ, फ्यान जडान, र बिजुली मर्मत',
      price: 'रू २,०००',
      rating: 4.7,
      location: 'भक्तपुर',
      duration: '२-४ घण्टा',
      image: '/placeholder-electrical.jpg',
      category: 'repair'
    },
    {
      id: 4,
      title: 'Cooking Service',
      titleNepali: 'खाना पकाउने सेवा',
      description: 'दैनिक खाना पकाउने र रसोई व्यवस्थापन',
      price: 'रू ३,०००',
      rating: 4.9,
      location: 'ललितपुर',
      duration: '२-३ घण्टा',
      image: '/placeholder-cooking.jpg',
      category: 'cooking'
    }
  ];

  const categories = [
    { id: 'all', name: 'सबै / All' },
    { id: 'cleaning', name: 'सफाई / Cleaning' },
    { id: 'repair', name: 'मर्मत / Repair' },
    { id: 'cooking', name: 'खाना / Cooking' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.titleNepali.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (serviceId: number) => {
    console.log('Booking service:', serviceId);
    // Navigate to booking flow or show booking modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-red-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">सेवाहरू / Services</h1>
                <p className="text-gray-600 text-sm">तपाईंको आवश्यकता अनुसार सेवा छान्नुहोस्</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="w-10 h-10"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="w-10 h-10"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="सेवा खोज्नुहोस् / Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 border-gray-200 hover:bg-red-50">
                <Filter className="w-4 h-4 mr-2" />
                फिल्टर / Filter
              </Button>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className={cn(
          "gap-6",
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col space-y-4"
        )}>
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              onBook={() => handleBookService(service.id)}
              delay={index * 100}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              कुनै सेवा फेला परेन / No services found
            </h3>
            <p className="text-gray-500">
              कृपया अर्को खोजी प्रयास गर्नुहोस् / Please try a different search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
