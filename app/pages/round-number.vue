<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const targetType = ref<'ten' | 'hundred'>('hundred')
const problems = ref<{ expression: string, answer: number }[]>([])

function generate() {
  const result: { expression: string, answer: number }[] = []
  const target = targetType.value === 'ten' ? 10 : 100

  for (let i = 0; i < count.value; i++) {
    const a = Math.floor(Math.random() * (target - 1)) + 1
    const answer = target - a
    result.push({ expression: `${a} + ___ = ${target}`, answer })
  }
  problems.value = result
}

watch([count, targetType], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="凑整练习"
    icon="i-lucide-circle-dot"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          填空凑成整十或整百
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
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">凑整目标</label>
          <USelectMenu
            v-model="targetType"
            :items="[{ label: '凑十', value: 'ten' }, { label: '凑百', value: 'hundred' }]"
            value-key="value"
            class="w-full"
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
      v-for="(_, rowIndex) in Math.ceil(problems.length / 3)"
      :key="rowIndex"
      class="problem-row"
    >
      <td
        v-for="colIndex in 3"
        :key="colIndex"
        class="p-3 w-1/3 align-top"
      >
        <div
          v-if="problems[rowIndex * 3 + colIndex - 1]"
          class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-slate-100"
        >
          {{ problems[rowIndex * 3 + colIndex - 1].expression }}
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
