import React from "react";
import { Label } from "@/components/edit-profile/Label";
import { Input } from "@/components/edit-profile/Input";

export const PersonalDetails = ({ profile, register }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          defaultValue={profile?.username || ""}
          {...register("username")}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          defaultValue={profile?.email || ""}
          {...register("email")}
        />
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
