class Satelite {
  constructor() {
    const loader = new THREE.ObjectLoader();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/models/satellite.json", object => {
      object.scale.set(0.1, 0.1, 0.1);
      this.mesh.add(object);
    });
  }

  moveSatellite() {
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.005;
  }
}

export default Satelite;
