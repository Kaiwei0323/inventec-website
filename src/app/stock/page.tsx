'use client';
import { useState, useEffect } from "react";

interface StockItem {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  createdAt: string;
}

function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  itemName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Delete Stock Item</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete &quot;{itemName}&quot;? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function StockOverview({ onStockChange }: { onStockChange: () => void }) {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<StockItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [editError, setEditError] = useState('');

  async function fetchStocks() {
    try {
      const res = await fetch('/api/stock');
      if (!res.ok) throw new Error('Failed to fetch stocks');
      const data = await res.json();
      setStocks(data);
    } catch (err) {
      setError('Failed to load stock data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStocks();
  }, [onStockChange]);

  function handleDeleteClick(stock: StockItem) {
    setItemToDelete(stock);
    setDeleteModalOpen(true);
  }

  function handleEditClick(stock: StockItem) {
    setEditingId(stock._id);
    setEditQuantity(stock.quantity.toString());
    setEditError('');
  }

  async function handleQuantityUpdate(stockId: string) {
    const quantityNum = parseInt(editQuantity);
    if (isNaN(quantityNum) || quantityNum < 0) {
      setEditError('Please enter a valid quantity');
      return;
    }
    if (quantityNum === 0) {
      setEditError('Quantity cannot be zero');
      return;
    }

    try {
      const res = await fetch(`/api/stock?id=${stockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: quantityNum }),
      });

      if (!res.ok) {
        throw new Error('Failed to update quantity');
      }

      setEditingId(null);
      setEditQuantity('');
      setEditError('');
      onStockChange();
    } catch (err) {
      setEditError('Failed to update quantity');
    }
  }

  async function handleDeleteConfirm() {
    if (!itemToDelete) return;

    setDeletingId(itemToDelete._id);
    try {
      const res = await fetch(`/api/stock?id=${itemToDelete._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete stock item');
      }

      setStocks(stocks.filter(stock => stock._id !== itemToDelete._id));
      setDeleteModalOpen(false);
      setItemToDelete(null);
      onStockChange();
    } catch (err) {
      setError('Failed to delete stock item');
    } finally {
      setDeletingId(null);
    }
  }

  function renderTable(title: string, filteredStocks: StockItem[]) {
    return (
      <div className="mb-10 bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title} Stock</h2>
        </div>
        {filteredStocks.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">No stock items in this location.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStocks.map((stock) => (
                  <tr key={stock._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === stock._id ? (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(e.target.value)}
                              min={0}
                              className="w-20 p-1 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                              onClick={() => handleQuantityUpdate(stock._id)}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditQuantity('');
                                setEditError('');
                              }}
                              className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                          {editError && (
                            <div className="text-red-600 text-sm">
                              {editError}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="font-medium">{stock.quantity}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(stock.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEditClick(stock)}
                          disabled={editingId === stock._id}
                          className="text-blue-600 hover:text-blue-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(stock)}
                          disabled={deletingId === stock._id}
                          className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === stock._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading stock data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const isvStocks = stocks.filter(stock => stock.location === 'ISV');
  const houstonStocks = stocks.filter(stock => stock.location === 'Houston');

  return (
    <div className="space-y-8">
      {renderTable('ISV', isvStocks)}
      {renderTable('Houston', houstonStocks)}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={itemToDelete?.name || ''}
      />
    </div>
  );
}

export default function StockPage() {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('ISV');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [stockChangeCounter, setStockChangeCounter] = useState(0);

  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    
    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    setSubmitting(true);
    setSuccess(false);
    setError('');

    const stockData = {
      name,
      sku,
      quantity: quantityNum,
      location
    };

    try {
      const res = await fetch('/api/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setName('');
        setSku('');
        setQuantity('');
        setLocation('ISV');
        setStockChangeCounter(prev => prev + 1);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
      </div>

      {success && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-600 text-center">Stock item successfully created!</p>
        </div>
      )}

      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Add New Stock</h2>
        <form className="max-w-md mx-auto space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              id="sku"
              type="text"
              value={sku}
              onChange={ev => setSku(ev.target.value)}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter SKU"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={ev => setQuantity(ev.target.value)}
              required
              min={1}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              id="location"
              value={location}
              onChange={ev => setLocation(ev.target.value)}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="ISV">ISV</option>
              <option value="Houston">Houston</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {submitting ? 'Adding...' : 'Add Stock'}
          </button>
        </form>
      </div>

      <StockOverview onStockChange={() => setStockChangeCounter(prev => prev + 1)} />
    </section>
  );
}
