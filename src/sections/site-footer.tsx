import { DecoStar } from "@/components/ornaments";
import { site } from "@/data/site";

export function SiteFooter() {
  const { footer, address } = site;
  return (
    <footer className="border-t border-ouro/25 bg-coxia">
      <div className="mx-auto grid max-w-[82rem] gap-10 px-[var(--gutter)] py-12 md:grid-cols-12 md:py-14">
        <div className="md:col-span-4">
          <p className="inline-flex items-center gap-2 font-display text-[1.05rem] font-medium uppercase tracking-[0.16em]">
            <DecoStar className="size-2.5 text-ouro" />
            {site.name}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-fumo">
            {address.street}
            <br />
            {address.city}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[0.8125rem] text-fumo">{footer.officialChannelsLabel}</p>
          <ul className="mt-2 grid gap-1">
            {footer.officialChannels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-marfim underline decoration-ouro/50 underline-offset-4 transition-colors hover:text-ribalta"
                >
                  {channel.label}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[0.875rem] leading-relaxed text-marfim/80 md:col-span-5 md:border-l md:border-ouro/25 md:pl-8">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
