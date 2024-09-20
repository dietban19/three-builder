import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import NewProjects from "./NewProjects/NewProjects";
import Projects from "./Projects/Projects";
import CreateNewProject from "./NewProjects/CreateNewProject";
// import { useUserContext } from '../../../context/UserContext';
// import { collection, getDocs, doc } from 'firebase/firestore';
// import { db } from '../../../config/firebase';
import DashboardLoader from "./DashboardLoader";
const MainDashboard = () => {
  //   const { currentUser } = useUserContext(); // Get current user from context
  const [newProject, setNewProject] = useState(false);
  const [projects, setProjects] = useState([]); // State to store the projects
  const [loading, setLoading] = useState(false);
  // useEffect to fetch projects when the component loads
  //   useEffect(() => {
  //     setLoading(true);
  //     const fetchProjects = async () => {
  //       if (!currentUser?.id) {
  //         console.error('No user found');
  //         return;
  //       }

  //       try {
  //         // Reference to the 'projects' sub-collection in the 'users' collection
  //         const userDocRef = doc(db, 'users', currentUser.id);
  //         const projectsCollectionRef = collection(userDocRef, 'projects');

  //         // Fetch all documents from the 'projects' sub-collection
  //         const querySnapshot = await getDocs(projectsCollectionRef);
  //         const projectsList = querySnapshot.docs.map((doc) => ({
  //           id: doc.id, // Capture the document ID
  //           ...doc.data(), // Spread the rest of the document data
  //         }));
  //         console.log(projectsList);
  //         setProjects(projectsList); // Set the fetched projects to state
  //       } catch (error) {
  //         console.error('Error fetching projects:', error);
  //       }
  //     };

  //     fetchProjects(); // Call the function to fetch projects on component load
  //     setLoading(false);
  //   }, [currentUser]); // Only re-run the effect if currentUser changes
  //   if (loading) {
  //     return <DashboardLoader />;
  //   }
  return (
    <>
      <div className="relative flex h-screen">
        {newProject && <CreateNewProject setNewProject={setNewProject} />}
        <Sidebar />
        <div className="nav-bg flex w-full flex-col">
          <Header />
          <NewProjects setNewProject={setNewProject} />
          <Projects projects={projects} /> {/* Pass the fetched projects */}
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
