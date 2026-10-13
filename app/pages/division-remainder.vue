<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(30)
const maxDividend = ref(99)
const maxDivisor = ref(9)
const problems = ref<{ dividend: number, divisor: number }[]>([])

function generate() {
  const result: { dividend: number, divisor: number }[] = []
  const used = new Set<string>()

  let attempts = 0
  while (result.length < count.value && attempts < count.value * 100) {
    attempts++
    const divisor = Math.floor(Math.random() * (maxDivisor.value - 2 + 1)) + 2
    const dividend = Math.floor(Math.random() * (maxDividend.value - divisor)) + divisor + 1

    // 确保有余数
    if (dividend % divisor === 0) continue

    const key = `${dividend}÷${divisor}`
    if (used.has(key)) continue

    used.add(key)
    result.push({ dividend, divisor })
  }
  problems.value = result
}

watch([count, maxDividend, maxDivisor], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="带余数除法"
    icon="i-lucide-divide"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          练习带余数的除法，答案格式：商 ... 余数
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="100"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">被除数上限</label>
          <UInput
            v-model="maxDividend"
            type="number"
            :min="10"
            :max="999"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">除数上限</label>
          <UInput
            v-model="maxDivisor"
            type="number"
            :min="2"
            :max="19"
            class="text-center"
          />
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

    <tr
      v-for="(_, rowIndex) in Math.ceil(problems.length / 3)"
      :key="rowIndex"
      class="problem-row"
    >
      <td
        v-for="colIndex in 3"
        :key="colIndex"
        class="p-2 w-1/3 align-top"
      >
        <div
          v-if="problems[rowIndex * 3 + colIndex - 1]"
          class="problem-item flex items-center gap-2"
        >
          <span class="text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100">
            {{ problems[rowIndex * 3 + colIndex - 1]!.dividend }} ÷ {{ problems[rowIndex * 3 + colIndex - 1]!.divisor }} =
          </span>
          <span class="flex-1 border-b border-dashed border-slate-300 dark:border-slate-600" />
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
