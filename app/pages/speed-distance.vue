<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(10)
const problems = ref<{ question: string, answer: number, unit: string }[]>([])

function generate() {
  const result: { question: string, answer: number, unit: string }[] = []

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    const type = Math.floor(Math.random() * 3)
    let question: string, answer: number, unit: string

    switch (type) {
      case 0: { // 求路程
        const speed = Math.floor(Math.random() * 50) + 30
        const time = Math.floor(Math.random() * 5) + 1
        question = `汽车每小时行驶 ${speed} 千米，行驶 ${time} 小时，共行驶多少千米？`
        answer = speed * time
        unit = '千米'
        break
      }
      case 1: { // 求时间
        const speed = Math.floor(Math.random() * 50) + 30
        const time = Math.floor(Math.random() * 5) + 2
        const distance = speed * time
        question = `火车每小时行驶 ${speed} 千米，行驶 ${distance} 千米需要多少小时？`
        answer = time
        unit = '小时'
        break
      }
      default: { // 求速度
        const speed = Math.floor(Math.random() * 50) + 30
        const time = Math.floor(Math.random() * 5) + 2
        const distance = speed * time
        question = `小明骑车 ${time} 小时行驶了 ${distance} 千米，平均每小时行驶多少千米？`
        answer = speed
        unit = '千米/小时'
      }
    }

    result.push({ question, answer, unit })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="行程问题"
    icon="i-lucide-car"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          路程 = 速度 × 时间
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
      <td class="p-3 align-top">
        <div class="problem-item text-base text-slate-800 dark:text-slate-100 mb-2 leading-relaxed">
          {{ problem.question }}
        </div>
        <div class="border border-dashed border-slate-300 dark:border-slate-600 rounded h-20 print:h-24" />
      </td>
    </tr>
  </ExerciseShell>
</template>
