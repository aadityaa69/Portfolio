import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import avatarImg from "@/assets/avatar.jpeg";

const links = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "upcoming", label: "Upcoming" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const nextProgress = Math.min(window.scrollY / 140, 1);
      setScrollProgress(nextProgress);
      const scrollY = window.scrollY + window.innerHeight / 2;
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= scrollY) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrolled = scrollProgress > 0.08;

  return (
    <header className="sticky top-4 z-50 px-4">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 z-0 transition-[transform] duration-700 ease-out"
        style={{ top: 0 }}
      >
        <div
          className="h-28 bg-background/12 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * -10}px)`,
          }}
        />
      </div>

      <div className="relative isolate max-w-[52rem] mx-auto">
        <div
          className={`relative z-20 flex items-center justify-between border-2 border-foreground rounded-full pl-3 pr-3 py-2.5 shadow-brutal transition-[background-color,box-shadow] duration-300 ease-out ${
            scrolled ? "bg-card/85" : "bg-card/95"
          }`}
        >
          <button
            onClick={() => go("home")}
            className="flex items-center gap-3 pr-3"
          >
            <img
              src={avatarImg}
              alt="Aaditya"
              width={42}
              height={42}
              className="w-[42px] h-[42px] rounded-full border-2 border-foreground object-cover"
            />
            <span className="font-serif text-xl font-bold tracking-tight hidden sm:inline">
              aaditya<span className="text-accent">.</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1.5 text-base">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  active === l.id
                    ? "bg-foreground text-background"
                    : "hover:bg-secondary"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden md:inline-flex items-center gap-2 px-[18px] py-2 text-base bg-accent text-accent-foreground border-2 border-foreground rounded-full font-medium"
          >
            <FileText size={16} /> Resume
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2.5 rounded-full hover:bg-secondary"
            aria-label="Menu"
          >
            <div className="w-[22px] flex flex-col gap-1">
              <span className={`h-0.5 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-foreground transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <div
            className={`relative z-20 md:hidden mt-2 border-2 border-foreground rounded-2xl p-2.5 shadow-brutal transition-colors duration-300 ease-out ${
              scrolled ? "bg-card/90" : "bg-card"
            }`}
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-base ${
                  active === l.id ? "bg-foreground text-background" : "hover:bg-secondary"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 px-4 py-2.5 mt-1 text-base bg-accent text-accent-foreground rounded-xl font-medium"
            >
              <FileText size={16} /> Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
