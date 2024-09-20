import React from "react";
import Scene from "./Scene";
import LoadScene from "./LoadScene";
import jsonScene from "./scene.json";

function App() {
  console.log(jsonScene);
  return (
    <div>
      {/* <Scene /> */}
      <LoadScene sceneJson={jsonScene} />
    </div>
  );
}

export default App;
