import * as THREE from 'three';

export class TextureGenerator {
  private static cache: Map<string, THREE.CanvasTexture> = new Map();

  /**
   * Helper to create or get cached CanvasTexture
   */
  private static createCachedTexture(key: string, width: number, height: number, drawFn: (ctx: CanvasRenderingContext2D, width: number, height: number) => void): THREE.CanvasTexture {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    drawFn(ctx, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Concrete texture with noise, subtle cracks, and grain
   */
  public static getConcreteTexture(tint: string = '#727982'): THREE.CanvasTexture {
    return this.createCachedTexture(`concrete_${tint}`, 512, 512, (ctx, w, h) => {
      ctx.fillStyle = tint;
      ctx.fillRect(0, 0, w, h);

      // Noise grain
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 35;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      // Concrete panel joints and subtle stains
      ctx.strokeStyle = 'rgba(40, 45, 50, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, w - 8, h - 8);

      // Random weathering specks
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 2 + Math.random() * 8;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30, 35, 40, 0.15)' : 'rgba(200, 210, 220, 0.1)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  /**
   * Wet Asphalt texture with road markings, rain gloss, and dark puddles
   */
  public static getWetAsphaltTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('wet_asphalt', 1024, 1024, (ctx, w, h) => {
      // Base dark wet asphalt
      ctx.fillStyle = '#1c2024';
      ctx.fillRect(0, 0, w, h);

      // Micro-texture noise
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 25;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      // Dark wet puddle patches
      for (let i = 0; i < 18; i++) {
        const px = Math.random() * w;
        const py = Math.random() * h;
        const rw = 40 + Math.random() * 90;
        const rh = 30 + Math.random() * 70;
        const grad = ctx.createRadialGradient(px, py, 10, px, py, Math.max(rw, rh));
        grad.addColorStop(0, 'rgba(8, 12, 16, 0.85)');
        grad.addColorStop(0.7, 'rgba(12, 18, 22, 0.5)');
        grad.addColorStop(1, 'rgba(28, 32, 36, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(px, py, rw, rh, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle oil slick iridescence in puddles
      for (let i = 0; i < 5; i++) {
        const ox = Math.random() * w;
        const oy = Math.random() * h;
        const grad = ctx.createRadialGradient(ox, oy, 5, ox, oy, 35);
        grad.addColorStop(0, 'rgba(40, 120, 140, 0.2)');
        grad.addColorStop(0.5, 'rgba(140, 80, 120, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, 35, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  /**
   * Shipping Container texture with vertical ribs, rust edges, and stencil cargo numbers
   */
  public static getContainerTexture(baseColor: string = '#1e4875', label: string = 'CS-4088'): THREE.CanvasTexture {
    return this.createCachedTexture(`container_${baseColor}_${label}`, 512, 512, (ctx, w, h) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, w, h);

      // Vertical corrugated rib shading
      const ribWidth = 16;
      for (let x = 0; x < w; x += ribWidth) {
        // Highlight side
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(x, 0, ribWidth * 0.4, h);
        // Shadow side
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.fillRect(x + ribWidth * 0.4, 0, ribWidth * 0.6, h);
      }

      // Outer frame border
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#121820';
      ctx.strokeRect(0, 0, w, h);

      // Rust drips and weathering at corners and bottom
      ctx.fillStyle = 'rgba(110, 50, 20, 0.55)';
      ctx.fillRect(0, h - 25, w, 25);
      ctx.fillRect(0, 0, w, 15);

      for (let i = 0; i < 30; i++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        const rw = 8 + Math.random() * 20;
        const rh = 5 + Math.random() * 15;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(95, 42, 16, 0.6)' : 'rgba(140, 70, 30, 0.4)';
        ctx.fillRect(rx, ry, rw, rh);
      }

      // Warning hazard stripes band
      const stripeY = h * 0.68;
      ctx.fillStyle = '#d49b28';
      ctx.fillRect(30, stripeY, 180, 32);
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 6;
      for (let s = 30; s < 210; s += 16) {
        ctx.beginPath();
        ctx.moveTo(s, stripeY);
        ctx.lineTo(s + 16, stripeY + 32);
        ctx.stroke();
      }

      // Tactical freight stencil typography
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(label, 40, h * 0.35);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.font = '14px monospace';
      ctx.fillText('MAX WT. 30,480 KG', 40, h * 0.42);
      ctx.fillText('TACTICAL FREIGHT LOGISTICS', 40, h * 0.47);
    });
  }

  /**
   * Military Wooden Crate Texture with stenciled CS tactical logos
   */
  public static getWoodCrateTexture(label: string = 'CS-ARMAMENT'): THREE.CanvasTexture {
    return this.createCachedTexture(`wood_crate_${label}`, 512, 512, (ctx, w, h) => {
      // Wood plank base
      ctx.fillStyle = '#856447';
      ctx.fillRect(0, 0, w, h);

      // Horizontal planks
      const plankCount = 5;
      const ph = h / plankCount;
      for (let i = 0; i < plankCount; i++) {
        const y = i * ph;
        ctx.strokeStyle = '#432f1f';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, y, w, ph);

        // Wood grain lines
        for (let g = 0; g < 6; g++) {
          ctx.strokeStyle = 'rgba(60, 40, 20, 0.15)';
          ctx.lineWidth = 1 + Math.random() * 2;
          ctx.beginPath();
          ctx.moveTo(0, y + 4 + g * (ph / 6) + (Math.random() - 0.5) * 4);
          ctx.bezierCurveTo(
            w * 0.3, y + Math.random() * ph,
            w * 0.7, y + Math.random() * ph,
            w, y + 4 + g * (ph / 6)
          );
          ctx.stroke();
        }
      }

      // Outer wood reinforcing frame and cross braces
      ctx.fillStyle = '#6d5038';
      const f = 36;
      ctx.fillRect(0, 0, w, f);
      ctx.fillRect(0, h - f, w, f);
      ctx.fillRect(0, 0, f, h);
      ctx.fillRect(w - f, 0, f, h);

      // Diagonal cross brace
      ctx.strokeStyle = '#5a412c';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.moveTo(f, f);
      ctx.lineTo(w - f, h - f);
      ctx.stroke();

      // Corner metal brackets & screws
      ctx.fillStyle = '#222830';
      const bracketSize = 48;
      ctx.fillRect(0, 0, bracketSize, 14);
      ctx.fillRect(0, 0, 14, bracketSize);
      ctx.fillRect(w - bracketSize, 0, bracketSize, 14);
      ctx.fillRect(w - 14, 0, 14, bracketSize);
      ctx.fillRect(0, h - 14, bracketSize, 14);
      ctx.fillRect(0, h - bracketSize, 14, bracketSize);
      ctx.fillRect(w - bracketSize, h - 14, bracketSize, 14);
      ctx.fillRect(w - 14, h - bracketSize, 14, bracketSize);

      // Screws
      ctx.fillStyle = '#889098';
      const screwPoints = [
        [20, 20], [w - 20, 20], [20, h - 20], [w - 20, h - 20],
        [w / 2, 18], [w / 2, h - 18], [18, h / 2], [w - 18, h / 2]
      ];
      for (const [sx, sy] of screwPoints) {
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stenciled military text
      ctx.fillStyle = 'rgba(20, 20, 20, 0.85)';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(label, 70, h * 0.45);
      ctx.font = 'bold 16px monospace';
      ctx.fillText('FRAGILE / TACTICAL EXPLOSIVES', 70, h * 0.52);

      // Faction / CS symbol
      ctx.strokeStyle = 'rgba(20, 20, 20, 0.75)';
      ctx.lineWidth = 4;
      ctx.strokeRect(w - 120, h * 0.35, 45, 45);
      ctx.fillText('CS', w - 110, h * 0.42);
    });
  }

  /**
   * Blue Metal Oil Drum Texture with rust, yellow hazard band, and chemical warning
   */
  public static getOilDrumTexture(color: string = '#1d5a8a'): THREE.CanvasTexture {
    return this.createCachedTexture(`oil_drum_${color}`, 512, 512, (ctx, w, h) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);

      // Horizontal reinforcing ribs
      for (let y = 80; y < h; y += 140) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, y, w, 10);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(0, y + 10, w, 14);
      }

      // Yellow hazard warning band
      ctx.fillStyle = '#e5a823';
      ctx.fillRect(0, 200, w, 60);

      // Black hazard diagonal stripes
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 14;
      for (let x = -50; x < w + 50; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 200);
        ctx.lineTo(x + 30, 260);
        ctx.stroke();
      }

      // Flammable symbol & text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('FLAMMABLE - FUEL OIL', 40, 310);
      ctx.font = '14px monospace';
      ctx.fillText('UN 1202 CLASS 3 DIESEL', 40, 335);

      // Rust at edges and seams
      ctx.fillStyle = 'rgba(120, 50, 18, 0.5)';
      ctx.fillRect(0, 0, w, 20);
      ctx.fillRect(0, h - 24, w, 24);
      for (let i = 0; i < 25; i++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        ctx.fillRect(rx, ry, 6 + Math.random() * 14, 4 + Math.random() * 10);
      }
    });
  }

  /**
   * Cardboard Box Texture with packaging tape and barcode
   */
  public static getCardboardTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('cardboard_box', 512, 512, (ctx, w, h) => {
      ctx.fillStyle = '#a6825c';
      ctx.fillRect(0, 0, w, h);

      // Cardboard grain noise
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      // Plastic packaging tape along center
      ctx.fillStyle = 'rgba(190, 145, 80, 0.75)';
      ctx.fillRect(0, h * 0.45, w, 45);

      // Fragile glass cup stencil
      ctx.strokeStyle = 'rgba(20, 20, 20, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(80, 120, 20, 0, Math.PI);
      ctx.lineTo(75, 150);
      ctx.lineTo(85, 150);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = 'rgba(20, 20, 20, 0.75)';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('HANDLE WITH CARE', 120, 135);
      ctx.fillText('THIS SIDE UP ^', 120, 155);

      // Barcode sticker
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(w - 180, h - 120, 140, 80);
      ctx.fillStyle = '#111111';
      for (let bx = w - 165; bx < w - 55; bx += 5 + (Math.random() > 0.5 ? 4 : 1)) {
        ctx.fillRect(bx, h - 110, 2 + (Math.random() > 0.6 ? 3 : 0), 45);
      }
      ctx.font = '10px monospace';
      ctx.fillText('*CS-984210*', w - 150, h - 50);
    });
  }

  /**
   * Bomb Site "A" Floor Target Decal
   */
  public static getBombSiteATexture(): THREE.CanvasTexture {
    return this.createCachedTexture('bomb_site_a', 512, 512, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);

      // Outer dashed circle
      ctx.strokeStyle = 'rgba(240, 240, 240, 0.85)';
      ctx.lineWidth = 14;
      ctx.setLineDash([30, 20]);
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 210, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner hazard ring
      ctx.strokeStyle = 'rgba(230, 170, 30, 0.7)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 175, 0, Math.PI * 2);
      ctx.stroke();

      // Big Bold "A"
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '900 210px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('A', w / 2, h / 2 - 10);

      // Subtitle
      ctx.font = 'bold 26px monospace';
      ctx.fillStyle = 'rgba(230, 170, 30, 0.9)';
      ctx.fillText('PLANT ZONE A', w / 2, h / 2 + 125);
    });
  }

