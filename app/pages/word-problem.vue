<script setup lang="ts">
const count = ref(10)
const problems = ref<{ question: string, answer: number }[]>([])

const templates = [
  { gen: () => { const a = rand(10, 50), b = rand(10, 50); return { q: `小明有${a}个苹果，小红有${b}个苹果，他们一共有多少个苹果？`, a: a + b } } },
  { gen: () => { const a = rand(30, 80), b = rand(10, 29); return { q: `图书馆有${a}本书，借出去${b}本，还剩多少本？`, a: a - b } } },
  { gen: () => { const a = rand(3, 9), b = rand(5, 12); return { q: `每盒有${a}个鸡蛋，买了${b}盒，一共有多少个鸡蛋？`, a: a * b } } },
  { gen: () => { const b = rand(3, 9), c = rand(5, 12), a = b * c; return { q: `${a}个糖果平均分给${b}个小朋友，每人分到多少个？`, a: c } } },
  { gen: () => { const a = rand(20, 50), b = rand(10, 30), c = rand(5, 20); return { q: `小明有${a}元，买文具花了${b}元，买零食花了${c}元，还剩多少元？`, a: a - b - c } } },
  { gen: () => { const a = rand(5, 15), b = rand(3, 8); return { q: `一支铅笔${a}元，买${b}支需要多少元？`, a: a * b } } },
  { gen: () => { const a = rand(100, 200), b = rand(50, 99); return { q: `火车上有${a}人，到站后下车${b}人，车上还有多少人？`, a: a - b } } },
  { gen: () => { const a = rand(20, 40), b = rand(15, 35); return { q: `果园里有苹果树${a}棵，梨树${b}棵，果树一共有多少棵？`, a: a + b } } },
  { gen: () => { const a = rand(4, 8), b = rand(6, 12); return { q: `教室每排有${a}张桌子，共${b}排，一共有多少张桌子？`, a: a * b } } },
  { gen: () => { const b = rand(4, 8), c = rand(3, 7), a = b * c; return { q: `${a}本书平均放在${b}个书架上，每个书架放多少本？`, a: c } } },
]

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generate() {
  const result: { question: string, answer: number }[] = []
  for (let i = 0; i < count.value; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)]
    const { q, a } = template.gen()
    result.push({ question: q, answer: a })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-rose-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-rose-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">📖 应用题</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
            <div class="text-sm text-rose-700 dark:text-rose-300">💡 读题、列式、计算、作答</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="20" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="rose" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">应用题</div>
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
                <div class="border border-dashed border-gray-300 dark:border-gray-600 rounded h-24 print:h-28" />
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
