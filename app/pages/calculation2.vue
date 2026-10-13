<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

// 乘除法练习
const count = ref(20)
const operators = ref<string[]>(['×', '÷'])
const problems = ref<string[]>([])

const hasMul = computed(() => operators.value.includes('×'))
const hasDiv = computed(() => operators.value.includes('÷'))

function toggleOperator(op: string) {
  if (operators.value.includes(op)) {
    operators.value = operators.value.filter(o => o !== op)
  } else {
    operators.value.push(op)
  }
  generate()
}

function generate() {
  if (operators.value.length === 0) {
    problems.value = []
    return
  }

  const result: string[] = []
  for (let i = 0; i < count.value; i++) {
    const op = operators.value[Math.floor(Math.random() * operators.value.length)]

    if (op === '×') {
      const a = Math.floor(Math.random() * 90) + 10 // 10-99
      const b = Math.floor(Math.random() * 9) + 1 // 1-9
      result.push(`${a} × ${b} =`)
    } else {
      // 除法：确保能整除
      const b = Math.floor(Math.random() * 9) + 1 // 1-9
      const quotient = Math.floor(Math.random() * 90) + 10 // 10-99
      const a = b * quotient
      result.push(`${a} ÷ ${b} =`)
    }
  }
  problems.value = result
}

onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="乘除法练习"
    icon="i-lucide-x"
  >
    <template #settings>
      <div class="flex items-center gap-4 flex-wrap">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="100"
            class="w-32"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">运算符</label>
          <div class="flex gap-2">
            <button
              class="px-4 py-2 text-xl font-bold rounded-lg border-2 transition-colors"
              :class="hasMul
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400'"
              @click="toggleOperator('×')"
            >
              ×
            </button>
            <button
              class="px-4 py-2 text-xl font-bold rounded-lg border-2 transition-colors"
              :class="hasDiv
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400'"
              @click="toggleOperator('÷')"
            >
              ÷
            </button>
          </div>
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

    <tr v-if="problems.length === 0">
      <td
        colspan="2"
        class="text-center py-16"
      >
        <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <UIcon
            name="i-lucide-circle-help"
            class="w-7 h-7 text-slate-400"
          />
        </div>
        <div class="text-slate-500 dark:text-slate-400 text-lg">
          请至少选择一个运算符
        </div>
      </td>
    </tr>
    <template v-else>
      <tr
        v-for="(_, rowIndex) in Math.ceil(problems.length / 2)"
        :key="rowIndex"
        class="problem-row"
      >
        <td class="p-2 w-1/2 align-top">
          <div
            v-if="problems[rowIndex * 2]"
            class="problem-item"
          >
            <div class="text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100">
              {{ problems[rowIndex * 2] }}
            </div>
            <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-20" />
          </div>
        </td>
        <td class="p-2 w-1/2 align-top">
          <div
            v-if="problems[rowIndex * 2 + 1]"
            class="problem-item"
          >
            <div class="text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100">
              {{ problems[rowIndex * 2 + 1] }}
            </div>
            <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-20" />
          </div>
        </td>
      </tr>
    </template>
  </ExerciseShell>
</template>
