class Pluto {
  constructor() {
    const geom = new THREE.SphereGeometry(0.16, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/pluto.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }
  animate() {
    this.mesh.rotation.y += 0.01;
    let date = Date.now() * 0.0000004;
    this.mesh.position.set(Math.cos(date) * 3670, 0, Math.sin(date) * 3670);
  }
}

export default Pluto;
