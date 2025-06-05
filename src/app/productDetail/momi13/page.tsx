import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function MOMI13Spec() {
  return (
    <>
      <ProductCommon />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">MOMI13 Specification</h1>
        <div className="relative w-full max-w-md mx-auto my-6">
          <Image
            src="/momi13.jpg"
            alt="MOMI13"
            width={500}
            height={300}
            className="object-contain rounded-lg"
          />
        </div>
        <table className="w-full border border-gray-300 text-sm table-auto">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Product Name</td>
              <td className="border px-4 py-2">MOMI13</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Processor (CPU)</td>
              <td className="border px-4 py-2">Intel® Pentium® N6415, Quad Core @1.2GHz, 1.5MB L2 Cache</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">TPM</td>
              <td className="border px-4 py-2">2.0</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Memory</td>
              <td className="border px-4 py-2">8GB DDR4</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Storage</td>
              <td className="border px-4 py-2">128GB M.2 NVMe SSD</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Operating System (Optional)</td>
              <td className="border px-4 py-2">Windows 10 IoT LTSC / Windows 11 IoT LTSC 2024</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Display Size</td>
              <td className="border px-4 py-2">13.3” (16:9)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Display Resolution</td>
              <td className="border px-4 py-2">1920 x 1080 (FHD)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Touch</td>
              <td className="border px-4 py-2">PCAP 10-point Touch (glove supported)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Luminance</td>
              <td className="border px-4 py-2">360 nits (max 400 nits)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Contrast Ratio</td>
              <td className="border px-4 py-2">800</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">USB</td>
              <td className="border px-4 py-2">1 x USB 3.1 Type A, 1 x USB Type-C (DP out / Power in)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Audio Jack</td>
              <td className="border px-4 py-2">1 x Combo Jack</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">LAN</td>
              <td className="border px-4 py-2">2 x RJ45 G-LAN</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Wireless</td>
              <td className="border px-4 py-2">Wi-Fi 6E 802.11 b/g/n and above, BT 5.3</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Power</td>
              <td className="border px-4 py-2">Medical Grade Adapter: 19VDC or 12~24VDC</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Battery</td>
              <td className="border px-4 py-2">Internal Li-ION Battery (3880mAh / 7.2V)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">RFID Module</td>
              <td className="border px-4 py-2">Included</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">IP Rating</td>
              <td className="border px-4 py-2">IP54 Front</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Thermal</td>
              <td className="border px-4 py-2">Fanless</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Dimension</td>
              <td className="border px-4 py-2">13.1” x 8.9” x 1.6” (334 x 226 x 40 mm)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Weight</td>
              <td className="border px-4 py-2">3.9 lbs (1.78 kg)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Mount</td>
              <td className="border px-4 py-2">VESA</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Operating Temperature</td>
              <td className="border px-4 py-2">10°C to 40°C (50°F to 95°F)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Storage Temperature</td>
              <td className="border px-4 py-2">-20°C to 50°C (-4°F to 122°F)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Operating Humidity</td>
              <td className="border px-4 py-2">20% to 80% for performance / 10% to 90% for safety (non-condensing)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Storage Humidity</td>
              <td className="border px-4 py-2">10% to 90% for safety (non-condensing)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Certifications</td>
              <td className="border px-4 py-2">
                AAMI ES60601-1:2005 + AMD1:2012 + AMD2:2021<br />
                CAN/CSA-C22.2 NO. 60601-1:14/A2:2022<br />
                IEC/EN 60601-1 / 60601-1-2 (latest amendments)<br />
                IEC62368-1:2018 / EN IEC 62368-1:2020+A11:2020<br />
                FCC part 15 Class B / ICES-003 Level B<br />
                GB17625.1-2022, GB4943.1-2022, GB/T 9254.1-2021<br />
                CCC (China), CE (Europe), UL, FCC, ICES-003 (US/Canada), VCCI (Japan), UKCA (UK), Energy Star
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
