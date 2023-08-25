/// <reference types="vite/client" />
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $imgUrl: string
  }
}
export {}