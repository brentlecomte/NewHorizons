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
  }
}

export default Venus;
