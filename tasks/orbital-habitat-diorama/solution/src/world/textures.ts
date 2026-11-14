import * as THREE from 'three'

// All surface detail is generated locally on canvas at runtime.
// No remote resources are touched anywhere in this project.

export function ctex (w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')!
  draw(g, w, h)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

let seed = 7
export function rnd (): number {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

function scratches (g: CanvasRenderingContext2D, w: number, h: number, n: number, alpha: number): void {
  g.strokeStyle = `rgba(60,64,70,${alpha})`
  g.lineWidth = 1
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h, l = 4 + rnd() * 26, a = rnd() * Math.PI
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke()
  }
  g.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`
  for (let i = 0; i < n / 2; i++) {
    const x = rnd() * w, y = rnd() * h, l = 3 + rnd() * 14, a = rnd() * Math.PI
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke()
  }
}

/** matte off-white baked-metal wall panel with seams + rivet dots + wear */
export function wallPanel (): THREE.CanvasTexture {
  return ctex(512, 512, (g, w, h) => {
    g.fillStyle = '#cfd3d6'; g.fillRect(0, 0, w, h)
    const grad = g.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, 'rgba(255,255,255,0.10)'); grad.addColorStop(1, 'rgba(70,76,84,0.14)')
    g.fillStyle = grad; g.fillRect(0, 0, w, h)
    // brushed noise
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(${120 + rnd() * 60},${125 + rnd() * 60},${130 + rnd() * 60},0.08)`
      g.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1)
    }
    scratches(g, w, h, 60, 0.16)
    // panel seams
    g.strokeStyle = 'rgba(52,56,62,0.85)'; g.lineWidth = 3
    g.strokeRect(4, 4, w - 8, h - 8)
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 1
    g.strokeRect(8, 8, w - 16, h - 16)
    // corner rivets
    for (const [x, y] of [[26, 26], [w - 26, 26], [26, h - 26], [w - 26, h - 26]]) {
      g.fillStyle = '#8b9096'; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill()
      g.fillStyle = '#e8ebee'; g.beginPath(); g.arc(x - 2, y - 2, 4, 0, 7); g.fill()
    }
    // stencil number
    g.fillStyle = 'rgba(70,74,80,0.55)'
    g.font = 'bold 44px sans-serif'; g.fillText('H-07', w - 150, h - 40)
  })
}

/** anti-slip grating floor */
export function floorGrate (): THREE.CanvasTexture {
  return ctex(512, 512, (g, w, h) => {
    g.fillStyle = '#3a3e44'; g.fillRect(0, 0, w, h)
    const cell = 32
    for (let y = 0; y < h; y += cell) {
      for (let x = 0; x < w; x += cell) {
        g.fillStyle = (x / cell + y / cell) % 2 ? '#43484f' : '#3d4148'
        g.fillRect(x + 2, y + 2, cell - 4, cell - 4)
        g.fillStyle = '#26292e'
        g.fillRect(x + cell / 2 - 4, y + cell / 2 - 2, 8, 4)
      }
    }
    scratches(g, w, h, 90, 0.22)
    // wear: lighter traffic lane
    const grad = g.createLinearGradient(0, 0, w, 0)
    grad.addColorStop(0, 'rgba(0,0,0,0.25)'); grad.addColorStop(0.5, 'rgba(255,255,255,0.06)'); grad.addColorStop(1, 'rgba(0,0,0,0.25)')
    g.fillStyle = grad; g.fillRect(0, 0, w, h)
  })
}

/** cut sandwich edge: paint / honeycomb / inner skin */
export function sandwich (): THREE.CanvasTexture {
  return ctex(256, 64, (g, w, h) => {
    g.fillStyle = '#d7dbde'; g.fillRect(0, 0, w, 14)
    g.fillStyle = '#7a6a4a'; g.fillRect(0, 14, w, 30)
    g.strokeStyle = '#4d4128'; g.lineWidth = 1
    for (let x = 0; x < w; x += 10) {
      g.beginPath(); g.moveTo(x, 14); g.lineTo(x + 5, 44); g.lineTo(x + 10, 14); g.stroke()
    }
    g.fillStyle = '#9aa0a6'; g.fillRect(0, 44, w, 12)
    g.fillStyle = '#565b61'; g.fillRect(0, 56, w, 8)
  })
}

