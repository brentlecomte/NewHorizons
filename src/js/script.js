import Satelite from "./classes/Satelite.js";
import Galaxy from "./classes/Galaxy.js";
import Rocket from "./classes/Rocket.js";
import Sky from "./classes/Sky.js";

{
  let pointlight1,
    pointlight2,
    pointlight3,
    pointlight4,
    pointlight5,
    pointlight6,
    hemisphereLight,
    shadowLight,
    camera,
    scene,
    renderer,
    satelite,
    galaxy,
    net,
    posePoints,
    rocket,
    engineFire,
    sky,
    detectionSphere,
    radius,
    centerpointx,
    centerpointz;

  let collidableMeshList = [];
  let buttonPressedArray = [];
  let equal = false;
  let jupiterPassed = false;

  const video = document.querySelector(".video");
  const container = document.querySelector(".world");
  const buttonArray = ["5", "3", "1", "2", "4"];
  const $buttons = document.querySelectorAll("button");

  const init = () => {
    video.width = 600;
    video.height = 600;

    // launch();
    space();

    container.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize, false);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const launch = () => {
    const launchInit = () => {
      createScene();
      createCamera();
      createLights();

      //add elements
      addCamera();
      addWorld();
      addRocket();
      createSky();

      loop();
      $buttons.forEach(button =>
        button.addEventListener("click", () => {
          buttonEventHandler(button.textContent);
        })
      );
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
      scene.background = new THREE.Color(0xffffff);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const createCamera = () => {
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
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

    const addRocket = () => {
      rocket = new Rocket();

      rocket.mesh.position.z = -40;
      rocket.mesh.position.y = -8;
      rocket.mesh.rotation.y = 1;

      rocket.mesh.castShadow = true;
      rocket.mesh.receiveShadow = true;

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

      sphere.receiveShadow = true;

      sphere.position.set(0, -630, -200);

      scene.add(sphere);
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
      rocket.animate();
      if (equal === true) {
        rocket.mesh.position.y += 0.1;
        rocket.animate();
      }

      camera.lookAt(
        new THREE.Vector3(
          rocket.mesh.position.x,
          rocket.mesh.position.y + 13,
          rocket.mesh.position.z
        )
      );

      sky.mesh.rotation.z -= 0.0001;

      renderer.render(scene, camera);
    };

    launchInit();
  };

  const space = () => {
    const spaceInit = () => {
      getPosenet();
      createScene();
      createCamera();
      createLights();

      //add elements
      addCamera();
      addGalaxy();
      addSatelite();

      loop();
    };

    const getPosenet = async () => {
      net = await posenet.load();
      setCoordinates();
    };

    const setCoordinates = async () => {
      const pose = await net.estimateSinglePose(video, 0.5, true, 16);
      requestAnimationFrame(setCoordinates);
      // if (pose.keypoints[0].position.x < 200) {
      //   camera.position.set(
      //     Math.cos(Date.now() * 0.03) * 4,
      //     -30,
      //     Math.sin(Date.now() * 0.03) * 4 - 790
      //   );

      //   console.log("cam", camera.position);
      // } else if (pose.keypoints[0].position.x > 400) {
      //   console.log("rechts");
      // } else {
      //   console.log("middden");
      // }

      posePoints = pose;

      satelite.mesh.position.x = mapValue(
        pose.keypoints[0].position.x,
        0,
        600,
        camera.position.x - 3,
        camera.position.x + 3
      );

      satelite.mesh.position.y = mapValue(
        pose.keypoints[0].position.y,
        0,
        600,
        camera.position.y + 2,
        camera.position.y - 2
      );
      detectionSphere.position.set(
        satelite.mesh.position.x,
        satelite.mesh.position.y + 0.3,
        satelite.mesh.position.z
      );
      detectionSphere.rotation.set(
        satelite.mesh.rotation.x,
        satelite.mesh.rotation.y,
        satelite.mesh.rotation.z
      );

      satelite.mesh.position.z = camera.position.z - 2;
    };

    const mapValue = (value, istart, istop, ostart, ostop) =>
      ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

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

      satelite.mesh.castShadow = true;
      satelite.mesh.receiveShadow = true;

      const geom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0
      });

      detectionSphere = new THREE.Mesh(geom, mat);

      scene.add(detectionSphere);
      scene.add(satelite.mesh);
    };

    const addGalaxy = () => {
      galaxy = new Galaxy();

      galaxy.mesh.position.set(0, -30, -800);
      collidableMeshList.push(galaxy.astreoids.mesh);

      scene.add(galaxy.mesh);
    };

    const createLights = () => {
      pointlight1 = new THREE.PointLight(0xf6c861);
      pointlight2 = new THREE.PointLight(0xf6c861);
      pointlight3 = new THREE.PointLight(0xf6c861);
      pointlight4 = new THREE.PointLight(0xf6c861);
      pointlight5 = new THREE.PointLight(0xf6c861);
      pointlight6 = new THREE.PointLight(0xf6c861);

      pointlight1.position.set(0, 0, -600);
      pointlight2.position.set(0, 0, -800);
      pointlight3.position.set(-150, -100, -700);
      pointlight4.position.set(150, 100, -700);
      pointlight5.position.set(-150, 100, -700);
      pointlight6.position.set(150, -100, -700);

      scene.add(pointlight1);
      scene.add(pointlight2);
      scene.add(pointlight3);
      scene.add(pointlight4);
      scene.add(pointlight5);
      scene.add(pointlight6);
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
        50,
        window.innerWidth / window.innerHeight,
        1,
        5000
      );
    };

    const loop = () => {
      requestAnimationFrame(loop);

      if (jupiterPassed === false) {
        radius =
          Math.sqrt(
            Math.pow(
              galaxy.jupiter.mesh.position.x - galaxy.earth.mesh.position.x,
              2
            ) +
              Math.pow(
                galaxy.jupiter.mesh.position.z - galaxy.earth.mesh.position.z,
                2
              )
          ) / 2;

        centerpointx =
          (galaxy.earth.mesh.position.x + galaxy.jupiter.mesh.position.x) / 2;
        centerpointz =
          (galaxy.earth.mesh.position.z + galaxy.jupiter.mesh.position.z) / 2;

        if (
          Math.floor(satelite.mesh.position.x - 10) <
            Math.floor(galaxy.jupiter.mesh.position.x + 5) &&
          Math.floor(satelite.mesh.position.x - 10) >
            Math.floor(galaxy.jupiter.mesh.position.x - 5) &&
          Math.floor(satelite.mesh.position.z + 800) <
            Math.floor(galaxy.jupiter.mesh.position.z + 5) &&
          Math.floor(satelite.mesh.position.z + 800) >
            Math.floor(galaxy.jupiter.mesh.position.z - 5)
        ) {
          jupiterPassed = true;
        }
      } else {
        radius =
          Math.sqrt(
            Math.pow(
              galaxy.pluto.mesh.position.x - galaxy.jupiter.mesh.position.x,
              2
            ) +
              Math.pow(
                galaxy.pluto.mesh.position.z - galaxy.jupiter.mesh.position.z,
                2
              )
          ) / 2;

        centerpointx =
          (galaxy.jupiter.mesh.position.x + galaxy.pluto.mesh.position.x) / 2;
        centerpointz =
          (galaxy.jupiter.mesh.position.z + galaxy.pluto.mesh.position.z) / 2;
      }

      let speed = Date.now() * -0.0001;

      satelite.mesh.position.set(
        Math.cos(speed) * radius + centerpointx + 10,
        -30,
        Math.sin(speed) * radius + centerpointz - 800
      );

      // for (
      //   let vertexIndex = 0;
      //   vertexIndex < detectionSphere.geometry.vertices.length;
      //   vertexIndex++
      // ) {
      //   const localVertex = detectionSphere.geometry.vertices[
      //     vertexIndex
      //   ].clone();
      //   const globalVertex = detectionSphere.matrix.applyMatrix4(localVertex);
      //   const directionVector = globalVertex.sub(detectionSphere.position);

      //   const ray = new THREE.Raycaster(
      //     detectionSphere.position,
      //     directionVector.clone().normalize()
      //   );
      //   const collisionResults = ray.intersectObjects(collidableMeshList);
      //   console.log(collisionResults);

      //   if (
      //     collisionResults.length > 0 &&
      //     collisionResults[0].distance < directionVector.length()
      //   ) {
      //     console.log("collision");
      //   }
      // }

      render();
    };

    const render = () => {
      satelite.moveSatellite();

      camera.position.set(
        satelite.mesh.position.x,
        satelite.mesh.position.y,
        satelite.mesh.position.z + 10
      );

      // camera.lookAt(
      //   new THREE.Vector3(
      //     detectionSphere.position.x,
      //     detectionSphere.position.y,
      //     detectionSphere.position.z
      //   )
      // );

      galaxy.animate();

      renderer.render(scene, camera);
    };

    spaceInit();
  };

  init();
}
