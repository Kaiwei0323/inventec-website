'use client';
import { useState } from 'react';

interface ShipmentItem {
  productName: string;
  sku: string;
  quantity: number;
}

interface ShipmentFormProps {
  onShipmentComplete: () => void;
}

export default function ShipmentForm({ onShipmentComplete }: ShipmentFormProps) {
  const [items, setItems] = useState<ShipmentItem[]>([{ productName: '', sku: '', quantity: 1 }]);
  const [From, setFrom] = useState('ISV');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    setItems([...items, { productName: '', sku: '', quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ShipmentItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'quantity') {
      // Ensure quantity is a valid positive number
      const numValue = parseInt(value.toString(), 10);
      newItems[index] = { 
        ...newItems[index], 
        [field]: isNaN(numValue) || numValue < 1 ? 1 : numValue 
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          From,
          to,
          items,
          location: From,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create shipment');
      }

      // Reset form
      setItems([{ productName: '', sku: '', quantity: 1 }]);
      setTo('');
      setFrom('ISV');
      onShipmentComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to create shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Shipment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              value={From}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="ISV">ISV</option>
              <option value="Houston">Houston</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ship To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter destination address"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Add Item
            </button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start p-4 border rounded-md">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={item.productName}
                  onChange={(e) => updateItem(index, 'productName', e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">SKU <span className='text-gray-400 text-xs'>(optional)</span></label>
                <input
                  type="text"
                  value={item.sku}
                  onChange={(e) => updateItem(index, 'sku', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter SKU (optional)"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="mt-6 text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Shipment...' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </div>
  );
} 