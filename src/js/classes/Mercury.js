class Mercury {
  constructor() {
    const geom = new THREE.SphereGeometry(0.17, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/mercury.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = "Mercury";
    this.mesh.position.x = 3;
  }
}

export default Mercury;
