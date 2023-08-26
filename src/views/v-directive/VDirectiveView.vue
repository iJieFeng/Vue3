<template>
  <div class="app-container">
    <div class="code-txt">
      <h2>Vue3指令的钩子函数</h2>
      <ul class="list-disc list-inside">
        <li>created 元素初始化的时候</li>
        <li>beforeMount 指令绑定到元素后调用 只调用一次</li>
        <li>mounted 元素插入父级dom调用</li>
        <li>beforeUpdate 元素被更新之前调用</li>
        <li>update 这个周期方法被移除 改用updated</li>
        <li>beforeUnmount 在元素被移除前调用</li>
        <li>unmounted 指令被移除后调用 只调用一次</li>
      </ul>
      <p>Vue2 指令 bind inserted update componentUpdated unbind</p>

      <h2 class="mt-5">生命周期钩子参数详解</h2>
      <p>第一个 el 当前绑定的DOM 元素</p>
      <p>第二个 binding</p>
      <ul class="list-disc list-inside">
        <li>instance：使用指令的组件实例。</li>
        <li>value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。</li>
        <li>oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否有更改都可用。</li>
        <li>arg：传递给指令的参数(如果有的话)。例如在 v-my-directive:foo 中，arg 为 "foo"。</li>
        <li>
          modifiers：包含修饰符(如果有的话) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为
          {foo: true，bar: true}。
        </li>
        <li>dir：一个对象，在注册指令时作为参数传递</li>
      </ul>
      <p>第三个 当前元素的虚拟DOM 也就是Vnode</p>
      <p>第四个 prevNode 上一个虚拟节点，仅在 beforeUpdate 和 updated 钩子中可用</p>
      <hr class="my-5" />
      <h3 class="mb-2">Vue3指令的钩子函数</h3>
      <button @click="flag = !flag">切换</button>
      <A v-if="flag" v-move:aaa.mod="{ background: '#faa', flag: flag }" />
      <hr class="my-5" />

      <h3 class="mb-2">案例：自定义指定判断按钮权限</h3>
      <button class="mr-5" v-permission="'shop:create'">创建</button>
      <button class="mr-5" v-permission="'shop:edit'">编辑</button>
      <button class="mr-5" v-permission="'shop:delete'">删除</button>
      <hr class="my-5" />

      <h3 class="mb-2">案例：指令拖拽</h3>
      <button @click="showMove = !showMove" class="mb-5">
        {{ !showMove ? '展示拖拽弹窗' : '关闭拖拽弹窗' }}
      </button>
      <MoveDialog v-model="showMove" />

      <hr class="my-5" />
      <h3 class="mb-2">案例：自定义指令实现图片懒加载</h3>
      <ImageView />

    </div>

    <div class="code-snap">
      <img v-lazy="$imgUrl + '/vue3/v-directive-1.png'" />
      <img v-lazy="$imgUrl + '/vue3/v-directive-2.png'" />
      <img v-lazy="$imgUrl + '/vue3/v-directive-3.1.png'" />
      <img v-lazy="$imgUrl + '/vue3/v-directive-4.png'" />
      <img v-lazy="$imgUrl + '/vue3/v-directive-5.png'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import A from './AView.vue'
import MoveDialog from './MoveDialog.vue'
import ImageView from './ImageView.vue';
import { type Directive, type DirectiveBinding } from 'vue'
type Dir = {
  background: string
}
const flag = ref<boolean>(true)
const vMove: Directive = {
  /* mounted(...args:Array<any>) {
    console.log('mounted===>', args)
  } */
  mounted(el: HTMLElement, dir: DirectiveBinding<Dir>) {
    console.log('mounted===>', el, dir)
    el.style.background = dir.value.background
  },
  updated() {
    console.log('updated===>')
  },
  unmounted() {
    console.log('unmounted===>')
  }
}

/* 案例：自定义指定判断按钮权限 */
// mock用户登录后的用户名
const username = 'xiaoli'
// mock后台返回的权限数据
const premission = ['xiaoli:shop:create', 'xiaoli:shop:edit', 'xiaoli:shop:delete']
// 自定义指令控制显示
const vPermission: Directive<HTMLElement, string> = {
  mounted(el, dir) {
    const premissionName = dir.value
    if (!premission.includes(`${username}:${premissionName}`)) {
      el.style.display = 'none'
    }
  }
}

const showMove = ref<boolean>(false)
</script>

<style scoped></style>
