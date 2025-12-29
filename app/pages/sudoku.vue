<script setup lang="ts">
const difficulty = ref<'easy' | 'medium'>('easy')
const grid = ref<(number | null)[][]>([])
const solution = ref<number[][]>([])

function generateSudoku4x4(): { puzzle: (number | null)[][], solution: number[][] } {
  // 生成完整的4x4数独解
  const sol: number[][] = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1]
  ]

  // 随机打乱行和列
  for (let i = 0; i < 10; i++) {
    const r1 = Math.floor(Math.random() * 2)
    const r2 = Math.floor(Math.random() * 2) + 2
    if (Math.random() > 0.5) {
      [sol[r1], sol[r1 + (Math.random() > 0.5 ? 0 : 1)]] = [sol[r1 + (Math.random() > 0.5 ? 0 : 1)], sol[r1]]
    }
  }

  // 创建谜题（移除一些数字）
  const puzzle: (number | null)[][] = sol.map(row => [...row])
  const removeCount = difficulty.value === 'easy' ? 6 : 9

  let removed = 0
  while (removed < removeCount) {
    const r = Math.floor(Math.random() * 4)
    const c = Math.floor(Math.random() * 4)
    if (puzzle[r][c] !== null) {
      puzzle[r][c] = null
      removed++
    }
  }

  return { puzzle, solution: sol }
}

function generate() {
  const result = generateSudoku4x4()
  grid.value = result.puzzle
  solution.value = result.solution
}

watch([difficulty], () => generate())
onMounted(() => generate())

function printPage() { window.print() }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-purple-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 hover:text-purple-200 transition">
            <UIcon name="i-lucide-chevron-left" class="w-5 h-5" /><span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">🧩 数独 4×4</h1>
          <UButton icon="i-lucide-printer" color="white" variant="ghost" @click="printPage">打印</UButton>
        </div>
        <div class="p-6">
          <div class="mb-5 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <div class="text-sm text-purple-700 dark:text-purple-300">💡 每行、每列、每个2×2方格内都要填入1-4，不能重复</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">难度</label>
            <USelectMenu v-model="difficulty" :items="[{ label: '简单', value: 'easy' }, { label: '中等', value: 'medium' }]" value-key="value" class="w-40" />
          </div>
          <UButton block size="lg" color="purple" class="mt-5" @click="generate">🎲 重新生成</UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <div class="flex justify-between items-center pb-4 mb-6 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
        <div class="text-xl font-bold text-gray-800 dark:text-gray-100">数独 4×4</div>
        <div class="text-gray-600 dark:text-gray-300">日期：<span class="inline-block w-28 border-b border-gray-400" /></div>
        <div class="text-gray-600 dark:text-gray-300">姓名：<span class="inline-block w-24 border-b border-gray-400" /></div>
      </div>

      <div class="flex justify-center">
        <div class="grid grid-cols-4 border-2 border-gray-800 dark:border-gray-300">
          <template v-for="(row, rowIdx) in grid" :key="rowIdx">
            <div
              v-for="(cell, colIdx) in row"
              :key="colIdx"
              class="w-16 h-16 flex items-center justify-center text-2xl font-bold border border-gray-300 dark:border-gray-600"
              :class="{
                'border-r-2 border-r-gray-800 dark:border-r-gray-300': colIdx === 1,
                'border-b-2 border-b-gray-800 dark:border-b-gray-300': rowIdx === 1,
                'bg-gray-100 dark:bg-gray-800': cell !== null,
                'bg-white dark:bg-gray-900': cell === null
              }"
            >
              {{ cell ?? '' }}
            </div>
          </template>
        </div>
      </div>

      <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        提示：每行、每列、每个2×2方格内填入1-4，不重复
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  @page { size: A4; margin: 10mm; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
