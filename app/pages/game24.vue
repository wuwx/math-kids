<script setup lang="ts">
const count = ref(10)
const problems = ref<{ numbers: number[], hasSolution: boolean }[]>([])

// 检查四个数能否算出24
function canMake24(nums: number[]): boolean {
  if (nums.length === 1) return Math.abs(nums[0] - 24) < 0.0001

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue
      const remaining = nums.filter((_, k) => k !== i && k !== j)
      const a = nums[i], b = nums[j]

      for (const result of [a + b, a - b, a * b, b !== 0 ? a / b : NaN]) {
        if (!isNaN(result) && canMake24([...remaining, result])) return true
      }
    }
  }
  return false
}

function generate() {
  const result: { numbers: number[], hasSolution: boolean }[] = []

  for (let i = 0; i < count.value; i++) {
    let nums: number[]
    let attempts = 0

    // 尝试生成有解的题目
    do {
      nums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 13) + 1)
      attempts++
    } while (!canMake24(nums) && attempts < 100)

    result.push({ numbers: nums, hasSolution: canMake24(nums) })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-red-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🎴 24点游戏</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div class="text-sm text-red-700 dark:text-red-300">💡 用加减乘除把4个数算成24</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
            <UInput v-model="count" type="number" :min="1" :max="20" class="text-center max-w-32" />
          </div>
          <UButton block size="lg" color="red" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">24点游戏</div>
                <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
                <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(problem, idx) in problems" :key="idx" class="problem-row">
            <td class="p-4 align-top">
              <div class="problem-item">
                <div class="flex items-center gap-4 mb-3">
                  <span class="text-gray-500">{{ idx + 1 }}.</span>
                  <div class="flex gap-3">
                    <span v-for="(num, j) in problem.numbers" :key="j" class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl font-bold text-gray-800 dark:text-gray-100">
                      {{ num }}
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-500 mb-2">算式：</div>
                <div class="border-b border-gray-300 dark:border-gray-600 h-8" />
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
