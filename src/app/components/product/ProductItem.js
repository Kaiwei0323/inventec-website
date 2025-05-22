import Right from "../icons/Right";
import Link from "next/link";

export default function ProductItem({ name, image, description, downloadUrl, detailPage }) {
  return (
    <div className="bg-gray-300 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all flex flex-col justify-between h-full">
      {/* Fixed height image container */}
      <div className="h-40 flex items-center justify-center overflow-hidden">
        <img src={image} className="max-h-full object-contain" alt={name} />
      </div>

      <h4 className="text-center font-semibold my-2">{name}</h4>

      <p className="text-gray-500 text-sm whitespace-pre-line min-h-[60px]">
        {description}
      </p>

      <div className="flex flex-col mt-4">
        {/* Download Spec Button as Link */}
        <a
          href={downloadUrl}
          download
          className="bg-primary text-white rounded-full justify-center px-4 py-3 my-2 text-center transition-all duration-300 ease-in-out hover:bg-blue-900 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          Download Spec
        </a>

        <Link href={detailPage} className="bg-white text-gray-700 rounded-full justify-center px-4 py-3 my-2 text-center transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-white hover:scale-105 hover:shadow-xl cursor-pointer flex items-center gap-1">
          Show Detail
          <Right />
        </Link>
      </div>
    </div>
  );
}
