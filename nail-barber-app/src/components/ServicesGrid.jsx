import { Scissors, User } from 'lucide-react';

export default function ServicesGrid() {
  const services = [
    { name: 'Hair Cut & Styling', icon: <Scissors size={32} />, count: '150+ providers' },
    { name: 'Nail Care', icon: <User size={32} />, count: '80+ providers' },
    { name: 'Beard Trimming', icon: <Scissors size={32} />, count: '90+ providers' },
    { name: 'Hair Coloring', icon: <Scissors size={32} />, count: '60+ providers' }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
        <p className="text-lg text-gray-600">Discover our most requested beauty and grooming services</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-yellow-300 transition-all duration-200 p-6 rounded-xl text-center group cursor-pointer">
            <div className="text-yellow-500 group-hover:text-yellow-600 mb-4 flex justify-center">
              {service.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}