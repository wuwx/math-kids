<script setup lang="ts">
const count = ref(20)
const mode = ref<'convert' | 'change'>('change')
interface MoneyProblem {
  type: string
  data: { price?: string, paid?: number, value?: number }
}
const problems = ref<MoneyProblem[]>([])

function generate() {
  const result: MoneyProblem[] = []

  for (let i = 0; i < count.value; i++) {
    if (mode.value === 'change') {
      const price = Math.floor(Math.random() * 95) + 1 + Math.floor(Math.random() * 10) / 10
      const paid = Math.ceil(price / 10) * 10 + (Math.random() > 0.5 ? 10 : 0)
      result.push({ type: 'change', data: { price: price.toFixed(1), paid } })
    } else {
      const types = ['yuan2jiao', 'jiao2fen', 'yuan2fen']
      const t = types[Math.floor(Math.random() * types.length)]
      const value = Math.floor(Math.random() * 50) + 1
      result.push({ type: t, data: { value } })
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
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 print:bg-white print:min-h-0 print:p-0">
    <div class="max-w-4xl mx-auto mb-6 print:hidden">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-amber-500 text-white px-6 py-4 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 hover:text-amber-200 transition"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-5 h-5"
            />
            <span>返回</span>
          </NuxtLink>
          <h1 class="text-xl font-bold">
            💰 人民币换算
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
          <div class="mb-5 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div class="text-sm text-amber-700 dark:text-amber-300">
              💡 1元 = 10角 = 100分
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
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">题目类型</label>
              <div class="flex gap-2">
                <UButton
                  :color="mode === 'change' ? 'primary' : 'neutral'"
                  :variant="mode === 'change' ? 'solid' : 'outline'"
                  class="flex-1"
                  @click="mode = 'change'"
                >
                  找零
                </UButton>
                <UButton
                  :color="mode === 'convert' ? 'primary' : 'neutral'"
                  :variant="mode === 'convert' ? 'solid' : 'outline'"
                  class="flex-1"
                  @click="mode = 'convert'"
                >
                  换算
                </UButton>
              </div>
            </div>
          </div>
          <UButton
            block
            size="lg"
            color="amber"
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
                  人民币{{ mode === 'change' ? '找零' : '换算' }}
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
                <template v-if="problems[rowIndex * 2 + colIndex - 1].type === 'change'">
                  <div class="mb-1">
                    商品 <span class="font-bold">{{ problems[rowIndex * 2 + colIndex - 1].data.price }}</span> 元
                  </div>
                  <div class="flex items-center gap-2">
                    <span>付 {{ problems[rowIndex * 2 + colIndex - 1].data.paid }} 元，找回</span>
                    <span class="inline-block w-16 border-b border-dashed border-gray-400" />
                    <span>元</span>
                  </div>
                </template>
                <template v-else-if="problems[rowIndex * 2 + colIndex - 1].type === 'yuan2jiao'">
                  <div class="flex items-center gap-2">
                    <span>{{ problems[rowIndex * 2 + colIndex - 1].data.value }} 元 =</span>
                    <span class="inline-block w-16 border-b border-dashed border-gray-400" />
                    <span>角</span>
                  </div>
                </template>
                <template v-else-if="problems[rowIndex * 2 + colIndex - 1].type === 'jiao2fen'">
                  <div class="flex items-center gap-2">
                    <span>{{ problems[rowIndex * 2 + colIndex - 1].data.value }} 角 =</span>
                    <span class="inline-block w-16 border-b border-dashed border-gray-400" />
                    <span>分</span>
                  </div>
                </template>
                <template v-else-if="problems[rowIndex * 2 + colIndex - 1].type === 'yuan2fen'">
                  <div class="flex items-center gap-2">
                    <span>{{ problems[rowIndex * 2 + colIndex - 1].data.value }} 元 =</span>
                    <span class="inline-block w-16 border-b border-dashed border-gray-400" />
                    <span>分</span>
                  </div>
                </template>
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
