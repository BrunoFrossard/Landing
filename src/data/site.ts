/**
 * Conteúdo central da página conceitual.
 *
 * Tudo que é editável (datas, endereço, números da casa, programação,
 * textos de CTA, integração de contato, vídeo e aviso de conceito)
 * vive aqui. Os componentes apenas leem estes valores.
 *
 * Regra do conceito: só entram fatos divulgados publicamente.
 * Nada de preços, atrações, horários, patrocínios ou imagens inventadas.
 */

export const site = {
  name: "Cabaret da Cecília",

  meta: {
    title: "Cabaret da Cecília · O Cabaret renasce (conceito)",
    description:
      "Conceito independente para a reabertura do Cabaret da Cecília na Rua Nestor Pestana, 189, em São Paulo.",
    locale: "pt-BR",
  },

  opening: {
    /** Data de abertura divulgada. Horário das portas ainda não confirmado: usamos o início do dia. */
    date: { year: 2026, month: 10, day: 15, hour: 0, minute: 0 },
    timeZone: "America/Sao_Paulo",
    labelShort: "15.10",
    labelLong: "15 de outubro",
    kicker: "São Paulo · 15 outubro 2026",
    openedMessage: "As cortinas estão abertas.",
  },

  address: {
    street: "Rua Nestor Pestana, 189",
    city: "São Paulo, SP",
    /** Link genérico de busca de mapa; troque pelo link oficial quando houver. */
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Nestor+Pestana+189+S%C3%A3o+Paulo",
  },

  nav: [
    { label: "O Cabaret", href: "#manifesto", id: "manifesto" },
    { label: "A nova casa", href: "#nova-casa", id: "nova-casa" },
    { label: "Em cena", href: "#em-cena", id: "em-cena" },
    { label: "15.10", href: "#abertura", id: "abertura", isTicket: true },
  ],

  hero: {
    headline: ["O Cabaret", "renasce."],
    supporting: "Um novo palco para tudo o que São\u00a0Paulo ainda não viu.",
    primaryCta: { label: "Quero estar na abertura", href: "#abertura" },
    secondaryCta: { label: "Descobrir a nova casa", href: "#nova-casa" },
    scrollCue: "Role para entrar",
  },

  manifesto: {
    statement:
      "Depois de oito anos fazendo da noite um espaço de arte, encontro e liberdade, o Cabaret abre de novo as suas cortinas.",
    coda: ["Maior.", "Mais intenso.", "Ainda impossível de definir."],
  },

  house: {
    heading: "Uma nova casa para uma noite sem rótulo.",
    intro:
      "Mais espaço para o que sempre coube aqui: música, corpo, humor e liberdade. Na nova casa, a noite se espalha por diferentes áreas de apresentação.",
    figures: [
      { value: "500", qualifier: "cerca de", label: "pessoas de capacidade" },
      { value: "3", qualifier: null, label: "bares" },
      { value: "10", qualifier: "cerca de", label: "artistas por noite" },
    ],
    spaces: ["Mezanino VIP", "Salas privativas", "Salão de eventos"],
  },

  program: {
    heading: "Em cena",
    intro:
      "Cerca de dez artistas por noite, em linguagens que raramente dividem o mesmo palco. A programação oficial será anunciada em breve.",
    /** Linhas de campanha, não promessas de agenda. */
    items: [
      { id: "jazz", title: "Jazz", line: "Improviso, presença e madrugada.", motif: "rings" },
      { id: "teatro", title: "Teatro", line: "O palco começa antes da cortina.", motif: "arch" },
      { id: "drag", title: "Drag", line: "Excesso, inteligência e transformação.", motif: "burst" },
      { id: "burlesco", title: "Burlesco", line: "A arte de revelar sem entregar tudo.", motif: "fan" },
      { id: "pole", title: "Pole", line: "Força, corpo e vertigem.", motif: "blade" },
      { id: "djs", title: "DJs", line: "A noite continua depois do último aplauso.", motif: "grooves" },
    ],
  },

  invitation: {
    heading: "A cortina abre em 15 de outubro.",
    supporting: "Uma nova casa. Novas histórias. A mesma liberdade para tudo acontecer.",
    note: "Programação e ingressos serão anunciados em breve.",
    cta: "Avise-me quando abrir",
  },

  launchList: {
    /**
     * "demo": nada é enviado nem armazenado.
     * Para a versão oficial, troque para "endpoint" e informe a URL
     * (ex.: rota /api/lista, Mailchimp, RD Station, planilha).
     */
    mode: "demo" as "demo" | "endpoint",
    endpoint: null as string | null,
    dialogTitle: "Avise-me quando abrir",
    dialogIntro: "Deixe seu nome e e-mail para saber da abertura e da programação.",
    demoNotice: "Demonstração: nenhum dado deste formulário é enviado ou armazenado.",
    submitLabel: "Avise-me",
    successMessage:
      "Demonstração concluída. Na versão oficial, este contato seria integrado à lista de lançamento.",
    errors: {
      name: "Informe seu nome.",
      email: "Informe um e-mail válido, como nome@exemplo.com.",
      generic: "Não foi possível enviar agora. Tente de novo em instantes.",
    },
  },

  video: {
    poster: "/images/cabaret-opening-poster.jpg",
    /** Quadro com a cortina entreaberta: usado com prefers-reduced-motion e economia de dados. */
    still: "/images/cabaret-opening-still.jpg",
    width: 1920,
    height: 1080,
    /** A primeira fonte compatível é usada. WebM (VP9) é menor; MP4 (H.264) garante Safari antigo. */
    sources: {
      mobile: [
        { src: "/video/cabaret-opening-720.webm", type: "video/webm" },
        { src: "/video/cabaret-opening-720.mp4", type: "video/mp4" },
      ],
      desktop: [
        { src: "/video/cabaret-opening-1080.webm", type: "video/webm" },
        { src: "/video/cabaret-opening-1080.mp4", type: "video/mp4" },
        /** Arquivo original preservado, sem alterações. */
        { src: "/video/cabaret-opening.mp4", type: "video/mp4" },
      ],
    },
    description:
      "Câmera se aproxima de um arco de palco com lâmpadas de letreiro; as cortinas de veludo vermelho se abrem e revelam uma faixa de luz dourada.",
  },

  footer: {
    disclaimer:
      "Conceito independente criado pela Alevum para apresentação ao Cabaret da Cecília. Esta não é uma página oficial.",
    officialChannelsLabel: "Canais oficiais atuais",
    officialChannels: [
      { label: "cabaretdacecilia.com.br", href: "https://www.cabaretdacecilia.com.br/" },
      { label: "Instagram", href: "https://instagram.com/cabaretdaceciliaofc" },
    ],
  },
} as const;

export type ProgramItem = (typeof site.program.items)[number];
export type ProgramMotif = ProgramItem["motif"];
