import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="grid grid-cols-2">
            <div className="py-12">
                <h1 className="text-4xl font-semibold leading-12">
                    Powering the Future <br />
                    with Smarter Edge <br />
                    Devices <br />
                </h1>
                <p className="my-6 text-gray-500">
                    We design high-performance, AI-ready edge devices for real-time processing, low-latency computing, and seamless deployment — optimized for industries like healthcare, manufacturing, transportation, and smart cities.
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/contact"
                        className="bg-primary flex gap-2 text-white px-4 py-2 rounded-full text-sm items-center transform transition-transform duration-200 ease-in-out hover:scale-105"
                    >
                        Order Now
                        <Right />
                    </Link>
                    <Link
                        href="/product"
                        className="text-gray-600 flex items-center gap-2 transform transition-transform duration-200 ease-in-out hover:scale-105"
                    >
                        Learn More
                        <Right />
                    </Link>
                </div>
            </div>
            <div className="relative">
                <Image
                    src="/jetson.jpg"
                    alt="jetson"
                    layout="fill"
                    style={{ objectFit: "contain" }}
                />
            </div>
        </section>
    );
}
