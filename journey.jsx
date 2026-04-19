// Animated journey: Moyogalpa ferry across Lake Cocibolca to Ometepe's two volcanoes
const { useEffect: jUseEffect, useRef: jUseRef, useState: jUseState } = React;

function JourneyMap() {
  const [t, setT] = jUseState(0); // 0..1 boat progress
  const rafRef = jUseRef(null);
  const startRef = jUseRef(null);
  const containerRef = jUseRef(null);
  const [active, setActive] = jUseState(false);

  // Play animation when in view; loop gently
  jUseEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  jUseEffect(() => {
    if (!active) return;
    const DUR = 14000; // ms per loop
    const step = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = (ts - startRef.current) % DUR;
      setT(elapsed / DUR);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  // Path from San Jorge (mainland) to Moyogalpa (island)
  // SVG viewBox 1600x900
  const path = [
    { x: 120, y: 620 },   // San Jorge port
    { x: 400, y: 600 },
    { x: 720, y: 580 },
    { x: 1020, y: 540 },
    { x: 1180, y: 500 },  // La Paloma / Moyogalpa arrival
  ];

  // Catmull-like eased interpolation
  const lerp = (a, b, u) => a + (b - a) * u;
  const getPoint = (u) => {
    const seg = (path.length - 1) * u;
    const i = Math.min(Math.floor(seg), path.length - 2);
    const f = seg - i;
    return {
      x: lerp(path[i].x, path[i + 1].x, f),
      y: lerp(path[i].y, path[i + 1].y, f) - Math.sin(u * Math.PI) * 8, // gentle arc
    };
  };
  const boat = getPoint(t);
  const wake = Array.from({ length: 12 }, (_, i) => getPoint(Math.max(0, t - i * 0.012)));

  return (
    <div ref={containerRef} className="journey__map">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9dcc1" />
            <stop offset="60%" stopColor="#d6c8a9" />
            <stop offset="100%" stopColor="#c2b593" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8c8c9" />
            <stop offset="50%" stopColor="#9fb3b6" />
            <stop offset="100%" stopColor="#849aa0" />
          </linearGradient>
          <linearGradient id="volcanoFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a6a55" />
            <stop offset="100%" stopColor="#3e4d3f" />
          </linearGradient>
          <linearGradient id="volcanoNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4a3a" />
            <stop offset="100%" stopColor="#1f2a1f" />
          </linearGradient>
          <linearGradient id="shore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a8a6e" />
            <stop offset="100%" stopColor="#5a6a4e" />
          </linearGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1600" height="480" fill="url(#sky)" />

        {/* Distant clouds */}
        <g opacity="0.5" fill="#f3ecdd">
          <ellipse cx="300" cy="160" rx="140" ry="14" />
          <ellipse cx="900" cy="120" rx="220" ry="16" />
          <ellipse cx="1400" cy="180" rx="160" ry="12" />
        </g>

        {/* Concepción (large active volcano - left/center, taller) */}
        <g>
          <path d="M 560,480 L 900,90 L 1240,480 Z" fill="url(#volcanoNear)" />
          {/* crater mist */}
          <ellipse cx="900" cy="95" rx="60" ry="8" fill="#f3ecdd" opacity="0.35" />
          {/* ridge highlight */}
          <path d="M 900,90 L 1130,460" stroke="#6a7a5a" strokeWidth="2" opacity="0.4" fill="none" />
        </g>

        {/* Maderas (smaller, behind-right) */}
        <g>
          <path d="M 1180,490 L 1400,240 L 1620,490 Z" fill="url(#volcanoFar)" opacity="0.95" />
          <path d="M 1400,240 L 1540,470" stroke="#4a5a48" strokeWidth="2" opacity="0.3" fill="none" />
        </g>

        {/* Island shoreline under volcanoes */}
        <path d="M 520,500 C 700,490 1050,505 1240,495 L 1620,490 L 1620,540 L 520,540 Z" fill="url(#shore)" />

        {/* Water */}
        <rect y="480" width="1600" height="420" fill="url(#water)" />

        {/* Water ripples (subtle, animated via CSS) */}
        <g opacity="0.4">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={0} x2={1600}
              y1={560 + i * 36} y2={560 + i * 36}
              stroke="#f3ecdd"
              strokeWidth="0.6"
              strokeDasharray="2 28"
              strokeDashoffset={((t * 120 * (i % 2 === 0 ? 1 : -1)) % 30).toFixed(2)}
              opacity={0.3 - i * 0.025}
            />
          ))}
        </g>

        {/* Mainland (San Jorge) */}
        <g>
          <path d="M -50,600 C 40,595 110,610 160,620 C 120,640 60,650 -50,640 Z" fill="url(#shore)" />
          {/* San Jorge pier */}
          <rect x="110" y="618" width="40" height="2" fill="#3a4a3a" />
          <rect x="140" y="614" width="3" height="10" fill="#3a4a3a" />
        </g>

        {/* Route dashed line */}
        <path
          d={`M ${path.map((p) => `${p.x},${p.y}`).join(" L ")}`}
          stroke="#f3ecdd"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          fill="none"
          opacity="0.55"
        />

        {/* Wake */}
        {wake.map((w, i) => (
          <circle
            key={i}
            cx={w.x}
            cy={w.y + 4}
            r={6 - i * 0.35}
            fill="#f3ecdd"
            opacity={(1 - i / 12) * 0.35}
          />
        ))}

        {/* Boat */}
        <g transform={`translate(${boat.x} ${boat.y})`}>
          {/* hull */}
          <path d="M -22,0 L 22,0 L 18,8 L -18,8 Z" fill="#1f2a22" />
          {/* cabin */}
          <rect x="-12" y="-10" width="22" height="10" fill="#f3ecdd" />
          <rect x="10" y="-8" width="8" height="8" fill="#b85c38" />
          {/* mast/flag */}
          <line x1="-6" y1="-10" x2="-6" y2="-22" stroke="#1f2a22" strokeWidth="1" />
          <path d={`M -6,-22 L ${-6 + Math.sin(t * 40) * 4 + 8},-19 L -6,-16 Z`} fill="#b85c38" />
        </g>

        {/* Labels */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#1f2a22" opacity="0.75">
          <text x="30" y="585" letterSpacing="2">SAN JORGE · MAINLAND</text>
          <text x="1140" y="470" letterSpacing="2" textAnchor="end">MOYOGALPA · LA PALOMA</text>
          <text x="900" y="78" textAnchor="middle" letterSpacing="2" fill="#f3ecdd" opacity="0.9">CONCEPCIÓN · 1,610 m</text>
          <text x="1400" y="230" textAnchor="middle" letterSpacing="2" fill="#f3ecdd" opacity="0.85">MADERAS · 1,394 m</text>
        </g>

        {/* Compass */}
        <g transform="translate(1500 780)" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#1f2a22" opacity="0.6">
          <circle r="28" fill="none" stroke="#1f2a22" strokeWidth="0.6" />
          <line x1="0" y1="-28" x2="0" y2="28" stroke="#1f2a22" strokeWidth="0.6" />
          <line x1="-28" y1="0" x2="28" y2="0" stroke="#1f2a22" strokeWidth="0.6" />
          <text x="0" y="-34" textAnchor="middle">N</text>
        </g>
      </svg>
    </div>
  );
}

window.JourneyMap = JourneyMap;
