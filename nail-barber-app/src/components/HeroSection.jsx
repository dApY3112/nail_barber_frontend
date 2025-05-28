import { useState } from 'react';
import { Search, MapPin, Star, Award, Calendar, Scissors, User, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const quickServices = [
    { name: 'Haircut', icon: <Scissors size={16} /> },
    { name: 'Manicure', icon: <User size={16} /> },
    { name: 'Beard Trim', icon: <Scissors size={16} /> },
    { name: 'Nail Art', icon: <Sparkles size={16} /> }
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-yellow-200">
              <Award className="text-yellow-500" size={16} />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ customers</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Book Talented 
                <span className="relative">
                  <span className="text-yellow-500"> Barbers & Nail</span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200 opacity-30 rounded"></div>
                </span>
                <br />
                Technicians Near You
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Connect with trusted freelance beauty professionals. Flexible appointments, instant booking, quality guaranteed.
              </p>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-4">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="What service are you looking for?"
                    className="flex-1 outline-none text-gray-800 bg-transparent placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-4 sm:w-48">
                  <MapPin className="text-gray-400 mr-3" size={16} />
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="outline-none text-gray-800 bg-transparent placeholder-gray-500 w-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Search
                </button>
              </div>
            </div>

            {/* Quick service tags */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Popular services:</p>
              <div className="flex flex-wrap gap-2">
                {quickServices.map((service, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 bg-white hover:bg-yellow-50 border border-gray-200 hover:border-yellow-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-md"
                  >
                    {service.icon}
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">10k+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-3xl font-bold text-gray-900">4.9</span>
                  <Star className="text-yellow-400 fill-current ml-1" size={20} />
                </div>
                <div className="text-sm text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Enhanced visual */}
          
        </div>
      </div>
    </section>
  );
}