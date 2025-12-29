<script setup lang="ts">
const count = ref(15)
const problems = ref<{ sequence: (number | string)[], answer: number }[]>([])

function generate() {
  const result: { sequence: (number | string)[], answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 5)
    let seq: number[] = []
    let answer = 0

    switch (type) {
      case 0: { // 等差数列
        const start = Math.floor(Math.random() * 20) + 1
        const diff = Math.floor(Math.random() * 10) + 1
        for (let j = 0; j < 5; j++) seq.push(start + diff * j)
        answer = start + diff * 5
        break
      }
      case 1: { // 等差递减
        const start = Math.floor(Math.random() * 50) + 50
        const diff = Math.floor(Math.random() * 8) + 2
        for (let j = 0; j < 5; j++) seq.push(start - diff * j)
        answer = start - diff * 5
        break
      }
      case 2: { // 乘2
        const start = Math.floor(Math.random() * 5) + 1
        let val = start
        for (let j = 0; j < 5; j++) {
          seq.push(val)
          val *= 2
        }
        answer = val
        break
      }
      case 3: { // 平方数
        const start = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < 5; j++) seq.push((start + j) * (start + j))
        answer = (start + 5) * (start + 5)
        break
      }
      case 4: { // 斐波那契类
        const a = Math.floor(Math.random() * 5) + 1
        const b = Math.floor(Math.random() * 5) + 1
        seq = [a, b]
        for (let j = 2; j < 5; j++) seq.push(seq[j - 1] + seq[j - 2])
        answer = seq[3] + seq[4]
        break
      }
    }

    // 随机选择一个位置作为答案
    const blankPos = Math.floor(Math.random() * 3) + 3 // 后三个位置
    const displaySeq: (number | string)[] = [...seq]
    answer = seq[blankPos]
    displaySeq[blankPos] = '___'

    result.push({ sequence: displaySeq, answer })
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
  <div class="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-fuchsia-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-fuchsia-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            🔢 找规律填数
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
          <div class="mb-5 p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl">
            <div class="text-sm text-fuchsia-700 dark:text-fuchsia-300">
              💡 观察数列规律，填出空缺的数字
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput
                v-model="count"
                type="number"
                :min="1"
                :max="30"
                class="text-center max-w-32"
              />
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="fuchsia"
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
            <th class="p-0 text-left">
              <div class="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-400">
                <div class="text-xl font-bold text-gray-800 dark:text-gray-100">
                  找规律填数
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
            v-for="(problem, idx) in problems"
            :key="idx"
            class="problem-row"
          >
            <td class="p-3 align-top">
              <div class="problem-item text-lg font-mono text-gray-800 dark:text-gray-100">
                <span
                  v-for="(num, j) in problem.sequence"
                  :key="j"
                >
                  <template v-if="num === '___'">
                    <span class="inline-block w-12 border-b-2 border-gray-400 mx-1" />
                  </template>
                  <template v-else>
                    {{ num }}
                  </template>
                  <span
                    v-if="j < problem.sequence.length - 1"
                    class="mx-2"
                  >,</span>
                </span>
                <span class="ml-2">, ...</span>
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
