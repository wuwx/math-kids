/**
 * 将设置项输入转换为正整数。
 * UInput 绑定的可能是字符串（如输入框被清空时为 ''），
 * 无效或小于 1 时返回 0，调用方应跳过本次生成。
 */
export function toCount(value: string | number): number {
  const n = Math.floor(Number(value))
  return Number.isFinite(n) && n >= 1 ? n : 0
}
