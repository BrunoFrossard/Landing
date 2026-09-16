import { notFound } from "next/navigation";
import { Hero } from "@/sections/hero";
import { Services } from "@/sections/services";
import { Projects } from "@/sections/projects";
import { People } from "@/sections/people";
import { Process } from "@/sections/process";
import { Contact } from "@/sections/contact";
import { dictionaries } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/types";
import { getHeroVideo } from "@/lib/media";
import { getSiteUrl, site } from "@/data/site";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = dictionaries[locale];
  const url = getSiteUrl();
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: site.name, email: site.email,
    ...(url ? { url } : {}), founder: site.founders.map(name => ({ "@type": "Person", name })), description: copy.meta.description,
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <main id="conteudo" tabIndex={-1}>
      <Hero copy={copy} video={getHeroVideo()} />
      <Services copy={copy.services} />
      <Projects copy={copy.projects} common={copy.common} />
      <People copy={copy.people} />
      <Process copy={copy.process} />
      <Contact copy={copy.contact} common={copy.common} />
    </main>
  </>;
}