export function labelPlate (text: string, opts: { bg?: string, fg?: string, stripe?: boolean, sub?: string } = {}): THREE.CanvasTexture {
  const { bg = '#d8b93a', fg = '#1c1c1c', stripe = false, sub = '' } = opts
  return ctex(256, 128, (g, w, h) => {
    g.fillStyle = bg; g.fillRect(0, 0, w, h)
    if (stripe) {
      g.fillStyle = '#161616'
      for (let x = -h; x < w; x += 32) {
        g.beginPath(); g.moveTo(x, h); g.lineTo(x + 16, 0); g.lineTo(x + 32, 0); g.lineTo(x + 16, h); g.fill()
      }
      g.fillStyle = bg; g.fillRect(28, 30, w - 56, h - 60)
    }
    g.fillStyle = fg
    g.font = 'bold 56px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'
    g.fillText(text, w / 2, sub ? h / 2 - 16 : h / 2)
    if (sub) { g.font = 'bold 24px sans-serif'; g.fillText(sub, w / 2, h - 30) }
    g.strokeStyle = fg; g.lineWidth = 4; g.strokeRect(4, 4, w - 8, h - 8)
  })
}

export function ventGrille (): THREE.CanvasTexture {
  return ctex(256, 128, (g, w, h) => {
    g.fillStyle = '#565b62'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#22252a'
    for (let y = 10; y < h - 6; y += 14) g.fillRect(10, y, w - 20, 7)
    g.strokeStyle = '#9aa0a6'; g.lineWidth = 4; g.strokeRect(3, 3, w - 6, h - 6)
  })
}

export function photoCard (caption: string, hue: number): THREE.CanvasTexture {
  return ctex(200, 240, (g, w, h) => {
    g.fillStyle = '#f2efe6'; g.fillRect(0, 0, w, h)
    g.fillStyle = `hsl(${hue},45%,62%)`; g.fillRect(14, 14, w - 28, h - 70)
    // two simple figures (family snapshot abstraction)
    g.fillStyle = 'rgba(30,30,40,0.85)'
    g.beginPath(); g.arc(w * 0.38, 105, 22, 0, 7); g.fill()
    g.fillRect(w * 0.38 - 26, 125, 52, 40)
    g.beginPath(); g.arc(w * 0.63, 112, 16, 0, 7); g.fill()
    g.fillRect(w * 0.63 - 19, 126, 38, 39)
    g.fillStyle = `hsl(${hue},50%,78%)`; g.fillRect(14, 14, w - 28, 40)
    g.fillStyle = '#333'; g.font = '20px sans-serif'; g.textAlign = 'center'
    g.fillText(caption, w / 2, h - 22)
  })
}

export function stickyNote (lines: string[]): THREE.CanvasTexture {
  return ctex(220, 220, (g, w, h) => {
    g.fillStyle = '#ffe27a'; g.fillRect(0, 0, w, h)
    g.fillStyle = 'rgba(0,0,0,0.08)'; g.fillRect(0, h - 26, w, 26)
    g.fillStyle = '#24303e'; g.font = '26px sans-serif'; g.textAlign = 'center'
    lines.forEach((s, i) => g.fillText(s, w / 2, 60 + i * 44))
  })
}

export function blueprint (): THREE.CanvasTexture {
  return ctex(300, 400, (g, w, h) => {
    g.fillStyle = '#dfe6ea'; g.fillRect(0, 0, w, h)
    g.strokeStyle = '#3d6b8e'; g.lineWidth = 2
    g.strokeRect(20, 20, w - 40, h - 40)
    // capsule side view
    g.beginPath()
    g.moveTo(60, 150); g.lineTo(200, 150)
    g.arc(200, 190, 40, -Math.PI / 2, Math.PI / 2)
    g.lineTo(60, 230); g.arc(60, 190, 40, Math.PI / 2, Math.PI * 1.5)
    g.stroke()
    g.beginPath(); g.arc(150, 190, 28, 0, 7); g.stroke()
    g.font = '20px sans-serif'; g.fillStyle = '#3d6b8e'
    g.fillText('ORBITAL-07 舱段', 60, 300)
    g.fillText('8.0 × 4.0 m', 60, 330)
    g.fillText('比例 1:50', 60, 360)
  })
}

