import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useUserContext } from "../../../../context/UserContext";
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../../config/firebase";
import { useHouseContext } from "../../../../context/HouseContext";
import Project from "../../../../packages/automata-bim/Projects/Project";
import { useNavigate } from "react-router-dom";
const CreateNewProject = ({ setNewProject }) => {
  const { currentUser } = useUserContext();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const { setCurrentProject } = useHouseContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.id) {
      console.error("No current user found");
      return;
    }

    const newProject = {
      name: projectName,
      description: projectDescription,
      userId: currentUser.id,
      createdAt: new Date(), // You might want to add the creation date
      attributes: {},
    };
    try {
      // Reference to the user's document in the 'users' collection
      const userDocRef = doc(db, "users", currentUser.id);

      // Add a new document in the 'projects' sub-collection under the current user
      const newDocRef = await addDoc(
        collection(userDocRef, "projects"),
        newProject
      );
      console.log(newDocRef);

      // Optionally, retrieve and log the newly created document's data
      const newDocSnapshot = await getDoc(newDocRef);
      if (newDocSnapshot.exists()) {
        console.log("New project data:", newDocSnapshot.data());
      } else {
        console.log("No such document!");
      }
      // Optionally, show a success message or notification here
      const currentProject = new Project(
        projectName,
        projectDescription,
        currentUser.id,
        newDocRef.id
      );
      setCurrentProject(currentProject);
      navigate("/map");
      // Close the modal after submitting
      setNewProject(false);
    } catch (error) {
      console.error("Error creating project:", error);
      // Optionally, show an error message or notification here
    }
  };

  return (
    <div className="fixed z-1000 flex h-screen w-full items-center justify-center bg-neutral-800 bg-opacity-70 backdrop-blur-sm">
      <div className="card-bg-100 flex w-[25rem] flex-col p-4">
        <div className="mb-3 flex justify-between">
          <div className="font-base text-xl text-neutral-300">
            Create New Project
          </div>
          <IoMdClose
            className="cursor-pointer text-amber-500"
            onClick={() => setNewProject(false)}
            size={20}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-1 mt-3 text-neutral-200">Project Name</div>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-neutral-500 p-2 outline-none"
            required
          />

          <div className="mb-1 mt-3 text-neutral-200">Project Description</div>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full bg-neutral-500 p-2 outline-none"
            rows="4"
            required
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setNewProject(false)}
              className="flex-justify-center items-center rounded-xl border border-amber-600 p-2 px-3 font-semibold text-amber-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-justify-center items-center rounded-xl bg-amber p-2 px-3 font-semibold text-neutral-900"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProject;
