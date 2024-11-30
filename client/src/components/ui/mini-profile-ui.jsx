import { motion } from "framer-motion";

export const Logo = (isAuthenticated, user) => {
  return (
    <button
      className={`bg-neutral-900 p-5 py-2 font-normal flex space-x-2 items-center text-sm text-black rounded-md relative z-20 ${
        isAuthenticated ? "" : "hidden"
      }`}
    >
      {/* this is gonna be profile pict */}
      <img
        src={
          user?.profilePicture ||
          "https://i.pinimg.com/736x/77/d0/56/77d056e02bc7419162ca8feef6186a6a.jpg"
        }
        alt="user pict"
        className="h-10 w-12 rounded-md flex-shrink-0"
      />
      <div className="grid grid-col-2 px-14 mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          {user?.username || "GUEST"}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          {user?.email || "GUEST"}
        </motion.span>
      </div>
    </button>
  );
};

export const LogoIcon = (isAuthenticated, user) => {
  return (
    <div
      className={`font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 ${
        isAuthenticated ? "" : "hidden"
      }`}
    >
      <img
        src={
          user?.profilePicture ||
          "https://i.pinimg.com/736x/77/d0/56/77d056e02bc7419162ca8feef6186a6a.jpg"
        }
        alt="user pict"
        className="h-12 w-14 rounded-md flex-shrink-0"
      />
    </div>
  );
};
