<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

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
</script>

<template>
  <ExerciseShell
    title="数独 4×4"
    icon="i-lucide-grid-2x2"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          每行、每列、每个2×2方格内都要填入1-4，不能重复
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">难度</label>
        <USelectMenu
          v-model="difficulty"
          :items="[{ label: '简单', value: 'easy' }, { label: '中等', value: 'medium' }]"
          value-key="value"
          class="w-40"
        />
      </div>
      <UButton
        block
        size="lg"
        icon="i-lucide-dices"
        class="mt-5"
        @click="generate"
      >
        重新生成
      </UButton>
    </template>

    <tr>
      <td class="p-0">
        <div class="flex justify-center">
          <div class="grid grid-cols-4 border-2 border-slate-800 dark:border-slate-300">
            <template
              v-for="(row, rowIdx) in grid"
              :key="rowIdx"
            >
              <div
                v-for="(cell, colIdx) in row"
                :key="colIdx"
                class="w-16 h-16 flex items-center justify-center text-2xl font-bold border border-slate-300 dark:border-slate-600"
                :class="{
                  'border-r-2 border-r-slate-800 dark:border-r-slate-300': colIdx === 1,
                  'border-b-2 border-b-slate-800 dark:border-b-slate-300': rowIdx === 1,
                  'bg-slate-100 dark:bg-slate-800': cell !== null,
                  'bg-white dark:bg-slate-900': cell === null
                }"
              >
                {{ cell ?? '' }}
              </div>
            </template>
          </div>
        </div>

        <div class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          提示：每行、每列、每个2×2方格内填入1-4，不重复
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
