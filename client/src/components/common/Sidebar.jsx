import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar-ui";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { LibraryBig, Search, UserCog, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

export function SidebarContent() {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <LibraryBig className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Search",
      href: "/search",
      icon: (
        <Search className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "fixed top-[4rem] flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <button className="bg-neutral-900 p-5 py-2 font-normal flex space-x-2 items-center text-sm text-black rounded-md relative z-20">
      {/* this is gonna be profile pict */}
      <img
        src="https://i.pinimg.com/736x/77/d0/56/77d056e02bc7419162ca8feef6186a6a.jpg"
        alt="nigger face"
        className="h-10 w-12 rounded-md flex-shrink-0"
      />
      <div className="grid grid-col-2 px-14 mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          USERNAME
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          user@gmail.com
        </motion.span>
      </div>
    </button>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="https://i.pinimg.com/736x/77/d0/56/77d056e02bc7419162ca8feef6186a6a.jpg"
        alt="nigger face"
        className="h-12 w-14 rounded-md flex-shrink-0"
      />
    </Link>
  );
};

export const Dashboard = () => {
  const location = useLocation();
  const current = location.pathname;
  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full ">
        {/* HEAD BAR */}
        <div className={current !== "/" ? "hidden" : "flex"}>
          <div className="h-8 w-full rounded-lg text-center bg-gray-100 dark:bg-neutral-800 flex justify-center items-center overflow-hidden">
            <h1 className="text-orange-800 font-bold text-2xl moving-text">
              Posts
            </h1>
          </div>
        </div>

        {/* Outlet with scrollable content */}
        <div className="flex-grow overflow-y-auto">
          <Outlet />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};
