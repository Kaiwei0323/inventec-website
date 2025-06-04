import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function M240Spec() {
  return (
    <>
      <ProductCommon />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">M240 Specification</h1>
        <div className="relative w-full max-w-md mx-auto my-6">
          <Image
            src="/m240-m215.jpg"
            alt="M240-M215"
            width={500}
            height={300}
            className="object-contain rounded-lg"
          />
        </div>
        <table className="w-full border border-gray-300 text-sm table-auto">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Product Name</td>
              <td className="border px-4 py-2">M240</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Processor (CPU)</td>
              <td className="border px-4 py-2">
                Intel Tiger Lake 11th Gen<br />
                Celeron 6305E / i3-1115G4E / i5-1145G7E / i7-1185G7E
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">TPM</td>
              <td className="border px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Graphics</td>
              <td className="border px-4 py-2">Integrated Intel Graphics</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Memory</td>
              <td className="border px-4 py-2">2 x DDR4 slots, Up to 64GB</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">1st Storage</td>
              <td className="border px-4 py-2">M.2 Slot NVMe SSD</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">AI Accelerator</td>
              <td className="border px-4 py-2">Hailo 8</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Operating System (Optional)</td>
              <td className="border px-4 py-2">Windows 10 IoT</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Display Size</td>
              <td className="border px-4 py-2">23.8” (16:9)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Display Resolution</td>
              <td className="border px-4 py-2">1920 x 1080 (FHD)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Touch</td>
              <td className="border px-4 py-2">10-point PCAP Touch (glove support)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Luminance</td>
              <td className="border px-4 py-2">250 nits</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Contrast Ratio</td>
              <td className="border px-4 py-2">1000:1</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">USB 3.2</td>
              <td className="border px-4 py-2">2 x USB 3.2</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">USB 2.0</td>
              <td className="border px-4 py-2">5 x USB 2.0</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">HDMI</td>
              <td className="border px-4 py-2">1 x HDMI Out</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">RS232</td>
              <td className="border px-4 py-2">2 x RS232 (RJ48)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Audio Jack</td>
              <td className="border px-4 py-2">1 x Combo Jack</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">LAN</td>
              <td className="border px-4 py-2">2 x G-LAN</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Certifications</td>
              <td className="border px-4 py-2">
                UL 60601-1-1<br />
                EN 60601-2 4th Edition<br />
                FCC<br />
                CE Class B<br />
                Engineer Star 8.0
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Wireless</td>
              <td className="border px-4 py-2">
                AX210 WIFI 6E 802.11 a/b/g/n/ac/ax R2 MIMO 2x2 + BT 5.2
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Audio</td>
              <td className="border px-4 py-2">3W x 2 Speakers</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Webcam</td>
              <td className="border px-4 py-2">2M Webcam with Digital Mic</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Reading Light</td>
              <td className="border px-4 py-2">Included</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
