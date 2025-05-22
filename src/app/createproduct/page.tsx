'use client'
import { useState, useEffect } from 'react';

export default function CreateProductPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [chip, setChip] = useState('');
  const [support, setSupport] = useState('');
  const [tops, setTops] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [downloadUrl, setdownloadUrl] = useState('');
  const [detailPage, setdetailPage] = useState('');

  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/product');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      // Silent error handling
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setCreating(true);
    setError(false);
    setCreated(false);

    const supportArray = support.split(',').map(s => s.trim()).filter(Boolean);

    const body = {
      name,
      imageUrl,
      description,
      chip,
      support: supportArray,
      tops,
      category,
      platform,
      downloadUrl,
      detailPage,
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`/api/product?id=${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        response = await fetch('/api/product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      if (response.ok) {
        setCreated(true);
        resetForm();
        fetchProducts();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }

    setCreating(false);
  }

  function resetForm() {
    setName('');
    setImageUrl('');
    setDescription('');
    setChip('');
    setSupport('');
    setTops('');
    setCategory('');
    setPlatform('');
    setdownloadUrl('');
    setdetailPage('');
    setEditingId(null);
    setIsEditing(false);
  }

  function handleEdit(prod) {
    setEditingId(prod._id);
    setName(prod.name || '');
    setImageUrl(prod.imageUrl || '');
    setDescription(prod.description || '');
    setChip(prod.chip || '');
    setSupport((prod.support || []).join(', '));
    setTops(prod.tops || '');
    setCategory(prod.category || '');
    setPlatform(prod.platform || '');
    setdownloadUrl(prod.downloadUrl || '');
    setdetailPage(prod.detailPage || '');
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(productId) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/product?id=${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      alert("An error occurred while deleting.");
    }
  }

  return (
    <section className="mt-12 max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-2xl">
      <h1 className="text-center text-3xl font-bold text-primary mb-6">
        {isEditing ? 'Edit Product' : 'Create New Product'}
      </h1>

      {(created && !isEditing) && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg text-center">
          ✅ Product created successfully!
        </div>
      )}
      {(created && isEditing) && (
        <div className="mb-4 p-3 text-blue-700 bg-blue-100 rounded-lg text-center">
          ✏️ Product updated successfully!
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg text-center">
          ❌ Failed to {isEditing ? 'update' : 'create'} product. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Product Name" value={name} disabled={creating}
          onChange={e => setName(e.target.value)} required className="w-full border rounded-xl p-3" />

        <input type="text" placeholder="Image URL" value={imageUrl} disabled={creating}
          onChange={e => setImageUrl(e.target.value)} required className="w-full border rounded-xl p-3" />

        {imageUrl && (
          <div className="w-full mb-2">
            <img src={imageUrl} alt="Preview" className="max-h-48 object-contain rounded mx-auto" />
          </div>
        )}

        <textarea placeholder="Description" value={description} disabled={creating}
          onChange={e => setDescription(e.target.value)} rows={4} required className="w-full border rounded-xl p-3" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Chip" value={chip} disabled={creating}
            onChange={e => setChip(e.target.value)} className="border rounded-xl p-3 w-full" />
          <input type="text" placeholder="Support (comma separated)" value={support} disabled={creating}
            onChange={e => setSupport(e.target.value)} className="border rounded-xl p-3 w-full" />
          <input type="number" placeholder="TOPS" value={tops} disabled={creating}
            onChange={e => setTops(e.target.value)} min={0} className="border rounded-xl p-3 w-full" />
          <input type="text" placeholder="Category" value={category} disabled={creating}
            onChange={e => setCategory(e.target.value)} className="border rounded-xl p-3 w-full" />
          <input type="text" placeholder="Platform" value={platform} disabled={creating}
            onChange={e => setPlatform(e.target.value)} className="border rounded-xl p-3 w-full" />
          <input type="text" placeholder="User Manual Download URL" value={downloadUrl} disabled={creating}
            onChange={e => setdownloadUrl(e.target.value)} className="border rounded-xl p-3 w-full" />
          <input type="text" placeholder="Detail Page" value={detailPage} disabled={creating}
            onChange={e => setdetailPage(e.target.value)} className="border rounded-xl p-3 w-full" />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={creating}
            className="w-full text-white bg-primary hover:bg-opacity-90 transition px-6 py-3 rounded-xl font-semibold">
            {creating ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Product' : 'Create Product')}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="px-6 py-3 bg-gray-300 rounded-xl font-semibold">
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">All Products</h2>
        {products.length === 0 && <p className="text-center text-gray-500">No products found.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(prod => (
            <div key={prod._id} className="border rounded-xl p-4 shadow hover:shadow-md transition relative">
              {prod.imageUrl && (
                <img src={prod.imageUrl} alt={prod.name}
                  className="mb-4 w-full max-h-48 object-contain rounded" />
              )}
              <h3 className="text-lg font-bold mb-2">{prod.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{prod.description}</p>
              <ul className="text-sm text-gray-800 space-y-1 mb-4">
                <li><strong>Chip:</strong> {prod.chip}</li>
                <li><strong>Support:</strong> {prod.support?.join(', ')}</li>
                <li><strong>TOPS:</strong> {prod.tops}</li>
                <li><strong>Category:</strong> {prod.category}</li>
                <li><strong>Platform:</strong> {prod.platform}</li>
                <li><strong>User Manual Download URL:</strong> {prod.downloadUrl}</li>
                <li><strong>Detail Page:</strong> {prod.detailPage}</li>
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
