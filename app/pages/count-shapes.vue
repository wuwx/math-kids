<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const problems = ref<{ type: string, size: number, answer: number }[]>([])

function countSquares(n: number): number {
  let count = 0
  for (let s = 1; s <= n; s++) {
    count += (n - s + 1) * (n - s + 1)
  }
  return count
}

function generate() {
  const result: { type: string, size: number, answer: number }[] = []

  for (let i = 0; i < 6; i++) {
    const size = Math.floor(Math.random() * 3) + 2
    result.push({
      type: '正方形',
      size,
      answer: countSquares(size)
    })
  }

  problems.value = result
}

function gridColsClass(size: number): string {
  if (size === 2) return 'grid-cols-2'
  if (size === 3) return 'grid-cols-3'
  return 'grid-cols-4'
}

onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="图形计数"
    icon="i-lucide-shapes"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          仔细观察，数一数图中有多少个正方形
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
        <div class="grid grid-cols-2 gap-8">
          <div
            v-for="(problem, idx) in problems"
            :key="idx"
            class="border border-slate-200 dark:border-slate-700 rounded-xl p-6"
          >
            <div class="text-base text-slate-800 dark:text-gray-100 mb-4">
              {{ idx + 1 }}. 数一数下图中有多少个{{ problem.type }}？
            </div>

            <div class="flex justify-center mb-4">
              <div
                class="grid border-2 border-slate-800 dark:border-slate-300"
                :class="gridColsClass(problem.size)"
              >
                <div
                  v-for="i in problem.size * problem.size"
                  :key="i"
                  class="w-10 h-10 border border-slate-400 dark:border-slate-500"
                />
              </div>
            </div>

            <div class="text-center text-slate-800 dark:text-gray-100">
              答：___ 个
            </div>
          </div>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
