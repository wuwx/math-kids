<script setup lang="ts">
const exercises = [
  {
    name: '三位数加减法',
    description: '100-999 范围内的加减法练习',
    route: '/calculation',
    icon: 'i-lucide-plus'
  },
  {
    name: '进位借位练习',
    description: '带进位的加法和借位的减法',
    route: '/calculation1',
    icon: 'i-lucide-calculator'
  },
  {
    name: '乘除法练习',
    description: '两位数乘除一位数',
    route: '/calculation2',
    icon: 'i-lucide-x'
  },
  {
    name: '三数连算',
    description: '三个三位数的连续加减运算',
    route: '/calculation3',
    icon: 'i-lucide-sigma'
  },
  {
    name: '三数连算 II',
    description: '三个三位数的连续加减运算',
    route: '/calculation4',
    icon: 'i-lucide-repeat'
  },
  {
    name: '综合练习',
    description: '加减乘混合运算',
    route: '/calculation5',
    icon: 'i-lucide-target'
  },
  {
    name: '19×19 乘法',
    description: '19以内乘法练习，排除简单一位数乘法',
    route: '/multiplication19',
    icon: 'i-lucide-grid-3x3'
  },
  {
    name: '带余数除法',
    description: '练习有余数的除法运算',
    route: '/division-remainder',
    icon: 'i-lucide-divide'
  },
  {
    name: '小数加减法',
    description: '小数点对齐的加减运算',
    route: '/decimal',
    icon: 'i-lucide-percent'
  },
  {
    name: '分数加减法',
    description: '同分母分数的加减运算',
    route: '/fraction',
    icon: 'i-lucide-slice'
  },
  {
    name: '时间计算',
    description: '计算时间间隔，跨整点练习',
    route: '/time-calc',
    icon: 'i-lucide-clock'
  },
  {
    name: '人民币换算',
    description: '元角分换算和找零练习',
    route: '/money',
    icon: 'i-lucide-coins'
  },
  {
    name: '单位换算',
    description: '长度和重量单位换算',
    route: '/unit-convert',
    icon: 'i-lucide-ruler'
  },
  {
    name: '填空算式',
    description: '逆向思维，求未知数',
    route: '/fill-blank',
    icon: 'i-lucide-square'
  },
  {
    name: '比大小',
    description: '比较两个算式的大小',
    route: '/compare',
    icon: 'i-lucide-scale'
  },
  {
    name: '找规律填数',
    description: '数列规律，培养数感',
    route: '/number-pattern',
    icon: 'i-lucide-list-ordered'
  },
  {
    name: '限时口算',
    description: '计时挑战，训练速度',
    route: '/speed-calc',
    icon: 'i-lucide-zap'
  },
  {
    name: '连续进位/借位',
    description: '专项强化进位借位',
    route: '/carry-practice',
    icon: 'i-lucide-arrow-up-down'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- 顶部导航 -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <span class="text-white text-lg font-bold">M</span>
          </div>
          <span class="text-xl font-semibold text-gray-800 dark:text-gray-100">数学练习</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 dark:text-gray-400">小学生专属</span>
          <UColorModeButton />
        </div>
      </div>
    </header>

    <!-- Hero 区域 -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-6 py-16 text-center">
        <UBadge
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-6"
        >
          <UIcon
            name="i-lucide-check-circle"
            class="w-4 h-4 mr-1"
          />
          免费使用 · 无需注册
        </UBadge>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          让数学练习变得简单
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          自动生成加减乘除练习题，支持自定义难度，一键打印，帮助孩子轻松提升计算能力
        </p>
        <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-check"
              class="w-5 h-5 text-green-500"
            />
            自动出题
          </div>
          <div class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-check"
              class="w-5 h-5 text-green-500"
            />
            支持打印
          </div>
          <div class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-check"
              class="w-5 h-5 text-green-500"
            />
            自定义难度
          </div>
        </div>
      </div>
    </div>

    <!-- 练习卡片区域 -->
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
          选择练习类型
        </h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">共 {{ exercises.length }} 种练习</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="exercise in exercises"
          :key="exercise.route"
          :to="exercise.route"
          class="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-100 dark:hover:shadow-primary-900/20 transition-all duration-200"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 rounded-xl flex items-center justify-center transition-colors">
              <UIcon
                :name="exercise.icon"
                class="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
              />
            </div>
            <UIcon
              name="i-lucide-chevron-right"
              class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
            />
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {{ exercise.name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ exercise.description }}
          </p>
        </NuxtLink>
      </div>
    </div>

    <!-- 底部 -->
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xs font-bold">M</span>
            </div>
            <span>小学数学练习</span>
          </div>
          <div>专为小学生设计的数学练习工具</div>
        </div>
      </div>
    </footer>
  </div>
</template>
