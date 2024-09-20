import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
const SearchBar = () => {
  return (
    <div className="mt-3 flex items-center rounded bg-neutral-500 p-2">
      <IoSearch />
      <input
        type="text"
        className="mx-2 w-full border-none bg-transparent outline-none"
      />
      <IoMdClose />
    </div>
  );
};

export default SearchBar;
