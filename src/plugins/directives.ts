import type { Directive } from 'vue'
import { type App } from 'vue'

/* 自定义图片懒加载指令  */
const lazy: Directive<HTMLImageElement, string> = async (el, bindding) => {
  // 获取默认图
  const defaultImg = await import('/src/assets/images/loading.gif')
  const errorImg = await import('/src/assets/images/error.webp')
  el.src = defaultImg.default
  const observer = new IntersectionObserver((entries) => {
    // intersectionRatio 元素在可视区域的比例
    if (entries[0].intersectionRatio > 0) {
      const img = new Image()
      img.src = bindding.value
      // 图片加载成功
      img.onload = () => {
        el.src = bindding.value
        observer.unobserve(el)
      }
      // 图片加载失败
      img.onerror = () => {
        el.src = errorImg.default
        observer.unobserve(el)
      }
    }
  })
  observer.observe(el)
}

const directives: any = {
  lazy
}

export default {
  install(app: App<Element>) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}
