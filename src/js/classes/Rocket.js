import EngineFire from "./EngineFire.js";
import Colors from "./Colors.js";

class Rocket {
  constructor() {
    const loader = new THREE.OBJLoader();
    this.engineFire = new EngineFire();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/AtlasV5.obj", object => {
      this.mesh.scale.set(0.5, 0.5, 0.5);
      this.mesh.add(object);
    });
  }

  addFire() {
    for (let i = 0; i < 3; i++) {
      this.engineFire.mesh.material.color.setHex(Colors[i]);
      this.engineFire.mesh.position.y = i * -0.05;
      this.mesh.add(this.engineFire.mesh);
      console.log(this.mesh);
    }
  }

  animate() {
    this.engineFire.moveFlames();
  }
}

export default Rocket;
