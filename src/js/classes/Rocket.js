import EngineFire from "./EngineFire.js";
import Colors from "./Colors.js";

class Rocket {
  constructor() {
    const loader = new THREE.ObjectLoader();
    this.engineFire = new EngineFire();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/models/atlasV5.json", geometry => {
      this.mesh.add(geometry);
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
