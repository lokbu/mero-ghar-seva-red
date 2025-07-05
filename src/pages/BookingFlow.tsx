
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, MapPin, Clock, DollarSign, User, Phone, Calendar as CalendarIcon } from 'lucide-react';

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    additionalNotes: ''
  });

  const timeSlots = [
    '८:००', '९:००', '१०:००', '११:००', 
    '१२:००', '१:००', '२:००', '३:००', 
    '४:००', '५:००', '६:००'
  ];

  const serviceDetails = {
    name: 'प्लम्बिङ सेवा',
    provider: 'राम बहादुर श्रेष्ठ',
    rating: 4.9,
    price: 800,
    estimatedTime: '१-२ घण्टा'
  };

  const steps = [
    { id: 1, title: 'विवरण', titleEn: 'Description' },
    { id: 2, title: 'समय', titleEn: 'Time' },
    { id: 3, title: 'जानकारी', titleEn: 'Details' },
    { id: 4, title: 'पुष्टि', titleEn: 'Confirm' }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-6 px-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep >= step.id 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {step.id}
          </div>
          <div className="ml-2">
            <p className={`text-xs font-medium ${currentStep >= step.id ? 'text-red-600' : 'text-gray-500'}`}>
              {step.title}
            </p>
            <p className="text-xs text-gray-400">{step.titleEn}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 ${
              currentStep > step.id ? 'bg-red-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>कामको विवरण</span>
          <Badge variant="outline">Step 1</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">के समस्या छ? / What's the problem?</Label>
          <Textarea
            id="description"
            placeholder="उदाहरण: बाथरूमको नल चुहिरहेको छ, पाइप फुटेको छ..."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={4}
            className="mt-2"
          />
        </div>
        
        {/* Quick Options */}
        <div>
          <Label>छिटो छनोट / Quick Options</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['नल मर्मत', 'पाइप फुटेको', 'पानी चुहावट', 'ड्रेनेज समस्या'].map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                onClick={() => setTaskDescription(option)}
                className="text-xs"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon size={20} />
            <span>मिति छान्नुहोस्</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border mx-auto"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            <span>समय छान्नुहोस्</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className={selectedTime === time ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {time}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={20} />
          <span>सम्पर्क जानकारी</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">नाम / Name</Label>
          <Input
            id="name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            placeholder="तपाईंको पूरा नाम"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">फोन नम्बर / Phone</Label>
          <div className="flex">
            <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 text-sm">+977</div>
            <Input
              id="phone"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              placeholder="98XXXXXXXX"
              className="rounded-l-none border-l-0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">ठेगाना / Address</Label>
          <Textarea
            id="address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
            placeholder="तपाईंको पूरा ठेगाना..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="notes">थप टिप्पणी / Additional Notes</Label>
          <Textarea
            id="notes"
            value={customerInfo.additionalNotes}
            onChange={(e) => setCustomerInfo({...customerInfo, additionalNotes: e.target.value})}
            placeholder="कुनै विशेष निर्देशन..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      {/* Service Summary */}
      <Card>
        <CardHeader>
          <CardTitle>सेवा सारांश</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">सेवा:</span>
            <span className="font-semibold">{serviceDetails.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">सेवाप्रदायक:</span>
            <span className="font-semibold">{serviceDetails.provider}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">मिति र समय:</span>
            <span className="font-semibold">
              {selectedDate?.toLocaleDateString('ne-NP')} • {selectedTime}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">अनुमानित समय:</span>
            <span className="font-semibold">{serviceDetails.estimatedTime}</span>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign size={20} />
            <span>मूल्य विवरण</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">सेवा शुल्क:</span>
            <span>NPR {serviceDetails.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">प्लेटफर्म शुल्क:</span>
            <span>NPR 50</span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-bold">
            <span>कुल रकम:</span>
            <span className="text-red-600">NPR {serviceDetails.price + 50}</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={20} />
            <span>सम्पर्क विवरण</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>नाम:</strong> {customerInfo.name}</p>
          <p><strong>फोन:</strong> +977-{customerInfo.phone}</p>
          <p><strong>ठेगाना:</strong> {customerInfo.address}</p>
          {customerInfo.additionalNotes && (
            <p><strong>टिप्पणी:</strong> {customerInfo.additionalNotes}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-red-700 p-1"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : null}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">सेवा बुकिङ</h1>
            <p className="text-red-100 text-sm">Service Booking</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <div className="mb-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              पछाडि / Back
            </Button>
          )}
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={() => {
              if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
              } else {
                // Handle booking confirmation
                console.log('Booking confirmed!');
              }
            }}
          >
            {currentStep === 4 ? 'बुकिङ पुष्टि गर्नुहोस्' : 'अगाडि / Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
