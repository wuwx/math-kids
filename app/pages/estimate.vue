<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const problems = ref<{ expression: string, answer: number }[]>([])

function generate() {
  const result: { expression: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)
    let a: number, b: number, op: string, answer: number

    switch (type) {
      case 0: // 加法估算
        a = Math.floor(Math.random() * 900) + 100
        b = Math.floor(Math.random() * 900) + 100
        op = '+'
        answer = Math.round((a + b) / 100) * 100
        break
      case 1: // 减法估算
        a = Math.floor(Math.random() * 500) + 500
        b = Math.floor(Math.random() * 400) + 100
        op = '−'
        answer = Math.round((a - b) / 100) * 100
        break
      default: // 乘法估算
        a = Math.floor(Math.random() * 90) + 10
        b = Math.floor(Math.random() * 9) + 2
        op = '×'
        answer = Math.round((a * b) / 10) * 10
    }

    result.push({ expression: `${a} ${op} ${b} ≈`, answer })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="估算练习"
    icon="i-lucide-target"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          估算结果，取整到十位或百位
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
      v-for="(_, rowIndex) in Math.ceil(problems.length / 3)"
      :key="rowIndex"
      class="problem-row"
    >
      <td
        v-for="colIndex in 3"
        :key="colIndex"
        class="p-3 w-1/3 align-top"
      >
        <div
          v-if="problems[rowIndex * 3 + colIndex - 1]"
          class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100"
        >
          {{ problems[rowIndex * 3 + colIndex - 1].expression }}
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
