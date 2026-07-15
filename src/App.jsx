import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Check,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  MousePointer2,
  Plane,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Utensils,
  X,
  Zap,
} from "lucide-react";

const WHATSAPP_NUMBER = "923032674824";
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navItems = [
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["More Work", "#more-work"],
  ["Proof", "#proof"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

const featuredProjects = [
  {
    title: "Summit House Academy",
    category: "Education",
    industry: "Coaching Website",
    image: assetUrl("/assets/images/previews/summit-house-academy.webp"),
    url: "https://anasraza9898.github.io/summit-house-academy/",
    description:
      "A polished academy website with admission-focused sections, course clarity, trust signals and WhatsApp registration flow.",
    stack: ["React-ready UI", "Responsive CSS", "SEO structure", "WhatsApp CTA"],
    features: ["Course presentation", "Admission journey", "Faculty trust", "Mobile enquiry flow"],
  },
  {
    title: "Velora Grand",
    category: "Hospitality",
    industry: "Luxury Venue Website",
    image: assetUrl("/assets/images/previews/velora-grand.webp"),
    url: "https://anasraza9898.github.io/velora-grand/",
    description:
      "A premium venue experience built to make packages, ambience, gallery moments and booking intent feel high-end.",
    stack: ["Premium UI", "Gallery UX", "Fast static", "Lead CTA"],
    features: ["Venue storytelling", "Package sections", "Visual hierarchy", "Booking conversion"],
  },
  {
    title: "Mehrab & Co. Voyages",
    category: "Travel",
    industry: "Travel Website",
    image: assetUrl("/assets/images/previews/mehrab-co-voyages.webp"),
    url: "https://anasraza9898.github.io/mehrab-co-voyages/",
    description:
      "A travel brand website with destination-led browsing, package clarity, trust-building details and direct enquiry prompts.",
    stack: ["Content UX", "Package cards", "Responsive layout", "Inquiry CTA"],
    features: ["Destination browsing", "Tour packages", "Trust sections", "WhatsApp consultation"],
  },
  {
    title: "Demo Catering",
    category: "Catering",
    industry: "Catering Website",
    image: assetUrl("/assets/images/previews/al-makkah-catering.webp"),
    url: "https://anasraza9898.github.io/demo-catering/",
    description:
      "A food-service website designed to present menus, event services, quality cues and instant booking enquiries.",
    stack: ["Menu UI", "Service layout", "Local SEO", "WhatsApp CTA"],
    features: ["Menu sections", "Event catering", "Service proof", "Fast mobile browsing"],
  },
  {
    title: "Prime Nest Realty",
    category: "Real Estate",
    industry: "Property Website",
    image: assetUrl("/assets/images/previews/prime-nest-realty.webp"),
    url: "https://anasraza9898.github.io/prime-nest-reality-website/",
    description:
      "A real estate demo for presenting listings, areas, project pages and serious property enquiries in one clean flow.",
    stack: ["Listing UI", "Filter-ready layout", "SEO metadata", "WhatsApp lead flow"],
    features: ["Property cards", "Area guidance", "Buyer enquiry", "Trust-building FAQ"],
  },
];

const moreProjects = [
  {
    title: "Academy Demo",
    category: "Education",
    industry: "Academy Website",
    image: assetUrl("/assets/images/project-academy.webp"),
    url: "https://anasraza9898.github.io/academy-demo/",
    description:
      "A clean school and academy demo built around course discovery, admission confidence and simple enquiry paths.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    features: ["Course sections", "Admission CTA", "Trust layout", "Fast static hosting"],
  },
  {
    title: "Pearl Dental Clinic",
    category: "Healthcare",
    industry: "Clinic Website",
    image: assetUrl("/assets/images/project-dental.webp"),
    url: "https://anasraza9898.github.io/pearl-dental-clinic/?v=65",
    description:
      "A dental clinic website with service clarity, appointment intent, patient trust and polished local business presentation.",
    stack: ["Service UX", "Responsive CSS", "Local SEO", "Booking CTA"],
    features: ["Treatment cards", "Patient trust", "Appointment flow", "Mobile browsing"],
  },
  {
    title: "AtlasPath Consultancy",
    category: "Consultancy",
    industry: "Immigration Website",
    image: assetUrl("/assets/images/project-immigration.webp"),
    url: "https://anasraza9898.github.io/atlaspath-consultancy/",
    description:
      "A consultancy presence focused on service credibility, process clarity and lead-ready information architecture.",
    stack: ["Landing UX", "Service content", "Lead flow", "GitHub Pages"],
    features: ["Visa services", "Process steps", "Credibility cues", "Contact CTA"],
  },
  {
    title: "Royal Beauty Lounge",
    category: "Beauty",
    industry: "Salon Website",
    image: assetUrl("/assets/images/project-salon.webp"),
    url: "https://anasraza9898.github.io/royal-beauty-lounge/",
    description:
      "A salon website with premium service presentation, visual polish and direct enquiry moments for local customers.",
    stack: ["Beauty UI", "Responsive layout", "Service cards", "CTA flow"],
    features: ["Service menu", "Brand feel", "Offer sections", "Mobile-first layout"],
  },
];

const allProjects = [...featuredProjects, ...moreProjects];

const services = [
  ["Coaching Websites", "Admissions, batches, faculty, results and WhatsApp registration journeys.", GraduationCap],
  ["Travel Websites", "Packages, destinations, itineraries and consultation flows built for trust.", Plane],
  ["Real Estate Websites", "Listings, areas, project pages and buyer enquiry paths that are easy to scan.", Building2],
  ["Marquee Websites", "Venue presentation, packages, gallery moments and booking-focused CTAs.", Sparkles],
  ["Catering Websites", "Menus, event services, quality proof and fast ordering conversations.", Utensils],
  ["Business Websites", "Premium online presence for clinics, salons, services and growing local brands.", BriefcaseBusiness],
];

const proofCards = [
  ["Fast Performance", "Lean pages, optimized images and transform-first animation.", Zap],
  ["Responsive", "Designed for 320px phones through wide desktop screens.", LayoutGrid],
  ["SEO Ready", "Metadata, semantic sections and structured data included.", Search],
  ["AI Assisted", "Faster ideation and stronger content structure with human polish.", Bot],
  ["Modern UI", "Premium light visuals, glass surfaces, spacing and hierarchy.", MousePointer2],
  ["Premium UX", "Clear journeys from interest to enquiry.", BadgeCheck],
  ["Clean Code", "Component-based React with maintainable data structures.", Code2],
  ["GitHub Deployment", "Built for static hosting and fast GitHub Pages delivery.", Github],
  ["Performance Optimized", "Lazy media, reduced motion support and split bundles.", BarChart3],
];

const process = [
  ["Discovery", "Understand the business, audience, goals and required sections."],
  ["Research", "Study competitors, trust signals and conversion expectations."],
  ["Wireframe", "Plan the page flow before visual polish."],
  ["UI Design", "Create a premium light interface with clear hierarchy."],
  ["Development", "Build responsive sections, animations and enquiry flows."],
  ["Testing", "Check forms, links, accessibility, layout and performance."],
  ["Deployment", "Publish to GitHub Pages with production assets."],
  ["Support", "Help with updates, refinements and next sections."],
];

const skills = [
  ["HTML", 96],
  ["CSS", 94],
  ["JavaScript", 90],
  ["TypeScript", 78],
  ["React", 88],
  ["Vite", 86],
  ["Framer Motion", 84],
  ["Git", 84],
  ["GitHub", 88],
  ["Performance", 90],
  ["Accessibility", 82],
  ["Responsive Design", 94],
  ["UI Design", 90],
  ["UX", 86],
  ["AI Assisted Development", 92],
];

const stats = [
  [String(allProjects.length), "live projects"],
  ["5", "featured builds"],
  ["320", "px mobile ready"],
  ["100", "performance mindset"],
];

function SectionReveal({ children, className = "", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

function MagneticButton({ href, children, variant = "primary", className = "", ...props }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 20 });
  const springY = useSpring(y, { stiffness: 240, damping: 20 });

  function handleMove(event) {
    if (shouldReduceMotion || !ref.current || !window.matchMedia("(hover: hover)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.14);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.a
      ref={ref}
      href={href}
      className={`btn btn-${variant} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </m.a>
  );
}

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      setCount(value);
      return undefined;
    }
    let frame = 0;
    const totalFrames = 44;
    const timer = window.setInterval(() => {
      frame += 1;
      setCount(Math.round((numericValue * frame) / totalFrames));
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMove(event) {
    if (shouldReduceMotion || !ref.current || !window.matchMedia("(hover: hover)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -5.5);
    rotateY.set(px * 5.5);
    x.set(px * 8);
    y.set(py * 8);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  }

  return (
    <m.article
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, x, y, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </m.article>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Anas Memon home">
          <span className="brand-mark" aria-hidden="true">AM</span>
          <span>Anas Memon</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div className={`nav-panel ${open ? "is-open" : ""}`} id="primary-nav">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <MagneticButton href="#contact" variant="primary" className="nav-cta" onClick={() => setOpen(false)}>
            Start a Website
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.32], [0, shouldReduceMotion ? 0 : 72]);
  const imageY = useTransform(scrollYProgress, [0, 0.28], [0, shouldReduceMotion ? 0 : -38]);

  return (
    <section className="hero" id="top">
      <m.div className="hero-orbit hero-orbit-one" style={{ y }} aria-hidden="true" />
      <m.div className="hero-orbit hero-orbit-two" style={{ y: imageY }} aria-hidden="true" />
      <div className="container hero-grid">
        <SectionReveal className="hero-copy">
          <span className="badge"><Sparkles aria-hidden="true" /> Premium AI Website Agency</span>
          <h1>Creative agency websites that make local businesses look established online.</h1>
          <p>
            I design and build premium, mobile-first websites for academies, venues, travel brands, real estate,
            catering, clinics, salons and service businesses that need trust, clarity and enquiries.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#projects">
              View All Projects <ArrowRight aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Discuss on WhatsApp <MessageCircle aria-hidden="true" />
            </MagneticButton>
          </div>
          <div className="hero-trust" aria-label="Portfolio strengths">
            {[
              [Rocket, `${allProjects.length} live projects`],
              [ShieldCheck, "SEO-ready"],
              [Zap, "Fast static builds"],
              [MessageCircle, "Lead-focused CTAs"],
            ].map(([Icon, item]) => (
              <span key={item}><Icon aria-hidden="true" />{item}</span>
            ))}
          </div>
        </SectionReveal>

        <m.div
          className="hero-showcase"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard className="studio-card">
            <m.img
              src={assetUrl("/assets/images/hero-studio.webp")}
              width="1586"
              height="992"
              alt="Premium web development studio with laptop, dashboards and UI design screens"
              decoding="async"
              fetchPriority="high"
              style={{ y: imageY }}
            />
            <div className="studio-glass glass-left">
              <span>Design System</span>
              <strong>UI + UX</strong>
            </div>
            <div className="studio-glass glass-right">
              <span>Deploy Ready</span>
              <strong>GitHub Pages</strong>
            </div>
          </TiltCard>
        </m.div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="Portfolio statistics">
      <div className="container stats-grid">
        {stats.map(([value, label]) => (
          <SectionReveal className="stat" key={label}>
            <strong><Counter value={value} suffix={label.includes("mindset") ? "%" : label.includes("mobile") ? "px" : ""} /></strong>
            <span>{label}</span>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="eyebrow">Services</span>
          <h2>Website systems for businesses that need to look established.</h2>
          <p>Each service is built around clarity, trust, mobile browsing and a direct enquiry path.</p>
        </SectionReveal>
        <div className="services-grid">
          {services.map(([title, description, Icon], index) => (
            <SectionReveal key={title} delay={index * 0.035}>
              <TiltCard className="service-card glass-card">
                <span className="icon-box"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, compact = false }) {
  return (
    <SectionReveal delay={index * 0.045}>
      <TiltCard className={`project-card glass-card ${compact ? "project-card-compact" : ""}`}>
        <a className="project-media" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}>
          <img
            src={project.image}
            width="900"
            height="566"
            sizes={compact ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, (max-width: 1180px) 52vw, 620px"}
            alt={`${project.title} website homepage preview`}
            loading={index === 0 && !compact ? "eager" : "lazy"}
            decoding="async"
          />
          <span className="project-hover"><ExternalLink aria-hidden="true" /> Live Demo</span>
        </a>
        <div className="project-content">
          <div className="project-meta">
            <span>{project.category}</span>
            <span>{project.industry}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="chip-row" aria-label={`${project.title} technology stack`}>
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}><Check aria-hidden="true" />{feature}</li>
            ))}
          </ul>
          <MagneticButton href={project.url} variant="outline" target="_blank" rel="noopener noreferrer">
            Live Demo <ExternalLink aria-hidden="true" />
          </MagneticButton>
        </div>
      </TiltCard>
    </SectionReveal>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="eyebrow">Featured Projects</span>
          <h2>Premium demo websites for real business categories.</h2>
          <p>Five current flagship projects, captured from their homepages and presented with business context.</p>
        </SectionReveal>
        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreWork() {
  return (
    <section className="section more-work" id="more-work">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="eyebrow">Previous / More Work</span>
          <h2>Earlier builds restored into the full portfolio.</h2>
          <p>These projects remain part of the body of work and are included with live links and optimized previews.</p>
        </SectionReveal>
        <div className="more-work-grid">
          {moreProjects.map((project, index) => (
            <ProjectCard project={project} index={index} compact key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="section proof" id="proof">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="eyebrow">Why Choose Me</span>
          <h2>Built with the details real business websites need.</h2>
        </SectionReveal>
        <div className="proof-grid">
          {proofCards.map(([title, description, Icon], index) => (
            <SectionReveal key={title} delay={index * 0.025}>
              <article className="proof-card glass-card">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="eyebrow">Process</span>
          <h2>A clear delivery flow from idea to launch.</h2>
        </SectionReveal>
        <ol className="timeline">
          {process.map(([title, description], index) => (
            <SectionReveal key={title} delay={index * 0.035}>
              <li className="glass-card">
                <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container skills-layout">
        <SectionReveal className="section-head left">
          <span className="eyebrow">Skills</span>
          <h2>Design, frontend and performance working together.</h2>
          <p>The portfolio stays focused on what helps a business website feel trustworthy, load quickly and convert interest into conversations.</p>
        </SectionReveal>
        <div className="skill-grid">
          {skills.map(([name, value], index) => (
            <SectionReveal className="skill-item glass-card" key={name} delay={index * 0.02}>
              <div>
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>
              <m.span
                className="skill-track"
                initial={{ "--skill": "0%" }}
                whileInView={{ "--skill": `${value}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", businessType: "", whatsapp: "", message: "" });
  const [errors, setErrors] = useState({});
  const businessTypes = ["Coaching", "Travel", "Real Estate", "Marquee", "Catering", "Clinic", "Salon", "Business Website"];

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.businessType) nextErrors.businessType = "Please choose a business type.";
    if (form.whatsapp.replace(/[^0-9+]/g, "").length < 10) nextErrors.whatsapp = "Please enter a valid WhatsApp number.";
    if (!form.message.trim()) nextErrors.message = "Please enter a short message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const text = [
      "Hello Anas, I saw your premium portfolio and want to discuss a website.",
      `Name: ${form.name}`,
      `Business type: ${form.businessType}`,
      `WhatsApp: ${form.whatsapp}`,
      `Message: ${form.message}`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setForm({ name: "", businessType: "", whatsapp: "", message: "" });
  }

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Anas, I saw your portfolio and want to discuss a premium website for my business.")}`;

  return (
    <section className="section contact" id="contact">
      <div className="container contact-layout">
        <SectionReveal className="contact-copy">
          <span className="availability"><CalendarCheck aria-hidden="true" /> Available for new websites</span>
          <h2>Ready to turn your business into a premium website?</h2>
          <p>Send your business type, goals and any reference website. I will help shape the right structure before development starts.</p>
          <div className="contact-actions">
            <MagneticButton href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp <MessageCircle aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="mailto:anusaniq965@gmail.com" variant="ghost">
              Email Me <Mail aria-hidden="true" />
            </MagneticButton>
          </div>
          <ul className="contact-links">
            <li><Github aria-hidden="true" /><a href="https://github.com/anasraza9898" target="_blank" rel="noopener noreferrer">github.com/anasraza9898</a></li>
            <li><Store aria-hidden="true" /><a href="https://www.instagram.com/anas__memon55/" target="_blank" rel="noopener noreferrer">@anas__memon55</a></li>
          </ul>
        </SectionReveal>

        <SectionReveal className="contact-card glass-card" delay={0.08}>
          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <label>
                <span>Name</span>
                <input name="name" value={form.name} onChange={updateField} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                {errors.name && <em>{errors.name}</em>}
              </label>
              <label>
                <span>Business type</span>
                <select name="businessType" value={form.businessType} onChange={updateField} aria-invalid={Boolean(errors.businessType)}>
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.businessType && <em>{errors.businessType}</em>}
              </label>
              <label>
                <span>WhatsApp number</span>
                <input name="whatsapp" value={form.whatsapp} onChange={updateField} inputMode="tel" autoComplete="tel" placeholder="03XXXXXXXXX" aria-invalid={Boolean(errors.whatsapp)} />
                {errors.whatsapp && <em>{errors.whatsapp}</em>}
              </label>
              <label>
                <span>Project message</span>
                <textarea name="message" value={form.message} onChange={updateField} rows="4" aria-invalid={Boolean(errors.message)} />
                {errors.message && <em>{errors.message}</em>}
              </label>
            </div>
            <button className="btn btn-primary form-button" type="submit">
              Send via WhatsApp <ArrowRight aria-hidden="true" />
            </button>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="brand footer-brand">
          <span className="brand-mark" aria-hidden="true">AM</span>
          <span>Anas Memon</span>
        </div>
        <p>Premium AI-assisted websites for real businesses.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}

function StructuredData() {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Anas Memon - Premium AI Website Agency",
    url: "https://anasraza9898.github.io/anas-protfolio/",
    areaServed: "Pakistan",
    serviceType: [
      "Coaching Websites",
      "Travel Websites",
      "Real Estate Websites",
      "Marquee Websites",
      "Catering Websites",
      "Clinic Websites",
      "Salon Websites",
      "Business Websites",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Portfolio projects",
      itemListElement: allProjects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        url: project.url,
        genre: project.industry,
      })),
    },
    sameAs: [
      "https://github.com/anasraza9898",
      "https://www.instagram.com/anas__memon55/",
    ],
  }), []);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <StructuredData />
      <a className="skip-link" href="#main">Skip to main content</a>
      <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <Header />
      <m.main
        id="main"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <StatsStrip />
        <Services />
        <Projects />
        <MoreWork />
        <Proof />
        <Process />
        <Skills />
        <Contact />
      </m.main>
      <Footer />
    </LazyMotion>
  );
}
