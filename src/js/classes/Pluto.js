class Pluto {
  constructor() {
    const geom = new THREE.SphereGeometry(0.16, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/pluto.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Pluto;
