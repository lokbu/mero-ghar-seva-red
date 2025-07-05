
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, MapPin, Clock, Star, DollarSign, CheckCircle, Phone } from 'lucide-react';

const ProviderDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

  const pendingRequests = [
    {
      id: 1,
      service: 'प्लम्बिङ सेवा',
      customer: 'श्याम पौडेल',
      location: 'नयाँ बानेश्वर, काठमाडौं',
      description: 'बाथरूमको पाइप बिग्रिएको छ',
      price: 'NPR 800',
      time: '२ घण्टा अगाडि',
      urgent: true
    },
    {
      id: 2,
      service: 'इलेक्ट्रिकल मर्मत',
      customer: 'गीता श्रेष्ठ',
      location: 'भक्तपुर',
      description: 'बत्ती बलेको छैन',
      price: 'NPR 600',
      time: '४५ मिनेट अगाडि',
      urgent: false
    }
  ];

  const todayStats = {
    earnings: 2450,
    completedJobs: 3,
    rating: 4.8,
    responseRate: 95
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">नमस्कार, राम जी!</h1>
            <p className="text-red-100 text-sm">आजको कमाई: NPR {todayStats.earnings.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <div className="bg-red-700 p-2 rounded-full">
              <MapPin size={16} />
            </div>
          </div>
        </div>

        {/* Online Status Toggle */}
        <Card className="bg-red-700 border-0 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="font-semibold">
                {isOnline ? 'अनलाइन - काम लिन तयार' : 'अफलाइन'}
              </span>
            </div>
            <Switch
              checked={isOnline}
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-green-500"
            />
          </CardContent>
        </Card>
      </div>

      <div className="p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <DollarSign className="mx-auto mb-2 text-green-600" size={24} />
              <p className="text-2xl font-bold text-green-600">NPR {todayStats.earnings.toLocaleString()}</p>
              <p className="text-xs text-gray-500">आजको कमाई</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <CheckCircle className="mx-auto mb-2 text-blue-600" size={24} />
              <p className="text-2xl font-bold text-blue-600">{todayStats.completedJobs}</p>
              <p className="text-xs text-gray-500">पूरा काम</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="mx-auto mb-2 text-yellow-500 fill-current" size={24} />
              <p className="text-2xl font-bold text-yellow-600">{todayStats.rating}</p>
              <p className="text-xs text-gray-500">रेटिङ</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Clock className="mx-auto mb-2 text-purple-600" size={24} />
              <p className="text-2xl font-bold text-purple-600">{todayStats.responseRate}%</p>
              <p className="text-xs text-gray-500">प्रतिक्रिया दर</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>नयाँ अनुरोधहरू</span>
              <Badge variant="destructive">{pendingRequests.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className={`border-l-4 ${request.urgent ? 'border-l-red-500 bg-red-50' : 'border-l-blue-500 bg-blue-50'}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{request.service}</h4>
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">जरुरी</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{request.customer}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <MapPin size={12} />
                        {request.location}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{request.price}</p>
                      <p className="text-xs text-gray-500">{request.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      स्वीकार गर्नुहोस्
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      अस्वीकार
                    </Button>
                    <Button size="sm" variant="outline" className="px-3">
                      <Phone size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pendingRequests.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">कुनै नयाँ अनुरोध छैन</p>
                <p className="text-xs">No new requests available</p>
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
            <CheckCircle size={16} />
            <span className="text-xs">काम</span>
          </Button>
          <Button variant="ghost" className="flex flex-col gap-1 text-gray-500">
            <DollarSign size={16} />
            <span className="text-xs">कमाई</span>
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

export default ProviderDashboard;
