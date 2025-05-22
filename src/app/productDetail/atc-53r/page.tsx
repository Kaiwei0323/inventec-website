import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";
export default function Atc53rDetailPage() {
  return (
    <>
      <ProductCommon />
      <div className="p-6 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold mb-4">ATC-53R Tablet Specifications</h1>

        <div className="relative w-full max-w-md mx-auto my-6">
            <Image
                src="/53r.jpg"
                alt="ATC-53R Tablet"
                width={500}
                height={300}
                className="object-contain rounded-lg"
            />
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p>
            10.1" tablet powered by Intel Elkhart Lake N6210 (6.5W TDP), ideal for restaurant, retail,
            logistics, and warehouse applications. Features low power consumption, long battery life,
            and optional NFC & barcode scanner.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>10.1” HD P-CAP Touch Display</li>
            <li>WiFi + Bluetooth, USB-C Power Delivery</li>
            <li>2 MP Front / 5 MP Rear Camera with Flash</li>
            <li>4550mAh Battery</li>
            <li>IP65 Rating</li>
            <li>Optional NFC & 1D/2D Barcode Scanner</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Specifications Table</h2>
          <table className="table-auto w-full border border-gray-300 text-sm">
            <tbody>
              <tr><td className="border p-2 font-medium">CPU</td><td className="border p-2">Intel Elkhart Lake N6210 (6.5W TDP)</td></tr>
              <tr><td className="border p-2 font-medium">OS</td><td className="border p-2">Windows 10 IoT Enterprise LTSC (TPM 2.0)</td></tr>
              <tr><td className="border p-2 font-medium">Memory</td><td className="border p-2">4GB LPDDR4x (up to 8GB)</td></tr>
              <tr><td className="border p-2 font-medium">Storage</td><td className="border p-2">64GB eMMC (up to 128GB)</td></tr>
              <tr><td className="border p-2 font-medium">Display</td><td className="border p-2">10.1" 800x1280 HD, Gorilla Glass 3 (IK06)</td></tr>
              <tr><td className="border p-2 font-medium">Touch</td><td className="border p-2">10-point Multi-touch (P-CAP), Direct Bonding</td></tr>
              <tr><td className="border p-2 font-medium">Pen</td><td className="border p-2">Optional Passive Pen</td></tr>
              <tr><td className="border p-2 font-medium">Sensors</td><td className="border p-2">G-sensor, Ambient Light Sensor</td></tr>
              <tr><td className="border p-2 font-medium">Buttons</td><td className="border p-2">Power, Vol +/-, Programmable Key</td></tr>
              <tr><td className="border p-2 font-medium">LED</td><td className="border p-2">Tri-color Power/Battery Indicator</td></tr>
              <tr><td className="border p-2 font-medium">Audio</td><td className="border p-2">2W Speaker, Mic-in/Line-out Combo Jack</td></tr>
              <tr><td className="border p-2 font-medium">I/O Ports</td><td className="border p-2">1 x USB 3.1 Type-C (DP/Charging/Data), 1 x USB 3.0 Type-A, Dock Pogo Connector</td></tr>
              <tr><td className="border p-2 font-medium">Camera</td><td className="border p-2">Front: 2 MP FF / Rear: 5 MP AF + Flash</td></tr>
              <tr><td className="border p-2 font-medium">Wireless</td><td className="border p-2">WiFi 802.11 a/b/g/n/ac/ax, BT 5.3</td></tr>
              <tr><td className="border p-2 font-medium">Battery</td><td className="border p-2">10.8V / 4550mAh / 50.32Wh</td></tr>
              <tr><td className="border p-2 font-medium">NFC</td><td className="border p-2">Optional, 13.56MHz (ISO 14443A/B, FeliCa)</td></tr>
              <tr><td className="border p-2 font-medium">Barcode</td><td className="border p-2">Optional 1D/2D Imager</td></tr>
              <tr><td className="border p-2 font-medium">Build</td><td className="border p-2">IP65, Corner Bumpers, Hand/Shoulder Strap Support</td></tr>
              <tr><td className="border p-2 font-medium">Temp (Op/Charge)</td><td className="border p-2">0–40°C (Op), 0–35°C (Charge)</td></tr>
              <tr><td className="border p-2 font-medium">Temp (Storage)</td><td className="border p-2">-20~60°C</td></tr>
              <tr><td className="border p-2 font-medium">Drop Test</td><td className="border p-2">1.2m</td></tr>
              <tr><td className="border p-2 font-medium">Certifications</td><td className="border p-2">CE, FCC</td></tr>
              <tr><td className="border p-2 font-medium">Power Adapter</td><td className="border p-2">Optional 65W / 20V / 2.25A</td></tr>
              <tr><td className="border p-2 font-medium">Dimensions</td><td className="border p-2">281 x 184 x 18.5 mm</td></tr>
              <tr><td className="border p-2 font-medium">Weight</td><td className="border p-2">990g</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
