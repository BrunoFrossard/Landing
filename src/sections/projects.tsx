import { ProjectGallery } from "@/components/project-gallery";
import type { Dictionary } from "@/i18n/types";

export function Projects({ copy, common }: { copy: Dictionary["projects"]; common: Dictionary["common"] }) {
  return <section id="projetos" className="projects section-pad" aria-labelledby="projects-title">
    <div className="section-heading container"><div><p className="eyebrow">{copy.label}</p><h2 id="projects-title">{copy.title} <em>{copy.emphasis}</em></h2></div><p className="section-description">{copy.intro}</p></div>
    <ProjectGallery copy={copy} common={common} />
    <p className="project-transparency container">{copy.note}</p>
  </section>;
}
