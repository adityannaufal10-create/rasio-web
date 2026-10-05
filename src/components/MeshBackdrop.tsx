import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;
uniform vec4 u_shape;
uniform vec4 u_surface;
uniform vec4 u_finish;
uniform vec4 u_transform;
uniform vec4 u_space;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_seed u_transform.x
#define u_drift u_transform.z

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 shade(vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.25;
  float total = 0.25;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 c = vec2(
      sin(t * (0.18 + fi * 0.06) + fi * 2.4 + u_seed),
      cos(t * (0.14 + fi * 0.08) + fi * 1.7)) * (0.4 + u_intensity * 0.3);
    float w = exp(-dot(p - c, p - c) * 5.0);
    acc += u_colors[i] * w;
    total += w;
  }
  return acc / total;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  p *= u_scale;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.25), cos(u_time * 0.18));

  p += vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) * 0.35;

  vec3 col = shade(p, u_time);
  col = (col - 0.5) * u_contrast + 0.5;

  float d = length(gl_FragCoord.xy / u_resolution.xy - 0.5);
  col *= 1.0 - smoothstep(0.2, 0.85, d) * 0.45;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 0.7);
}
`;

// GRAIN Color Stops: #070b14 (ground), #064e3b (deep emerald), #059669 (emerald), #06b6d4 (cyan)
const COLORS = new Float32Array([
  0.027, 0.043, 0.078, // #070b14
  0.024, 0.306, 0.231, // #064e3b
  0.020, 0.588, 0.412, // #059669
  0.024, 0.714, 0.831, // #06b6d4
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) ?? "shader compile failed");
  }
  return s;
}

export function MeshBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(prog) ?? "link failed");
      }
    } catch (e) {
      console.warn("[MeshBackdrop]", e);
      return;
    }

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform3fv(u("u_colors"), COLORS);
    gl.uniform4f(u("u_shape"), 1.2, 0.35, 0.0, 0.0);
    gl.uniform4f(u("u_surface"), 1.8, 1.25, 0.0, 0.0);
    gl.uniform4f(u("u_finish"), 0.0, 0.0, 0.0, 0.0);
    gl.uniform4f(u("u_transform"), 42.0, 0.0, 0.15, 0.0);
    gl.uniform4f(u("u_space"), 0.0, 0.0, 0.0, 0.0);
    const uScene = u("u_scene");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const draw = (seconds: number) => {
      resize();
      gl.uniform4f(uScene, canvas.width, canvas.height, seconds * 0.5, 4.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0,
      elapsed = 0,
      last = 0;

    const tick = (now: number) => {
      if (last) elapsed += (now - last) / 1000;
      last = now;
      draw(elapsed);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && !still && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    const onResize = () => {
      if (!raf) draw(elapsed);
    };

    draw(0);
    start();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div aria-hidden="true" className="mesh-backdrop">
      <canvas ref={ref} />
    </div>
  );
}

export default MeshBackdrop;
