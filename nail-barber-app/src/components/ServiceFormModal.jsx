// src/components/ServiceFormModal.jsx
import { useState, useEffect } from 'react';
import { createService, updateService } from '../api/services';
import { X, Save } from 'lucide-react';

export default function ServiceFormModal({ isOpen, onClose, onCreated, onUpdated, initialData }) {
  const [form, setForm] = useState({
    name: '', category: '', price: '', duration: '',
    description: '', image_url: '', popular: false,
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);
  if (!isOpen) return null;

  // Chuyển detail array/object từ FastAPI thành chuỗi
  const formatError = (detail) => {
    if (Array.isArray(detail)) {
      return detail.map(e => `${e.loc?.join('.')}: ${e.msg}`).join('; ');
    }
    if (typeof detail === 'string') {
      return detail;
    }
    return 'Failed to create';
  };

  const handleChange = (k) => (e) => {
    const v = k === 'popular' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [k]: v }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (initialData) {
        // edit
        const updated = await updateService(initialData.id, form);
        onUpdated(updated);
      } else {
        // create
        const created = await createService(form);
        onCreated(created);
      }
      onClose();
    } catch (err) {
      // Lấy detail từ response, format rồi setError
      const detail = err.response?.data?.detail;
      setError(formatError(detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">
          <X size={20}/>
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        {error && (
          <div className="text-red-600 mb-2 whitespace-pre-wrap">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Name"
            value={form.name}
            onChange={handleChange('name')}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={handleChange('category')}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={handleChange('price')}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange('duration')}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={handleChange('description')}
            className="w-full border rounded px-3 py-2"
          />
          <input
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange('image_url')}
            className="w-full border rounded px-3 py-2"
          />
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={handleChange('popular')}
            />
            Mark as Popular
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            <Save size={16}/> {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}
