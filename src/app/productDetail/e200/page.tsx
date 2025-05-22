import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function E200Spec() {
  return (
    <>
        <ProductCommon />
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">H3003 Specifications</h1>
                    <div className="relative w-full max-w-md mx-auto my-6">
                        <Image
                            src="/e200.jpg"
                            alt="E200"
                            width={500}
                            height={300}
                            className="object-contain rounded-lg"
                        />
                  </div>
      <table className="w-full table-auto border border-gray-300 text-sm">
        <tbody>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold w-1/3">Positioning</td>
            <td className="border px-4 py-2">Edge AIoT (uCPE)</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Form Factor</td>
            <td className="border px-4 py-2">256mm x 43.6mm x 165mm (10.07 x 1.72 x 6.5 inch)</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Processor</td>
            <td className="border px-4 py-2">
              11th Gen Intel® Core™ Processor<br />
              Up to 4 Processor Cores, 2-4MB Cache<br />
              TDP up to 15W
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Memory Slot</td>
            <td className="border px-4 py-2">
              2 DDR4 channels, 2666/3200 MT/s<br />
              Max. 64GB<br />
              In-Band ECC
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Expansion Slot</td>
            <td className="border px-4 py-2">
              2x M.2 slots support AI & NVMe module<br />
              1x M.2 slot supports NVMe & LoRa module<br />
              1x M.2 slot supports WiFi/BT module<br />
              1x M.2 slot supports 4G LTE/5G NR module
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">I/O Interface</td>
            <td className="border px-4 py-2">
              2x RJ45 2.5G with TSN<br />
              1x COM port (RS232/RS485 shared)<br />
              2x USB 3.2 port & 2x USB 2.0 port<br />
              1x HDMI 2.0 port
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Networking</td>
            <td className="border px-4 py-2">
              Dual-WAN (5G & Ethernet) with Load Balancing and Failover<br />
              IPv4 / IPv6 routing<br />
              NAT / NAPT<br />
              DHCP Server & Client
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">System Management</td>
            <td className="border px-4 py-2">
              LWM2M Client (OMA-compliant)<br />
              Device Twin<br />
              Zero Touch Provisioning<br />
              OTA<br />
              Logs & Tracing
            </td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Security</td>
            <td className="border px-4 py-2">
              Firewall, IPsec VPN<br />
              TPM2.0 (Optional)
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Antenna</td>
            <td className="border px-4 py-2">6x external antennas</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Fan</td>
            <td className="border px-4 py-2">Fanless</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Power Supply</td>
            <td className="border px-4 py-2">12V/5A, 60W power adapter</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 font-semibold">Mounting</td>
            <td className="border px-4 py-2">Standard / Wall Mount</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Environmental</td>
            <td className="border px-4 py-2">
              Operating Temp: -20°C ~ 60°C (at 0.7m/s air flow)<br />
              IP51 Rated<br />
              Vibration: IEC 60068-2-64<br />
              Shock: IEC 60068-2-27
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    </>
  );
}
