import { Search, Calendar, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="text-yellow-600" size={32} />,
      title: "1. Browse & Search",
      description: "Find the perfect beauty professional based on services, location, and reviews"
    },
    {
      icon: <Calendar className="text-yellow-600" size={32} />,
      title: "2. Choose & Book",
      description: "Select your preferred time slot and book instantly with our easy scheduling system"
    },
    {
      icon: <CheckCircle className="text-yellow-600" size={32} />,
      title: "3. Enjoy & Pay",
      description: "Get your service done and pay securely through our platform"
    }
  ];

  return (
    <section className="py-16 bg-white rounded-2xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">Book your perfect beauty appointment in just 3 simple steps</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center group">
            <div className="bg-yellow-100 group-hover:bg-yellow-200 transition-colors w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}