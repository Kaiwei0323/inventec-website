import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function EdgePro1USpec() {
  return (
    <>
      <ProductCommon />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Edge Pro 1U Specification</h1>
        <div className="relative w-full max-w-md mx-auto my-6">
          <Image
            src="/edge_pro_1u.jpg"
            alt="Edge Pro 1U"
            width={500}
            height={300}
            className="object-contain rounded-lg"
          />
        </div>
        <table className="w-full border border-gray-300 text-sm table-auto">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Product Name</td>
              <td className="border px-4 py-2">Edge Pro 1U</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Form Factor</td>
              <td className="border px-4 py-2">
                1U1N1P<br />
                Dimensions: 435 x 42.88 x 430 mm (17.13” x 1.69” x 16.93”)
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Processor</td>
              <td className="border px-4 py-2">
                Single Socket-E2 (LGA4710)<br />
                Intel® Xeon® 6500/6700-series with P-cores<br />
                Intel® Xeon® 6700-series with E-cores
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Memory</td>
              <td className="border px-4 py-2">
                8 DIMM slots 1DPC<br />
                DDR5 up to 6400MT/s
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Storage</td>
              <td className="border px-4 py-2">
                2 x NVMe Gen 5 M.2 SSDs (2280)<br />
                6 x NVMe Gen 5 E1.S SSDs<br />
                Intel VROC Software RAID support
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Networking</td>
              <td className="border px-4 py-2">
                Embedded Intel i210 1Gb x 4 ports<br />
                Optional OCP NIC 3.0 SFF
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Management</td>
              <td className="border px-4 py-2">
                DC-SCM 2.0 Module Includes:<br />
                - 2 x USB 3.0<br />
                - 1 x Mini DisplayPort<br />
                - 1 x RJ45 Management Port
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">I/O Expansion</td>
              <td className="border px-4 py-2">1 x OCP 3.0 Slot (x16 PCIe 5.0)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Power Supply</td>
              <td className="border px-4 py-2">
                DC-IN 54V<br />
                (Optional external 1600W AC to DC adapter)
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Cooling & Fans</td>
              <td className="border px-4 py-2">
                7 x Dual Rotor Fans<br />
                N+1 Redundant Support<br />
                Optimized Fan Speed Control<br />
                High PQ Performance & Low Power Consumption
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
