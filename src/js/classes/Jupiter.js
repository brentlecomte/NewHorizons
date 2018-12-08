class Jupiter {
  constructor() {
    const geom = new THREE.SphereGeometry(10.27, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/jupiter.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Jupiter;
