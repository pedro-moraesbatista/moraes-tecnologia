export type ProductAccent = 'primary' | 'secondary' | 'tertiary' | 'violet'

export interface ProductDemo {
  id: string
  name: string
  category: string
  summary: string
  highlights: string[]
  icon: string
  image: string
  imageAlt: string
  accent: ProductAccent
  demoUrl: string
}

// Somente produtos com demonstração pública no ar. O card só existe se a URL
// responder: nenhum link é inventado nem placeholder. As imagens são capturas
// da própria demo (1280x800) em public/produtos/. Os nomes descrevem o produto
// (segmento + tipo), não a marca da demo.
export const productDemos: ProductDemo[] = [
  {
    id: 'moraes-imoveis',
    name: 'Sistema de Gestão Imobiliária',
    category: 'Imobiliário',
    summary:
      'Plataforma de gestão imobiliária com portal público de busca avançada, CRM de leads, agenda de visitas e pipeline de propostas e vendas — com comissões, repasses, despesas e trilha de auditoria.',
    highlights: ['Portal público', 'CRM e pipeline', 'Comissões e repasses'],
    icon: 'apartment',
    image: '/produtos/moraes-imoveis.jpg',
    imageAlt: 'Prévia do sistema de gestão imobiliária (demo Moraes Imóveis)',
    accent: 'primary',
    demoUrl: 'https://www.app.imoveis.moraes-tecnologia.com',
  },
  {
    id: 'moraes-agendamento-barbearia',
    name: 'Sistema para Barbearias',
    category: 'Agendamento',
    summary:
      'Agendamento online para barbearias: catálogo de serviços, escolha de profissional e horário, área do cliente e painel administrativo com agenda, financeiro e configurações do estabelecimento.',
    highlights: ['Agenda online', 'Área do cliente', 'Painel admin'],
    icon: 'content_cut',
    image: '/produtos/moraes-agendamento-barbearia.jpg',
    imageAlt: 'Prévia do sistema de agendamento para barbearias (demo Studio Barber)',
    accent: 'secondary',
    demoUrl: 'https://www.app.agendamentos.moraes-tecnologia.com/?demo=studio-barber',
  },
  {
    id: 'moraes-agendamento-estudio',
    name: 'Sistema para Estúdios de Beleza',
    category: 'Agendamento',
    summary:
      'A mesma plataforma de agendamentos aplicada a estúdios de beleza: cores, tipografia e densidade do estabelecimento saem de tokens definidos no painel, sem tocar no código.',
    highlights: ['Identidade por tokens', 'Serviços e profissionais', 'Agenda e financeiro'],
    icon: 'spa',
    image: '/produtos/moraes-agendamento-estudio.jpg',
    imageAlt: 'Prévia do sistema de agendamento para estúdios de beleza (demo Essenza Beauty)',
    accent: 'violet',
    demoUrl: 'https://www.app.agendamentos.moraes-tecnologia.com/?demo=essenza-beauty',
  },
  {
    id: 'moraes-bebidas',
    name: 'Catálogo Digital para Bebidas',
    category: 'Comércio',
    summary:
      'Catálogo digital para depósitos e distribuidoras: busca normalizada, filtros por categoria, combos, carrinho com persistência no navegador e pedido fechado pelo WhatsApp.',
    highlights: ['Catálogo com filtros', 'Carrinho', 'Pedido no WhatsApp'],
    icon: 'local_bar',
    image: '/produtos/moraes-bebidas.jpg',
    imageAlt: 'Prévia do catálogo digital para bebidas (demo Bebidas Moraes)',
    accent: 'tertiary',
    demoUrl: 'https://app.bebidas.moraes-tecnologia.com',
  },
]
