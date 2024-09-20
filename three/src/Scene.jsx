import React, { useRef, useEffect } from "react";
import SimpleScene from "./packages/three-builder/src/core/SimpleScene";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default function Scene() {
  const mountRef = useRef(null);
  useEffect(() => {
    let threeJSBase;
    if (mountRef.current) {
      // Initialize ThreeJSBase
      threeJSBase = new SimpleScene(mountRef.current);

      // Create a Cube
      const material = new THREE.MeshLambertMaterial({ color: "#6528D7" });
      const geometry = new THREE.BoxGeometry();
      const cube = new THREE.Mesh(geometry, material);
      threeJSBase.scene.add(cube);
      cube.position.y += 0.5;
      // Create GridHelper
      const gridHelper = new THREE.GridHelper(100, 100, 0x333333, 0x333333);
      threeJSBase.scene.add(gridHelper);

      // Add OrbitControls
      const controls = new OrbitControls(
        threeJSBase.camera,
        threeJSBase.renderer.domElement
      );
      controls.enableDamping = true;
      //   threeJSBase.saveScene();
      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        threeJSBase?.renderer.render(threeJSBase.scene, threeJSBase.camera);
      };
      animate();
    }

    return () => {
      if (threeJSBase) {
        threeJSBase.cleanup();
      }
    };
  }, []);
  return <div ref={mountRef} />;
}
