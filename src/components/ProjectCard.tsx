import { Code2, Gamepad2 } from "lucide-react";
import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], string> = {
  shipped: "bg-accent text-accent-foreground",
  "in-progress": "bg-foreground text-background",
  upcoming: "bg-card text-foreground border-2 border-foreground",
};

const statusLabels: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In Progress",
  upcoming: "Coming Soon",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-card border-2 border-foreground rounded-2xl overflow-hidden shadow-brutal shadow-brutal-hover flex flex-col">
      <div className="relative aspect-[16/8.5] overflow-hidden border-b-2 border-foreground bg-secondary">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${statusStyles[project.status]}`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-bold mb-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 leading-snug line-clamp-2 flex-1">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
          <span className="px-2 py-0.5 bg-secondary rounded-full">{project.engine}</span>
          <span className="px-2 py-0.5 bg-secondary rounded-full">{project.year}</span>
        </div>

        {(project.github || project.itch) && (
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium border-2 border-foreground rounded-full bg-card hover:bg-secondary transition-colors"
              >
                <Code2 size={14} /> GitHub
              </a>
            )}
            {project.itch && (
              <a
                href={project.itch}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium border-2 border-foreground rounded-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <Gamepad2 size={14} /> itch.io
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
