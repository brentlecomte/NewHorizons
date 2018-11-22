class Sattelite {
  constructor() {
    this.mesh = new THREE.Object3D();

    const loader = new THREE.STLLoader();

    loader.load("./assets/New_Horizons/antenna.stl", function(geometry) {
      // const material = new THREE.MeshPhongMaterial({
      //   color: 0xff5533,
      //   specular: 0x111111,
      //   shininess: 200
      // });

      // const antenna = new THREE.Mesh(geometry, material);
      // console.log(antenna);
      // antenna.castShadow = true;
      // antenna.receiveShadow = true;
      this.mesh.add(geometry);
    });
  }
}

export default Sattelite;
