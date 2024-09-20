import React from "react";
import { FaPlus } from "react-icons/fa6";
const NewProjects = ({ setNewProject }) => {
  return (
    <div className="flex flex-col p-4">
      <div className="text-2xl font-bold text-neutral-100">Projects</div>
      <div className="card-bg mt-2 flex gap-4 rounded-lg p-4">
        <div
          onClick={() => {
            setNewProject(true);
          }}
          className="flex cursor-pointer flex-col gap-2 hover:brightness-110"
        >
          <div className="flex h-[9rem] w-[14rem] items-center justify-center rounded-xl bg-neutral-400">
            <FaPlus size={25} />
          </div>
          <div className="text-lg text-neutral-400">New Project</div>
        </div>
      </div>
    </div>
  );
};

export default NewProjects;
