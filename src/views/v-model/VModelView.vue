<template>
  <div class="app-container">
    <div class="code-txt">
      <h2 class="">v-model 其实是一个语法糖 通过props 和 emit组合而成的</h2>
      <ul class="list-disc list-inside">
        <li>prop：value -> modelValue；</li>
        <li>事件：input -> update:modelValue；</li>
        <li>v-bind 的 .sync 修饰符和组件的 model 选项已移除</li>
        <li>新增 支持多个v-model</li>
        <li>新增 支持自定义 修饰符 Modifiers</li>
      </ul>
      <hr class="mt-5" />
      <div class="mt-5">
        <h3>自定义组件使用v-model</h3>
        <div>我是父组件 views</div>
        <div>
          是否展示弹窗: {{ showDialog }}
          <button @click="showDialog = !showDialog">开关</button>
        </div>
        <div>输入框内容：{{ textValue }}</div>
        <hr class="my-5" />
        <DialogView v-model="showDialog" v-model:textValue.mod="textValue" />
      </div>
    </div>

    <div class="code-snap">
      <img :src="$imgUrl + '/vue3/v-model-view.png'" alt="" />
      <img :src="$imgUrl + '/vue3/v-model-dailog-view.png'" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DialogView from './DialogView.vue'
const showDialog = ref<boolean>(true)
const textValue = ref<string>('hello world')
</script>

<style scoped></style>
