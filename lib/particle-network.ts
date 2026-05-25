type Speed = "fast" | "slow" | "medium" | "none";
type Density = "high" | "low" | number;

export type ParticleNetworkOptions = {
  particleColor?: string;
  background?: string;
  interactive?: boolean;
  speed?: Speed;
  density?: Density;
};

type NetworkContext = {
  canvas: HTMLCanvasElement;
  g: CanvasRenderingContext2D;
  options: {
    particleColor: string;
    velocity: number;
    density: number;
    interactive: boolean;
  };
};

const LINK_DISTANCE = 120;
const PARTICLE_RADIUS = 3;
const LINE_WIDTH = 1.4;

class Particle {
  x: number;
  y: number;
  velocity: { x: number; y: number };
  private readonly canvas: HTMLCanvasElement;
  private readonly g: CanvasRenderingContext2D;
  private readonly particleColor: string;

  constructor(ctx: NetworkContext) {
    this.canvas = ctx.canvas;
    this.g = ctx.g;
    this.particleColor = ctx.options.particleColor;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * ctx.options.velocity,
      y: (Math.random() - 0.5) * ctx.options.velocity,
    };
  }

  update() {
    if (this.x > this.canvas.width + 20 || this.x < -20) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y > this.canvas.height + 20 || this.y < -20) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    this.g.beginPath();
    this.g.fillStyle = this.particleColor;
    this.g.globalAlpha = 0.7;
    this.g.arc(this.x, this.y, PARTICLE_RADIUS, 0, 2 * Math.PI);
    this.g.fill();
  }
}

function setVelocity(speed?: Speed): number {
  if (speed === "fast") return 1;
  if (speed === "slow") return 0.33;
  if (speed === "none") return 0;
  return 0.66;
}

function setDensity(density?: Density): number {
  if (density === "high") return 5000;
  if (density === "low") return 20000;
  const n = parseInt(String(density), 10);
  return Number.isNaN(n) ? 10000 : n;
}

function applyStyles(el: HTMLElement, styles: Record<string, string>) {
  for (const key in styles) {
    el.style.setProperty(
      key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
      styles[key],
    );
  }
}

const HEX_COLOR = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

function isImageBackground(value: string): boolean {
  return (
    /\.(gif|jpg|jpeg|tiff|png|webp)(\?|$)/i.test(value) ||
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  );
}

export class ParticleNetwork {
  private container: HTMLElement;
  private size = { width: 0, height: 0 };
  private options: ParticleNetworkOptions & {
    particleColor: string;
    background: string;
    interactive: boolean;
    velocity: number;
    density: number;
  };
  private bgLayer: HTMLDivElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private g: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private cursorParticle: Particle | null = null;
  private pointer = { x: 0, y: 0, active: false };
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;
  private rafId = 0;
  private boundResize: () => void;
  private boundPointerMove: (e: PointerEvent) => void;
  private boundPointerUp: (e: PointerEvent) => void;

  constructor(container: HTMLElement, options: ParticleNetworkOptions = {}) {
    this.container = container;
    this.options = {
      particleColor: options.particleColor ?? "#fff",
      background: options.background ?? "#1a252f",
      interactive: options.interactive !== false,
      velocity: setVelocity(options.speed),
      density: setDensity(options.density),
    };
    this.boundResize = this.onResize.bind(this);
    this.boundPointerMove = this.onPointerMove.bind(this);
    this.boundPointerUp = this.onPointerUp.bind(this);
    this.init();
  }

  private getContext(): NetworkContext | null {
    if (!this.canvas || !this.g) return null;
    return {
      canvas: this.canvas,
      g: this.g,
      options: {
        particleColor: this.options.particleColor,
        velocity: this.options.velocity,
        density: this.options.density,
        interactive: this.options.interactive,
      },
    };
  }

  private canvasCoords(clientX: number, clientY: number) {
    const canvas = this.canvas!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  private init(): boolean {
    this.size = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    };

    if (this.size.width < 1 || this.size.height < 1) {
      return false;
    }

    this.bgLayer = document.createElement("div");
    this.container.appendChild(this.bgLayer);
    applyStyles(this.bgLayer, {
      position: "absolute",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      zIndex: "1",
    });

    if (HEX_COLOR.test(this.options.background)) {
      applyStyles(this.bgLayer, { background: this.options.background });
    } else if (isImageBackground(this.options.background)) {
      applyStyles(this.bgLayer, {
        background: `url("${this.options.background}") no-repeat center`,
        backgroundSize: "cover",
      });
    } else {
      console.error("Please specify a valid background image or hexadecimal color");
      return false;
    }

    if (!HEX_COLOR.test(this.options.particleColor)) {
      console.error("Please specify a valid particleColor hexadecimal color");
      return false;
    }

    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    this.g = this.canvas.getContext("2d");
    if (!this.g) return false;

    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;

    applyStyles(this.canvas, {
      zIndex: "2",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "block",
      pointerEvents: "none",
    });

    window.addEventListener("resize", this.boundResize);
    this.seedParticles();

    if (this.options.interactive) {
      this.pointer.x = this.size.width / 2;
      this.pointer.y = this.size.height / 2;
      this.pointer.active = true;
      document.addEventListener("pointermove", this.boundPointerMove, {
        passive: true,
        capture: true,
      });
      document.addEventListener("pointerup", this.boundPointerUp, {
        passive: true,
        capture: true,
      });
    }

    this.update();
    return true;
  }

