import { useState, useEffect } from 'react';
import { listUserTransactions } from '../api/transactions';
import { fetchBooking } from '../api/bookings';
import { fetchService } from '../api/services';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const txs = await listUserTransactions();
      // map mỗi tx thành { tx, serviceName }
      const enriched = await Promise.all(
        txs.map(async tx => {
          const b = await fetchBooking(tx.booking_id);
          const s = await fetchService(b.service_id);
          return { ...tx, serviceName: s.name };
        })
      );
      setRows(enriched);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading…</div>;
  return (
    <ul className="space-y-4">
      {rows.map(tx => (
        <li key={tx.id} className="flex justify-between items-center p-4 bg-white shadow rounded">
          <div>
            <p className="font-medium">{tx.serviceName}</p>
            <p className="text-sm">
              Amount: ${tx.amount} | Status: <span
                className={
                  tx.status === 'succeeded' ? 'text-green-600' :
                  tx.status === 'failed'    ? 'text-red-600'   :
                                              'text-yellow-600'
                }
              >
                {tx.status}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate(`/transactions/${tx.id}`)}
            className="text-yellow-500 hover:underline"
          >
            Details →
          </button>
        </li>
      ))}
    </ul>
  );
}
