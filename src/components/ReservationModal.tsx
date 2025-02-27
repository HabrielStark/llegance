import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, ChevronDown, ChevronUp, Check } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TimeSlot = {
  time: string;
  available: boolean;
};

type ReservationData = {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
};

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [guestCount, setGuestCount] = useState(2);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Generate available dates (next 30 days)
  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Mondays (restaurant closed)
      if (date.getDay() !== 1) {
        const formattedDate = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        dates.push(formattedDate);
      }
    }
    
    setAvailableDates(dates);
  }, []);

  // Generate time slots based on selected date
  useEffect(() => {
    if (selectedDate) {
      // In a real app, this would come from an API
      const slots: TimeSlot[] = [
        { time: '6:00 PM', available: true },
        { time: '6:30 PM', available: true },
        { time: '7:00 PM', available: false },
        { time: '7:30 PM', available: true },
        { time: '8:00 PM', available: true },
        { time: '8:30 PM', available: false },
        { time: '9:00 PM', available: true },
        { time: '9:30 PM', available: true },
        { time: '10:00 PM', available: true },
        { time: '10:30 PM', available: true }
      ];
      
      setAvailableTimeSlots(slots);
    }
  }, [selectedDate]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSelectedDate('');
        setSelectedTime('');
        setGuestCount(2);
        setFormData({
          name: '',
          email: '',
          phone: '',
          specialRequests: ''
        });
        setIsSuccess(false);
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleGuestChange = (count: number) => {
    setGuestCount(count);
    setShowGuestDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const reservationData: ReservationData = {
        date: selectedDate,
        time: selectedTime,
        guests: guestCount,
        ...formData
      };
      
      console.log('Reservation submitted:', reservationData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleNextStep = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div 
          className={`inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-amber-300/20 ${
            isOpen ? 'opacity-100 translate-y-0 sm:scale-100' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-black border-b border-amber-300/20">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-light text-white tracking-wider">
                {isSuccess ? 'Reservation Confirmed' : 'Reserve Your Table'}
              </h3>
              <button
                className="text-gray-400 hover:text-amber-300 transition-colors"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-300/20 mb-4">
                  <Check className="h-6 w-6 text-amber-300" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Reservation Confirmed</h3>
                <p className="text-gray-300 mb-6">
                  Thank you for choosing L'Élégance. We look forward to serving you on {selectedDate} at {selectedTime}.
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  A confirmation has been sent to your email address.
                </p>
                <button
                  className="px-6 py-2 bg-transparent border border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-all duration-300 rounded"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-amber-300 text-black' : 'bg-amber-300/20 text-white'}`}>
                    1
                  </div>
                  <div className={`w-16 h-0.5 ${step === 1 ? 'bg-amber-300/30' : 'bg-amber-300'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-amber-300 text-black' : 'bg-amber-300/20 text-white'}`}>
                    2
                  </div>
                </div>

                {step === 1 ? (
                  /* Step 1: Select Date, Time, Guests */
                  <div>
                    {/* Date Selection */}
                    <div className="mb-6">
                      <label className="block text-white text-sm font-medium mb-2 flex items-center">
                        <Calendar className="mr-2 text-amber-300" size={16} />
                        Select Date
                      </label>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {availableDates.map((date, index) => (
                          <button
                            key={index}
                            className={`py-2 px-3 rounded text-sm ${
                              selectedDate === date
                                ? 'bg-amber-300 text-black'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                            onClick={() => handleDateSelect(date)}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div className="mb-6">
                        <label className="block text-white text-sm font-medium mb-2 flex items-center">
                          <Clock className="mr-2 text-amber-300" size={16} />
                          Select Time
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {availableTimeSlots.map((slot, index) => (
                            <button
                              key={index}
                              className={`py-2 px-2 rounded text-sm ${
                                !slot.available
                                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                  : selectedTime === slot.time
                                  ? 'bg-amber-300 text-black'
                                  : 'bg-gray-800 text-white hover:bg-gray-700'
                              }`}
                              onClick={() => slot.available && handleTimeSelect(slot.time)}
                              disabled={!slot.available}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guest Selection */}
                    {selectedDate && selectedTime && (
                      <div className="mb-6">
                        <label className="block text-white text-sm font-medium mb-2 flex items-center">
                          <Users className="mr-2 text-amber-300" size={16} />
                          Number of Guests
                        </label>
                        <div className="relative">
                          <button
                            className="w-full py-2 px-3 bg-gray-800 rounded text-white flex items-center justify-between"
                            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                          >
                            <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                            {showGuestDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          
                          {showGuestDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded shadow-lg z-10">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <button
                                  key={num}
                                  className={`w-full py-2 px-3 text-left hover:bg-gray-700 ${
                                    guestCount === num ? 'bg-gray-700' : ''
                                  }`}
                                  onClick={() => handleGuestChange(num)}
                                >
                                  {num} {num === 1 ? 'Guest' : 'Guests'}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Step 2: Contact Information */
                  <div>
                    <div className="mb-6">
                      <h4 className="text-white text-sm font-medium mb-4">Reservation Details</h4>
                      <div className="bg-gray-800 rounded p-3 mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Time:</span>
                          <span className="text-white">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Guests:</span>
                          <span className="text-white">{guestCount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full py-2 px-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-1 focus:ring-amber-300 ${
                          errors.name ? 'border border-red-500' : ''
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full py-2 px-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-1 focus:ring-amber-300 ${
                          errors.email ? 'border border-red-500' : ''
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full py-2 px-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-1 focus:ring-amber-300 ${
                          errors.phone ? 'border border-red-500' : ''
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-1 focus:ring-amber-300 h-24 resize-none"
                        placeholder="Allergies, special occasions, seating preferences..."
                      ></textarea>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="px-6 py-4 bg-black border-t border-amber-300/20 flex justify-between">
              {step === 1 ? (
                <>
                  <button
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-6 py-2 rounded ${
                      selectedDate && selectedTime
                        ? 'bg-amber-300 text-black hover:bg-amber-400'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={handlePrevStep}
                  >
                    Back
                  </button>
                  <button
                    className={`px-6 py-2 rounded ${
                      isSubmitting
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-300 text-black hover:bg-amber-400'
                    }`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;