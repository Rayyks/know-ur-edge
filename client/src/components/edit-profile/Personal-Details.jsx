import React from "react";
import { Label } from "@/components/edit-profile/Label";
import { Input } from "@/components/edit-profile/Input";

export const PersonalDetails = ({ profile, register, errors }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          defaultValue={profile?.username || ""}
          {...register("username", {
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters long",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Username must contain only letters, numbers, and _",
            },
          })}
        />
        {errors?.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          defaultValue={profile?.email || ""}
          {...register("email", {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="md:col-span-2">
        <Label>Bio</Label>
        <textarea
          name="bio"
          defaultValue={profile?.bio || ""}
          {...register("bio")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="3"
        ></textarea>
        {errors?.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div>
      <div>
        <Label>Gender</Label>
        <select
          name="gender"
          defaultValue={profile?.gender || ""}
          {...register("gender")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};
