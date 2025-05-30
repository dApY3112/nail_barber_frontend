// src/pages/EditProviderPage.jsx
import React, { useState, useEffect } from 'react';
import { getMyProvider, updateProvider } from '../api/providers';
import { useNavigate } from 'react-router-dom';

export default function EditProviderPage() {
  const [form, setForm]         = useState({
    company_name: '',
    description: '',
    city: '',
    country: ''
  });
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  // 1) Load profile hiện tại
  useEffect(() => {
    async function load() {
      try {
        const data = await getMyProvider();
        setForm({
          company_name: data.company_name || '',
          description:  data.description  || '',
          city:         data.city         || '',
          country:      data.country      || ''
        });
      } catch (err) {
        setError('Không thể load profile');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const onChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await updateProvider(form);
      navigate('/providers/me');
    } catch (err) {
      setError(err.response?.data?.detail || 'Cập nhật thất bại');
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading…</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow my-12">
      <h2 className="text-2xl font-bold mb-6">Edit Provider Profile</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Company Name</span>
          <input
            name="company_name"
            value={form.company_name}
            onChange={onChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="mt-1 block w-full border rounded p-2"
            rows={4}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">City</span>
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Country</span>
          <input
            name="country"
            value={form.country}
            onChange={onChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/providers/me')}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
