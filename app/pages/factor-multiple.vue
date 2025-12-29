<script setup lang="ts">
const count = ref(15)
const problems = ref<{ question: string, answer: string }[]>([])

function getFactors(n: number): number[] {
  const factors: number[] = []
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i)
  }
  return factors
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

function generate() {
  const result: { question: string, answer: string }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 5)
    let question: string, answer: string

    switch (type) {
      case 0: { // 列出因数
        const num = Math.floor(Math.random() * 30) + 10
        const factors = getFactors(num)
        question = `${num} 的所有因数是___`
        answer = factors.join(', ')
        break
      }
      case 1: { // 判断因数
        const a = Math.floor(Math.random() * 10) + 2
        const b = a * (Math.floor(Math.random() * 10) + 2)
        question = `${a} 是 ${b} 的因数吗？___（是/否）`
        answer = '是'
        break
      }
      case 2: { // 判断倍数
        const a = Math.floor(Math.random() * 10) + 2
        const b = a * (Math.floor(Math.random() * 10) + 2)
        question = `${b} 是 ${a} 的倍数吗？___（是/否）`
        answer = '是'
        break
      }
      case 3: { // 最大公因数
        const a = Math.floor(Math.random() * 20) + 10
        const b = Math.floor(Math.random() * 20) + 10
        question = `${a} 和 ${b} 的最大公因数是___`
        answer = gcd(a, b).toString()
        break
      }
      default: { // 最小公倍数
        const a = Math.floor(Math.random() * 10) + 3
        const b = Math.floor(Math.random() * 10) + 3
        question = `${a} 和 ${b} 的最小公倍数是___`
        answer = lcm(a, b).toString()
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
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-cyan-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-cyan-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🔗 因数与倍数</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
            <div class="text-sm text-cyan-700 dark:text-cyan-300">💡 找因数、倍数，求最大公因数和最小公倍数</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="30" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="cyan" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">因数与倍数</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(problem, idx) in problems" :key="idx" class="problem-row">
            <td class="p-3 align-top">
              <div class="problem-item text-base text-gray-800 dark:text-gray-100">
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
