import { fabric } from 'fabric'
// 初始化控件
// TODO 需要根据不同的元素类型，定制不同的控件功能以及显示
export function initFabricControlCustomStyle() {
  // 修改控件颜色
  fabric.Object.prototype.set({
    borderColor: '#fff', // 控制边框颜色
    cornerColor: '#fff', // 控制控件颜色
    cornerStrokeColor: '#fff', // 控制控件边框颜色
    cornerSize: 10, // 控制控件大小
    cornerStyle: 'circle', // 控制控件形状
    transparentCorners: false // 控制控件是否透明
  })
}
