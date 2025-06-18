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

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  card.querySelectorAll("*").forEach((child) => {
    child.style.pointerEvents = "none";
  });
});

/* Scene 1 */

const scene1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-1",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene1Timeline
  .to(
    ".intro-message",
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    0
  )
  .to(".intro-message", { opacity: 0, duration: 1, ease: "power2.out" }, "+=1");

scene1Timeline
  .fromTo(
    ".text-box-1a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(".text-box-1a", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1");

scene1Timeline.fromTo(
  ".background-1",
  { opacity: 0, y: 0 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
);

scene1Timeline
  .fromTo(
    ".text-box-1b, .text-box-1c",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-1b, .text-box-1c",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene1Timeline.to(".background-1", {
  scale: 2,
  rotation: 20,
  duration: 3,
  ease: "power2.out",
});

scene1Timeline
  .fromTo(
    ".text-box-1d, .text-box-1e",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-1d, .text-box-1e",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene1Timeline.to(".background-1", {
  scale: 3,
  rotation: 50,
  autoAlpha: 0,
  duration: 1,
  ease: "power2.out",
});

/* Scene 2 */
const scene2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-2",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene2Timeline
  .fromTo(
    ".text-box-2a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.1, ease: "power2.out" }
  )
  .to(".text-box-2a", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1");

scene2Timeline.fromTo(
  ".background-2",
  { opacity: 0 },
  { opacity: 1, duration: 1, ease: "power2.out" }
);

scene2Timeline
  .fromTo(
    ".did-you-know-2a, .text-box-2b, .text-box-2c",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".did-you-know-2a, .text-box-2b, .text-box-2c",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene2Timeline
  .fromTo(
    ".text-box-2d",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(".text-box-2d", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1");

scene2Timeline
  .fromTo(
    ".text-box-2e, .text-box-2f, #drake-calculator",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-2e, .text-box-2f, #drake-calculator",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

function calculateDrake() {
  const rStar = parseFloat(document.getElementById("rStar").value);
  const fp = parseFloat(document.getElementById("fp").value);
  const ne = parseFloat(document.getElementById("ne").value);
  const fl = parseFloat(document.getElementById("fl").value);
  const fi = parseFloat(document.getElementById("fi").value);
  const fc = parseFloat(document.getElementById("fc").value);
  const L = parseFloat(document.getElementById("L").value);

  if ([rStar, fp, ne, fl, fi, fc, L].some(isNaN)) {
    alert("Моля, въведете валидни числа във всички полета!");
    return;
  }

  const N = rStar * fp * ne * fl * fi * fc * L;
  document.getElementById("drake-result").textContent = N.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("drake-calc-btn")
    .addEventListener("click", calculateDrake);
});

scene2Timeline
  .fromTo(
    ".text-box-2g, .text-box-2h, .figure-2.contact, .did-you-know-2b",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-2g, .text-box-2h, .figure-2.contact, .did-you-know-2b",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene2Timeline
  .fromTo(
    ".text-box-2i, .text-box-2j, .did-you-know-2c, .did-you-know-2d",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-2i, .text-box-2j, .did-you-know-2c, .did-you-know-2d",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene2Timeline.to(
  ".background-2",
  {
    autoAlpha: 0,
    duration: 1,
    ease: "power2.out",
  },
  "+=1"
);

/* Scene 3 */
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

scene3Timeline.fromTo(
  ".background-3",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 0.1, ease: "power2.out" }
);

scene3Timeline
  .fromTo(
    ".text-box-3a, .figure-3.lotka, .figure-3.volterra",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-3a, .figure-3.lotka, .figure-3.volterra",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene3Timeline
  .fromTo(
    ".text-box-3b, .sim-wolves-rabbits",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-3b, .sim-wolves-rabbits",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=2"
  );

const canvas = document.getElementById("sim-wolves-rabbits-3");
const ctx = canvas.getContext("2d");

ctx.font = "30px Arial";

class Animal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
}

class Prey extends Animal {
  constructor(x, y) {
    super(x, y);
    this.age = 0;
  }

  update() {
    this.move();
    this.age++;
  }

  draw() {
    ctx.font = "25px Arial";
    ctx.fillText("🐰", this.x, this.y);
  }
}

class Predator extends Animal {
  constructor(x, y) {
    super(x, y);
    this.hunger = 0;
  }

  update(preys) {
    let nearest = null;
    let minDist = Infinity;
    for (const prey of preys) {
      const dx = prey.x - this.x;
      const dy = prey.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearest = prey;
      }
    }

    if (nearest) {
      const dx = nearest.x - this.x;
      const dy = nearest.y - this.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      this.vx = (dx / len) * 0.8;
      this.vy = (dy / len) * 0.8;

      if (minDist < 10 && Math.random() < 0.25) {
        const index = preys.indexOf(nearest);
        if (index > -1) preys.splice(index, 1);
        this.hunger = 0;
        return true;
      }
    }

    this.move();
    this.hunger++;
    return false;
  }

  draw() {
    ctx.font = "25px Arial";
    ctx.fillText("🐺", this.x, this.y);
  }
}

// Начални параметри за баланс
let NUM_PREY = 40;
let NUM_PREDATORS = 6;
let PREY_REPRODUCE_INTERVAL = 80;
let PREDATOR_HUNGER_LIMIT = 350;

let preys = [];
let predators = [];

function initSimulation() {
  preys = [];
  predators = [];

  for (let i = 0; i < NUM_PREY; i++) {
    preys.push(
      new Prey(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }

  for (let i = 0; i < NUM_PREDATORS; i++) {
    predators.push(
      new Predator(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}

const MAX_PREY = 500;

function update() {
  const newPreys = [];
  for (const prey of preys) {
    prey.update();
    if (
      preys.length + newPreys.length < MAX_PREY &&
      prey.age % PREY_REPRODUCE_INTERVAL === 0 &&
      Math.random() < 0.3
    ) {
      newPreys.push(new Prey(prey.x, prey.y));
    }
  }
  preys = preys.concat(newPreys);

  const newPredators = [];
  for (let i = predators.length - 1; i >= 0; i--) {
    const predator = predators[i];
    const ate = predator.update(preys);
    if (ate && Math.random() < 0.1) {
      newPredators.push(new Predator(predator.x, predator.y));
    }
    if (predator.hunger > PREDATOR_HUNGER_LIMIT) {
      predators.splice(i, 1);
    }
  }
  predators = predators.concat(newPredators);

  if (preys.length === 0 || predators.length === 0) {
    console.log("Extinction detected. Restarting simulation...");
    setTimeout(() => {
      initSimulation();
    }, 1000);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const prey of preys) prey.draw();
  for (const predator of predators) predator.draw();

  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Зайци: ${preys.length}`, 10, 20);
  ctx.fillText(`Вълци: ${predators.length}`, 10, 40);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

initSimulation();
loop();

scene3Timeline
  .fromTo(
    ".text-box-3c, .sim-phase-portrait",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-3c, .sim-phase-portrait",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=2"
  );

const canvas3b = document.getElementById("sim-phase-portrait-3");
const ctx3b = canvas3b.getContext("2d");
const width = canvas3b.width;
const height = canvas3b.height;

let x, y;
let dt = 0.01; // Времева стъпка за симулацията

let alpha, beta, delta, gamma; // Параметри на модела на Лотка-Волтера с логистичен растеж
let K = 500; // Капацитет на средата за зайците

const points = []; // Точки за чертане на фазовия портрет
const historyLength = 2000; // Увеличен брой точки за по-дълга пътека

// Прагове за измиране на популациите
const extinctionThreshold = 0.5; // Ако популацията падне под това число, тя измира напълно

function initScenario(scenario) {
  points.length = 0; // Изчистваме предишни точки
  // Resetting current x, y values to avoid issues from previous runs
  // These initial values can be crucial for the trajectory
  switch (scenario) {
    case 1: // Вълците умират, Зайците се стабилизират до K (500)
      x = 500;
      y = 330;
      alpha = 0.5; // Сравнително висок растеж на зайците
      beta = 0.01; // Много ниска консумация на зайци от вълци (намалена още малко)
      delta = 0.001; // Изключително ниска ефективност на размножаване на вълците (намалена още)
      gamma = 0.5; // Висок процент на смъртност при вълците
      // Тези параметри трябва да гарантират измиране на вълците
      // и последващ логистичен растеж на зайците до K.
      break;

    case 2: // Зайците и вълците умират
      x = 500; // Средно количество зайци
      y = 200; // Много вълци
      alpha = 0.2; // Нисък растеж на зайците
      beta = 0.03; // Висока консумация на зайци
      delta = 0.01; // Нормална ефективност на размножаване на вълците
      gamma = 0.3; // Нормална смъртност на вълците
      // Този сценарий трябва да доведе до измиране на зайците,
      // последвано от измиране на вълците поради липса на храна.
      break;

    case 3: // Балансиран сценарий с флуктуации около x=300, y=80
      x = 300; // Начален брой зайци (може да започнете и малко по-далеч от равновесието, напр. 350)
      y = 80; // Начален брой вълци (може да започнете и малко по-далеч от равновесието, напр. 70)
      K = 500; // Капацитет на средата

      // Изчисляваме необходимите alpha, beta, delta, gamma
      // x_E = gamma / delta  => delta = gamma / x_E
      // y_E = alpha / beta * (1 - x_E / K) => alpha = beta * y_E / (1 - x_E / K)

      // Нека фиксираме някои параметри, които изглеждат разумни:
      // Например, да запазим delta и beta в подобни диапазони като предишните ви.

      // Избираме gamma и beta
      gamma = 0.4; // Средна смъртност на вълците (както във вашия пример)
      beta = 0.015; // Малко по-голяма консумация от предишния ви балансиран (0.01)

      // Изчисляваме delta, за да получим x_E = 300
      delta = gamma / 300; // 0.4 / 300 = 0.001333...

      // Изчисляваме alpha, за да получим y_E = 80
      alpha = (beta * 80) / (1 - 300 / K);
      alpha = (beta * 80) / (1 - 300 / 500);
      alpha = (beta * 80) / (1 - 0.6);
      alpha = (beta * 80) / 0.4;
      alpha = beta * 200; // 0.015 * 200 = 3

      // Крайни параметри за този сценарий:
      alpha = 3; // Висок растеж на зайците, за да поддържа голяма популация
      beta = 0.015; // Средна консумация
      delta = 0.00133; // Много ниска ефективност на размножаване на вълците
      gamma = 0.4; // Средна смъртност на вълците

      // За да предизвикаме флуктуации, началните x и y може да не са точно равновесните точки.
      // Започване малко встрани от равновесието ще инициира цикъла.
      x = 400; // Започваме с повече зайци
      y = 300; // Започваме с по-малко вълци

      break;
  }
}

function updateModel(scenario) {
  // Симулираме няколко стъпки във времето за по-гладко движение
  for (let i = 0; i < 20; i++) {
    // Увеличих броя на итерациите на кадър за по-бърза симулация
    let dx, dy;

    // Модел на Лотка-Волтера с логистичен растеж за плячката
    dx = alpha * x * (1 - x / K) - beta * x * y;
    dy = delta * x * y - gamma * y;

    x += dx * dt;
    y += dy * dt;

    // **Нова логика за измиране на популациите:**
    // Ако броят на зайците падне под прага, те изчезват напълно.
    if (x < extinctionThreshold) {
      x = 0;
      // Ако зайците измрат, вълците няма да имат храна и ще умрат.
      // Можем да ускорим измирането им, ако искаме.
      if (scenario === 2) {
        // Само за сценарий 2, където искаме да измрат и двата вида
        dy = -gamma * y; // Вълците умират само от глад
      } else {
        // За останалите сценарии, ако измрат зайците, вълците също умират
        dy = -gamma * y;
      }
    }
    // Ако броят на вълците падне под прага, те изчезват напълно.
    if (y < extinctionThreshold) {
      y = 0;
      // Ако вълците измрат, зайците ще растат до капацитета K (ако x < K).
      if (scenario === 1) {
        // За сценарий 1, където вълците измират
        dx = alpha * x * (1 - x / K); // Зайците растат без хищници
      }
    }

    // Ограничаване на стойностите, за да не станат отрицателни
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    // Ограничаване на зайците до капацитета на средата K
    if (x > K) x = K;

    // Добавяне на точката към списъка
    points.push({ x, y });
    // Ограничаване на дължината на историята на пътеката
    if (points.length > historyLength) {
      points.shift();
    }
  }
}

// Функции за мащабиране на координатите за чертане върху canvas
function scaleX(val) {
  // Мащабираме x по оста на зайците (до K)
  return 50 + (val / K) * (width - 100);
}

function scaleY(val) {
  // Мащабираме y по оста на вълците (до 500, което е достатъчно за y)
  return height - 50 - (val / 500) * (height - 100);
}

// Функции за чертане на мрежата, векторното поле и фазовия портрет
function drawGrid() {
  const step = 50;
  ctx3b.strokeStyle = "#eee";
  ctx3b.lineWidth = 1;

  // Хоризонтални линии (x-ос)
  for (let i = 0; i <= K; i += 100) {
    const px = scaleX(i);
    ctx3b.beginPath();
    ctx3b.moveTo(px, 0);
    ctx3b.lineTo(px, height);
    ctx3b.stroke();
    ctx3b.fillStyle = "#555";
    ctx3b.fillText(i.toFixed(0), px - 10, height - 30);
  }

  // Вертикални линии (y-ос)
  for (let i = 0; i <= 500; i += 100) {
    const py = scaleY(i);
    ctx3b.beginPath();
    ctx3b.moveTo(0, py);
    ctx3b.lineTo(width, py);
    ctx3b.stroke();
    ctx3b.fillStyle = "#555";
    ctx3b.fillText(i.toFixed(0), 10, py + 5);
  }
}

function drawVectorField() {
  const spacing = 30; // Разстояние между стрелките на векторното поле

  for (let sy = 50; sy <= height - 50; sy += spacing) {
    for (let sx = 50; sx <= width - 50; sx += spacing) {
      let xPop = ((sx - 50) / (width - 100)) * K; // Обратно мащабиране за x (зайци)
      let yPop = ((height - 50 - sy) / (height - 100)) * 500; // Обратно мащабиране за y (вълци)

      // Изчисляване на посоката на вектора
      let dx_vec = alpha * xPop * (1 - xPop / K) - beta * xPop * yPop;
      let dy_vec = delta * xPop * yPop - gamma * yPop;

      let len = Math.sqrt(dx_vec * dx_vec + dy_vec * dy_vec);
      if (len === 0) continue; // Избягваме деление на нула

      // Нормализиране на вектора до единична дължина
      dx_vec /= len;
      dy_vec /= len;

      const scale = 12; // Размер на стрелките

      const x1 = sx;
      const y1 = sy;
      const x2 = x1 + dx_vec * scale;
      const y2 = y1 - dy_vec * scale; // Минус, защото Y-оста на canvas-а расте надолу

      ctx3b.strokeStyle = "rgba(0,0,0,0.5)"; // Цвят на стрелките
      ctx3b.lineWidth = 1;
      ctx3b.beginPath();
      ctx3b.moveTo(x1, y1);
      ctx3b.lineTo(x2, y2);
      ctx3b.stroke();

      // Рисуване на върха на стрелката
      const angle = Math.atan2(y1 - y2, x2 - x1);
      ctx3b.beginPath();
      ctx3b.moveTo(x2, y2);
      ctx3b.lineTo(
        x2 - 7 * Math.cos(angle - 0, 3),
        y2 + 7 * Math.sin(angle - 0.3)
      );
      ctx3b.lineTo(
        x2 - 7 * Math.cos(angle + 0.3),
        y2 + 7 * Math.sin(angle + 0.3)
      );
      ctx3b.closePath();
      ctx3b.fillStyle = "rgba(0,0,0,0.5)";
      ctx3b.fill();
    }
  }
}

function draw3b() {
  ctx3b.clearRect(0, 0, width, height); // Изчистваме целия canvas

  drawGrid(); // Чертаем мрежата
  drawVectorField(); // Чертаем векторното поле

  // Чертаем осите
  ctx3b.strokeStyle = "#ccc";
  ctx3b.lineWidth = 2;
  ctx3b.beginPath();
  ctx3b.moveTo(0, height - 50); // X-ос
  ctx3b.lineTo(width, height - 50);
  ctx3b.moveTo(50, 0); // Y-ос
  ctx3b.lineTo(50, height);
  ctx3b.stroke();

  // Чертаем пътеката на симулацията
  ctx3b.beginPath();
  ctx3b.strokeStyle = "#2c3e50"; // Цвят на пътеката
  ctx3b.lineWidth = 2;
  for (let i = 0; i < points.length; i++) {
    const px = scaleX(points[i].x);
    const py = scaleY(points[i].y);
    if (i === 0) ctx3b.moveTo(px, py); // Започваме пътеката
    else ctx3b.lineTo(px, py); // Продължаваме пътеката
  }
  ctx3b.stroke();

  // Чертаем текущата позиция (червена точка)
  if (points.length > 0) {
    const latest = points[points.length - 1];
    ctx3b.beginPath();
    ctx3b.fillStyle = "red"; // Цвят на точката
    ctx3b.arc(scaleX(latest.x), scaleY(latest.y), 5, 0, 2 * Math.PI); // Кръг
    ctx3b.fill();
  }
}

// Анимационен цикъл
function loop3b() {
  updateModel(currentScenario); // Обновяваме модела
  draw3b(); // Чертаем
  requestAnimationFrame(loop3b); // Извикваме следващия кадър
}

// Инициализация и стартиране на симулацията
let currentScenario = 1;
initScenario(currentScenario);
loop3b();

// Обработка на кликванията на бутоните
document.getElementById("scenario1").onclick = () => {
  currentScenario = 1;
  initScenario(currentScenario);
};
document.getElementById("scenario2").onclick = () => {
  currentScenario = 2;
  initScenario(currentScenario);
};
document.getElementById("scenario3").onclick = () => {
  currentScenario = 3;
  initScenario(currentScenario);
};

scene3Timeline
  .fromTo(
    ".text-box-3d,.text-box-3e, .did-you-know-3a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-3d, .text-box-3e, .did-you-know-3a",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=2"
  );

scene3Timeline
  .fromTo(
    ".text-box-3f,.text-box-3g, .text-box-3h",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-3f, .text-box-3g, .text-box-3h",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=2"
  );

scene3Timeline.to(
  ".background-3",
  { autoAlpha: 0, duration: 1, ease: "power2.out" },
  "+=1"
);

/* Scene 4 */
const scene4Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-4",
    start: "top top",
    end: "+=600%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene4Timeline
  .fromTo(
    ".text-box-4a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )

  .to(".text-box-4a", { autoAlpha: 0, duration: 1 }, "+=1")

  .fromTo(
    ".background-4a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )

  .fromTo(
    ".text-box-4b, .text-box-4c, .text-box-4d, .video-container-4a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 }
  )

  .to(
    ".text-box-4b, .text-box-4c, .text-box-4d, .video-container-4a",
    { autoAlpha: 0, duration: 1 },
    "+=1"
  )

  .to(
    ".background-4a",
    {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.out",
    },
    "+=2"
  );

scene4Timeline.to(
  ".background-4b",
  {
    autoAlpha: 1,
    duration: 2,
    ease: "power2.out",
  },
  "<"
);

scene4Timeline
  .fromTo(
    ".figure-4.tarantula, .text-box-4e",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(".text-box-4e", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1")
  .to(".text-box-4f", { autoAlpha: 1, duration: 1, ease: "power2.out" })
  .to(".text-box-4f", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1")
  .to(".text-box-4g, .text-box-4h, .figure-4.spider-optical", {
    autoAlpha: 1,
    duration: 1,
    ease: "power2.out",
  })
  .to(
    ".text-box-4g, .text-box-4h, .figure-4.spider-optical, .figure-4.tarantula",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .to(
    ".background-4b",
    {
      autoAlpha: 0,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  )
  .to(
    ".background-4c",
    {
      autoAlpha: 1,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  );

scene4Timeline
  .fromTo(
    ".text-box-4i, .figure-4.turing",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4i, .figure-4.turing",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .fromTo(
    ".text-box-4j, .text-box-4k, .figure-4.danio_rerio, .figure-4.leopard, .figure-4.zebra",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4j, .text-box-4k, .figure-4.danio_rerio, .figure-4.leopard, .figure-4.zebra",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .fromTo(
    ".text-box-4l,.text-box-4l1, .sim-gray-scott",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4l, .text-box-4l1, .sim-gray-scott",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

(() => {
  const canvas = document.getElementById("sim-gray-scott-4");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Размер на мрежата (по-малък от canvas за по-добра производителност)
  const gridSize = 150;
  const scale = width / gridSize;

  // Полета на концентрациите u и v (2D масиви)
  let u = new Float32Array(gridSize * gridSize);
  let v = new Float32Array(gridSize * gridSize);
  let uNext = new Float32Array(gridSize * gridSize);
  let vNext = new Float32Array(gridSize * gridSize);

  // Параметри (ще се вземат от плъзгачите)
  let D_u = 0.16;
  let D_v = 0.08;
  let F = 0.035;
  let k = 0.065;

  // Инициализация на масивите
  function resetGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
      u[i] = 1.0;
      v[i] = 0.0;
    }
    // Добавяне на произволен шум
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (Math.random() < 0.1) {
        // 10% шанс за "шум"
        v[i] = Math.random(); // Произволни стойности между 0 и 1
        u[i] = Math.random();
      }
    }
    // Можете да запазите и централната капка, ако искате
    const mid = Math.floor(gridSize / 2);
    for (let y = mid - 10; y < mid + 10; y++) {
      for (let x = mid - 10; x < mid + 10; x++) {
        const idx = y * gridSize + x;
        v[idx] = 0.25;
        u[idx] = 0.5;
      }
    }
  }

  // Лапласов оператор (краен диференциален)
  function laplace(arr, x, y) {
    const idx = y * gridSize + x;
    let sum = 0;
    sum += arr[idx] * -1;
    if (x > 0) sum += arr[y * gridSize + (x - 1)] * 0.2;
    if (x < gridSize - 1) sum += arr[y * gridSize + (x + 1)] * 0.2;
    if (y > 0) sum += arr[(y - 1) * gridSize + x] * 0.2;
    if (y < gridSize - 1) sum += arr[(y + 1) * gridSize + x] * 0.2;
    if (x > 0 && y > 0) sum += arr[(y - 1) * gridSize + (x - 1)] * 0.05;
    if (x > 0 && y < gridSize - 1)
      sum += arr[(y + 1) * gridSize + (x - 1)] * 0.05;
    if (x < gridSize - 1 && y > 0)
      sum += arr[(y - 1) * gridSize + (x + 1)] * 0.05;
    if (x < gridSize - 1 && y < gridSize - 1)
      sum += arr[(y + 1) * gridSize + (x + 1)] * 0.05;
    return sum;
  }

  // Стъпка на симулацията
  function step() {
    for (let y = 1; y < gridSize - 1; y++) {
      for (let x = 1; x < gridSize - 1; x++) {
        const idx = y * gridSize + x;
        const uVal = u[idx];
        const vVal = v[idx];

        // Реакция и дифузия
        const lapU = laplace(u, x, y);
        const lapV = laplace(v, x, y);

        // Gray-Scott уравнения
        uNext[idx] = uVal + (D_u * lapU - uVal * vVal * vVal + F * (1 - uVal));
        vNext[idx] = vVal + (D_v * lapV + uVal * vVal * vVal - (F + k) * vVal);

        // Clamp 0..1
        uNext[idx] = Math.min(Math.max(uNext[idx], 0), 1);
        vNext[idx] = Math.min(Math.max(vNext[idx], 0), 1);
      }
    }

    // Смяна на масивите
    [u, uNext] = [uNext, u];
    [v, vNext] = [vNext, v];
  }

  // Рисуване на резултата
  function draw() {
    const imgData = ctx.createImageData(gridSize, gridSize);
    for (let i = 0; i < gridSize * gridSize; i++) {
      // Използваме u и v за цвят - например u - v дава шарката
      const c = Math.floor((u[i] - v[i]) * 255);
      const color = Math.min(Math.max(c, 0), 255);

      imgData.data[i * 4 + 0] = color; // R
      imgData.data[i * 4 + 1] = color; // G
      imgData.data[i * 4 + 2] = color; // B
      imgData.data[i * 4 + 3] = 255; // Alpha
    }
    // Разтягане до целия canvas
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = gridSize;
    offscreenCanvas.height = gridSize;
    offscreenCanvas.getContext("2d").putImageData(imgData, 0, 0);

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(offscreenCanvas, 0, 0, width, height);
  }

  // Инициализация
  resetGrid();

  // Добавяне на "вълна" при клик върху платното
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / scale);
    const y = Math.floor((e.clientY - rect.top) / scale);
    const idx = y * gridSize + x;
    if (idx >= 0 && idx < gridSize * gridSize) {
      v[idx] = 0.8;
      u[idx] = 0.2;
    }
  });

  // Главен цикъл
  function animate() {
    for (let i = 0; i < 10; i++) {
      // по-бърза симулация
      step();
    }
    draw();
    requestAnimationFrame(animate);
  }
  animate();

  // Обновяване на визуализираните стойности
  function updateSliderValues() {
    document.getElementById("value-Du").textContent = parseFloat(
      sliderDu.value
    ).toFixed(3);
    document.getElementById("value-Dv").textContent = parseFloat(
      sliderDv.value
    ).toFixed(3);
    document.getElementById("value-F").textContent = parseFloat(
      sliderF.value
    ).toFixed(4);
    document.getElementById("value-k").textContent = parseFloat(
      sliderK.value
    ).toFixed(4);
  }

  // Свързване с oninput
  const sliderDu = document.getElementById("slider-Du");
  const sliderDv = document.getElementById("slider-Dv");
  const sliderF = document.getElementById("slider-F");
  const sliderK = document.getElementById("slider-k");

  sliderDu.oninput = () => {
    D_u = parseFloat(sliderDu.value);
    resetGrid();
    updateSliderValues();
  };
  sliderDv.oninput = () => {
    D_v = parseFloat(sliderDv.value);
    resetGrid();
    updateSliderValues();
  };
  sliderF.oninput = () => {
    F = parseFloat(sliderF.value);
    resetGrid();
    updateSliderValues();
  };
  sliderK.oninput = () => {
    k = parseFloat(sliderK.value);
    resetGrid();
    updateSliderValues();
  };

  // Първоначално обновяване
  updateSliderValues();
})();

scene4Timeline
  .to(
    ".background-4c",
    {
      autoAlpha: 0,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  )
  .to(
    ".background-4d",
    {
      autoAlpha: 1,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  );

scene4Timeline
  .fromTo(
    ".text-box-4m, .text-box-4n, .figure-4.octopus",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4m, .text-box-4n, .figure-4.octopus",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .fromTo(
    ".text-box-4o, .video-container-4b",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4o, .video-container-4b",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .to(
    ".background-4d",
    {
      autoAlpha: 0,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  )
  .to(
    ".background-4e",
    {
      autoAlpha: 1,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  );

scene4Timeline
  .fromTo(
    ".text-box-4p, .text-box-4q",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4p, .text-box-4q",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .fromTo(
    ".text-box-4r, .text-box-4s, .figure-4.aco",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4r, .text-box-4s, .figure-4.aco",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene4Timeline
  .fromTo(
    ".text-box-4t, .text-box-4u",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-4t, .text-box-4u",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  )
  .to(".background-4e", { autoAlpha: 0, duration: 1, ease: "power2.out" });

/* Scene 5 */
const scene5Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-5",
    start: "top top",
    end: "+=400%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene5Timeline.fromTo(
  ".background-5",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
);

scene5Timeline
  .fromTo(
    ".text-box-5a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(".text-box-5a", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1");

scene5Timeline
  .fromTo(
    ".text-box-5b, .text-box-5c, .sim-log-spiral",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5b, .text-box-5c, .sim-log-spiral",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sim-log-spiral");
  const ctx = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const a = 2; // initial radius scale
  const b = 0.15; // growth rate

  let maxTheta = 0;
  const maxThetaLimit = 12 * Math.PI; // max angle for one full spiral drawing
  const delta = 0.05; // increment per frame

  function drawSpiral(thetaLimit) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    // Start at center
    const startX = centerX + a * Math.exp(b * 0) * Math.cos(0);
    const startY = centerY + a * Math.exp(b * 0) * Math.sin(0);
    ctx.moveTo(startX, startY);

    for (let t = 0; t < thetaLimit; t += 0.01) {
      const r = a * Math.exp(b * t);
      const x = centerX + r * Math.cos(t);
      const y = centerY + r * Math.sin(t);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function animate() {
    drawSpiral(maxTheta);

    maxTheta += delta;
    if (maxTheta > maxThetaLimit) {
      maxTheta = 0; // reset to start the spiral again
    }

    requestAnimationFrame(animate);
  }

  animate();
});

scene5Timeline
  .fromTo(
    ".text-box-5d, .figure-5.snail_shell, .figure-5.sunflower",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5d, .figure-5.snail_shell, .figure-5.sunflower",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5e, .text-box-5f, .text-box-5g, .did-you-know-5a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5e, .text-box-5f, .text-box-5g, .did-you-know-5a",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5h, .sim-sierpinski",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5h, .sim-sierpinski",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

window.addEventListener("DOMContentLoaded", () => {
  const canvas5b = document.getElementById("sim-sierpinski");
  const ctx5b = canvas5b.getContext("2d");

  // Handle high-DPI screens
  const dpr5b = window.devicePixelRatio || 1;
  const width5b = 400;
  const height5b = 400;

  canvas5b.width = width5b * dpr5b;
  canvas5b.height = height5b * dpr5b;
  canvas5b.style.width = width5b + "px";
  canvas5b.style.height = height5b + "px";
  ctx5b.scale(dpr5b, dpr5b);

  const p1_5b = { x: width5b / 2, y: 20 };
  const p2_5b = { x: 20, y: height5b - 20 };
  const p3_5b = { x: width5b - 20, y: height5b - 20 };

  function drawTriangle5b(a5b, b5b, c5b, color5b = "#0099ff") {
    ctx5b.beginPath();
    ctx5b.moveTo(a5b.x, a5b.y);
    ctx5b.lineTo(b5b.x, b5b.y);
    ctx5b.lineTo(c5b.x, c5b.y);
    ctx5b.closePath();
    ctx5b.fillStyle = color5b;
    ctx5b.fill();
  }

  function sierpinski5b(a5b, b5b, c5b, depth5b) {
    if (depth5b === 0) {
      drawTriangle5b(a5b, b5b, c5b);
      return;
    }

    const ab5b = midpoint5b(a5b, b5b);
    const bc5b = midpoint5b(b5b, c5b);
    const ca5b = midpoint5b(c5b, a5b);

    sierpinski5b(a5b, ab5b, ca5b, depth5b - 1);
    sierpinski5b(ab5b, b5b, bc5b, depth5b - 1);
    sierpinski5b(ca5b, bc5b, c5b, depth5b - 1);
  }

  function midpoint5b(p15b, p25b) {
    return {
      x: (p15b.x + p25b.x) / 2,
      y: (p15b.y + p25b.y) / 2,
    };
  }

  let currentDepth5b = 0;
  const maxDepth5b = 5;

  function animate5b() {
    ctx5b.clearRect(0, 0, width5b, height5b);
    sierpinski5b(p1_5b, p2_5b, p3_5b, currentDepth5b);

    currentDepth5b++;
    if (currentDepth5b > maxDepth5b) {
      currentDepth5b = 0;
    }

    setTimeout(animate5b, 1000); // every 1 second
  }

  animate5b();
});

scene5Timeline
  .fromTo(
    ".text-box-5i, .sim-koch",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5i, .sim-koch",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

window.addEventListener("DOMContentLoaded", () => {
  const canvas5b = document.getElementById("sim-koch");
  const ctx5b = canvas5b.getContext("2d");

  const dpr5b = window.devicePixelRatio || 1;
  const width5b = 500;
  const height5b = 500;

  canvas5b.width = width5b * dpr5b;
  canvas5b.height = height5b * dpr5b;
  canvas5b.style.width = width5b + "px";
  canvas5b.style.height = height5b + "px";
  ctx5b.scale(dpr5b, dpr5b);

  function drawKochLine5b(p1_5b, p2_5b, depth5b) {
    if (depth5b === 0) {
      ctx5b.beginPath();
      ctx5b.moveTo(p1_5b.x, p1_5b.y);
      ctx5b.lineTo(p2_5b.x, p2_5b.y);
      ctx5b.stroke();
      return;
    }

    const dx5b = (p2_5b.x - p1_5b.x) / 3;
    const dy5b = (p2_5b.y - p1_5b.y) / 3;

    const pA_5b = { x: p1_5b.x + dx5b, y: p1_5b.y + dy5b };
    const pB_5b = { x: p1_5b.x + 2 * dx5b, y: p1_5b.y + 2 * dy5b };

    const angleRad5b = Math.PI / 3;
    const vx5b = pB_5b.x - pA_5b.x;
    const vy5b = pB_5b.y - pA_5b.y;

    const pC_5b = {
      x: pA_5b.x + Math.cos(angleRad5b) * vx5b - Math.sin(angleRad5b) * vy5b,
      y: pA_5b.y + Math.sin(angleRad5b) * vx5b + Math.cos(angleRad5b) * vy5b,
    };

    drawKochLine5b(p1_5b, pA_5b, depth5b - 1);
    drawKochLine5b(pA_5b, pC_5b, depth5b - 1);
    drawKochLine5b(pC_5b, pB_5b, depth5b - 1);
    drawKochLine5b(pB_5b, p2_5b, depth5b - 1);
  }

  let currentDepth5b = 0;
  const maxDepth5b = 5;

  function animateKoch5b() {
    ctx5b.clearRect(0, 0, width5b, height5b);
    ctx5b.strokeStyle = "#0066ff";
    ctx5b.lineWidth = 1;

    const size5b = 400;

    // Геометрия: височина на равностранен триъгълник
    const heightTriangle5b = (Math.sqrt(3) / 2) * size5b;

    // Центриране спрямо canvas
    const offsetX5b = (width5b - size5b) / 2;
    const offsetY5b = (height5b - heightTriangle5b - 133) / 2;

    const p1_5b = { x: offsetX5b, y: offsetY5b + heightTriangle5b };
    const p2_5b = { x: offsetX5b + size5b, y: offsetY5b + heightTriangle5b };
    const p3_5b = { x: offsetX5b + size5b / 2, y: offsetY5b };

    drawKochLine5b(p1_5b, p2_5b, currentDepth5b);
    drawKochLine5b(p2_5b, p3_5b, currentDepth5b);
    drawKochLine5b(p3_5b, p1_5b, currentDepth5b);

    currentDepth5b++;
    if (currentDepth5b > maxDepth5b) {
      currentDepth5b = 0;
    }

    setTimeout(animateKoch5b, 1000);
  }

  animateKoch5b();
});

scene5Timeline
  .fromTo(
    ".text-box-5j, .did-you-know-5b",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5j, .did-you-know-5b",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5k, .figure-5.golden_ratio",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5k, .figure-5.golden_ratio",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5l, .video-container-5a",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5l, .video-container-5a",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5m, .figure-5.artichoke, .figure-5.pinecone, .figure-5.pineapple",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5m, .figure-5.artichoke, .figure-5.pinecone, .figure-5.pineapple",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5n, .figure-5.vitruvian_man, .figure-5.parthenon",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-5n, .figure-5.vitruvian_man, .figure-5.parthenon",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );

scene5Timeline
  .fromTo(
    ".text-box-5o",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(".text-box-5o", { autoAlpha: 0, duration: 1, ease: "power2.out" }, "+=1");

scene5Timeline.to(".background-5", {
  autoAlpha: 0,
  duration: 0.5,
  ease: "power2.out",
});

/* Scene 6 */
const scene6Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-6",
    start: "top top",
    end: "+=400%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

scene6Timeline.fromTo(
  ".background-6",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 1, ease: "power2.out" }
);

scene6Timeline
  .fromTo(
    ".text-box-6a, .text-box-6b, .text-box-6c",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1, ease: "power2.out" }
  )
  .to(
    ".text-box-6a, .text-box-6b, .text-box-6c",
    { autoAlpha: 0, duration: 1, ease: "power2.out" },
    "+=1"
  );
