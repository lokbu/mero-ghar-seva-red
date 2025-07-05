
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Star, Filter, Hammer, Wrench, Mop, Plug } from 'lucide-react';

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularServices = [
    { name: 'प्लम्बर', nameEn: 'Plumber', icon: Wrench, color: 'bg-blue-100 text-blue-700', price: 'NPR 500+' },
    { name: 'इलेक्ट्रिसियन', nameEn: 'Electrician', icon: Plug, color: 'bg-yellow-100 text-yellow-700', price: 'NPR 600+' },
    { name: 'सफाई', nameEn: 'Cleaning', icon: Mop, color: 'bg-green-100 text-green-700', price: 'NPR 800+' },
    { name: 'मर्मत', nameEn: 'Repair', icon: Hammer, color: 'bg-purple-100 text-purple-700', price: 'NPR 400+' },
  ];

  const recentBookings = [
    { id: 1, service: 'प्लम्बिङ सेवा', provider: 'राम श्रेष्ठ', status: 'पूरा', rating: 4.8, date: '२०८१-०४-१५' },
    { id: 2, service: 'सफाई सेवा', provider: 'सुनिता गुरुङ', status: 'प्रगतिमा', rating: null, date: '२०८१-०४-१७' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">नमस्कार, राज!</h1>
            <p className="text-red-100 text-sm">आज के सेवा चाहिन्छ?</p>
          </div>
          <div className="bg-red-700 p-2 rounded-full">
            <MapPin size={20} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="सेवा खोज्नुहोस्... / Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-white border-0 text-gray-800"
          />
          <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="p-4 -mt-4">
        {/* Quick Services */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>लोकप्रिय सेवा</span>
              <Badge variant="secondary" className="text-xs">Popular</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {popularServices.map((service) => (
                <Card key={service.nameEn} className="cursor-pointer hover:shadow-md transition-shadow border border-gray-100">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mx-auto mb-3`}>
                      <service.icon size={24} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{service.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{service.nameEn}</p>
                    <Badge variant="outline" className="text-xs">{service.price}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
              सबै सेवा हेर्नुहोस् / View All Services
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>हालको बुकिङ</span>
              <Badge variant="outline" className="text-xs">Recent</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.map((booking) => (
              <Card key={booking.id} className="bg-gray-50 border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{booking.service}</h4>
                      <p className="text-xs text-gray-600">{booking.provider}</p>
                    </div>
                    <Badge
                      variant={booking.status === 'पूरा' ? 'default' : 'secondary'}
                      className={booking.status === 'पूरा' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {booking.date}
                    </div>
                    {booking.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        {booking.rating}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {recentBookings.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">कुनै बुकिङ फेला परेन</p>
                <p className="text-xs">No recent bookings found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          <Button variant="ghost" className="flex flex-col gap-1 text-red-600">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            <span className="text-xs">गृह</span>
          </Button>
          <Button variant="ghost" className="flex flex-col gap-1 text-gray-500">
            <Search size={16} />
            <span className="text-xs">खोज</span>
          </Button>
          <Button variant="ghost" className="flex flex-col gap-1 text-gray-500">
            <Clock size={16} />
            <span className="text-xs">इतिहास</span>
          </Button>
          <Button variant="ghost" className="flex flex-col gap-1 text-gray-500">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <span className="text-xs">प्रोफाइल</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
