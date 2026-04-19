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

Object.assign(window, { Eyebrow, Reveal, SectionHead, Frame });
