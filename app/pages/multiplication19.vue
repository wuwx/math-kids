<script setup lang="ts">
definePageMeta({ layout: 'exercise' })

const count = ref(30)
const minFactor = ref(2) // 最小因数，排除1
const maxFactor = ref(19)
const excludeSimple = ref(true) // 排除两个因数都小于10的情况
const problems = ref<{ a: number, b: number }[]>([])

function isSimple(a: number, b: number): boolean {
  // 两个因数都是一位数（2-9）视为简单
  return a < 10 && b < 10
}

function generate() {
  const result: { a: number, b: number }[] = []
  const used = new Set<string>()

  let attempts = 0
  const maxAttempts = count.value * 100

  while (result.length < count.value && attempts < maxAttempts) {
    attempts++

    const a = Math.floor(Math.random() * (maxFactor.value - minFactor.value + 1)) + minFactor.value
    const b = Math.floor(Math.random() * (maxFactor.value - minFactor.value + 1)) + minFactor.value

    // 排除简单的一位数乘法
    if (excludeSimple.value && isSimple(a, b)) {
      continue
    }

    // 标准化顺序避免重复（如 3×5 和 5×3）
    const key = a <= b ? `${a}×${b}` : `${b}×${a}`
    if (used.has(key)) {
      continue
    }

    used.add(key)
    // 随机决定顺序
    if (Math.random() > 0.5) {
      result.push({ a, b })
    } else {
      result.push({ a: b, b: a })
    }
  }

  problems.value = result
}

// 监听参数变化自动重新生成
watch([count, minFactor, maxFactor, excludeSimple], () => {
  generate()
})

// 初始化
onMounted(() => {
  generate()
})
</script>

<template>
  <ExerciseShell
    title="19×19 乘法练习"
    icon="i-lucide-grid-3x3"
  >
    <template #settings>
      <!-- 说明 -->
      <div class="mb-5 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
        <div class="text-sm text-primary-600 dark:text-primary-400">
          练习 19×19 以内的乘法，默认排除两个因数都小于10的简单题目（如 3×5），专注练习较难的组合。
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- 题目数量 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">题目数量</label>
          <UInput
            v-model="count"
            type="number"
            :min="1"
            :max="200"
            class="text-center"
          />
        </div>
        <!-- 最小因数 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">最小因数</label>
          <UInput
            v-model="minFactor"
            type="number"
            :min="2"
            :max="19"
            class="text-center"
          />
        </div>
        <!-- 最大因数 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">最大因数</label>
          <UInput
            v-model="maxFactor"
            type="number"
            :min="2"
            :max="19"
            class="text-center"
          />
        </div>
        <!-- 排除简单题 -->
        <div>
          <label class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">难度设置</label>
          <UButton
            block
            :color="excludeSimple ? 'primary' : 'neutral'"
            :variant="excludeSimple ? 'solid' : 'outline'"
            @click="excludeSimple = !excludeSimple"
          >
            {{ excludeSimple ? '已排除简单题' : '包含所有题目' }}
          </UButton>
        </div>
      </div>

      <!-- 重新生成按钮 -->
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

    <tr v-if="problems.length === 0">
      <td
        colspan="3"
        class="text-center py-16"
      >
        <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <UIcon
            name="i-lucide-circle-help"
            class="w-7 h-7 text-slate-400"
          />
        </div>
        <div class="text-slate-500 dark:text-slate-400 text-lg">
          没有生成题目
        </div>
      </td>
    </tr>
    <template v-else>
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
            class="problem-item flex items-center gap-2"
          >
            <span class="text-lg font-mono tracking-wide text-slate-800 dark:text-gray-100">
              {{ problems[rowIndex * 3 + colIndex - 1].a }} × {{ problems[rowIndex * 3 + colIndex - 1].b }} =
            </span>
            <span class="flex-1 border-b border-dashed border-slate-300 dark:border-slate-600 ml-2" />
          </div>
        </td>
      </tr>
    </template>
  </ExerciseShell>
</template>
