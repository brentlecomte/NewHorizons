{
  let container, stats;

  var loader = new THREE.OBJLoader();
  let hemisphereLight, shadowLight;

  let camera, cameraTarget, scene, renderer, mesh;
  container = document.createElement("div");
  document.body.appendChild(container);

  const init = () => {
    createScene();
    createCamera();
    createLights();

    // load a resource
    loader.load(
      // resource URL
      "./assets/New_Horizons/satelite.obj",
      // called when resource is loaded
      object => {
        object.position.z = -6;
        object.position.y = -5;
        object.position.x = -4;

        // var mat = new THREE.MeshPhongMaterial({
        //   color: "#FFFFFF",
        //   transparent: true,
        //   opacity: 0.6,
        //   shading: THREE.FlatShading
        // });

        // mesh = new THREE.Mesh(object, mat);

        // scene.add(mesh);

        scene.add(object);
      }
    );

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
  };

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    console.log(hemisphereLight);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    // Set the direction of the light
    shadowLight.position.set(3, 0.15, 3);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    console.log(hemisphereLight);
    scene.add(hemisphereLight);
    scene.add(shadowLight);
  };

  const createScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x72645b);
    scene.fog = new THREE.Fog(0x72645b, 2, 15);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const createCamera = () => {
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      15
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
