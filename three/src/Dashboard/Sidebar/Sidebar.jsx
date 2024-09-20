import React from "react";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import Nav from "./Nav";
const Sidebar = () => {
  return (
    <div className="card-bg-100 flex w-[20rem] flex-col p-2 pt-3">
      <Profile />
      <SearchBar />
      <Nav />
    </div>
  );
};

export default Sidebar;
