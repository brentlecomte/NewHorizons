class Platform {
  constructor() {
    const loader = new THREE.ObjectLoader();

    this.mesh = new THREE.Mesh();

    loader.load("./assets/models/platform.json", object => {
      object.scale.set(1, 1, 1);
      this.mesh.add(object);
    });
  }
}

export default Platform;
