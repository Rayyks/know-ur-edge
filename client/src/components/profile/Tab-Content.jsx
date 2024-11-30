import React from "react";
import { ExternalLink } from "lucide-react";

export const TabContent = ({ activeTab, authProfile }) => {
  return (
    <div className="mt-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
      {activeTab === "overview" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Bio
          </h2>
          <p className="text-gray-600 dark:text-neutral-400">
            {authProfile?.bio || "No bio available"}
          </p>
        </div>
      )}

      {activeTab === "experience" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Experience
          </h2>
          {authProfile?.experience?.length > 0 ? (
            <div className="space-y-4">
              {authProfile.experience.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-neutral-600 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-neutral-400">
                      {exp.years} years
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">
                    {exp.field}
                  </p>
                  <p className="text-gray-500 dark:text-neutral-300 text-sm italic">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-neutral-400">
              No experience details available
            </p>
          )}
        </div>
      )}

      {activeTab === "projects" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Projects
          </h2>
          {authProfile?.projects?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {authProfile.projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 hover:shadow-md transition group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">
                    {project.description || "No description available"}
                  </p>
                  {project.skillsUsed && project.skillsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.skillsUsed.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-neutral-400">
              No projects available
            </p>
          )}
        </div>
      )}
    </div>
  );
};
