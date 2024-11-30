import React from "react";
import { ProjectSection } from "@/components/edit-profile/Project-Section";
import { ExperienceSection } from "@/components/edit-profile/Experience-Section";
import { SkillSection } from "@/components/edit-profile/Skill-Section";
import { PersonalDetails } from "@/components/edit-profile/Personal-Details";
import { useState } from "react";
import useProfile from "@/hooks/useProfile";
import { useEffect } from "react";
import { Camera } from "lucide-react";

export const EditProfileForm = () => {
  const {
    authProfile,
    handleSubmit,
    handleUpdateProfile,
    register,
    errors,
    isUpdating,
    updateError,
  } = useProfile();

  const [profile, setProfile] = useState({
    bio: "",
    gender: "",
    profilePic: "",
    skills: [{ name: "", level: "" }],
    experience: [{ title: "", field: "", years: "", description: "" }],
    projects: [{ title: "", description: "" }],
  });

  useEffect(() => {
    if (authProfile) {
      setProfile({
        username: authProfile.username || "",
        email: authProfile.email || "",
        bio: authProfile.bio || "",
        gender: authProfile.gender || "",
        profilePic: authProfile.profilePic || "",
        skills: authProfile.skills || [{ name: "", level: "" }],
        experience: authProfile.experience || [
          { title: "", field: "", years: "", description: "" },
        ],
        projects: authProfile.projects || [{ title: "", description: "" }],
      });
    }
  }, [authProfile]);

  const onSubmit = async (data) => {
    console.log(data);
    await handleUpdateProfile(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-100 shadow-lg rounded-xl p-8"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <img
            src={`${import.meta.env.VITE_API_URL}${
              profile?.profilePic ||
              "https://i.pinimg.com/736x/95/93/f9/9593f990e5a5be63e649e8beac3e61d1.jpg"
            }`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700"
          >
            <Camera size={20} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {profile?.username || "User"}
        </h2>
      </div>

      {/* Personal Details */}
      <PersonalDetails register={register} profile={profile} />

      {/* Skills Section */}
      <SkillSection register={register} profile={profile} />

      {/* Experience Section */}
      <ExperienceSection register={register} profile={profile} />

      {/* Projects Section */}
      <ProjectSection register={register} profile={profile} />

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300"
        >
          {isUpdating ? "Updating..." : "Save Profile"}
        </button>
      </div>

      {/* FOR ERROR  */}
      {updateError && (
        <div className="text-red-500 text-center mt-4">
          <p>Error updating profile: {updateError.message}</p>
        </div>
      )}
    </form>
  );
};
