document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());

const canvas = document.getElementById('fog');
const ctx = canvas.getContext('2d');
let width, height;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  width = canvas.width = document.documentElement.clientWidth;
  height = canvas.height = document.documentElement.clientHeight;
}
window.addEventListener('resize', resize);
resize();

function makeParticles(count) {
  const arr = [];
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    arr.push({
      x: ((col + 0.5) / cols) * width + (Math.random() - 0.5) * width * 0.3,
      y: ((row + 0.5) / rows) * height + (Math.random() - 0.5) * height * 0.3,
      r: 220 + Math.random() * 260,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.08,
      a: 0.05 + Math.random() * 0.06
    });
  }
  return arr;
}

const particles = makeParticles(reduceMotion ? 0 : 20);

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
    p.x = Math.min(Math.max(p.x, 0), width);
    p.y = Math.min(Math.max(p.y, 0), height);

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    gradient.addColorStop(0, `rgba(34, 232, 255, ${p.a})`);
    gradient.addColorStop(1, 'rgba(34, 232, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
  }
  requestAnimationFrame(draw);
}

if (!reduceMotion) {
  requestAnimationFrame(draw);
}
