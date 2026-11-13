import { expect, test, type Page } from '@playwright/test'

const sectionIds = ['inicio', 'servicos', 'produtos', 'sobre', 'contato'] as const

async function gotoLanding(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.locator('h1')).toBeVisible()
}

function collectConsole(page: Page): {
  errors: string[]
  pageErrors: string[]
} {
  const errors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => pageErrors.push(err.message))
  return { errors, pageErrors }
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const el = document.documentElement
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }
  })
  expect(
    overflow.scrollWidth,
    `scrollWidth ${overflow.scrollWidth} excede clientWidth ${overflow.clientWidth}`,
  ).toBeLessThanOrEqual(overflow.clientWidth)
}

async function scrollToSection(page: Page, id: string): Promise<void> {
  await page.evaluate((secId) => {
    document.getElementById(secId)?.scrollIntoView({ block: 'start' })
  }, id)
  await page.waitForTimeout(1100)
}

test.describe('Desktop @desktop (lg+)', () => {
  test.beforeEach(async ({ viewport }) => {
    test.skip(viewport!.width < 1024, 'teste exclusivo de desktop (lg e acima)')
  })

  test('carrega sem erros de console e com SEO básico', async ({ page }) => {
    const console_ = collectConsole(page)
    await gotoLanding(page)
    await expect(page).toHaveTitle(/Moraes Tecnologia/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await page.evaluate(() => {
      for (const tag of ['header', 'main', 'footer']) {
        if (!document.querySelector(tag)) throw new Error(`landmark ausente: ${tag}`)
      }
    })
    expect(console_.errors, console_.errors.join('\n')).toEqual([])
    expect(console_.pageErrors, console_.pageErrors.join('\n')).toEqual([])
  })

  test('hero: h1 com gradiente, skip-link e canvases WebGL ativos', async ({ page }) => {
    const canvasHost = page.locator('#inicio').locator('canvas')
    await gotoLanding(page)
    await expect(page.locator('#inicio h1')).toContainText('Tecnologia que transforma')
    await expect(page.locator('#inicio h1 span')).toHaveClass(/bg-clip-text/)
    await expect(page.getByText('Pular para o conteúdo')).toBeAttached()
    await expect(canvasHost.first()).toBeVisible({ timeout: 8000 })
    expect(await canvasHost.count()).toBeGreaterThanOrEqual(2)
  })

  test('navegação por âncoras com scroll-mt, hash e indicador ativo', async ({ page }) => {
    await gotoLanding(page)
    const labelToId: Record<string, (typeof sectionIds)[number]> = {
      Serviços: 'servicos',
      Produtos: 'produtos',
      Sobre: 'sobre',
      Contato: 'contato',
    }
    for (const [label, id] of Object.entries(labelToId)) {
      await page.locator('header nav').getByRole('link', { name: label, exact: true }).click()
      await expect
        .poll(async () => {
          return page.evaluate(() => window.location.hash)
        }, { timeout: 5000 })
        .toBe(`#${id}`)
      await page.waitForTimeout(900)
      const inView = await page.evaluate((secId) => {
        const el = document.getElementById(secId)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top >= -1 && rect.top < window.innerHeight / 2
      }, id)
      expect(inView, `${id} visível após clique (header fixo não cobre conteúdo)`).toBe(true)
    }
    await page.evaluate(() => document.getElementById('produtos')?.scrollIntoView())
    await expect(
      page.locator('header nav').getByRole('link', { name: 'Produtos' }),
    ).toHaveAttribute('aria-current', 'true', { timeout: 5000 })
  })

  test('marquee com 7 itens e animação rodando', async ({ page }) => {
    await gotoLanding(page)
    const itens = [
      'SOFTWARE ENGINEERING',
      'CLOUD INFRASTRUCTURE',
      'SYSTEM ARCHITECTURE',
      'AUTOMATION & DEVOPS',
      'DIGITAL PRODUCTS',
      'ARTIFICIAL INTELLIGENCE',
      'ENTERPRISE INTEGRATIONS',
    ]
    for (const item of itens) {
      await expect(page.getByText(item, { exact: true }).first()).toBeVisible()
    }
    const anim = await page.evaluate(() => {
      const track = document.querySelector('[data-testid="marquee-track"]')
      if (!track) return 'missing'
      return window.getComputedStyle(track).animationName
    })
    expect(anim).toBe('marquee')
  })

  test('todas as 8 seções com conteúdo revelado', async ({ page }) => {
    const console_ = collectConsole(page)
    await gotoLanding(page)
    // Percorre a página em passos verticais para disparar os reveals (IO)
    for (let i = 0; i < 40; i += 1) {
      await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'instant' }))
      await page.waitForTimeout(400)
      if (
        await page.evaluate(() => window.innerHeight + window.scrollY >= document.body.scrollHeight)
      ) {
        break
      }
    }
    const titulos = [
      'Soluções que conectam tecnologia e negócios.',
      'Ideias que se tornam produtos.',
      'Da estratégia à entrega.',
      'Engenharia construída com tecnologia de ponta.',
      'Mais do que desenvolver software. Construímos soluções.',
      'Vamos construir algo extraordinário?',
    ]
    for (const t of titulos) {
      await expect(page.getByRole('heading', { name: t })).toBeVisible()
    }
    for (const nome of [
      'Consultoria Tecnológica',
      'Desenvolvimento de Software',
      'Arquitetura de Sistemas',
      'APIs e Integrações',
      'Cloud e DevOps',
      'IA e Automação',
    ]) {
      await expect(page.getByText(nome, { exact: true }).first()).toBeVisible()
    }
    for (const etapa of ['Discovery', 'Estratégia', 'Arquitetura', 'Desenvolvimento', 'Evolução']) {
      await expect(page.getByText(etapa, { exact: true }).filter({ visible: true }).first()).toBeVisible()
    }
    for (const pilar of ['Visão Estratégica', 'Engenharia de Qualidade', 'Arquitetura Escalável', 'Evolução Contínua']) {
      await expect(page.getByText(pilar, { exact: true }).first()).toBeVisible()
    }
    expect(console_.errors, console_.errors.join('\n')).toEqual([])
  })

  test('contato: endereço, WhatsApp e e-mail reais', async ({ page }) => {
    await gotoLanding(page)
    const contato = page.locator('#contato')
    await expect(contato.getByText('A configurar')).toHaveCount(0)
    await expect(contato).toContainText('Av. Brigadeiro Faria Lima, 1811')
    await expect(contato).toContainText('São Paulo/SP')
    await expect(contato).toContainText('(83) 99846-1353')
    await expect(contato.locator('a[href^="https://wa.me/5583998461353"]').first()).toBeVisible()
    await expect(contato.locator('a[href="mailto:contato@moraes-tecnologia.com"]')).toHaveCount(1)
  })

  test('SEO: canonical, JSON-LD e sitemap no domínio de produção', async ({ page, request }) => {
    await gotoLanding(page)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://moraes-tecnologia.com',
    )
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent()
    const [organizacao] = JSON.parse(ld ?? '[]') as Array<Record<string, unknown>>
    expect(organizacao.url).toBe('https://moraes-tecnologia.com')
    expect(organizacao.taxID).toBe('70.103.391/0001-55')
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('<loc>https://moraes-tecnologia.com/</loc>')
  })

  test('form: validação real, foco no primeiro inválido, estado pendente honesto', async ({ page }) => {
    await gotoLanding(page)
    const form = page.locator('form').filter({ hasText: 'Fale com um especialista' })
    await form.getByRole('button', { name: /Fale com um especialista/ }).click()
    await expect(page.getByText('Informe seu nome.')).toBeVisible()
    await expect(page.locator('#contact-name')).toBeFocused()
    await page.locator('#contact-name').fill('Roberto Silva')
    await page.locator('#contact-company').fill('Nexus Corp')
    await page.locator('#contact-email').fill('roberto@nexuscorp.com.br')
    await page.locator('#contact-projectType').selectOption({ value: 'software' })
    await page.locator('#contact-details').fill('Escopo: plataforma interna de dados.')
    await form.getByRole('button', { name: /Fale com um especialista/ }).click()
    await expect(page.getByText(/Integração de envio pendente de configuração/)).toBeVisible()
    await expect(page.locator('#contato')).toContainText('Envio indisponível')
    const bodyText = await page.locator('body').innerText()
    expect(bodyText, 'não pode falso-sucesso').not.toMatch(/Mensagem enviada com sucesso|Recebemos sua mensagem/)
  })

  test('footer: ano dinâmico, dados cadastrais e zero links mortos', async ({ page }) => {
    await gotoLanding(page)
    const year = String(new Date().getFullYear())
    await expect(page.locator('footer')).toContainText(`© ${year} Moraes Tecnologia`)
    await expect(page.locator('footer')).toContainText('70.103.391/0001-55')
    await expect(page.locator('footer')).toContainText('Moraes Desenvolvimento de Software Sob Encomenda Ltda')
    expect(await page.locator('a[href="#"]').count()).toBe(0)
  })

  test('sem overflow horizontal em 7 larguras de viewport', async ({ page }) => {
    await gotoLanding(page)
    for (const width of [1920, 1440, 1280, 1024, 768, 390, 375]) {
      await page.setViewportSize({ width, height: 900 })
      await page.waitForTimeout(150)
      await expectNoHorizontalOverflow(page)
    }
  })

  test('reduced motion: sem canvas, reveals imediatos', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await gotoLanding(page)
    await expect(page.locator('#inicio canvas')).toHaveCount(0)
    const h1 = page.locator('#inicio h1')
    await expect(h1).toBeVisible()
    await expect
      .poll(async () => {
        return h1.evaluate((el) => Number(getComputedStyle(el).opacity))
      }, { timeout: 2000 })
      .toBe(1)
  })
})

