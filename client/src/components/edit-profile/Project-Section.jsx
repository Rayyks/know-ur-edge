import { Trash2 } from "lucide-react";
import React from "react";
import { Input } from "@/components/edit-profile/Input";

export const ProjectSection = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
        <button
          type="button"
          //   onClick={addProject}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Project
        </button>
      </div>
      {/* {projects.map((project, index) => ( */}
      <div
        // key={project._id}
        className="bg-gray-50 p-4 rounded-lg mb-4"
      >
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            name="name"
            placeholder="Project Name"
            //   value={project.name}
            //   onChange={(e) => handleProjectChange(index, e)}
          />
          <Input
            type="text"
            name="link"
            placeholder="Project Link"
            //   value={project.link}
            //   onChange={(e) => handleProjectChange(index, e)}
          />
        </div>
        <textarea
          name="description"
          placeholder="Project Description"
          // value={project.description}
          // onChange={(e) => handleProjectChange(index, e)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          rows="3"
        ></textarea>
        <button
          // type="button"
          // onClick={() => removeProject(project._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
        >
          <Trash2 size={20} className="mr-2" /> Remove Project
        </button>
      </div>
      {/* ))} */}
    </div>
  );
};
