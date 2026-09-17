import { ProgramAccordion } from "@/components/ui/program-accordion";
import { site } from "@/data/site";

export function OnStage() {
  const { program } = site;
  return (
    <section id="em-cena" aria-labelledby="em-cena-title" className="grain relative bg-coxia py-20 md:py-28">
      <div className="mx-auto max-w-[82rem] px-[var(--gutter)]">
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
          <h2 id="em-cena-title" className="font-display text-[clamp(3rem,1.6rem+5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.015em] md:col-span-5">
            {program.heading}
          </h2>
          <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-fumo md:col-span-6 md:col-start-7 md:pb-2">
            {program.intro}
          </p>
        </div>
        <ProgramAccordion items={program.items} />
      </div>
    </section>
  );
}
