<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

// 进位借位练习 - 确保生成需要进位/借位的题目
const count = ref(20)
const problems = ref<string[]>([])

function generate() {
  const result: string[] = []
  for (let i = 0; i < count.value; i++) {
    const isAdd = Math.random() > 0.5

    for (let j = 0; j < 100; j++) {
      if (isAdd) {
        // 进位加法：个位相加 >= 10
        const a = Math.floor(Math.random() * 900) + 100
        const aUnit = a % 10
        if (aUnit >= 9) continue
        const bUnit = 10 - aUnit + Math.floor(Math.random() * aUnit)
        const b = Math.floor(Math.random() * 90) * 10 + 10 + bUnit
        if (b >= 100 && b <= 999) {
          result.push(`${a} + ${b} =`)
          break
        }
      } else {
        // 借位减法：被减数个位 < 减数个位
        const a = Math.floor(Math.random() * 900) + 100
        const aUnit = a % 10
        if (aUnit >= 8) continue
        const bUnit = aUnit + 1 + Math.floor(Math.random() * (9 - aUnit - 1))
        const bTens = Math.floor(Math.random() * (Math.floor(a / 10) - 10)) + 10
        const b = bTens * 10 + bUnit
        if (b > 0 && b < a && b >= 100) {
          result.push(`${a} - ${b} =`)
          break
        }
      }
    }
  }
  problems.value = result
}

onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="进位借位练习"
    icon="i-lucide-calculator"
  >
    <template #settings>
      <div class="flex items-center gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="100"
            class="w-32"
          />
        </div>
        <UButton
          size="lg"
          icon="i-lucide-dices"
          class="mt-6"
          @click="generate"
        >
          重新生成
        </UButton>
      </div>
    </template>

    <tr
      v-for="(_, rowIndex) in Math.ceil(problems.length / 2)"
      :key="rowIndex"
      class="problem-row"
    >
      <td class="p-2 w-1/2 align-top">
        <template v-if="problems[rowIndex * 2]">
          <div class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100 tabular-nums">
            {{ problems[rowIndex * 2] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-20" />
        </template>
      </td>
      <td class="p-2 w-1/2 align-top">
        <template v-if="problems[rowIndex * 2 + 1]">
          <div class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100 tabular-nums">
            {{ problems[rowIndex * 2 + 1] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-20" />
        </template>
      </td>
    </tr>
  </ExerciseShell>
</template>
