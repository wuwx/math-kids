<script setup lang="ts">
// 进位借位练习 - 确保生成需要进位/借位的题目
const count = ref(20)
const problems = ref<string[]>([])

function generate() {
  const result: string[] = []
  for (let i = 0; i < count.value; i++) {
    const isAdd = Math.random() > 0.5

    for (let j = 0; j < 100; j++) {
      if (isAdd) {
        // 进位加法：个位相加 >= 10
        const a = Math.floor(Math.random() * 900) + 100
        const aUnit = a % 10
        if (aUnit >= 9) continue
        const bUnit = 10 - aUnit + Math.floor(Math.random() * aUnit)
        const b = Math.floor(Math.random() * 90) * 10 + 10 + bUnit
        if (b >= 100 && b <= 999) {
          result.push(`${a} + ${b} =`)
          break
        }
      } else {
        // 借位减法：被减数个位 < 减数个位
        const a = Math.floor(Math.random() * 900) + 100
        const aUnit = a % 10
        if (aUnit >= 8) continue
        const bUnit = aUnit + 1 + Math.floor(Math.random() * (9 - aUnit - 1))
        const bTens = Math.floor(Math.random() * (Math.floor(a / 10) - 10)) + 10
        const b = bTens * 10 + bUnit
        if (b > 0 && b < a && b >= 100) {
          result.push(`${a} - ${b} =`)
          break
        }
      }
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
            🔢 进位借位练习
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
          <div class="flex items-center gap-4">
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
                  进位借位练习
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
