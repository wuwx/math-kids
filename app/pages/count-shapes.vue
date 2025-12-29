<script setup lang="ts">
const problems = ref<{ type: string, size: number, answer: number }[]>([])

function countSquares(n: number): number {
  let count = 0
  for (let s = 1; s <= n; s++) {
    count += (n - s + 1) * (n - s + 1)
  }
  return count
}

function generate() {
  const result: { type: string, size: number, answer: number }[] = []

  for (let i = 0; i < 6; i++) {
    const size = Math.floor(Math.random() * 3) + 2
    result.push({
      type: '正方形',
      size,
      answer: countSquares(size)
    })
  }

  problems.value = result
}

onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-orange-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-orange-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🔷 图形计数</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">
            打印
          </UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <div class="text-sm text-orange-700 dark:text-orange-300">
              💡 仔细观察，数一数图中有多少个正方形
            </div>
          </div>
          <UButton block size="lg" color="orange" class="mt-5" @click="generate">
            🎲 重新生成
          </UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <div class="flex justify-between items-center pb-4 mb-6 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
        <div class="text-xl font-bold text-gray-800 dark:text-gray-100">图形计数</div>
        <div class="text-gray-600 dark:text-gray-300">
          日期：<span class="inline-block w-28 border-b border-gray-400" />
        </div>
        <div class="text-gray-600 dark:text-gray-300">
          姓名：<span class="inline-block w-24 border-b border-gray-400" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-8">
        <div v-for="(problem, idx) in problems" :key="idx" class="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div class="text-base text-gray-800 dark:text-gray-100 mb-4">
            {{ idx + 1 }}. 数一数下图中有多少个{{ problem.type }}？
          </div>

          <div class="flex justify-center mb-4">
            <div
              class="grid border-2 border-gray-800 dark:border-gray-300"
              :style="{ gridTemplateColumns: `repeat(${problem.size}, 2.5rem)` }"
            >
              <div
                v-for="i in problem.size * problem.size"
                :key="i"
                class="w-10 h-10 border border-gray-400 dark:border-gray-500"
              />
            </div>
          </div>

          <div class="text-center text-gray-800 dark:text-gray-100">
            答：___ 个
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
