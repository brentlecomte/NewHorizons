// import Sattelite from "./classes/Sattelite.js";
// import Sea from "./classes/Sea.js";
// import World from "./classes/World.js";

// {
//   let container;

//   let WIDTH, HEIGHT, fieldOfView, aspectRatio, nearPlane, farPlane;

//   let camera, cameraTarget, scene, renderer;

//   let hemisphereLight, shadowLight, ambientLight;

//   let sattelite, world, sea;

//   const init = () => {
//     createScene();
//     createLights();
//     createSattelite();
//     createWorld();

//     render();

//     window.addEventListener("resize", onWindowResize, false);
//   };

//   const createScene = () => {
//     WIDTH = window.innerWidth;
//     HEIGHT = window.innerHeight;

//     scene = new THREE.Scene();

//     aspectRatio = WIDTH / HEIGHT;

//     fieldOfView = 60;
//     nearPlane = 1;
//     farPlane = 10000;
//     camera = new THREE.PerspectiveCamera(
//       fieldOfView,
//       aspectRatio,
//       nearPlane,
//       farPlane
//     );

//     camera.position.x = 0;
//     camera.position.y = 0;
//     camera.position.z = 0;

//     renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true
//     });

//     renderer.setSize(WIDTH, HEIGHT);
//     renderer.shadowMap.enabled = true;

//     container = document.getElementById("world");
//     container.appendChild(renderer.domElement);
//   };

//   const createLights = () => {
//     hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
//     shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
//     ambientLight = new THREE.AmbientLight(0xdc8874, 0.4);

//     shadowLight.position.set(150, 350, 350);

//     shadowLight.castShadow = true;

//     shadowLight.shadow.camera.left = -400;
//     shadowLight.shadow.camera.right = 400;
//     shadowLight.shadow.camera.top = 400;
//     shadowLight.shadow.camera.bottom = -400;
//     shadowLight.shadow.camera.near = 1;
//     shadowLight.shadow.camera.far = 1000;

//     shadowLight.shadow.mapSize.width = 2048;
//     shadowLight.shadow.mapSize.height = 2048;

//     scene.add(hemisphereLight);
//     scene.add(shadowLight);
//     scene.add(ambientLight);
//   };

//   const createSattelite = () => {
//     sattelite = new Sattelite();

//     sattelite.mesh.receiveShadow = true;
//     sattelite.mesh.castShadow = true;
//     console.log("help", sattelite.mesh);

//     scene.add(sattelite.mesh);
//   };

//   const createWorld = () => {
//     world = new World();

//     world.mesh.position.y = 0;
//     scene.add(world.mesh);
//     window.world = world;
//   };

//   const createSea = () => {
//     sea = new Sea();

//     sea.mesh.position.y = -600;
//     scene.add(sea.mesh);

//     //DEBUGGING
//     //Aanspreken in console
//     // window.sea = sea;
//   };

//   // const addShadowedLight = (x, y, z, color, intensity) => {
//   //   var directionalLight = new THREE.DirectionalLight(color, intensity);
//   //   directionalLight.position.set(x, y, z);
//   //   scene.add(directionalLight);

//   //   directionalLight.castShadow = true;

//   //   var d = 1;
//   //   directionalLight.shadow.camera.left = -d;
//   //   directionalLight.shadow.camera.right = d;
//   //   directionalLight.shadow.camera.top = d;
//   //   directionalLight.shadow.camera.bottom = -d;

//   //   directionalLight.shadow.camera.near = 1;
//   //   directionalLight.shadow.camera.far = 4;

//   //   directionalLight.shadow.mapSize.width = 1024;
//   //   directionalLight.shadow.mapSize.height = 1024;

//   //   directionalLight.shadow.bias = -0.002;
//   // };

//   const onWindowResize = () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//   };

//   const render = () => {
//     var timer = 0;

//     camera.position.x = Math.cos(timer) * 3;
//     camera.position.z = Math.sin(timer) * 3;

//     renderer.render(scene, camera);
//   };

//   init();
// }

var container, stats;

var camera, cameraTarget, scene, renderer;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    15
  );
  camera.position.set(3, 0.15, 3);

  cameraTarget = new THREE.Vector3(0, -0.25, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x72645b);
  scene.fog = new THREE.Fog(0x72645b, 2, 15);

  // Ground

  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(40, 40),
    new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  scene.add(plane);

  plane.receiveShadow = true;

  // ASCII file

  var loader = new THREE.STLLoader();
  loader.load("./assets/New_Horizons/body.stl", function(geometry) {
    var material = new THREE.MeshPhongMaterial({
      color: 0xff5533,
      specular: 0x111111,
      shininess: 200
    });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, -0.25, 0.6);
    mesh.rotation.set(0, -Math.PI / 2, 0);
    mesh.scale.set(0.5, 0.5, 0.5);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
  });

  // Binary files

  var material = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    specular: 0x111111,
    shininess: 200
  });

  loader.load("./assets/New_Horizons/antenna.stl", function(geometry) {
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, -0.37, -0.6);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
    mesh.scale.set(2, 2, 2);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
  });

  loader.load("./models/stl/binary/pr2_head_tilt.stl", function(geometry) {
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0.136, -0.37, -0.6);
    mesh.rotation.set(-Math.PI / 2, 0.3, 0);
    mesh.scale.set(2, 2, 2);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
  });

  // Colored binary STL
  loader.load("./models/stl/binary/colored.stl", function(geometry) {
    var meshMaterial = material;
    if (geometry.hasColors) {
      meshMaterial = new THREE.MeshPhongMaterial({
        opacity: geometry.alpha,
        vertexColors: THREE.VertexColors
      });
    }

    var mesh = new THREE.Mesh(geometry, meshMaterial);

    mesh.position.set(0.5, 0.2, 0);
    mesh.rotation.set(-Math.PI / 2, Math.PI / 2, 0);
    mesh.scale.set(0.3, 0.3, 0.3);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
  });

  // Lights

  scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

  addShadowedLight(1, 1, 1, 0xffffff, 1.35);
  addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
  // renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;

  container.appendChild(renderer.domElement);

  //

  window.addEventListener("resize", onWindowResize, false);
}

function addShadowedLight(x, y, z, color, intensity) {
  var directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);

  directionalLight.castShadow = true;

  var d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.bias = -0.002;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  var timer = Date.now() * 0.0005;

  camera.position.x = Math.cos(timer) * 3;
  camera.position.z = Math.sin(timer) * 3;

  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);
}
