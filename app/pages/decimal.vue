<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const decimalPlaces = ref(2)
const operators = ref<string[]>(['+', '-'])
const problems = ref<string[]>([])

const hasPlus = computed(() => operators.value.includes('+'))
const hasMinus = computed(() => operators.value.includes('-'))

function toggleOperator(op: string) {
  if (operators.value.includes(op)) {
    operators.value = operators.value.filter(o => o !== op)
  } else {
    operators.value.push(op)
  }
  generate()
}

function randomDecimal(): string {
  const intPart = Math.floor(Math.random() * 100)
  const decPart = Math.floor(Math.random() * Math.pow(10, decimalPlaces.value))
  return `${intPart}.${decPart.toString().padStart(decimalPlaces.value, '0')}`
}

function generate() {
  if (operators.value.length === 0) {
    problems.value = []
    return
  }

  const result: string[] = []
  for (let i = 0; i < count.value; i++) {
    const op = operators.value[Math.floor(Math.random() * operators.value.length)]
    let a = randomDecimal()
    let b = randomDecimal()

    // 减法确保结果为正
    if (op === '-' && parseFloat(a) < parseFloat(b)) {
      [a, b] = [b, a]
    }

    result.push(`${a} ${op} ${b} =`)
  }
  problems.value = result
}

watch([count, decimalPlaces], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="小数加减法"
    icon="i-lucide-percent"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          注意小数点对齐，从右往左逐位计算
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">小数位数</label>
          <UInput
            v-model="decimalPlaces"
            type="number"
            :min="1"
            :max="3"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">运算符</label>
          <div class="flex gap-2">
            <button
              class="flex-1 py-2 text-xl font-bold rounded-lg border-2 transition-colors"
              :class="hasPlus
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400'"
              @click="toggleOperator('+')"
            >
              +
            </button>
            <button
              class="flex-1 py-2 text-xl font-bold rounded-lg border-2 transition-colors"
              :class="hasMinus
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400'"
              @click="toggleOperator('-')"
            >
              −
            </button>
          </div>
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
      <td class="p-2 w-1/2 align-top">
        <div
          v-if="problems[rowIndex * 2]"
          class="problem-item"
        >
          <div class="text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100">
            {{ problems[rowIndex * 2] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-16" />
        </div>
      </td>
      <td class="p-2 w-1/2 align-top">
        <div
          v-if="problems[rowIndex * 2 + 1]"
          class="problem-item"
        >
          <div class="text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100">
            {{ problems[rowIndex * 2 + 1] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-16" />
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
