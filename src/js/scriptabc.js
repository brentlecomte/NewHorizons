import Sattelite from "./classes/Sattelite.js";
import Sea from "./classes/Sea.js";
import World from "./classes/World.js";

{
  let container;

  let WIDTH, HEIGHT, fieldOfView, aspectRatio, nearPlane, farPlane;

  let camera, cameraTarget, scene, renderer;

  let hemisphereLight, shadowLight, ambientLight;

  let sattelite, world, sea;

  const init = () => {
    createScene();
    createLights();
    createSattelite();
    // createWorld();

    render();

    window.addEventListener("resize", onWindowResize, false);
  };

  const createScene = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;

    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById("world");
    container.appendChild(renderer.domElement);
  };

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    ambientLight = new THREE.AmbientLight(0xdc8874, 0.4);

    shadowLight.position.set(150, 350, 350);

    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
  };

  const createSattelite = () => {
    // const loader = new THREE.STLLoader();
    // loader.load("./assets/New_Horizons/antenna.stl", function(geometry) {
    //   console.log(geometry);
    //   var mesh = new THREE.Mesh(geometry, material);

    //   mesh.position.set(0, 0.1, 0.4);
    //   mesh.rotation.set(0, 0, 0);
    //   mesh.scale.set(0.25, 0.25, 0.25);

    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   console.log(mesh);

    //   scene.add(mesh);
    // });

    sattelite = new Sattelite();
    console.log(sattelite);

    sattelite.mesh.position.set(1, 1, 1);

    scene.add(sattelite.mesh);
  };

  const createWorld = () => {
    world = new World();

    world.mesh.position.y = 0;
    scene.add(world.mesh);
    window.world = world;
  };

  const createSea = () => {
    sea = new Sea();

    sea.mesh.position.y = -600;
    scene.add(sea.mesh);

    //DEBUGGING
    //Aanspreken in console
    // window.sea = sea;
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const render = () => {
    var timer = 0;

    camera.position.x = Math.cos(timer) * 3;
    camera.position.z = Math.sin(timer) * 3;

    renderer.render(scene, camera);
  };

  init();
}
