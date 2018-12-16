class Cloud {
  constructor() {
    this.mesh = new THREE.Object3D();
    const geom = new THREE.BoxGeometry(1, 1, 1);

    const mat = new THREE.MeshPhongMaterial({
      color: 0xf9f9f9
    });

    const nBlocs = 4 + Math.floor(Math.random() * 3);

    for (let i = 0; i < nBlocs; i++) {
      const m = new THREE.Mesh(geom, mat);

      m.position.x = i * 0.8;
      m.position.y = Math.random();

      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      const s = 0.1 + Math.random();
      m.scale.set(s, s, s);

      m.castShadow = true;
      m.receiveShadow = true;

      this.mesh.add(m);
    }
  }
}

export default Cloud;
