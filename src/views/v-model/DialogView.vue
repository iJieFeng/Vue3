<template>
  <div v-if="modelValue" class="border p-5">
    <h3>我是子组件 dialog</h3>
    <div>内容：<input id="txt" type="text" :value="textValue" @input="onInput" /></div>
    <button class="mt-5" @click="close">关闭</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  textValue: string
  textValueModifiers?: {
    mod: boolean
  }
}>()

const emit = defineEmits(['update:modelValue', 'update:textValue'])

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const modifiers = props.textValueModifiers
  // 自定义修饰符  modifiers?.mod
  emit('update:textValue', modifiers?.mod ? target.value + 'mod' : target.value)
}

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped></style>
