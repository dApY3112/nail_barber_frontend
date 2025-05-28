import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Filter, Calendar, Scissors, User, Building, Award } from 'lucide-react';

// Mock data for providers
const mockProviders = [
  {
    id: 1,
    name: "Elite Nails & Spa",
    type: "nail",
    rating: 4.8,
    reviewCount: 127,
    location: "Downtown",
    address: "123 Main St",
    distance: "0.5 miles",
    image: "/api/placeholder/300/200",
    services: ["Manicure", "Pedicure", "Gel Polish", "Nail Art"],
    priceRange: "$$",
    availability: "Available Today",
    openHours: "9:00 AM - 7:00 PM",
    popular: true,
    description: "Premium nail salon offering luxury treatments with top-quality products"
  },
  {
    id: 2,
    name: "Classic Cuts Barbershop",
    type: "barber",
    rating: 4.9,
    reviewCount: 89,
    location: "Midtown",
    address: "456 Oak Ave",
    distance: "1.2 miles",
    image: "/api/placeholder/300/200",
    services: ["Haircut", "Beard Trim", "Hot Towel Shave", "Hair Styling"],
    priceRange: "$",
    availability: "Next available: Tomorrow 2:00 PM",
    openHours: "8:00 AM - 8:00 PM",
    popular: false,
    description: "Traditional barbershop experience with skilled professionals"
  },
  {
    id: 3,
    name: "Luxe Beauty Lounge",
    type: "nail",
    rating: 4.7,
    reviewCount: 203,
    location: "Uptown",
    address: "789 Pine St",
    distance: "2.1 miles",
    image: "/api/placeholder/300/200",
    services: ["Acrylic Nails", "Dip Powder", "Manicure", "Pedicure"],
    priceRange: "$$$",
    availability: "Available Today",
    openHours: "10:00 AM - 6:00 PM",
    popular: true,
    description: "High-end beauty lounge specializing in advanced nail techniques"
  },
  {
    id: 4,
    name: "The Gentleman's Den",
    type: "barber",
    rating: 4.6,
    reviewCount: 156,
    location: "Old Town",
    address: "321 Elm St",
    distance: "1.8 miles",
    image: "/api/placeholder/300/200",
    services: ["Classic Cut", "Fade", "Beard Styling", "Mustache Trim"],
    priceRange: "$$",
    availability: "Available Today",
    openHours: "9:00 AM - 7:00 PM",
    popular: false,
    description: "Classic gentleman's barbershop with vintage atmosphere"
  },
  {
    id: 5,
    name: "Nail Artistry Studio",
    type: "nail",
    rating: 4.9,
    reviewCount: 94,
    location: "Westside",
    address: "654 Maple Dr",
    distance: "3.0 miles",
    image: "/api/placeholder/300/200",
    services: ["Custom Nail Art", "Extensions", "Gel Manicure", "Pedicure"],
    priceRange: "$$$",
    availability: "Next available: Today 4:00 PM",
    openHours: "11:00 AM - 8:00 PM",
    popular: true,
    description: "Creative nail art studio with custom designs and premium services"
  },
  {
    id: 6,
    name: "Urban Fade Co.",
    type: "barber",
    rating: 4.8,
    reviewCount: 112,
    location: "Downtown",
    address: "987 Cedar St",
    distance: "0.8 miles",
    image: "/api/placeholder/300/200",
    services: ["Modern Cuts", "Skin Fade", "Beard Design", "Hair Wash"],
    priceRange: "$$",
    availability: "Available Today",
    openHours: "10:00 AM - 9:00 PM",
    popular: true,
    description: "Modern barbershop specializing in contemporary cuts and fades"
  }
];

export function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const categories = [
    { id: 'all', name: 'All Providers', icon: <Building size={20} /> },
    { id: 'nail', name: 'Nail Salons', icon: <User size={20} /> },
    { id: 'barber', name: 'Barbershops', icon: <Scissors size={20} /> }
  ];

  const filteredProviders = mockProviders
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          provider.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || provider.type === selectedType;
      const matchesPrice = selectedPrice === 'all' || provider.priceRange === selectedPrice;
      return matchesSearch && matchesType && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'price':
          return a.priceRange.length - b.priceRange.length;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Find Your Perfect Provider
            </h1>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Discover top-rated nail salons and barbershops in your area
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-3 flex items-center shadow-lg">
              <Search className="text-gray-400 mx-3" size={20} />
              <input
                type="text"
                placeholder="Search providers or services..."
                className="flex-1 outline-none text-gray-800 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">Filter by type:</span>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="$">$ - Budget</option>
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Premium</option>
              </select>
              
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedType(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedType === category.id
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
            {selectedType !== 'all' && ` in ${categories.find(c => c.id === selectedType)?.name}`}
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Provider Image */}
              <div className="relative">
                <img 
                  src={provider.image} 
                  alt={provider.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {provider.popular && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Award size={14} />
                    Popular
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-bold text-gray-900">
                  {provider.priceRange}
                </div>
              </div>

              {/* Provider Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {provider.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {provider.description}
                </p>

                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-medium text-gray-900">{provider.rating}</span>
                    <span className="text-gray-500 text-sm">({provider.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin size={16} />
                    <span className="text-sm">{provider.distance}</span>
                  </div>
                </div>

                {/* Hours and Availability */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{provider.openHours}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    provider.availability.includes('Available Today') 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {provider.availability}
                  </span>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {provider.services.slice(0, 3).map(service => (
                      <span key={service} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                    {provider.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{provider.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Want to become a provider?</h2>
          <p className="text-yellow-100 mb-6">Join our network of professional beauty and grooming service providers</p>
          <button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProvidersPage;