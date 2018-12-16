import SaturnRings from "./SaturnRings.js";

class Earth {
  constructor() {
    const geom = new THREE.SphereGeometry(8.66, 40, 40);
    this.atmosphere = new SaturnRings();

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/img/saturn.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = "Saturn";
    this.mesh.add(this.atmosphere.mesh);
  }

  animate() {
    this.atmosphere.moveRings();
    this.mesh.rotation.y += 0.2;
    let date = Date.now() * -0.000000003;
    this.mesh.position.set(Math.cos(date) * 1300, 0, Math.sin(date) * 1300);
  }
}

export default Earth;
