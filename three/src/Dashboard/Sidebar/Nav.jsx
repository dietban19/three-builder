import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { RiHome2Line } from "react-icons/ri";
const Nav = () => {
  const nav = [
    { name: "Home", icon: <RiHome2Line size={25} /> },
    { name: "Recent", icon: <CiClock2 size={25} /> },
  ];
  return (
    <ul className="mt-2 flex flex-col gap-2">
      {nav.map((item, index) => (
        <li
          className="item-center flex cursor-pointer gap-2 rounded-lg p-2 hover:bg-neutral-800"
          key={index}
        >
          <div className="text-neutral-300">{item.icon}</div>
          <div className="text-neutral-300">{item.name}</div>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
