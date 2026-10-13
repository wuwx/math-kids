<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const maxDenominator = ref(12)
const operators = ref<string[]>(['+', '-'])
const problems = ref<{ a: number, b: number, c: number, d: number, op: string }[]>([])

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

function _gcd(a: number, b: number): number {
  return b === 0 ? a : _gcd(b, a % b)
}

function generate() {
  if (operators.value.length === 0) {
    problems.value = []
    return
  }

  const result: { a: number, b: number, c: number, d: number, op: string }[] = []

  for (let i = 0; i < count.value; i++) {
    const op = operators.value[Math.floor(Math.random() * operators.value.length)]

    // 生成同分母或可通分的分数
    const denominator = Math.floor(Math.random() * (maxDenominator.value - 2)) + 2
    let a = Math.floor(Math.random() * (denominator - 1)) + 1
    let c = Math.floor(Math.random() * (denominator - 1)) + 1

    // 减法确保结果为正
    if (op === '-' && a < c) {
      [a, c] = [c, a]
    }

    result.push({ a, b: denominator, c, d: denominator, op })
  }

  problems.value = result
}

watch([count, maxDenominator], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="分数加减法"
    icon="i-lucide-slice"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          同分母分数加减法，分母不变，分子相加减，结果要化简
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
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
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">最大分母</label>
          <UInput
            v-model="maxDenominator"
            type="number"
            :min="2"
            :max="20"
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
      v-for="(_, rowIndex) in Math.ceil(problems.length / 3)"
      :key="rowIndex"
      class="problem-row"
    >
      <td
        v-for="colIndex in 3"
        :key="colIndex"
        class="p-3 w-1/3 align-middle"
      >
        <div
          v-if="problems[rowIndex * 3 + colIndex - 1]"
          class="problem-item flex items-center gap-2 text-slate-800 dark:text-slate-100"
        >
          <div class="inline-flex flex-col items-center">
            <span class="border-b border-slate-800 dark:border-slate-100 px-1">{{ problems[rowIndex * 3 + colIndex - 1].a }}</span>
            <span class="px-1">{{ problems[rowIndex * 3 + colIndex - 1].b }}</span>
          </div>
          <span class="text-lg">{{ problems[rowIndex * 3 + colIndex - 1].op }}</span>
          <div class="inline-flex flex-col items-center">
            <span class="border-b border-slate-800 dark:border-slate-100 px-1">{{ problems[rowIndex * 3 + colIndex - 1].c }}</span>
            <span class="px-1">{{ problems[rowIndex * 3 + colIndex - 1].d }}</span>
          </div>
          <span class="text-lg">=</span>
          <span class="flex-1 border-b border-dashed border-slate-300 dark:border-slate-600" />
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
