class Satelite {
  constructor() {
    const loader = new THREE.OBJLoader();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/New_Horizons/satelite.obj", object => {
      this.mesh.scale.set(0.5, 0.5, 0.5);
      this.mesh.add(object);
    });
  }
}

export default Satelite;
