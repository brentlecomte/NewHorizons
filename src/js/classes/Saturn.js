import SaturnRings from "./SaturnRings.js";

class Earth {
  constructor() {
    const geom = new THREE.SphereGeometry(8.66, 40, 40);
    this.atmosphere = new SaturnRings();

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/saturn.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = "Saturn";
    this.mesh.add(this.atmosphere.mesh);
  }

  animate() {
    this.atmosphere.moveRings();
  }
}

export default Earth;
