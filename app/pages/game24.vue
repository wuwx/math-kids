<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

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
</script>

<template>
  <ExerciseShell
    title="24点游戏"
    icon="i-lucide-dices"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          用加减乘除把4个数算成24
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
        <UInput
          v-model="count"
          type="number"
          :min="1"
          :max="20"
          class="text-center max-w-32"
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

    <tr
      v-for="(problem, idx) in problems"
      :key="idx"
      class="problem-row"
    >
      <td class="p-4 align-top">
        <div class="problem-item">
          <div class="flex items-center gap-4 mb-3">
            <span class="text-slate-500">{{ idx + 1 }}.</span>
            <div class="flex gap-3">
              <span
                v-for="(num, j) in problem.numbers"
                :key="j"
                class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-xl font-bold text-slate-800 dark:text-slate-100"
              >
                {{ num }}
              </span>
            </div>
          </div>
          <div class="text-sm text-slate-500 mb-2">
            算式：
          </div>
          <div class="border-b border-slate-300 dark:border-slate-600 h-8" />
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
