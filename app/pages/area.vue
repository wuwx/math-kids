<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(15)
const problems = ref<{ question: string, answer: number }[]>([])

function generate() {
  const result: { question: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)
    let question: string, answer: number

    switch (type) {
      case 0: { // 正方形面积
        const side = Math.floor(Math.random() * 15) + 2
        question = `正方形边长 ${side} cm，面积 = ___ cm²`
        answer = side * side
        break
      }
      case 1: { // 长方形面积
        const length = Math.floor(Math.random() * 12) + 3
        const width = Math.floor(Math.random() * 8) + 2
        question = `长方形长 ${length} cm，宽 ${width} cm，面积 = ___ cm²`
        answer = length * width
        break
      }
      default: { // 已知面积求边长
        const side = Math.floor(Math.random() * 12) + 2
        const area = side * side
        question = `正方形面积 ${area} cm²，边长 = ___ cm`
        answer = side
      }
    }

    result.push({ question, answer })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="面积计算"
    icon="i-lucide-box"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          正方形面积=边长×边长，长方形面积=长×宽
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
        <UInput
          v-model="count"
          type="number"
          :min="1"
          :max="30"
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
      <td class="p-3 align-top">
        <div class="problem-item text-lg text-slate-800 dark:text-gray-100">
          {{ problem.question }}
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
