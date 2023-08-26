<template>
  <div class="app-container">
    <div class="code-txt">
      <h2 class="">Vue3 自定义Hook</h2>
      <p>主要用来处理复用代码逻辑的一些封装</p>
      <p>Vue3 hook <a href="https://vueuse.org/guide/">库Get Started | VueUse</a></p>
      <hr class="mt-5" />
      <div class="mt-5">
        <button @click="img2base64('#img1')">图片转为base64</button>
        <button v-if="img1Base64" class="ml-5" @click="img1Base64 = ''">清除</button>
        <img id="img1" src="../../assets//images/list/1.jpg" class="mt-5" />
        <div v-if="img1Base64" class="w-full max-h-96 overflow-auto break-all mt-5">
          base64: {{ img1Base64 }}
        </div>
      </div>
    </div>
    <div class="code-snap"></div>
  </div>
</template>

<script setup lang="ts">
import useBase64 from '@/hooks/useBase64'
const img1Base64 = ref('')
const img2base64 = async (selector: string) => {
  useBase64({ el: selector })
    .then(({ baseUrl }) => {
      img1Base64.value = baseUrl
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
