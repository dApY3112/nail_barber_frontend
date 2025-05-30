import React, { useState } from 'react';

export default function BookingModal({ service, provider, availability, onClose, onConfirm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const today = new Date().toISOString().split('T')[0];

  // Lấy slot availability cho ngày đã chọn
  const getAvailableSlots = () => {
    if (!date) return [];
    const selectedDate = new Date(date);
    const jsDow = selectedDate.getDay();
    const pyDow = jsDow === 0 ? 6 : jsDow - 1;
    return availability.filter(a => a.day_of_week === pyDow);
  };

  const availableSlots = getAvailableSlots();

  const handleConfirm = () => {
    if (!date || !time) return;
    const [startStr, endStr] = time.split('|');
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);

    const start = new Date(date);
    start.setHours(sh, sm, 0, 0);

    const end = new Date(date);
    end.setHours(eh, em, 0, 0);

    onConfirm({
      service_id: service.id,
      start_datetime: start.toISOString(),
      end_datetime: end.toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          Book <span className="text-yellow-600">{service.name}</span> at {provider.company_name}
        </h2>
        {/* Chọn ngày */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Choose Date</label>
          <input
            type="date"
            value={date}
            onChange={e => { setDate(e.target.value); setTime(''); }}
            min={today}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        {/* Chọn slot */}
        {date && (
          availableSlots.length > 0 ? (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Choose Time Slot</label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">--Select Time--</option>
                {availableSlots.map(slot => (
                  <option key={slot.id} value={`${slot.start_time}|${slot.end_time}`}>
                    {slot.start_time.slice(0,5)} – {slot.end_time.slice(0,5)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-red-500 text-sm mb-4">
              No time slots available on this date.
            </p>
          )
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!date || !time}
            onClick={handleConfirm}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
