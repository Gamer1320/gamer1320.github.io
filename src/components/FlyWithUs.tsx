import React, { useState } from 'react';
import { Calendar, MapPin, Users, CreditCard, Check } from 'lucide-react';


const FlyWithUs: React.FC = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1',
    class: 'economy',
  });

  const destinations = ['London', 'Barcelona', 'Helsinki', 'Limassol', 'Santo Domingo'];
  const classes = [
    { id: 'economy', name: 'Economy', price: 'from $599', features: ['Standard seat', '23kg baggage', 'Meal included'] },
    { id: 'business', name: 'Business', price: 'from $1,999', features: ['Lie-flat seat', '32kg baggage', 'Premium dining'] },
    { id: 'first', name: 'First Class', price: 'from $4,999', features: ['Private suite', '50kg baggage', 'Gourmet cuisine'] },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
  };

  const handlePrevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Fly with Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book your premium travel experience with Qatar Airways. Exceptional service awaits at every step of your journey.
          </p>
        </div>

        {/* Booking Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= bookingStep
                      ? 'bg-red-800 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < bookingStep ? <Check className="h-6 w-6" /> : step}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {step === 1 ? 'Flight Details' : step === 2 ? 'Class Selection' : 'Booking'}
                </span>
                {step < 3 && (
                  <div className="hidden md:block w-16 h-0.5 bg-gray-200 ml-4">
                    <div
                      className={`h-full bg-red-800 transition-all duration-300 ${
                        step < bookingStep ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {bookingStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Flight Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    From
                  </label>
                  <select
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select departure city</option>
                    <option value="doha">Doha (DOH)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    To
                  </label>
                  <select
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest.toLowerCase()}>
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={formData.departure}
                    onChange={(e) => handleInputChange('departure', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={formData.return}
                    onChange={(e) => handleInputChange('return', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Passengers
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {bookingStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Class</h2>
              <div className="grid gap-6">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.class === cls.id
                        ? 'border-red-800 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => handleInputChange('class', cls.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{cls.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {cls.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-800">{cls.price}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Route:</strong> Doha → {formData.to}</div>
                  <div><strong>Passengers:</strong> {formData.passengers}</div>
                  <div><strong>Departure:</strong> {formData.departure}</div>
                  <div><strong>Return:</strong> {formData.return}</div>
                  <div><strong>Class:</strong> {classes.find(c => c.id === formData.class)?.name}</div>
                  <div><strong>Total:</strong> <span className="text-red-800 font-bold">$1,299</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-600">Secure payment processing with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                bookingStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={bookingStep === 1}
            >
              Previous
            </button>

            <button
              onClick={bookingStep === 3 ? () => alert('Booking completed!') : handleNextStep}
              className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              {bookingStep === 3 ? 'Complete Booking' : 'Next Step'}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-red-800" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
            <p className="text-gray-600 text-sm">Find a lower price? We'll match it and give you 10% off.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-red-800" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Booking</h3>
            <p className="text-gray-600 text-sm">Change or cancel your flight up to 24 hours before departure.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-red-800" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Your payment information is protected with industry-leading security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyWithUs;