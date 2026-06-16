import { useState } from "react";
import { ArrowLeft, Mail, Send } from "lucide-react"
import { BrandMark } from "./BrandMark";
import { legalUpdatedDate, privacyPolicy, supportEmail, termsOfUse } from "./legalContent";

export const legalPages = {
  privacy: privacyPolicy,
  terms: termsOfUse,
};

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="hero-grid border-b border-ink/10 px-5 pb-16 pt-36 dark:border-white/10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:border-punch/50 dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          <ArrowLeft size={16} strokeWidth={2.8} />
          Home
        </a>
        <p className="mt-10 text-sm font-black uppercase tracking-[0.22em] text-punch">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-balance text-5xl font-black uppercase leading-none text-ink dark:text-white sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-ink/70 dark:text-white/70">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function LegalHeader({ eyebrow, title, subtitle }) {
	return (
		<section className="border-b border-ink/10 bg-white px-5 pb-10 pt-32 dark:border-white/10 dark:bg-coal sm:px-8">
			<div className="mx-auto max-w-3xl">
				<a
					href="/"
					className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition hover:text-ink dark:text-white/60 dark:hover:text-white"
				>
					<ArrowLeft size={16} strokeWidth={2.2} />
					Back to home
				</a>
				<p className="mt-10 text-sm font-medium text-ink/55 dark:text-white/50">
					{eyebrow}
				</p>
				<h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink dark:text-white sm:text-5xl">
					{title}
				</h1>
				<p className="mt-5 text-base leading-7 text-ink/70 dark:text-white/65">
					{subtitle}
				</p>
			</div>
		</section>
	)
}

function LegalSection({ section }) {
  return (
		<section className="border-t border-ink/10 py-8 dark:border-white/10">
			<h2 className="text-xl font-semibold tracking-normal text-ink dark:text-white">
				{section.title}
			</h2>
			{section.body?.map((paragraph) => (
				<p
					key={paragraph}
					className="mt-4 text-base leading-8 text-ink/75 dark:text-white/70"
				>
					{paragraph}
				</p>
			))}
			{section.bullets ? (
				<ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-8 text-ink/75 dark:text-white/70">
					{section.bullets.map((item) => (
						<li key={item} className="pl-1">
							{item}
						</li>
					))}
				</ul>
			) : null}
		</section>
	)
}

export function LegalPage({ page }) {
	return (
		<>
			<LegalHeader
				eyebrow={page.eyebrow}
				title={page.title}
				subtitle={page.subtitle}
			/>
			<main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
				<div className="pb-8">
					{page.intro.map((paragraph, index) => (
						<p
							key={paragraph}
							className={
								index === 0
									? "text-sm font-medium text-ink/60 dark:text-white/55"
									: "mt-4 text-base leading-8 text-ink/75 dark:text-white/70"
							}
						>
							{paragraph}
						</p>
					))}
				</div>
				{page.sections.map((section) => (
					<LegalSection key={section.title} section={section} />
				))}
			</main>
		</>
	)
}

