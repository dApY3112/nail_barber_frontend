// src/pages/MyProviderPage.jsx
import React, { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2, List, Edit } from 'lucide-react';
import { getMyProvider } from '../api/providers';
import { Link, useNavigate  } from 'react-router-dom';
import { listMyServices, deleteService } from '../api/services';
import {
  listMyAvailability,
  createAvailability,
  deleteAvailability
} from '../api/availability';
const DayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
export default function MyProviderPage() {
  const navigate = useNavigate();                     
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [loadingSv, setLoadingSv] = useState(false);
  const [errorSv, setErrorSv] = useState(null);
    // Availability
  const [availabilities, setAvailabilities] = useState([]);
  const [loadingAvail, setLoadingAvail]     = useState(false);
  const [errorAvail, setErrorAvail]         = useState(null);
  const [showAvailForm, setShowAvailForm]   = useState(false);
  const [newAvail, setNewAvail] = useState({
    day_of_week: 0,
    start_time: '09:00:00',
    end_time:   '17:00:00'
  });
  useEffect(() => {
    async function load() {
      try {
        const data = await getMyProvider();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);
    useEffect(() => {
    if (!profile) return;
    async function loadAvail() {
      setLoadingAvail(true);
      try {
        const data = await listMyAvailability();
        setAvailabilities(data);
      } catch (err) {
        setErrorAvail(err.response?.data?.detail || 'Failed to load availability');
      } finally {
        setLoadingAvail(false);
      }
    }
    loadAvail();
  }, [profile]);
  useEffect(() => {
   // nothing
   if (!profile) return;
   async function loadSv() {
     setLoadingSv(true);
     try {
       const data = await listMyServices();
       setServices(data);
     } catch (err) {
       setErrorSv(err.response?.data?.detail || 'Failed to load services');
     } finally {
       setLoadingSv(false);
     }
   }
   loadSv();
  }, [profile]);
   const handleCreateAvail = async () => {
    try {
      const created = await createAvailability(newAvail);
      setAvailabilities(prev => [...prev, created]);
      setShowAvailForm(false);
    } catch (err) {
      alert(err.response?.data?.detail || 'Create availability failed');
    }
  };
    const handleDeleteAvail = async (id) => {
    if (!window.confirm('Delete this availability?')) return;
    try {
      await deleteAvailability(id);
      setAvailabilities(prev => prev.filter(a => a.id !== id));
    } catch {
      alert('Delete failed');
    }
  };
  if (!profile) {
    return <div className="text-center py-16">Loading your profile…</div>;
  }
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Provider Dashboard</h1>
        <div className="flex gap-2">
          <Link
            to="/providers/me/edit"
            className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            <Pencil size={16}/> Edit Profile
          </Link>
          <Link
            to="/providers/me/services"
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            <List size={16}/> Your Services
          </Link>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl">
          {profile.company_name.charAt(0)}
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-semibold">{profile.company_name}</h2>
          <p className="text-gray-600">{profile.description || 'No description yet.'}</p>
          <p className="text-gray-500">
            <span className="font-medium">Location:</span>{' '}
            {profile.city || '—'}, {profile.country || '—'}
          </p>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Your Availability</h2>
          <button
            onClick={() => setShowAvailForm(!showAvailForm)}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <Plus size={16}/> {showAvailForm ? 'Cancel' : 'Add Availability'}
          </button>
        </div>

        {/* Form Thêm Availability */}
        {showAvailForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex gap-2 items-center">
              <label className="w-24">Day:</label>
              <select
                className="flex-1 border rounded p-1"
                value={newAvail.day_of_week}
                onChange={e => setNewAvail(prev => ({
                  ...prev,
                  day_of_week: Number(e.target.value)
                }))}
              >
                {DayNames.map((d,i) => (
                  <option key={i} value={i}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label className="w-24">From:</label>
              <input
                type="time"
                className="flex-1 border rounded p-1"
                value={newAvail.start_time}
                onChange={e => setNewAvail(prev => ({
                  ...prev,
                  start_time: e.target.value
                }))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label className="w-24">To:</label>
              <input
                type="time"
                className="flex-1 border rounded p-1"
                value={newAvail.end_time}
                onChange={e => setNewAvail(prev => ({
                  ...prev,
                  end_time: e.target.value
                }))}
              />
            </div>
            <div className="text-right">
              <button
                onClick={handleCreateAvail}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >Save</button>
            </div>
          </div>
        )}

        {/* Danh sách Availability */}
        {loadingAvail ? (
          <div>Loading availability…</div>
        ) : errorAvail ? (
          <div className="text-red-600">{errorAvail}</div>
        ) : availabilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availabilities.map(a => (
              <div
                key={a.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <span>
                  <strong>{DayNames[a.day_of_week]}:</strong>{' '}
                  {a.start_time.slice(0,5)} – {a.end_time.slice(0,5)}
                </span>
                <button
                  onClick={() => handleDeleteAvail(a.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16}/>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven’t added any availability yet.</p>
        )}
      </div>

      {/* Services Section */}
      <div className="space-y-4">

      
     {/* Your Services embedded */}
     <div className="space-y-4">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-semibold">Your Services</h2>
       </div>

       {loadingSv ? (
         <div>Loading services…</div>
       ) : errorSv ? (
         <div className="text-red-600">{errorSv}</div>
       ) : services.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {services.map(svc => (
             <div key={svc.id} className="bg-white rounded-xl shadow p-6 relative group">
                {/* Thêm tên provider trên mỗi card */}
                <h3 className="text-xl font-semibold mb-2">{profile.company_name}</h3>
               <p className="text-gray-600 mb-4">
                 {svc.category} — ${svc.price} — {svc.duration} min
               </p>
               <p className="text-gray-700 mb-4 line-clamp-3">{svc.description}</p>
               <div className="absolute top-4 right-4 flex flex-col opacity-0 group-hover:opacity-100 transition">
                 <button
                   onClick={() => navigate(`/providers/me/services/${svc.id}/edit`)}
                   className="mb-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                 >
                   <Edit size={16}/>
                 </button>
                 <button
                   onClick={async () => {
                     if (!window.confirm('Delete this service?')) return;
                     await deleteService(svc.id);
                     setServices(prev => prev.filter(s => s.id !== svc.id));
                   }}
                   className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                 >
                   <Trash2 size={16} className="text-red-500"/>
                 </button>
               </div>
             </div>
           ))}
         </div>
       ) : (
         <p className="text-gray-600">You haven’t added any services yet.</p>
       )}
     </div>
        {/* If you have a services array in profile, map over it */}
        {profile.services && profile.services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.services.map(service => (
              <div 
                key={service.id} 
                className="bg-white shadow rounded-lg p-4 flex flex-col"
              >
              <p className="text-sm text-gray-500">Provider: {profile.company_name}</p>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-medium">{service.name}</h3>
                  <div className="flex gap-2">
                    <Link to={`/providers/me/services/${service.id}/edit`}>
                      <Pencil size={16} className="text-gray-500 hover:text-gray-700"/>
                    </Link>
                    <button onClick={() => {/* TODO: delete handler */}}>
                      <Trash2 size={16} className="text-red-500 hover:text-red-700"/>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-3">{service.description}</p>
                <div className="mt-auto pt-4 flex justify-between items-center text-gray-500 text-sm">
                  <span>Price: {service.price_range}</span>
                  <span>Duration: {service.duration} mins</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven’t added any services yet.</p>
        )}
      </div>
    </div>
  );
}
