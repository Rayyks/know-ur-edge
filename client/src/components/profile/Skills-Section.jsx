import React from "react";

export const SkillsSection = ({ authProfile }) => {
  return (
    <div className="mt-6 border-t dark:border-neutral-700 pt-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {authProfile?.skills?.map((skill) => (
          <span
            key={skill._id}
            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full text-sm flex items-center gap-2"
          >
            {skill.name}
            {skill.level && (
              <span className="text-xs text-blue-400 capitalize">
                ({skill.level})
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
