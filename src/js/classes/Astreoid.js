class Astreoid {
  constructor() {
    this.mesh = new THREE.Object3D();
    const geom = new THREE.SphereGeometry(2, 10, 10);

    const mat = new THREE.MeshPhongMaterial({
      color: 0x877762
    });

    const nCricles = 3 + Math.floor(Math.random() * 2);

    for (let i = 0; i < nCricles; i++) {
      const m = new THREE.Mesh(geom, mat);

      m.position.x = i * 1.8;
      m.position.y = 1.5 * Math.random();
      m.position.z = 1.5 * Math.random();

      const s = 0.5 + Math.random();
      m.scale.set(s, s, s);

      m.castShadow = true;
      m.receiveShadow = true;

      this.mesh.add(m);
    }
  }
}

export default Astreoid;
