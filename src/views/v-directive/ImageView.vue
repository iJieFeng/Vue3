<!-- 图片懒加载 -->
<template>
  <!-- 本地资源 -->
  <div v-for="img in list" :key="img" class="mb-5 bg-gray-100 text-center">
    <img v-lazy="img" />
  </div>
  <!-- 网络资源 -->
  <div v-for="idx in 10" :key="idx" class="mb-5 bg-gray-100 text-center">
    <img v-lazy="$imgUrl + '/img/default_cover_' + idx + '.png'" />
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'

// 批量引入本地图片 glob 与 globEager
// glob 是懒加载模式
// let modules = {
//   'xxxx': () => import('xxx')
// }

// globEager 是静态加载
// import xxx from 'xxx'

const imageList: Record<string, { default: string }> = import.meta.glob(
  '/src/assets/images/list/*',
  {
    eager: true
  }
)
const list = Object.values(imageList).map((i) => i.default)

/* 自定义图片懒加载指令  */
const vLazy: Directive<HTMLImageElement, string> = async (el, bindding) => {
  // 获取默认图
  const defaultImg = await import('/src/assets/images/loading.gif')
  const errorImg = await import('/src/assets/images/error.webp')
  el.src = defaultImg.default
  const observer = new IntersectionObserver((entries) => {
    // intersectionRatio 元素在可视区域的比例
    if (entries[0].intersectionRatio > 0) {
      observer.unobserve(el)
      const img = new Image()
      img.src = bindding.value
      img.onload = () => {
        el.src = bindding.value
      }
      img.onerror = () => {
        el.src = errorImg.default
      }
    }
  })
  observer.observe(el)
}

</script>
