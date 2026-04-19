// Tiny location map — island silhouette with pin
function LocationMap() {
  return (
    <div className="locmap">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="lake2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b9cfc5" />
            <stop offset="100%" stopColor="#8fa99f" />
          </linearGradient>
          <radialGradient id="island" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#5a6a4e" />
            <stop offset="100%" stopColor="#2c3b2d" />
          </radialGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#lake2)" />

        {/* subtle lake lines */}
        <g stroke="#f3ecdd" strokeWidth="0.6" opacity="0.35">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={0} x2={1600} y1={i * 36} y2={i * 36} strokeDasharray="3 24" />
          ))}
        </g>

        {/* Ometepe figure-8 silhouette */}
        <g transform="translate(800 500)">
          <path
            d="M -420,-20
               C -420,-180 -280,-230 -140,-210
               C -50,-200 20,-150 40,-80
               C 80,-120 200,-150 280,-90
               C 380,-10 380,120 300,200
               C 220,280 80,260 20,180
               C 0,130 -20,110 -60,120
               C -200,150 -380,100 -420,-20 Z"
            fill="url(#island)"
          />
          {/* concepción */}
          <circle cx="-260" cy="-60" r="18" fill="#1c2a1e" opacity="0.6" />
          <text x="-260" y="-90" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#f3ecdd" letterSpacing="2">CONCEPCIÓN</text>
          {/* maderas */}
          <circle cx="200" cy="80" r="14" fill="#1c2a1e" opacity="0.6" />
          <text x="200" y="60" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#f3ecdd" letterSpacing="2">MADERAS</text>

          {/* La Paloma pin */}
          <g transform="translate(-370 -90)">
            <circle r="24" fill="#b85c38" opacity="0.18" />
            <circle r="10" fill="#b85c38" />
            <circle r="3" fill="#f3ecdd" />
            <line x1="0" y1="-10" x2="0" y2="-60" stroke="#1f2a22" strokeWidth="1" />
            <text x="0" y="-70" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="28" fill="#1f2a22">La Paloma</text>
            <text x="0" y="-50" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#1f2a22" opacity="0.7">11.5373° N, 85.7100° W</text>
          </g>

          {/* Moyogalpa label */}
          <text x="-330" y="-130" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#1f2a22" opacity="0.55">MOYOGALPA</text>
        </g>

        {/* scale */}
        <g transform="translate(80 900)" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#1f2a22" opacity="0.65">
          <line x1="0" y1="0" x2="140" y2="0" stroke="#1f2a22" strokeWidth="1" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#1f2a22" strokeWidth="1" />
          <line x1="140" y1="-5" x2="140" y2="5" stroke="#1f2a22" strokeWidth="1" />
          <text x="70" y="22" textAnchor="middle" letterSpacing="2">5 KM</text>
        </g>

        {/* title */}
        <text x="80" y="80" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="300" fontSize="48" fill="#1f2a22">Isla de Ometepe</text>
        <text x="80" y="108" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="3" fill="#1f2a22" opacity="0.7">LAGO COCIBOLCA · NICARAGUA</text>
      </svg>
    </div>
  );
}

window.LocationMap = LocationMap;