/** open technical manual spread */
export function manualPages (): THREE.CanvasTexture {
  return ctex(512, 320, (g, w, h) => {
    g.fillStyle = '#efe9d8'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#d8d0b8'; g.fillRect(w / 2 - 2, 0, 4, h)
    g.fillStyle = '#2b2b2b'; g.font = 'bold 24px sans-serif'
    g.fillText('轨道维持手册 §4', 28, 40)
    g.font = '17px sans-serif'
    const left = ['Δv 预算 12.4 m/s', '近地点 398 km', '远地点 404 km', '倾角 51.6°', '周期 92.8 min', '下一次点火 T-02:14']
    left.forEach((s, i) => g.fillText(s, 28, 80 + i * 32))
    g.font = 'bold 24px sans-serif'
    g.fillText('对接程序', w / 2 + 28, 40)
    g.strokeStyle = '#2b2b2b'; g.lineWidth = 2
    g.strokeRect(w / 2 + 28, 60, 150, 100)
    g.beginPath(); g.moveTo(w / 2 + 28, 110); g.lineTo(w / 2 + 178, 110); g.stroke()
    g.font = '17px sans-serif'
    g.fillText('1. 确认捕获锁', w / 2 + 28, 200)
    g.fillText('2. 均衡气压', w / 2 + 28, 232)
    g.fillText('3. 打开内舱门', w / 2 + 28, 264)
  })
}

export function fabric (base: string, thread: string): THREE.CanvasTexture {
  return ctex(256, 256, (g, w, h) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h)
    g.strokeStyle = thread; g.lineWidth = 1; g.globalAlpha = 0.5
    for (let y = 0; y < h; y += 4) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke() }
    for (let x = 0; x < w; x += 4) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke() }
    g.globalAlpha = 1
    // quilted diamonds
    g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2
    for (let i = -h; i < w + h; i += 42) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke()
      g.beginPath(); g.moveTo(i + h, 0); g.lineTo(i, h); g.stroke()
    }
  })
}

export function towelTex (): THREE.CanvasTexture {
  return ctex(128, 256, (g, w, h) => {
    g.fillStyle = '#7fb3c8'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#e8f2f5'
    g.fillRect(0, 20, w, 12); g.fillRect(0, 44, w, 6)
    g.fillRect(0, h - 32, w, 12); g.fillRect(0, h - 50, w, 6)
    for (let i = 0; i < 500; i++) {
      g.fillStyle = `rgba(255,255,255,${rnd() * 0.12})`
      g.fillRect(rnd() * w, rnd() * h, 2, 2)
    }
  })
}

export function netTex (): THREE.CanvasTexture {
  const t = ctex(128, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h)
    g.strokeStyle = '#c9a44a'; g.lineWidth = 5
    for (let i = -h; i < w + h; i += 24) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke()
      g.beginPath(); g.moveTo(i + h, 0); g.lineTo(i, h); g.stroke()
    }
  })
  return t
}

export function radialGlow (inner: string, outer: string): THREE.CanvasTexture {
  return ctex(256, 256, (g, w, h) => {
    const gr = g.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2)
    gr.addColorStop(0, inner)
    gr.addColorStop(0.55, inner)
    gr.addColorStop(0.78, outer)
    gr.addColorStop(1, 'rgba(255,244,220,0)')
    g.fillStyle = gr
    g.fillRect(0, 0, w, h)
    // crisp porthole rim so the pool reads sharp, not cloudy
    g.strokeStyle = 'rgba(255,252,240,0.9)'
    g.lineWidth = 7
    g.beginPath(); g.arc(w / 2, h / 2, w * 0.33, 0, Math.PI * 2); g.stroke()
  })
}
export function foodPouch (flavor: string, color: string): THREE.CanvasTexture {
  return ctex(160, 200, (g, w, h) => {
    g.fillStyle = color; g.fillRect(0, 0, w, h)
    g.fillStyle = 'rgba(255,255,255,0.85)'; g.fillRect(14, 40, w - 28, 110)
    g.fillStyle = '#222'; g.font = 'bold 26px sans-serif'; g.textAlign = 'center'
    g.fillText('太空餐', w / 2, 80)
    g.font = 'bold 30px sans-serif'; g.fillText(flavor, w / 2, 118)
    g.fillStyle = '#eee'; g.font = '18px sans-serif'; g.fillText('SPACE FOOD', w / 2, h - 16)
  })
}

