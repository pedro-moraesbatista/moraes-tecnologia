<script setup lang="ts">
import { site } from '~/config/site'

type FieldKey = 'name' | 'company' | 'email' | 'projectType' | 'details'
type FormErrors = Partial<Record<FieldKey, string>>
type SubmitState = 'idle' | 'invalid' | 'pending'

const fieldKeys: FieldKey[] = ['name', 'company', 'email', 'projectType', 'details']

const form = reactive({
  name: '',
  company: '',
  email: '',
  projectType: 'software',
  details: '',
})
const errors = reactive<FormErrors>({})
const submitState = ref<SubmitState>('idle')

const projectTypes = [
  { value: 'software', label: 'Desenvolvimento de Software Sob Medida' },
  { value: 'arquitetura', label: 'Arquitetura em Nuvem & Modernização' },
  { value: 'consultoria', label: 'Consultoria Técnica & Diagnóstico' },
  { value: 'produtos', label: 'Demonstração de um Produto Moraes' },
  { value: 'outro', label: 'Outro Desafio Tecnológico' },
]

const inputClass =
  'focus-glow w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-xl px-space-md py-3 text-body-sm focus:outline-none border border-border-subtle/60 transition-all'
const textareaClass = inputClass + ' resize-none'

const whatsappHref = computed(() => {
  const number = site.contact.whatsapp
  return number ? `https://wa.me/${number.replace(/\D/g, '')}` : null
})

function fieldId(key: FieldKey): string {
  return `contact-${key}`
}

function validateField(key: FieldKey): string | undefined {
  const value = form[key].trim()
  switch (key) {
    case 'name':
      return value ? undefined : 'Informe seu nome.'
    case 'company':
      return value ? undefined : 'Informe sua empresa.'
    case 'email':
      if (!value) return 'Informe seu e-mail profissional.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Informe um e-mail válido.'
    case 'projectType':
      return value ? undefined : 'Selecione o tipo de projeto.'
    case 'details':
      return value ? undefined : 'Descreva brevemente o seu desafio.'
  }
}

function clearError(key: FieldKey): void {
  errors[key] = undefined
}

function onSubmit(): void {
  let firstInvalid: FieldKey | null = null
  for (const key of fieldKeys) {
    const message = validateField(key)
    errors[key] = message
    if (message && firstInvalid === null) firstInvalid = key
  }
  if (firstInvalid) {
    submitState.value = 'invalid'
    nextTick(() => {
      document.getElementById(fieldId(firstInvalid))?.focus()
    })
    return
  }
  submitState.value = 'pending'
}
</script>

<template>
  <form class="space-y-space-md" novalidate @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      <div>
        <label class="block font-label-sm text-label-sm text-text-secondary mb-1.5" :for="fieldId('name')">Seu Nome</label>
        <input
          :id="fieldId('name')"
          v-model="form.name"
          :class="inputClass"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? fieldId('name') + '-error' : undefined"
          placeholder="Ex: Roberto Silva"
          required
          type="text"
          @input="clearError('name')"
        >
        <p
          v-if="errors.name"
          :id="fieldId('name') + '-error'"
          role="alert"
          class="mt-1 font-label-sm text-label-sm text-error"
        >{{ errors.name }}</p>
      </div>
      <div>
        <label class="block font-label-sm text-label-sm text-text-secondary mb-1.5" :for="fieldId('company')">Empresa</label>
        <input
          :id="fieldId('company')"
          v-model="form.company"
          :class="inputClass"
          :aria-invalid="errors.company ? 'true' : undefined"
          :aria-describedby="errors.company ? fieldId('company') + '-error' : undefined"
          placeholder="Ex: Nexus Corp"
          required
          type="text"
          @input="clearError('company')"
        >
        <p
          v-if="errors.company"
          :id="fieldId('company') + '-error'"
          role="alert"
          class="mt-1 font-label-sm text-label-sm text-error"
        >{{ errors.company }}</p>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
      <div>
        <label class="block font-label-sm text-label-sm text-text-secondary mb-1.5" :for="fieldId('email')">E-mail Profissional</label>
        <input
          :id="fieldId('email')"
          v-model="form.email"
          :class="inputClass"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? fieldId('email') + '-error' : undefined"
          placeholder="roberto@nexuscorp.com"
          required
          type="email"
          @input="clearError('email')"
        >
        <p
          v-if="errors.email"
          :id="fieldId('email') + '-error'"
          role="alert"
          class="mt-1 font-label-sm text-label-sm text-error"
        >{{ errors.email }}</p>
      </div>
      <div>
        <label class="block font-label-sm text-label-sm text-text-secondary mb-1.5" :for="fieldId('projectType')">Tipo de Projeto</label>
        <select
          :id="fieldId('projectType')"
          v-model="form.projectType"
          :class="inputClass"
          :aria-invalid="errors.projectType ? 'true' : undefined"
          :aria-describedby="errors.projectType ? fieldId('projectType') + '-error' : undefined"
          required
          @change="clearError('projectType')"
        >
          <option v-for="type in projectTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
        </select>
        <p
          v-if="errors.projectType"
          :id="fieldId('projectType') + '-error'"
          role="alert"
          class="mt-1 font-label-sm text-label-sm text-error"
        >{{ errors.projectType }}</p>
      </div>
    </div>
    <div>
      <label class="block font-label-sm text-label-sm text-text-secondary mb-1.5" :for="fieldId('details')">Detalhes do Desafio</label>
      <textarea
        :id="fieldId('details')"
        v-model="form.details"
        :class="textareaClass"
        :aria-invalid="errors.details ? 'true' : undefined"
        :aria-describedby="errors.details ? fieldId('details') + '-error' : undefined"
        placeholder="Conte brevemente sobre o escopo, objetivos ou limitações técnicas atuais..."
        required
        rows="4"
        @input="clearError('details')"
      ></textarea>
      <p
        v-if="errors.details"
        :id="fieldId('details') + '-error'"
        role="alert"
        class="mt-1 font-label-sm text-label-sm text-error"
      >{{ errors.details }}</p>
    </div>
    <div
      v-if="submitState === 'pending'"
      aria-live="polite"
      role="status"
      class="rounded-xl border border-secondary/30 bg-secondary/10 px-space-md py-space-sm font-body-sm text-body-sm text-text-secondary"
    >
      Integração de envio pendente de configuração. Entre em contato pelos canais ao lado enquanto ativamos o recebimento do formulário.
    </div>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-2">
      <button
        class="btn-sheen w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-xl bg-primary-container hover:bg-violet-hover text-text-primary font-label-md text-label-md transition-all shadow-[0_0_24px_rgba(140,128,255,0.4)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        :disabled="submitState === 'pending'"
      >
        <span>{{ submitState === 'pending' ? 'Envio indisponível' : 'Fale com um especialista' }}</span>
        <span class="material-symbols-outlined text-[18px]">send</span>
      </button>
      <a
        v-if="whatsappHref"
        class="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-text-primary transition-colors py-2"
        :href="whatsappHref"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span class="material-symbols-outlined text-[20px]">forum</span>
        <span>Chamar via WhatsApp</span>
      </a>
    </div>
  </form>
</template>
