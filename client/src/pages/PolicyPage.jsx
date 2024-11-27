import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PolicyPage = () => {
  const [activeSection, setActiveSection] = useState("terms");
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = {
    terms: {
      title: "Terms and Conditions",
      content: [
        {
          heading: "1. Acceptance of Terms",
          text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
        },
        {
          heading: "2. Use License",
          text: "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.",
        },
        {
          heading: "3. Disclaimer",
          text: 'The materials on our website are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
        },
        {
          heading: "4. Limitations",
          text: "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      content: [
        {
          heading: "1. Information We Collect",
          text: "We collect information that you provide directly to us, information we obtain automatically when you visit our website, and information from third-party sources.",
        },
        {
          heading: "2. How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users.",
        },
        {
          heading: "3. Information Sharing",
          text: "We do not share your personal information with companies, organizations, or individuals outside of our company except in specific circumstances described in this policy.",
        },
        {
          heading: "4. Data Security",
          text: "We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.",
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      content: [
        {
          heading: "1. What Are Cookies",
          text: "Cookies are small pieces of text sent by your web browser by a website you visit. They help that website remember information about your visit, which can both make it easier to visit the site again and make the site more useful to you.",
        },
        {
          heading: "2. How We Use Cookies",
          text: "We use cookies to understand how you use our website and to improve your experience. This includes personalizing content and advertising.",
        },
        {
          heading: "3. Your Cookie Choices",
          text: "Most web browsers allow you to control cookies through their settings preferences. However, limiting or disabling cookies may impact your experience of the site.",
        },
        {
          heading: "4. Managing Cookies",
          text: "You can manage your cookie preferences through your browser settings. Each browser is different, so check the 'Help' menu of your browser to learn how to change your cookie preferences.",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Legal Information
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-4 px-3 text-sm font-medium border-b-2 ${
                  activeSection === section
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {sections[section].title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {sections[activeSection].title}
            </h2>
            <div className="space-y-4">
              {sections[activeSection].content.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <span className="font-medium text-gray-900">
                      {item.heading}
                    </span>
                    {expandedSection === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === index && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default PolicyPage;
