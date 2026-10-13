<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const problems = ref<{ question: string, answer: string }[]>([])

function generate() {
  const result: { question: string, answer: string }[] = []

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    const type = Math.floor(Math.random() * 4)
    let question: string, answer: string

    switch (type) {
      case 0: { // 判断奇偶
        const num = Math.floor(Math.random() * 1000) + 1
        question = `${num} 是___数（奇/偶）`
        answer = num % 2 === 0 ? '偶' : '奇'
        break
      }
      case 1: { // 奇+奇
        const a = Math.floor(Math.random() * 50) * 2 + 1
        const b = Math.floor(Math.random() * 50) * 2 + 1
        question = `${a} + ${b} 的结果是___数（奇/偶）`
        answer = '偶'
        break
      }
      case 2: { // 奇+偶
        const a = Math.floor(Math.random() * 50) * 2 + 1
        const b = Math.floor(Math.random() * 50) * 2
        question = `${a} + ${b} 的结果是___数（奇/偶）`
        answer = '奇'
        break
      }
      default: { // 偶+偶
        const a = Math.floor(Math.random() * 50) * 2 + 2
        const b = Math.floor(Math.random() * 50) * 2 + 2
        question = `${a} + ${b} 的结果是___数（奇/偶）`
        answer = '偶'
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
    title="奇偶数判断"
    icon="i-lucide-toggle-left"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          能被2整除的是偶数，不能被2整除的是奇数
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
        <UInput
          v-model="count"
          type="number"
          :min="1"
          :max="40"
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
          class="problem-item text-base text-slate-800 dark:text-slate-100"
        >
          {{ problems[rowIndex * 2 + colIndex - 1]!.question }}
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
