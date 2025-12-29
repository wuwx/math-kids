<script setup lang="ts">
const count = ref(20)
const problems = ref<{ question: string, answer: number }[]>([])

function generate() {
  const result: { question: string, answer: number }[] = []
  const places = ['个', '十', '百', '千']

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    const num = Math.floor(Math.random() * 9000) + 1000
    const digits = num.toString().split('').reverse()
    let question: string, answer: number

    switch (type) {
      case 0: { // 某位上是几
        const pos = Math.floor(Math.random() * 4)
        question = `${num} 的${places[pos]}位上是___`
        answer = parseInt(digits[pos])
        break
      }
      case 1: { // 某数字在什么位
        const pos = Math.floor(Math.random() * 4)
        const digit = digits[pos]
        question = `${num} 中，${digit} 在___位上`
        answer = pos // 0=个,1=十,2=百,3=千
        break
      }
      case 2: { // 某位表示多少
        const pos = Math.floor(Math.random() * 3) + 1
        const digit = parseInt(digits[pos])
        question = `${num} 的${places[pos]}位上的 ${digit} 表示___`
        answer = digit * Math.pow(10, pos)
        break
      }
      default: { // 组成
        const thousands = parseInt(digits[3])
        const hundreds = parseInt(digits[2])
        const tens = parseInt(digits[1])
        const ones = parseInt(digits[0])
        question = `${thousands}个千 + ${hundreds}个百 + ${tens}个十 + ${ones}个一 = ___`
        answer = num
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
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-indigo-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-indigo-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🔢 数位练习</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <div class="text-sm text-indigo-700 dark:text-indigo-300">💡 认识个、十、百、千位</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="30" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="indigo" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th colspan="2" class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">数位练习</div>
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
