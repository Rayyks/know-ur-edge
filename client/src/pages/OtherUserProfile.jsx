import React, { useState } from "react";
import { ProfileInfo } from "@/components/profile/Profile-Info";
import { SkillsSection } from "@/components/profile/Skills-Section";
import { NavigationTabs } from "@/components/profile/Navigation-Tabs";
import { TabContent } from "@/components/profile/Tab-Content";
import useProfile from "@/hooks/useProfile";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NotFound } from "@/lib/404";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const OtherUserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    selectedUserProfile: authProfile,
    selectedUserProfileError,
    isSelectedUserProfileLoading,
  } = useProfile();

  // Show a combined loading spinner if either profile is loading
  if (isSelectedUserProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <LoadingSpinner message="Loading profile..." />
      </div>
    );
  }

  // Handle 404 error for selected user profile
  if (selectedUserProfileError?.status === 404) {
    return <NotFound message="User profile not found." />;
  }

  // Handle error display for either profile
  if (selectedUserProfileError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <ErrorMessage
          message="Error loading profile."
          details={selectedUserProfileError?.data?.message}
        />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 rounded-t-2xl overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/77/20/c6/7720c64efa0fcb3bd3c6521309c4702e.jpg"
              alt="Cover"
              className="w-full h-full object-contain absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Profile Content */}
          <div className="bg-white dark:bg-neutral-800 rounded-b-2xl shadow-lg -mt-16 relative z-10">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Avatar */}
                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${
                      authProfile?.profilePic
                    }`}
                    alt="Profile"
                    className="w-36 h-36 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></span>
                </div>

                {/* Profile Info */}
                <ProfileInfo authProfile={authProfile} />
              </div>

              {/* Skills Section */}
              <SkillsSection authProfile={authProfile} />
            </div>

            {/* Navigation Tabs */}
            <NavigationTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

        {/* Tab Content */}
        <TabContent activeTab={activeTab} authProfile={authProfile} />
      </div>
    </div>
  );
};

export default OtherUserProfile;
