<script setup lang="ts">
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

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-primary-600 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-primary-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            ✖️ 乘除法练习
          </h1>
          <UButton
            icon="i-lucide-printer"
            color="white"
            variant="ghost"
            @click="printPage"
          >
            打印
          </UButton>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-4 flex-wrap">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput
                v-model="count"
                type="number"
                :min="1"
                :max="100"
                class="w-32"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">运算符</label>
              <div class="flex gap-2">
                <button
                  class="px-4 py-2 text-xl font-bold rounded-xl border-2 transition hover:opacity-80"
                  :style="hasMul ? 'background-color: #8b5cf6; color: white; border-color: #8b5cf6;' : 'background-color: white; color: #4b5563; border-color: #d1d5db;'"
                  @click="toggleOperator('×')"
                >
                  ×
                </button>
                <button
                  class="px-4 py-2 text-xl font-bold rounded-xl border-2 transition hover:opacity-80"
                  :style="hasDiv ? 'background-color: #06b6d4; color: white; border-color: #06b6d4;' : 'background-color: white; color: #4b5563; border-color: #d1d5db;'"
                  @click="toggleOperator('÷')"
                >
                  ÷
                </button>
              </div>
            </div>
            <UButton
              size="lg"
              class="mt-6"
              @click="generate"
            >
              🎲 重新生成
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th
              colspan="2"
              class="p-0 text-left"
            >
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">
                  乘除法练习
                </div>
                <div class="text-gray-600 dark:text-gray-300">
                  日期：<span class="inline-block w-28 border-b border-gray-400" />
                </div>
                <div class="text-gray-600 dark:text-gray-300">
                  姓名：<span class="inline-block w-24 border-b border-gray-400" />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="problems.length === 0">
            <td
              colspan="2"
              class="text-center py-16"
            >
              <div class="text-6xl mb-4">
                🤔
              </div>
              <div class="text-gray-500 text-lg">
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
                  <div class="text-lg font-mono tracking-wide text-gray-800 dark:text-gray-100">
                    {{ problems[rowIndex * 2] }}
                  </div>
                  <div class="mt-2 border border-dashed border-gray-300 dark:border-gray-600 rounded h-20" />
                </div>
              </td>
              <td class="p-2 w-1/2 align-top">
                <div
                  v-if="problems[rowIndex * 2 + 1]"
                  class="problem-item"
                >
                  <div class="text-lg font-mono tracking-wide text-gray-800 dark:text-gray-100">
                    {{ problems[rowIndex * 2 + 1] }}
                  </div>
                  <div class="mt-2 border border-dashed border-gray-300 dark:border-gray-600 rounded h-20" />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
@media print {
  @page { size: A4; margin: 10mm; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  thead { display: table-header-group; }
  .problem-row { page-break-inside: avoid; }
  .problem-item { page-break-inside: avoid; }
}
</style>
