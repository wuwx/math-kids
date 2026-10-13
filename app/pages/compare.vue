<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const problems = ref<{ left: string, right: string }[]>([])

function randomOp(): string {
  return Math.random() > 0.5 ? '+' : '-'
}

function generate() {
  const result: { left: string, right: string }[] = []

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    const type = Math.floor(Math.random() * 3)

    if (type === 0) {
      // 两个加减法比较
      const a = Math.floor(Math.random() * 900) + 100
      const c = Math.floor(Math.random() * 900) + 100
      const op1 = randomOp()
      const op2 = randomOp()
      // 减法保证被减数大于减数，结果非负
      const b = op1 === '-' ? Math.floor(Math.random() * (a - 10)) + 10 : Math.floor(Math.random() * 100) + 10
      const d = op2 === '-' ? Math.floor(Math.random() * (c - 10)) + 10 : Math.floor(Math.random() * 100) + 10
      result.push({
        left: `${a} ${op1} ${b}`,
        right: `${c} ${op2} ${d}`
      })
    } else if (type === 1) {
      // 乘法比较
      const a = Math.floor(Math.random() * 9) + 2
      const b = Math.floor(Math.random() * 9) + 2
      const c = Math.floor(Math.random() * 9) + 2
      const d = Math.floor(Math.random() * 9) + 2
      result.push({
        left: `${a} × ${b}`,
        right: `${c} × ${d}`
      })
    } else {
      // 数字与算式比较
      const op = randomOp()
      const a = Math.floor(Math.random() * 90) + 10
      // 减法保证被减数大于减数，结果非负
      const b = op === '-' ? Math.floor(Math.random() * (a - 10)) + 10 : Math.floor(Math.random() * 90) + 10
      // 对照数与真实值相差 -10 ~ +10，保证 >、<、= 都可能出现
      const num = Math.max(0, (op === '+' ? a + b : a - b) + Math.floor(Math.random() * 21) - 10)
      if (Math.random() > 0.5) {
        result.push({ left: `${a} ${op} ${b}`, right: `${num}` })
      } else {
        result.push({ left: `${num}`, right: `${a} ${op} ${b}` })
      }
    }
  }

  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="比大小"
    icon="i-lucide-scale"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          在 ○ 中填入 &gt;、&lt; 或 =
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="50"
            class="text-center max-w-32"
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
      v-for="(_, rowIndex) in Math.ceil(problems.length / 2)"
      :key="rowIndex"
      class="problem-row"
    >
      <td
        v-for="colIndex in 2"
        :key="colIndex"
        class="p-3 w-1/2 align-top"
      >
        <div
          v-if="problems[rowIndex * 2 + colIndex - 1]"
          class="problem-item flex flex-wrap items-center gap-2 text-lg font-mono text-slate-800 dark:text-slate-100"
        >
          <span>{{ problems[rowIndex * 2 + colIndex - 1]!.left }}</span>
          <span class="w-8 h-8 rounded-full border-2 border-slate-400 flex items-center justify-center text-sm">○</span>
          <span>{{ problems[rowIndex * 2 + colIndex - 1]!.right }}</span>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
