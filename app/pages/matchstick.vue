<script setup lang="ts">
const problems = ref<{ equation: string, hint: string, answer: string }[]>([])

const puzzles = [
  { equation: '6 + 4 = 4', hint: '移动1根', answer: '0 + 4 = 4' },
  { equation: '8 - 3 = 2', hint: '移动1根', answer: '9 - 3 = 6 或 8 - 2 = 6' },
  { equation: '1 + 1 = 3', hint: '移动1根', answer: '1 + 1 ≠ 3 或 7 - 1 = 6' },
  { equation: '5 + 5 = 5', hint: '移动1根', answer: '5 + 0 = 5' },
  { equation: '3 + 3 = 8', hint: '移动1根', answer: '3 + 5 = 8' },
  { equation: '6 - 6 = 6', hint: '移动1根', answer: '6 - 0 = 6 或 8 - 6 = 2' },
  { equation: '9 - 1 = 6', hint: '移动1根', answer: '9 - 3 = 6' },
  { equation: '1 = 7 - 1', hint: '移动1根', answer: '1 = 7 - 6' },
]

function generate() {
  const shuffled = [...puzzles].sort(() => Math.random() - 0.5)
  problems.value = shuffled.slice(0, 6)
}

onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-red-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🔥 火柴棒游戏</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div class="text-sm text-red-700 dark:text-red-300">💡 移动火柴棒使等式成立</div>
          </div>
          <UButton block size="lg" color="red" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <div class="flex justify-between items-center pb-4 mb-6 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
        <div class="text-xl font-bold text-gray-800 dark:text-gray-100">火柴棒游戏</div>
        <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
        <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div v-for="(problem, idx) in problems" :key="idx" class="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ idx + 1 }}. {{ problem.hint }}使等式成立</div>
          <div class="text-3xl font-mono text-center py-4 text-gray-800 dark:text-gray-100">
            {{ problem.equation }}
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-sm text-gray-500">答案：</div>
            <div class="h-8 border-b border-gray-300 dark:border-gray-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  @page { size: A4; margin: 10mm; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
