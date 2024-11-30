import { Trash2 } from "lucide-react";
import React from "react";
import { Input } from "@/components/edit-profile/Input";

export const ExperienceSection = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Experience</h3>
        <button
          type="button"
          //   onClick={addExperience}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Experience
        </button>
      </div>
      {/* {experiences.map((exp, index) => ( */}
      <div
        //  key={exp._id}
        className="bg-gray-50 p-4 rounded-lg mb-4"
      >
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            name="title"
            placeholder="Job Title"
            //   value={exp.title}
            //   onChange={(e) => handleExperienceChange(index, e)}
          />
          <Input
            type="text"
            name="field"
            placeholder="Field"
            //   value={exp.field}
            //   onChange={(e) => handleExperienceChange(index, e)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            type="number"
            name="years"
            placeholder="Years of Experience"
            //   value={exp.years}
            //   onChange={(e) => handleExperienceChange(index, e)}
          />
          <button
            type="button"
            //   onClick={() => removeExperience(exp._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
          >
            <Trash2 size={20} className="mr-2" /> Remove
          </button>
        </div>
        <textarea
          name="description"
          placeholder="Job Description"
          // value={exp.description}
          // onChange={(e) => handleExperienceChange(index, e)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="3"
        ></textarea>
      </div>
      {/* ))} */}
    </div>
  );
};
