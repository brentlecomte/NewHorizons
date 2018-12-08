class Neptune {
  constructor() {
    const geom = new THREE.SphereGeometry(3.67, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/neptunus.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Neptune;
