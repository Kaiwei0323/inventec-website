'use client';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4 px-6">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 prose prose-sm max-w-none text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function NvidiaJetsonQA() {
  const faqs = [
    {
      question: "How do I get started with Nvidia Jetson development?",
      answer: "To get started with Nvidia Jetson development, first install the Jetson SDK (JetPack) which includes the OS image, developer tools, and libraries. Then, follow our setup guide in the documentation section for detailed instructions on hardware setup and initial software configuration."
    },
    {
      question: "What are the system requirements for Jetson development?",
      answer: "For Jetson development, you'll need: 1) A host PC running Ubuntu Linux, 2) Minimum 16GB RAM recommended, 3) At least 100GB free disk space, 4) USB port for flashing the device, and 5) Internet connection for downloading SDK components."
    },
    {
      question: "How can I optimize my AI model for Jetson devices?",
      answer: "To optimize AI models for Jetson: 1) Use TensorRT for model optimization, 2) Quantize your models to INT8 or FP16, 3) Utilize NVIDIA's Transfer Learning Toolkit, 4) Profile your application with Nsight Systems, and 5) Consider using the NVIDIA TAO Toolkit for model adaptation."
    },
    {
      question: "What debugging tools are available for Jetson development?",
      answer: "Key debugging tools include: 1) NVIDIA Nsight Systems for system-wide performance analysis, 2) NVIDIA Nsight Graphics for GPU debugging, 3) GDB for general debugging, 4) Tegrastats for monitoring system resources, and 5) Docker containers for isolated development environments."
    },
    {
      question: "How do I update my Jetson device's software?",
      answer: "To update your Jetson device: 1) Use the SDK Manager for major updates, 2) Run 'sudo apt update && sudo apt upgrade' for package updates, 3) Check NVIDIA's developer portal for security updates, and 4) Always backup your data before major updates."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nvidia Jetson Development Q&A
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about Nvidia Jetson development
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base text-gray-600">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-500">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 