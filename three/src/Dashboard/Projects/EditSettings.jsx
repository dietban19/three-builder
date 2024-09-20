import React from "react";
import { CiTrash } from "react-icons/ci";
import { useUserContext } from "../../../../context/UserContext";
import { doc, deleteDoc } from "firebase/firestore"; // Firestore utilities
import { db } from "../../../../config/firebase";
const EditSettings = ({ project, setEditProject }) => {
  const { currentUser } = useUserContext();

  // Function to delete the project from Firestore
  const deleteProject = async () => {
    try {
      // Create a reference to the project document within the user's subcollection
      const projectDocRef = doc(
        db,
        `users/${currentUser.id}/projects/${project.id}`
      );

      // Delete the project document
      await deleteDoc(projectDocRef);

      // Close the edit settings menu after deletion
      setEditProject(null);

      // Optionally, you could trigger some UI feedback here to notify the user that the project was deleted
      alert("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete the project. Please try again.");
    }
  };

  const items = [
    { name: "Delete", icon: <CiTrash size={20} />, action: deleteProject },
  ];
  console.log(project);
  return (
    <div className="absolute bottom-[-3rem] right-[-5rem] w-[14rem] bg-slate-700 p-2">
      <ul className="pt-2">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={item.action} // Call the action function on click
            className="flex cursor-pointer gap-2 rounded-md p-2 hover:bg-slate-600"
          >
            <div className="text-amber">{item.icon}</div>
            <div className="text-amber">{item.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSettings;
