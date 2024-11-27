import React from "react";

import Navbar from "@/components/common/Navbar";
import { SidebarContent } from "@/components/common/Sidebar";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Main Content Is Inside The Sidebar */}
      <SidebarContent />
    </div>
  );
};

export default UserLayout;
