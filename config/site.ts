export interface SiteContact {
  email: string | null
  whatsapp: string | null
  whatsappDisplay: string | null
  address: string | null
}

// Identidade única do site. `null` = canal indisponível: o componente NÃO renderiza
// o link/endereço. Regra de credibilidade: preencher apenas com dados reais do
// owner — dados de exemplo do Stitch (design/) são proibidos.
export const site = {
  name: 'Moraes Tecnologia',
  tagline: 'Transformamos ideias em soluções digitais.',

  // Dados cadastrais (Cartão CNPJ).
  legalName: 'Moraes Desenvolvimento de Software Sob Encomenda Ltda',
  cnpj: '70.103.391/0001-55',

  // Domínio de produção: reabilita canonical absoluto, og:url, JSON-LD e sitemap.
  url: 'https://moraes-tecnologia.com' as string | null,

  contact: {
    email: 'contato@moraes-tecnologia.com',
    whatsapp: '+5583998461353',
    whatsappDisplay: '(83) 99846-1353',
    address: 'Av. Brigadeiro Faria Lima, 1811 — Sala 1119, Jardim Paulistano, São Paulo/SP, CEP 01452-001',
  } as SiteContact,

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ],
}
