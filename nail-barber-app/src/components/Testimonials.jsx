import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: "Marketing Manager",
      rating: 5,
      review: "Amazing experience! The barber was incredibly professional and gave me exactly the haircut I wanted. The booking process was so smooth.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Daniel Mitchell",
      role: "Software Engineer",
      rating: 5,
      review: "I booked a nail appointment through the platform and was blown away by the quality of service. Highly recommend this platform!",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Sofia Chen",
      role: "Designer",
      rating: 5,
      review: "The convenience of booking from home and the quality of professionals available is outstanding. Will definitely use again!",
      image: "/api/placeholder/60/60"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
        <p className="text-lg text-gray-600">Real reviews from satisfied customers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={16} />
              ))}
            </div>
            <p className="text-gray-700">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}