<script setup lang="ts">
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

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <!-- 控制面板 -->
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <!-- 顶部导航 -->
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
            ➕➖ 加减法练习
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

        <!-- 参数设置 -->
        <div class="p-6">
          <!-- 快捷预设 -->
          <div class="mb-5">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
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
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
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
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">最小值</label>
              <UInput
                v-model="minNumber"
                type="number"
                class="text-center"
              />
            </div>
            <!-- 最大值 -->
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">最大值</label>
              <UInput
                v-model="maxNumber"
                type="number"
                class="text-center"
              />
            </div>
            <!-- 运算符 -->
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">运算符</label>
              <div class="flex gap-2">
                <button
                  class="flex-1 py-2 text-xl font-bold rounded-xl border-2 transition hover:opacity-80"
                  :style="hasPlus ? 'background-color: #22c55e; color: white; border-color: #22c55e;' : 'background-color: white; color: #4b5563; border-color: #d1d5db;'"
                  @click="toggleOperator('+')"
                >
                  +
                </button>
                <button
                  class="flex-1 py-2 text-xl font-bold rounded-xl border-2 transition hover:opacity-80"
                  :style="hasMinus ? 'background-color: #f97316; color: white; border-color: #f97316;' : 'background-color: white; color: #4b5563; border-color: #d1d5db;'"
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
            class="mt-5"
            @click="generate"
          >
            🎲 重新生成
          </UButton>
        </div>
      </div>
    </div>

    <!-- 题目区域 -->
    <div class="print-area max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
      <!-- 页头 - 打印时每页重复 -->
      <table class="w-full">
        <thead>
          <tr>
            <th
              colspan="2"
              class="p-0 text-left"
            >
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">
                  加减法练习
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
              <div class="text-gray-500 dark:text-gray-400 text-lg">
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
                  <div class="mt-2 border border-dashed border-gray-300 dark:border-gray-600 rounded h-20 print:h-22" />
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
                  <div class="mt-2 border border-dashed border-gray-300 dark:border-gray-600 rounded h-20 print:h-22" />
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
  @page {
    size: A4;
    margin: 10mm;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* 页头每页重复 */
  thead {
    display: table-header-group;
  }

  /* 防止题目被截断 */
  .problem-row {
    page-break-inside: avoid;
  }

  .problem-item {
    page-break-inside: avoid;
  }
}
</style>
