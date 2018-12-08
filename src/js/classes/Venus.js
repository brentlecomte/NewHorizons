import VenusAtmosphere from "./VenusAtmosphere.js";

class Venus {
  constructor() {
    const geom = new THREE.SphereGeometry(0.86, 40, 40);
    this.atmosphere = new VenusAtmosphere();

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/venus_surface.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.add(this.atmosphere.mesh);
  }

  animate() {
    this.atmosphere.moveAtmosphere();
    this.mesh.rotation.y -= 0.0004;
    let date = Date.now() * 0.00016;
    this.mesh.position.set(Math.cos(date) * 400, 0, Math.sin(date) * 400);
  }
}

export default Venus;
