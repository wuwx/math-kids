<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(10)
const problems = ref<{ question: string, answer: number }[]>([])

const templates = [
  { gen: () => {
    const a = rand(10, 50), b = rand(10, 50)
    return { q: `小明有${a}个苹果，小红有${b}个苹果，他们一共有多少个苹果？`, a: a + b }
  } },
  { gen: () => {
    const a = rand(30, 80), b = rand(10, 29)
    return { q: `图书馆有${a}本书，借出去${b}本，还剩多少本？`, a: a - b }
  } },
  { gen: () => {
    const a = rand(3, 9), b = rand(5, 12)
    return { q: `每盒有${a}个鸡蛋，买了${b}盒，一共有多少个鸡蛋？`, a: a * b }
  } },
  { gen: () => {
    const b = rand(3, 9), c = rand(5, 12), a = b * c
    return { q: `${a}个糖果平均分给${b}个小朋友，每人分到多少个？`, a: c }
  } },
  { gen: () => {
    const a = rand(20, 50), b = rand(10, 30), c = rand(5, 20)
    return { q: `小明有${a}元，买文具花了${b}元，买零食花了${c}元，还剩多少元？`, a: a - b - c }
  } },
  { gen: () => {
    const a = rand(5, 15), b = rand(3, 8)
    return { q: `一支铅笔${a}元，买${b}支需要多少元？`, a: a * b }
  } },
  { gen: () => {
    const a = rand(100, 200), b = rand(50, 99)
    return { q: `火车上有${a}人，到站后下车${b}人，车上还有多少人？`, a: a - b }
  } },
  { gen: () => {
    const a = rand(20, 40), b = rand(15, 35)
    return { q: `果园里有苹果树${a}棵，梨树${b}棵，果树一共有多少棵？`, a: a + b }
  } },
  { gen: () => {
    const a = rand(4, 8), b = rand(6, 12)
    return { q: `教室每排有${a}张桌子，共${b}排，一共有多少张桌子？`, a: a * b }
  } },
  { gen: () => {
    const b = rand(4, 8), c = rand(3, 7), a = b * c
    return { q: `${a}本书平均放在${b}个书架上，每个书架放多少本？`, a: c }
  } }
]

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generate() {
  const result: { question: string, answer: number }[] = []
  for (let i = 0; i < count.value; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)]
    const { q, a } = template.gen()
    result.push({ question: q, answer: a })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="应用题"
    icon="i-lucide-book-open"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          读题、列式、计算、作答
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
        <UInput
          v-model="count"
          type="number"
          :min="1"
          :max="20"
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
        <div class="problem-item text-base text-slate-800 dark:text-gray-100 mb-2 leading-relaxed">
          {{ problem.question }}
        </div>
        <div class="border border-dashed border-slate-300 dark:border-slate-600 rounded h-24 print:h-28" />
      </td>
    </tr>
  </ExerciseShell>
</template>
