import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import SandBox from '../../components/SandBox.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: any) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('SandBox', SandBox)
  }
}
