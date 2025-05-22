import React from "react";
import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

const specs = [
  { label: "SKU", values: ["QC01WE\n(None WiFi)", "QC01WE\n(WiFi)", "QC01W\n(None WiFi 4DI/4DO)", "QC01W\n(Wifi + 2DI/2DO)", "QC01WP\n(None WiFi 4DI/4DO)", "QC01WP\n(Wifi + 2DI/2DO)"] },
  { label: "SOM Board", values: ["None WiFi", "With Wi-Fi Chip", "None WiFi", "With Wi-Fi Chip", "None WiFi", "With Wi-Fi Chip"] },
  { label: "Carrier Board", values: ["None DI/DO + 2USB LAN", "None DI/DO +2USB LAN", "4DI/2DO + 2USB LAN", "2DI/2DO + 2USB LAN", "4DI/2DO + 1USB LAN + AQR113C", "2DI/2DO + 1USB LAN + AQR113C"] },
  { label: "AI Performance", values: ["up to 12 TOPS", "up to 12 TOPS", "up to 12 TOPS", "up to 12 TOPS", "up to 12 TOPS", "up to 12 TOPS"] },
  { label: "Storage/ Memory", values: ["8GB LPDDR4x RAM / 128GB UFS Flash (uMCP)", "8GB LPDDR4x RAM / 128GB UFS Flash (uMCP)", "8GB LPDDR4x RAM / 128GB UFS Flash (uMCP)", "8GB LPDDR4x RAM / 128GB UFS Flash (uMCP)", "8GB LPDDR4x RAM / 128GB UFS Flash (uMCP)", "8GB LPDDR4x RAM / 128GB UFS Flash (uMCP)"] },
  { label: "Wireless", values: ["N/A", "WiFi 802.11 ax / Bluetooth 5.2", "N/A", "WiFi 802.11 ax / Bluetooth 5.2", "N/A", "WiFi 802.11 ax / Bluetooth 5.2"] },
  { label: "USB Type-A", values: ["2 ports (USB 3.0)", "2 ports (USB 3.0)", "2 ports (USB 3.0)", "2 ports (USB 3.0)", "4 ports (USB 3.0)", "4 ports (USB 3.0)"] },
  { label: "USB Type-C", values: ["1 Port (USB 3.0)", "1 Port (USB 3.0)", "1 Port (USB 3.0)", "1 Port (USB 3.0)", "1 Port (USB 3.0)", "1 Port (USB 3.0)"] },
  { label: "RJ45 LAN", values: ["1 Ports (1G)", "1 Ports (1G)", "2 Ports (1G +1G)", "2 Ports (1G +1G)", "2 Ports (10G + 1G) (*1)", "2 Ports (10G + 1G) (*1)"] },
  { label: "HDMI", values: ["N/A", "N/A", "HDMI (Type A)", "HDMI (Type A)", "HDMI (Type A)", "HDMI (Type A)"] },
  { label: "DI/DO", values: ["N/A", "N/A", "4DI/2DO *2", "2DI/2DO *2", "4DI/2DO *2", "2DI/2DO *2"] },
  { label: "Button/Key", values: ["1x Reset button / 1x Recovery button / 1x Power button/ 1x Function button", "1x Reset button / 1x Recovery button / 1x Power button/ 1x Function button", "1x Reset button / 1x Recovery button / 1x Power button/ 1x Function button", "1x Reset button / 1x Recovery button / 1x Power button/ 1x Function button", "1x Reset button / 1x Recovery button / 1x Power button/ 1x Function button", "1x Reset button / 1x Recovery button / 1x Power button/ 1x Function button"] },
  { label: "Power", values: ["1 x DC-In 19V adaptor", "1 x DC-In 19V adaptor", "1 x DC-In 19V adaptor", "1 x DC-In 19V adaptor", "1 x DC-In 19V adaptor", "1 x DC-In 19V adaptor"] },
  { label: "Operating System", values: [
    "Qualcomm Linux",
    "Qualcomm Linux",
    "Windows 11 IOT\nQualcomm Linux\nLinux Ubuntu\nAndroid 13",
    "Windows 11 IOT\nQualcomm Linux\nLinux Ubuntu\nAndroid 13",
    "Windows 11 IOT\nQualcomm Linux\nLinux Ubuntu\nAndroid 13",
    "Windows 11 IOT\nQualcomm Linux\nLinux Ubuntu\nAndroid 13"
  ] }
];

// Images representing 0–1, 2–3, 4–5
const mergedImages = [
  { src: "/QC01WE.jpg", colSpan: 2 },
  { src: "/QC01W.jpg", colSpan: 2 },
  { src: "/QC01WP.jpg", colSpan: 2 }
];

export default function Qc01DetailPage() {
  return (
    <>
    <ProductCommon />
    <h1 className="text-center text-3xl font-bold mb-4">QC01W Specifications</h1>
    
    <div className="relative w-full max-w-md mx-auto my-6">
        <Image
            src="/qc01.jpg"
            alt="QC01"
            width={500}
            height={300}
            className="object-contain rounded-lg"
        />
    </div>
    <div className="overflow-x-auto">
      <table className="table-auto border border-collapse w-full text-sm text-left">
        <thead>
          <tr className="bg-white">
            <th className="text-center border px-4 py-2">SKU</th>
            {specs[0].values.map((sku, idx) => (
              <th key={idx} className="border px-4 py-2 whitespace-pre-wrap text-center">{sku}</th>
            ))}
          </tr>
          <tr>
            <td className="text-center border px-4 py-2 font-semibold bg-gray-100 text-center">Image</td>
            {mergedImages.map((img, idx) => (
              <td
                key={idx}
                colSpan={img.colSpan}
                className="border px-4 py-2 text-center bg-gray-100"
              >
                <img
                  src={img.src}
                  alt={`Product ${idx}`}
                  className="mx-auto max-h-40 object-contain"
                />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.slice(1).map((row, idx) => {
            const mergedCells = [];
            let i = 0;
            while (i < row.values.length) {
              const currentVal = row.values[i];
              let span = 1;
              while (i + span < row.values.length && row.values[i + span] === currentVal) {
                span++;
              }
              mergedCells.push({ value: currentVal, colSpan: span });
              i += span;
            }

            return (
              <tr key={idx} className="even:bg-gray-50">
                <td className="border px-4 py-2 font-semibold">{row.label}</td>
                {mergedCells.map((cell, j) => (
                  <td
                    key={j}
                    className="border px-4 py-2 whitespace-pre-wrap text-center align-middle"
                    colSpan={cell.colSpan}
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
