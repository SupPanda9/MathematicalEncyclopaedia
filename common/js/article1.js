import gsap from "https://esm.sh/gsap@3.12.2";
import ScrollTrigger from "https://esm.sh/gsap@3.12.2/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

gsap.registerPlugin(ScrollTrigger);

// Text to speech
document.querySelectorAll(".text-box").forEach((box) => {
  // Добавяме бутона
  const btn = document.createElement("button");
  btn.className = "tts-button";
  btn.innerHTML = "🔊";
  box.appendChild(btn);

  // Проверяваме дали има предварителен звук
  const audioSrc = box.dataset.audio;
  let audio;

  if (audioSrc) {
    audio = new Audio(audioSrc);
  }

  btn.addEventListener("click", () => {
    // Ако има запис – ползваме него
    if (audio) {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      } else {
        audio.play();
      }
      return;
    }

    // Иначе ползваме TTS
    const clonedBox = box.cloneNode(true);
    clonedBox.querySelector(".tts-button")?.remove();
    const text = clonedBox.textContent.trim();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bg-BG";

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else {
      speechSynthesis.speak(utterance);
    }
  });
});

// Timeline за сцена 1
const scene1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-1",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene1Timeline
  .to(".intro-message", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      gsap.set(".intro-message", { display: "none" });
    },
  })
  .fromTo(
    ".background-1",
    { opacity: 0, y: 0 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    0
  )
  .fromTo(
    ".text-box-1",
    { opacity: 0, y: 0 },
    { opacity: 1, y: -20, duration: 1, ease: "power2.out" },
    0
  )

  .fromTo(
    ".star-container",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out" },
    "<0.5"
  )

  .to(
    ".background-1",
    {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power2.out",
    },
    3
  )
  .to(
    ".text-box-1",
    { opacity: 0, y: -40, duration: 1, ease: "power2.out" },
    "<"
  )
  .to(".star-container", { opacity: 0, duration: 1, ease: "power2.out" }, "<");

// Timeline за сцена 2
const scene2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-2",
    start: "top top",
    end: "+=200%",
    scrub: true,
    pin: true,
    id: "scene2",
    anticipatePin: 1,
    onEnter: () => {
      gsap.to(".scene-2", { visibility: "visible", opacity: 1, duration: 0.5 });
    },
    onLeaveBack: () => {
      gsap.to(".scene-2", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(".scene-2", { visibility: "hidden" });
        },
      });
    },
  },
});

scene2Timeline
  .to(".background-2", { opacity: 1 }, 0)
  .to(".brahe-normal", { opacity: 1 }, 0.2)
  .to(".kepler-normal", { opacity: 1 }, 0.2)
  .to(".text-box-2a", { opacity: 1, y: 0 }, 0.2)
  .to(".text-box-2b", { opacity: 1, y: 0 }, 0.6)
  .add(() => {
    const trigger = ScrollTrigger.getById("scene2");
    if (trigger && trigger.direction === -1) {
      gsap.set(".brahe-normal", { opacity: 1 });
      gsap.set(".kepler-normal", { opacity: 1 });
      gsap.set(".brahe-angry", { opacity: 0 });
      gsap.set(".kepler-happy", { opacity: 0 });
    } else {
      gsap.set(".brahe-normal", { opacity: 0 });
      gsap.set(".kepler-normal", { opacity: 0 });
      gsap.set(".brahe-angry", { opacity: 1 });
      gsap.set(".kepler-happy", { opacity: 1 });
    }
  }, "+=2")
  .to(
    [
      ".brahe-normal",
      ".kepler-normal",
      ".brahe-angry",
      ".kepler-happy",
      ".text-box-2a",
      ".text-box-2b",
    ],
    { opacity: 0, duration: 1, ease: "power2.inOut" },
    "+=1"
  )
  .to(
    ".background-2",
    { opacity: 0, duration: 1, ease: "power2.inOut" },
    "+=0.5"
  );

