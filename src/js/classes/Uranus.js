class Uranus {
  constructor() {
    const geom = new THREE.SphereGeometry(3.55, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/uranus.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Uranus;
