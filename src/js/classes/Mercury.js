class Mercury {
  constructor() {
    const geom = new THREE.SphereGeometry(0.17, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/mercury.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = "Mercury";
  }

  animate() {
    this.mesh.rotation.y -= 0.0004;
    let date = Date.now() * -0.0000004;
    this.mesh.position.set(Math.cos(date) * 100, 0, Math.sin(date) * 100);
  }
}

export default Mercury;
