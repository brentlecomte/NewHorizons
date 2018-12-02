class Satelite {
  constructor() {
    const loader = new THREE.OBJLoader();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/New_Horizons/satelite.obj", object => {
      this.mesh.add(object);
    });
  }
}

export default Satelite;
