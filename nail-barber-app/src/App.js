import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProvidersPage from './pages/ProvidersPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch(activeTab) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'providers':
        return <ProvidersPage />;
      case 'about':
        return <AboutPage />;
      case 'profile':
        return <ProfilePage/>
      case 'signin':
        return <SignInPage/>
      case 'signup':
        return <SignUpPage/>
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}