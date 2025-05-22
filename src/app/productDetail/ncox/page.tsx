import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";


export default function NCOXSpec() {
  return (
            <>
                <ProductCommon />
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">AIM-Edge ncox Specification</h1>
                                <div className="relative w-full max-w-md mx-auto my-6">
                                    <Image
                                        src="/ncox.jpg"
                                        alt="NCOX"
                                        width={500}
                                        height={300}
                                        className="object-contain rounded-lg"
                                    />
                              </div>
      <table className="w-full border border-gray-300 text-sm table-auto">
        <tbody>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Product Name</td>
            <td className="border px-4 py-2">AIM-Edge ncox</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Processor (CPU)</td>
            <td className="border px-4 py-2">NVIDIA Jetson Orin NX (up to 100/70 TOPS)</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Memory</td>
            <td className="border px-4 py-2">16GB/8GB LPDDR5</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">eMMC</td>
            <td className="border px-4 py-2">None</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Expansion Storage</td>
            <td className="border px-4 py-2">1 x PCIE M.2 SSD (256GB)</td>
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
            <td className="border px-4 py-2">1 x 10/100 Ethernet, 1 x Gigabit Ethernet</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Camera</td>
            <td className="border px-4 py-2">RJ45 (Interface TBD)</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">I/O</td>
            <td className="border px-4 py-2">
              1 x USB 3.0 Type-A<br />
              1 x USB 2.0 OTG Micro-AB<br />
              1 x Micro HDMI<br />
              2 x GPIO (DO)<br />
              1 x PWM (0-10V)<br />
              1 x Reset Button<br />
              1 x Power Button<br />
              1 x Recovery Button
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Power Input</td>
            <td className="border px-4 py-2">1 x DC-In 19V adaptor</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Operating Temperature</td>
            <td className="border px-4 py-2">-20 ~ 60°C</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Mechanical Dimension</td>
            <td className="border px-4 py-2">90(W) x 118(D) x 69(H) mm</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Weight</td>
            <td className="border px-4 py-2">TBD</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Operating System</td>
            <td className="border px-4 py-2">Linux 5.1 / Ubuntu 20.04</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Key Features</td>
            <td className="border px-4 py-2">
              AI Edge Inference System with NVIDIA Jetson Orin NX<br />
              Name Card (nc) Serial Product<br />
              Fanless Design<br />
              Board Support Package (BSP) Supported<br />
              Supports Deep Learning Trained Models<br />
              Wide Operating Temperature<br />
              Designed for AI Edge Computing Applications
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    </>
  );
}