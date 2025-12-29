<script setup lang="ts">
const count = ref(20)
const mode = ref<'carry' | 'borrow' | 'both'>('both')
const problems = ref<string[]>([])

function hasCarry(a: number, b: number): boolean {
  const aStr = a.toString()
  const bStr = b.toString()
  let carry = 0
  const maxLen = Math.max(aStr.length, bStr.length)

  for (let i = 0; i < maxLen; i++) {
    const aDigit = parseInt(aStr[aStr.length - 1 - i] || '0')
    const bDigit = parseInt(bStr[bStr.length - 1 - i] || '0')
    const sum = aDigit + bDigit + carry
    if (sum >= 10) return true
    carry = Math.floor(sum / 10)
  }
  return false
}

function hasBorrow(a: number, b: number): boolean {
  const aStr = a.toString()
  const bStr = b.toString()
  let borrow = 0

  for (let i = 0; i < aStr.length; i++) {
    const aDigit = parseInt(aStr[aStr.length - 1 - i] || '0') - borrow
    const bDigit = parseInt(bStr[bStr.length - 1 - i] || '0')
    if (aDigit < bDigit) return true
    borrow = aDigit < bDigit ? 1 : 0
  }
  return false
}

function generate() {
  const result: string[] = []
  let attempts = 0

  while (result.length < count.value && attempts < count.value * 100) {
    attempts++

    if (mode.value === 'carry' || (mode.value === 'both' && Math.random() > 0.5)) {
      // 生成进位加法
      const a = Math.floor(Math.random() * 900) + 100
      const b = Math.floor(Math.random() * 900) + 100
      if (hasCarry(a, b)) {
        result.push(`${a} + ${b} =`)
      }
    } else {
      // 生成借位减法
      const a = Math.floor(Math.random() * 900) + 100
      const b = Math.floor(Math.random() * (a - 10)) + 10
      if (hasBorrow(a, b)) {
        result.push(`${a} − ${b} =`)
      }
    }
  }

  problems.value = result
}

watch([count, mode], () => generate())
onMounted(() => generate())

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-lime-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-lime-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            🔄 连续进位/借位
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
          <div class="mb-5 p-4 bg-lime-50 dark:bg-lime-900/20 rounded-xl">
            <div class="text-sm text-lime-700 dark:text-lime-300">
              💡 专门练习需要进位的加法和需要借位的减法
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目数量</label>
              <UInput
                v-model="count"
                type="number"
                :min="1"
                :max="50"
                class="text-center"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">练习类型</label>
              <div class="flex gap-2">
                <UButton
                  size="sm"
                  :color="mode === 'carry' ? 'primary' : 'neutral'"
                  :variant="mode === 'carry' ? 'solid' : 'outline'"
                  @click="mode = 'carry'"
                >
                  进位
                </UButton>
                <UButton
                  size="sm"
                  :color="mode === 'borrow' ? 'primary' : 'neutral'"
                  :variant="mode === 'borrow' ? 'solid' : 'outline'"
                  @click="mode = 'borrow'"
                >
                  借位
                </UButton>
                <UButton
                  size="sm"
                  :color="mode === 'both' ? 'primary' : 'neutral'"
                  :variant="mode === 'both' ? 'solid' : 'outline'"
                  @click="mode = 'both'"
                >
                  混合
                </UButton>
              </div>
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="lime"
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
}
</style>
