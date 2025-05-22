import ProductCommon from "../../components/layout/ProductCommon";
import Image from "next/image";

export default function atc32pDetailPage() {
  return (
    <>
      <ProductCommon />
      <div className="p-6 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-center text-3xl font-bold mb-4">ATC-32P Tablet Specifications</h1>

        <div className="relative w-full max-w-md mx-auto my-6">
            <Image
                src="/32p.jpg"
                alt="ATC-53R Tablet"
                width={500}
                height={300}
                className="object-contain rounded-lg"
            />
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p>
            ATC-32P is an 8” HD industrial tablet designed for outdoor and transportation applications.
            Powered by Qualcomm Snapdragon 660, it features 800 nits sunlight-readable display,
            robust GPS tracking, and support for multiple LTE modules via PCI-E. Built for rugged
            environments, it complies with ISO 16750 hardware design standards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Qualcomm Snapdragon 660 Platform</li>
            <li>Google Android 9 Embedded</li>
            <li>8” HD (1200 x 800) Display with 800 nits Brightness</li>
            <li>Standalone GPS with External Antenna Support</li>
            <li>5 MP Auto-Focus Camera</li>
            <li>Hardware Design Complies with ISO 16750</li>
            <li>Supports MPEG-1/2/4, H.263, H.264, VP8, VP9</li>
            <li>Supports AGPS</li>
            <li>Proprietary API Reserved for System Integration</li>
            <li>Targeted for Industrial Mobile & AIM Android Platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Specifications Table</h2>
          <table className="table-auto w-full border border-gray-300 text-sm">
            <tbody>
              <tr><td className="border p-2 font-medium">CPU</td><td className="border p-2">Qualcomm Snapdragon 660</td></tr>
              <tr><td className="border p-2 font-medium">OS</td><td className="border p-2">Android 9</td></tr>
              <tr><td className="border p-2 font-medium">Display</td><td className="border p-2">8” HD (1200 x 800), 800 nits Brightness</td></tr>
              <tr><td className="border p-2 font-medium">Connectivity</td><td className="border p-2">WiFi, Bluetooth, Optional LTE (via PCI-E)</td></tr>
              <tr><td className="border p-2 font-medium">GPS</td><td className="border p-2">Standalone GPS with Dedicated Antenna</td></tr>
              <tr><td className="border p-2 font-medium">Camera</td><td className="border p-2">5 MP Auto-Focus Rear Camera</td></tr>
              <tr><td className="border p-2 font-medium">Compliance</td><td className="border p-2">Hardware Design Matches ISO 16750</td></tr>
              <tr><td className="border p-2 font-medium">Multimedia</td><td className="border p-2">Supports MPEG-1, MPEG-2, MPEG-4, H.263, H.264, VP8, VP9</td></tr>
              <tr><td className="border p-2 font-medium">Navigation</td><td className="border p-2">Supports AGPS</td></tr>
              <tr><td className="border p-2 font-medium">Software Integration</td><td className="border p-2">Proprietary API Reserved</td></tr>
              <tr><td className="border p-2 font-medium">Application</td><td className="border p-2">Industrial Mobile / AIM Android / AI & iVideo Solution Platform</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
