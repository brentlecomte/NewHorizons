import Cloud from "./Cloud.js";

class Sky {
  constructor() {
    this.mesh = new THREE.Object3D();

    this.nClouds = 500;

    const stepAngle = (Math.PI * 2) / this.nClouds;

    for (let i = 0; i < this.nClouds; i++) {
      const c = new Cloud();

      const a = stepAngle * i;
      const h = 600 + Math.random() * 200;

      c.mesh.position.y = Math.sin(a) * h;

      c.mesh.position.x = Math.cos(a) * h;

      c.mesh.rotation.z = a + Math.PI / 2;

      c.mesh.scale.set(0.5, 0.5, 0.5);

      this.mesh.add(c.mesh);
    }
  }
}

export default Sky;
