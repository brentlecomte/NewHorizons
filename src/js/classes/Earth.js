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
    this.mesh.rotation.y += 0.001;
    let date = Date.now() * -0.0000001;
    this.mesh.position.set(Math.cos(date) * 400, 0, Math.sin(date) * 400);
  }
}

export default Earth;