// Scene 3
const scene3Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-3",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene3Timeline
  .fromTo(
    ".background-3",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.inOut" }
  )

  .fromTo(
    ".figure-3.solar-system-Ptolemy",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.inOut" },
    "+=0.3"
  )

  .fromTo(
    ".text-box-3a",
    { opacity: 0, y: 0 },
    { opacity: 1, y: -100, duration: 1, ease: "power2.out" },
    "<"
  )

  .fromTo(
    ".text-box-3b",
    { opacity: 0, y: 0 },
    { opacity: 1, y: -100, duration: 1, ease: "power2.out" },
    "<>"
  )

  .to(
    [".text-box-3a", ".text-box-3b"],
    {
      opacity: 0,
      y: -20,
      duration: 1,
      pointerEvents: "none",
      ease: "power2.in",
    },
    "+=0.5"
  )

  .fromTo(
    ".text-box-3c",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "+=0.2"
  )

  .to(
    [".text-box-3c", ".figure-3.solar-system-Ptolemy"],
    { opacity: 0, duration: 1, ease: "power2.inOut" },
    "+=0.8"
  )
  .to(
    ".background-3",
    { opacity: 0, duration: 0.1, ease: "power2.inOut" },
    "+=0.5"
  )
  .to({}, { duration: 0.5 });

// Scene 4
const container = document.getElementById("threejs-container-4");
const conicName = document.querySelector(".conic-section-name-4");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.localClippingEnabled = true;
container.appendChild(renderer.domElement);

const coneMaterial = new THREE.MeshPhongMaterial({
  color: 0x0077ff,
  opacity: 0.7,
  transparent: true,
  side: THREE.DoubleSide,
  clippingPlanes: [],
  clipShadows: true,
});

// Двоен конус
const coneGeometryUp = new THREE.ConeGeometry(1, 2, 64);
const coneUp = new THREE.Mesh(coneGeometryUp, coneMaterial);
coneUp.position.y = -1;
scene.add(coneUp);

const coneGeometryDown = new THREE.ConeGeometry(1, 2, 64);
const coneDown = new THREE.Mesh(coneGeometryDown, coneMaterial);
coneDown.rotation.x = Math.PI;
coneDown.position.y = 1;
scene.add(coneDown);

// Равнина (само за визуализация)
const planeGeometry = new THREE.PlaneGeometry(3, 3);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  opacity: 0.2,
  side: THREE.DoubleSide,
  transparent: true,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// Светлина
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Clipping plane
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
coneMaterial.clippingPlanes = [clippingPlane];

// Позиции на clipping plane (normal и constant задават наклона и позицията)
const positions = [
  {
    constant: 1,
    normal: new THREE.Vector3(0, -1, 0),
    name: "Окръжност",
    cameraPos: new THREE.Vector3(0, 10, 0),
  },
  {
    constant: -0.5,
    normal: new THREE.Vector3(0.5, -1, -1).normalize(),
    name: "Елипса",
    cameraPos: new THREE.Vector3(2, 3, 7),
  },
  {
    constant: 1,
    normal: new THREE.Vector3(-4, -1, -3).normalize(),
    name: "Парабола",
    cameraPos: new THREE.Vector3(-3, 3, 2),
  },
  {
    constant: 0.5,
    normal: new THREE.Vector3(0, 0, 1).normalize(),
    name: "Хипербола",
    cameraPos: new THREE.Vector3(-5, 0, -4),
  },
];

// Показваме визуално равнината да съвпадне с clipping plane
function updatePlane() {
  // Позициониране на равнината спрямо clipping plane
  // Формулата за позиция: plane.position = normal * (-constant)
  const n = clippingPlane.normal;
  const c = clippingPlane.constant;
  plane.position.set(n.x * -c, n.y * -c, n.z * -c);

  // Завъртаме равнината така че нормалата й да е същата като на clipping plane
  const targetNormal = new THREE.Vector3(0, 0, 1); // равнината първоначално е XY, нормала е Z
  const quaternion = new THREE.Quaternion().setFromUnitVectors(targetNormal, n);
  plane.quaternion.copy(quaternion);
}

const scene4timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-4",
    start: "top top",
    end: "+=200%",
    scrub: 1,
    pin: true,
  },
});

