<script setup lang="ts">
import {
  Sandpack,
  type SandpackFiles,
  type SandpackPredefinedTemplate
} from 'sandpack-vue3'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    attrs: string
    template?: SandpackPredefinedTemplate
    readOnly?: boolean
    closableTabs?: boolean
  }>(),
  { template: 'vue3' }
)

const parsedAttrs = computed(() => JSON.parse(decodeURIComponent(props.attrs)))
const el = ref<HTMLElement | null>(null)
const files = ref<SandpackFiles | null>(null)
const { isDark } = useData()

const getDefaultFileName = () => {
  let defaultFilePath = '/src/index.js'
  switch (props.template) {
    case 'vanilla-ts':
      defaultFilePath = '/src/index.ts'
      break
    case 'angular':
      defaultFilePath = '/src/app/app.component.ts'
      break
    case 'react':
      defaultFilePath = '/App.js'
      break
    case 'react-ts':
      defaultFilePath = '/App.tsx'
      break
    case 'vue':
      defaultFilePath = '/src/App.vue'
      break
    case 'vue3':
      defaultFilePath = '/src/App.vue'
      break
    case 'svelte':
      defaultFilePath = '/index.js'
      break
    case 'solid':
      defaultFilePath = '/App.tsx'
      break
    default:
      break
  }
  return defaultFilePath
}

const getFileAttributes = (className = '') => {
  let path: string | undefined
  const attrs = className.split(' ')
  const hidden = attrs.includes('[hidden]')
  const readOnly = attrs.includes('[readonly]') || attrs.includes('[readOnly]')
  const active = attrs.includes('[active]')
  const filename = attrs.find((v) => v.includes('.'))
  if (filename) {
    path = filename
    path = path === 'App.vue' ? getDefaultFileName() : path
    path = path.startsWith('/') ? path : `/${path}`
  }
  return { hidden, active, readOnly, path }
}

onMounted(() => {
  const items = {}

  el.value?.querySelectorAll('pre').forEach((e, key) => {
    const { active, hidden, readOnly, path } = getFileAttributes(
      parsedAttrs.value[key]
    )

    const filename = path || getDefaultFileName()
    items[filename] = { code: e.innerText, active, hidden, readOnly }
  })

  files.value = items
})
</script>

<template>
  <div class="hidden" ref="el">
    <slot />
  </div>

  <Sandpack
    v-if="files"
    :theme="isDark ? 'dark' : 'light'"
    :template="template"
    :files="files"
    :rtl="true"
    :options="{
      showConsoleButton: true,
      showLineNumbers: true,
      showTabs: true,
      closableTabs,
      readOnly
    }"
    :custom-setup="{
      dependencies: {
        'animate.css': '~4.1.1',
        'vue3-toastify': 'latest',
        pinia: '^2.0.22'
      }
    }"
  />
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
