<script setup lang="ts">
const count = ref(20)
const unitType = ref<'length' | 'weight' | 'mixed'>('mixed')
const problems = ref<{ from: string, to: string, value: number }[]>([])

const lengthUnits = [
  { from: '米', to: '厘米', factor: 100 },
  { from: '厘米', to: '毫米', factor: 10 },
  { from: '千米', to: '米', factor: 1000 },
  { from: '分米', to: '厘米', factor: 10 },
  { from: '米', to: '分米', factor: 10 }
]

const weightUnits = [
  { from: '千克', to: '克', factor: 1000 },
  { from: '吨', to: '千克', factor: 1000 },
  { from: '克', to: '毫克', factor: 1000 }
]

function generate() {
  const result: { from: string, to: string, value: number }[] = []

  const units = unitType.value === 'length'
    ? lengthUnits
    : unitType.value === 'weight'
      ? weightUnits
      : [...lengthUnits, ...weightUnits]

  for (let i = 0; i < count.value; i++) {
    const unit = units[Math.floor(Math.random() * units.length)]
    const value = Math.floor(Math.random() * 99) + 1
    result.push({ from: unit.from, to: unit.to, value })
  }

  problems.value = result
}

watch([count, unitType], () => generate())
onMounted(() => generate())

function printPage() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-emerald-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-emerald-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            📏 单位换算
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
          <div class="mb-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <div class="text-sm text-emerald-700 dark:text-emerald-300">
              💡 长度：1千米=1000米，1米=10分米=100厘米<br>
              💡 重量：1吨=1000千克，1千克=1000克
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
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">单位类型</label>
              <div class="flex gap-2">
                <UButton
                  size="sm"
                  :color="unitType === 'length' ? 'primary' : 'neutral'"
                  :variant="unitType === 'length' ? 'solid' : 'outline'"
                  @click="unitType = 'length'"
                >
                  长度
                </UButton>
                <UButton
                  size="sm"
                  :color="unitType === 'weight' ? 'primary' : 'neutral'"
                  :variant="unitType === 'weight' ? 'solid' : 'outline'"
                  @click="unitType = 'weight'"
                >
                  重量
                </UButton>
                <UButton
                  size="sm"
                  :color="unitType === 'mixed' ? 'primary' : 'neutral'"
                  :variant="unitType === 'mixed' ? 'solid' : 'outline'"
                  @click="unitType = 'mixed'"
                >
                  混合
                </UButton>
              </div>
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="emerald"
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
                  单位换算
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
                class="problem-item flex items-center gap-1 text-gray-800 dark:text-gray-100"
              >
                <span class="font-mono">{{ problems[rowIndex * 3 + colIndex - 1].value }}</span>
                <span>{{ problems[rowIndex * 3 + colIndex - 1].from }} =</span>
                <span class="inline-block w-16 border-b border-dashed border-gray-400" />
                <span>{{ problems[rowIndex * 3 + colIndex - 1].to }}</span>
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
