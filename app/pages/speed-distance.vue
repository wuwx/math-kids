<script setup lang="ts">
const count = ref(10)
const problems = ref<{ question: string, answer: number, unit: string }[]>([])

function generate() {
  const result: { question: string, answer: number, unit: string }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)
    let question: string, answer: number, unit: string

    switch (type) {
      case 0: { // 求路程
        const speed = Math.floor(Math.random() * 50) + 30
        const time = Math.floor(Math.random() * 5) + 1
        question = `汽车每小时行驶 ${speed} 千米，行驶 ${time} 小时，共行驶多少千米？`
        answer = speed * time
        unit = '千米'
        break
      }
      case 1: { // 求时间
        const speed = Math.floor(Math.random() * 50) + 30
        const time = Math.floor(Math.random() * 5) + 2
        const distance = speed * time
        question = `火车每小时行驶 ${speed} 千米，行驶 ${distance} 千米需要多少小时？`
        answer = time
        unit = '小时'
        break
      }
      default: { // 求速度
        const speed = Math.floor(Math.random() * 50) + 30
        const time = Math.floor(Math.random() * 5) + 2
        const distance = speed * time
        question = `小明骑车 ${time} 小时行驶了 ${distance} 千米，平均每小时行驶多少千米？`
        answer = speed
        unit = '千米/小时'
      }
    }

    result.push({ question, answer, unit })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-blue-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🚗 行程问题</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div class="text-sm text-blue-700 dark:text-blue-300">💡 路程 = 速度 × 时间</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="20" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="blue" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">行程问题</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(problem, idx) in problems" :key="idx" class="problem-row">
            <td class="p-3 align-top">
              <div class="problem-item">
                <div class="text-base text-gray-800 dark:text-gray-100 mb-2">{{ idx + 1 }}. {{ problem.question }}</div>
                <div class="border border-dashed border-gray-300 dark:border-gray-600 rounded h-20 print:h-24" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
@media print {
  @page { size: A4; margin: 10mm; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  thead { display: table-header-group; }
  .problem-row { page-break-inside: avoid; }
}
</style>
