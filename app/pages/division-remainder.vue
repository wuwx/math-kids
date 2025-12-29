<script setup lang="ts">
const count = ref(30)
const maxDividend = ref(99)
const maxDivisor = ref(9)
const problems = ref<{ dividend: number, divisor: number }[]>([])

function generate() {
  const result: { dividend: number, divisor: number }[] = []
  const used = new Set<string>()

  let attempts = 0
  while (result.length < count.value && attempts < count.value * 100) {
    attempts++
    const divisor = Math.floor(Math.random() * (maxDivisor.value - 2 + 1)) + 2
    const dividend = Math.floor(Math.random() * (maxDividend.value - divisor)) + divisor + 1

    // 确保有余数
    if (dividend % divisor === 0) continue

    const key = `${dividend}÷${divisor}`
    if (used.has(key)) continue

    used.add(key)
    result.push({ dividend, divisor })
  }
  problems.value = result
}

watch([count, maxDividend, maxDivisor], () => generate())
onMounted(() => generate())

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-orange-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-orange-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            ➗ 带余数除法
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
          <div class="mb-5 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <div class="text-sm text-orange-700 dark:text-orange-300">
              💡 练习带余数的除法，答案格式：商 ... 余数
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
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">被除数上限</label>
              <UInput
                v-model="maxDividend"
                type="number"
                :min="10"
                :max="999"
                class="text-center"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">除数上限</label>
              <UInput
                v-model="maxDivisor"
                type="number"
                :min="2"
                :max="19"
                class="text-center"
              />
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="orange"
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
                  带余数除法
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
              class="p-2 w-1/3 align-top"
            >
              <div
                v-if="problems[rowIndex * 3 + colIndex - 1]"
                class="problem-item flex items-center gap-2"
              >
                <span class="text-lg font-mono tracking-wide text-gray-800 dark:text-gray-100">
                  {{ problems[rowIndex * 3 + colIndex - 1].dividend }} ÷ {{ problems[rowIndex * 3 + colIndex - 1].divisor }} =
                </span>
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
