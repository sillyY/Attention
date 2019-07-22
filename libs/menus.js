import { Menu } from 'electron'

const dockMenu = Menu.buildFromTemplate([
  {
    label: '备忘录',
    submenu: [
      {
        label: '新增',
        click() {
          console.log('新增备忘录')
        }
      },
      {
        label: '查看',
        click() {
          console.log('查看备忘录')
        }
      }
    ]
  },
  {
    label: '检测更新',
    click() {
      console.log('New Window')
    }
  },
  {
    label: '设置',
    click() {
      console.log('设置')
    }
  }
])


export default {
  dockMenu
}
