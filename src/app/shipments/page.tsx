'use client';
import { useState, useEffect } from 'react';

interface ShipmentItem {
  productName: string;
  sku: string;
  quantity: number;
}

interface Shipment {
  _id: string;
  From: string;
  to: string;
  items: ShipmentItem[];
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Move getStatusColor function outside components so it can be used by both
function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Add DeleteConfirmationModal component
function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  shipmentDetails 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  shipmentDetails: Shipment | null;
}) {
  if (!isOpen || !shipmentDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {shipmentDetails.status === 'pending' 
            ? 'Confirm Shipment Deletion' 
            : 'Delete Shipment History'}
        </h3>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            {shipmentDetails.status === 'pending' 
              ? 'Are you sure you want to delete this shipment? This will return items to inventory.'
              : 'Are you sure you want to delete this shipment history? This will not affect inventory.'}
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Shipment details:</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>From: {shipmentDetails.From}</p>
              <p>To: {shipmentDetails.to}</p>
              <p>Status: <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipmentDetails.status)}`}>
                {shipmentDetails.status}
              </span></p>
              <div className="mt-2">
                <p className="font-medium mb-1">Items:</p>
                <ul className="list-disc list-inside">
                  {shipmentDetails.items.map((item, index) => (
                    <li key={index}>
                      {item.productName} (SKU: {item.sku}) - Qty: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            {shipmentDetails.status === 'pending' ? 'Delete Shipment' : 'Delete History'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState<Shipment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fromFilter, setFromFilter] = useState('');

  useEffect(() => {
    fetchShipments();
  }, []);

  async function fetchShipments() {
    try {
      const res = await fetch('/api/shipment');
      if (!res.ok) throw new Error('Failed to fetch shipments');
      const data = await res.json();
      setShipments(data);
    } catch (err) {
      setError('Failed to load shipment data');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(shipmentId: string, newStatus: string) {
    setUpdatingId(shipmentId);
    try {
      const res = await fetch(`/api/shipment?id=${shipmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      await fetchShipments();
    } catch (err) {
      setError('Failed to update shipment status');
    } finally {
      setUpdatingId(null);
    }
  }

  function handleDeleteClick(shipment: Shipment) {
    setShipmentToDelete(shipment);
    setDeleteModalOpen(true);
  }

  async function handleDeleteConfirm() {
    if (!shipmentToDelete) return;

    setUpdatingId(shipmentToDelete._id);
    try {
      const res = await fetch(`/api/shipment?id=${shipmentToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: shipmentToDelete.status,
          updateStock: shipmentToDelete.status === 'pending' // Only update stock if shipment is pending
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete shipment');
      }

      await fetchShipments();
      setDeleteModalOpen(false);
      setShipmentToDelete(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete shipment');
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredShipments = shipments.filter(shipment => {
    const matchesCustomer = shipment.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFrom = !fromFilter || shipment.From === fromFilter;
    return matchesCustomer && matchesFrom;
  });

  const pendingShipments = filteredShipments.filter(s => s.status === 'pending' || s.status === 'shipped');
  const deliveredShipments = filteredShipments.filter(s => s.status === 'delivered');

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading shipments...</p>
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

  const ShipmentTable = ({ shipments, title }: { shipments: Shipment[], title: string }) => (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shipments.map((shipment) => (
              <tr key={shipment._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.From}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.to}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <ul className="list-disc list-inside">
                    {shipment.items.map((item, index) => (
                      <li key={index}>
                        {item.productName} (SKU: {item.sku}) - Qty: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {shipment.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(shipment._id, 'shipped')}
                        disabled={updatingId === shipment._id}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      >
                        Ship
                      </button>
                      <button
                        onClick={() => handleDeleteClick(shipment)}
                        disabled={updatingId === shipment._id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {shipment.status === 'shipped' && (
                    <button
                      onClick={() => handleStatusUpdate(shipment._id, 'delivered')}
                      disabled={updatingId === shipment._id}
                      className="text-green-600 hover:text-green-900 disabled:opacity-50"
                    >
                      Mark Delivered
                    </button>
                  )}
                  {shipment.status === 'delivered' && (
                    <button
                      onClick={() => handleDeleteClick(shipment)}
                      disabled={updatingId === shipment._id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 flex items-center"
                    >
                      <span>Delete History</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shipment Management</h1>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {/* Customer Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search by Customer
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter customer name or address..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* From Location Filter */}
          <div>
            <label htmlFor="from-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Location
            </label>
            <select
              id="from-filter"
              name="from-filter"
              value={fromFilter}
              onChange={(e) => setFromFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">All Locations</option>
              <option value="ISV">ISV</option>
              <option value="Houston">Houston</option>
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        {(searchQuery || fromFilter) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Customer: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            {fromFilter && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Location: {fromFilter}
                <button
                  onClick={() => setFromFilter('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {filteredShipments.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">
            {shipments.length === 0 ? 'No shipments found' : 'No shipments match your filters'}
          </p>
        </div>
      ) : (
        <>
          {pendingShipments.length > 0 && (
            <ShipmentTable 
              shipments={pendingShipments} 
              title="Pending Shipments"
            />
          )}
          
          {deliveredShipments.length > 0 && (
            <ShipmentTable 
              shipments={deliveredShipments} 
              title="Shipment History"
            />
          )}
        </>
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setShipmentToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        shipmentDetails={shipmentToDelete}
      />
    </div>
  );
} 