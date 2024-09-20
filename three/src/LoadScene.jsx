import React, { useEffect, useRef } from "react";
import * as THREE from "three";
const LoadScene = ({ sceneJson }) => {
  const mountRef = useRef(null);
  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.ObjectLoader().parse(sceneJson);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup when the component unmounts
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [sceneJson]);

  return <div ref={mountRef}></div>;
};

export default LoadScene;
