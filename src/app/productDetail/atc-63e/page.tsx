import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function Atc63eDetailPage() {
  return (
    <>
    <ProductCommon />
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">ATC-63E Specification</h1>
            
      
              <div className="relative w-full max-w-md mx-auto my-6">
                  <Image
                      src="/63e.jpg"
                      alt="ATC-63E Tablet"
                      width={500}
                      height={300}
                      className="object-contain rounded-lg"
                  />
            </div>
      <p className="mb-6 text-center">
        13.3” FHD LCM integrated with the latest 11th generation Intel platform – Tiger Lake.<br />
        No more bloated design. ATC 63E provides a stylish and slim outlook. It is also certified with IEC 60601.<br />
        Ideal for Retail, Hospitality, and Medical solutions.
      </p>
      <table className="w-full table-auto border border-gray-300 text-sm">
        <tbody>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 font-semibold px-4 py-2 w-1/3">Platform</td>
            <td className="border border-gray-300 px-4 py-2">11th Generation Intel Tiger Lake</td>
          </tr>
          <tr>
            <td className="border border-gray-300 font-semibold px-4 py-2">OS Support</td>
            <td className="border border-gray-300 px-4 py-2">Windows 11 & Windows IoT Enterprise LTSC</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 font-semibold px-4 py-2">Display</td>
            <td className="border border-gray-300 px-4 py-2">13.3” FHD (1920×1080) with multi-touch support</td>
          </tr>
          <tr>
            <td className="border border-gray-300 font-semibold px-4 py-2">USB Type-C</td>
            <td className="border border-gray-300 px-4 py-2">Supports 2nd display, data transfer</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 font-semibold px-4 py-2">Camera</td>
            <td className="border border-gray-300 px-4 py-2">5MP front camera, 8MP AF rear camera</td>
          </tr>
          <tr>
            <td className="border border-gray-300 font-semibold px-4 py-2">USB Ports</td>
            <td className="border border-gray-300 px-4 py-2">2x USB 3.0 extension ports, 1x USB 3.0 docking port</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border border-gray-300 font-semibold px-4 py-2">Certification</td>
            <td className="border border-gray-300 px-4 py-2">IEC 60601 certified</td>
          </tr>
        </tbody>
      </table>
    </main>
    </>
  );
}
