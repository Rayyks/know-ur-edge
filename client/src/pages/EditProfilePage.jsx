import React from "react";
import { EditProfileForm } from "@/components/edit-profile/EditProfileForm";

const ProfileEditPage = ({}) => {
  return (
    <section className="py-12 bg-neutral-800 min-h-screen">
      <div className="w-full max-w-4xl px-4 mx-auto">
        <EditProfileForm />
      </div>
    </section>
  );
};

export default ProfileEditPage;
