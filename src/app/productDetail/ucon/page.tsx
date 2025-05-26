import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function UconProductDetail() {
  const specs = [
    ["Item", "Product Specification System SoM"],
    ["Product", "NVidia Orin Nano 4GB/8GB"],
    ["OS", "Ubuntu 20.04"],
    ["Memory", "4GB/8GB LPDDR5 (Built in SoM)"],
    ["Storage", "M.2 Key-M PCIe NVMe SSD"],
    [
      "Camera Image Sensor",
      "Sony Starvis™ IMX462\nSensor size: 1/2.8” progressive CMOS sensor\nPixel: 2 Mega pixel",
    ],
    ["Lens focal length", "Motorized MFZ lens, 2.8-12mm"],
    [
      "View angle",
      "FOV:\nH: 101.7~33.5\nV: 52.5~18.8\nD: 125~38.5",
    ],
    [
      "Minimum illuminator",
      "Color: 0.01 lux (AGC on)\nB/W: 0.005 lux (AGC on)",
    ],
    ["ICR", "Built in ICR (IR cut removal) for true day and night"],
    [
      "IQ",
      `Auto exposure, manual exposure (1/30~1/20,000s)
Support Day, night mode different parameter
Back light control
Auto white balance: auto, manual (different level selectable)
Auto gain control, manual gain value
2D de-noise and 3D-denoise (different level selectable)
IQ: Brightness, contrast, hue, sharpness, gamma
True WDR (wide dynamic range) and digital WDR`,
    ],
    ["IR LED", "10W"],
    ["I/O Ethernet", "GBE/802.3bt PoE PD x 1"],
    ["Power", "PoE PD IEEE 802.3bt DC-IN 12V/6A"],
    ["Environment Operating Temp", "-20~60℃"],
    ["Storage Temp", "-30~70℃"],
    ["Certifications", "IP66, FCC, BSMI, CE, VCCI"],
    [
      "Appearance Dimensions",
      "L: 295mm x W: 110mm (with cap) x H: 120mm (with base and cap)",
    ],
    ["Weight", "2.8kg (not included wall mount)"],
  ];

  return (
    <>
    <ProductCommon />
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-4xl w-full bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          UCON Specifications
        </h1>
            <div className="relative w-full max-w-md mx-auto my-6">
                <Image
                    src="/ucon.jpg"
                    alt="ucon"
                    width={500}
                    height={300}
                    className="object-contain rounded-lg"
                />
            </div>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {specs.map(([label, value], index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <th
                  className="border border-gray-300 px-4 py-2 text-left align-top font-semibold w-[150px]"
                  scope="row"
                >
                  {label}
                </th>
                <td className="border border-gray-300 px-4 py-2 whitespace-pre-line">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
    </>
  );
}
