import Colors from "./Colors.js";

class World {
  constructor() {
    const geom = new THREE.CylinderGeometry(50, 320, 320);

    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    geom.mergeVertices();

    this.waves = [];

    geom.vertices.forEach(vertex => {
      this.waves.push({
        x: vertex.x,
        y: vertex.y,
        z: vertex.z,
        ang: Math.random() * Math.PI * 2,
        amp: Math.random() * 15 + 5,
        speed: 0.016 + Math.random() * 0.032
      });
    });

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: THREE.FlatShading
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }
}

export default World;
