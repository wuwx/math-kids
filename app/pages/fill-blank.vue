<script setup lang="ts">
const count = ref(30)
const maxNumber = ref(999)
const problems = ref<{ expression: string, answer: number }[]>([])

function generate() {
  const result: { expression: string, answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    const a = Math.floor(Math.random() * maxNumber.value) + 10
    const b = Math.floor(Math.random() * Math.min(a - 1, maxNumber.value)) + 1

    let expression = ''
    let answer = 0

    switch (type) {
      case 0: // □ + b = a
        expression = `□ + ${b} = ${a}`
        answer = a - b
        break
      case 1: // a + □ = a+b
        expression = `${a} + □ = ${a + b}`
        answer = b
        break
      case 2: // □ - b = a-b
        expression = `□ − ${b} = ${a - b}`
        answer = a
        break
      case 3: // a - □ = a-b
        expression = `${a} − □ = ${a - b}`
        answer = b
        break
    }

    result.push({ expression, answer })
  }

  problems.value = result
}

watch([count, maxNumber], () => generate())
onMounted(() => generate())

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-violet-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-violet-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            🔲 填空算式
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
          <div class="mb-5 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
            <div class="text-sm text-violet-700 dark:text-violet-300">
              💡 根据等式关系，逆向思考求出 □ 中的数
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
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
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">数字上限</label>
              <UInput
                v-model="maxNumber"
                type="number"
                :min="10"
                :max="9999"
                class="text-center"
              />
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="violet"
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
                  填空算式
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
                class="problem-item text-lg font-mono tracking-wide text-gray-800 dark:text-gray-100"
              >
                {{ problems[rowIndex * 3 + colIndex - 1].expression }}
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
