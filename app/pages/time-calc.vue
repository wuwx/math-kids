<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

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
</script>

<template>
  <ExerciseShell
    title="时间计算"
    icon="i-lucide-clock"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          计算从开始时间到结束时间经过了多少小时多少分钟
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
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
          <div class="problem-item text-base mb-2">
            从 <span class="font-mono font-bold">{{ formatTime(problems[rowIndex * 2 + colIndex - 1].startH, problems[rowIndex * 2 + colIndex - 1].startM) }}</span>
            到 <span class="font-mono font-bold">{{ formatTime(problems[rowIndex * 2 + colIndex - 1].endH, problems[rowIndex * 2 + colIndex - 1].endM) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span>经过了</span>
            <span class="inline-block w-12 border-b border-dashed border-slate-400" />
            <span>小时</span>
            <span class="inline-block w-12 border-b border-dashed border-slate-400" />
            <span>分钟</span>
          </div>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
