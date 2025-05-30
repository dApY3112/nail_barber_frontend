// src/pages/TransactionDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTransaction, updateTransactionStatus } from '../api/transactions';

export default function TransactionDetailPage() {
  const { transactionId } = useParams();
  const [tx, setTx]         = useState(null);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy]     = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTransaction(transactionId);
        setTx(data);
      } catch (err) {
        setError('Không lấy được transaction: ' + (err.response?.data?.detail || err.message));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [transactionId]);

  const handleStatus = async newStatus => {
    setBusy(true);
    setError('');
    try {
      const updated = await updateTransactionStatus(transactionId, newStatus);
      setTx(updated);
    } catch (err) {
      setError('Cập nhật thất bại: ' + (err.response?.data?.detail || err.message));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="p-6">Loading transaction…</div>;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;
  if (!tx)     return null;

  const isPending = tx.status === 'pending';

  return (
    <div className="max-w-md mx-auto py-12 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Transaction #{tx.id}</h1>
      <p>
        Status:{' '}
        <strong
          className={
            tx.status === 'succeeded'
              ? 'text-green-600'
              : tx.status === 'failed'
              ? 'text-red-600'
              : 'text-yellow-600'
          }
        >
          {tx.status}
        </strong>
      </p>
      <p>Amount: ${tx.amount} {tx.currency}</p>
      <p>Method: {tx.payment_method}</p>
      <p>Created: {new Date(tx.created_at).toLocaleString()}</p>

      {/* Nếu đang pending thì mới cho đổi trạng thái */}
      {isPending && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleStatus('failed')}
            disabled={busy}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg disabled:opacity-50 transition-colors"
          >
            {busy ? 'Processing…' : 'Cancel'}
          </button>
          <button
            onClick={() => handleStatus('succeeded')}
            disabled={busy}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg disabled:opacity-50 transition-colors"
          >
            {busy ? 'Processing…' : 'Complete'}
          </button>
        </div>
      )}
      {/* Nếu đã không còn pending thì ẩn 2 nút */}
    </div>
  );
}
