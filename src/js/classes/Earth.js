import EarthAtmosphere from "./EarthAtmosphere.js";

class Earth {
  constructor() {
    const geom = new THREE.SphereGeometry(0.92, 40, 40);
    this.atmosphere = new EarthAtmosphere();

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/earth.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.add(this.atmosphere.mesh);
  }

  animate() {
    this.atmosphere.moveAtmosphere();
  }
}

export default Earth;
