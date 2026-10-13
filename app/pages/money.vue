<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

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
</script>

<template>
  <ExerciseShell
    title="人民币换算"
    icon="i-lucide-coins"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          1元 = 10角 = 100分
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="50"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目类型</label>
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
        icon="i-lucide-dices"
        class="mt-5"
        @click="generate"
      >
        重新生成
      </UButton>
    </template>

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
          class="text-slate-800 dark:text-gray-100"
        >
          <template v-if="problems[rowIndex * 2 + colIndex - 1].type === 'change'">
            <div class="problem-item mb-1">
              商品 <span class="font-bold">{{ problems[rowIndex * 2 + colIndex - 1].data.price }}</span> 元
            </div>
            <div class="flex items-center gap-2">
              <span>付 {{ problems[rowIndex * 2 + colIndex - 1].data.paid }} 元，找回</span>
              <span class="inline-block w-16 border-b border-dashed border-slate-400" />
              <span>元</span>
            </div>
          </template>
          <template v-else-if="problems[rowIndex * 2 + colIndex - 1].type === 'yuan2jiao'">
            <div class="problem-item flex items-center gap-2">
              <span>{{ problems[rowIndex * 2 + colIndex - 1].data.value }} 元 =</span>
              <span class="inline-block w-16 border-b border-dashed border-slate-400" />
              <span>角</span>
            </div>
          </template>
          <template v-else-if="problems[rowIndex * 2 + colIndex - 1].type === 'jiao2fen'">
            <div class="problem-item flex items-center gap-2">
              <span>{{ problems[rowIndex * 2 + colIndex - 1].data.value }} 角 =</span>
              <span class="inline-block w-16 border-b border-dashed border-slate-400" />
              <span>分</span>
            </div>
          </template>
          <template v-else-if="problems[rowIndex * 2 + colIndex - 1].type === 'yuan2fen'">
            <div class="problem-item flex items-center gap-2">
              <span>{{ problems[rowIndex * 2 + colIndex - 1].data.value }} 元 =</span>
              <span class="inline-block w-16 border-b border-dashed border-slate-400" />
              <span>分</span>
            </div>
          </template>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