export function ContactPage() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "Support").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Beat It ${topic}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Topic: ${topic}`, "", message].join("\n");

    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app. The message is not sent until you send it from your email client.");
  }

  return (
		<>
			<PageHeader
				eyebrow="Support"
				title="Contact"
				subtitle={`Need help with Beat It, subscriptions, account deletion, privacy, or store review questions? Email ${supportEmail}.`}
			/>
			<main className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
				<aside className="rounded-[2rem] bg-ink p-7 text-white shadow-hard dark:bg-white dark:text-coal">
					<span className="grid size-12 place-items-center rounded-2xl bg-punch text-white">
						<Mail size={24} strokeWidth={2.8} />
					</span>
					<h2 className="mt-6 text-3xl font-black">Support email</h2>
					<a
						className="mt-3 block text-xl font-black text-punch"
						href={`mailto:${supportEmail}`}
					>
						{supportEmail}
					</a>
					<p className="mt-6 text-base font-semibold leading-8 text-white/70 dark:text-coal/70">
						This form opens a prefilled email draft. No message is sent until
						you send it from your email app.
					</p>
				</aside>

				<form
					onSubmit={handleSubmit}
					className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-hard dark:border-white/10 dark:bg-white/10 dark:shadow-hard-dark sm:p-8"
				>
					<div className="grid gap-5 sm:grid-cols-2">
						<label className="grid gap-2 text-sm font-black uppercase tracking-[0.16em] text-ink/60 dark:text-white/60">
							Name
							<input
								required
								name="name"
								autoComplete="name"
								className="h-14 rounded-2xl border border-ink/10 bg-white px-4 text-base font-bold normal-case tracking-normal text-ink outline-none transition focus:border-punch dark:border-white/10 dark:bg-coal dark:text-white"
								placeholder="Your name"
							/>
						</label>
						<label className="grid gap-2 text-sm font-black uppercase tracking-[0.16em] text-ink/60 dark:text-white/60">
							Email
							<input
								required
								name="email"
								type="email"
								autoComplete="email"
								className="h-14 rounded-2xl border border-ink/10 bg-white px-4 text-base font-bold normal-case tracking-normal text-ink outline-none transition focus:border-punch dark:border-white/10 dark:bg-coal dark:text-white"
								placeholder="you@example.com"
							/>
						</label>
					</div>
					<label className="mt-5 grid gap-2 text-sm font-black uppercase tracking-[0.16em] text-ink/60 dark:text-white/60">
						Topic
						<select
							name="topic"
							className="h-14 rounded-2xl border border-ink/10 bg-white px-4 text-base font-bold normal-case tracking-normal text-ink outline-none transition focus:border-punch dark:border-white/10 dark:bg-coal dark:text-white"
						>
							<option>Support</option>
							<option>Subscription</option>
							<option>Account deletion</option>
							<option>Privacy request</option>
							<option>Store review</option>
						</select>
					</label>
					<label className="mt-5 grid gap-2 text-sm font-black uppercase tracking-[0.16em] text-ink/60 dark:text-white/60">
						Message
						<textarea
							required
							name="message"
							rows={8}
							className="resize-y rounded-2xl border border-ink/10 bg-white px-4 py-4 text-base font-bold normal-case tracking-normal text-ink outline-none transition focus:border-punch dark:border-white/10 dark:bg-coal dark:text-white"
							placeholder="Tell us what you need help with."
						/>
					</label>
					{status ? (
						<p className="mt-5 rounded-2xl bg-emerald-500/10 p-4 text-sm font-black text-emerald-700 dark:text-emerald-300">
							{status}
						</p>
					) : null}
					<button
						type="submit"
						className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-punch px-7 text-base font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-red-500/25 transition hover:-translate-y-1 sm:w-auto"
					>
						<Send size={19} strokeWidth={2.8} />
						Open email draft
					</button>
				</form>
			</main>
		</>
	)
}

export function Footer() {
  return (
		<footer className="border-t border-ink/10 bg-white px-5 py-10 dark:border-white/10 dark:bg-coal sm:px-8">
			<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
				<div>
					<a
						href="/"
						className="inline-flex items-center gap-3"
						aria-label="Beat It home"
					>
						<BrandMark size="sm" />
						<span className="text-base font-black uppercase tracking-[0.22em] text-ink dark:text-white">
							Beat It
						</span>
					</a>
					<p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-ink/60 dark:text-white/60">
						Workout planning, set tracking, progress check-ins, and AI-assisted
						training tools. Beat It is not medical advice.
					</p>
				</div>
				<nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-black uppercase tracking-[0.16em] text-ink/60 dark:text-white/60">
					<a className="transition hover:text-punch" href="/privacy/">
						Privacy
					</a>
					<a className="transition hover:text-punch" href="/terms/">
						Terms
					</a>
					<a className="transition hover:text-punch" href="/contact/">
						Contact
					</a>
				</nav>
				<p className="text-xs font-black uppercase tracking-[0.18em] text-ink/40 dark:text-white/35 lg:col-span-2">
					© 2026 Buildit Studio. All rights reserved.
				</p>
			</div>
		</footer>
	)
}
