import React from "react";
import Search from "./Search";
import Chats from "./Chats";
import NavbarChat from "./NavbarChat";

const Sidebar = () => {
  return (
    <div className="flex-shrink bg-slate-700 relative flex-1">
      <NavbarChat />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
