class VenusAtmosphere {
  constructor() {
    const geom = new THREE.SphereGeometry(0.88, 40, 40);

    const mat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/img/venus_atmosphere.jpg"),
      transparent: true,
      opacity: 0.9
    });

    this.mesh = new THREE.Mesh(geom, mat);
  }

  moveAtmosphere() {
    this.mesh.rotation.y += 0.005;
  }
}

export default VenusAtmosphere;
