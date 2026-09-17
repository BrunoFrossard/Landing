import { DecoStar } from "@/components/ornaments";
import { site } from "@/data/site";

export function Manifesto() {
  const { manifesto } = site;
  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="grain relative bg-coxia pb-16 md:pb-20">
      {/* O fio de ouro continua o eixo do palco a partir do herói */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <div className="axis-thread h-20 md:h-28" style={{ background: "linear-gradient(180deg, rgb(182 144 77 / 0), rgb(182 144 77 / 0.7))" }} />
        <DecoStar className="my-4 size-5 text-ouro" />
      </div>

      <div className="mx-auto grid max-w-[82rem] gap-10 px-[var(--gutter)] pt-8 md:grid-cols-12 md:gap-y-14 md:pt-12">
        <h2 id="manifesto-title" className="sr-only">
          O Cabaret
        </h2>
        <p className="manifesto-statement spotlight md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-2">
          {manifesto.statement}
        </p>
        <p className="manifesto-coda md:col-span-6 md:col-start-7">
          {manifesto.coda.map((phrase, i) => (
            <span key={phrase} className="block" style={{ paddingLeft: `${i * 1.25}em` }}>
              {phrase}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