scene4timeline
  .to(".scene-4", {
    backgroundColor: "#ffffff",
    duration: 0.1,
    ease: "power2.inOut",
  })
  .fromTo(
    ".background-4",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.inOut" }
  )
  .fromTo(
    ".figure-4.apollonius",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.inOut" },
    "+=0.3"
  )
  .fromTo(
    ".text-box-4a",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "<"
  )
  .fromTo(
    ".text-box-4b",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "<"
  )
  .to(
    "#threejs-container-4",
    { visibility: "visible", duration: 1, ease: "power2.inOut" },
    "<"
  )
  .to(
    ".conic-section-name-4",
    { visibility: "visible", duration: 1, ease: "power2.inOut" },
    "<"
  );

const introDuration = 3;
positions.forEach((pos, i) => {
  const offset = introDuration + i * 2;
  scene4timeline.to(
    {},
    {
      duration: 2,
      ease: "power1.inOut",
      onUpdate: function () {
        clippingPlane.normal.copy(pos.normal);
        clippingPlane.constant = pos.constant;
        updatePlane();
        needsRender = true;
      },
    },
    offset
  );
  scene4timeline.to(
    camera.position,
    {
      duration: 2,
      x: pos.cameraPos.x,
      y: pos.cameraPos.y,
      z: pos.cameraPos.z,
      ease: "power1.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
        needsRender = true;
      },
    },
    offset
  );
  scene4timeline.to(
    {},
    {
      duration: 0.5,
    },
    offset + 2
  );
});

let currentIndex = -1;
scene4timeline.eventCallback("onUpdate", () => {
  const time = scene4timeline.time();
  let index;

  if (time < introDuration) {
    // Показваме първия текст в интрото
    index = 0;
  } else {
    // Изваждаме introDuration, за да "изравним" времето
    const adjustedTime = time - introDuration;
    const segmentDuration = 2;
    const totalSegments = positions.length;

    index = Math.floor(adjustedTime / segmentDuration);

    if (index >= totalSegments) {
      index = totalSegments - 1;
    }
  }

  if (index !== currentIndex && positions[index]) {
    currentIndex = index;
    conicName.textContent = positions[index].name;
    needsRender = true;
  }
});

let needsRender = true;
function animate() {
  if (needsRender) {
    renderer.render(scene, camera);
    needsRender = false;
  }
  requestAnimationFrame(animate);
}
animate();

scene4timeline
  .to(".conic-section-name-4", {
    opacity: 0,
    visibility: "hidden",
    duration: 1,
    ease: "power2.inOut",
  })
  .to(
    "#threejs-container-4",
    {
      opacity: 0,
      visibility: "hidden",
      duration: 1,
      ease: "power2.inOut",
    },
    "<"
  ) // "<" за да се стартира едновременно с предния
  .to(
    ".text-box-4a",
    {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.inOut",
    },
    "<"
  )
  .to(
    ".text-box-4b",
    {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.inOut",
    },
    "<"
  )
  .to(
    ".figure-4.apollonius",
    {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    },
    "<"
  )
  .to(
    ".background-4",
    {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    },
    "<"
  )
  .to(
    ".scene-4",
    {
      backgroundColor: "#000000",
      duration: 0.1,
      ease: "power2.inOut",
    },
    "<"
  );

// Scene 5
const scene5timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5",
    start: "top top",
    end: "+=200%",
    scrub: 1,
    pin: true,
  },
});

scene5timeline.fromTo(
  [".background-5", ".compass-container-5"],
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 1 }
);

// Група 1: Първи и втори абзац + илюстрация на 1ви закон
scene5timeline
  .fromTo(
    [".text-box-5a", ".text-box-5b", ".kepler-1st-law"],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  )
  .to(".compass-container-5", {
    rotation: "+=45",
    duration: 1,
    ease: "power2.inOut",
  })
  .to(
    [".text-box-5a", ".text-box-5b", ".kepler-1st-law"],
    { autoAlpha: 0, duration: 1 },
    "+=1"
  );

// Група 2: Трети и четвърти абзац + конусна секция
scene5timeline
  .to(".compass-container-5", {
    rotation: "+=45",
    duration: 1,
    ease: "power2.inOut",
  })
  .fromTo(
    [".text-box-5c", ".text-box-5d", ".conic-section-container-5"],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  )
  .to([".text-box-5c", ".text-box-5d"], { autoAlpha: 0, duration: 1 }, "+=1")
  .to(".conic-section-container-5", { autoAlpha: 0, duration: 1 }, "<");

