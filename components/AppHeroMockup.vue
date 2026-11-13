<template>
  <div class="w-full">
    <!-- Variante mobile (<lg): terminal compacto da referência mobile L272-320.
         Métricas fictícias da referência (uptime, latência, throughput) foram
         substituídas pelos rótulos neutros do mockup desktop. -->
    <div class="lg:hidden interactive-card mt-3 rounded-xl bg-surface-elevated/90 backdrop-blur-md p-space-md shadow-2xl flex flex-col gap-space-md group active:scale-[0.99]">
      <div class="flex items-center justify-between pb-space-sm border-b border-white/5">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-error/80 transition-transform group-hover:scale-110"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-tertiary/80 transition-transform group-hover:scale-110"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-secondary/80 transition-transform group-hover:scale-110"></span>
        </div>
        <span class="font-label-sm text-label-sm text-text-muted font-mono tracking-tight text-[11px] group-hover:text-text-primary transition-colors">moraes.cluster-core // node-01</span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high border border-secondary/20 text-[11px] font-label-sm text-secondary">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary live-pulse-badge"></span> Operação 24/7
        </span>
      </div>
      <div class="grid grid-cols-2 gap-2 bg-surface-container-lowest/80 p-2.5 rounded-lg border border-white/5">
        <div class="flex flex-col">
          <span class="font-label-sm text-label-sm text-text-muted text-[11px]">STATUS</span>
          <span class="font-headline-sm text-headline-sm text-text-primary font-mono text-[17px] group-hover:text-primary transition-colors">Monitorado 24/7</span>
        </div>
        <div class="flex flex-col">
          <span class="font-label-sm text-label-sm text-text-muted text-[11px]">TELEMETRIA</span>
          <span class="font-headline-sm text-headline-sm text-secondary font-mono text-[17px] group-hover:scale-105 transition-transform origin-left">Tempo real</span>
        </div>
      </div>
      <div class="relative w-full h-24 bg-surface-container-lowest/90 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-white/5">
        <svg class="w-full h-full" fill="none" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
          <path class="text-surface-container-highest" d="M 40 40 L 110 20 L 180 50 L 250 25 L 290 40" stroke="currentColor" stroke-dasharray="3 3" stroke-width="2"></path>
          <path class="text-surface-container-highest" d="M 110 20 L 180 20 L 250 55" stroke="currentColor" stroke-width="1.5"></path>
          <path class="text-primary pipeline-flow" d="M 40 40 L 110 20 L 180 50 L 250 25" stroke="currentColor" stroke-dasharray="8 4" stroke-width="2.2"></path>
          <circle class="fill-surface-elevated text-secondary transition-all" cx="40" cy="40" r="7" stroke="currentColor" stroke-width="2"></circle>
          <circle class="fill-surface-elevated text-primary transition-all" cx="110" cy="20" r="8" stroke="currentColor" stroke-width="2"></circle>
          <circle class="fill-surface-elevated text-secondary transition-all" cx="180" cy="50" r="9" stroke="currentColor" stroke-width="2"></circle>
          <circle class="fill-surface-elevated text-primary transition-all" cx="250" cy="25" r="7" stroke="currentColor" stroke-width="2"></circle>
          <circle class="fill-surface-elevated text-tertiary transition-all" cx="290" cy="40" r="5" stroke="currentColor" stroke-width="2"></circle>
          <circle class="fill-primary" cx="110" cy="20" r="3"></circle>
          <circle class="fill-secondary opacity-75 live-pulse-badge" cx="180" cy="50" r="6"></circle>
          <circle class="fill-secondary" cx="180" cy="50" r="3.5"></circle>
          <circle class="fill-primary" cx="250" cy="25" r="2.5"></circle>
        </svg>
      </div>
      <div class="flex items-center justify-between text-[11px] font-mono text-text-muted px-1">
        <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-primary live-pulse-badge"></span> Microservices Mesh</span>
        <span class="text-text-secondary group-hover:text-secondary transition-colors">Orchestrated K8s</span>
      </div>
    </div>

    <!-- Variante desktop (lg+): mockup original -->
    <div class="hidden lg:block w-full max-w-5xl mx-auto relative rounded-2xl bg-surface/90 shadow-2xl p-space-lg backdrop-blur-xl border border-border-subtle/80 hover:border-primary/40 transition-all duration-500 animate-float-slow">
      <div class="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low/60 rounded-lg px-space-md py-space-sm border border-border-subtle/40">
        <div class="flex items-center gap-space-xs">
          <span class="w-3 h-3 rounded-full bg-error/70 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-tertiary/70 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-secondary/70 inline-block"></span>
          <span class="ml-space-sm font-label-sm text-label-sm text-text-muted font-mono">moraes.cluster-core // production-node-01</span>
        </div>
        <div class="flex items-center gap-space-sm">
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface text-secondary font-label-sm text-[11px] border border-secondary/20">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Operação 24/7
          </span>
          <span class="hidden md:inline-flex px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-[11px] text-text-muted">Distributed Cloud</span>
          <span class="hidden md:inline-flex px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-[11px] text-text-muted">Real-time Streaming</span>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-md text-left">
        <div class="lg:col-span-6 bg-surface-container-lowest/90 rounded-xl p-space-md font-mono text-[13px] leading-relaxed overflow-x-auto shadow-inner border border-border-subtle/50">
          <div class="flex items-center justify-between text-text-muted mb-space-sm pb-1">
            <span class="font-label-sm text-[11px] text-primary">MicroserviceEngine.cs</span>
            <span class="font-label-sm text-[11px]">Async / gRPC stream</span>
          </div>
