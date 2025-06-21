const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height;
    this.size = 30 + Math.random() * 50;
    this.speed = 0.5 + Math.random() * 1.2;
    this.opacity = 0.05 + Math.random() * 0.1;
    this.wave = Math.random() * 100;
    this.color = `rgba(100, 180, 255, ${this.opacity})`;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y / 50 + this.wave) * 1;

    if (this.y < -this.size) {
      this.y = canvas.height + Math.random() * 100;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 40, this.size / 40);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
    ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
    ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
    ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

let hearts = [];
for (let i = 0; i < 200; i++) {  // AUMENTEI pra encher a tela de corações
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animate);
}

animate();

function mostrarSegundaPagina() {
  document.getElementById('pagina1').style.display = 'none';
  document.getElementById('pagina2').style.display = 'block';
  document.getElementById('audio').play();
}

function voltar() {
  document.getElementById('pagina2').style.display = 'none';
  document.getElementById('pagina1').style.display = 'block';
  document.getElementById('audio').pause();
  document.getElementById('audio').currentTime = 0;
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
