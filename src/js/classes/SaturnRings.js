class SaturnRings {
  constructor() {
    const geom = new THREE.RingGeometry(9.2, 10.2, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/img/saturnRing.png")
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.rotation.x = Math.PI / 2 + 4;
  }

  moveRings() {
    this.mesh.rotation.z += 0.01;
  }
}

export default SaturnRings;
