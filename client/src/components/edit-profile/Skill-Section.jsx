import { X, Plus } from "lucide-react";
import React from "react";
import { Input } from "@/components/edit-profile/Input";

export const SkillSection = () => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        {/* {selectedSkills.map((skill) => ( */}
        <div
          // key={skill._id}
          className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
        >
          {/* {skill.name} - {skill.level} */} skill name
          <button
            type="button"
            onClick={() => console.log("remove skill")}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        </div>
        {/* ))} */}
      </div>
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Skill Name"
          //   value={newSkill.name}
          //   onChange={(e) =>
          //     setNewSkill((prev) => ({ ...prev, name: e.target.value }))
          //   }
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          //   value={newSkill.level}
          //   onChange={(e) =>
          //     setNewSkill((prev) => ({ ...prev, level: e.target.value }))
          //   }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <button
          type="button"
          //   onClick={handleSkillAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};
