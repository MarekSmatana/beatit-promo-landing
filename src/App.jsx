import { useMemo, useState } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Menu,
  PlayCircle,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { featureSections, pillars, screenshots } from "./data"
import { ContactPage, Footer, LegalPage, legalPages } from "./LegalPages";
import { ThemeToggle, useTheme } from "./theme";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const downloadLinks = [
  {
    href: "https://apps.apple.com/app/id6778069102",
    alt: "Download on App Store",
    darkSrc: "/badges/app-store-light.svg",
    lightSrc: "/badges/app-store-dark.svg",
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.builditstudio.beatit",
    alt: "Get it on Google Play",
    darkSrc: "/badges/google-play-light.svg",
    lightSrc: "/badges/google-play-dark.svg",
  },
];

const appStoreUrl = downloadLinks[0].href;
const googlePlayUrl = downloadLinks[1].href;

function openDeviceDownload() {
  if (typeof window === "undefined") return;

  const userAgent = window.navigator.userAgent || "";
  const isIpadOs =
    window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;

  if (/android/i.test(userAgent)) {
    window.location.href = googlePlayUrl;
    return;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) || isIpadOs) {
    window.location.href = appStoreUrl;
    return;
  }

  const downloadSection = document.getElementById("download");
  if (downloadSection) {
    downloadSection.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.location.href = "/#download";
}

function Nav({ dark, setDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleDeviceDownload(event) {
    event.preventDefault();
    openDeviceDownload();
    setMobileMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-coal/70">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Beat It home">
          <BrandMark withShadow />
          <span className="text-lg font-black uppercase tracking-[0.22em] text-ink dark:text-white">
            Beat It
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-black uppercase tracking-[0.16em] text-ink/60 dark:text-white/60 md:flex">
          <a className="transition hover:text-punch" href="/#features">
            Features
          </a>
          <a className="transition hover:text-punch" href="/#screens">
            Screens
          </a>
          <a className="transition hover:text-punch" href="/#download">
            Download
          </a>
        </div>
        <div className="hidden md:block">
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/#download"
            onClick={handleDeviceDownload}
            className="grid size-11 place-items-center rounded-full border border-ink/10 bg-punch text-white shadow-sm transition dark:border-white/10"
            aria-label="Download Beat It"
          >
            <Download size={19} strokeWidth={2.8} />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border border-ink/10 bg-white/80 text-ink shadow-sm transition dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X size={21} strokeWidth={2.8} />
            ) : (
              <Menu size={21} strokeWidth={2.8} />
            )}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-ink/10 bg-white/95 px-5 py-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-coal/95 md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-3 text-sm font-black uppercase tracking-[0.16em] text-ink/70 dark:text-white/70">
            <a
              className="rounded-2xl px-4 py-3 transition hover:bg-ink/5 hover:text-punch dark:hover:bg-white/10"
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              className="rounded-2xl px-4 py-3 transition hover:bg-ink/5 hover:text-punch dark:hover:bg-white/10"
              href="/#screens"
              onClick={() => setMobileMenuOpen(false)}
            >
              Screens
            </a>
            <a
              className="rounded-2xl px-4 py-3 transition hover:bg-ink/5 hover:text-punch dark:hover:bg-white/10"
              href="/#download"
              onClick={() => setMobileMenuOpen(false)}
            >
              Download
            </a>
            <div className="mt-2 px-4">
              <ThemeToggle dark={dark} setDark={setDark} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function StoreBadgeLinks({ dark, align = "center" }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 sm:flex-row",
        align === "start" && "lg:justify-start",
      )}
    >
      {downloadLinks.map((link) => (
        <motion.a
          key={link.alt}
          href={link.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block rounded-md focus:outline-none focus:ring-2 focus:ring-punch focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-coal"
          aria-label={link.alt}
        >
          <img
            src={dark ? link.darkSrc : link.lightSrc}
            alt={link.alt}
            className="h-12 w-auto"
          />
        </motion.a>
      ))}
    </div>
  );
}

