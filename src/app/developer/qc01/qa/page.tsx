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

export default function QC01QA() {
  const faqs = [
    {
      question: "What is QC01 and what are its main features?",
      answer: "QC01 is a Qualcomm-based development platform that offers high-performance computing capabilities for edge AI applications. Key features include: 1) Advanced AI processing capabilities, 2) Integrated 5G connectivity, 3) Enhanced security features, 4) Power-efficient design, and 5) Comprehensive development tools and SDKs."
    },
    {
      question: "How do I set up my development environment for QC01?",
      answer: "To set up your QC01 development environment: 1) Install the Qualcomm Development Network (QDN) tools, 2) Configure your build environment with the required SDKs, 3) Set up the necessary development board drivers, 4) Install the recommended IDE and debugging tools, and 5) Follow our detailed setup guide in the documentation section."
    },
    {
      question: "What are the best practices for optimizing QC01 applications?",
      answer: "For optimal QC01 application performance: 1) Utilize Qualcomm's Neural Processing SDK for AI workloads, 2) Implement proper power management techniques, 3) Use the hardware acceleration features effectively, 4) Optimize memory usage and cache utilization, and 5) Profile your application using Qualcomm's performance tools."
    },
    {
      question: "How can I debug issues on QC01 hardware?",
      answer: "For debugging on QC01: 1) Use Qualcomm's Debug Agent for low-level debugging, 2) Implement logging mechanisms using the provided SDK tools, 3) Utilize the on-chip trace and debug features, 4) Monitor system resources using the performance monitoring tools, and 5) Check our troubleshooting guide for common issues."
    },
    {
      question: "What security considerations should I keep in mind when developing for QC01?",
      answer: "Key security considerations include: 1) Implementing secure boot mechanisms, 2) Using Qualcomm's Trusted Execution Environment, 3) Following secure coding practices, 4) Regularly updating security patches and firmware, and 5) Implementing proper authentication and encryption mechanisms."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            QC01 Development Q&A
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about QC01 development
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