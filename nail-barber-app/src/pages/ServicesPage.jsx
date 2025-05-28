import { useState } from 'react';
import { Search, Filter, Star, Clock, MapPin, Scissors, User, Palette, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: <Sparkles size={20} /> },
    { id: 'hair', name: 'Hair Services', icon: <Scissors size={20} /> },
    { id: 'nails', name: 'Nail Care', icon: <User size={20} /> },
    { id: 'color', name: 'Hair Coloring', icon: <Palette size={20} /> },
    { id: 'beard', name: 'Beard Care', icon: <Scissors size={20} /> }
  ];

  const services = [
    {
      id: 1,
      name: "Classic Haircut & Style",
      category: "hair",
      price: "$35-50",
      duration: "45 min",
      rating: 4.8,
      reviews: 124,
      description: "Professional haircut with styling, includes wash and blow dry",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 2,
      name: "Manicure & Polish",
      category: "nails",
      price: "$25-35",
      duration: "30 min",
      rating: 4.9,
      reviews: 89,
      description: "Complete nail care with cuticle treatment and polish application",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 3,
      name: "Beard Trim & Shape",
      category: "beard",
      price: "$20-30",
      duration: "25 min",
      rating: 4.7,
      reviews: 156,
      description: "Professional beard trimming and shaping with hot towel treatment",
      image: "/api/placeholder/300/200",
      popular: false
    },
    {
      id: 4,
      name: "Hair Color & Highlights",
      category: "color",
      price: "$80-120",
      duration: "2-3 hours",
      rating: 4.9,
      reviews: 67,
      description: "Full color service or highlights with premium products",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 5,
      name: "Gel Manicure",
      category: "nails",
      price: "$40-55",
      duration: "45 min",
      rating: 4.8,
      reviews: 203,
      description: "Long-lasting gel manicure with UV curing and perfect finish",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 6,
      name: "Facial Hair Design",
      category: "beard",
      price: "$30-45",
      duration: "40 min",
      rating: 4.6,
      reviews: 78,
      description: "Creative beard and mustache styling with precise line work",
      image: "/api/placeholder/300/200",
      popular: false
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Discover Amazing Services
            </h1>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Browse through our wide range of professional beauty and grooming services
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-3 flex items-center shadow-lg">
              <Search className="text-gray-400 mx-3" size={20} />
              <input
                type="text"
                placeholder="Search for services..."
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
              <span className="font-medium text-gray-900">Filter by category:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
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
            Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Service Image */}
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-bold text-gray-900">
                  {service.price}
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Service Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-medium text-gray-900">{service.rating}</span>
                    <span className="text-gray-500 text-sm">({service.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={16} />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-yellow-100 mb-6">Contact us and we'll help you find the perfect service provider</p>
          <button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