function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : -70]);
  const rotate = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : -3]);

  return (
    <motion.div
      className="relative mx-auto h-[560px] w-full max-w-[660px] sm:h-[680px] lg:h-[760px]"
      style={{ y, rotate }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-0 bottom-3 h-[64%] rounded-[3rem] bg-punch shadow-hard dark:shadow-hard-dark"
        initial={{ scaleX: 0.78, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ clipPath: "polygon(6% 10%, 100% 0, 92% 100%, 0 92%)" }}
      />
      <motion.img
        src="/screens/7.png"
        alt=""
        className="absolute left-0 top-12 w-[38%] rounded-[2rem] border border-ink/10 shadow-hard dark:border-white/10 dark:shadow-hard-dark"
        initial={{ x: -90, rotate: -9, opacity: 0 }}
        animate={{ x: 0, rotate: -7, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.img
        src="/screens/1.png"
        alt=""
        className="absolute left-[25%] top-2 z-10 w-[46%] rounded-[2rem] border border-ink/10 shadow-hard dark:border-white/10 dark:shadow-hard-dark"
        initial={{ y: 90, rotate: 7, opacity: 0 }}
        animate={{ y: 0, rotate: 5, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.img
        src="/screens/5.png"
        alt=""
        className="absolute right-0 top-24 z-20 w-[45%] rounded-[2rem] border border-ink/10 shadow-hard dark:border-white/10 dark:shadow-hard-dark"
        initial={{ x: 90, rotate: 13, opacity: 0 }}
        animate={{ x: 0, rotate: 10, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute bottom-16 left-6 z-30 rounded-3xl border border-white/35 bg-white/80 p-4 shadow-hard backdrop-blur dark:border-white/10 dark:bg-coal/80 dark:shadow-hard-dark"
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.55 }}
      >
        <p className="text-xs font-black uppercase tracking-[0.22em] text-punch">Today</p>
        <p className="mt-1 text-2xl font-black text-ink dark:text-white">Beat yesterday</p>
      </motion.div>
    </motion.div>
  );
}

function Hero({ dark }) {
  return (
    <section
      id="top"
      className="hero-grid relative isolate overflow-hidden pt-24"
    >
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-coal" />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-balance text-6xl font-black uppercase leading-[0.86] tracking-normal text-ink dark:text-white sm:text-7xl lg:text-8xl"
          >
            Play workouts.
            <span className="block text-punch">Track progress.</span>
            Train smarter.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-ink/70 dark:text-white/70 sm:text-xl"
          >
            Beat It turns workout generation, set-by-set execution, streaks,
            body check-ins, and AI analysis into one fast training cockpit.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="/#download"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-punch px-7 text-base font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-red-500/25 transition hover:-translate-y-1"
            >
              <Download size={20} strokeWidth={2.8} />
              Get the app
              <ArrowRight
                size={19}
                className="transition group-hover:translate-x-1"
              />
            </a>
            <a
              href="/#screens"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-white px-7 text-base font-black uppercase tracking-[0.12em] text-ink transition hover:-translate-y-1 hover:border-punch/50 dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              <PlayCircle size={20} strokeWidth={2.8} />
              See screens
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6">
            <StoreBadgeLinks dark={dark} align="start" />
          </motion.div>
        </motion.div>
        <HeroVisual />
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="group rounded-[2rem] border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-hard dark:border-white/10 dark:bg-white/10 dark:hover:shadow-hard-dark"
            >
              <div className={cn("grid size-12 place-items-center rounded-2xl", item.color)}>
                <Icon size={23} strokeWidth={2.7} />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-punch">
                {item.label}
              </p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-ink dark:text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-ink/60 dark:text-white/60">
                {item.copy}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function ScreenRail() {
  const rail = useMemo(() => [...screenshots, ...screenshots], []);

  return (
		<section id="screens" className="overflow-hidden py-20">
			<div className="mx-auto mb-10 flex max-w-7xl flex-col justify-between gap-5 px-5 sm:px-8 lg:flex-row lg:items-end">
				<div>
					<p className="text-sm font-black uppercase tracking-[0.22em] text-punch">
						Screens
					</p>
					<h2 className="mt-3 max-w-3xl text-5xl font-black uppercase leading-none text-ink dark:text-white sm:text-6xl">
						Product shots that do the talking.
					</h2>
				</div>
			</div>
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-coal" />
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-coal" />
				<motion.div
					className="flex w-max gap-5 px-5"
					animate={{ x: ["0%", "-50%"] }}
					transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
				>
					{rail.map((item, index) => (
						<article
							key={`${item.src}-${index}`}
							className="w-[250px] shrink-0 rounded-[2rem] border border-ink/10 bg-white p-2 shadow-hard dark:border-white/10 dark:bg-white/10 dark:shadow-hard-dark sm:w-[310px]"
						>
							<img
								src={item.src}
								alt={item.title}
								className="aspect-[1242/2688] w-full rounded-[1.55rem] object-cover"
								loading="lazy"
							/>
							<div className="p-4">
								<p className="text-xs font-black uppercase tracking-[0.2em] text-punch">
									{item.eyebrow}
								</p>
								<h3 className="mt-1 text-lg font-black text-ink dark:text-white">
									{item.title}
								</h3>
							</div>
						</article>
					))}
				</motion.div>
			</div>
		</section>
	)
}

function FeatureSection({ feature, index }) {
  const Icon = feature.icon;
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          feature.reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-punch text-white shadow-lg shadow-red-500/25">
              <Icon size={22} strokeWidth={2.8} />
            </span>
            <span className="text-sm font-black uppercase tracking-[0.22em] text-punch">
              {feature.badge}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-2xl text-balance text-5xl font-black uppercase leading-none text-ink dark:text-white sm:text-6xl"
          >
            {feature.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-ink/70 dark:text-white/60"
          >
            {feature.body}
          </motion.p>
          <motion.ul variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {feature.points.map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3 text-sm font-black text-ink shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check size={15} strokeWidth={3} />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: feature.reverse ? 3 : -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: feature.reverse ? -1.5 : 1.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[440px]"
        >
          <div
            className={cn(
              "absolute inset-7 -z-10 rounded-[3rem] bg-punch",
              index % 2 === 0 ? "rotate-6" : "-rotate-6",
            )}
          />
          <img
            src={feature.image}
            alt={`${feature.badge} screen`}
            className="aspect-[1242/2688] w-full rounded-[2.3rem] border border-ink/10 bg-white object-cover shadow-hard dark:border-white/10 dark:shadow-hard-dark"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="overflow-hidden rounded-[2.5rem] bg-ink text-white shadow-hard dark:bg-white dark:text-coal dark:shadow-hard-dark">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65 }}
            className="p-7 sm:p-10 lg:p-14"
          >
            <p className="text-sm font-black uppercase tracking-[0.22em] text-punch">Positioning</p>
            <h2 className="mt-5 text-5xl font-black uppercase leading-none sm:text-6xl">
              A fitness app with a point of view.
            </h2>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/70 dark:text-coal/60">
              The landing page leans into the app's direct voice: play the workout, track the
              work, and keep beating yesterday.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[520px] overflow-hidden bg-punch lg:min-h-[660px]"
          >
            <img
              src="/screens/7.png"
              alt="Beat It brand promise"
              className="absolute left-1/2 top-8 w-[72%] max-w-[420px] -translate-x-1/2 rounded-[2rem] shadow-hard"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTA({ dark }) {
  return (
    <section
      id="download"
      className="relative overflow-hidden px-5 py-24 sm:px-8"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-punch" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.65 }}
        className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-ink/10 bg-white p-7 text-center shadow-hard dark:border-white/10 dark:bg-coal dark:shadow-hard-dark sm:p-12"
      >
        <p className="text-sm font-black uppercase tracking-[0.22em] text-punch">
          Beat It
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-black uppercase leading-none text-ink dark:text-white sm:text-7xl">
          Beat yesterday starts here.
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-5">
          <StoreBadgeLinks dark={dark} />
          <a
            href="/#top"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-ink px-7 text-base font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-1 dark:border-white/10 dark:bg-white dark:text-coal"
          >
            Back to top
            <ChevronDown size={20} className="rotate-180" strokeWidth={2.8} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

function LandingPage({ dark }) {
  return (
    <main>
      <Hero dark={dark} />
      <Pillars />
      <ScreenRail />
      {featureSections.map((feature, index) => (
        <FeatureSection
          key={feature.headline}
          feature={feature}
          index={index}
        />
      ))}
      {/* <Manifesto /> */}
      <CTA dark={dark} />
    </main>
  )
}

function getRouteKey() {
  if (typeof window === "undefined") {
    return "home";
  }

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/privacy") return "privacy";
  if (path === "/terms") return "terms";
  if (path === "/contact") return "contact";
  return "home";
}

function RoutedPage({ dark }) {
  const route = getRouteKey();
  if (route === "privacy") return <LegalPage page={legalPages.privacy} />;
  if (route === "terms") return <LegalPage page={legalPages.terms} />;
  if (route === "contact") return <ContactPage />;
  return <LandingPage dark={dark} />;
}

export default function App() {
  const [dark, setDark] = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-ink antialiased transition-colors duration-500 dark:bg-coal dark:text-white">
        <Nav dark={dark} setDark={setDark} />
        <RoutedPage dark={dark} />
        <Footer />
      </div>
    </MotionConfig>
  );
}
