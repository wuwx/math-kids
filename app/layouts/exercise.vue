<template>
  <div class="min-h-screen bg-surface dark:bg-slate-950">
    <header class="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800 bg-surface/80 dark:bg-slate-950/80 backdrop-blur print:hidden">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UButton
            to="/"
            variant="ghost"
            color="neutral"
            icon="i-lucide-chevron-left"
            label="返回"
          />
          <div class="hidden sm:flex items-center gap-2.5">
            <div class="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
              <span class="font-display text-white text-[13px] leading-none">数</span>
            </div>
            <span class="font-medium text-slate-700 dark:text-slate-300">数学练习</span>
          </div>
        </div>
        <UColorModeButton />
      </div>
    </header>

    <slot />
  </div>
</template>
