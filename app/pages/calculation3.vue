<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

// 三数连算
const count = ref(16)
const problems = ref<string[]>([])

function generate() {
  const ops = ['+', '-']
  const result: string[] = []

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 100; j++) {
      const a = Math.floor(Math.random() * 900) + 100
      const b = Math.floor(Math.random() * 900) + 100
      const c = Math.floor(Math.random() * 900) + 100
      const op1 = ops[Math.floor(Math.random() * ops.length)]
      const op2 = ops[Math.floor(Math.random() * ops.length)]

      // 验证中间结果和最终结果都为正
      const temp = op1 === '+' ? a + b : a - b
      if (temp < 0) continue
      const final = op2 === '+' ? temp + c : temp - c
      if (final < 0) continue

      result.push(`${a} ${op1} ${b} ${op2} ${c} =`)
      break
    }
  }
  problems.value = result
}

onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="三数连算"
    icon="i-lucide-sigma"
  >
    <template #settings>
      <div class="flex items-center gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="50"
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
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-24" />
        </template>
      </td>
      <td class="p-2 w-1/2 align-top">
        <template v-if="problems[rowIndex * 2 + 1]">
          <div class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100 tabular-nums">
            {{ problems[rowIndex * 2 + 1] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-24" />
        </template>
      </td>
    </tr>
  </ExerciseShell>
</template>