// Група 3: Пети абзац + картинка за 2ри закон
scene5timeline
  .to(".compass-container-5", {
    rotation: "+=45",
    duration: 1,
    ease: "power2.inOut",
  })
  .fromTo(
    [".text-box-5e", ".kepler-2nd-law"],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  )
  .to(
    [".text-box-5e", ".kepler-2nd-law"],
    { autoAlpha: 0, duration: 1 },
    "+=1"
  );

// Група 4: Шести абзац + гиф за 3ти закон
scene5timeline
  .to(".compass-container-5", {
    rotation: "+=45",
    duration: 1,
    ease: "power2.inOut",
  })
  .fromTo(
    [".text-box-5f", ".kepler-3rd-law"],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  )
  .to(
    [".text-box-5f", ".kepler-3rd-law"],
    { autoAlpha: 0, duration: 1 },
    "+=1"
  );

// Група 5: Седми и осми абзац
scene5timeline
  .to(".compass-container-5", {
    rotation: "+=45",
    duration: 1,
    ease: "power2.inOut",
  })
  .fromTo(
    [".text-box-5g", ".text-box-5h", ".earth-mars-orbits"],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  )
  .to(
    [".text-box-5g", ".text-box-5h", ".earth-mars-orbits"],
    { autoAlpha: 0, duration: 1 },
    "+=1"
  )
  .to(".compass-container-5", {
    rotation: "+=45",
    duration: 1,
    ease: "power2.inOut",
  });

scene5timeline.to([".background-5", ".compass-container-5"], {
  autoAlpha: 0,
  duration: 1,
});

const canvas = document.getElementById("conic-canvas-5");
const ctx = canvas.getContext("2d");
const range = document.getElementById("eccentricity-range");
const label = document.getElementById("ecc-label");

