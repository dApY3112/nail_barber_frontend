// src/pages/MyServicesPage.jsx
import { useState, useEffect } from 'react';
import {
  Search, Star, Clock,
  Scissors, User, Palette, Trash2, Edit, Plus
} from 'lucide-react';
import {
  listMyServices,
  deleteService
} from '../api/services';
import ServiceFormModal from '../components/ServiceFormModal';

export default function MyServicesPage() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  // modal add/edit
  const [isModalOpen, setModalOpen]     = useState(false);
  const [editingSvc,  setEditingSvc]    = useState(null);

  // fetch once on mount (or after any change)
  const fetchMy = async () => {
    setLoading(true);
    try {
      const data = await listMyServices();
      setServices(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load your services');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchMy(); }, []);

  const handleCreated = (newSvc) => {
    setServices(prev => [ newSvc, ...prev ]);
  };
  const handleUpdated = (upd) => {
    setServices(prev => prev.map(s => s.id === upd.id ? upd : s));
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Services</h1>
        <button
          onClick={() => { setEditingSvc(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          <Plus size={16}/> Add Service
        </button>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(svc => (
            <div key={svc.id} className="bg-white rounded-xl shadow p-6 relative group">
              <h2 className="text-xl font-semibold mb-2">{svc.name}</h2>
              <p className="text-gray-600 mb-4">{svc.category} — ${svc.price} — {svc.duration} min</p>
              <div className="flex items-center gap-4 mb-4">
                <Star size={16} className="text-yellow-400 fill-current"/>
                <span>{svc.rating.toFixed(1)} ({svc.reviews_count})</span>
              </div>
              <p className="text-gray-700 mb-6 line-clamp-3">{svc.description}</p>
              {/* edit/delete buttons */}
              <div className="absolute top-4 right-4 flex flex-col opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => { setEditingSvc(svc); setModalOpen(true); }}
                  className="mb-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <Edit size={16}/>
                </button>
                <button
                  onClick={() => handleDelete(svc.id)}
                  className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <Trash2 size={16} className="text-red-500"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
        onUpdated={handleUpdated}
        initialData={editingSvc}
      />
    </div>
  );
}
