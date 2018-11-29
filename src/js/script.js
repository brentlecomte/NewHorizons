{
  let container, stats;

  var loader = new THREE.OBJLoader();

  let camera, cameraTarget, scene, renderer;
  container = document.createElement("div");
  document.body.appendChild(container);

  const init = () => {
    createCamera();
    createScene();

    // load a resource
    loader.load(
      // resource URL
      "./assets/New_Horizons/satelite.obj",
      // called when resource is loaded
      object => {
        object.position.z = -6;
        object.position.y = -5;
        object.position.x = -4;

        scene.add(object);
      }
    );

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
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

  const addShadowedLight = (x, y, z, color, intensity) => {
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
