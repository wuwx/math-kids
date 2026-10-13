<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(20)
const problems = ref<{ question: string, answer: number }[]>([])

function generate() {
  const result: { question: string, answer: number }[] = []
  const places = ['个', '十', '百', '千']

  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 4)
    const num = Math.floor(Math.random() * 9000) + 1000
    const digits = num.toString().split('').reverse()
    let question: string, answer: number

    switch (type) {
      case 0: { // 某位上是几
        const pos = Math.floor(Math.random() * 4)
        question = `${num} 的${places[pos]}位上是___`
        answer = parseInt(digits[pos]!)
        break
      }
      case 1: { // 某数字在什么位
        const pos = Math.floor(Math.random() * 4)
        const digit = digits[pos]
        question = `${num} 中，${digit} 在___位上`
        answer = pos // 0=个,1=十,2=百,3=千
        break
      }
      case 2: { // 某位表示多少
        const pos = Math.floor(Math.random() * 3) + 1
        const digit = parseInt(digits[pos]!)
        question = `${num} 的${places[pos]}位上的 ${digit} 表示___`
        answer = digit * Math.pow(10, pos)
        break
      }
      default: { // 组成
        const thousands = parseInt(digits[3]!)
        const hundreds = parseInt(digits[2]!)
        const tens = parseInt(digits[1]!)
        const ones = parseInt(digits[0]!)
        question = `${thousands}个千 + ${hundreds}个百 + ${tens}个十 + ${ones}个一 = ___`
        answer = num
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
    title="数位练习"
    icon="i-lucide-hash"
  >
    <template #settings>
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          认识个、十、百、千位
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
          class="problem-item text-base text-slate-800 dark:text-slate-100"
        >
          {{ problems[rowIndex * 2 + colIndex - 1]!.question }}
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
