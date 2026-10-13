<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(50)
const timeLimit = ref(180) // 秒
const problems = ref<string[]>([])
const currentIndex = ref(0)
const userAnswer = ref('')
const score = ref(0)
const wrongAnswers = ref<{ problem: string, userAnswer: string, correct: number }[]>([])
const isRunning = ref(false)
const timeLeft = ref(0)
const isFinished = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function generateProblems() {
  const result: string[] = []
  for (let i = 0; i < count.value; i++) {
    const type = Math.floor(Math.random() * 3)
    let problem = ''

    if (type === 0) { // 加法
      const a = Math.floor(Math.random() * 90) + 10
      const b = Math.floor(Math.random() * 90) + 10
      problem = `${a} + ${b}`
    } else if (type === 1) { // 减法
      const a = Math.floor(Math.random() * 90) + 10
      const b = Math.floor(Math.random() * a) + 1
      problem = `${a} - ${b}`
    } else { // 乘法
      const a = Math.floor(Math.random() * 9) + 2
      const b = Math.floor(Math.random() * 9) + 2
      problem = `${a} × ${b}`
    }
    result.push(problem)
  }
  problems.value = result
}

function getAnswer(problem: string): number {
  const cleaned = problem.replace('×', '*').replace('−', '-')
  return eval(cleaned)
}

function start() {
  generateProblems()
  currentIndex.value = 0
  score.value = 0
  wrongAnswers.value = []
  userAnswer.value = ''
  isRunning.value = true
  isFinished.value = false
  timeLeft.value = timeLimit.value

  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      finish()
    }
  }, 1000)
}

function submitAnswer() {
  if (!userAnswer.value) return

  const correct = getAnswer(problems.value[currentIndex.value]!)
  const userNum = parseInt(userAnswer.value)

  if (userNum === correct) {
    score.value++
  } else {
    wrongAnswers.value.push({
      problem: problems.value[currentIndex.value]!,
      userAnswer: userAnswer.value,
      correct
    })
  }

  userAnswer.value = ''
  currentIndex.value++

  if (currentIndex.value >= problems.value.length) {
    finish()
  }
}

function finish() {
  if (timer) clearInterval(timer)
  isRunning.value = false
  isFinished.value = true
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <ExerciseShell
    title="限时口算"
    icon="i-lucide-zap"
  >
    <template #settings>
      <div class="grid grid-cols-2 gap-4 max-w-xs">
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="10"
            :max="100"
            class="text-center"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">时间(秒)</label>
          <UInput
            v-model="timeLimit"
            type="number"
            :min="60"
            :max="600"
            class="text-center"
          />
        </div>
      </div>
      <UButton
        block
        size="lg"
        icon="i-lucide-zap"
        class="mt-5"
        :disabled="isRunning"
        @click="start"
      >
        开始挑战
      </UButton>
    </template>

    <tr>
      <td class="p-0">
        <!-- 未开始 -->
        <div
          v-if="!isRunning && !isFinished"
          class="text-center py-8"
        >
          <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <UIcon
              name="i-lucide-zap"
              class="w-7 h-7"
            />
          </div>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            限时口算挑战
          </h2>
          <p class="text-slate-600 dark:text-slate-400">
            在规定时间内完成尽可能多的口算题
          </p>
        </div>

        <!-- 进行中 -->
        <div
          v-else-if="isRunning"
          class="py-2"
        >
          <div class="flex justify-between items-center mb-8">
            <div class="text-lg">
              <span class="text-slate-500">进度：</span>
              <span class="font-bold text-slate-800 dark:text-slate-100">{{ currentIndex + 1 }} / {{ problems.length }}</span>
            </div>
            <div
              class="flex items-center gap-2 text-2xl font-mono font-bold"
              :class="timeLeft <= 30 ? 'text-red-500' : 'text-slate-800 dark:text-slate-100'"
            >
              <UIcon
                name="i-lucide-timer"
                class="w-6 h-6"
              />
              {{ formatTime(timeLeft) }}
            </div>
            <div class="text-lg">
              <span class="text-slate-500">得分：</span>
              <span class="font-bold text-green-500">{{ score }}</span>
            </div>
          </div>

          <div class="text-center mb-8">
            <div class="text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 mb-6">
              {{ problems[currentIndex] }} = ?
            </div>
            <input
              v-model="userAnswer"
              type="number"
              class="w-40 text-center text-3xl font-mono p-4 border-2 border-slate-300 rounded-xl focus:border-primary-500 focus:outline-none dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              autofocus
              @keyup.enter="submitAnswer"
            >
          </div>

          <div class="flex justify-center gap-4">
            <UButton
              size="lg"
              @click="submitAnswer"
            >
              确认 (Enter)
            </UButton>
            <UButton
              size="lg"
              variant="outline"
              color="neutral"
              @click="finish"
            >
              结束
            </UButton>
          </div>
        </div>

        <!-- 结束 -->
        <div
          v-else-if="isFinished"
          class="text-center py-4"
        >
          <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center">
            <UIcon
              name="i-lucide-party-popper"
              class="w-7 h-7"
            />
          </div>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            挑战完成！
          </h2>

          <div class="grid grid-cols-3 gap-4 my-8">
            <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div class="text-3xl font-bold text-green-500">
                {{ score }}
              </div>
              <div class="text-sm text-slate-500">
                正确
              </div>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <div class="text-3xl font-bold text-red-500">
                {{ wrongAnswers.length }}
              </div>
              <div class="text-sm text-slate-500">
                错误
              </div>
            </div>
            <div class="bg-primary-50 dark:bg-primary-500/10 rounded-xl p-4">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {{ Math.round(score / currentIndex * 100) || 0 }}%
              </div>
              <div class="text-sm text-slate-500">
                正确率
              </div>
            </div>
          </div>

          <div
            v-if="wrongAnswers.length > 0"
            class="text-left mb-6"
          >
            <h3 class="font-bold text-slate-700 dark:text-slate-300 mb-2">
              错题回顾：
            </h3>
            <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 max-h-48 overflow-y-auto">
              <div
                v-for="(w, i) in wrongAnswers"
                :key="i"
                class="flex justify-between py-1 text-sm"
              >
                <span class="font-mono">{{ w.problem }} = <span class="text-red-500 line-through">{{ w.userAnswer }}</span></span>
                <span class="text-green-500 font-bold">正确：{{ w.correct }}</span>
              </div>
            </div>
          </div>

          <UButton
            size="lg"
            icon="i-lucide-rotate-ccw"
            @click="start"
          >
            再来一次
          </UButton>
        </div>
      </td>
    </tr>
  </ExerciseShell>
</template>
