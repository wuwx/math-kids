<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(30)
const minNumber = ref(100)
const maxNumber = ref(999)
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

function applyPreset(preset: string) {
  switch (preset) {
    case 'two':
      minNumber.value = 10
      maxNumber.value = 99
      count.value = 20
      break
    case 'three':
      minNumber.value = 100
      maxNumber.value = 999
      count.value = 20
      break
    case 'four':
      minNumber.value = 1000
      maxNumber.value = 9999
      count.value = 16
      break
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

    for (let j = 0; j < 100; j++) {
      const x = Math.floor(Math.random() * (maxNumber.value - minNumber.value + 1)) + minNumber.value
      const y = Math.floor(Math.random() * (maxNumber.value - minNumber.value + 1)) + minNumber.value

      if (op === '-' && x <= y) continue

      result.push(`${x} ${op} ${y} =`)
      break
    }
  }
  problems.value = result
}

// 监听参数变化自动重新生成
watch([count, minNumber, maxNumber], () => {
  generate()
}, { debounce: 500 } as WatchOptions)

// 初始化
onMounted(() => {
  generate()
})
</script>

<template>
  <ExerciseShell
    title="加减法练习"
    icon="i-lucide-plus"
  >
    <template #settings>
      <!-- 快捷预设 -->
      <div class="mb-5">
        <div class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          快捷预设
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton
            variant="soft"
            color="neutral"
            size="sm"
            @click="applyPreset('two')"
          >
            两位数 (10-99)
          </UButton>
          <UButton
            variant="soft"
            color="neutral"
            size="sm"
            @click="applyPreset('three')"
          >
            三位数 (100-999)
          </UButton>
          <UButton
            variant="soft"
            color="neutral"
            size="sm"
            @click="applyPreset('four')"
          >
            四位数 (1000-9999)
          </UButton>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- 题目数量 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="200"
            class="text-center"
          />
        </div>
        <!-- 最小值 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">最小值</label>
          <UInput
            v-model="minNumber"
            type="number"
            class="text-center"
          />
        </div>
        <!-- 最大值 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">最大值</label>
          <UInput
            v-model="maxNumber"
            type="number"
            class="text-center"
          />
        </div>
        <!-- 运算符 -->
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

      <!-- 重新生成按钮 -->
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
            <div class="text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100 tabular-nums">
              {{ problems[rowIndex * 2] }}
            </div>
            <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-700 rounded h-20 print:h-22" />
          </div>
        </td>
        <td class="p-2 w-1/2 align-top">
          <div
            v-if="problems[rowIndex * 2 + 1]"
            class="problem-item"
          >
            <div class="text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100 tabular-nums">
              {{ problems[rowIndex * 2 + 1] }}
            </div>
            <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-700 rounded h-20 print:h-22" />
          </div>
        </td>
      </tr>
    </template>
  </ExerciseShell>
</template>
