<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

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

  const n = toCount(count.value)
  if (!n) return

  for (let i = 0; i < n; i++) {
    const unit = units[Math.floor(Math.random() * units.length)]!
    const value = Math.floor(Math.random() * 99) + 1
    result.push({ from: unit.from, to: unit.to, value })
  }

  problems.value = result
}

watch([count, unitType], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="单位换算"
    icon="i-lucide-ruler"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          长度：1千米=1000米，1米=10分米=100厘米<br>
          重量：1吨=1000千克，1千克=1000克
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
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">单位类型</label>
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
        icon="i-lucide-dices"
        class="mt-5"
        @click="generate"
      >
        重新生成
      </UButton>
    </template>

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
          class="problem-item flex flex-wrap items-center gap-1 text-slate-800 dark:text-slate-100"
        >
          <span class="font-mono">{{ problems[rowIndex * 3 + colIndex - 1]!.value }}</span>
          <span>{{ problems[rowIndex * 3 + colIndex - 1]!.from }} =</span>
          <span class="inline-block w-16 border-b border-dashed border-slate-400" />
          <span>{{ problems[rowIndex * 3 + colIndex - 1]!.to }}</span>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
