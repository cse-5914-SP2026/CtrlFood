import * as React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_OPTIONS = [
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

const SLICE_COLORS = [
  "#FDE68A", // amber-200
  "#BFDBFE", // blue-200
  "#BBF7D0", // green-200
  "#FBCFE8", // pink-200
  "#DDD6FE", // purple-200
  "#FED7AA", // orange-200
  "#A7F3D0", // teal-200
  "#C7D2FE", // indigo-200
];

function pickSliceColor(i: number) {
  return SLICE_COLORS[i % SLICE_COLORS.length];
}

function truncateLabel(s: string, max = 16) {
  const t = s.trim();
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

export default function SpinWheelPage() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const size = 360; // wheel diameter in px
  const radius = size / 2;

  const [isSpinning, setIsSpinning] = React.useState(false);
  const [picked, setPicked] = React.useState<string | null>(null);

  // Dynamic options (start from defaults)
  const [options, setOptions] = React.useState<string[]>(() => [
    ...DEFAULT_OPTIONS,
  ]);
  const [newOption, setNewOption] = React.useState("");

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

    // soft background shadow
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.arc(0, 0, radius - 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fill();
    ctx.restore();

    if (options.length === 0) {
      // draw placeholder wheel
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.arc(0, 0, radius - 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.02)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.font =
        "600 14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Add some options →", 0, 0);
      ctx.restore();
      return;
    }

    // wheel
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rotationRef.current * Math.PI) / 180);

    const n = options.length;
    const arc = (2 * Math.PI) / n;

    const wheelR = radius - 10;
    const labelR = wheelR * 0.72; // labels closer to center

    for (let i = 0; i < n; i++) {
      const start = -Math.PI / 2 + i * arc; // start at top
      const end = start + arc;

      // slice fill
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, wheelR, start, end);
      ctx.closePath();
      ctx.fillStyle = pickSliceColor(i);
      ctx.fill();

      // slice border
      ctx.strokeStyle = "rgba(0,0,0,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // label
      const label = truncateLabel(options[i], 16);
      const mid = (start + end) / 2;

      ctx.save();
      ctx.rotate(mid);

      ctx.fillStyle = "rgba(17, 24, 39, 0.92)";
      ctx.font =
        "800 14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.translate(labelR, 0);

      // keep text readable (flip on left side)
      const angleDeg = (mid * 180) / Math.PI;
      if (angleDeg > 90 && angleDeg < 270) {
        ctx.rotate(Math.PI);
      }

      // subtle glow to improve readability
      ctx.shadowColor = "rgba(255,255,255,0.65)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillText(label, 0, 0);
      ctx.restore();
    }

    // outer ring
    ctx.beginPath();
    ctx.arc(0, 0, wheelR, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.10)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // inner ring
    ctx.beginPath();
    ctx.arc(0, 0, wheelR * 0.22, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // center hub
    ctx.beginPath();
    ctx.arc(0, 0, 46, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.10)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // small center dot
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fill();

    ctx.restore(); // wheel rotate
    ctx.restore(); // wheel block
  }, [radius, size, options]);

  React.useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const computePicked = React.useCallback(() => {
    if (options.length === 0) return null;

    const n = options.length;
    const arcDeg = 360 / n;

    const rot = ((rotationRef.current % 360) + 360) % 360;
    const local = (360 - rot) % 360;

    const idx = Math.floor(local / arcDeg);
    const safeIdx = clamp(idx, 0, n - 1);

    return { idx: safeIdx, value: options[safeIdx] };
  }, [options]);

  const spin = React.useCallback(() => {
    if (isSpinning || options.length === 0) return;

    setIsSpinning(true);
    setPicked(null);

    const n = options.length;
    const arcDeg = 360 / n;

    const winIdx = Math.floor(Math.random() * n);

    const pad = arcDeg * 0.12;
    const localTarget =
      winIdx * arcDeg + pad + Math.random() * (arcDeg - 2 * pad);

    const rotWithin360 = (360 - localTarget) % 360;

    const fullTurns = 5 + Math.floor(Math.random() * 4); // 5-8 turns
    const start = rotationRef.current;
    const target = start + fullTurns * 360 + rotWithin360;

    const durationMs = 2800;
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
        if (result) setPicked(result.value);
        setIsSpinning(false);
      }
    };

    animRef.current = requestAnimationFrame(step);
  }, [computePicked, draw, isSpinning, options.length]);

  React.useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // --- UI helpers for options ---
  const handleAddOption = () => {
    const value = newOption.trim();
    if (!value) return;

    // normalize: keep user input but avoid duplicates ignoring case
    const lower = value.toLowerCase();
    const exists = options.some((o) => o.toLowerCase() === lower);
    if (exists) {
      setNewOption("");
      return;
    }

    setOptions((prev) => [...prev, value]);
    setNewOption("");
  };

  const handleRemoveOption = (value: string) => {
    setOptions((prev) => prev.filter((o) => o !== value));
    setPicked((prev) => (prev === value ? null : prev));
  };

  const handleResetDefaults = () => {
    setOptions([...DEFAULT_OPTIONS]);
    setPicked(null);
    rotationRef.current = 0;
    draw();
  };

  const handleClearAll = () => {
    setOptions([]);
    setPicked(null);
    rotationRef.current = 0;
    draw();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Food Spin Wheel</h2>
        <p className="text-muted-foreground">
          Add your options, then click Spin and let the wheel decide.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 items-start">
        {/* Wheel */}
        <div className="relative w-[360px] h-[360px] mx-auto md:mx-0">
          {/* Pointer */}
          <div className="absolute left-1/2 top-[-8px] -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-foreground/90 drop-shadow-sm" />
          </div>

          <canvas
            ref={canvasRef}
            className="rounded-full border bg-background shadow-sm"
            aria-label="Food wheel"
          />

          {/* Center Spin button overlay */}
          <button
            onClick={spin}
            disabled={isSpinning || options.length === 0}
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "rounded-full border bg-background px-6 py-3 text-sm font-semibold shadow-sm",
              "hover:bg-muted/50 disabled:opacity-60 disabled:cursor-not-allowed",
            )}
          >
            {options.length === 0
              ? "Add options"
              : isSpinning
                ? "Spinning..."
                : "Spin"}
          </button>
        </div>

        {/* Controls / Result */}
        <div className="rounded-lg border p-6 space-y-6">
          {/* Add option */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium">Options</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="rounded-md border px-3 py-1.5 text-xs font-medium bg-background hover:bg-muted/60"
                >
                  Reset defaults
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="rounded-md border px-3 py-1.5 text-xs font-medium bg-background hover:bg-muted/60"
                >
                  Clear all
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a food (e.g., sushi)"
                className="flex-1 rounded-md border px-3 py-2 text-sm bg-background"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm font-semibold",
                  "bg-background hover:bg-muted/60",
                )}
              >
                Add
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Tip: the wheel updates automatically based on how many options you
              have.
            </p>
          </div>

          {/* Current options list */}
          <div className="flex flex-wrap gap-2">
            {options.length === 0 ? (
              <span className="text-sm text-muted-foreground">
                No options yet. Add some above.
              </span>
            ) : (
              options.map((o) => (
                <span
                  key={o}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm bg-muted/30"
                  title="Click ✕ to remove"
                >
                  {o}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(o)}
                    className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${o}`}
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Result */}
          <div>
            {picked ? (
              <div className="text-lg">
                You got: <span className="font-semibold">{picked}</span>
              </div>
            ) : (
              <div className="text-muted-foreground">
                {isSpinning
                  ? "Good luck 🍀"
                  : options.length === 0
                    ? "Add at least one option to spin."
                    : "Click Spin to start."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
