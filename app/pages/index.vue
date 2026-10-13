<script setup lang="ts">
interface Exercise {
  name: string
  description: string
  route: string
  icon: string
}

interface Category {
  id: string
  label: string
  icon: string
  exercises: Exercise[]
}

const categories: Category[] = [
  {
    id: 'basic',
    label: '基础运算',
    icon: 'i-lucide-plus',
    exercises: [
      { name: '三位数加减法', description: '100-999 范围内的加减法练习', route: '/calculation', icon: 'i-lucide-plus' },
      { name: '进位借位练习', description: '带进位的加法和借位的减法', route: '/calculation1', icon: 'i-lucide-calculator' },
      { name: '乘除法练习', description: '两位数乘除一位数', route: '/calculation2', icon: 'i-lucide-x' },
      { name: '三数连算', description: '三个三位数的连续加减运算', route: '/calculation3', icon: 'i-lucide-sigma' },
      { name: '三数连算 II', description: '三个三位数的连续加减运算', route: '/calculation4', icon: 'i-lucide-repeat' },
      { name: '综合练习', description: '加减乘混合运算', route: '/calculation5', icon: 'i-lucide-target' },
      { name: '19×19 乘法', description: '19以内乘法练习，排除简单一位数乘法', route: '/multiplication19', icon: 'i-lucide-grid-3x3' },
      { name: '带余数除法', description: '练习有余数的除法运算', route: '/division-remainder', icon: 'i-lucide-divide' },
      { name: '竖式计算', description: '用竖式计算加减乘除', route: '/vertical-calc', icon: 'i-lucide-align-vertical-justify-center' },
      { name: '估算练习', description: '估计结果，取整到十位或百位', route: '/estimate', icon: 'i-lucide-target' },
      { name: '凑整练习', description: '凑成整十、整百', route: '/round-number', icon: 'i-lucide-circle-dot' },
      { name: '连续进位/借位', description: '专项强化进位借位', route: '/carry-practice', icon: 'i-lucide-arrow-up-down' }
    ]
  },
  {
    id: 'decimal-fraction',
    label: '小数分数',
    icon: 'i-lucide-percent',
    exercises: [
      { name: '小数加减法', description: '小数点对齐的加减运算', route: '/decimal', icon: 'i-lucide-percent' },
      { name: '分数加减法', description: '同分母分数的加减运算', route: '/fraction', icon: 'i-lucide-slice' }
    ]
  },
  {
    id: 'number',
    label: '数的认识',
    icon: 'i-lucide-hash',
    exercises: [
      { name: '数位练习', description: '认识个、十、百、千位', route: '/place-value', icon: 'i-lucide-hash' },
      { name: '奇偶数判断', description: '判断奇偶数及运算规律', route: '/odd-even', icon: 'i-lucide-toggle-left' },
      { name: '因数与倍数', description: '找因数、倍数、公因数、公倍数', route: '/factor-multiple', icon: 'i-lucide-link' }
    ]
  },
  {
    id: 'unit',
    label: '单位换算',
    icon: 'i-lucide-ruler',
    exercises: [
      { name: '时间计算', description: '计算时间间隔，跨整点练习', route: '/time-calc', icon: 'i-lucide-clock' },
      { name: '人民币换算', description: '元角分换算和找零练习', route: '/money', icon: 'i-lucide-coins' },
      { name: '单位换算', description: '长度和重量单位换算', route: '/unit-convert', icon: 'i-lucide-ruler' }
    ]
  },
  {
    id: 'geometry',
    label: '图形几何',
    icon: 'i-lucide-square',
    exercises: [
      { name: '周长计算', description: '正方形、长方形周长', route: '/perimeter', icon: 'i-lucide-square' },
      { name: '面积计算', description: '正方形、长方形面积', route: '/area', icon: 'i-lucide-box' },
      { name: '图形计数', description: '数三角形、正方形个数', route: '/count-shapes', icon: 'i-lucide-shapes' }
    ]
  },
  {
    id: 'logic',
    label: '逻辑思维',
    icon: 'i-lucide-puzzle',
    exercises: [
      { name: '填空算式', description: '逆向思维，求未知数', route: '/fill-blank', icon: 'i-lucide-square-asterisk' },
      { name: '比大小', description: '比较两个算式的大小', route: '/compare', icon: 'i-lucide-scale' },
      { name: '找规律填数', description: '数列规律，培养数感', route: '/number-pattern', icon: 'i-lucide-list-ordered' },
      { name: '24点游戏', description: '四个数凑24，训练思维', route: '/game24', icon: 'i-lucide-dices' },
      { name: '数独 4×4', description: '简化版数独，逻辑训练', route: '/sudoku', icon: 'i-lucide-grid-2x2' },
      { name: '火柴棒游戏', description: '移动火柴使等式成立', route: '/matchstick', icon: 'i-lucide-flame' }
    ]
  },
  {
    id: 'word-problem',
    label: '应用题',
    icon: 'i-lucide-book-open',
    exercises: [
      { name: '应用题', description: '购物、分配等场景文字题', route: '/word-problem', icon: 'i-lucide-book-open' },
      { name: '行程问题', description: '速度×时间=路程', route: '/speed-distance', icon: 'i-lucide-car' },
      { name: '植树问题', description: '间隔数与棵数的关系', route: '/tree-planting', icon: 'i-lucide-tree-pine' },
      { name: '鸡兔同笼', description: '经典问题，锻炼逻辑', route: '/chicken-rabbit', icon: 'i-lucide-rabbit' }
    ]
  },
  {
    id: 'speed',
    label: '速度训练',
    icon: 'i-lucide-zap',
    exercises: [
      { name: '限时口算', description: '计时挑战，训练速度', route: '/speed-calc', icon: 'i-lucide-zap' }
    ]
  }
]

