<script setup lang="ts">
const count = ref(20)
const problems = ref<{ startH: number, startM: number, endH: number, endM: number }[]>([])

function generate() {
  const result: { startH: number, startM: number, endH: number, endM: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const startH = Math.floor(Math.random() * 12) + 1
    const startM = Math.floor(Math.random() * 60)

    // 随机增加 10 分钟到 3 小时
    const addMinutes = Math.floor(Math.random() * 170) + 10
    let endM = startM + addMinutes
    let endH = startH + Math.floor(endM / 60)
    endM = endM % 60
    if (endH > 12) endH -= 12

    result.push({ startH, startM, endH, endM })
  }

  problems.value = result
}

function formatTime(h: number, m: number): string {
  return `${h}:${m.toString().padStart(2, '0')}`
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-sky-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-sky-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            ⏰ 时间计算
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
          <div class="mb-5 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
            <div class="text-sm text-sky-700 dark:text-sky-300">
              💡 计算从开始时间到结束时间经过了多少小时多少分钟
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput
                v-model="count"
                type="number"
                :min="1"
                :max="50"
                class="text-center max-w-32"
              />
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="sky"
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
              colspan="2"
              class="p-0 text-left"
            >
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">
                  时间计算
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
            <td
              v-for="colIndex in 2"
              :key="colIndex"
              class="p-3 w-1/2 align-top"
            >
              <div
                v-if="problems[rowIndex * 2 + colIndex - 1]"
                class="problem-item text-gray-800 dark:text-gray-100"
              >
                <div class="text-base mb-2">
                  从 <span class="font-mono font-bold">{{ formatTime(problems[rowIndex * 2 + colIndex - 1].startH, problems[rowIndex * 2 + colIndex - 1].startM) }}</span>
                  到 <span class="font-mono font-bold">{{ formatTime(problems[rowIndex * 2 + colIndex - 1].endH, problems[rowIndex * 2 + colIndex - 1].endM) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>经过了</span>
                  <span class="inline-block w-12 border-b border-dashed border-gray-400" />
                  <span>小时</span>
                  <span class="inline-block w-12 border-b border-dashed border-gray-400" />
                  <span>分钟</span>
                </div>
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
