class Mars {
  constructor() {
    const geom = new THREE.SphereGeometry(0.48, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/Mars.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Mars;
