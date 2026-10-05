import { useEffect, useMemo, useRef, type CSSProperties } from "react";

/**
 * Flux Vortex — a self-contained Three.js particle-vortex background.
 * Ported from threeui.com (Meng To, MIT) and adapted for the RASIO 10.0
 * visual system (Obsidian canvas, Emerald & Cyan quantum particle vortex).
 * The scene runs inside a sandboxed iframe (Three.js + GSAP loaded from CDN
 * via importmap) and an isolation layer strips demo chrome so only the
 * #webgl-canvas fills the frame.
 */

export type FluxVortexProps = {
  /** Playback speed multiplier (0–3). Default: 0.7 (calm & gentle) */
  speed?: number;
  /** Point size multiplier (0.05–200). */
  size?: number;
  /** Particle-count multiplier (0.25–2.5). */
  density?: number;
  /** Overall opacity (0.05–1). Default: 0.7 */
  opacity?: number;
  /** Hue rotation in degrees (-180–180). */
  hue?: number;
  /** Saturation multiplier (0–2). */
  saturation?: number;
  /** Brightness multiplier (0.35–1.65). */
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

export const FLUX_VORTEX_DEFAULTS = {
  speed: 0.7,
  size: 1,
  density: 1,
  opacity: 0.7,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

const BACKGROUND = "#070b14";
const TARGETS = [{ selector: "#webgl-canvas", role: "background" }] as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function scaleCount(base: number, density: number, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

function patchSource(
  source: string,
  { size, density }: { size: number; density: number },
) {
  return source
    .replace(
      "const vortexCount = 9500;",
      `const vortexCount = ${scaleCount(9500, density, 1200)};`,
    )
    .replace(
      "const particlesCount = 300;",
      `const particlesCount = ${scaleCount(300, density, 40)};`,
    )
    .replace(
      "size: 0.006, // Smaller dots requested",
      `size: ${Number((0.006 * size).toFixed(4))}, // Smaller dots requested`,
    )
    .replace("size: 0.008,", `size: ${Number((0.008 * size).toFixed(4))},`);
}

function buildFocusedDocument(
  source: string,
  knobs: { speed: number; size: number; density: number; opacity: number },
) {
  const targetJson = JSON.stringify(TARGETS).replace(/</g, "\\u003c");
  const controlsJson = JSON.stringify({
    mode: "dark",
    speed: knobs.speed,
    size: knobs.size,
    density: knobs.density,
    opacity: knobs.opacity,
  }).replace(/</g, "\\u003c");
  const patchedSource = patchSource(source, {
    size: knobs.size,
    density: knobs.density,
  });
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${BACKGROUND} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
</style>`;
  const controlScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data) return;
    if (event.data.type === 'threeui-controls') {
      var next = event.data.controls || {};
      Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
      applyVisual();
    } else if (event.data.type === 'threeui-mouse') {
      if (typeof window.__SF_SET_MOUSE === 'function') {
        window.__SF_SET_MOUSE(event.data.clientX, event.data.clientY);
      }
    }
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export function FluxVortex({
  speed = FLUX_VORTEX_DEFAULTS.speed,
  size = FLUX_VORTEX_DEFAULTS.size,
  density = FLUX_VORTEX_DEFAULTS.density,
  opacity = FLUX_VORTEX_DEFAULTS.opacity,
  hue = FLUX_VORTEX_DEFAULTS.hue,
  saturation = FLUX_VORTEX_DEFAULTS.saturation,
  brightness = FLUX_VORTEX_DEFAULTS.brightness,
  className,
  style,
}: FluxVortexProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 200);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  // Rebuild only when baked geometry knobs change. Speed/opacity stay live via postMessage.
  const source = useMemo(
    () =>
      buildFocusedDocument(FLUX_VORTEX_SOURCE, {
        speed: FLUX_VORTEX_DEFAULTS.speed,
        size: safeSize,
        density: safeDensity,
        opacity: FLUX_VORTEX_DEFAULTS.opacity,
      }),
    [safeDensity, safeSize],
  );

  useEffect(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: "dark",
          speed: safeSpeed,
          size: safeSize,
          density: safeDensity,
          opacity: safeOpacity,
        },
      },
      "*",
    );
  }, [safeDensity, safeOpacity, safeSize, safeSpeed, source]);

  // Forward parent cursor movement to iframe for interactive parallax
  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: "threeui-mouse",
            clientX: e.clientX,
            clientY: e.clientY,
          },
          "*",
        );
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title="Flux Vortex"
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: BACKGROUND,
        filter,
        ...style,
      }}
    />
  );
}

export default FluxVortex;

const FLUX_VORTEX_SOURCE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum Flux</title>

    <!-- Tailwind & Iconify -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet">

    <!-- GSAP Core & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

    <!-- Three.js Import Map -->
    <script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
        }
    }
    </script>
</head>
<body class="bg-[#070b14] text-white selection:bg-white selection:text-black font-extralight overflow-x-hidden relative" style="font-family: 'Space Grotesk', sans-serif;">

    <!-- Loading Overlay -->
    <div id="loader" class="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14] transition-opacity duration-1000">
        <div class="flex flex-col items-center gap-4">
            <div class="h-px w-24 bg-neutral-800 overflow-hidden relative">
                <div id="shimmer-bar" class="absolute inset-y-0 left-0 bg-emerald-400 w-full -translate-x-full"></div>
            </div>
            <p class="text-xs uppercase tracking-[0.2em] text-emerald-400/60 font-light">
                GRAIN Quantum Core
            </p>
        </div>
    </div>

    <!-- 3D Canvas Container -->
    <div class="fixed inset-0 z-0">
        <canvas id="webgl-canvas" class="w-full h-full outline-none cursor-auto"></canvas>
    </div>

    <!-- Main Logic & Interactions -->
    <script type="module">
        import * as THREE from 'three';
        import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
        import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
        import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // --- Configuration (RASIO 10.0 Emerald & Cyan Theme) ---
        const config = {
            colors: {
                bg: 0x070b14,
                primary: 0x10b981,     // Emerald 500
                secondary: 0x06b6d4,   // Cyan 500
                ambient: 0x38bdf8      // Sky/Teal ambient dust
            }
        };

        // --- Scene Setup ---
        const canvas = document.querySelector('#webgl-canvas');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(config.colors.bg);
        scene.fog = new THREE.FogExp2(config.colors.bg, 0.035);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: false,
            powerPreference: "high-performance",
            alpha: false
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        // --- Objects Container ---
        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // --- 1. Vortex Particle Field (Smaller Dots) ---
        const vortexCount = 9500;
        const vortexPositions = new Float32Array(vortexCount * 3);
        const vortexRadius = new Float32Array(vortexCount);
        const vortexAngle = new Float32Array(vortexCount);
        const vortexHeight = new Float32Array(vortexCount);
        const vortexSpeed = new Float32Array(vortexCount);

        for (let i = 0; i < vortexCount; i++) {
            const i3 = i * 3;
            const y = (Math.random() - 0.5) * 7.5;
            const funnel = 0.4 + Math.abs(y) * 0.2;
            const r = (0.1 + Math.pow(Math.random(), 1.5) * 2.5) * funnel;
            const a = Math.random() * Math.PI * 2;

            vortexHeight[i] = y;
            vortexRadius[i] = r;
            vortexAngle[i] = a;
            vortexSpeed[i] = 0.5 + Math.random() * 0.8;

            vortexPositions[i3] = Math.cos(a) * r;
            vortexPositions[i3 + 1] = y;
            vortexPositions[i3 + 2] = Math.sin(a) * r;
        }

        const vortexGeometry = new THREE.BufferGeometry();
        vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
        const vortexMaterial = new THREE.PointsMaterial({
            size: 0.006, // Smaller dots requested
            color: config.colors.primary,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const vortexPoints = new THREE.Points(vortexGeometry, vortexMaterial);
        mainGroup.add(vortexPoints);

        // --- 2. Spiral Guides ---
        function createSpiralLine(turnOffset, color) {
            const spiralPoints = [];
            const pointCount = 400;
            for (let i = 0; i < pointCount; i++) {
                const t = i / (pointCount - 1);
                const angle = t * Math.PI * 14 + turnOffset;
                const radius = 0.2 + t * 2.8;
                const y = (0.5 - t) * 6.0;
                spiralPoints.push(new THREE.Vector3(
                    Math.cos(angle) * radius,
                    y,
                    Math.sin(angle) * radius
                ));
            }
            const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);
            const spiralMaterial = new THREE.LineBasicMaterial({
                color,
                transparent: true,
                opacity: 0.18,
                blending: THREE.AdditiveBlending
            });
            return new THREE.Line(spiralGeometry, spiralMaterial);
        }

        const spiralLineA = createSpiralLine(0, config.colors.secondary);
        const spiralLineB = createSpiralLine(Math.PI, config.colors.primary);
        mainGroup.add(spiralLineA);
        mainGroup.add(spiralLineB);

        // --- 3. Ambient Particles ---
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 12;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.008,
            color: config.colors.ambient,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // --- Post Processing (Emerald Glow Bloom) ---
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.4, 0.85);
        bloomPass.strength = 0.75;
        bloomPass.radius = 0.35;
        bloomPass.threshold = 0.18;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- Interactions & Animation State ---
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        window.__SF_SET_MOUSE = function(clientX, clientY) {
            mouseX = clientX - windowHalfX;
            mouseY = clientY - windowHalfY;
        };

        // --- Animation Loop ---
        const clock = new THREE.Clock();

        function animate() {
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.0008;

            mainGroup.rotation.y += 0.002;
            mainGroup.rotation.y += 0.03 * (targetX - mainGroup.rotation.y);
            mainGroup.rotation.x += 0.03 * (targetY - mainGroup.rotation.x);

            const positions = vortexGeometry.attributes.position.array;
            for (let i = 0; i < vortexCount; i++) {
                const i3 = i * 3;
                const spin = elapsedTime * vortexSpeed[i] * 0.5 + vortexHeight[i] * 0.5;
                const angle = vortexAngle[i] + spin;
                const pulse = Math.sin(elapsedTime * 1.2 + i * 0.01) * 0.05;
                const radius = vortexRadius[i] + pulse;

                positions[i3] = Math.cos(angle) * radius;
                positions[i3 + 1] = vortexHeight[i] + Math.sin(elapsedTime + i * 0.02) * 0.03;
                positions[i3 + 2] = Math.sin(angle) * radius;
            }
            vortexGeometry.attributes.position.needsUpdate = true;

            spiralLineA.rotation.y = elapsedTime * 0.15;
            spiralLineB.rotation.y = -elapsedTime * 0.12;

            particlesMesh.rotation.y = elapsedTime * 0.03;
            particlesMesh.rotation.x = -mouseY * 0.0001;

            composer.render();
            requestAnimationFrame(animate);
        }

        // --- Resize ---
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
        });

        // --- Init & Start Loop ---
        animate();

        // Loader Exit
        const loader = document.getElementById("loader");
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => { loader.style.display = "none"; }
            });
        }
        gsap.from(mainGroup.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 2.0, ease: "power3.out" });
    </script>
</body>
</html>`;
