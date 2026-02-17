import * as React from "react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  "waffle",
  "yogurt",
  "sandwich",
  "bagel",
  "noodles",
  "muffin",
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function SpinWheelPage() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const size = 360; // wheel diameter in px
  const radius = size / 2;

  const [isSpinning, setIsSpinning] = React.useState(false);
  const [picked, setPicked] = React.useState<string | null>(null);

  // We keep rotation in degrees (0 at top, clockwise positive)
  const rotationRef = React.useRef(0); // current rotation degrees
  const animRef = React.useRef<number | null>(null);

  // draw wheel at current rotation
  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // handle retina
    const dpr = window.devicePixelRatio || 1;
    const displaySize = size;
    canvas.width = Math.floor(displaySize * dpr);
    canvas.height = Math.floor(displaySize * dpr);
    canvas.style.width = `${displaySize}px`;
    canvas.style.height = `${displaySize}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, displaySize, displaySize);

    const cx = radius;
    const cy = radius;

    // background circle shadow
    ctx.save();
    ctx.translate(cx, cy);

    // subtle shadow
    ctx.beginPath();
    ctx.arc(0, 0, radius - 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fill();
    ctx.restore();

    // wheel
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rotationRef.current * Math.PI) / 180);

    const n = OPTIONS.length;
    const arc = (2 * Math.PI) / n;

    for (let i = 0; i < n; i++) {
      const start = -Math.PI / 2 + i * arc; // start at top
      const end = start + arc;

      // alternating slice color (neutral)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius - 10, start, end);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.02)";
      ctx.fill();

      // slice border
      ctx.strokeStyle = "rgba(0,0,0,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // text
      const label = OPTIONS[i];
      const mid = (start + end) / 2;

      ctx.save();
      ctx.rotate(mid);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(0,0,0,0.80)";
      ctx.font =
        "600 16px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
      // place text near edge
      ctx.translate(radius - 22, 6);
      ctx.rotate(Math.PI / 2); // make it readable
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }

    // center hub
    ctx.beginPath();
    ctx.arc(0, 0, 46, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // small center dot
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fill();

    ctx.restore();
  }, [radius, size]);

  React.useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const computePicked = React.useCallback(() => {
    // Pointer is fixed at top (-90deg). Our slices start at top.
    // We need the angle where the pointer hits the wheel after rotation.
    const n = OPTIONS.length;
    const arcDeg = 360 / n;

    // rotationRef is clockwise degrees applied to wheel.
    // If wheel rotates clockwise, the slice under the top pointer moves from earlier indices to later.
    // Effective angle at pointer in wheel's local coordinates is (360 - (rotation % 360)).
    const rot = ((rotationRef.current % 360) + 360) % 360;
    const local = (360 - rot) % 360;

    // local=0 means slice 0 is under pointer.
    const idx = Math.floor(local / arcDeg);
    const safeIdx = clamp(idx, 0, n - 1);

    return { idx: safeIdx, value: OPTIONS[safeIdx] };
  }, []);

  const spin = React.useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setPicked(null);

    // physics-ish: pick a target rotation with multiple full turns + random offset
    const n = OPTIONS.length;
    const arcDeg = 360 / n;

    // choose winning index randomly
    const winIdx = Math.floor(Math.random() * n);

    // We want local angle at pointer to fall within [winIdx*arc, (winIdx+1)*arc)
    // local = (360 - rot) % 360
    // so choose local somewhere in that slice, then derive rot.
    const pad = arcDeg * 0.12; // avoid borders
    const localTarget =
      winIdx * arcDeg + pad + Math.random() * (arcDeg - 2 * pad);

    // rotTarget = 360 - localTarget (mod 360)
    const rotWithin360 = (360 - localTarget) % 360;

    const fullTurns = 5 + Math.floor(Math.random() * 4); // 5-8 turns
    const start = rotationRef.current;
    const target = start + fullTurns * 360 + rotWithin360;

    const durationMs = 2800; // nice duration
    const t0 = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = clamp((now - t0) / durationMs, 0, 1);
      const e = easeOutCubic(t);
      rotationRef.current = start + (target - start) * e;
      draw();

      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = null;
        const result = computePicked();
        setPicked(result.value);
        setIsSpinning(false);
      }
    };

    animRef.current = requestAnimationFrame(step);
  }, [computePicked, draw, isSpinning]);

  React.useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Food Spin Wheel</h2>
        <p className="text-muted-foreground">
          Click Spin and let the wheel decide.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 items-start">
        {/* Wheel */}
        <div className="relative w-[360px] h-[360px] mx-auto md:mx-0">
          {/* Pointer */}
          <div className="absolute left-1/2 top-[-6px] -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-foreground/80" />
          </div>

          <canvas
            ref={canvasRef}
            className="rounded-full border bg-background shadow-sm"
            aria-label="Food wheel"
          />

          {/* Center Spin button overlay */}
          <button
            onClick={spin}
            disabled={isSpinning}
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "rounded-full border bg-background px-5 py-3 text-sm font-medium shadow-sm",
              "hover:bg-muted/50 disabled:opacity-60 disabled:cursor-not-allowed",
            )}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
        </div>

        {/* Result / Legend */}
        <div className="rounded-lg border p-6">
          <div className="text-sm text-muted-foreground">Options</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {OPTIONS.map((o) => (
              <span
                key={o}
                className="rounded-full border px-3 py-1 text-sm bg-muted/30"
              >
                {o}
              </span>
            ))}
          </div>

          <div className="mt-6">
            {picked ? (
              <div className="text-lg">
                You got: <span className="font-semibold">{picked}</span>
              </div>
            ) : (
              <div className="text-muted-foreground">
                {isSpinning ? "Good luck 🍀" : "Click Spin to start."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
