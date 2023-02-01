# Sandpack Demo with SSG

<br />

::: sandbox {template=vue3-ts readOnly}

```vue App.vue
<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'

const notify = () => {
  toast('Wow so easy !', {
    autoClose: 1000
  }) // ToastOptions
}
</script>
```

```js /src/main.js [active]
import App from './App.vue'
import { createApp } from 'vue'
import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
  .use(Vue3Toasity, {
    autoClose: 3000
  })
  .mount('#app')
```

:::
