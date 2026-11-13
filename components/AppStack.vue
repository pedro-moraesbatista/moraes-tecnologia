<script setup lang="ts">
const categories = [
  {
    icon: 'terminal',
    iconColor: 'text-primary',
    title: 'Backend',
    tools: ['.NET 8/9', 'C#', 'ASP.NET Core', 'Node.js', 'FastAPI', 'Python', 'Entity Framework'],
  },
  {
    icon: 'devices',
    iconColor: 'text-secondary',
    title: 'Frontend',
    tools: ['Vue.js', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    icon: 'cloud_queue',
    iconColor: 'text-violet-light',
    title: 'Cloud & Deploy',
    tools: ['Microsoft Azure', 'Google Cloud (GCP)', 'Vercel', 'Serverless', 'Kubernetes'],
  },
  {
    icon: 'database',
    iconColor: 'text-tertiary',
    title: 'Data & Storage',
    tools: ['PostgreSQL', 'MongoDB', 'BigQuery', 'SQL Server', 'Firebase'],
  },
  {
    icon: 'cable',
    iconColor: 'text-secondary',
    title: 'Integration & Messaging',
    tools: ['RESTful APIs', 'RabbitMQ', 'Redis', 'Event Grid'],
  },
  {
    icon: 'security',
    iconColor: 'text-primary',
    title: 'DevOps & Quality',
    tools: ['CI/CD Pipelines', 'GitHub Actions', 'Docker', 'OpenTelemetry', 'SonarQube'],
  },
]

const section = ref<HTMLElement | null>(null)
useScrollReveal(section, { stagger: 80 })

const toolClass = 'tech-pill px-3 py-1.5 rounded-lg bg-surface-container text-body-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors'
</script>

<template>
  <section ref="section" class="w-full bg-surface-container-low/40 py-space-xl md:py-28 px-margin-mobile md:px-margin">
    <div class="max-w-[1280px] mx-auto">
      <div class="reveal flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div class="max-w-2xl">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-space-xs block">Engineering Stack</span>
          <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
            Engenharia construída com tecnologia de ponta.
          </h2>
        </div>
        <p class="font-body-md text-body-md text-text-muted max-w-md">
          Selecionamos criteriosamente ferramentas modernas e consolidadas para assegurar robustez, longevidade e agilidade em qualquer escala.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        <div
          v-for="category in categories"
          :key="category.title"
          class="reveal bg-surface p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border-subtle/40"
        >
          <div class="flex items-center gap-space-sm mb-space-md">
            <span class="material-symbols-outlined" :class="category.iconColor">{{ category.icon }}</span>
            <h4 class="font-headline-sm text-headline-sm text-text-primary">{{ category.title }}</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="tool in category.tools" :key="tool" :class="toolClass">{{ tool }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
