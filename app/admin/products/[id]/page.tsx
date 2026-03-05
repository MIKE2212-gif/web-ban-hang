import React from 'react';
import { useRouter } from 'next/router';

export default function ProductFormPage() {
  const router = useRouter();
  const { id } = router.query;

  const isNew = id === '0' || id === undefined;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{isNew ? 'Add' : 'Edit'} Product</h1>
      <form>
        <div className="mb-4">
          <label className="block">Name</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block">Price</label>
          <input type="number" className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}
