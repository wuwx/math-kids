<script setup lang="ts">
const props = defineProps<{
  title: string
  icon?: string
}>()

useHead({
  title: () => `${props.title} · 小学数学练习`
})

function printPage() {
  window.print()
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 print:max-w-none print:p-0 print:py-0">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between mb-6 print:hidden">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <UIcon
            :name="icon ?? 'i-lucide-calculator'"
            class="w-5 h-5"
          />
        </div>
        <h1 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          {{ title }}
        </h1>
      </div>
      <UButton
        icon="i-lucide-printer"
        variant="soft"
        @click="printPage"
      >
        打印
      </UButton>
    </div>

    <!-- 参数设置 -->
    <div
      v-if="$slots.settings"
      class="mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-none print:hidden"
    >
      <slot name="settings" />
    </div>

    <!-- 题目卷面 -->
    <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm dark:shadow-none print:border-0 print:rounded-none print:p-0">
      <table class="w-full">
        <thead>
          <tr>
            <!-- colspan 取上限由浏览器裁剪到实际列数：各页面列数不同（2 或 3），写死会让表头只占第一列 -->
            <th
              colspan="1000"
              class="p-0 text-left"
            >
              <div class="flex justify-between items-center gap-4 flex-wrap pb-4 mb-4 border-b-2 border-slate-200 dark:border-slate-800 print:border-slate-400">
                <div class="shrink-0 font-display text-xl font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  {{ title }}
                </div>
                <div class="flex items-center gap-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <span>日期：<span class="inline-block w-24 border-b border-slate-400" /></span>
                  <span>姓名：<span class="inline-block w-20 border-b border-slate-400" /></span>
                  <span class="flex items-center gap-2">评分：<span class="inline-block w-14 h-7 border border-slate-400 rounded-sm" /></span>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="worksheet">
          <slot />
        </tbody>
      </table>
    </div>
  </div>
</template>
