import { ArchBulbs, DecoStar } from "@/components/ornaments";
import { site } from "@/data/site";

/**
 * A nova casa: só dados divulgados, montados como o letreiro do palco.
 * Nenhuma imagem da casa nova, planta ou detalhe arquitetônico é inventado.
 */
export function NewHouse() {
  const { house, address } = site;
  return (
    <section id="nova-casa" aria-labelledby="nova-casa-title" className="grain relative bg-coxia py-20 md:py-28">
      <div className="mx-auto grid max-w-[82rem] items-end gap-12 px-[var(--gutter)] xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-5 xl:pb-6">
          <h2 id="nova-casa-title" className="font-display text-[clamp(2.25rem,1.3rem+3.6vw,4.4rem)] font-medium uppercase leading-[0.98] tracking-[-0.01em]">
            {house.heading}
          </h2>
          <p className="mt-7 max-w-[44ch] text-[1.0625rem] leading-relaxed text-fumo">{house.intro}</p>
          <p className="mt-8 flex items-start gap-3 text-marfim">
            <DecoStar className="mt-1.5 size-3 shrink-0 text-ouro" />
            <span>
              {address.street}
              <br />
              <span className="text-fumo">{address.city}</span>
            </span>
          </p>
        </div>

        <div className="mx-auto w-full max-w-[46rem] xl:col-span-7 xl:max-w-none">
          <div className="arch">
            <ArchBulbs />
            <div className="arch-inner-rule" aria-hidden="true" />

            <dl className="relative grid grid-cols-3">
              {house.figures.map((figure, i) => (
                <div
                  key={figure.label}
                  className={`flex flex-col-reverse items-center justify-end px-1 text-center sm:px-3 ${i > 0 ? "border-l border-ouro/35" : ""}`}
                >
                  <dt className="mt-3 max-w-[12ch] text-[0.8125rem] leading-snug text-fumo sm:text-[0.9375rem]">
                    {figure.label}
                  </dt>
                  <dd className="flex flex-col items-center">
                    <span
                      className="mb-2 block font-display text-[0.875rem] italic text-ouro sm:text-base"
                      aria-hidden={figure.qualifier ? undefined : true}
                    >
                      {figure.qualifier ?? "\u00a0"}
                    </span>
                    <span className="figure-value block">{figure.value}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="relative my-8 flex items-center gap-4 md:my-10" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-ouro/0 to-ouro/60" />
              <DecoStar className="size-3.5 text-ouro" />
              <span className="h-px flex-1 bg-gradient-to-l from-ouro/0 to-ouro/60" />
            </div>

            <h3 className="sr-only">Espaços da nova casa</h3>
            <ul className="relative grid gap-y-3 text-center sm:grid-cols-3">
              {house.spaces.map((space, i) => (
                <li
                  key={space}
                  className={`font-display text-[1.35rem] leading-tight [text-wrap:balance] sm:px-3 sm:text-[clamp(1.1rem,0.85rem+0.7vw,1.45rem)] ${i > 0 ? "sm:border-l sm:border-ouro/35" : ""}`}
                >
                  {space}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
