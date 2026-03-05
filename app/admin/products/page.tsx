import React from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  // Placeholder list
  const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Link href="/admin/products/0" className="text-blue-500 underline">
        Add new product
      </Link>
      <ul className="mt-4 space-y-2">
        {products.map(p => (
          <li key={p.id}>
            <Link href={`/admin/products/${p.id}`}> {p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
