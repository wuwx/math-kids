<script setup lang="ts">
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

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-rose-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-rose-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            🍕 分数加减法
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
          <div class="mb-5 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
            <div class="text-sm text-rose-700 dark:text-rose-300">
              💡 同分母分数加减法，分母不变，分子相加减，结果要化简
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput
                v-model="count"
                type="number"
                :min="1"
                :max="100"
                class="text-center"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">最大分母</label>
              <UInput
                v-model="maxDenominator"
                type="number"
                :min="2"
                :max="20"
                class="text-center"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">运算符</label>
              <div class="flex gap-2">
                <button
                  class="flex-1 py-2 text-xl font-bold rounded-xl border-2 transition"
                  :class="hasPlus ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-600 border-gray-300'"
                  @click="toggleOperator('+')"
                >
                  +
                </button>
                <button
                  class="flex-1 py-2 text-xl font-bold rounded-xl border-2 transition"
                  :class="hasMinus ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300'"
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
            color="rose"
            class="mt-5"
            @click="generate"
          >
            🎲 重新生成
          </UButton>
        </div>
      </div>
    </div>

    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <table class="w-full">
        <thead>
          <tr>
            <th
              colspan="3"
              class="p-0 text-left"
            >
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">
                  分数加减法
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
                class="problem-item flex items-center gap-2 text-gray-800 dark:text-gray-100"
              >
                <div class="inline-flex flex-col items-center">
                  <span class="border-b border-gray-800 dark:border-gray-100 px-1">{{ problems[rowIndex * 3 + colIndex - 1].a }}</span>
                  <span class="px-1">{{ problems[rowIndex * 3 + colIndex - 1].b }}</span>
                </div>
                <span class="text-lg">{{ problems[rowIndex * 3 + colIndex - 1].op }}</span>
                <div class="inline-flex flex-col items-center">
                  <span class="border-b border-gray-800 dark:border-gray-100 px-1">{{ problems[rowIndex * 3 + colIndex - 1].c }}</span>
                  <span class="px-1">{{ problems[rowIndex * 3 + colIndex - 1].d }}</span>
                </div>
                <span class="text-lg">=</span>
                <span class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-600" />
              </div>
            </td>
          </tr>
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
}
</style>
