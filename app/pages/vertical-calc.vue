<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(8)
const calcType = ref<'add' | 'sub' | 'mul' | 'div'>('add')
const problems = ref<{ a: number, b: number, op: string, answer: number }[]>([])

function generate() {
  const result: { a: number, b: number, op: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    let a: number, b: number, op: string, answer: number

    switch (calcType.value) {
      case 'add':
        a = Math.floor(Math.random() * 900) + 100
        b = Math.floor(Math.random() * 900) + 100
        op = '+'
        answer = a + b
        break
      case 'sub':
        a = Math.floor(Math.random() * 500) + 500
        b = Math.floor(Math.random() * 400) + 100
        op = '−'
        answer = a - b
        break
      case 'mul':
        a = Math.floor(Math.random() * 90) + 10
        b = Math.floor(Math.random() * 9) + 2
        op = '×'
        answer = a * b
        break
      default:
        b = Math.floor(Math.random() * 8) + 2
        answer = Math.floor(Math.random() * 90) + 10
        a = b * answer
        op = '÷'
    }

    result.push({ a, b, op, answer })
  }
  problems.value = result
}

watch([count, calcType], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="竖式计算"
    icon="i-lucide-align-vertical-justify-center"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          用竖式计算，注意对齐
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="20"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">运算类型</label>
          <USelectMenu
            v-model="calcType"
            :items="[{ label: '加法', value: 'add' }, { label: '减法', value: 'sub' }, { label: '乘法', value: 'mul' }, { label: '除法', value: 'div' }]"
            value-key="value"
            class="w-full"
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
      v-for="(_, rowIndex) in Math.ceil(problems.length / 2)"
      :key="rowIndex"
      class="problem-row"
    >
      <td
        v-for="colIndex in 2"
        :key="colIndex"
        class="p-4 w-1/2 align-top"
      >
        <div
          v-if="problems[rowIndex * 2 + colIndex - 1]"
          class="problem-item"
        >
          <div class="text-lg font-mono text-slate-800 dark:text-gray-100 mb-2">
            {{ problems[rowIndex * 2 + colIndex - 1].a }} {{ problems[rowIndex * 2 + colIndex - 1].op }} {{ problems[rowIndex * 2 + colIndex - 1].b }} =
          </div>
          <div class="border border-dashed border-slate-300 dark:border-slate-600 rounded h-32 print:h-36" />
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
