import { useEffect, useRef } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aaditya's Portfolio" },
      { name: "description", content: "Aaditya Yadav — Indie game developer portfolio." },
      { name: "author", content: "Aaditya Yadav" },
      { property: "og:title", content: "Aaditya's Portfolio" },
      { property: "og:description", content: "Indie game developer portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <CursorFollower />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

function CursorFollower() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      currentX.current += (targetX.current - currentX.current) * 0.18;
      currentY.current += (targetY.current - currentY.current) * 0.18;

      wrapper.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      frameRef.current = window.requestAnimationFrame(update);
    };

    const handleMove = (event: PointerEvent) => {
      targetX.current = event.clientX;
      targetY.current = event.clientY;
      wrapper.style.opacity = "1";
    };

    const handleDown = () => {
      wrapper.dataset.active = "true";
    };

    const handleUp = () => {
      wrapper.dataset.active = "false";
    };

    const handleLeave = () => {
      wrapper.style.opacity = "0";
    };

    const handleEnter = () => {
      wrapper.style.opacity = "1";
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    frameRef.current = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      data-active="false"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden opacity-0 transition-opacity duration-200 md:block"
      style={{ willChange: "transform" }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-6px] scale-125 bg-yellow-300/35 blur-lg" />
        <div
          className="h-8 w-8 border-[2.5px] border-yellow-300 bg-yellow-200/20 backdrop-blur-[3px] shadow-[0_0_18px_rgba(253,224,71,0.55)] transition-transform duration-150"
          style={{
            clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
            transform: "rotate(12deg)",
          }}
        />
        <div
          className="absolute inset-[7px] border border-yellow-100 opacity-90"
          style={{
            clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
          }}
        />
      </div>
    </div>
  );
}
