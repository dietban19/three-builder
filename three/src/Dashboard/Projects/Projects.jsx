import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import EditSettings from "./EditSettings";

const Projects = ({ projects }) => {
  const [editProjectIndex, setEditProjectIndex] = useState(null); // Track which project is being edited

  // Utility function to calculate how long ago the date was
  const getTimeAgo = (timestamp) => {
    const date = timestamp.toDate ? timestamp.toDate() : timestamp;

    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  };

  return (
    <div className="p-4 px-8">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <li
            key={index}
            className="relative cursor-pointer rounded-xl hover:bg-neutral-500 hover:bg-opacity-10"
          >
            <div className="h-[9rem] w-full rounded-xl bg-neutral-500"></div>
            <div className="ml-1 mt-2 text-base text-neutral-300">
              {project.name}
            </div>
            <div className="ml-1 text-sm text-neutral-400">
              {getTimeAgo(project.createdAt)}
            </div>
            <div className="z-10 mb-4 mr-2 flex justify-end text-neutral-400">
              <HiOutlineDotsHorizontal
                size={25}
                className="hover:text-amber"
                onClick={() =>
                  setEditProjectIndex((prevIndex) =>
                    prevIndex === index ? null : index
                  )
                } // Toggle edit state for the specific project
              />
            </div>
            {editProjectIndex === index && (
              <EditSettings
                project={project}
                setEditProject={() => setEditProjectIndex(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