<pre class="text-text-secondary"><span class="text-violet-light">public async Task</span>&lt;ExecutionResult&gt; <span class="text-secondary">ProcessPipelineAsync</span>(EventStream stream)
{
    <span class="text-text-muted">// Auto-scaling fault tolerance policy</span>
    <span class="text-violet-light">var</span> engine = <span class="text-violet-light">await</span> _clusterPool.<span class="text-secondary">AcquireAsync</span>();
    <span class="text-violet-light">var</span> telemetry = stream.<span class="text-secondary">TrackLatency</span>();

    <span class="text-violet-light">return await</span> engine.<span class="text-secondary">ExecuteDistributedRoute</span>(
        payload: stream.Payload,
        mode: <span class="text-tertiary">StreamMode.RealTime</span>,
        encryption: CryptographyStandard.<span class="text-primary">ChaCha20Poly1305</span>
    );
}</pre>
        </div>
        <div class="lg:col-span-6 flex flex-col justify-between gap-space-md">
          <div class="grid grid-cols-3 gap-space-sm">
            <div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 transition-all hover:bg-surface-container hover:scale-[1.02] border border-border-subtle/40">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-secondary text-[16px]">hub</span>
                <span class="font-label-sm text-[10px] text-secondary">ACTIVO</span>
              </div>
              <span class="font-label-md text-body-sm font-semibold text-text-primary">API Gateway</span>
              <span class="font-body-sm text-[11px] text-text-muted">Streaming em tempo real</span>
            </div>
            <div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 transition-all hover:bg-surface-container hover:scale-[1.02] border border-border-subtle/40">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-primary text-[16px]">schema</span>
                <span class="font-label-sm text-[10px] text-primary">SYNC</span>
              </div>
              <span class="font-label-md text-body-sm font-semibold text-text-primary">Event Broker</span>
              <span class="font-body-sm text-[11px] text-text-muted">Fluxo contínuo de eventos</span>
            </div>
            <div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 transition-all hover:bg-surface-container hover:scale-[1.02] border border-border-subtle/40">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-tertiary text-[16px]">memory</span>
                <span class="font-label-sm text-[10px] text-tertiary">STABLE</span>
              </div>
              <span class="font-label-md text-body-sm font-semibold text-text-primary">Data Core</span>
              <span class="font-body-sm text-[11px] text-text-muted">Pipeline ativo</span>
            </div>
          </div>
          <div class="bg-surface-container-lowest/80 p-space-md rounded-xl flex flex-col justify-between h-full border border-border-subtle/50">
            <div class="flex items-center justify-between text-body-sm text-text-muted mb-2">
              <span class="font-label-sm text-text-primary font-medium">Topologia de Cargas</span>
              <span class="font-label-sm text-secondary font-mono">Orquestração distribuída</span>
            </div>
            <svg class="w-full h-24 overflow-visible" fill="none" viewBox="0 0 460 80" xmlns="http://www.w3.org/2000/svg">
              <path class="text-border-subtle" d="M 20 40 Q 110 5, 230 40 T 440 40" fill="none" stroke="currentColor" stroke-dasharray="4 4" stroke-width="2"></path>
              <path class="text-border-subtle" d="M 20 40 Q 110 75, 230 40 T 440 40" fill="none" stroke="currentColor" stroke-dasharray="4 4" stroke-width="2"></path>
              <path class="text-primary animate-dash-flow" d="M 20 40 Q 110 5, 230 40 T 440 40" fill="none" stroke="currentColor" stroke-dasharray="80 140" stroke-width="2.5"></path>
              <circle class="fill-surface stroke-primary" cx="20" cy="40" r="8" stroke-width="3"></circle>
              <circle class="fill-secondary" cx="125" cy="22" r="6"></circle>
              <circle class="fill-surface stroke-secondary" cx="230" cy="40" r="10" stroke-width="3"></circle>
              <circle class="fill-primary" cx="335" cy="58" r="6"></circle>
              <circle class="fill-surface stroke-tertiary" cx="440" cy="40" r="8" stroke-width="3"></circle>
            </svg>
            <div class="flex items-center justify-between pt-2 text-[11px] text-text-muted">
              <span>Ingestão Global</span>
              <span>Transformação Distribuída</span>
              <span>Armazenamento Multi-Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
