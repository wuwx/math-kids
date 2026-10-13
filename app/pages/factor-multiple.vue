<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(15)
const problems = ref<{ question: string, answer: string }[]>([])

function getFactors(n: number): number[] {
  const factors: number[] = []
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i)
  }
  return factors
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

function generate() {
  const result: { question: string, answer: string }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 5)
    let question: string, answer: string

    switch (type) {
      case 0: { // 列出因数
        const num = Math.floor(Math.random() * 30) + 10
        const factors = getFactors(num)
        question = `${num} 的所有因数是___`
        answer = factors.join(', ')
        break
      }
      case 1: { // 判断因数
        const a = Math.floor(Math.random() * 10) + 2
        const b = a * (Math.floor(Math.random() * 10) + 2)
        question = `${a} 是 ${b} 的因数吗？___（是/否）`
        answer = '是'
        break
      }
      case 2: { // 判断倍数
        const a = Math.floor(Math.random() * 10) + 2
        const b = a * (Math.floor(Math.random() * 10) + 2)
        question = `${b} 是 ${a} 的倍数吗？___（是/否）`
        answer = '是'
        break
      }
      case 3: { // 最大公因数
        const a = Math.floor(Math.random() * 20) + 10
        const b = Math.floor(Math.random() * 20) + 10
        question = `${a} 和 ${b} 的最大公因数是___`
        answer = gcd(a, b).toString()
        break
      }
      default: { // 最小公倍数
        const a = Math.floor(Math.random() * 10) + 3
        const b = Math.floor(Math.random() * 10) + 3
        question = `${a} 和 ${b} 的最小公倍数是___`
        answer = lcm(a, b).toString()
      }
    }

    result.push({ question, answer })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="因数与倍数"
    icon="i-lucide-link"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          找因数、倍数，求最大公因数和最小公倍数
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
        <UInput
          v-model="count"
          type="number"
          :min="1"
          :max="30"
          class="text-center max-w-32"
        />
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
      v-for="(problem, idx) in problems"
      :key="idx"
      class="problem-row"
    >
      <td class="p-3 align-top">
        <div class="problem-item text-base text-slate-800 dark:text-slate-100">
          {{ idx + 1 }}. {{ problem.question }}
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
