class Satelite {
  constructor() {
    const loader = new THREE.ObjectLoader();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/New_Horizons/satellite.json", object => {
      this.mesh.add(object);
    });
  }
}

export default Satelite;
