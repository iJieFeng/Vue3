<template>
  <div v-if="modelValue" class="w-96 border-2 border-black" v-move>
    <div class="h-10 bg-black text-right px-2">
      <span class="iconfont icon-guanbi text-white" @click="close"></span>
    </div>
    <div class="h-60">内容</div>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'

defineProps<{ modelValue: boolean }>()
const emits = defineEmits(['update:modelValue'])
const close = () => {
  emits('update:modelValue', false)
}
/* 自定义指令实现拖拽 */
const vMove: Directive<any, void> = (el: HTMLElement) => {
  // 获取需要移动的元素
  // const moveElement: HTMLDivElement = el.firstElementChild as HTMLDivElement
  const mouseDown = (e: MouseEvent) => {
    el.style.cursor = 'move'
    // 2.1-获取鼠标按下的位置
    //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
    let X = e.clientX - el.offsetLeft
    let Y = e.clientY - el.offsetTop
    const move = (e: MouseEvent) => {
      // 2.2-设置元素的位置
      el.style.position = 'absolute'
      el.style.left = e.clientX - X + 'px'
      el.style.top = e.clientY - Y + 'px'
    }
    // 2.鼠标按下后监听鼠标移动事件
    document.addEventListener('mousemove', move)
    // 3.鼠标按回弹移除监听
    document.addEventListener('mouseup', () => {
      el.style.cursor = 'default'
      document.removeEventListener('mousemove', move)
    })
  }
  // 1.监听鼠标按下事件
  el.addEventListener('mousedown', mouseDown)
}
</script>
