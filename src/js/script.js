import Satelite from "./classes/Satelite.js";
import Galaxy from "./classes/Galaxy.js";
import Rocket from "./classes/Rocket.js";
import Platform from "./classes/Platform.js";
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
    platform,
    sky,
    detectionSphere,
    radius,
    centerpointx,
    centerpointz,
    direction,
    roundTempPosX = 0,
    roundTempPosZ = 6;

  let collidableMeshList = [];
  let buttonPressedArray = [];
  let equal = false;
  let readyforLaunch = false;
  let jupiterPassed = false;
  let countdownCounter = 10;

  const video = document.querySelector(".video");
  const container = document.querySelector(".world");
  const buttonArray = ["5", "3", "1", "2", "4"];
  const $buttons = document.querySelectorAll("button");
  const $text = document.querySelector(".text");
  const $input = document.querySelector(".input");
  const $buttoncontainer = document.querySelector(".buttons");
  const $audio = document.querySelector("audio");
  const $countdown = document.querySelector(".countdown");

  const init = () => {
    video.width = 600;
    video.height = 600;

    launch();
    // space();

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
      addPlatform();
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
      rocket.mesh.position.y = -5;
      rocket.mesh.rotation.y = 1;

      rocket.mesh.castShadow = true;
      rocket.mesh.receiveShadow = true;

      scene.add(rocket.mesh);
    };

    const addPlatform = () => {
      platform = new Platform();

      platform.mesh.position.z = -39;
      platform.mesh.position.y = -7;
      platform.mesh.rotation.z = 0;

      platform.mesh.castShadow = true;
      platform.mesh.receiveShadow = true;

      scene.add(platform.mesh);
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
      $input.innerHTML = buttonPressedArray;
      checkIfRightOrder();
    };

    const checkIfRightOrder = () => {
      equal = checkArrays(buttonPressedArray, buttonArray);
      if (equal === true) {
        //button combination is right
        $audio.play();
        $input.innerHTML = "ready to launch rocket";
        //wait to launch untill countdown is complete
        setTimeout(launchRocket, 10000);

        $countdown.innerHTML = countdownCounter;
        setInterval(countdown, 1000);

        $text.classList.add("hide");
        $buttons.forEach(button => button.classList.add("hide"));
      } else {
        if (buttonPressedArray.length < buttonArray.length) {
          //if they haven't pressed enough buttons
          $input.innerHTML = buttonPressedArray;
          console.log("keep going");
        } else {
          //if the combination isn't right
          console.log("try again");
          $input.innerHTML = "try again";
          buttonPressedArray = [];
        }
        console.log(buttonPressedArray);
        // console.log("try again/keep going");
      }
    };

    const launchRocket = () => {
      readyforLaunch = true;
      rocket.addFire();
      $input.classList.add("hide");
    };

    const countdown = () => {
      if (countdownCounter > 1) {
        $countdown.classList.remove('hide');
        countdownCounter = countdownCounter -1;
        $countdown.innerHTML = countdownCounter;
      } else {
        $countdown.classList.add("hide");
        clearInterval(countdown);
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
      // change to timer
      if (readyforLaunch === true) {
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
      $buttoncontainer.innerHTML = "";
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
      if (pose.keypoints[0].position.x < 200) {
        direction = "links";
      } else if (pose.keypoints[0].position.x > 400) {
        direction = "rechts";
      } else {
        direction = "midden";
      }
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

      switch (direction) {
        case "links":
          roundTempPosX = Math.cos(Date.now() * 0.0003) * 6;
          roundTempPosZ = Math.sin(Date.now() * 0.0003) * 6;
          camera.position.set(
            satelite.mesh.position.x + roundTempPosX,
            -30,
            satelite.mesh.position.z + roundTempPosZ
          );
          break;
        case "rechts":
          roundTempPosX = Math.cos(Date.now() * -0.0003) * 6;
          roundTempPosZ = Math.sin(Date.now() * -0.0003) * 6;

          camera.position.set(
            satelite.mesh.position.x + roundTempPosX,
            -30,
            satelite.mesh.position.z + roundTempPosZ
          );
          break;
        case "midden":
          camera.position.set(
            satelite.mesh.position.x + roundTempPosX,
            satelite.mesh.position.y,
            satelite.mesh.position.z + roundTempPosZ
          );
          break;
      }

      camera.lookAt(
        new THREE.Vector3(
          satelite.mesh.position.x,
          satelite.mesh.position.y,
          satelite.mesh.position.z
        )
      );

      galaxy.animate();

      renderer.render(scene, camera);
    };

    spaceInit();
  };

  init();
}
