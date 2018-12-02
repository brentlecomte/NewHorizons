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
    threeInit();
    getPosenet();

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
    addSatelite();

    loop();
  };

  //POSENET

  const getPosenet = async () => {
    const net = await posenet.load();
    const pose = await net.estimateSinglePose(video, 0.5, true, 16);

    runPosenet(pose);
  };

  const runPosenet = pose => {
    requestAnimationFrame(getPosenet);
    posePoints = pose;
    satelite.mesh.position.x = mapValue(
      posePoints.keypoints[0].position.x,
      0,
      600,
      0,
      1
    );
    satelite.mesh.position.y = mapValue(
      posePoints.keypoints[0].position.y,
      0,
      600,
      0,
      1
    );
    console.log(posePoints);
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

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0x000000, 0x4662f8, 0.9);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.7);

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
    hemisphereLight.position.set(0, -10, 0);

    scene.add(hemisphereLight);
    scene.add(shadowLight);
  };

  const createScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x72645b);

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

    camera.position.z = 5;
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const loop = () => {
    requestAnimationFrame(loop);

    render();
  };

  const render = () => {
    satelite.mesh.rotation.x += 0.001;
    satelite.mesh.rotation.y += 0.005;

    renderer.render(scene, camera);
  };

  init();
}
