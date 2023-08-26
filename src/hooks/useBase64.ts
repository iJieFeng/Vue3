// 定义参数 options 的类型 { el: string } 为对象类型，el 为字符串类型(元素选择器)
type options = {
  el: string
}
/**
 * @description: 图片转为base64
 * @param options:{ el: string } 选择器
 */
export default function useBase64(options: options): Promise<{ baseUrl: string }> {
  // 定义回调函数 changeBase64 接受参数 el: HTMLImageElement 类型
  const changeBase64 = (el: HTMLImageElement) => {
    // 利用canvas 将图片转换为 base64
    // createElement('canvas') 创建 canvas 元素
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    // getContext('2d') 获取 canvas 2d 上下文
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // 设置 canvas 宽高 为图片宽高
    canvas.width = el.width
    canvas.height = el.height
    // drawImage() 将图片绘制到 canvas 上 0, 0 为图片绘制的起始坐标 0, 0 为图片绘制的宽高
    ctx.drawImage(el, 0, 0, el.width, el.height)
    // toDataURL() 将 canvas 转换为 base64 格式 传入图片格式 默认为 image/png
    return canvas.toDataURL('image/png')
  }
  return new Promise((resolve, reject) => {
    // 通过传入的选择器options.el 使用querySelector获取图片元素 断言为 HTMLImageElement 类型
    const img: HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
    console.log('img: HTMLImageElement===>', img.src, img.width, img.height)
    // 判断是否转换成功
    const base64 = changeBase64(img)
    console.log('base64===>', base64)
    if (!base64) {
      return reject({ baseUrl: '图片转换失败' })
    }
    resolve({ baseUrl: base64 })
  })
}