test.describe('Mobile @mobile (<lg)', () => {
  test.beforeEach(async ({ viewport }) => {
    test.skip(viewport!.width >= 1024, 'teste exclusivo de mobile/tablet (<lg)')
  })

  test('hero sem WebGL, orbs css, reveals concluídos', async ({ page }) => {
    const console_ = collectConsole(page)
    await gotoLanding(page)
    await expect(page.locator('#inicio canvas')).toHaveCount(0)
    await expect(page.locator('.ambient-orb-1').first()).toBeAttached()
    const h1 = page.locator('#inicio h1')
    await expect(h1).toBeVisible()
    await expect
      .poll(async () => {
        return h1.evaluate((el) => Number(getComputedStyle(el).opacity))
      }, { timeout: 4000 })
      .toBe(1)
    expect(console_.errors, console_.errors.join('\n')).toEqual([])
    await expectNoHorizontalOverflow(page)
  })

  test('drawer: abre, a11y, fecha por Esc/backdrop/link, foco restaurado', async ({ page }) => {
    await gotoLanding(page)
    const abre = page.getByRole('button', { name: 'Abrir Menu' })
    await abre.click()
    const drawer = page.locator('#mobile-drawer')
    await expect(drawer).toBeVisible()
    await expect(drawer).toHaveAttribute('role', 'dialog')
    await expect(abre).toHaveAttribute('aria-expanded', 'true')
    await expect
      .poll(async () => {
        return page.evaluate(() => document.activeElement?.closest('#mobile-drawer') != null)
      })
      .toBe(true)
    await page.keyboard.press('Escape')
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    await expect(drawer).toHaveAttribute('inert', /(^$|true)/)
    await expect
      .poll(() => abre.evaluate((el) => el === document.activeElement))
      .toBe(true)
    await abre.click()
    await page.mouse.click(40, 400)
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    await abre.click()
    await drawer.getByRole('link', { name: /Serviços/ }).click()
    await page.waitForTimeout(900)
    const top = await page.evaluate(() => document.getElementById('servicos')?.getBoundingClientRect().top ?? -999)
    expect(top).toBeGreaterThanOrEqual(-1)
    expect(top).toBeLessThan(500)
    await expectNoHorizontalOverflow(page)
  })

  test('form mobile: mesma validação e estado pendente', async ({ page }) => {
    await gotoLanding(page)
    await page.locator('#contact-details').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /Fale com um especialista/ }).click()
    await expect(page.getByText('Informe seu nome.')).toBeVisible()
    await page.locator('#contact-name').fill('Ana Souza')
    await page.locator('#contact-company').fill('Delta Ltda')
    await page.locator('#contact-email').fill('ana@delta.com')
    await page.locator('#contact-projectType').selectOption({ value: 'arquitetura' })
    await page.locator('#contact-details').fill('Modernização de legado.')
    await page.getByRole('button', { name: /Fale com um especialista/ }).click()
    await expect(page.getByText(/Integração de envio pendente de configuração/)).toBeVisible()
    await expectNoHorizontalOverflow(page)
  })

  test('375px sem overflow e telas de conteúdo presentes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await gotoLanding(page)
    await expect(page.locator('#produtos')).toContainText('Sistema de Gestão Imobiliária')
    await expectNoHorizontalOverflow(page)
  })

  test('catálogo de produtos com links de demonstração acessíveis', async ({ page }) => {
    await gotoLanding(page)
    const produtos = page.locator('#produtos')
    const demos = [
      { name: 'Sistema de Gestão Imobiliária', href: 'https://moraes-imoveis.vercel.app' },
      {
        name: 'Sistema para Barbearias',
        href: 'https://agendamentos-moraes-web.vercel.app/?demo=studio-barber',
      },
      {
        name: 'Sistema para Estúdios de Beleza',
        href: 'https://agendamentos-moraes-web.vercel.app/?demo=essenza-beauty',
      },
      { name: 'Catálogo Digital para Bebidas', href: 'https://bebidas-moraes.vercel.app' },
    ]
    for (const demo of demos) {
      const link = produtos.getByRole('link', { name: `Ver demonstração de ${demo.name}` })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', demo.href)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
      await expect(produtos).toContainText(demo.name)
    }
    await produtos.scrollIntoViewIfNeeded()
    const imagens = produtos.locator('article img')
    await expect(imagens).toHaveCount(demos.length)
    await expect
      .poll(
        () =>
          imagens.evaluateAll((els) =>
            els.every((el) => (el as HTMLImageElement).naturalWidth > 0),
          ),
        { timeout: 15_000 },
      )
      .toBe(true)
  })
})

test.describe('Tablet @tablet (768)', () => {
  test('hambúrguer ativo, nav desktop oculta, sem overflow', async ({ page, viewport }) => {
    test.skip(viewport!.width !== 768, 'teste exclusivo do project tablet')
    const console_ = collectConsole(page)
    await gotoLanding(page)
    await expectNoHorizontalOverflow(page)
    await expect(page.locator('header nav[aria-label="Navegação principal"]')).not.toBeVisible()
    await page.getByRole('button', { name: 'Abrir Menu' }).click()
    const drawer = page.locator('#mobile-drawer')
    await expect(drawer).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    expect(console_.errors, console_.errors.join('\n')).toEqual([])
  })
})
