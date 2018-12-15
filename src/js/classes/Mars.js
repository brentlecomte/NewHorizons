class Mars {
  constructor() {
    const geom = new THREE.SphereGeometry(0.48, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/Mars.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  animate() {
    this.mesh.rotation.y += 0.11;
    let date = Date.now() * -0.00000018;
    this.mesh.position.set(Math.cos(date) * 500, 0, Math.sin(date) * 500);
  }
}

export default Mars;
