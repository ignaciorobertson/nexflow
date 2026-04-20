import { useState, useEffect } from "react";
import {
  Zap, Brain, GitBranch, Layers, Webhook, BarChart3,
  ArrowRight, CheckCircle, Mail, MessageCircle, X, Menu
} from "lucide-react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #06101f;
    --bg-card:   #0b1828;
    --bg-card2:  #0f1e30;
    --teal:      #12b8a5;
    --teal-lt:   #2dd4bf;
    --teal-dk:   #0d9488;
    --cream:     #e8dcc8;
    --cream-muted: #b8a98a;
    --text:      #eef2f7;
    --text-muted:#7a8ea8;
    --border:    rgba(18,184,165,0.12);
    --border-hover: rgba(18,184,165,0.38);
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--teal-dk); border-radius: 2px; }

  /* ── Animations ── */
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-18px); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { transform:scale(1);   opacity:.6; }
    100% { transform:scale(1.6); opacity:0; }
  }

  .float  { animation: floatY 7s ease-in-out infinite; }
  .float2 { animation: floatY 9s ease-in-out infinite 1.5s; }

  .fade-up   { animation: fadeUp .75s ease both; }
  .fade-up-1 { animation: fadeUp .75s ease .10s both; }
  .fade-up-2 { animation: fadeUp .75s ease .20s both; }
  .fade-up-3 { animation: fadeUp .75s ease .35s both; }
  .fade-up-4 { animation: fadeUp .75s ease .50s both; }

  /* ── Nav links ── */
  .nav-link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: .88rem;
    font-weight: 500;
    position: relative;
    transition: color .2s;
  }
  .nav-link::after {
    content:'';
    position:absolute; bottom:-3px; left:0;
    width:0; height:1px;
    background: var(--teal);
    transition: width .3s;
  }
  .nav-link:hover { color: var(--text); }
  .nav-link:hover::after { width:100%; }

  /* ── Buttons ── */
  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background: var(--teal);
    color: #06101f;
    font-family:'DM Sans',sans-serif;
    font-weight:700; font-size:.88rem;
    padding:.75rem 1.6rem; border-radius:10px;
    border:none; cursor:pointer; text-decoration:none;
    transition: background .2s, transform .15s, box-shadow .2s;
  }
  .btn-primary:hover {
    background: var(--teal-lt);
    transform:translateY(-2px);
    box-shadow:0 10px 30px rgba(18,184,165,.25);
  }

  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent;
    color: var(--teal);
    font-family:'DM Sans',sans-serif;
    font-weight:700; font-size:.88rem;
    padding:.75rem 1.6rem; border-radius:10px;
    border:1px solid var(--teal);
    cursor:pointer; text-decoration:none;
    transition: background .2s, transform .15s;
  }
  .btn-ghost:hover {
    background:rgba(18,184,165,.08);
    transform:translateY(-2px);
  }

  /* ── Cards ── */
  .card-service {
    background: var(--bg-card);
    border:1px solid var(--border);
    border-radius:18px; padding:2rem;
    transition: transform .3s, border-color .3s, box-shadow .3s;
  }
  .card-service:hover {
    transform:translateY(-5px);
    border-color:var(--border-hover);
    box-shadow:0 24px 48px rgba(18,184,165,.08);
  }

  .card-portfolio {
    background: var(--bg-card);
    border:1px solid var(--border);
    border-radius:20px; padding:2.5rem;
    transition: transform .3s, border-color .3s;
    position:relative; overflow:hidden;
  }
  .card-portfolio:hover {
    transform:translateY(-6px);
    border-color:var(--border-hover);
  }
  .card-portfolio::before {
    content:'';
    position:absolute; top:0; right:0;
    width:140px; height:140px;
    background:radial-gradient(circle at top right, rgba(18,184,165,.12), transparent 70%);
    pointer-events:none;
  }

  .card-testimonial {
    background: var(--bg-card);
    border:1px solid var(--border);
    border-radius:20px; padding:2.5rem;
  }

  /* ── Layout ── */
  .container {
    max-width:1180px; margin:0 auto; padding:0 2rem;
  }
  .section { padding:7rem 0; }

  .section-label {
    display:block;
    color:var(--teal);
    font-size:.75rem; font-weight:700;
    letter-spacing:.18em; text-transform:uppercase;
    margin-bottom:.75rem;
  }
  .section-title {
    font-family:'Outfit',sans-serif;
    font-size:clamp(2rem,4vw,3rem);
    font-weight:800; line-height:1.12;
    letter-spacing:-.03em;
    color:var(--text); margin-bottom:1rem;
  }
  .section-sub {
    color:var(--text-muted);
    font-size:1.02rem; line-height:1.75;
    max-width:540px;
  }

  /* ── Tag / Badge ── */
  .tag {
    display:inline-block;
    background:rgba(255,255,255,.05);
    color:var(--text-muted);
    font-size:.75rem; padding:4px 12px;
    border-radius:6px;
    border:1px solid rgba(255,255,255,.07);
  }
  .badge {
    display:inline-block;
    background:rgba(18,184,165,.14);
    color:var(--teal);
    font-size:.72rem; font-weight:700;
    letter-spacing:.06em;
    padding:4px 14px; border-radius:100px;
  }

  /* ── Divider line ── */
  .divider {
    height:1px; background:var(--border); margin:0;
  }
