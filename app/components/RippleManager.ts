import * as THREE from 'three'

export class RippleManager {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  texture: THREE.CanvasTexture
  ripples: { x: number; y: number; age: number; angle: number }[] = []

  maxAge = 120
  speed = 4.0

  constructor(width = 2048, height = 2048) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext('2d')!

    this.texture = new THREE.CanvasTexture(this.canvas)
    this.texture.minFilter = THREE.LinearFilter
    this.texture.magFilter = THREE.LinearFilter
  }

  addRipple(x: number, y: number) {
    if (this.ripples.length >= 3) return;

    this.ripples.push({
      x: x * this.canvas.width,
      y: y * this.canvas.height,
      age: 0,
      angle: Math.random() * Math.PI * 2
    })
  }

  update() {
    this.context.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.strokeStyle = 'rgba(255, 255, 255, 1)'
    this.context.lineWidth = 15;
    this.context.shadowBlur = 15;
    this.context.shadowColor = 'white';

    this.ripples = this.ripples.filter(r => r.age < this.maxAge)

    this.ripples.forEach(r => {
      r.age += this.speed
      const radius = r.age * 2
      const life = r.age / this.maxAge
      const alpha = 1.0 - smoothstep(0, 1, life)

      if (alpha <= 0.01) {
        r.age = 99999
        return
      }

      this.context.beginPath()
      this.context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`
      this.context.arc(r.x, r.y, radius, 0, Math.PI * 2)
      this.context.stroke()
    })

    this.context.shadowBlur = 0;
    this.texture.needsUpdate = true
  }
}

// Helper
function smoothstep(min: number, max: number, value: number) {
  let x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
}