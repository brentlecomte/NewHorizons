import Sun from "./Sun.js";
import Mercury from "./Mercury.js";
import Venus from "./Venus.js";
import Earth from "./Earth.js";
import Mars from "./Mars.js";
import Jupiter from "./Jupiter.js";
import Saturn from "./Saturn.js";
import Neptune from "./Neptune.js";
import Uranus from "./Uranus.js";
import Pluto from "./Pluto.js";
import Astreoids from "./Astreoids.js";

class Galaxy {
  constructor() {
    this.sun = new Sun();
    this.mercury = new Mercury();
    this.venus = new Venus();
    this.earth = new Earth();
    this.mars = new Mars();
    this.jupiter = new Jupiter();
    this.saturn = new Saturn();
    this.neptune = new Neptune();
    this.uranus = new Uranus();
    this.pluto = new Pluto();
    this.astreoids = new Astreoids();

    this.mesh = new THREE.Mesh();
    this.mesh.add(this.sun.mesh);
    this.sun.mesh.position.z = 0;
    this.mesh.add(this.mercury.mesh);
    this.mercury.mesh.position.z = -100;
    this.mesh.add(this.venus.mesh);
    this.venus.mesh.position.z = -300;
    this.mesh.add(this.earth.mesh);
    this.earth.mesh.position.z = -400;
    this.mesh.add(this.mars.mesh);
    this.mars.mesh.position.z = -500;
    this.mesh.add(this.astreoids.mesh);
    this.astreoids.mesh.position.z = 0;
    this.astreoids.mesh.rotation.x = Math.PI / 2;
    this.astreoids.mesh.position.y = 10;
    this.mesh.add(this.jupiter.mesh);
    this.jupiter.mesh.position.z = -1000;
    this.mesh.add(this.saturn.mesh);
    this.saturn.mesh.position.z = -1300;
    this.mesh.add(this.neptune.mesh);
    this.uranus.mesh.position.z = -1700;

    this.neptune.mesh.position.z = -2000;
    this.mesh.add(this.uranus.mesh);
    this.mesh.add(this.pluto.mesh);

    this.pluto.mesh.position.z = -3670;
  }

  animate() {
    this.sun.animate();
    this.mercury.animate();
    this.venus.animate();
    this.earth.animate();
    this.mars.animate();
    this.jupiter.animate();
    this.saturn.animate();
    this.neptune.animate();
    this.uranus.animate();
    this.pluto.animate();
    this.astreoids.animate();
  }
}

export default Galaxy;