export function screenStatic (): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = 512; c.height = 320
  return c
}

/** scrolling orbital-telemetry screen; call every frame-ish with t */
export function drawScreen (c: HTMLCanvasElement, t: number): THREE.CanvasTexture | null {
  const g = c.getContext('2d')!
  const w = c.width, h = c.height
  g.fillStyle = '#06121a'; g.fillRect(0, 0, w, h)
  g.fillStyle = '#0a2a33'; g.fillRect(0, 0, w, 44)
  g.fillStyle = '#7df2e2'; g.font = 'bold 22px monospace'; g.textAlign = 'left'
  g.fillText('ORBITAL-07 · 轨道监控', 14, 30)
  g.fillStyle = '#ff9d5c'; g.font = '20px monospace'
  const met = `T+${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`
  g.fillText(met, w - 110, 30)
  // telemetry numbers
  g.font = '19px monospace'
  g.fillStyle = '#9fd8e8'
  const alt = (400 + 4 * Math.sin(t * 0.07)).toFixed(1)
  const vel = (7.66 + 0.01 * Math.sin(t * 0.11)).toFixed(2)
  g.fillText(`ALT ${alt} km   VEL ${vel} km/s`, 14, 70)
  g.fillText(`INC 51.6°   β ${(23 * Math.sin(t * 0.05)).toFixed(1)}°`, 14, 96)
  // scrolling curves
  const plot = (y0: number, y1: number, color: string, ph: number, amp: number, f: number) => {
    g.strokeStyle = 'rgba(120,160,170,0.25)'; g.lineWidth = 1
    for (let x = 0; x <= w; x += 32) { g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke() }
    g.strokeStyle = color; g.lineWidth = 2.5; g.beginPath()
    for (let x = 0; x <= w; x += 4) {
      const tt = t * f + x * 0.02
      const y = (y0 + y1) / 2 + Math.sin(tt + ph) * amp + Math.sin(tt * 2.7 + ph * 2) * amp * 0.3
      x === 0 ? g.moveTo(x, y) : g.lineTo(x, y)
    }
    g.stroke()
  }
  plot(110, 200, '#39e6c3', 0, 26, 0.9)
  plot(210, 300, '#5ca8ff', 2.1, 20, 0.6)
  return null
}

export function keyboardTex (): THREE.CanvasTexture {
  return ctex(256, 96, (g, w, h) => {
    g.fillStyle = '#15181c'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#2c3138'
    for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) g.fillRect(8 + c * 20, 8 + r * 26, 16, 20)
  })
}

export function bookCover (): THREE.CanvasTexture {
  return ctex(160, 220, (g, w, h) => {
    g.fillStyle = '#274b73'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#e8e2d2'; g.font = 'bold 30px sans-serif'; g.textAlign = 'center'
    g.fillText('星图', w / 2, 90)
    g.fillText('STAR', w / 2, 130)
    g.fillText('ATLAS', w / 2, 162)
    g.strokeStyle = '#e8e2d2'; g.lineWidth = 3; g.strokeRect(10, 10, w - 20, h - 20)
  })
}

export function shirtTex (base: string, stripe: string): THREE.CanvasTexture {
  return ctex(128, 128, (g, w, h) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h)
    g.fillStyle = stripe
    g.fillRect(0, 30, w, 14); g.fillRect(0, 84, w, 14)
  })
}

