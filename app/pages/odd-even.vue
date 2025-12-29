<script setup lang="ts">
const count = ref(20)
const problems = ref<{ question: string, answer: string }[]>([])

function generate() {
  const result: { question: string, answer: string }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    let question: string, answer: string

    switch (type) {
      case 0: { // 判断奇偶
        const num = Math.floor(Math.random() * 1000) + 1
        question = `${num} 是___数（奇/偶）`
        answer = num % 2 === 0 ? '偶' : '奇'
        break
      }
      case 1: { // 奇+奇
        const a = Math.floor(Math.random() * 50) * 2 + 1
        const b = Math.floor(Math.random() * 50) * 2 + 1
        question = `${a} + ${b} 的结果是___数（奇/偶）`
        answer = '偶'
        break
      }
      case 2: { // 奇+偶
        const a = Math.floor(Math.random() * 50) * 2 + 1
        const b = Math.floor(Math.random() * 50) * 2
        question = `${a} + ${b} 的结果是___数（奇/偶）`
        answer = '奇'
        break
      }
      default: { // 偶+偶
        const a = Math.floor(Math.random() * 50) * 2 + 2
        const b = Math.floor(Math.random() * 50) * 2 + 2
        question = `${a} + ${b} 的结果是___数（奇/偶）`
        answer = '偶'
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
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-pink-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-pink-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🔄 奇偶数判断</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
            <div class="text-sm text-pink-700 dark:text-pink-300">💡 能被2整除的是偶数，不能被2整除的是奇数</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="40" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="pink" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th colspan="2" class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">奇偶数判断</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, rowIndex) in Math.ceil(problems.length / 2)" :key="rowIndex" class="problem-row">
            <td v-for="colIndex in 2" :key="colIndex" class="p-3 w-1/2 align-top">
              <div v-if="problems[rowIndex * 2 + colIndex - 1]" class="problem-item text-base text-gray-800 dark:text-gray-100">
                {{ rowIndex * 2 + colIndex }}. {{ problems[rowIndex * 2 + colIndex - 1].question }}
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
