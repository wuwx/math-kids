<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

// 综合练习 - 加减乘混合
const count = ref(20)
const problems = ref<string[]>([])

function generate() {
  const result: string[] = []

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    const type = Math.floor(Math.random() * 3)

    for (let j = 0; j < 100; j++) {
      if (type === 0) {
        // 加减法
        const a = Math.floor(Math.random() * 900) + 100
        const b = Math.floor(Math.random() * 900) + 100
        const op = Math.random() > 0.5 ? '+' : '-'
        if (op === '-' && a <= b) continue
        result.push(`${a} ${op} ${b} =`)
        break
      } else if (type === 1) {
        // 乘法
        const a = Math.floor(Math.random() * 90) + 10
        const b = Math.floor(Math.random() * 9) + 1
        result.push(`${a} × ${b} =`)
        break
      } else {
        // 两步混合：a ± b × c
        const b = Math.floor(Math.random() * 90) + 10
        const c = Math.floor(Math.random() * 9) + 1
        const product = b * c
        const a = Math.floor(Math.random() * 500) + 100
        const op = Math.random() > 0.5 ? '+' : '-'
        if (op === '-' && a <= product) continue
        result.push(`${a} ${op} ${b} × ${c} =`)
        break
      }
    }
  }
  problems.value = result
}

onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="综合练习"
    icon="i-lucide-target"
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
      <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
        包含加减法、乘法、以及加减乘混合运算
      </p>
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
