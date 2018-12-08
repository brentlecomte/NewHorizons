class Neptune {
  constructor() {
    const geom = new THREE.SphereGeometry(3.67, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/neptunus.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  animate() {
    this.mesh.rotation.y += 0.14;
    let date = Date.now() * 0.0000006;
    this.mesh.position.set(Math.cos(date) * 2000, 0, Math.sin(date) * 2000);
  }
}

export default Neptune;
