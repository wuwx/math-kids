<script setup lang="ts">
const count = ref(10)
const problems = ref<{ question: string, answer: number }[]>([])

function generate() {
  const result: { question: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    let question: string, answer: number

    switch (type) {
      case 0: { // 两端都种，求棵数
        const length = (Math.floor(Math.random() * 20) + 5) * 5
        const interval = Math.floor(Math.random() * 4) + 2
        const trees = length / interval + 1
        question = `一条 ${length} 米的路，每隔 ${interval} 米种一棵树，两端都种，共种多少棵？`
        answer = trees
        break
      }
      case 1: { // 两端都不种，求棵数
        const length = (Math.floor(Math.random() * 20) + 5) * 5
        const interval = Math.floor(Math.random() * 4) + 2
        const trees = length / interval - 1
        question = `一条 ${length} 米的路，每隔 ${interval} 米种一棵树，两端都不种，共种多少棵？`
        answer = trees
        break
      }
      case 2: { // 一端种一端不种
        const length = (Math.floor(Math.random() * 20) + 5) * 5
        const interval = Math.floor(Math.random() * 4) + 2
        const trees = length / interval
        question = `一条 ${length} 米的路，每隔 ${interval} 米种一棵树，只在一端种，共种多少棵？`
        answer = trees
        break
      }
      default: { // 环形
        const length = (Math.floor(Math.random() * 15) + 5) * 6
        const interval = Math.floor(Math.random() * 3) + 2
        const trees = length / interval
        question = `一个周长 ${length} 米的圆形花坛，每隔 ${interval} 米种一棵树，共种多少棵？`
        answer = trees
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
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-green-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-green-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🌳 植树问题</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div class="text-sm text-green-700 dark:text-green-300">💡 两端都种：棵数=间隔数+1；两端不种：棵数=间隔数-1</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="20" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="green" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">植树问题</div>
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
