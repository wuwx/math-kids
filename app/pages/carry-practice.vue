<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

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
</script>

<template>
  <ExerciseShell
    title="连续进位/借位"
    icon="i-lucide-arrow-up-down"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          专门练习需要进位的加法和需要借位的减法
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
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">练习类型</label>
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
      <td class="p-2 w-1/2 align-top">
        <template v-if="problems[rowIndex * 2]">
          <div class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100 tabular-nums">
            {{ problems[rowIndex * 2] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-20" />
        </template>
      </td>
      <td class="p-2 w-1/2 align-top">
        <template v-if="problems[rowIndex * 2 + 1]">
          <div class="problem-item text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100 tabular-nums">
            {{ problems[rowIndex * 2 + 1] }}
          </div>
          <div class="mt-2 border border-dashed border-slate-300 dark:border-slate-600 rounded h-20" />
        </template>
      </td>
    </tr>
  </ExerciseShell>
</template>
