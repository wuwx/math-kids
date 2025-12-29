<script setup lang="ts">
const count = ref(15)
const problems = ref<{ question: string, answer: number }[]>([])

function generate() {
  const result: { question: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)
    let question: string, answer: number

    switch (type) {
      case 0: { // 正方形面积
        const side = Math.floor(Math.random() * 15) + 2
        question = `正方形边长 ${side} cm，面积 = ___ cm²`
        answer = side * side
        break
      }
      case 1: { // 长方形面积
        const length = Math.floor(Math.random() * 12) + 3
        const width = Math.floor(Math.random() * 8) + 2
        question = `长方形长 ${length} cm，宽 ${width} cm，面积 = ___ cm²`
        answer = length * width
        break
      }
      default: { // 已知面积求边长
        const side = Math.floor(Math.random() * 12) + 2
        const area = side * side
        question = `正方形面积 ${area} cm²，边长 = ___ cm`
        answer = side
      }
    }

    result.push({ question, answer })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-emerald-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-emerald-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">📏 面积计算</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <div class="text-sm text-emerald-700 dark:text-emerald-300">💡 正方形面积=边长×边长，长方形面积=长×宽</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="30" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="emerald" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">面积计算</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(problem, idx) in problems" :key="idx" class="problem-row">
            <td class="p-3 align-top">
              <div class="problem-item text-lg text-gray-800 dark:text-gray-100">
                {{ idx + 1 }}. {{ problem.question }}
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