function drawConic(ecc) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  label.textContent = ecc.toFixed(2);

  const w = canvas.width;
  const h = canvas.height;
  const a = 20;
  const cx = w / 2;
  const cy = h / 2;
  const epsilon = 0.005; // по-малко пропускане около асимптотите
  const maxJump = 50; // макс разстояние между точки, за да се свържат

  ctx.strokeStyle = "#0077cc";
  ctx.lineWidth = 2;

  if (ecc < 1) {
    // Елипса
    const b = a * Math.sqrt(1 - ecc ** 2);
    ctx.beginPath();
    for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
      const x = a * Math.cos(theta);
      const y = b * Math.sin(theta);
      const px = cx + x;
      const py = cy + y;
      if (theta === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  } else if (Math.abs(ecc - 1) < 0.01) {
    // Парабола
    ctx.beginPath();
    for (let x = -150; x <= 150; x += 1) {
      const y = 0.01 * x ** 2;
      const px = cx + x;
      const py = cy + y;
      if (x === -150) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  } else {
    // Хипербола

    const drawArm = (sign = 1) => {
      let pathStarted = false;
      let prevX = null;
      let prevY = null;

      for (let theta = -1.6; theta <= 1.6; theta += 0.002) {
        const denom = ecc * Math.cos(theta) - sign;

        if (Math.abs(denom) < epsilon) {
          if (pathStarted) {
            ctx.stroke();
            pathStarted = false;
          }
          prevX = null;
          prevY = null;
          continue;
        }

        const r = a / denom;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const px = cx + x;
        const py = cy + y;

        if (!isFinite(px) || !isFinite(py)) {
          if (pathStarted) {
            ctx.stroke();
            pathStarted = false;
          }
          prevX = null;
          prevY = null;
          continue;
        }

        if (!pathStarted) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          pathStarted = true;
        } else {
          // Проверка дали точката е близо до предишната, за да не свързваме скокове
          const dx = px - prevX;
          const dy = py - prevY;
          if (Math.sqrt(dx * dx + dy * dy) > maxJump) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        prevX = px;
        prevY = py;
      }
      if (pathStarted) ctx.stroke();
    };

    drawArm(1); // Дясно рамо
    drawArm(-1); // Ляво рамо
  }
}

drawConic(0); // начално състояние

range.addEventListener("input", () => {
  const ecc = parseFloat(range.value);
  drawConic(ecc);
});

// Scene 6
const scene6 = new THREE.Scene();
const camera6 = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera6.position.z = 5;

const renderer6 = new THREE.WebGLRenderer({ alpha: true });
renderer6.setSize(window.innerWidth, window.innerHeight);
document
  .querySelector("#threejs-container-6")
  .appendChild(renderer6.domElement);

// Светлина
const light6 = new THREE.DirectionalLight(0xffffff, 1);
light6.position.set(5, 5, 5);
scene6.add(light6);

// Земята и Луната (примерна сфера, после зареждаш glb)
const loader6 = new GLTFLoader();

let earthMesh, moonMesh;

loader6.load(
  "../../assets/models/earth/earth.glb",
  (gltf) => {
    earthMesh = gltf.scene;
    earthMesh.scale.set(0.1, 0.1, 0.1);
    earthMesh.position.set(-2, -1, 0);
    scene6.add(earthMesh);
  },
  undefined,
  (error) => {
    console.error("Error loading Earth model:", error);
  }
);

loader6.load(
  "../../assets/models/moon/moon.glb",
  (gltf) => {
    moonMesh = gltf.scene;
    moonMesh.position.set(2, 1, 0);
    moonMesh.scale.set(0.01, 0.01, 0.01);
    scene6.add(moonMesh);
  },
  undefined,
  (error) => {
    console.error("Error loading Moon model:", error);
  }
);

// Лазерен лъч (линия)
const laserPoints = [
  new THREE.Vector3(-2, -1, 0),
  new THREE.Vector3(-2, -1, 0),
];

const laserMaterialCore = new THREE.LineBasicMaterial({ color: 0xff0000 });
const laserMaterialGlow = new THREE.LineBasicMaterial({
  color: 0xff0000,
  linewidth: 0.05,
  opacity: 0.6,
  transparent: true,
});

const laserGeometry = new THREE.BufferGeometry().setFromPoints(laserPoints);

const laserLineCore = new THREE.Line(laserGeometry, laserMaterialCore);
const laserLineGlow = new THREE.Line(laserGeometry, laserMaterialGlow);

scene6.add(laserLineGlow);
scene6.add(laserLineCore);

// Функция за анимация на въртене
let needsRender6 = true;

function animate6() {
  if (needsRender6) {
    if (earthMesh) earthMesh.rotation.y += 0.015;
    if (moonMesh) moonMesh.rotation.y += 0.005;
    renderer6.render(scene6, camera6);
    needsRender6 = false;
  }
  requestAnimationFrame(animate6);
}
animate6();

const scene6timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-6",
    start: "top top",
    end: "+=400%",
    scrub: 1,
    pin: true,
  },
});

// Първо показваме текст 6a
scene6timeline
  .fromTo(
    ".text-box-6a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(".text-box-6a", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1");

scene6timeline.fromTo(
  ".background-6",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 1, ease: "power2.out" }
);
// После показваме канваса с 3D сцена
scene6timeline.fromTo(
  "#threejs-container-6",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 1, ease: "power2.out" }
);

// Контрол на лазерния лъч по скрол
scene6timeline
  .to(laserPoints[1], {
    x: 2,
    y: 1,
    duration: 1,
    onUpdate: () => {
      laserGeometry.setFromPoints(laserPoints);
      laserGeometry.attributes.position.needsUpdate = true;
      needsRender6 = true;
    },
  })
  .to(laserPoints[0], {
    x: 2, // връщане към Земята (начална позиция)
    y: 1, // връщане към Земята (начална позиция)
    duration: 1,
    onUpdate: () => {
      laserGeometry.setFromPoints(laserPoints);
      laserGeometry.attributes.position.needsUpdate = true;
      needsRender6 = true;
    },
  })
  .to(laserPoints[0], {
    x: -2, // крайната X позиция на Луната
    y: -1, // крайната Y позиция на Луната
    duration: 1,
    onUpdate: () => {
      laserGeometry.setFromPoints(laserPoints);
      laserGeometry.attributes.position.needsUpdate = true;
      needsRender6 = true;
    },
  })
  .to(laserPoints[1], {
    x: -2, // връщане към Земята (начална позиция)
    y: -1, // връщане към Земята (начална позиция)
    duration: 1,
    onUpdate: () => {
      laserGeometry.setFromPoints(laserPoints);
      laserGeometry.attributes.position.needsUpdate = true;
      needsRender6 = true;
    },
  });

