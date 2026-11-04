import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders'; // حسب مسار الـ Hook عندك
import { updateOrder, deleteOrder } from '../api/orderService'; // حسب مسار الـ service عندك
import type { Order } from '@/types';

export const ManageOrders = () => {
  const { orders, setOrders, loading, error } = useOrders();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleStatusChange = async (id: number, newStatus: Order['status']) => {
    try {
      setOrders(prev =>
        prev.map(order => (Number(order.id) === id ? { ...order, status: newStatus } : order))
      );
      
      await updateOrder(id, newStatus);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update order status');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setOrders(prev => prev.filter(order => Number(order.id) !== id));
      await deleteOrder(id);
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order');
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  if (loading) {
    return <div className="p-6 text-center font-primary text-onyxBlack bg-creamBlush min-h-screen">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600 font-primary bg-creamBlush min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-creamBlush min-h-screen font-primary text-onyxBlack">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-deep-ocean-blue)' }}>Manage Orders</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'preparing', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition border ${
              filterStatus === status
                ? 'text-white border-transparent'
                : 'bg-vanillaMist border-gray-300 text-onyxBlack hover:bg-opacity-80'
            }`}
            style={
              filterStatus === status
                ? { backgroundColor: 'var(--color-spicy-tangerine)' }
                : {}
            }
          >
            {status === 'all' ? 'All Orders' : status}
          </button>
        ))}
      </div>

      <div className="bg-vanillaMist rounded-xl shadow-md overflow-hidden border border-[var(--color-vanilla-mist)]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[var(--color-vanilla-mist)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-onyxBlack">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-onyxBlack">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-onyxBlack">Items</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-onyxBlack">Total</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-onyxBlack">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-onyxBlack">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-creamBlush divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  No orders found for status "{filterStatus}"
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-vanillaMist transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-onyxBlack">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-onyxBlack">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-onyxBlack">
                    <ul className="list-disc list-inside">
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          {item.menuItem.name} <span className="text-gray-500">({item.quantity}x)</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" style={{ color: 'var(--color-spicy-tangerine)' }}>
                    ${order.total?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'preparing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(Number(order.id), e.target.value as Order['status'])}
                      className="px-3 py-1.5 bg-creamBlush border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 text-xs font-semibold text-onyxBlack cursor-pointer"
                      style={{ '--tw-ring-color': 'var(--color-spicy-tangerine)' } as React.CSSProperties}
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(Number(order.id))}
                      className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};