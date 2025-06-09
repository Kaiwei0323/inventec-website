'use client';
import { useState, useEffect } from "react";
import ShipmentForm from "../components/ShipmentForm";
import AddStockForm from "../components/AddStockForm";

interface StockItem {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  createdAt: string;
}

interface InquiryItem {
  productId: { name: string; sku?: string; chip?: string; platform?: string } | string;
  quantity: number;
  sku?: string;
}

interface Inquiry {
  _id: string;
  company: string;
  contact: string;
  items: InquiryItem[];
  createdAt: string;
  fulfilled: boolean;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<StockItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<{ name: string; sku: string; quantity: string }>({
    name: '',
    sku: '',
    quantity: ''
  });
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
    setEditItem({
      name: stock.name,
      sku: stock.sku,
      quantity: stock.quantity.toString()
    });
    setEditError('');
  }

  async function handleItemUpdate(stockId: string) {
    const quantityNum = parseInt(editItem.quantity);
    if (isNaN(quantityNum) || quantityNum < 0) {
      setEditError('Please enter a valid quantity');
      return;
    }
    if (quantityNum === 0) {
      setEditError('Quantity cannot be zero');
      return;
    }
    if (!editItem.name.trim()) {
      setEditError('Product name cannot be empty');
      return;
    }

    try {
      const res = await fetch(`/api/stock?id=${stockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editItem.name,
          sku: editItem.sku,
          quantity: quantityNum
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }

      setEditingId(null);
      setEditItem({ name: '', sku: '', quantity: '' });
      setEditError('');
      onStockChange();
    } catch (err) {
      setEditError('Failed to update item');
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

  function filterStocks(stocks: StockItem[], query: string) {
    if (!query) return stocks;
    const lowerQuery = query.toLowerCase();
    return stocks.filter(stock => 
      stock.name.toLowerCase().includes(lowerQuery) ||
      stock.sku.toLowerCase().includes(lowerQuery)
    );
  }

  function renderTable(title: string, filteredStocks: StockItem[]) {
    const sortedStocks = [...filteredStocks].sort((a, b) => 
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title} Stock</h2>
        </div>
        {sortedStocks.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            {searchQuery ? 'No matching items found.' : 'No stock items in this location.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedStocks.map((stock) => (
                  <tr key={stock._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {editingId === stock._id ? (
                        <input
                          type="text"
                          value={editItem.name}
                          onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                          className="w-full p-1 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        stock.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === stock._id ? (
                        <input
                          type="text"
                          value={editItem.sku}
                          onChange={(e) => setEditItem({ ...editItem, sku: e.target.value })}
                          className="w-full p-1 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        stock.sku
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === stock._id ? (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editItem.quantity}
                              onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                              min={0}
                              className="w-20 p-1 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                              onClick={() => handleItemUpdate(stock._id)}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditItem({ name: '', sku: '', quantity: '' });
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

  const isvStocks = filterStocks(stocks.filter(stock => stock.location === 'ISV'), searchQuery);
  const houstonStocks = filterStocks(stocks.filter(stock => stock.location === 'Houston'), searchQuery);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-96 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              {searchQuery && (
                <div className="flex items-center space-x-2">
                  <span>
                    Found: {isvStocks.length + houstonStocks.length} items
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);
  const [fulfillingInquiryId, setFulfillingInquiryId] = useState<string | null>(null);

  const handleStockChange = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleShipmentComplete = () => {
    setShowShipmentForm(false);
    handleStockChange();
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    try {
      const res = await fetch('/api/inquiry');
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      // Optionally set error
    }
  }

  async function handleDeleteInquiry(id: string) {
    setDeletingInquiryId(id);
    try {
      const res = await fetch(`/api/inquiry?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete inquiry');
      setInquiries(inquiries.filter(inq => inq._id !== id));
    } catch (err) {
      // Optionally show error
    } finally {
      setDeletingInquiryId(null);
    }
  }

  async function handleFulfillInquiry(id: string) {
    setFulfillingInquiryId(id);
    try {
      const res = await fetch(`/api/inquiry?id=${id}&action=fulfill`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to fulfill inquiry');
      setInquiries(inquiries.filter(inq => inq._id !== id));
    } catch (err) {
      // Optionally show error
    } finally {
      setFulfillingInquiryId(null);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowShipmentForm(!showShipmentForm)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            {showShipmentForm ? 'Hide Shipment Form' : 'Create Shipment'}
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            {showAddForm ? 'Hide Add Form' : 'Add Stock'}
          </button>
        </div>
      </div>

      {showShipmentForm && (
        <div className="mb-8">
          <ShipmentForm onShipmentComplete={handleShipmentComplete} />
        </div>
      )}

      {showAddForm && (
        <div className="mb-8">
          <AddStockForm onStockAdded={handleStockChange} />
        </div>
      )}

      {/* Customer Inquiries Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Inquiries</h2>
        {inquiries.filter(inq => !inq.fulfilled).length === 0 ? (
          <div className="text-gray-500">No customer inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inquiries.filter(inq => !inq.fulfilled).map((inq) => (
                  <tr key={inq._id}>
                    <td className="px-4 py-2 whitespace-nowrap">{inq.company}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{inq.contact}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(inq.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <ul className="space-y-2">
                        {inq.items.map((item, idx) => (
                          <li key={idx} className="bg-gray-50 rounded p-2 border">
                            <div><span className="font-medium">Product:</span> {typeof item.productId === 'object' ? item.productId.name : item.productId}</div>
                            <div><span className="font-medium">SKU:</span> {item.sku || (typeof item.productId === 'object' ? item.productId.sku : '') || <span className="text-gray-400">N/A</span>}</div>
                            <div><span className="font-medium">Quantity:</span> {item.quantity}</div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => handleFulfillInquiry(inq._id)}
                        disabled={fulfillingInquiryId === inq._id}
                        className="text-green-600 hover:text-green-900 disabled:opacity-50 mr-2"
                      >
                        {fulfillingInquiryId === inq._id ? 'Fulfilling...' : 'Fulfill'}
                      </button>
                      <button
                        onClick={() => handleDeleteInquiry(inq._id)}
                        disabled={deletingInquiryId === inq._id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deletingInquiryId === inq._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-8">
        <StockOverview onStockChange={() => handleStockChange()} />
      </div>
    </div>
  );
}
