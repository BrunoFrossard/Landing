"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { contactHref, numberLabel } from "@/lib/utils";
import type { Dictionary } from "@/i18n/types";

export function ProjectGallery({ copy, common }: { copy: Dictionary["projects"]; common: Dictionary["common"] }) {
  const [active, setActive] = useState(Math.max(0, copy.items.findIndex(item => item.featured)));
  const [open, setOpen] = useState(false);
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const dragged = useRef(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const count = copy.items.length;
  const project = copy.items[active];
  const select = (index: number) => setActive((index + count) % count);
  if (!project) return null;

  return <div className="project-experience" role="region" aria-roledescription={copy.carousel} aria-label={copy.gallery}>
    <p className="sr-only" id="gallery-help">{copy.galleryHelp}</p>
    <div className="project-stage" aria-describedby="gallery-help" tabIndex={0}
      onKeyDown={event => {
        if (open) return;
        if (event.key === "ArrowRight") { event.preventDefault(); select(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(active - 1); }
        if (event.key === "Home") { event.preventDefault(); select(0); }
        if (event.key === "End") { event.preventDefault(); select(count - 1); }
      }}
      onPointerDown={event => { if (event.button !== 0) return; drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId }; dragged.current = false; }}
      onPointerMove={event => { if (drag.current && Math.abs(event.clientX - drag.current.x) > 10) { dragged.current = true; event.currentTarget.setPointerCapture(event.pointerId); } }}
      onPointerUp={event => {
        if (!drag.current) return;
        const dx = event.clientX - drag.current.x;
        const dy = event.clientY - drag.current.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1));
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        drag.current = null;
      }}
      onPointerCancel={() => { drag.current = null; dragged.current = false; }}>
      <div className="stage-track" aria-hidden="true" />
      {copy.items.map((item, index) => {
        let offset = (index - active + count) % count;
        if (offset > count / 2) offset -= count;
        const current = offset === 0;
        const visible = Math.abs(offset) <= 1;
        return <motion.div className="project-card" key={item.slug} data-active={current} data-offset={offset}
          style={{ "--project-color": item.color, zIndex: count - Math.abs(offset) } as CSSProperties}
          animate={{ x: `${offset * 79}%`, y: current ? 0 : 23, scale: current ? 1 : 0.87, rotateY: offset === 0 ? 0 : offset > 0 ? -13 : 13, opacity: visible ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }} aria-hidden={!visible}>
          <button className="project-card-button" aria-label={`${current ? copy.view : copy.select}: ${item.title}`} tabIndex={current ? 0 : -1}
            onClick={event => { if (dragged.current) { dragged.current = false; return; } if (current) { opener.current = event.currentTarget; setOpen(true); } else select(index); }}>
            <div className="project-image-wrap"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) 88vw, 660px" draggable={false} /><span className="project-image-number" aria-hidden="true">{numberLabel(index + 1)} / {numberLabel(count)}</span><span className="project-open" aria-hidden="true"><ArrowUpRight size={24} /></span></div>
            <div className="project-card-caption"><span className="eyebrow">{item.category}</span><span className="project-card-title">{item.title}</span><span className="project-status"><span />{item.status}</span></div>
          </button>
        </motion.div>;
      })}
    </div>
    <div className="gallery-controls container">
      <div className="gallery-counter" aria-live="polite" aria-atomic="true"><span className="sr-only">{copy.progress} </span><strong>{numberLabel(active + 1)}</strong><span> / {numberLabel(count)}</span><span className="sr-only">: {project.title}</span></div>
      <div className="gallery-dots">{copy.items.map((item, index) => <button key={item.slug} className={active === index ? "active" : ""} aria-label={`${copy.select} ${index + 1}: ${item.title}`} aria-current={active === index ? "true" : undefined} onClick={() => select(index)}><span /></button>)}</div>
      <div className="gallery-arrows"><button className="icon-button" aria-label={copy.previous} onClick={() => select(active - 1)}><ArrowLeft size={20} /></button><button className="icon-button" aria-label={copy.next} onClick={() => select(active + 1)}><ArrowRight size={20} /></button></div>
    </div>
    <div className="project-summary container"><p>{project.shortDescription}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><button className="text-link" onClick={event => { opener.current = event.currentTarget; }}>{copy.view}<ArrowUpRight size={18} /></button></DialogTrigger>
        <DialogContent className="project-dialog" closeLabel={common.close} onCloseAutoFocus={event => { if (opener.current) { event.preventDefault(); opener.current.focus(); } }}>
          <div className="detail-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, 880px" /><span className="eyebrow">{project.placeholderAsset ? copy.concept : project.category}</span></div>
          <div className="detail-body"><p className="eyebrow">{project.category}</p><DialogTitle>{project.title}</DialogTitle><DialogDescription>{project.shortDescription}</DialogDescription>
            <div className="detail-status"><span className="eyebrow">{copy.status}</span><span>{project.status}</span></div>
            <div className="detail-grid">{[{ title: copy.context, text: project.context }, { title: copy.challenge, text: project.challenge }, { title: copy.solution, text: project.solution }].map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
            {project.video && <video className="project-video" controls playsInline preload="none" poster={project.image} src={project.video} aria-label={project.title} />}
            <div className="detail-meta"><div><h3>{copy.disciplines}</h3><p>{project.disciplines.join(" · ")}</p></div><div><h3>{copy.technologies}</h3><p>{project.technologies.join(" · ")}</p></div>{project.academicContext && <div><h3>{copy.related}</h3><p>{project.academicContext}</p></div>}</div>
            <a className="button button-primary" href={contactHref(common.emailSubject)}>{common.contact}<ArrowUpRight size={18} /></a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>;
}
