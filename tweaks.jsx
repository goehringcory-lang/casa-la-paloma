// Tweaks panel
function TweaksPanel({ open, state, setState }) {
  if (!open) return null;

  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));

  const palettes = [
    { id: "tropical", label: "Tropical" },
    { id: "earthen", label: "Earthen" },
    { id: "dusk", label: "Dusk" },
  ];
  const accents = [
    { id: "terracotta", label: "Terracotta" },
    { id: "hibiscus", label: "Hibiscus" },
    { id: "lake", label: "Lake Blue" },
    { id: "sunflower", label: "Sunflower" },
  ];
  const tones = [
    { id: "letter", label: "Letter" },
    { id: "poetic", label: "Poetic" },
    { id: "spare", label: "Spare" },
  ];

  return (
    <div className="tweaks-panel">
      <div className="tweaks-panel__title">Tweaks</div>

      <div className="tweaks-panel__row">
        <div className="tweaks-panel__label">Palette</div>
        <div className="tweaks-panel__opts">
          {palettes.map((p) => (
            <button
              key={p.id}
              className={`tweaks-panel__opt ${state.palette === p.id ? "active" : ""}`}
              onClick={() => set("palette", p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-panel__row">
        <div className="tweaks-panel__label">Accent</div>
        <div className="tweaks-panel__opts">
          {accents.map((a) => (
            <button
              key={a.id}
              className={`tweaks-panel__opt ${state.accent === a.id ? "active" : ""}`}
              onClick={() => set("accent", a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-panel__row">
        <div className="tweaks-panel__label">Copy tone</div>
        <div className="tweaks-panel__opts">
          {tones.map((t) => (
            <button
              key={t.id}
              className={`tweaks-panel__opt ${state.tone === t.id ? "active" : ""}`}
              onClick={() => set("tone", t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-panel__row">
        <div className="tweaks-panel__label">Price visibility</div>
        <div className="tweaks-panel__opts">
          <button
            className={`tweaks-panel__opt ${state.showPrice ? "active" : ""}`}
            onClick={() => set("showPrice", true)}
          >
            Visible
          </button>
          <button
            className={`tweaks-panel__opt ${!state.showPrice ? "active" : ""}`}
            onClick={() => set("showPrice", false)}
          >
            Inquire only
          </button>
        </div>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
