THREE.Planets = {};

THREE.Planets.baseURL = "../";

// from http://planetpixelemporium.com/

THREE.Planets.createSun = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    THREE.Planets.baseURL + "images/sunmap.jpg"
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createMercury = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/mercurymap.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/mercurybump.jpg"
    ),
    bumpScale: 0.005
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createVenus = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/venusmap.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/venusbump.jpg"
    ),
    bumpScale: 0.005
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createEarth = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/earthmap1k.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/earthbump1k.jpg"
    ),
    bumpScale: 0.05,
    specularMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/earthspec1k.jpg"
    ),
    specular: new THREE.Color("grey")
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createEarthCloud = () => {
  // create destination canvas
  const canvasResult = document.createElement("canvas");
  canvasResult.width = 1024;
  canvasResult.height = 512;
  const contextResult = canvasResult.getContext("2d");

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    "load",
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement("canvas");
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext("2d");
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener("load", () => {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement("canvas");
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext("2d");
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasMap.width,
          canvasMap.height
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = THREE.Planets.baseURL + "images/earthcloudmaptrans.jpg";
    },
    false
  );
  imageMap.src = THREE.Planets.baseURL + "images/earthcloudmap.jpg";

  const geometry = new THREE.SphereGeometry(0.51, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createMoon = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/moonmap1k.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/moonbump1k.jpg"
    ),
    bumpScale: 0.002
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createMars = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/marsmap1k.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/marsbump1k.jpg"
    ),
    bumpScale: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createJupiter = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    THREE.Planets.baseURL + "images/jupitermap.jpg"
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.02
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createSaturn = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    THREE.Planets.baseURL + "images/saturnmap.jpg"
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createSaturnRing = () => {
  // create destination canvas
  const canvasResult = document.createElement("canvas");
  canvasResult.width = 915;
  canvasResult.height = 64;
  const contextResult = canvasResult.getContext("2d");

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    "load",
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement("canvas");
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext("2d");
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener("load", () => {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement("canvas");
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext("2d");
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasResult.width,
          canvasResult.height
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0] / 4;
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = THREE.Planets.baseURL + "images/saturnringpattern.gif";
    },
    false
  );
  imageMap.src = THREE.Planets.baseURL + "images/saturnringcolor.jpg";

  const geometry = new THREE.Planets._RingGeometry(0.55, 0.75, 64);
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    // map		: THREE.ImageUtils.loadTexture(THREE.Planets.baseURL+'images/ash_uvgrid01.jpg'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.lookAt(new THREE.Vector3(0.5, -4, 1));
  return mesh;
};

THREE.Planets.createUranus = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    THREE.Planets.baseURL + "images/uranusmap.jpg"
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createUranusRing = () => {
  // create destination canvas
  const canvasResult = document.createElement("canvas");
  canvasResult.width = 1024;
  canvasResult.height = 72;
  const contextResult = canvasResult.getContext("2d");

  // load earthcloudmap
  const imageMap = new Image();
  imageMap.addEventListener(
    "load",
    () => {
      // create dataMap ImageData for earthcloudmap
      const canvasMap = document.createElement("canvas");
      canvasMap.width = imageMap.width;
      canvasMap.height = imageMap.height;
      const contextMap = canvasMap.getContext("2d");
      contextMap.drawImage(imageMap, 0, 0);
      const dataMap = contextMap.getImageData(
        0,
        0,
        canvasMap.width,
        canvasMap.height
      );

      // load earthcloudmaptrans
      const imageTrans = new Image();
      imageTrans.addEventListener("load", () => {
        // create dataTrans ImageData for earthcloudmaptrans
        const canvasTrans = document.createElement("canvas");
        canvasTrans.width = imageTrans.width;
        canvasTrans.height = imageTrans.height;
        const contextTrans = canvasTrans.getContext("2d");
        contextTrans.drawImage(imageTrans, 0, 0);
        const dataTrans = contextTrans.getImageData(
          0,
          0,
          canvasTrans.width,
          canvasTrans.height
        );
        // merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(
          canvasResult.width,
          canvasResult.height
        );
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset + 0] = dataMap.data[offset + 0];
            dataResult.data[offset + 1] = dataMap.data[offset + 1];
            dataResult.data[offset + 2] = dataMap.data[offset + 2];
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0] / 2;
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0);
        material.map.needsUpdate = true;
      });
      imageTrans.src = THREE.Planets.baseURL + "images/uranusringtrans.gif";
    },
    false
  );
  imageMap.src = THREE.Planets.baseURL + "images/uranusringcolour.jpg";

  const geometry = new THREE.Planets._RingGeometry(0.55, 0.75, 64);
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.Texture(canvasResult),
    // map		: THREE.ImageUtils.loadTexture(THREE.Planets.baseURL+'images/ash_uvgrid01.jpg'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.lookAt(new THREE.Vector3(0.5, -4, 1));
  return mesh;
};

