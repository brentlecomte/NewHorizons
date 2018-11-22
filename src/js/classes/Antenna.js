class Antenna {
  constructor(scene) {
    this.loader = new THREE.STLLoader();
    this.mesh = {};
    this.material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0x111111,
      shininess: 200
    });
    // loadGeometry() {
    //   return new Promise((resolve, reject) => {
    this.loader.load("./assets/New_Horizons/antenna.stl", geometry => {
      this.mesh = new THREE.Mesh(geometry, this.material);

      this.mesh.position.set(1, -0.5, 1);
      this.mesh.rotation.set(0, Math.PI / 2 - 80, 0);
      this.mesh.scale.set(0.25, 0.25, 0.25);

      this.mesh.castShadow = true;
      this.mesh.receiveShadow = true;

      // alert();
      // resolve(geometry);
    });
    //   });
    // }
  }
}

export default Antenna;
