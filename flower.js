const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowers = [];

// Utility function to generate random numbers in a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Flower Class
class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.stemHeight = 0;
    this.maxStemHeight = 200;
    this.petalSize = 50;
    this.petals = [];
    this.centerPulse = 0;
    this.leaves = [];
    this.initPetals();
    this.initLeaves();
  }

  initPetals() {
    const colors = ["#FF69B4", "#FFD700", "#FF4500", "#800080"];
    const maxPetals = 8;
    for (let i = 0; i < maxPetals; i++) {
      const angle = (Math.PI * 2 * i) / maxPetals;
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.petals.push({
        angle: angle,
        size: 0,
        color: color,
        bloomSpeed: random(0.02, 0.05),
        glow: random(10, 20),
      });
    }
  }

  initLeaves() {
    this.leaves.push({
      x: this.x - 15,
      y: this.y,
      size: 0,
      angle: -Math.PI / 4,
      growSpeed: random(0.02, 0.04),
    });
    this.leaves.push({
      x: this.x + 15,
      y: this.y,
      size: 0,
      angle: Math.PI / 4,
      growSpeed: random(0.02, 0.04),
    });
  }

  drawStem() {
    // Add a gradient for the stem
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.stemHeight);
    gradient.addColorStop(0, "#228B22");
    gradient.addColorStop(1, "#32CD32");

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.stemHeight);
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Add stem texture
    ctx.save();
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < this.stemHeight; i += 10) {
      ctx.beginPath();
      ctx.arc(this.x + random(-2, 2), this.y - i, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#006400";
      ctx.fill();
    }
    ctx.restore();
  }

  drawLeaves() {
    this.leaves.forEach((leaf) => {
      if (leaf.size < 1) leaf.size += leaf.growSpeed;
      ctx.save();
      ctx.translate(this.x, this.y - this.stemHeight / 2);
      ctx.rotate(leaf.angle);
      ctx.beginPath();
      ctx.ellipse(leaf.x, leaf.y, 30 * leaf.size, 15 * leaf.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#32CD32";
      ctx.shadowColor = "#006400";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    });
  }

  drawPetals() {
    this.petals.forEach((petal) => {
      if (petal.size < 1) petal.size += petal.bloomSpeed;
      ctx.save();
      ctx.translate(this.x, this.y - this.stemHeight);
      ctx.rotate(petal.angle);

      // Glowing effect
      ctx.shadowColor = petal.color;
      ctx.shadowBlur = petal.glow;

      // Draw petal
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        this.petalSize / 2,
        -this.petalSize * petal.size * 1.5,
        0,
        -this.petalSize * petal.size * 2
      );
      ctx.quadraticCurveTo(
        -this.petalSize / 2,
        -this.petalSize * petal.size * 1.5,
        0,
        0
      );
      ctx.fillStyle = petal.color;
      ctx.fill();
      ctx.restore();
    });
  }

  drawCenter() {
    this.centerPulse = Math.sin(Date.now() * 0.005) * 5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#FFD700";
    ctx.beginPath();
    ctx.arc(this.x, this.y - this.stemHeight, 20 + this.centerPulse, 0, Math.PI * 2);
    ctx.fillStyle = "#FFA500";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  grow() {
    if (this.stemHeight < this.maxStemHeight) {
      this.stemHeight += 2;
    }
  }

  draw() {
    this.drawStem();
    this.drawLeaves();
    this.drawPetals();
    this.drawCenter();
  }

  update() {
    this.grow();
    this.draw();
  }
}

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw all flowers
  flowers.forEach((flower) => {
    flower.update();
  });

  requestAnimationFrame(animate);
}

// Event Listener to create a new flower
canvas.addEventListener("click", (e) => {
  const { offsetX, offsetY } = e;
  flowers.push(new Flower(offsetX, offsetY));
});

// Start Animation
animate();