const totalExercises = categories.reduce((sum, category) => sum + category.exercises.length, 0)

const features = [
  { label: '自动出题', icon: 'i-lucide-refresh-cw' },
  { label: '一键打印', icon: 'i-lucide-printer' },
  { label: '自定义难度', icon: 'i-lucide-sliders-horizontal' }
]
</script>

<template>
  <div class="min-h-screen bg-surface dark:bg-slate-950">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800 bg-surface/80 dark:bg-slate-950/80 backdrop-blur">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <div class="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="font-display text-white text-base leading-none">数</span>
          </div>
          <span class="text-lg font-semibold text-slate-800 dark:text-slate-100">数学练习</span>
        </NuxtLink>
        <div class="flex items-center gap-4">
          <span class="hidden md:inline text-sm text-slate-500 dark:text-slate-400">为小学生设计的数学练习工具</span>
          <UColorModeButton />
        </div>
      </div>
    </header>

    <!-- Hero 区域 -->
    <section class="relative border-b border-slate-200/70 dark:border-slate-800 overflow-hidden">
      <div class="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <div class="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
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
        <h1 class="font-display text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white leading-[1.2] mb-5">
          让数学练习，变得<span class="text-primary-600 dark:text-primary-400">简单而规律</span>
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          自动生成加减乘除练习题，支持自定义难度，一键打印，帮助孩子轻松提升计算能力
        </p>

        <div class="flex items-center justify-center gap-6 mb-10">
          <div
            v-for="feature in features"
            :key="feature.label"
            class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
          >
            <UIcon
              :name="feature.icon"
              class="w-4 h-4 text-primary-600 dark:text-primary-400"
            />
            {{ feature.label }}
          </div>
        </div>

        <div class="flex items-center justify-center divide-x divide-slate-200 dark:divide-slate-800">
          <div class="px-8 text-center">
            <div class="font-display text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
              {{ totalExercises }}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              种练习类型
            </div>
          </div>
          <div class="px-8 text-center">
            <div class="font-display text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
              {{ categories.length }}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              大分类
            </div>
          </div>
          <div class="px-8 text-center">
            <div class="font-display text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
              100%
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              免费使用
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类导航 -->
    <nav class="sticky top-16 z-30 border-b border-slate-200/70 dark:border-slate-800 bg-surface/85 dark:bg-slate-950/85 backdrop-blur">
      <div class="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto py-2">
        <a
          v-for="category in categories"
          :key="category.id"
          :href="`#${category.id}`"
          class="shrink-0 px-3 py-1.5 rounded-full text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >{{ category.label }}</a>
      </div>
    </nav>

    <!-- 练习卡片区域 -->
    <main class="max-w-6xl mx-auto px-6 py-12">
      <section
        v-for="category in categories"
        :id="category.id"
        :key="category.id"
        class="scroll-mt-36 mb-14 last:mb-0"
      >
        <div class="flex items-center gap-3 mb-5">
          <div class="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
            <UIcon
              :name="category.icon"
              class="w-4.5 h-4.5"
            />
          </div>
          <h2 class="font-display text-xl font-semibold text-slate-900 dark:text-white">
            {{ category.label }}
          </h2>
          <span class="text-xs text-slate-400 font-mono tabular-nums">{{ category.exercises.length }} 项</span>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="exercise in category.exercises"
            :key="exercise.route"
            :to="exercise.route"
            class="group flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md hover:shadow-slate-200/60 dark:hover:shadow-none"
          >
            <div class="flex items-center justify-between mb-1">
              <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 flex items-center justify-center transition-colors">
                <UIcon
                  :name="exercise.icon"
                  class="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                />
              </div>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors"
              />
            </div>
            <h3 class="text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ exercise.name }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ exercise.description }}
            </p>
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- 底部 -->
    <footer class="border-t border-slate-200/70 dark:border-slate-800">
      <div class="max-w-6xl mx-auto px-6 py-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div class="flex items-center gap-2.5">
            <div class="w-6 h-6 bg-primary-600 rounded-md flex items-center justify-center">
              <span class="font-display text-white text-[11px] leading-none">数</span>
            </div>
            <span class="font-medium text-slate-700 dark:text-slate-300">小学数学练习</span>
          </div>
          <p>每天十分钟，计算更轻松</p>
          <p class="text-slate-400 dark:text-slate-500">
            免费使用 · 无需注册
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.grid-paper {
  background-image:
    linear-gradient(to right, rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
}

.dark .grid-paper {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}
</style>
