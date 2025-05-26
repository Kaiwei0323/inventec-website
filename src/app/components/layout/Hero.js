import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                    <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block">Powering the Future</span>
                                <span className="block text-primary">with Smarter Edge Devices</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                                We design high-performance, AI-ready edge devices for real-time processing, low-latency computing, and seamless deployment — optimized for industries like healthcare, manufacturing, transportation, and smart cities.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        href="/contact"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-red-700 md:py-4 md:px-10 md:text-lg transition-colors duration-200"
                                    >
                                        Order Now
                                        <Right className="ml-2" />
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link
                                        href="/product"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-200 md:py-4 md:px-10 md:text-lg transition-colors duration-200"
                                    >
                                        Learn More
                                        <Right className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            
            {/* Features Section */}
            <div className="relative bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        <div className="relative">
                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <p className="ml-16 text-lg font-semibold text-gray-900">High Performance</p>
                            <p className="mt-2 ml-16 text-base text-gray-500">Advanced processing capabilities for demanding AI and edge computing tasks.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            </div>
                            <p className="ml-16 text-lg font-semibold text-gray-900">Reliable Security</p>
                            <p className="mt-2 ml-16 text-base text-gray-500">Built-in security features to protect your data and applications.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <p className="ml-16 text-lg font-semibold text-gray-900">Low Latency</p>
                            <p className="mt-2 ml-16 text-base text-gray-500">Real-time processing with minimal delay for critical applications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
