<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const problems = ref<{ equation: string, hint: string, answer: string }[]>([])

const puzzles = [
  { equation: '6 + 4 = 4', hint: '移动1根', answer: '0 + 4 = 4' }, // 6 的中段移到右上 → 0
  { equation: '3 + 3 = 8', hint: '移动1根', answer: '3 + 5 = 8' }, // 后一个 3 的右上竖段移到左上 → 5
  { equation: '1 + 1 = 3', hint: '移动1根', answer: '1 + 1 = 2' }, // 3 的右下竖段移到左下 → 2
  { equation: '6 - 6 = 6', hint: '移动1根', answer: '6 - 0 = 6' }, // 后一个 6 的中段移到右上 → 0
  { equation: '6 + 3 = 8', hint: '移动1根', answer: '6 + 2 = 8' }, // 3 的右下竖段移到左下 → 2
  { equation: '4 + 3 = 9', hint: '移动1根', answer: '4 + 5 = 9' }, // 3 的右上竖段移到左上 → 5
  { equation: '5 - 3 = 3', hint: '移动1根', answer: '5 - 2 = 3' }, // 结果 3 的右下竖段移到左下 → 2
  { equation: '6 + 2 = 9', hint: '移动1根', answer: '5 + 2 = 8' } // 6 的左下竖段移到 9 的左下 → 5 和 8
]

function generate() {
  const shuffled = [...puzzles]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!]
  }
  problems.value = shuffled.slice(0, 6)
}

onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="火柴棒游戏"
    icon="i-lucide-flame"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          移动火柴棒使等式成立
        </div>
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
        <div class="grid grid-cols-2 gap-6">
          <div
            v-for="(problem, idx) in problems"
            :key="idx"
            class="border border-slate-200 dark:border-slate-700 rounded-xl p-6"
          >
            <div class="problem-item text-sm text-slate-500 dark:text-slate-400 mb-2">
              {{ problem.hint }}使等式成立
            </div>
            <div class="text-3xl font-mono text-center py-4 text-slate-800 dark:text-slate-100">
              {{ problem.equation }}
            </div>
            <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="text-sm text-slate-500">
                答案：
              </div>
              <div class="h-8 border-b border-slate-300 dark:border-slate-600" />
            </div>
          </div>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
