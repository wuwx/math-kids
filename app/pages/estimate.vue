<script setup lang="ts">
const count = ref(20)
const problems = ref<{ expression: string, answer: number }[]>([])

function generate() {
  const result: { expression: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)
    let a: number, b: number, op: string, answer: number

    switch (type) {
      case 0: // 加法估算
        a = Math.floor(Math.random() * 900) + 100
        b = Math.floor(Math.random() * 900) + 100
        op = '+'
        answer = Math.round((a + b) / 100) * 100
        break
      case 1: // 减法估算
        a = Math.floor(Math.random() * 500) + 500
        b = Math.floor(Math.random() * 400) + 100
        op = '−'
        answer = Math.round((a - b) / 100) * 100
        break
      default: // 乘法估算
        a = Math.floor(Math.random() * 90) + 10
        b = Math.floor(Math.random() * 9) + 2
        op = '×'
        answer = Math.round((a * b) / 10) * 10
    }

    result.push({ expression: `${a} ${op} ${b} ≈`, answer })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-amber-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-amber-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🎯 估算练习</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div class="text-sm text-amber-700 dark:text-amber-300">💡 估算结果，取整到十位或百位</div>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput v-model="count" type="number" :min="1" :max="50" class="text-center max-w-32" />
            </div>
          </div>
          <UButton block size="lg" color="amber" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th colspan="3" class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">估算练习</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, rowIndex) in Math.ceil(problems.length / 3)" :key="rowIndex" class="problem-row">
            <td v-for="colIndex in 3" :key="colIndex" class="p-3 w-1/3 align-top">
              <div v-if="problems[rowIndex * 3 + colIndex - 1]" class="problem-item text-lg font-mono tracking-wide text-gray-800 dark:text-gray-100">
                {{ problems[rowIndex * 3 + colIndex - 1].expression }}
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
