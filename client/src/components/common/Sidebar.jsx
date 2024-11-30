import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, NavLink } from "react-router-dom";
import { LogOut, UserCog } from "lucide-react";

// IMPORT LOCAL
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar-ui";
import Footer from "@/components/common/Footer";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { links } from "@/content/content";
import { Logo, LogoIcon } from "@/components/ui/mini-profile-ui";
import { User } from "lucide-react";

export function SidebarContent() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, handleLogout } = useAuth();
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
            {open ? (
              <Logo isAuthenticated={isAuthenticated} user={user} />
            ) : (
              <LogoIcon isAuthenticated={isAuthenticated} user={User} />
            )}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              {isAuthenticated && (
                <>
                  <SidebarLink
                    link={{
                      label: "Profile",
                      href: "/profile",
                      icon: (
                        <UserCog
                          className={
                            "text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                          }
                        />
                      ),
                    }}
                  />
                  <SidebarLink
                    onClick={() => handleLogout()}
                    link={{
                      label: "Logout",
                      icon: (
                        <LogOut
                          className={
                            "text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
                          }
                        />
                      ),
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Dashboard = () => {
  const location = useLocation();
  const current = location.pathname;
  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full ">
        {/* HEAD BAR */}
        <div
          className={
            current === "/" || current === "/following"
              ? "flex"
              : current !== "/" && current !== "/following"
              ? "hidden"
              : ""
          }
        >
          <div className="h-8 w-full rounded-lg text-center bg-gray-100 dark:bg-neutral-800 flex justify-center items-center overflow-hidden">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "text-indigo-500 underline italic hover:underline hover:text-indigo-500 transition-colors ease-linear duration-300 font-medium  text-xl moving-text"
                  : "text-indigo-800 italic hover:underline hover:text-indigo-500 transition-colors ease-linear duration-300 font-medium  text-xl moving-text"
              }
            >
              <h1>Feed</h1>
            </NavLink>
            <span className="font-bold text-white mx-2">/</span>
            <NavLink
              to="/following"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "text-indigo-500 underline italic hover:underline hover:text-indigo-500 transition-colors ease-linear duration-300 font-medium  text-xl moving-text"
                  : "text-indigo-800 italic hover:underline hover:text-indigo-500 transition-colors ease-linear duration-300 font-medium  text-xl moving-text"
              }
            >
              <h1>Following</h1>
            </NavLink>
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
