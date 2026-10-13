<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(10)
const problems = ref<{ question: string, answer: number }[]>([])

function generate() {
  const result: { question: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    let question: string, answer: number

    switch (type) {
      case 0: { // 两端都种，求棵数
        const length = (Math.floor(Math.random() * 20) + 5) * 5
        const interval = Math.floor(Math.random() * 4) + 2
        const trees = length / interval + 1
        question = `一条 ${length} 米的路，每隔 ${interval} 米种一棵树，两端都种，共种多少棵？`
        answer = trees
        break
      }
      case 1: { // 两端都不种，求棵数
        const length = (Math.floor(Math.random() * 20) + 5) * 5
        const interval = Math.floor(Math.random() * 4) + 2
        const trees = length / interval - 1
        question = `一条 ${length} 米的路，每隔 ${interval} 米种一棵树，两端都不种，共种多少棵？`
        answer = trees
        break
      }
      case 2: { // 一端种一端不种
        const length = (Math.floor(Math.random() * 20) + 5) * 5
        const interval = Math.floor(Math.random() * 4) + 2
        const trees = length / interval
        question = `一条 ${length} 米的路，每隔 ${interval} 米种一棵树，只在一端种，共种多少棵？`
        answer = trees
        break
      }
      default: { // 环形
        const length = (Math.floor(Math.random() * 15) + 5) * 6
        const interval = Math.floor(Math.random() * 3) + 2
        const trees = length / interval
        question = `一个周长 ${length} 米的圆形花坛，每隔 ${interval} 米种一棵树，共种多少棵？`
        answer = trees
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
    title="植树问题"
    icon="i-lucide-tree-pine"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          两端都种：棵数=间隔数+1；两端不种：棵数=间隔数-1
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
        <div class="problem-item text-base text-slate-800 dark:text-gray-100 mb-2 leading-relaxed">
          {{ problem.question }}
        </div>
        <div class="border border-dashed border-slate-300 dark:border-slate-600 rounded h-20 print:h-24" />
      </td>
    </tr>
  </ExerciseShell>
</template>
