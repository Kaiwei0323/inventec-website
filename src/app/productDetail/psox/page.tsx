import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function PSOXSpec() {
  return (
    <>
      <ProductCommon />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">AIM-Edge psox Specification</h1>
        <div className="relative w-full max-w-md mx-auto my-6">
          <Image
            src="/psox.jpg"
            alt="PSOX"
            width={500}
            height={300}
            className="object-contain rounded-lg"
          />
        </div>
        <table className="w-full border border-gray-300 text-sm table-auto">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Product Name</td>
              <td className="border px-4 py-2">AIM-Edge psox</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Processor (CPU)</td>
              <td className="border px-4 py-2">
                NVIDIA Jetson Orin NX<br />
                8-core Arm Cortex-A78AE (16GB) or 6-core Arm Cortex-A78AE (8GB)
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Memory</td>
              <td className="border px-4 py-2">16GB / 8GB LPDDR5</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">eMMC</td>
              <td className="border px-4 py-2">None</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Expansion Storage</td>
              <td className="border px-4 py-2">M.2 PCIe NVMe SSD</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Wireless 4G LTE</td>
              <td className="border px-4 py-2">None</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">WLAN</td>
              <td className="border px-4 py-2">TBD</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Bluetooth</td>
              <td className="border px-4 py-2">TBD</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Ethernet (RJ45)</td>
              <td className="border px-4 py-2">2 x Gigabit Ethernet</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Camera</td>
              <td className="border px-4 py-2">N/A</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">I/O</td>
              <td className="border px-4 py-2">
                1 x USB 2.0 Micro-B<br />
                4 x USB 3.1 Gen1 Type-A<br />
                1 x Micro HDMI<br />
                8 x Digital IO (4 x DI, 4 x DO)<br />
                1 x Reset Button<br />
                1 x Recovery Button<br />
                1 x Power Button
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Power Input</td>
              <td className="border px-4 py-2">DC 12~19V</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Operating Temperature</td>
              <td className="border px-4 py-2">-20 ~ 60°C</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Mechanical Dimension</td>
              <td className="border px-4 py-2">94(W) x 157(D) x 70.75(H) mm</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Weight</td>
              <td className="border px-4 py-2">888g ±5g</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Operating System</td>
              <td className="border px-4 py-2">NVIDIA JetPack (Linux 5.10 / Ubuntu 20.04)</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 font-semibold">Key Features</td>
              <td className="border px-4 py-2">
                Palm-size (ps) serial product<br />
                For AI Edge Computing<br />
                Fanless Design<br />
                Up to 100 / 70 TOPS with NVIDIA Jetson Orin NX<br />
                Board Support Package (BSP) Supported<br />
                Supports Modern AI Trained Models<br />
                Wide Operating Temperature<br />
                Designed for Harsh Environments with Wall-mount Brackets
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
