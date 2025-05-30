import React, { useState } from 'react';
import { createProvider } from '../api/providers';
import { useNavigate } from 'react-router-dom';

export default function RegisterProvider() {
  const [form, setForm] = useState({
    company_name: '',
    description: '',
    city: '',
    country: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await createProvider(form);
      // chuyển sang trang danh sách services hoặc dashboard provider
      navigate('/provider/services');
    } catch (err) {
      setError(err.response?.data?.detail || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Đăng ký làm Provider</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="company_name"
          value={form.company_name}
          onChange={onChange}
          placeholder="Tên công ty"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Giới thiệu"
          className="w-full p-2 border rounded"
        />
        <input
          name="city"
          value={form.city}
          onChange={onChange}
          placeholder="Thành phố"
          className="w-full p-2 border rounded"
        />
        <input
          name="country"
          value={form.country}
          onChange={onChange}
          placeholder="Quốc gia"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-white rounded"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
