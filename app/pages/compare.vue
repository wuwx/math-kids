<script setup lang="ts">
const count = ref(20)
const problems = ref<{ left: string, right: string }[]>([])

function randomOp(): string {
  return Math.random() > 0.5 ? '+' : '-'
}

function generate() {
  const result: { left: string, right: string }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)

    if (type === 0) {
      // 两个加减法比较
      const a = Math.floor(Math.random() * 900) + 100
      const b = Math.floor(Math.random() * 100) + 10
      const c = Math.floor(Math.random() * 900) + 100
      const d = Math.floor(Math.random() * 100) + 10
      const op1 = randomOp()
      const op2 = randomOp()
      result.push({
        left: `${a} ${op1} ${b}`,
        right: `${c} ${op2} ${d}`
      })
    } else if (type === 1) {
      // 乘法比较
      const a = Math.floor(Math.random() * 9) + 2
      const b = Math.floor(Math.random() * 9) + 2
      const c = Math.floor(Math.random() * 9) + 2
      const d = Math.floor(Math.random() * 9) + 2
      result.push({
        left: `${a} × ${b}`,
        right: `${c} × ${d}`
      })
    } else {
      // 数字与算式比较
      const a = Math.floor(Math.random() * 90) + 10
      const b = Math.floor(Math.random() * 90) + 10
      const op = randomOp()
      const num = op === '+' ? a + b + Math.floor(Math.random() * 20) - 10 : a - b + Math.floor(Math.random() * 20) - 10
      if (Math.random() > 0.5) {
        result.push({ left: `${a} ${op} ${b}`, right: `${Math.abs(num)}` })
      } else {
        result.push({ left: `${Math.abs(num)}`, right: `${a} ${op} ${b}` })
      }
    }
  }

  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-indigo-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-indigo-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            ⚖️ 比大小
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
          <div class="mb-5 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <div class="text-sm text-indigo-700 dark:text-indigo-300">
              💡 在 ○ 中填入 &gt;、&lt; 或 =
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
            color="indigo"
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
                  比大小
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
                class="problem-item flex items-center gap-2 text-lg font-mono text-gray-800 dark:text-gray-100"
              >
                <span>{{ problems[rowIndex * 2 + colIndex - 1].left }}</span>
                <span class="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm">○</span>
                <span>{{ problems[rowIndex * 2 + colIndex - 1].right }}</span>
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