  private seedParticles() {
    const ctx = this.getContext();
    if (!ctx || !this.canvas) return;

    this.particles = [];
    const count = Math.floor(
      (this.canvas.width * this.canvas.height) / this.options.density,
    );
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(ctx));
    }

    if (this.options.interactive) {
      this.cursorParticle = new Particle(ctx);
      this.cursorParticle.velocity = { x: 0, y: 0 };
      this.cursorParticle.x = this.pointer.x;
      this.cursorParticle.y = this.pointer.y;
      this.particles.push(this.cursorParticle);
    }
  }

  private syncCursorParticle() {
    if (!this.cursorParticle || !this.pointer.active) return;
    this.cursorParticle.x = this.pointer.x;
    this.cursorParticle.y = this.pointer.y;
    this.cursorParticle.velocity.x = 0;
    this.cursorParticle.velocity.y = 0;
  }

  private onResize() {
    if (
      this.container.offsetWidth === this.size.width &&
      this.container.offsetHeight === this.size.height
    ) {
      return;
    }
    if (!this.canvas) return;

    this.size.width = this.container.offsetWidth;
    this.size.height = this.container.offsetHeight;
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;

    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.seedParticles();
      if (this.options.velocity !== 0) {
        cancelAnimationFrame(this.rafId);
        this.update();
      }
    }, 500);
  }

  private onPointerMove(e: PointerEvent) {
    if (!this.canvas) return;
    const { x, y } = this.canvasCoords(e.clientX, e.clientY);
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = true;
  }

  private onPointerUp(e: PointerEvent) {
    const ctx = this.getContext();
    if (!ctx || !this.options.interactive) return;

    if (this.cursorParticle) {
      this.cursorParticle.velocity = {
        x: (Math.random() - 0.5) * this.options.velocity,
        y: (Math.random() - 0.5) * this.options.velocity,
      };
    }

    this.cursorParticle = new Particle(ctx);
    this.cursorParticle.velocity = { x: 0, y: 0 };
    const { x, y } = this.canvasCoords(e.clientX, e.clientY);
    this.pointer.x = x;
    this.pointer.y = y;
    this.cursorParticle.x = x;
    this.cursorParticle.y = y;
    this.particles.push(this.cursorParticle);
  }

  private update = () => {
    if (!this.g || !this.canvas) return;

    this.syncCursorParticle();

    this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.g.globalAlpha = 1;

    const color = this.options.particleColor;
    const isCursor = (p: Particle) =>
      this.options.interactive && p === this.cursorParticle;

    for (let a = 0; a < this.particles.length; a++) {
      const pa = this.particles[a]!;
      if (!isCursor(pa)) {
        pa.update();
      }
      pa.draw();

      for (let b = this.particles.length - 1; b > a; b--) {
        const pb = this.particles[b]!;
        const dist = Math.hypot(pa.x - pb.x, pa.y - pb.y);
        if (dist > LINK_DISTANCE) continue;

        this.g.beginPath();
        this.g.strokeStyle = color;
        this.g.globalAlpha = (LINK_DISTANCE - dist) / LINK_DISTANCE;
        this.g.lineWidth = LINE_WIDTH;
        this.g.moveTo(pa.x, pa.y);
        this.g.lineTo(pb.x, pb.y);
        this.g.stroke();
      }
    }

    if (this.options.velocity !== 0) {
      this.rafId = requestAnimationFrame(this.update);
    }
  };

  destroy() {
    cancelAnimationFrame(this.rafId);
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.boundResize);
    document.removeEventListener("pointermove", this.boundPointerMove, true);
    document.removeEventListener("pointerup", this.boundPointerUp, true);
    this.bgLayer?.remove();
    this.canvas?.remove();
    this.bgLayer = null;
    this.canvas = null;
    this.g = null;
    this.particles = [];
    this.cursorParticle = null;
  }
}
