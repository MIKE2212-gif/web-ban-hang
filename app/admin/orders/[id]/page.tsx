import React from 'react';
import { useRouter } from 'next/router';

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // placeholder data
  const order = { id, items: [{ name: 'Product A', qty: 2, price: 25 }] };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order Details #{id}</h1>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.name} x{item.qty} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
