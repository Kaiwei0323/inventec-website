import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function ATC32EProductDetail() {
  return (
    <>
        <ProductCommon />

    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-3xl w-full bg-white p-6 rounded-md shadow-lg">
                <h1 className="text-center text-3xl font-bold mb-4">ATC 32E Specifications</h1>
        
        <div className="relative w-full max-w-md mx-auto my-6">
            <Image
                src="/32e.jpg"
                alt="32e"
                width={500}
                height={300}
                className="object-contain rounded-lg"
            />
        </div>

        <p className="text-sm mb-6 text-gray-700 leading-relaxed">
          AIMobile’s ATC-32E is equipped with a powerful Qualcomm Snapdragon 660 CPU and rugged 
          industrial design. It ensures a stable wireless connection for indoor operations, 
          making it ideal for retail, warehouse, logistics, factory, and field service verticals.
        </p>

        <h2 className="text-lg font-semibold mb-3">Key Features</h2>
        <ul className="list-disc pl-6 text-sm text-gray-800 mb-6 space-y-1">
          <li>Qualcomm Snapdragon SDA660 + Android 10 support</li>
          <li>FHD (1920×1200) display with multi-touch support</li>
          <li>USB Type-C supports second display, data transfer, and tablet charging</li>
          <li>Qualcomm WiFi AC (2.4/5GHz) + standalone GPS</li>
          <li>1x USB 2.0 extension port & 1x USB 2.0 docking port</li>
          <li>IP65 & MIL-STD-810G compliant</li>
        </ul>

        <h2 className="text-lg font-semibold mb-3">Specification Summary</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-48">Model</th>
              <td className="border border-gray-300 px-4 py-2">ATC-32E</td>
            </tr>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">CPU</th>
              <td className="border border-gray-300 px-4 py-2">Qualcomm Snapdragon SDA660</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">OS</th>
              <td className="border border-gray-300 px-4 py-2">Android 10</td>
            </tr>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Display</th>
              <td className="border border-gray-300 px-4 py-2">FHD (1920×1200), Multi-touch</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Connectivity</th>
              <td className="border border-gray-300 px-4 py-2">WiFi AC (2.4/5GHz), GPS</td>
            </tr>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Ports</th>
              <td className="border border-gray-300 px-4 py-2">
                1x USB 2.0 extension port<br />
                1x USB 2.0 docking port<br />
                USB Type-C (2nd display, data transfer, charging)
              </td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Rugged Rating</th>
              <td className="border border-gray-300 px-4 py-2">IP65, MIL-STD-810G</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    </>
  );
}
