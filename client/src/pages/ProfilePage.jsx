import React, { useState } from "react";
import {
  Edit2,
  Settings,
  MapPin,
  // Github,
  // Linkedin,
  // Twitter,
  Award,
  Briefcase,
} from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 rounded-t-2xl overflow-hidden relative">
            <img
              src="/api/placeholder/1200/400"
              alt="Cover"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Profile Content */}
          <div className="bg-white dark:bg-neutral-800 rounded-b-2xl shadow-lg -mt-16 relative z-10">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Avatar */}
                <div className="relative">
                  <img
                    src="/api/placeholder/200/200"
                    alt="Profile"
                    className="w-36 h-36 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></span>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Emma Smith
                        <Award className="w-6 h-6 text-blue-500" />
                      </h1>
                      <p className="text-gray-600 dark:text-neutral-400 flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-4 h-4" /> Los Angeles, California
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        {/* <GitHub className="w-6 h-6" /> */}
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        {/* <Linkedin className="w-6 h-6" /> */}
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        {/* <Twitter className="w-6 h-6" /> */}
                      </a>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="mt-4 flex items-center justify-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-white px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-600 transition">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600 dark:text-neutral-400">
                        Software Engineer
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-6 border-t dark:border-neutral-700 pt-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {[
                    "HTML",
                    "CSS",
                    "Dart",
                    "C++",
                    "UI Design",
                    "React",
                    "TypeScript",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
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
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                About Me
              </h2>
              <p className="text-gray-600 dark:text-neutral-400">
                Passionate software engineer with a keen interest in creating
                innovative solutions. Experienced in web development, mobile app
                design, and UI/UX. Always eager to learn and explore new
                technologies.
              </p>
            </div>
          )}
          {activeTab === "projects" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Projects
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Project A", "Project B", "Project C"].map((project) => (
                  <div
                    key={project}
                    className="bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {project}
                    </h3>
                    <p className="text-gray-600 dark:text-neutral-400 text-sm">
                      Brief project description
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
