import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-16">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
        <p className="text-xl text-yellow-100 mb-8">Whether you're looking for services or want to offer them</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Book a Service
          </Link>
          <Link
            to="/providers"
            className="bg-yellow-700 hover:bg-yellow-800 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Become a Provider
          </Link>
        </div>
      </div>
    </section>
  );
}