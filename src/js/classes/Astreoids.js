import Astreoid from "./Astreoid.js";

class Astreoids {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.nAstreoids = 1000;

    const stepAngle = (Math.PI * 2) / this.nAstreoids;

    for (let i = 0; i < this.nAstreoids; i++) {
      const c = new Astreoid();

      const a = stepAngle * i;
      const h = 600 + Math.random() * 200;

      c.mesh.position.y = Math.sin(a) * h;

      c.mesh.position.x = Math.cos(a) * h;

      c.mesh.position.z = Math.random() * 20;

      c.mesh.rotation.z = a + Math.PI / 2;

      this.mesh.add(c.mesh);
    }
  }

  animate() {
    this.mesh.rotation.z -= 0.0001;
  }
}

export default Astreoids;