// След като лазерът достигне целта, скриваме канваса, показваме текст 6b
scene6timeline
  .to("#threejs-container-6", { autoAlpha: 0, duration: 1 })
  .fromTo(
    ".text-box-6b, .figure-6.laser-lunar-reflector, .figure-6.laser-earth-reflector",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-6b, .figure-6.laser-lunar-reflector, .figure-6.laser-earth-reflector",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene6timeline
  .fromTo(
    ".text-box-6c, .text-box-6d, .figure-6.log-scale",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-6c, .text-box-6d, .figure-6.log-scale",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene6timeline
  .fromTo(
    ".text-box-6e, .text-box-6f, .figure-6.parallax, .figure-6.hipparchus",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-6e, .text-box-6f, .figure-6.parallax, .figure-6.hipparchus",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene6timeline
  .fromTo(
    ".text-box-6g, .text-box-6h, .text-box-6i, #threejs-container-6a",
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 1,
      onStart: () => {
        needsRender6a = true;
      },
      ease: "power2.out",
    }
  )
  .to(
    ".text-box-6g, .text-box-6h, .text-box-6i",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  )
  .to(
    "#threejs-container-6a",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  )
  .to(".background-6", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "<");

const scene6a = new THREE.Scene();

const camera6a = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera6a.position.z = 5;

const renderer6a = new THREE.WebGLRenderer({ alpha: true });
renderer6a.setSize(window.innerWidth, window.innerHeight);
document
  .querySelector("#threejs-container-6a")
  .appendChild(renderer6a.domElement);

// Light
const light6a = new THREE.DirectionalLight(0xffffff, 1);
light6a.position.set(3, 3, 3);
scene6a.add(light6a);

// Load Jason-1 model
const loader6a = new GLTFLoader();

let jasonMesh;

loader6a.load(
  "../../assets/models/jason1/jason1.glb",
  (gltf) => {
    jasonMesh = gltf.scene;
    jasonMesh.scale.set(0.009, 0.009, 0.009);
    jasonMesh.position.set(0, 0, 0);
    scene6a.add(jasonMesh);
  },
  undefined,
  (error) => {
    console.error("Error loading Jason-1 model:", error);
  }
);

// Animate Jason-1
let needsRender6a = true;

function animate6a() {
  let rotated = false;

  if (jasonMesh) {
    jasonMesh.rotation.y += 0.01;
    rotated = true;
  }

  if (needsRender6a || rotated) {
    renderer6a.render(scene6a, camera6a);
    needsRender6a = false;
  }

  requestAnimationFrame(animate6a);
}
animate6a();

// Scene 7
const scene7timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-7",
    start: "top top",
    end: "+=400%",
    scrub: 1,
    pin: true,
  },
});

const scene7 = new THREE.Scene();
const camera7 = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera7.position.z = 5;

const renderer7 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer7.setSize(window.innerWidth, window.innerHeight);
document
  .getElementById("threejs-container-7")
  .appendChild(renderer7.domElement);

// Animate loop
function animateScene7() {
  requestAnimationFrame(animateScene7);
  renderer7.render(scene7, camera7);
}
animateScene7();

