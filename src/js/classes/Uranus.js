class Uranus {
  constructor() {
    const geom = new THREE.SphereGeometry(3.55, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/uranus.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  animate() {
    this.mesh.rotation.y += 0.13;
    let date = Date.now() * -0.000000001;
    this.mesh.position.set(Math.cos(date) * 1700, 0, Math.sin(date) * 1700);
  }
}

export default Uranus;
