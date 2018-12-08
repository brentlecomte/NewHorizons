class EarthAsmphere {
  constructor() {
    const geom = new THREE.SphereGeometry(0.94, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/earth_clouds.png"),
      transparent: true,
      opacity: 0.7
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  moveAtmosphere() {
    this.mesh.rotation.y += 0.005;
  }
}

export default EarthAsmphere;
