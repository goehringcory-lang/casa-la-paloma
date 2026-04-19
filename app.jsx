// Main App
const { useEffect: aUseEffect, useState: aUseState, useRef: aUseRef } = React;

// Copy variants by tone
const LETTER_COPY = {
  letter: [
    "Fifteen years ago, we set foot on a small island cradled between two volcanoes in the middle of a freshwater sea. We were teachers, newly retired, looking for somewhere quiet enough to hear ourselves think.",
    "We bought half a manzana of land in La Paloma, a fishing hamlet just east of Moyogalpa, and began — slowly, the way islands teach you to do things — to build a home.",
    "The main house is open-air; the breeze from the lake moves through every room. A casita sits tucked into the garden for guests, or a studio, or a quiet room to write. A workshop stands a little apart — the place where most of this home was made, board by board.",
    "We planted everything you see around it. Heliconias, hibiscus, the bromeliads that line the stone path. A Saint Francis watches over the garden. Mornings, you can walk ten minutes down to the black-sand shore and have the lake to yourself.",
    "We are selling because it is time for another chapter. We would like this house to go to someone who will love it the way we have — who will add to it, tend it, leave windows open to the birds.",
  ],
  poetic: [
    "On an island held by two volcanoes, in the middle of a freshwater sea, there is a small house with a terracotta roof and a garden that was planted one plant at a time.",
    "Half a manzana of earth. A main house that is open to the wind. A casita beside it. A workshop where the house was slowly made.",
    "Mornings arrive with birdsong. The lake is a ten-minute walk through sand and soft grass. Evenings, the sky turns the same color as the roof tiles.",
    "We built this home over fifteen years. It asks for nothing more than to be lived in.",
    "If it is calling you, we would love to hear from you.",
  ],
  spare: [
    "One-bedroom, open-air house. Detached casita. Detached workshop. Half a manzana (3,500 m²) of garden.",
    "La Paloma, a small beachside community outside Moyogalpa on the western coast of Ometepe Island.",
    "Built and cared for over fifteen years by a retired couple. Offered for sale at $125,000 USD, negotiable.",
    "Ten minutes from the ferry landing, ten minutes from the lake.",
    "Serious inquiries welcome.",
  ],
};

