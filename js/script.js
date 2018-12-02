import Satelite from "./classes/Satelite.js";
// import * as posenet from "@tensorflow-models/posenet";

{
  let container, stats;
  let hemisphereLight, shadowLight;
  let camera, cameraTarget, scene, renderer, mesh, satelite;

  const video = document.querySelector(".video");
  video.width = 600;
  video.height = 600;
  let posePoints;

  container = document.createElement("div");
  document.body.appendChild(container);

  const init = () => {
    addCamera();
    createScene();
    createSatelite();
    createCamera();
    createLights();
    getPosenet();

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
  };

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

  const getPosenet = async () => {
    const net = await posenet.load();
    const pose = await net.estimateSinglePose(video, 0.5, true, 16);

    posePoints = pose;
    requestAnimationFrame(getPosenet);
  };

  const createSatelite = () => {
    satelite = new Satelite();

    satelite.mesh.position.z = -8;
    satelite.mesh.position.y = -5;
    satelite.mesh.position.x = -6;

    scene.add(satelite.mesh);
  };

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    shadowLight.position.set(3, 0.15, 3);

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
  };

  const createScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x72645b);
    scene.de;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const createCamera = () => {
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(3, 0.15, 3);

    cameraTarget = new THREE.Vector3(0, -0.25, 0);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const animate = () => {
    requestAnimationFrame(animate);

    render();
  };

  const render = () => {
    var timer = Date.now() * 0.0005;

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);
  };

  init();
  animate();
}
