import { founderContent } from "@/data/founders";
import { projectContent } from "@/data/projects";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    meta: {
      title: "Alevum — Produto, design e engenharia digital",
      description: "A Alevum cria landing pages, sites e experiências digitais combinando estratégia de produto, UX, narrativa visual, engenharia e inteligência artificial.",
      imageAlt: "Alevum. Pensado junto. Construído por inteiro.",
    },
    nav: { projects: "Projetos", services: "O que fazemos", people: "Nos conheça", contact: "Contato", label: "Navegação principal", home: "Alevum — início" },
    common: {
      contact: "Conte seu projeto", explore: "Explorar projetos", emailSubject: "Quero conversar sobre um projeto com a Alevum",
      skip: "Pular para o conteúdo", close: "Fechar", menu: "Abrir menu", menuDescription: "Navegue pelas seções da Alevum.",
      theme: "Alterar tema", light: "Ativar tema claro", dark: "Ativar tema escuro", language: "Idioma", switchLanguage: "Switch to English",
      backTop: "Voltar ao início", arrow: "Abrir",
    },
    hero: {
      eyebrow: "Estúdio de produto, design & tecnologia",
      line1: "Pensado junto.", line2: "Construído", emphasis: "por inteiro.",
      description: "Criamos sites e experiências digitais com clareza, personalidade e engenharia. Da primeira conversa ao deploy, você fala com quem constrói.",
      footnote: "Duas pessoas. Do primeiro porquê ao último detalhe.", location: "São Paulo, Brasil · Aberto a boas conversas",
      canvasLabel: "Um mesmo olhar, três dimensões", canvasTitle: "Ideias ganham espaço.", canvasSubtitle: "Um estudo sobre o que podemos construir juntos.", canvasHint: "Explore as camadas",
      phases: [
        { title: "Estratégia", description: "Antes da forma, uma intenção.", note: "Problema → direção" },
        { title: "Design", description: "Uma ideia que dá vontade de explorar.", note: "Direção → experiência" },
        { title: "Engenharia", description: "O que foi imaginado, funcionando.", note: "Experiência → produto" },
      ], videoPlay: "Reproduzir vídeo", videoPause: "Pausar vídeo",
    },
    services: {
      label: "01 / O que fazemos", title: "Uma boa ideia merece", emphasis: "uma presença à altura.",
      description: "Pensamos a mensagem, desenhamos a experiência e construímos o produto. Com os fundadores envolvidos em cada decisão.",
      items: [
        { title: "Sites que dizem a que vieram.", description: "Landing pages & sites institucionais", detail: "Mensagem clara, identidade própria e um caminho direto para a próxima conversa. Do conteúdo à publicação, em qualquer tela." },
        { title: "Interfaces que convidam a explorar.", description: "Experiências digitais interativas", detail: "Narrativa, movimento e interação para apresentar uma ideia de um jeito que faz sentido. Cada gesto tem uma função." },
        { title: "Novas ferramentas. Direção humana.", description: "Visual & vídeo com IA", detail: "Produção assistida por inteligência artificial, guiada por conceito, curadoria e intenção. Para dar forma a narrativas visuais e audiovisuais." },
        { title: "A ideia, pronta para ser usada.", description: "Protótipos & interfaces de MVPs", detail: "Fluxos e interfaces para tirar hipóteses do papel, testar com pessoas e orientar a próxima versão do produto." },
      ],
    },
    projects: {
      label: "02 / Em construção & em prática", title: "Ideias em", emphasis: "movimento.",
      intro: "Uma iniciativa própria e experiências que formam nosso jeito de construir.", previous: "Projeto anterior", next: "Próximo projeto", view: "Explorar o projeto", select: "Selecionar projeto",
      gallery: "Galeria de projetos", carousel: "carrossel", galleryHelp: "Use as setas do teclado ou os botões para navegar. Arraste para trocar de projeto.", concept: "Estudo visual · imagem conceitual",
      note: "Parte dos casos nasceu em equipes multidisciplinares no modelo PBL do Inteli, a partir de desafios de organizações. São experiências dos fundadores, com os contextos e estágios indicados em cada projeto.",
      context: "O contexto", challenge: "O desafio", solution: "O que foi desenvolvido", disciplines: "Disciplinas", technologies: "Recursos & tecnologias", status: "Estágio", related: "Contexto acadêmico", progress: "Projeto",
      items: projectContent.pt,
    },
    people: {
      label: "03 / Nos conheça", title: "Do outro lado da tela,", emphasis: "a gente.",
      description: "Bruno e Rafael. Dois estudantes de Engenharia da Computação no Inteli, construindo a própria empresa e experiências digitais para outras empresas.",
      reveal: "Além do trabalho", hide: "Voltar ao trabalho", professional: "No trabalho", portrait: "Retrato em breve", items: founderContent.pt,
    },
    process: {
      label: "04 / Da conversa ao deploy", title: "Um fio contínuo.", emphasis: "As mesmas pessoas.",
      description: "Você conversa diretamente com quem vai pensar, desenhar, testar e colocar seu projeto no ar.",
      items: [
        { title: "Entender", description: "O problema, as pessoas e o que precisa mudar." },
        { title: "Direcionar", description: "Mensagem, prioridade e próximo passo do visitante." },
        { title: "Desenhar", description: "Identidade, jornada e interações com intenção." },
        { title: "Construir", description: "Interface, responsividade e testes de uso." },
        { title: "Publicar & evoluir", description: "No ar, funcionando e aberto ao aprendizado." },
      ],
      credibility: "Nossa formação no Inteli parte de problemas reais. No Project-Based Learning, tecnologia, negócio e trabalho em equipe se encontram na prática. É essa disciplina que levamos para a Alevum.",
      institution: "Inteli · Instituto de Tecnologia e Liderança",
    },
    contact: {
      label: "05 / A próxima conversa", title: "Tem uma ideia", emphasis: "pedindo forma?",
      description: "Conte o contexto. Vamos pensar juntos no que precisa ser visto, usado e colocado no mundo.", note: "Seu primeiro contato já é com quem vai construir.",
    },
    footer: { location: "São Paulo, Brasil", statement: "Produto, design e engenharia. Na mesma conversa.", rights: "Feito com intenção.", navigation: "Navegação do rodapé" },
    notFound: { title: "Esse caminho ainda não existe.", description: "Volte ao início para conhecer o que estamos construindo.", back: "Voltar para a Alevum" },
  },
  en: {
    meta: {
      title: "Alevum — Digital product, design and engineering",
      description: "Alevum builds landing pages, websites and digital experiences through product thinking, UX, visual storytelling, engineering and artificial intelligence.",
      imageAlt: "Alevum. Thought through together. Built all the way.",
    },
    nav: { projects: "Projects", services: "What we do", people: "Meet us", contact: "Contact", label: "Main navigation", home: "Alevum — home" },
    common: {
      contact: "Tell us your idea", explore: "Explore projects", emailSubject: "Let’s talk about a project with Alevum", skip: "Skip to content", close: "Close", menu: "Open menu", menuDescription: "Explore the sections of Alevum.",
      theme: "Change theme", light: "Switch to light theme", dark: "Switch to dark theme", language: "Language", switchLanguage: "Mudar para português", backTop: "Back to top", arrow: "Open",
    },
    hero: {
      eyebrow: "Product, design & technology studio", line1: "Thought through.", line2: "Built", emphasis: "all the way.",
      description: "We build websites and digital experiences with clarity, character and engineering. From the first conversation to deployment, you talk to the people who build.",
      footnote: "Two people. From the first why to the final detail.", location: "São Paulo, Brazil · Open to good conversations",
      canvasLabel: "One perspective, three dimensions", canvasTitle: "Room for your ideas.", canvasSubtitle: "A study of what we could build together.", canvasHint: "Explore the layers",
      phases: [
        { title: "Strategy", description: "Before the form, a clear intention.", note: "Problem → direction" },
        { title: "Design", description: "An idea you want to explore.", note: "Direction → experience" },
        { title: "Engineering", description: "What we imagined, working.", note: "Experience → product" },
      ], videoPlay: "Play video", videoPause: "Pause video",
    },
    services: {
      label: "01 / What we do", title: "A good idea deserves", emphasis: "a presence to match.",
      description: "We shape the message, design the experience and build the product. With the founders involved in every decision.",
      items: [
        { title: "Websites with something to say.", description: "Landing pages & company websites", detail: "A clear message, a distinct identity and a direct path to the next conversation. From content to launch, on every screen." },
        { title: "Interfaces made to explore.", description: "Interactive digital experiences", detail: "Story, motion and interaction that make an idea easier to understand. Every gesture serves a purpose." },
        { title: "New tools. Human direction.", description: "AI-assisted visuals & video", detail: "AI-assisted production guided by a concept, thoughtful curation and intent. Bringing visual and audiovisual stories into focus." },
        { title: "An idea you can actually use.", description: "Prototypes & MVP interfaces", detail: "Flows and interfaces that take assumptions off the page, put them in front of people and inform the next version." },
      ],
    },
    projects: {
      label: "02 / In development & in practice", title: "Ideas in", emphasis: "motion.", intro: "Our own venture and the experiences shaping how we build.",
      previous: "Previous project", next: "Next project", view: "Explore this project", select: "Select project", gallery: "Project gallery", carousel: "carousel", galleryHelp: "Use the arrow keys or buttons to navigate. Drag to change projects.", concept: "Visual study · concept image",
      note: "Some cases were developed in multidisciplinary teams through Inteli’s PBL model, based on challenges from organizations. They reflect the founders’ experience, with the context and stage stated in each project.",
      context: "The context", challenge: "The challenge", solution: "What was developed", disciplines: "Disciplines", technologies: "Tools & technologies", status: "Stage", related: "Academic context", progress: "Project", items: projectContent.en,
    },
    people: {
      label: "03 / Meet us", title: "Behind the screen,", emphasis: "it’s us.", description: "Bruno and Rafael. Two Computer Engineering students at Inteli, building their own company and digital experiences for other businesses.",
      reveal: "Beyond the work", hide: "Back to the work", professional: "At work", portrait: "Portrait coming soon", items: founderContent.en,
    },
    process: {
      label: "04 / From conversation to deployment", title: "One continuous thread.", emphasis: "The same people.", description: "You talk directly to the people who will think, design, test and launch your project.",
      items: [
        { title: "Understand", description: "The problem, the people and what needs to change." },
        { title: "Define", description: "The message, the priorities and the visitor’s next step." },
        { title: "Design", description: "An identity, a journey and purposeful interactions." },
        { title: "Build", description: "The interface, responsive behavior and usability testing." },
        { title: "Launch & learn", description: "Live, working and ready to learn from." },
      ],
      credibility: "At Inteli, our education starts with real problems. Project-Based Learning brings technology, business and teamwork together in practice. That discipline is part of how we build Alevum.", institution: "Inteli · Institute of Technology and Leadership",
    },
    contact: { label: "05 / The next conversation", title: "An idea ready", emphasis: "to take shape?", description: "Tell us the context. Let’s work out what needs to be seen, used and put into the world.", note: "Your first contact is already with the people who build." },
    footer: { location: "São Paulo, Brazil", statement: "Product, design and engineering. In the same conversation.", rights: "Made with intent.", navigation: "Footer navigation" },
    notFound: { title: "This path doesn’t exist yet.", description: "Head back home to see what we’re building.", back: "Back to Alevum" },
  },
};
