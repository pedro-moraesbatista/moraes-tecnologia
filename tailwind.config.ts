import type { Config } from 'tailwindcss'

// Porte exato do tailwind.config das referências Stitch
// (desktop-landing.html linha 9 == mobile-landing-animada.html linha 4).
// Classes como font-headline-sm/text-display-hero/px-gutter/rounded-xl são
// usadas verbatim pelos componentes — não renomear nem "completar" tokens.
// A referência mapeia para "Geist"; o @fontsource/geist-sans auto-hospedado
// registra a família como "Geist Sans", então o mapeamento usa o nome real.
const geist = ['Geist Sans']
const geistMono = ['Geist Mono']

export default {
  darkMode: 'class',
  content: ['./config/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        'secondary-fixed-dim': '#7bd0ff',
        'on-surface-variant': '#c8c4d7',
        'surface-bright': '#353945',
        'secondary-fixed': '#c4e7ff',
        'tertiary-container': '#d37b1c',
        'inverse-primary': '#5745d7',
        'on-primary-fixed-variant': '#3e27bf',
        'secondary': '#7bd0ff',
        'primary-fixed-dim': '#c6bfff',
        'surface-container-highest': '#313441',
        'on-secondary-container': '#00374d',
        'text-primary': '#F8FAFC',
        'border-subtle': '#1E293B',
        'text-secondary': '#CBD5E1',
        'on-background': '#dfe2f2',
        'background': '#0f131e',
        'on-error-container': '#ffdad6',
        'outline': '#928ea0',
        'primary-fixed': '#e4dfff',
        'surface-variant': '#313441',
        'on-error': '#690005',
        'on-primary-container': '#22008e',
        'tertiary-fixed': '#ffdcc1',
        'violet-hover': '#6355E8',
        'surface-container': '#1b1f2b',
        'secondary-container': '#00a6e0',
        'surface-container-lowest': '#0a0e19',
        'on-surface': '#dfe2f2',
        'on-secondary-fixed-variant': '#004c69',
        'on-secondary-fixed': '#001e2c',
        'tertiary-fixed-dim': '#ffb779',
        'on-tertiary-container': '#422100',
        'primary-container': '#8c80ff',
        'on-secondary': '#00354a',
        'bg-secondary': '#0D1322',
        'surface-elevated': '#172033',
        'on-tertiary-fixed-variant': '#6c3a00',
        'on-tertiary': '#4c2700',
        'inverse-surface': '#dfe2f2',
        'primary': '#c6bfff',
        'text-muted': '#94A3B8',
        'violet-light': '#A78BFA',
        'on-primary-fixed': '#150066',
        'surface': '#111827',
        'on-primary': '#2700a0',
        'surface-container-low': '#171b27',
        'error-container': '#93000a',
        'on-tertiary-fixed': '#2e1500',
        'surface-container-high': '#262a36',
        'tertiary': '#ffb779',
        'surface-dim': '#0f131e',
        'inverse-on-surface': '#2c303c',
        'surface-tint': '#c6bfff',
        'error': '#ffb4ab',
        'outline-variant': '#474554',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'gutter-mobile': '1rem',
        'margin': '2rem',
        'space-lg': '1.5rem',
        'space-xs': '0.25rem',
        'gutter': '1.5rem',
        'margin-mobile': '1rem',
        'space-xl': '2.5rem',
        'space-md': '1rem',
        'space-sm': '0.5rem',
      },
      fontFamily: {
        'headline-sm': geist,
        'body-sm': geist,
        'display-hero': geist,
        'headline-lg': geist,
        'headline-md': geist,
        'label-md': geist,
        'display-hero-mobile': geist,
        'label-sm': geist,
        'body-md': geist,
        'body-lg': geist,
        'headline-lg-mobile': geist,
        sans: [...geist, 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [...geistMono, 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'headline-sm': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'display-hero': ['72px', { lineHeight: '80px', letterSpacing: '-0.03em', fontWeight: '700' }],
        'headline-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '500' }],
        'display-hero-mobile': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-lg-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      // Keyframes quebradas na referência Stitch: os componentes usam
      // animate-[marquee_25s_linear_infinite], animate-float-slow e
      // animate-pulse-glow, que não existiam no config original.
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.8' },
        },
        dashFlow: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-220' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'dash-flow': 'dashFlow 2.2s linear infinite',
      },
    },
  },
} satisfies Partial<Config>