THREE.Planets.createNeptune = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const texture = THREE.ImageUtils.loadTexture(
    THREE.Planets.baseURL + "images/neptunemap.jpg"
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createPluto = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/plutomap1k.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      THREE.Planets.baseURL + "images/plutobump1k.jpg"
    ),
    bumpScale: 0.005
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

THREE.Planets.createStarfield = () => {
  const texture = THREE.ImageUtils.loadTexture(
    THREE.Planets.baseURL + "images/galaxy_starfield.png"
  );
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  });
  const geometry = new THREE.SphereGeometry(100, 32, 32);
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * change the original from three.js because i needed different UV
 *
 * @author Kaleb Murphy
 * @author jerome etienne
 */
THREE.Planets._RingGeometry = function(
  innerRadius,
  outerRadius,
  thetaSegments
) {
  THREE.Geometry.call(this);

  innerRadius = innerRadius || 0;
  outerRadius = outerRadius || 50;
  thetaSegments = thetaSegments || 8;

  const normal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < thetaSegments; i++) {
    const angleLo = (i / thetaSegments) * Math.PI * 2;
    const angleHi = ((i + 1) / thetaSegments) * Math.PI * 2;

    const vertex1 = new THREE.Vector3(
      innerRadius * Math.cos(angleLo),
      innerRadius * Math.sin(angleLo),
      0
    );
    const vertex2 = new THREE.Vector3(
      outerRadius * Math.cos(angleLo),
      outerRadius * Math.sin(angleLo),
      0
    );
    const vertex3 = new THREE.Vector3(
      innerRadius * Math.cos(angleHi),
      innerRadius * Math.sin(angleHi),
      0
    );
    const vertex4 = new THREE.Vector3(
      outerRadius * Math.cos(angleHi),
      outerRadius * Math.sin(angleHi),
      0
    );

    this.vertices.push(vertex1);
    this.vertices.push(vertex2);
    this.vertices.push(vertex3);
    this.vertices.push(vertex4);

    const vertexIdx = i * 4;

    // Create the first triangle
    const face = new THREE.Face3(
      vertexIdx + 0,
      vertexIdx + 1,
      vertexIdx + 2,
      normal
    );
    const uvs = [];

    const uv = new THREE.Vector2(0, 0);
    uvs.push(uv);
    const uv = new THREE.Vector2(1, 0);
    uvs.push(uv);
    const uv = new THREE.Vector2(0, 1);
    uvs.push(uv);

    this.faces.push(face);
    this.faceVertexUvs[0].push(uvs);

    // Create the second triangle
    const face = new THREE.Face3(
      vertexIdx + 2,
      vertexIdx + 1,
      vertexIdx + 3,
      normal
    );
    const uvs = [];

    const uv = new THREE.Vector2(0, 1);
    uvs.push(uv);
    const uv = new THREE.Vector2(1, 0);
    uvs.push(uv);
    const uv = new THREE.Vector2(1, 1);
    uvs.push(uv);

    this.faces.push(face);
    this.faceVertexUvs[0].push(uvs);
  }

  this.computeCentroids();
  this.computeFaceNormals();

  this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), outerRadius);
};
THREE.Planets._RingGeometry.prototype = Object.create(THREE.Geometry.prototype);
