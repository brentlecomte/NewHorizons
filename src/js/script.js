import Satelite from "./classes/Satelite.js";
import Rocket from "./classes/Rocket.js";
import Sky from "./classes/Sky.js";
import Galaxy from "./classes/Galaxy.js";

// import * as posenet from "@tensorflow-models/posenet";

{
  let container;
  let hemisphereLight, shadowLight;
  let camera,
    cameraTarget,
    scene,
    renderer,
    mesh,
    satelite,
    rocket,
    engineFire,
    sky,
    galaxy;

  let net;
  const buttonArray = ["5", "3", "1", "2", "4"];
  let buttonPressedArray = [];
  const $buttons = document.querySelectorAll("button");

  const video = document.querySelector(".video");
  video.width = 600;
  video.height = 600;
  let posePoints;
  let equal = false;

  container = document.querySelector(".world");

  const init = () => {
    threeInit();
    // getPosenet();

    $buttons.forEach(button =>
      button.addEventListener("click", () => {
        buttonEventHandler(button.textContent);
      })
    );

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
  };

  const threeInit = () => {
    //create elements
    createScene();
    createCamera();
    createLights();

    //add elements
    addCamera();
    addGalaxy();
    // addWorld();
    // addRocket();
    // addSatelite();
    // yarn

    loop();
  };

  //POSENET

  const getPosenet = async () => {
    net = await posenet.load();
    setCoordinates();
  };

  const setCoordinates = async () => {
    const pose = await net.estimateSinglePose(video, 0.5, true, 16);
    requestAnimationFrame(setCoordinates);
    posePoints = pose;
    satelite.mesh.position.x = mapValue(
      pose.keypoints[0].position.x,
      0,
      600,
      -3,
      3
    );
    satelite.mesh.position.y = mapValue(
      pose.keypoints[0].position.y,
      0,
      600,
      2,
      -2
    );
  };

  const mapValue = (value, istart, istop, ostart, ostop) =>
    ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

  //THREE.JS

  const addCamera = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(err0r => {
          console.log("Something went wrong!");
        });
    }
  };

  const addSatelite = () => {
    satelite = new Satelite();

    satelite.mesh.position.z = -8;
    satelite.mesh.position.y = -2;

    scene.add(satelite.mesh);
  };

  const addGalaxy = () => {
    galaxy = new Galaxy();

    galaxy.mesh.position.set(0, -30, -800);

    scene.add(galaxy.mesh);
  };
  const addRocket = () => {
    rocket = new Rocket();

    rocket.mesh.position.z = -40;
    rocket.mesh.position.y = -8;
    rocket.mesh.rotation.y = 1;

    scene.add(rocket.mesh);
  };

  const createSky = () => {
    sky = new Sky();
    sky.mesh.position.y = -600;
    sky.mesh.position.z = -50;

    scene.add(sky.mesh);
  };

  const addWorld = () => {
    const geom = new THREE.SphereGeometry(600, 20, 20);
    const mat = new THREE.MeshBasicMaterial({ color: 0x5acd4d });
    const sphere = new THREE.Mesh(geom, mat);

    sphere.position.set(0, -630, -200);

    scene.add(sphere);
  };

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0x000000, 0x4662f8, 0.9);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.7);

    shadowLight.position.set(0, 3, 5);

    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 3670;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
    hemisphereLight.position.set(0, -10, 0);

    scene.add(hemisphereLight);
    scene.add(shadowLight);
  };

  const createScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load("./assets/bg.jpg");

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const createCamera = () => {
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.y = 2;
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const buttonEventHandler = e => {
    buttonPressedArray.push(e);
    checkIfRightOrder();
  };

  const checkIfRightOrder = () => {
    equal = checkArrays(buttonPressedArray, buttonArray);
    if (equal === true) {
      rocket.addFire();
    } else {
      console.log("try again/keep going");
    }
  };

  const checkArrays = (a, b) => {
    if (a.length === b.length) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
  };

  const loop = () => {
    requestAnimationFrame(loop);
    render();
  };

  const render = () => {
    // satelite.mesh.rotation.x += 0.001;
    // satelite.mesh.rotation.y += 0.005;

    // rocket.animate();
    // if (equal === true) {
    //   rocket.mesh.position.y += 0.1;
    //   // camera.rotation.x += 0.002;
    //   rocket.animate();
    // }
    // camera.lookAt(
    //   new THREE.Vector3(
    //     rocket.mesh.position.x,
    //     rocket.mesh.position.y + 10,
    //     rocket.mesh.position.z
    //   )
    // );

    camera.position.z -= 1;

    // sky.mesh.rotation.z -= 0.0001;

    // planet.mesh.rotation.y += 0.001;
    // planet.animate();

    renderer.render(scene, camera);
  };

  init();
}
