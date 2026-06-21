// Shared micro-components
const { useEffect, useRef, useState } = React;

function Eyebrow({ children, className = "" }) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

function Reveal({ children, as: As = "div", delay = 0, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <As ref={ref} className={`reveal ${rest.className || ""}`} {...rest}>
      {children}
    </As>
  );
}

function SectionHead({ no, title, note }) {
  return (
    <Reveal as="div" className="sec-head">
      <div className="sec-head__no">{no}</div>
      <div>
        <h2 className="sec-head__title">{title}</h2>
        {note && <div style={{
          marginTop: 16, fontSize: 18, fontStyle: "italic",
          color: "var(--ink-soft)", maxWidth: 600
        }}>{note}</div>}
      </div>
    </Reveal>
  );
}

// Labeled placeholder frame (or real image)
function Frame({ className = "", label, src, alt }) {
  return (
    <div className={`gframe ${src ? "gframe--real" : ""} ${className}`}>
      {src && <img src={src} alt={alt || ""} />}
      {label && <div className="gframe__label">{label}</div>}
    </div>
  );
}

// Large single-image carousel with left/right arrows
function Gallery({ items = [] }) {
  const [idx, setIdx] = React.useState(0);
  const n = items.length;
  const go = (d) => setIdx((i) => (i + d + n) % n);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  if (!n) return null;
  const cur = items[idx];
  const pad = (x) => String(x).padStart(2, "0");

  return (
    <div className="gcar">
      <div className="gcar__stage">
        <button
          className="gcar__arrow gcar__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M15 4 L7 12 L15 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="gcar__frame">
          {items.map((it, i) => (
            <img
              key={it.src}
              src={it.src}
              alt={it.alt || ""}
              className={i === idx ? "is-active" : ""}
            />
          ))}
          <div className="gcar__caption">
            <span className="gcar__count">{pad(idx + 1)} / {pad(n)}</span>
            <span className="gcar__label">{cur.label}</span>
          </div>
        </div>

        <button
          className="gcar__arrow gcar__arrow--next"
          onClick={() => go(1)}
          aria-label="Next photo"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M9 4 L17 12 L9 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="gcar__dots">
        {items.map((it, i) => (
          <button
            key={it.src}
            className={`gcar__dot ${i === idx ? "is-active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === idx ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Eyebrow, Reveal, SectionHead, Frame, Gallery });
