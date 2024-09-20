import * as THREE from "three";

class SimpleScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  constructor(container: HTMLElement, lightType: string = "direction") {
    // Create Scene
    this.scene = new THREE.Scene();

    // Create Camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 5;

    // Create Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Append Renderer to the provided container
    container.appendChild(this.renderer.domElement);

    // Add Lighting
    this.addLighting(lightType);

    // Handle window resize
    window.addEventListener("resize", this.handleResize);
  }

  private addLighting(lightType: string) {
    console.log(lightType);
    // Ambient Light: provides even lighting to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    this.scene.add(ambientLight);

    // Choose between Point Light and Directional Light based on lightType argument
    if (lightType === "point") {
      // Point Light: emits light in all directions from a point
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(5, 5, 5); // Position of the light
      pointLight.castShadow = true; // Enable shadow casting
      this.scene.add(pointLight);
    } else if (lightType === "direction") {
      // Directional Light: acts like the sun and casts shadows
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5); // Position the light above the scene
      directionalLight.castShadow = true; // Enable shadow casting

      // Optional: Adjust shadow settings (e.g., shadow map size, blur)
      directionalLight.shadow.mapSize.width = 1024; // Higher value for better quality shadows
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;

      this.scene.add(directionalLight);
    } else {
      console.warn("Invalid light type specified. Use 'point' or 'direction'.");
    }
  }

  private handleResize = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public saveScene() {
    const sceneJSON = this.scene.toJSON(); // Convert the scene to a JSON object
    const sceneString = JSON.stringify(sceneJSON); // Convert the JSON object to a string
    this.downloadJSON(sceneString, "scene.json"); // Trigger download
  }

  // Helper function to download the JSON file
  private downloadJSON(jsonString: string, filename: string) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href); // Clean up
  }
  // Cleanup function to remove event listener and dispose of renderer
  public cleanup() {
    window.removeEventListener("resize", this.handleResize);
    this.renderer.dispose();
  }
}

export default SimpleScene;
