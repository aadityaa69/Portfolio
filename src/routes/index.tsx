import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, Camera, Code2, Gamepad2, Mail, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import avatarImg from "@/assets/avatar.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aaditya's Portfolio - Game Developer" },
      {
        name: "description",
        content: "Aaditya Yadav - indie game developer working in Unity, Unreal & Godot.",
      },
      { property: "og:title", content: "Aaditya's Portfolio" },
      { property: "og:description", content: "Indie game developer portfolio." },
    ],
  }),
  component: Index,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "A bit more please").max(1000),
});

const socials = [
  { label: "Instagram", handle: "@_aadityaaa14", href: "https://www.instagram.com/_aadityaaa14/", Icon: Camera },
  { label: "Discord", handle: "de_batman.", href: "https://discord.gg/s4fFRZDYMY", Icon: MessageCircle },
  { label: "itch.io", handle: "h3rcules-07.itch.io", href: "https://h3rcules-07.itch.io/", Icon: Gamepad2 },
  { label: "GitHub", handle: "aadityaa69", href: "https://github.com/aadityaa69", Icon: Code2 },
  { label: "Email", handle: "aadityaa0069@gmail.com", href: "mailto:aadityaa0069@gmail.com", Icon: Mail },
];

function Index() {
  const shipped = projects.filter((p) => p.status === "shipped");
  const upcoming = projects.filter((p) => p.status !== "shipped").slice(0, 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <Hero />
        <ProjectsSection shipped={shipped} />
        <UpcomingSection upcoming={upcoming} />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="max-w-5xl mx-auto px-6 pt-16 pb-20 scroll-mt-28">
      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-medium border-2 border-foreground rounded-full bg-accent text-accent-foreground">
            <Sparkles size={12} /> Open for collabs - 2025
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
            Hey, I'm Aaditya. I make games.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Indie dev building tight loops, weird mechanics, and shaders that go <em>woosh</em> - in Unity, Unreal & Godot.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-foreground text-background font-medium rounded-full border-2 border-foreground shadow-brutal shadow-brutal-hover"
            >
              See my work -&gt;
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-card text-foreground font-medium rounded-full border-2 border-foreground shadow-brutal shadow-brutal-hover"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative justify-self-center md:justify-self-end">
          <div className="absolute -inset-2 bg-accent rounded-full -z-10 blur-2xl opacity-50" />
          <img
            src={avatarImg}
            alt="Aaditya Yadav"
            width={220}
            height={220}
            className="w-44 h-44 md:w-56 md:h-56 rounded-full border-2 border-foreground object-cover shadow-brutal-lg"
          />
          <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-card border-2 border-foreground rounded-full text-xs font-medium shadow-brutal">
            hi!
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          ["1", "Years"],
          ["1", "Games made"],
        ].map(([n, l]) => (
          <div
            key={l}
            className="border-2 border-foreground rounded-2xl bg-card p-4 shadow-brutal"
          >
            <div className="font-serif text-3xl font-bold">{n}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ shipped }: { shipped: typeof projects }) {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-28">
      <SectionHeader eyebrow="01 - Work" title="Shipped" />
      <div className="grid md:grid-cols-2 gap-6">
        {shipped.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function UpcomingSection({ upcoming }: { upcoming: typeof projects }) {
  const project = upcoming[0];

  if (!project) return null;

  return (
    <section id="upcoming" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-28">
      <SectionHeader eyebrow="02 - Workbench" title="Upcoming" />
      <article className="grid overflow-hidden rounded-3xl border-2 border-foreground bg-card shadow-brutal md:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[260px] border-b-2 border-foreground bg-secondary md:min-h-full md:border-b-0 md:border-r-2">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col p-6 md:p-7">
          <div className="inline-flex w-fit items-center rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
            {project.status === "in-progress" ? "In Progress" : "Upcoming"}
          </div>
          <h3 className="mt-4 font-serif text-3xl font-bold">{project.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-secondary px-2.5 py-1">{project.engine}</span>
            <span className="rounded-full bg-secondary px-2.5 py-1">{project.year}</span>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-medium shadow-brutal shadow-brutal-hover transition-colors hover:bg-secondary"
              >
                <Code2 size={16} /> GitHub
              </a>
            )}
            {project.itch && (
              <a
                href={project.itch}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-brutal shadow-brutal-hover transition-opacity hover:opacity-90"
              >
                <Gamepad2 size={16} /> itch.io
              </a>
            )}
            {!project.github && !project.itch && (
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-medium shadow-brutal shadow-brutal-hover transition-colors hover:bg-secondary"
              >
                <ArrowUpRight size={16} /> Ask about it
              </a>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-28">
      <SectionHeader eyebrow="03 - About" title="About me & skills" />
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-foreground/90 leading-relaxed">
          <p>
            I started learning game development in <span className="font-medium">2023</span>.
            Right now I mainly work with <span className="font-medium">Unreal</span>,
            <span className="font-medium"> Unity</span>, <span className="font-medium">C#</span>,
            and <span className="font-medium">C++</span>.
          </p>
          <p>
            My focus is building gameplay systems, improving my programming skills, and
            turning what I learn into playable projects.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {[
              ["Unreal Engine", "Main engine"],
              ["Unity", "Secondary engine"],
              ["C#", "Gameplay scripting"],
              ["C++", "Core programming"],
            ].map(([name, label]) => (
              <div
                key={name}
                className="border-2 border-foreground rounded-2xl bg-card px-4 py-3 shadow-brutal"
              >
                <div className="font-medium">{name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-foreground rounded-3xl bg-card p-5 shadow-brutal">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
            Progress
          </div>
          <ol className="border-l-2 border-foreground pl-6 space-y-5">
            {[
              ["2023", "Started learning game development and the basics of engines and programming."],
              ["2024", "Learned more seriously and built small projects to practice workflow and gameplay."],
              ["2025", "Started making bigger projects and focusing more on real game development."],
            ].map(([year, text]) => (
              <li key={year} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent border-2 border-foreground" />
                <div className="font-serif text-xl font-bold">{year}</div>
                <p className="text-muted-foreground text-sm">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailFeedback, setEmailFeedback] = useState<"copied" | "failed" | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("_subject", `Portfolio message from ${form.name}`);
      formData.set("_replyto", form.email);

      const response = await fetch("https://formsubmit.co/ajax/aadityaa0069@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrors({
        form: "Could not send right now. Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aadityaa0069@gmail.com");
      setEmailFeedback("copied");
      window.setTimeout(() => setEmailFeedback(null), 2000);
    } catch {
      setEmailFeedback("failed");
      window.setTimeout(() => setEmailFeedback(null), 2000);
    }
  };

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-28">
      <SectionHeader eyebrow="04 - Contact" title="Say hi" />
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {sent ? (
            <div className="border-2 border-foreground rounded-2xl p-8 bg-accent text-accent-foreground shadow-brutal text-center">
              <Sparkles className="mx-auto mb-3" size={32} />
              <h3 className="font-serif text-2xl font-bold mb-2">Message sent!</h3>
              <p className="opacity-80">Talk soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Name" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 border-2 border-foreground rounded-xl bg-card text-foreground focus:outline-none focus:shadow-brutal transition-shadow"
                  placeholder="Your name"
                  maxLength={100}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 border-2 border-foreground rounded-xl bg-card text-foreground focus:outline-none focus:shadow-brutal transition-shadow"
                  placeholder="you@studio.com"
                  maxLength={255}
                />
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2.5 border-2 border-foreground rounded-xl bg-card text-foreground focus:outline-none focus:shadow-brutal transition-shadow resize-none"
                  placeholder="What's on your mind?"
                  maxLength={1000}
                />
              </Field>
              <input type="hidden" name="_subject" value={`Portfolio message from ${form.name || "visitor"}`} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 bg-foreground text-background font-medium rounded-full border-2 border-foreground shadow-brutal shadow-brutal-hover"
              >
                {sending ? "Sending..." : "Send ->"}
              </button>
            </form>
          )}
        </div>

        <aside className="md:col-span-2 space-y-3">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Elsewhere
          </div>
          {socials.map((s) => (
            s.label === "Email" ? (
              <div key={s.label}>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex w-full items-center gap-3 border-2 border-foreground rounded-xl px-4 py-3 bg-card shadow-brutal-hover group text-left"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-accent-foreground border-2 border-foreground">
                    <s.Icon size={16} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-sm">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">{s.handle}</span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Copy
                  </span>
                </button>
                {emailFeedback && (
                  <p className="mt-2 px-1 text-xs text-muted-foreground">
                    {emailFeedback === "copied"
                      ? "Email copied to clipboard."
                      : "Could not copy automatically."}
                  </p>
                )}
              </div>
            ) : (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 border-2 border-foreground rounded-xl px-4 py-3 bg-card shadow-brutal-hover group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-accent-foreground border-2 border-foreground">
                  <s.Icon size={16} />
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-sm">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">{s.handle}</span>
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            )
          ))}
        </aside>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {eyebrow}
      </div>
      <h2 className="font-serif text-4xl font-bold">{title}</h2>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium">{label}</span>
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>
      {children}
    </label>
  );
}
