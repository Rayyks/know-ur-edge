import { Award, Mail, Edit2, UserX, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileInfo = ({ authProfile, selectecUserProfile }) => {
  return (
    <div className="flex-1 text-center md:text-left">
      <div className="flex items-center justify-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {authProfile?.username}
            <Award className="w-6 h-6 text-blue-500" />
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" /> {authProfile?.email}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            {/* <GitHub className="w-6 h-6" /> */}
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            {/* <Linkedin className="w-6 h-6" /> */}
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            {/* <Twitter className="w-6 h-6" /> */}
          </a>
        </div>
      </div>

      {/* Profile Actions */}

      <div className="mt-4 flex items-center justify-center md:justify-between gap-4">
        {authProfile?._id === selectecUserProfile?._id && (
          <div className="flex items-center gap-4">
            <Link
              to="/profile/edit"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Link>
            <Link
              to="/account-deletion"
              className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 transition"
            >
              <UserX className="w-4 h-4" />
              Delete Account
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600 dark:text-neutral-400">
            {authProfile?.gender || selectecUserProfile?.gender}
          </span>
        </div>
      </div>
    </div>
  );
};
