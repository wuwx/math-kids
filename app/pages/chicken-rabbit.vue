<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(10)
const problems = ref<{ question: string, chicken: number, rabbit: number }[]>([])

function generate() {
  const result: { question: string, chicken: number, rabbit: number }[] = []

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    const chicken = Math.floor(Math.random() * 15) + 5
    const rabbit = Math.floor(Math.random() * 15) + 5
    const heads = chicken + rabbit
    const legs = chicken * 2 + rabbit * 4

    result.push({
      question: `笼子里有鸡和兔共 ${heads} 只，数一数共有 ${legs} 条腿。鸡有___只，兔有___只。`,
      chicken,
      rabbit
    })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="鸡兔同笼"
    icon="i-lucide-rabbit"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          鸡2条腿，兔4条腿，根据头和腿的数量求各有多少只
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
