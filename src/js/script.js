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
    // createSea();
    createWorld();

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
    sattelite = new Sattelite();

    sattelite.mesh.receiveShadow = true;
    sattelite.mesh.castShadow = true;

    scene.add(sattelite.mesh);
  };

  const createWorld = () => {
    world = new World();

    world.mesh.position.y = -550;
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

  // const addShadowedLight = (x, y, z, color, intensity) => {
  //   var directionalLight = new THREE.DirectionalLight(color, intensity);
  //   directionalLight.position.set(x, y, z);
  //   scene.add(directionalLight);

  //   directionalLight.castShadow = true;

  //   var d = 1;
  //   directionalLight.shadow.camera.left = -d;
  //   directionalLight.shadow.camera.right = d;
  //   directionalLight.shadow.camera.top = d;
  //   directionalLight.shadow.camera.bottom = -d;

  //   directionalLight.shadow.camera.near = 1;
  //   directionalLight.shadow.camera.far = 4;

  //   directionalLight.shadow.mapSize.width = 1024;
  //   directionalLight.shadow.mapSize.height = 1024;

  //   directionalLight.shadow.bias = -0.002;
  // };

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
