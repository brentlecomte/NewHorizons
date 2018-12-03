class Rocket {
  constructor() {
    const loader = new THREE.OBJLoader();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/AtlasV5.obj", object => {
      this.mesh.scale.set(0.5, 0.5, 0.5);
      this.mesh.add(object);
    });
  }
}

export default Rocket;
