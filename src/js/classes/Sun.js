class Sun {
  constructor() {
    const geom = new THREE.SphereGeometry(50, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/sun.jpg")
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  animate() {
    this.mesh.rotation.y += 0.004;
  }
}

export default Sun;
