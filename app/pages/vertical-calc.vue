<script setup lang="ts">
const count = ref(8)
const calcType = ref<'add' | 'sub' | 'mul' | 'div'>('add')
const problems = ref<{ a: number, b: number, op: string, answer: number }[]>([])

function generate() {
  const result: { a: number, b: number, op: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    let a: number, b: number, op: string, answer: number

    switch (calcType.value) {
      case 'add':
        a = Math.floor(Math.random() * 900) + 100
        b = Math.floor(Math.random() * 900) + 100
        op = '+'
        answer = a + b
        break
      case 'sub':
        a = Math.floor(Math.random() * 500) + 500
        b = Math.floor(Math.random() * 400) + 100
        op = '−'
        answer = a - b
        break
      case 'mul':
        a = Math.floor(Math.random() * 90) + 10
        b = Math.floor(Math.random() * 9) + 2
        op = '×'
        answer = a * b
        break
      default:
        b = Math.floor(Math.random() * 8) + 2
        answer = Math.floor(Math.random() * 90) + 10
        a = b * answer
        op = '÷'
    }

    result.push({ a, b, op, answer })
  }
  problems.value = result
}

watch([count, calcType], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-sky-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-sky-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">📝 竖式计算</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
            <div class="text-sm text-sky-700 dark:text-sky-300">💡 用竖式计算，注意对齐</div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput v-model="count" type="number" :min="1" :max="20" class="text-center" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">运算类型</label>
              <USelectMenu v-model="calcType" :items="[{ label: '加法', value: 'add' }, { label: '减法', value: 'sub' }, { label: '乘法', value: 'mul' }, { label: '除法', value: 'div' }]" value-key="value" class="w-full" />
            </div>
          </div>
          <UButton block size="lg" color="sky" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th colspan="2" class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">竖式计算</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, rowIndex) in Math.ceil(problems.length / 2)" :key="rowIndex" class="problem-row">
            <td v-for="colIndex in 2" :key="colIndex" class="p-4 w-1/2 align-top">
              <div v-if="problems[rowIndex * 2 + colIndex - 1]" class="problem-item">
                <div class="text-lg font-mono text-gray-800 dark:text-gray-100 mb-2">
                  {{ problems[rowIndex * 2 + colIndex - 1].a }} {{ problems[rowIndex * 2 + colIndex - 1].op }} {{ problems[rowIndex * 2 + colIndex - 1].b }} =
                </div>
                <div class="border border-dashed border-gray-300 dark:border-gray-600 rounded h-32 print:h-36" />
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
