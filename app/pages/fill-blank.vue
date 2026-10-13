<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(30)
const maxNumber = ref(999)
const problems = ref<{ expression: string, answer: number }[]>([])

function generate() {
  const result: { expression: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    const a = Math.floor(Math.random() * maxNumber.value) + 10
    const b = Math.floor(Math.random() * Math.min(a - 1, maxNumber.value)) + 1

    let expression = ''
    let answer = 0

    switch (type) {
      case 0: // □ + b = a
        expression = `□ + ${b} = ${a}`
        answer = a - b
        break
      case 1: // a + □ = a+b
        expression = `${a} + □ = ${a + b}`
        answer = b
        break
      case 2: // □ - b = a-b
        expression = `□ − ${b} = ${a - b}`
        answer = a
        break
      case 3: // a - □ = a-b
        expression = `${a} − □ = ${a - b}`
        answer = b
        break
    }

    result.push({ expression, answer })
  }
  problems.value = result
}

watch([count, maxNumber], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="填空算式"
    icon="i-lucide-square-asterisk"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          根据等式关系，逆向思考求出 □ 中的数
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="100"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">数字上限</label>
          <UInput
            v-model="maxNumber"
            type="number"
            :min="10"
            :max="9999"
            class="text-center"
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
        class="p-2 w-1/3 align-top"
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