  /**
   * Bomb Site "B" Floor Target Decal
   */
  public static getBombSiteBTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('bomb_site_b', 512, 512, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);

      // Outer dashed circle
      ctx.strokeStyle = 'rgba(240, 240, 240, 0.85)';
      ctx.lineWidth = 14;
      ctx.setLineDash([30, 20]);
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 210, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner hazard ring
      ctx.strokeStyle = 'rgba(230, 170, 30, 0.7)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 175, 0, Math.PI * 2);
      ctx.stroke();

      // Big Bold "B"
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '900 210px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('B', w / 2, h / 2 - 10);

      // Subtitle
      ctx.font = 'bold 26px monospace';
      ctx.fillStyle = 'rgba(230, 170, 30, 0.9)';
      ctx.fillText('PLANT ZONE B', w / 2, h / 2 + 125);
    });
  }

  /**
   * Police Crest & SWAT Perimeter Banner
   */
  public static getPoliceWallTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('police_wall_banner', 512, 512, (ctx, w, h) => {
      ctx.fillStyle = '#2c333d';
      ctx.fillRect(0, 0, w, h);

      // Blue top and bottom bands
      ctx.fillStyle = '#10284e';
      ctx.fillRect(0, 0, w, 60);
      ctx.fillRect(0, h - 60, w, 60);

      // Police Star / Shield Crest
      const cx = w / 2;
      const cy = h * 0.42;

      ctx.fillStyle = '#e2aa24';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 70);
      ctx.lineTo(cx + 60, cy - 30);
      ctx.lineTo(cx + 50, cy + 50);
      ctx.lineTo(cx, cy + 85);
      ctx.lineTo(cx - 50, cy + 50);
      ctx.lineTo(cx - 60, cy - 30);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Inner star
      ctx.fillStyle = '#10284e';
      ctx.font = 'bold 36px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', cx, cy - 10);
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('POLICE', cx, cy + 30);

      // Main Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('SPECIAL WEAPONS AND TACTICS', cx, h * 0.72);
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#e53935';
      ctx.fillText('RESTRICTED SECURITY ZONE - CT UNIT', cx, h * 0.80);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#9e9e9e';
      ctx.fillText('AUTHORISED PERSONNEL ONLY', cx, h * 0.86);
    });
  }

  /**
   * Tactical Graffiti & Spray Paint Decal
   */
  public static getGraffitiTexture(text: string = 'RUSH B'): THREE.CanvasTexture {
    return this.createCachedTexture(`graffiti_${text}`, 512, 256, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);

      // Spray paint drip effect
      ctx.fillStyle = '#e63946';
      ctx.font = '900 64px "Impact", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Drop shadow spray
      ctx.shadowColor = '#800f2f';
      ctx.shadowBlur = 12;
      ctx.fillText(text, w / 2, h / 2);

      // Drips
      for (let i = 0; i < 6; i++) {
        const dx = w * 0.3 + Math.random() * (w * 0.4);
        const dy = h / 2 + 25;
        const len = 15 + Math.random() * 40;
        ctx.fillStyle = '#e63946';
        ctx.fillRect(dx, dy, 4, len);
        ctx.beginPath();
        ctx.arc(dx + 2, dy + len, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  /**
   * Bullet Holes Texture on metal/concrete
   */
  public static getBulletHolesTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('bullet_holes', 256, 256, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);

      // Cluster of bullet impacts
      const count = 12;
      for (let i = 0; i < count; i++) {
        const bx = 40 + Math.random() * (w - 80);
        const by = 40 + Math.random() * (h - 80);

        // Chipped crater
        ctx.fillStyle = 'rgba(20, 20, 20, 0.85)';
        ctx.beginPath();
        ctx.arc(bx, by, 7 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();

        // Inner dark hole
        ctx.fillStyle = '#050505';
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Plaster chips
        ctx.strokeStyle = 'rgba(220, 220, 220, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bx + 1, by + 1, 9, 0, Math.PI);
        ctx.stroke();
      }
    });
  }

  /**
   * Rusted Corrugated Shutter Metal Texture
   */
  public static getRustedShutterTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('rusted_shutter', 512, 512, (ctx, w, h) => {
      ctx.fillStyle = '#5a626a';
      ctx.fillRect(0, 0, w, h);

      // Horizontal slats
      const slatHeight = 16;
      for (let y = 0; y < h; y += slatHeight) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, y, w, slatHeight * 0.4);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, y + slatHeight * 0.4, w, slatHeight * 0.6);
      }

      // Rust patches
      for (let i = 0; i < 35; i++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        const rw = 15 + Math.random() * 45;
        const rh = 8 + Math.random() * 25;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(115, 52, 22, 0.65)' : 'rgba(85, 38, 14, 0.8)';
        ctx.fillRect(rx, ry, rw, rh);
      }
    });
  }

  /**
   * Iron Drainage Grate Texture
   */
  public static getDrainGrateTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('drain_grate', 256, 256, (ctx, w, h) => {
      ctx.fillStyle = '#14181c';
      ctx.fillRect(0, 0, w, h);

      // Iron grid bars
      ctx.strokeStyle = '#4a525a';
      ctx.lineWidth = 6;
      for (let x = 0; x <= w; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.lineWidth = 8;
      for (let y = 0; y <= h; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Rust spots
      ctx.fillStyle = 'rgba(130, 60, 25, 0.45)';
      for (let i = 0; i < 15; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 12, 12);
      }
    });
  }

  /**
   * Glass rain streak and condensation texture
   */
  public static getGlassRainTexture(): THREE.CanvasTexture {
    return this.createCachedTexture('glass_rain', 256, 256, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, w, h);

      // Vertical rain streaks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const len = 15 + Math.random() * 35;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 2, y + len);
        ctx.stroke();
      }
    });
  }
}
