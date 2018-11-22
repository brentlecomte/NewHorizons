class Sattelite {
  constructor(scene) {
    const loader = new THREE.STLLoader();

    var material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0x111111,
      shininess: 200
    });

    console.log(material);
    loader.load("./assets/New_Horizons/antenna.stl", function(geometry) {
      console.log(geometry);
      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, 0.1, 0.4);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(0.25, 0.25, 0.25);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      console.log(mesh);

      scene.add(mesh);
    });
  }
}

export default Sattelite;

// class Sattelite {
//   constructor() {
//     this.mesh = new THREE.Object3D();
//     const loader = new THREE.STLLoader();

//     loader.load("./assets/New_Horizons/antenna.stl", function(geometry) {
//       const material = new THREE.MeshPhongMaterial({
//         color: 0xff5533,
//         specular: 0x111111,
//         shininess: 200
//       });

//       const antenna = new THREE.Mesh(geometry, material);

//       antenna.castShadow = true;
//       antenna.receiveShadow = true;
//       this.mesh.add(geometry);
//     });
//   }
// }
// export default Sattelite;
