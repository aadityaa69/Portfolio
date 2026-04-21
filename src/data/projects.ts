import neonDriftImg from "@/assets/proj-neon-drift.jpg";
import hollowKeepImg from "@/assets/proj-hollow-keep.jpg";
import deepSignalImg from "@/assets/proj-deep-signal.jpg";
import paperKnightsImg from "@/assets/proj-paper-knights.jpg";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: "shipped" | "in-progress" | "upcoming";
  year: string;
  engine: string;
  tags: string[];
  image: string;
  github?: string;
  itch?: string;
};

export const projects: Project[] = [
  {
    slug: "neon-drift",
    title: "Neon Drift",
    tagline: "Synthwave arcade racer with hand-tuned drift physics.",
    status: "shipped",
    year: "2024",
    engine: "Unity",
    tags: ["Racing", "Arcade"],
    image: neonDriftImg,
    github: "https://github.com",
    itch: "https://itch.io",
  },
  {
    slug: "hollow-keep",
    title: "Hollow Keep",
    tagline: "Cozy roguelike about a lantern, a cat, and a haunted castle.",
    status: "shipped",
    year: "2023",
    engine: "Godot",
    tags: ["Roguelike", "Pixel Art"],
    image: hollowKeepImg,
    github: "https://github.com",
    itch: "https://itch.io",
  },
  {
    slug: "deep-signal",
    title: "Deep Signal",
    tagline: "Submarine survival horror told entirely through sonar.",
    status: "in-progress",
    year: "2025",
    engine: "Unreal 5",
    tags: ["Horror", "Audio-first"],
    image: deepSignalImg,
    github: "https://github.com",
  },
  {
    slug: "paper-knights",
    title: "Paper Knights",
    tagline: "Co-op tactics game where every unit is folded origami.",
    status: "upcoming",
    year: "2026",
    engine: "Godot",
    tags: ["Tactics", "Co-op"],
    image: paperKnightsImg,
  },
];

export const skills = [
  { name: "Unity / C#", level: "Expert" },
  { name: "Unreal / C++", level: "Advanced" },
  { name: "Godot / GDScript", level: "Advanced" },
  { name: "Shader Programming", level: "Advanced" },
  { name: "Gameplay Systems", level: "Expert" },
  { name: "Procedural Generation", level: "Advanced" },
  { name: "Pixel Art & Animation", level: "Intermediate" },
  { name: "Sound Design", level: "Intermediate" },
];
