<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(15)
const problems = ref<{ sequence: (number | string)[], answer: number }[]>([])

function generate() {
  const result: { sequence: (number | string)[], answer: number }[] = []

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 5)
    let seq: number[] = []
    let answer = 0

    switch (type) {
      case 0: { // 等差数列
        const start = Math.floor(Math.random() * 20) + 1
        const diff = Math.floor(Math.random() * 10) + 1
        for (let j = 0; j < 5; j++) seq.push(start + diff * j)
        answer = start + diff * 5
        break
      }
      case 1: { // 等差递减
        const start = Math.floor(Math.random() * 50) + 50
        const diff = Math.floor(Math.random() * 8) + 2
        for (let j = 0; j < 5; j++) seq.push(start - diff * j)
        answer = start - diff * 5
        break
      }
      case 2: { // 乘2
        const start = Math.floor(Math.random() * 5) + 1
        let val = start
        for (let j = 0; j < 5; j++) {
          seq.push(val)
          val *= 2
        }
        answer = val
        break
      }
      case 3: { // 平方数
        const start = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < 5; j++) seq.push((start + j) * (start + j))
        answer = (start + 5) * (start + 5)
        break
      }
      case 4: { // 斐波那契类
        const a = Math.floor(Math.random() * 5) + 1
        const b = Math.floor(Math.random() * 5) + 1
        seq = [a, b]
        for (let j = 2; j < 5; j++) seq.push(seq[j - 1]! + seq[j - 2]!)
        answer = seq[3]! + seq[4]!
        break
      }
    }

    // 随机选择一个位置作为答案
    const blankPos = Math.floor(Math.random() * 3) + 3 // 后三个位置
    const displaySeq: (number | string)[] = [...seq]
    answer = seq[blankPos]!
    displaySeq[blankPos] = '___'

    result.push({ sequence: displaySeq, answer })
  }
  problems.value = result
}

watch([count], () => generate())
onMounted(() => generate())
</script>

<template>
  <ExerciseShell
    title="找规律填数"
    icon="i-lucide-list-ordered"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          观察数列规律，填出空缺的数字
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4">
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
        <div class="problem-item text-lg font-mono text-slate-800 dark:text-slate-100">
          <span
            v-for="(num, j) in problem.sequence"
            :key="j"
          >
            <template v-if="num === '___'">
              <span class="inline-block w-12 border-b-2 border-slate-400 mx-1" />
            </template>
            <template v-else>
              {{ num }}
            </template>
            <span
              v-if="j < problem.sequence.length - 1"
              class="mx-2"
            >,</span>
          </span>
          <span class="ml-2">, ...</span>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
