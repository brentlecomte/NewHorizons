class Jupiter {
  constructor() {
    const geom = new THREE.SphereGeometry(10.27, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/jupiter.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  animate() {
    this.mesh.rotation.y += 0.2;
    let date = Date.now() * 0.000009;
    this.mesh.position.set(Math.cos(date) * 1000, 0, Math.sin(date) * 1000);
  }
}

export default Jupiter;