`;

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    Icon: Zap,
    title: "Automatización de Procesos",
    desc: "Identifico y elimino tareas repetitivas, construyendo flujos end-to-end que operan solos 24/7.",
    color: "#12b8a5",
  },
  {
    Icon: Brain,
    title: "Integración con IA",
    desc: "Conecto GPT-4, Claude y otros modelos a tus flujos para procesar texto, clasificar datos o generar respuestas inteligentes.",
    color: "#a78bfa",
  },
  {
    Icon: GitBranch,
    title: "Flujos n8n a Medida",
    desc: "Diseño flujos complejos con lógica condicional, manejo de errores y estructura limpia que escala con tu operación.",
    color: "#fb923c",
  },
  {
    Icon: Layers,
    title: "Integración de Herramientas",
    desc: "Uno tu stack completo: CRM, ERP, e-commerce, redes sociales y lo que necesites en un ecosistema que habla el mismo idioma.",
    color: "#12b8a5",
  },
  {
    Icon: Webhook,
    title: "Webhooks & APIs",
    desc: "Desarrollo integraciones personalizadas mediante APIs REST y webhooks para conectar sistemas sin integración nativa.",
    color: "#a78bfa",
  },
  {
    Icon: BarChart3,
    title: "Reportes y Alertas",
    desc: "Automatizo la generación de dashboards, reportes periódicos y alertas inteligentes según eventos de tu negocio.",
    color: "#fb923c",
  },
];

const PORTFOLIO = [
  {
    category: "AI + CRM",
    title: "CRM Automatizado con IA",
    desc: "Sistema de gestión de clientes con clasificación automática por IA, respuestas pre-generadas, seguimiento de deals y notificaciones contextuales por Slack.",
    tags: ["n8n", "OpenAI GPT-4", "HubSpot", "Slack"],
  },
  {
    category: "Finanzas",
    title: "Pipeline de Facturación",
    desc: "Automatización completa del ciclo: generación de facturas, envío al cliente, seguimiento de pagos y alertas de vencimiento sin intervención manual.",
    tags: ["n8n", "Stripe", "Google Sheets", "Gmail"],
  },
  {
    category: "E-commerce",
    title: "Sync Multi-Plataforma",
    desc: "Sincronización bidireccional de inventario, pedidos y clientes entre Shopify, WooCommerce y sistema ERP interno en tiempo real.",
    tags: ["n8n", "Shopify API", "WooCommerce", "PostgreSQL"],
  },
  {
    category: "Monitoreo",
    title: "Sistema de Alertas 24/7",
    desc: "Monitoreo continuo de KPIs críticos con disparadores inteligentes que envían alertas priorizadas por Telegram o email según urgencia.",
    tags: ["n8n", "Telegram Bot", "Slack", "Grafana"],
  },
];

const TESTIMONIALS = [
  {
    text: "Automatizamos todo el proceso de onboarding de nuevos clientes. Lo que antes tomaba dos horas de trabajo manual ahora se ejecuta solo en minutos, sin errores.",
    name: "Martina G.",
    role: "CEO, AgenciaMKT",
    initial: "M",
  },
  {
    text: "La integración entre nuestro CRM y las redes sociales fue perfecta. Ahora tenemos datos actualizados en tiempo real y nuestro equipo puede enfocarse en vender, no en copiar datos.",
    name: "Alejandro P.",
    role: "Director de Operaciones",
    initial: "A",
  },
];

const NAV_ITEMS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajos", href: "#portfolio" },
  { label: "Sobre mí", href: "#about" },
  { label: "Testimonios", href: "#testimonios" },
];

/* ─── LOGO SVG ───────────────────────────────────────────────────────────── */
function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4,16 Q10,4 16,16 Q22,28 28,16" stroke="#12b8a5" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M4,16 Q10,28 16,16 Q22,4 28,16" stroke="#e8dcc8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

/* ─── HERO RIBBON ────────────────────────────────────────────────────────── */
function HeroRibbon() {
  return (
    <div className="float" style={{ width: "100%", maxWidth: 560 }}>
      <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="r1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#12b8a5" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <linearGradient id="r2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8dcc8" stopOpacity=".35" />
            <stop offset="100%" stopColor="#e8dcc8" stopOpacity=".08" />
          </linearGradient>
          <linearGradient id="r3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d9488" stopOpacity=".7" />
            <stop offset="100%" stopColor="#12b8a5" stopOpacity=".3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Main ribbon body */}
        <path
          d="M70 390 C140 280, 195 180, 340 130 C440 105, 510 128, 548 82
             C530 170, 470 215, 365 258 C240 308, 165 370, 108 450 Z"
          fill="url(#r1)" opacity=".92" filter="url(#glow)"
        />
        {/* Ribbon shadow/depth */}
        <path
          d="M70 390 C140 280, 195 180, 340 130 C440 105, 510 128, 548 82
             C543 92, 536 108, 522 128 C475 208, 368 255, 242 305
             C168 338, 120 392, 90 452 Z"
          fill="url(#r1)" opacity=".65"
        />
        {/* Cream highlight */}
        <path
          d="M108 412 C172 302, 218 202, 355 148 C450 122, 518 142, 554 96
             C550 104, 544 118, 534 136 C488 218, 385 265, 258 314
             C182 346, 134 402, 104 460 Z"
          fill="url(#r2)"
        />
        {/* Second loop */}
        <path
          d="M290 42 C395 72, 494 148, 512 252 C528 330, 500 390, 468 428
             C450 365, 460 300, 438 222 C405 128, 332 70, 256 52 Z"
          fill="url(#r3)" opacity=".78"
        />
        <path
          d="M290 42 C395 72, 494 148, 512 252 C520 288, 516 320, 506 350
             C500 312, 505 278, 490 210 C458 118, 386 66, 272 50 Z"
          fill="url(#r2)"
        />
        {/* Glowing inner edge */}
        <path
          d="M380 132 C468 110, 522 132, 548 82"
          stroke="#2dd4bf" strokeWidth="1.5" fill="none" opacity=".6"
        />
      </svg>
    </div>
  );
}

/* ─── FLOW NODE (about section decoration) ──────────────────────────────── */
function FlowNode({ label, color }) {
  return (
    <div style={{
      background: `${color}18`,
      border: `1px solid ${color}45`,
      borderRadius: 10,
      padding: "10px 18px",
      color,
      fontSize: ".82rem",
      fontWeight: 700,
      textAlign: "center",
      minWidth: 90,
    }}>
      {label}
    </div>
  );
}

/* ─── GRID DECORATION ───────────────────────────────────────────────────── */
function GridBg({ opacity = 0.03 }) {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 400 400"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity }}
    >
      <defs>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth=".8" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#grid)" />
    </svg>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "nexflow-global";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.head.removeChild(style);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── NAV ─────────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* NAVIGATION */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: "1.1rem 0",
        background: scrolled ? "rgba(6,16,31,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all .35s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "var(--text)", letterSpacing: "-.02em" }}>
              NEX<span style={{ color: "var(--teal)" }}>FLOW</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
            <a href="#contacto" className="btn-primary" style={{ padding: ".6rem 1.3rem", fontSize: ".83rem" }}>
              Contactar
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ display: "none", background: "none", border: "none", color: "var(--text)", cursor: "pointer" }}
            aria-label="menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: "var(--bg-card)", borderTop: "1px solid var(--border)",
            padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem",
          }}>
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a href="#contacto" className="btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => setMenuOpen(false)}>
              Contactar
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "6rem" }}>

        {/* Ambient glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", right: "-5%", top: "10%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(18,184,165,.12) 0%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute", left: "20%", bottom: "5%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,.06) 0%, transparent 70%)",
          }} />
        </div>

        <div className="container" style={{ display: "flex", alignItems: "center", gap: "3rem", position: "relative", zIndex: 10 }}>
          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className="section-label fade-up">n8n Expert · Automatizaciones</span>

            <h1 className="fade-up-1" style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(3rem,6.5vw,5.5rem)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-.04em", color: "var(--text)",
              marginBottom: "1.5rem",
            }}>
              Automatizaciones<br />
              <span style={{ color: "var(--teal)" }}>que fluyen</span>
            </h1>

            <p className="fade-up-2" style={{
              color: "var(--text-muted)", fontSize: "1.08rem",
              lineHeight: 1.75, maxWidth: 500, marginBottom: "2.5rem",
            }}>
              Diseño e implemento flujos con n8n que conectan tus herramientas, eliminan tareas manuales y escalan tu negocio sin fricciones ni código innecesario.
            </p>

            <div className="fade-up-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
              <a href="#portfolio" className="btn-primary">
                Ver mis trabajos <ArrowRight size={16} />
              </a>
              <a href="#contacto" className="btn-ghost">
                Hablemos
              </a>
            </div>

            {/* Stats */}
            <div className="fade-up-4" style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {[["50+", "Flujos creados"], ["20+", "Clientes"], ["100%", "Proyectos entregados"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "var(--teal)", lineHeight: 1 }}>{n}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: ".82rem", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ribbon */}
          <div style={{ flex: "0 0 auto", width: "44%", display: "flex", justifyContent: "center" }}>
            <HeroRibbon />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: .4,
        }}>
          <span style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>scroll</span>
          <div style={{ width: 1, height: 32, background: "var(--teal)", opacity: .5 }} />
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section id="servicios" className="section" style={{ background: "rgba(11,24,40,.6)" }}>
        <div className="container">
          <div style={{ marginBottom: "4rem" }}>
            <span className="section-label">Servicios</span>
            <h2 className="section-title">Lo que puedo construir<br />para vos</h2>
            <p className="section-sub">
              Con n8n como motor, automatizo cualquier proceso de negocio: desde los más simples hasta flujos complejos con IA, condicionales y manejo de errores.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "1.25rem" }}>
            {SERVICES.map(({ Icon, title, desc, color }) => (
              <div key={title} className="card-service">
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${color}1a`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: ".7rem" }}>
                  {title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".88rem", lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────── */}
      <section id="portfolio" className="section">
        <div className="container">
          <div style={{ marginBottom: "4rem" }}>
            <span className="section-label">Trabajos</span>
            <h2 className="section-title">Proyectos realizados</h2>
            <p className="section-sub">
              Una selección de flujos y sistemas que construí para clientes reales, cada uno adaptado a su lógica de negocio.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(500px,1fr))", gap: "1.5rem" }}>
            {PORTFOLIO.map(({ category, title, desc, tags }) => (
              <div key={title} className="card-portfolio">
                <span className="badge" style={{ marginBottom: "1.25rem", display: "inline-block" }}>{category}</span>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--text)", marginBottom: ".9rem", letterSpacing: "-.02em" }}>
                  {title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".92rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                  {tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" className="section" style={{ background: "rgba(11,24,40,.6)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* Text */}
          <div>
            <span className="section-label">Sobre mí</span>
            <h2 className="section-title">¿Por qué n8n?<br /></h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: ".97rem" }}>
              n8n es la herramienta de automatización más flexible del mercado: open source, auto-hosteable y con 400+ integraciones nativas. Permite flujos de cualquier complejidad sin los límites de herramientas como Zapier o Make.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.25rem", fontSize: ".97rem" }}>
              Soy especialista en n8n y me dedico exclusivamente a automatizaciones. Cada proyecto incluye documentación, soporte post-entrega y código limpio que vos o tu equipo pueden mantener.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
              {[
                "Flujos escalables y bien documentados",
                "Lógica adaptada a tu negocio, no al revés",
                "Soporte y ajustes post-implementación",
                "Auto-hosting o cloud, vos elegís",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircle size={17} color="var(--teal)" style={{ flexShrink: 0 }} />
                  <span style={{ color: "var(--text)", fontSize: ".92rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: n8n flow diagram */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 24, padding: "2.5rem",
            position: "relative", overflow: "hidden",
          }}>
            <GridBg opacity={0.025} />
            <div style={{ position: "relative", zIndex: 1 }}>

              {/* Flow */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: "2rem" }}>
                <FlowNode label="Trigger" color="#fb923c" />
                <div style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>→</div>
                <FlowNode label="Proceso" color="var(--teal)" />
                <div style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>→</div>
                <FlowNode label="Output" color="#a78bfa" />
              </div>

              {/* n8n badge */}
              <div style={{
                textAlign: "center", padding: "1.5rem",
                background: "rgba(18,184,165,.05)", borderRadius: 14,
                border: "1px solid rgba(18,184,165,.12)", marginBottom: "1.75rem",
              }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "3.5rem", fontWeight: 900, color: "var(--teal)", lineHeight: 1 }}>n8n</div>
                <div style={{ color: "var(--text-muted)", fontSize: ".8rem", marginTop: 6 }}>400+ integraciones · Open source · Self-hosted</div>
              </div>

              {/* App grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: ".6rem" }}>
                {["Slack", "Gmail", "HubSpot", "Stripe", "Notion", "OpenAI", "Shopify", "Telegram", "Airtable"].map(app => (
                  <div key={app} style={{
                    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 8, padding: ".55rem .5rem",
                    color: "var(--text-muted)", fontSize: ".75rem", textAlign: "center",
                  }}>{app}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section id="testimonios" className="section">
        <div className="container">
          <div style={{ marginBottom: "4rem" }}>
            <span className="section-label">Testimonios</span>
            <h2 className="section-title">Lo que dicen mis clientes</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map(({ text, name, role, initial }) => (
              <div key={name} className="card-testimonial">
                <div style={{ color: "var(--teal)", fontSize: "3.5rem", lineHeight: .9, marginBottom: "1rem", fontFamily: "Georgia,serif", opacity: .8 }}>"</div>
                <p style={{ color: "#c0ccd8", fontSize: ".97rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.75rem" }}>
                  {text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: "linear-gradient(135deg,var(--teal),#a78bfa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#06101f", fontWeight: 800, fontSize: "1rem",
                  }}>{initial}</div>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: ".9rem" }}>{name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: ".78rem" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section id="contacto" className="section" style={{ background: "rgba(11,24,40,.6)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 400, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(18,184,165,.08) 0%, transparent 70%)",
          }} />
        </div>

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <span className="section-label">Contacto</span>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "clamp(2.2rem,5vw,3.8rem)",
            fontWeight: 900, letterSpacing: "-.03em",
            color: "var(--text)", marginBottom: "1rem",
          }}>
            ¿Listo para automatizar?
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: 460, margin: "0 auto 2.75rem", lineHeight: 1.75 }}>
            Contame tu proyecto. En menos de 24 horas te respondo con una propuesta concreta.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:juanignaciorobertson@gmail.com" className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
              <Mail size={18} /> Enviar email
            </a>
            <a href="https://wa.me/542613028513" target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#040c18", borderTop: "1px solid var(--border)", padding: "2.75rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>

          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo size={26} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, color: "var(--text)", fontSize: "1rem" }}>
              NEX<span style={{ color: "var(--teal)" }}>FLOW</span>
            </span>
          </a>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {["Servicios", "Trabajos", "Sobre mí", "Contacto"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`}
                style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: ".83rem", transition: "color .2s" }}
                onMouseEnter={e => (e.target.style.color = "var(--text)")}
                onMouseLeave={e => (e.target.style.color = "var(--text-muted)")}
              >{l}</a>
            ))}
          </div>

          <div style={{ color: "#3a4d62", fontSize: ".78rem" }}>
            © {new Date().getFullYear()} NexFlow · n8n Expert
          </div>
        </div>
      </footer>

    </div>
  );
}
