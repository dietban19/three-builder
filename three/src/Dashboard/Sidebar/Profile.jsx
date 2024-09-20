import React from "react";
import { useUserContext } from "../../../../context/UserContext";

const Profile = () => {
  const { currentUser } = useUserContext();
  const fNameLetter = currentUser && currentUser.firstName.charAt(0);
  return (
    <div className="mt-2 flex cursor-pointer items-center gap-2 hover:brightness-110">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#669169] p-2 text-white">
        {fNameLetter}
      </div>
      <div className="text-neutral-300">
        {currentUser && currentUser.firstName}
      </div>
    </div>
  );
};

export default Profile;