const loader = new GLTFLoader();
let rocket;
loader.load("../../assets/models/rocket/rocket.glb", function (gltf) {
  rocket = gltf.scene;
  rocket.scale.set(0.009, 0.009, 0.009);
  rocket.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2, "ZXY");
  rocket.position.set(4, -1, -3);
  scene7.add(rocket);

  scene7timeline.to(rocket.position, {
    x: 2,
    y: -1,
    z: -3,
    duration: 0.01,
  });

  // текст + фон
  scene7timeline.fromTo(
    ".background-7",
    { autoAlpha: 0, backgroundPosition: "center 100%" },
    {
      autoAlpha: 1,
      backgroundPosition: "center 99%",
      duration: 1.5,
      ease: "power2.out",
    }
  );

  scene7timeline
    .fromTo(
      ".text-box-7a, .text-box-7b, #threejs-container-7",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5, ease: "power2.out" }
    )
    .to(
      ".text-box-7a, .text-box-7b",
      { autoAlpha: 0, duration: 1, ease: "power2.out" },
      "+=1"
    );

  scene7timeline.to(".background-7", {
    backgroundPosition: "center 65%",
    duration: 5,
    ease: "none",
  });

  scene7timeline
    .to(
      rocket.position,
      {
        x: -2,
        z: -2,
        duration: 5,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      rocket.rotation,
      {
        x: Math.PI * 2,
        duration: 5,
        ease: "power2.inOut",
      },
      "<"
    );

  scene7timeline.to(
    camera7.position,
    {
      z: 3,
      duration: 2,
      ease: "power2.inOut",
    },
    "<"
  );

  scene7timeline
    .fromTo(
      ".text-box-7c, .text-box-7d",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5, ease: "power2.out" }
    )
    .to(".text-box-7c, .text-box-7d", { autoAlpha: 0, duration: 1 }, "+=1");

  scene7timeline.to(
    rocket.position,
    {
      x: 0,
      z: -2.5,
      duration: 2,
      ease: "power2.inOut",
    },
    "<"
  );

  scene7timeline.to(
    ".background-7",
    {
      backgroundPosition: "center 30%",
      duration: 1,
      ease: "none",
    },
    "<"
  );

  scene7timeline
    .fromTo(
      ".text-box-7e, .text-box-7f, .figure-7.hohmann-transfer",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1 }
    )
    .to(
      ".text-box-7e, .text-box-7f, .figure-7.hohmann-transfer",
      { autoAlpha: 0, duration: 1 },
      "+=1"
    );

  scene7timeline
    .fromTo(
      ".text-box-7g, .video-container-7a",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1 }
    )
    .to(
      ".text-box-7g, .video-container-7a",
      { autoAlpha: 0, duration: 1 },
      "+=1"
    );

  scene7timeline
    .fromTo(
      ".text-box-7h, .video-container-7b",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1 }
    )
    .to(
      ".text-box-7h, .video-container-7b",
      { autoAlpha: 0, duration: 1 },
      "+=1"
    );

  scene7timeline
    .to(
      camera7.position,
      {
        z: 5,
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      rocket.position,
      {
        x: 2.5 * Math.cos(Math.PI * 2),
        y: 2.5 * Math.sin(Math.PI * 2),
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );

  const radius = 2.5; // радиус на кръга, настрой според сцената
  const angleObj = { angle: 0 }; // начална ъглова позиция

  // Добавяме анимация в timeline-а, примерно преди излитането надолу
  scene7timeline.to(
    angleObj,
    {
      angle: Math.PI, // пълна обиколка (360 градуса)
      duration: 5, // колко време да отнеме една обиколка
      ease: "none",
      onUpdate: () => {
        const a = angleObj.angle;
        const nextA = a + 0.01; // малко напред за lookAt

        // Позиция на ракетата по кръга (XY равнина)
        const x = radius * Math.cos(a);
        const y = radius * Math.sin(a);

        // Следваща позиция за поглед
        const nextX = radius * Math.cos(nextA);
        const nextY = radius * Math.sin(nextA);

        rocket.position.set(x, y, rocket.position.z); // z запазваме

        rocket.lookAt(nextX, nextY, rocket.position.z);
      },
    },
    "+=3"
  );

  scene7timeline.to(rocket.rotation, {
    x: "+=" + Math.PI,
    duration: 2,
    ease: "power2.inOut",
  });

  scene7timeline.to(rocket.position, {
    y: -10,
    duration: 2,
    ease: "power2.inOut",
  });

  // ===== Затихване и излитане надолу =====
  scene7timeline.to(
    ".background-7",
    {
      autoAlpha: 0,
      duration: 15,
      ease: "none",
    },
    "+=2"
  );

  scene7timeline.fromTo(
    ".text-box-7i",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  );

  scene7timeline.to("#threejs-container-7", {
    autoAlpha: 0,
    duration: 1,
  });

  // Animate loop с въртене
  function animateScene7() {
    requestAnimationFrame(animateScene7);
    renderer7.render(scene7, camera7);
  }

  animateScene7();
});
