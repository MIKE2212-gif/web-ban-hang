import React from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const orders = [
    { id: 101, total: 49.99 },
    { id: 102, total: 129.0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <ul className="space-y-2">
        {orders.map(o => (
          <li key={o.id}>
            <Link href={`/admin/orders/${o.id}`}>Order #{o.id} - ${o.total}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
