(() => {
  const probe = window.__blackholeProbe = {
    errors: [],
    consoleErrors: [],
    contexts: [],
    uniforms: {},
    frames: 0,
    draws: 0,
    lastFrame: 0,
  };
  const originalError = console.error;
  console.error = (...args) => {
    probe.consoleErrors.push(args.map(String).join(" "));
    originalError.apply(console, args);
  };
  window.addEventListener("error", (event) => probe.errors.push(event.message));
  window.addEventListener("unhandledrejection", (event) => probe.errors.push(String(event.reason)));
  const names = new WeakMap();
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (...args) {
    const context = getContext.apply(this, args);
    if (context && /^webgl/.test(args[0]) && !probe.contexts.includes(context)) {
      probe.contexts.push(context);
    }
    return context;
  };
  for (const Type of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    if (!Type) continue;
    const getUniformLocation = Type.prototype.getUniformLocation;
    Type.prototype.getUniformLocation = function (program, name) {
      const location = getUniformLocation.call(this, program, name);
      if (location) names.set(location, name);
      return location;
    };
    for (const method of ["uniform1f", "uniform2f"]) {
      const original = Type.prototype[method];
      Type.prototype[method] = function (location, ...values) {
        const name = names.get(location);
        if (name) probe.uniforms[name] = values.length === 1 ? values[0] : values;
        return original.call(this, location, ...values);
      };
    }
    const drawArrays = Type.prototype.drawArrays;
    Type.prototype.drawArrays = function (...args) {
      drawArrays.apply(this, args);
      probe.draws += 1;
      if (this.getParameter(this.FRAMEBUFFER_BINDING) === null) {
        probe.frames += 1;
        probe.lastFrame = performance.now();
        if (probe.capture) {
          const pixels = new Uint8Array(this.drawingBufferWidth * this.drawingBufferHeight * 4);
          this.readPixels(0, 0, this.drawingBufferWidth, this.drawingBufferHeight, this.RGBA, this.UNSIGNED_BYTE, pixels);
          let hash = 2166136261;
          let lit = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            hash = Math.imul(hash ^ pixels[i], 16777619);
            hash = Math.imul(hash ^ pixels[i + 1], 16777619);
            hash = Math.imul(hash ^ pixels[i + 2], 16777619);
            if (Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) > 32) lit += 1;
          }
          probe.capture = false;
          probe.pixelSample = { hash: hash >>> 0, lit, width: this.drawingBufferWidth, height: this.drawingBufferHeight, time: probe.uniforms.uTime };
        }
      }
    };
  }
  probe.summary = () => {
    const canvas = document.querySelector("canvas");
    const gl = probe.contexts.find((context) => context.canvas === canvas);
    const debug = gl?.getExtension("WEBGL_debug_renderer_info");
    const rect = (element) => {
      const r = element.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    };
    return {
      url: location.href,
      browser: navigator.userAgent,
      dpr: devicePixelRatio,
      viewport: [innerWidth, innerHeight],
      visualViewport: [visualViewport.width, visualViewport.height],
      narrow: matchMedia("(max-width: 767px)").matches,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : null,
      webglVersion: gl?.getParameter(gl.VERSION),
      glError: gl?.getError(),
      contextLost: gl?.isContextLost(),
      hostState: canvas?.parentElement.dataset.webgl ?? "ready",
      canvas: canvas ? { backing: [canvas.width, canvas.height], rect: rect(canvas), display: getComputedStyle(canvas).display } : null,
      heading: document.querySelector("h1") ? { text: document.querySelector("h1").innerText, rect: rect(document.querySelector("h1")), font: getComputedStyle(document.querySelector("h1")).fontSize } : null,
      links: [...document.querySelectorAll("a")].map((link) => ({ text: link.innerText, rect: rect(link) })),
      overflow: document.documentElement.scrollWidth > innerWidth,
      uniforms: { ...probe.uniforms },
      frames: probe.frames,
      draws: probe.draws,
      pixelSample: probe.pixelSample,
      errors: [...probe.errors],
      consoleErrors: [...probe.consoleErrors],
      resources: performance.getEntriesByType("resource").map((resource) => ({ url: resource.name, status: resource.responseStatus })),
    };
  };
})();