function App() {
  // ========== Tweaks state ==========
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "tropical",
    "accent": "terracotta",
    "tone": "letter",
    "showPrice": true
  }/*EDITMODE-END*/;
  const [tweaks, setTweaks] = aUseState(DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = aUseState(false);

  // Edit mode protocol
  aUseEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  // Persist tweaks
  aUseEffect(() => {
    window.parent.postMessage(
      { type: "__edit_mode_set_keys", edits: tweaks },
      "*"
    );
  }, [tweaks]);

  // Apply palette/accent to CSS vars
  aUseEffect(() => {
    const root = document.documentElement;
    const palettes = {
      tropical: {
        "--paper": "#faf6ec",
        "--cream": "#f3ecdd",
        "--cream-soft": "#ebe2cc",
        "--ink": "#1f2a22",
        "--ink-soft": "#3a4a3c",
        "--moss": "#2c3b2d",
        "--moss-deep": "#1c2a1e",
      },
      earthen: {
        "--paper": "#f4ecd8",
        "--cream": "#eadfc2",
        "--cream-soft": "#ddd0ad",
        "--ink": "#2a2017",
        "--ink-soft": "#4a3e2e",
        "--moss": "#5a4a2e",
        "--moss-deep": "#3a2e1c",
      },
      dusk: {
        "--paper": "#ede3d2",
        "--cream": "#ddd0bd",
        "--cream-soft": "#c9bba6",
        "--ink": "#2a2433",
        "--ink-soft": "#4a4255",
        "--moss": "#3a3550",
        "--moss-deep": "#232034",
      },
    };
    const accents = {
      terracotta: { "--terracotta": "#b85c38", "--terracotta-deep": "#8a4224" },
      hibiscus: { "--terracotta": "#c0364d", "--terracotta-deep": "#8a2638" },
      lake: { "--terracotta": "#3a5a6b", "--terracotta-deep": "#274050" },
      sunflower: { "--terracotta": "#c89330", "--terracotta-deep": "#966b1c" },
    };
    Object.entries({ ...palettes[tweaks.palette], ...accents[tweaks.accent] }).forEach(
      ([k, v]) => root.style.setProperty(k, v)
    );
  }, [tweaks.palette, tweaks.accent]);

  // Hero load animation
  const heroRef = aUseRef(null);
  aUseEffect(() => {
    const t = setTimeout(() => heroRef.current?.classList.add("loaded"), 80);
    return () => clearTimeout(t);
  }, []);

  const letterParas = LETTER_COPY[tweaks.tone] || LETTER_COPY.letter;

  return (
    <>
      {/* ============= HERO ============= */}
      <section className="hero" ref={heroRef} id="top">
        <div className="hero__img" style={{ backgroundImage: "url('assets/casa-hero.jpg')" }} />
        <div className="hero__veil" />
        <div className="hero__grain" />

        <div className="hero__topbar">
          <div className="hero__mark">Casa La Paloma</div>
          <nav className="hero__topnav">
            <a href="#story">Story</a>
            <a href="#gallery">Gallery</a>
            <a href="#grounds">Grounds</a>
            <a href="#journey">Journey</a>
            <a href="#location">Location</a>
            <a href="#inquire">Inquire</a>
          </nav>
        </div>

        <div className="hero__content">
          <div>
            <div className="hero__coords">11°32'N · 85°42'W · Isla de Ometepe, Nicaragua</div>
            <h1 className="hero__title">
              A house <em>between</em><br />
              two volcanoes.
            </h1>
          </div>
          <div className="hero__meta">
            <div>For sale, privately</div>
            <div>1 bed · casita · workshop</div>
            <div>½ manzana · garden</div>
            {tweaks.showPrice ? (
              <div className="hero__price">$125,000 USD</div>
            ) : (
              <div className="hero__price">Price on inquiry</div>
            )}
          </div>
        </div>

        <div className="hero__scrollhint">
          <span>Scroll</span>
          <span className="line" />
        </div>
      </section>

      {/* ============= LETTER ============= */}
      <section className="letter" id="story">
        <div className="narrow">
          <Reveal as="div" className="letter__eyebrow eyebrow">
            — A letter from the owners —
          </Reveal>
          <Reveal as="div" className="letter__body">
            {letterParas.map((p, i) => <p key={i}>{p}</p>)}
            <div className="letter__signoff">
              With warmth,
              <span className="letter__name">The Keepers of Casa La Paloma</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= GROUNDS ============= */}
      <section className="grounds" id="grounds">
        <div className="container">
          <SectionHead
            no="I · The Grounds"
            title={<>Half a manzana,<br /><span style={{ fontStyle: "normal", fontWeight: 300 }}>tended by hand.</span></>}
            note="Roughly 3,500 m² of garden and grove, shaped slowly over fifteen years. Fruit trees, flowering shrubs, a stone path, and the kind of quiet that is hard to come by."
          />
          <div className="grounds__split">
            <Reveal>
              <Frame className="g-a" label="FRONT ELEVATION · DUSK" src="assets/casa-hero.jpg" />
            </Reveal>
            <Reveal delay={150}>
              <div className="grounds__copy">
                <p>
                  The land sits just inside La Paloma, ten minutes by foot to the black-sand shore of Lake Cocibolca. Concepción rises on the skyline to the east; the lake breeze settles in the garden by four in the afternoon.
                </p>
                <p>
                  Heliconias, hibiscus, bromeliads, a handful of fruit trees, and ornamental grasses line the stone path to the front door. A Saint Francis statue keeps watch at the center of the garden.
                </p>
                <div className="grounds__stats">
                  <div className="stat">
                    <div className="stat__label">Land</div>
                    <div className="stat__value">½ <span className="stat__unit">manzana</span></div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Approx. area</div>
                    <div className="stat__value">3,500 <span className="stat__unit">m²</span></div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Bedrooms</div>
                    <div className="stat__value">1 <span className="stat__unit">+ casita</span></div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Beach</div>
                    <div className="stat__value">10 <span className="stat__unit">min on foot</span></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============= GALLERY ============= */}
      <section className="gallery" id="gallery">
        <div className="container">
          <SectionHead
            no="II · The House"
            title={<><em>La casa</em>, room by room.</>}
            note="Open-air, shaded by a tiled roof, built board by board. A selection of images from inside and around the property."
          />
          <div className="gallery__grid">
            <Reveal><Frame className="g-a" label="01 · FRONT GARDEN" src="assets/casa-hero.jpg" /></Reveal>
            <Reveal delay={80}><Frame className="g-b" label="02 · OPEN-AIR LIVING ROOM" /></Reveal>
            <Reveal delay={120}><Frame className="g-c" label="03 · BEDROOM" /></Reveal>
            <Reveal delay={160}><Frame className="g-d" label="04 · KITCHEN" /></Reveal>
            <Reveal delay={200}><Frame className="g-e" label="05 · CASITA EXTERIOR" /></Reveal>
            <Reveal delay={80}><Frame className="g-f" label="06 · VIEW OF CONCEPCIÓN FROM THE GARDEN" /></Reveal>
            <Reveal delay={140}><Frame className="g-g" label="07 · WORKSHOP INTERIOR" /></Reveal>
          </div>
          <div style={{ marginTop: 24, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)", opacity: 0.6 }}>
            Placeholders shown where final photos are still to be added.
          </div>
        </div>
      </section>

      {/* ============= JOURNEY ============= */}
      <section className="journey" id="journey">
        <div className="journey__inner">
          <Reveal>
            <div className="eyebrow" style={{ color: "var(--ink-soft)", marginBottom: 16 }}>III · Getting There</div>
            <h2 style={{
              fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1, color: "var(--moss-deep)", letterSpacing: "-0.01em"
            }}>
              One flight. One ferry.<br />One hour across the lake.
            </h2>
            <div className="journey__subtitle">
              The island is deliberately slow to reach — and once you're there, it is very hard to leave.
            </div>
          </Reveal>

          <div style={{ marginTop: 56 }}>
            <Reveal>
              <JourneyMap />
            </Reveal>
          </div>

          <div className="journey__steps">
            <Reveal as="div" className="jstep">
              <div className="jstep__no">01</div>
              <div className="jstep__title">Managua</div>
              <div className="jstep__desc">Fly into Augusto C. Sandino International. Drive or shuttle 1.5 hrs south to the port of San Jorge.</div>
            </Reveal>
            <Reveal as="div" className="jstep" delay={100}>
              <div className="jstep__no">02</div>
              <div className="jstep__title">San Jorge</div>
              <div className="jstep__desc">Board the ferry on Lake Cocibolca, the largest freshwater lake in Central America.</div>
            </Reveal>
            <Reveal as="div" className="jstep" delay={200}>
              <div className="jstep__no">03</div>
              <div className="jstep__title">The Crossing</div>
              <div className="jstep__desc">One hour of open water, twin volcanoes growing on the horizon.</div>
            </Reveal>
            <Reveal as="div" className="jstep" delay={300}>
              <div className="jstep__no">04</div>
              <div className="jstep__title">La Paloma</div>
              <div className="jstep__desc">Arrive at Moyogalpa. A short drive along the shore delivers you home.</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============= LIFE ON OMETEPE ============= */}
      <section className="life" id="life">
        <div className="container">
          <SectionHead
            no="IV · Life Here"
            title={<>What the island <em>gives back.</em></>}
          />
          <div className="life__grid">
            <Reveal as="div" className="life__item">
              <div className="life__item__no">— 01</div>
              <h3 className="life__item__title">A slower clock</h3>
              <p className="life__item__body">
                There is no rush on Ometepe. Small fincas, hand-built homes, neighbors who wave from horseback. Days are shaped by weather and light, not meetings.
              </p>
            </Reveal>
            <Reveal as="div" className="life__item" delay={100}>
              <div className="life__item__no">— 02</div>
              <h3 className="life__item__title">A wellness community</h3>
              <p className="life__item__body">
                Yoga shalas, retreat centers, and farm-to-table kitchens have quietly settled into the south of the island. Practitioners come from all over — and many stay.
              </p>
            </Reveal>
            <Reveal as="div" className="life__item" delay={200}>
              <div className="life__item__no">— 03</div>
              <h3 className="life__item__title">Everything grows</h3>
              <p className="life__item__body">
                Volcanic soil and a sweet-water lake. Mangoes, plantains, papaya, passionfruit, cacao, coffee — most of it within walking distance of your kitchen.
              </p>
            </Reveal>
            <Reveal as="div" className="life__item" delay={80}>
              <div className="life__item__no">— 04</div>
              <h3 className="life__item__title">A kind community</h3>
              <p className="life__item__body">
                La Paloma is small and watchful in the best way. Neighbors keep an eye on each other's homes, share harvests, and welcome newcomers with patience.
              </p>
            </Reveal>
            <Reveal as="div" className="life__item" delay={160}>
              <div className="life__item__no">— 05</div>
              <h3 className="life__item__title">Good infrastructure</h3>
              <p className="life__item__body">
                Reliable electricity, cellular coverage, and workable internet. The ferry runs daily. Moyogalpa has a market, pharmacies, restaurants, and a growing expat presence.
              </p>
            </Reveal>
            <Reveal as="div" className="life__item" delay={240}>
              <div className="life__item__no">— 06</div>
              <h3 className="life__item__title">Water everywhere</h3>
              <p className="life__item__body">
                Lake Cocibolca is freshwater. You can swim in it, sail on it, fish from it. Ojo de Agua, a natural spring pool, is a thirty-minute drive away.
              </p>
            </Reveal>
          </div>

          <Reveal as="blockquote" className="life__pullquote">
            “We came for a season and stayed for fifteen years. The island has a way of holding you.”
            <span className="life__pullquote__attr">— The owners</span>
          </Reveal>
        </div>
      </section>

      {/* ============= DETAILS (Included + Legal) ============= */}
      <section className="details" id="details">
        <div className="container">
          <SectionHead
            no="V · The Details"
            title={<>What's included,<br />and what to know.</>}
          />
          <div className="details__cols">
            <Reveal as="div" className="details__col">
              <h3>Included in the sale</h3>
              <ul className="details__list">
                <li><span className="mark">01</span><span>Main house — one bedroom, open-air living, kitchen, bath, terracotta tile roof.</span></li>
                <li><span className="mark">02</span><span>Detached casita — guest room or studio, full bath.</span></li>
                <li><span className="mark">03</span><span>Detached workshop — generously sized, wired, with work bench and storage.</span></li>
                <li><span className="mark">04</span><span>Half a manzana (~3,500 m²) of titled land.</span></li>
                <li><span className="mark">05</span><span>Mature garden — fruit trees, flowering shrubs, stone paths, irrigation in place.</span></li>
                <li><span className="mark">06</span><span>Furnishings, kitchenware, tools, and garden equipment negotiable.</span></li>
                <li><span className="mark">07</span><span>Connection to grid electricity and municipal water.</span></li>
              </ul>
            </Reveal>
            <Reveal as="div" className="details__col" delay={120}>
              <h3>Ownership notes · Nicaragua</h3>
              <ul className="details__list">
                <li><span className="mark">A</span><span>Foreign nationals may hold full, titled ownership of property in Nicaragua.</span></li>
                <li><span className="mark">B</span><span>This property is held under clear title (<em>escritura pública</em>) and is free of encumbrances.</span></li>
                <li><span className="mark">C</span><span>Closing is typically handled by a Nicaraguan <em>abogado y notario</em>; we can recommend two local attorneys familiar with this transaction.</span></li>
                <li><span className="mark">D</span><span>Property taxes in Nicaragua are modest — typically 1% of registered value annually.</span></li>
                <li><span className="mark">E</span><span>No residency required to purchase. Many buyers later apply for <em>pensionado</em> or rentista residency.</span></li>
                <li><span className="mark">F</span><span>The above is summary only, not legal advice. We'll share full documentation with serious inquiries.</span></li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============= LOCATION ============= */}
      <section className="location" id="location">
        <div className="container">
          <SectionHead
            no="VI · Location"
            title={<>La Paloma, <em>west coast</em>.</>}
            note="A fishing community just outside of Moyogalpa, the island's main port. Ten minutes from the ferry landing; a short walk to the lake."
          />
          <Reveal>
            <LocationMap />
          </Reveal>
        </div>
      </section>

      {/* ============= INQUIRE ============= */}
      <section className="inquire" id="inquire">
        <div className="narrow">
          <Reveal as="div" className="inquire__eyebrow eyebrow">— Bienvenidos —</Reveal>
          <Reveal as="h2" className="inquire__title">
            If the island<br />is calling you.
          </Reveal>
          <Reveal as="p" className="inquire__body">
            We'd love to hear from you. Tell us a little about yourself — we read every note, and will respond personally within a few days.
          </Reveal>
          <Reveal>
            <a className="inquire__email" href="mailto:mygypsytoes@gmail.com?subject=Casa%20La%20Paloma%20%C2%B7%20Ometepe">
              <span>Write to us</span>
              <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16, textTransform: "none", letterSpacing: 0 }}>mygypsytoes@gmail.com</span>
              <span>→</span>
            </a>
          </Reveal>
          <div style={{ marginTop: 40, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-soft)", opacity: 0.7 }}>
            PRIVATE SALE · NO AGENTS · ENGLISH & SPANISH
          </div>
        </div>
      </section>

      {/* ============= FOOTER ============= */}
      <footer className="footer">
        <div className="footer__mark">Casa La Paloma</div>
        <div>Isla de Ometepe · Nicaragua · MMXXVI</div>
        <div><a href="#top" style={{ borderBottom: "1px solid rgba(243,236,221,0.3)" }}>Return to top ↑</a></div>
      </footer>

      <TweaksPanel open={tweaksOpen} state={tweaks} setState={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
