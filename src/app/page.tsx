import { Hero } from "@/sections/hero";
import { Invitation } from "@/sections/invitation";
import { Manifesto } from "@/sections/manifesto";
import { NewHouse } from "@/sections/new-house";
import { OnStage } from "@/sections/on-stage";
import { SiteFooter } from "@/sections/site-footer";
import { SiteHeader } from "@/sections/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <span id="topo" />
        <Hero />
        <Manifesto />
        <NewHouse />
        <OnStage />
        <Invitation />
      </main>
      <SiteFooter />
    </>
  );
}
