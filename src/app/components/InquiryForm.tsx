"use client";
import { useState, useEffect } from "react";

interface InquiryItem {
  productId: string;
  quantity: number;
  sku?: string;
}

interface Inquiry {
  _id: string;
  company: string;
  contact: string;
  items: InquiryItem[];
  createdAt: string;
}

export default function InquiryForm() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [items, setItems] = useState<InquiryItem[]>([{ productId: "", quantity: 1, sku: "" }]);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : (data.products || []);
        productList.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        setProducts(productList);
      });
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const res = await fetch("/api/inquiry");
    if (res.ok) {
      const data = await res.json();
      setInquiries(data);
    }
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1, sku: "" }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InquiryItem, value: string | number) => {
    const newItems = [...items];
    if (field === "quantity") {
      const numValue = typeof value === 'number' ? value : parseInt(value, 10);
      newItems[index] = {
        ...newItems[index],
        quantity: isNaN(numValue) || numValue < 1 ? 1 : numValue,
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: String(value) };
    }
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, contact, items }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit inquiry");
      }
      setCompany("");
      setContact("");
      setItems([{ productId: "", quantity: 1, sku: "" }]);
      setSuccess("Inquiry submitted successfully!");
      fetchInquiries();
    } catch (err: any) {
      setError(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Inquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Email or phone number"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Add Product
            </button>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-end gap-4 p-4 border rounded-md bg-gray-50 mb-4"
            >
              <div className="flex-1 min-w-[180px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  value={item.productId}
                  onChange={(e) => updateItem(index, "productId", e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU <span className="text-gray-400 text-xs">(optional)</span></label>
                <input
                  type="text"
                  value={item.sku || ""}
                  onChange={(e) => updateItem(index, "sku", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter SKU"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              {items.length > 1 && (
                <div className="md:col-span-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && <div className="text-sm text-green-600">{success}</div>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}