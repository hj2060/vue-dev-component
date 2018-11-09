// 导入颜色选择器组件
import menu from './menu'
import icon from './icon'

// 存储组件列表
const components = [
  menu,
  icon
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  menu,
  icon
}