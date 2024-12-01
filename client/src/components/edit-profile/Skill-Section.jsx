import { X, Plus } from "lucide-react";
import React from "react";
import { Input } from "@/components/edit-profile/Input";

export const SkillSection = ({ register, errors, profile, setProfile }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
      {/* <div className="flex flex-wrap gap-3 mb-4">
        {profile.skills.map((skill, i) => (
          <div
            key={i}
            className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
          >
            {skill?.name} - {skill?.level}
            <button
              type="button"
              onClick={handleRemoveSkill(i)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div> */}
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Skill Name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          // {...register("name")}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          // {...register("level")}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <button
          type="button"
          // onClick={() => {
          //   handleAddSkill(profile);
          //   console.log(profile);
          // }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};
