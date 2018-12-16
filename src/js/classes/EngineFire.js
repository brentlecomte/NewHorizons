class EngineFire {
  constructor() {
    const geom = new THREE.BoxGeometry(2, 0.1, 1, 5, 5, 5);
    const mat = new THREE.MeshBasicMaterial({ color: 0xf40d1a });

    geom.mergeVertices();

    this.flames = [];

    geom.vertices.forEach(vertex => {
      this.flames.push({
        x: vertex.x,
        y: vertex.y,
        z: vertex.z,
        ang: Math.random() * Math.PI * 2,
        amp: Math.random() * 5 + 2,
        speed: 1 + Math.random() * 0.032
      });
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.z = -0.01;
    this.mesh.position.x = 1.01;
  }

  moveFlames() {
    this.mesh.geometry.vertices.forEach((vertex, index) => {
      const flame = this.flames[index];
      // vertex.x = flame.x + Math.cos(flame.ang) * flame.amp;
      vertex.y = flame.y + Math.sin(flame.ang) * flame.amp;

      flame.ang += flame.speed;
    });

    this.mesh.geometry.verticesNeedUpdate = true;
  }
}

export default EngineFire;
