<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const problems = ref<{ equation: string, hint: string, answer: string }[]>([])

const puzzles = [
  { equation: '6 + 4 = 4', hint: '移动1根', answer: '0 + 4 = 4' },
  { equation: '8 - 3 = 2', hint: '移动1根', answer: '9 - 3 = 6 或 8 - 2 = 6' },
  { equation: '1 + 1 = 3', hint: '移动1根', answer: '1 + 1 ≠ 3 或 7 - 1 = 6' },
  { equation: '5 + 5 = 5', hint: '移动1根', answer: '5 + 0 = 5' },
  { equation: '3 + 3 = 8', hint: '移动1根', answer: '3 + 5 = 8' },
  { equation: '6 - 6 = 6', hint: '移动1根', answer: '6 - 0 = 6 或 8 - 6 = 2' },
  { equation: '9 - 1 = 6', hint: '移动1根', answer: '9 - 3 = 6' },
  { equation: '1 = 7 - 1', hint: '移动1根', answer: '1 = 7 - 6' }
]

function generate() {
  const shuffled = [...puzzles].sort(() => Math.random() - 0.5)
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
            <div class="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {{ idx + 1 }}. {{ problem.hint }}使等式成立
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
