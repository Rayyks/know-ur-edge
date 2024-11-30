import React from "react";

export const NavigationTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-t dark:border-neutral-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center md:justify-start space-x-6 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 border-b-2 transition-colors duration-300 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-neutral-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
