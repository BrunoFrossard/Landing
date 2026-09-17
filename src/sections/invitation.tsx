import { CurtainReveal } from "@/components/curtain-reveal";
import { LaunchListDialog } from "@/components/launch-list-dialog";
import { DecoStar } from "@/components/ornaments";
import { Countdown } from "@/components/ui/countdown";
import { site } from "@/data/site";

export function Invitation() {
  const { invitation, address } = site;
  return (
    <CurtainReveal id="abertura" labelledBy="abertura-title">
      <div className="mx-auto flex max-w-[52rem] flex-col items-center px-[calc(var(--curtain-rest)+1.25rem)] py-24 text-center md:px-10 md:py-32">
        <DecoStar className="size-5 text-ouro" />
        <h2
          id="abertura-title"
          className="mt-7 font-display text-[clamp(2.4rem,1.2rem+4.8vw,5.4rem)] font-medium uppercase leading-[0.95] tracking-[-0.012em]"
        >
          {invitation.heading}
        </h2>
        <p className="mt-7 max-w-[34ch] font-display text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] italic leading-snug text-marfim/90">
          {invitation.supporting}
        </p>

        <Countdown className="mt-12 w-full max-w-[34rem]" />

        <address className="mt-10 not-italic leading-relaxed">
          <span className="block text-[1.0625rem] text-marfim">{address.street}</span>
          <span className="block text-fumo">{address.city}</span>
        </address>

        <div className="mt-10 flex flex-col items-center gap-4">
          <LaunchListDialog />
          <p className="text-[0.875rem] text-fumo">{invitation.note}</p>
        </div>
      </div>
    </CurtainReveal>
  );
}
