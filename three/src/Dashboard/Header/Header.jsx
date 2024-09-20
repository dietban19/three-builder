import React from "react";
import { CiBellOn } from "react-icons/ci";
const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex cursor-pointer items-center lg:ml-4">
        <img
          src="logos/h-o-m-eSmall.png"
          alt="masiv-logo"
          className={`h-4 object-contain invert lg:h-12`}
        />
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-600 hover:bg-neutral-700">
        <CiBellOn className="text-amber" size={35} />
      </div>
    </div>
  );
};

export default Header;
