import container from 'markdown-it-container'
import type { RenderRule } from 'markdown-it/lib/renderer'
import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(container, 'sandbox', {
        render(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const attrs: string[] = []
            for (
              let i = idx + 1;
              !(
                tokens[i].nesting === -1 &&
                tokens[i].type === 'container_sandbox_close'
              );
              ++i
            ) {
              if (tokens[i].type === 'fence' && tokens[i].tag === 'code') {
                attrs.push(tokens[i].info)
              }
            }
            return `<SandBox attrs="${encodeURIComponent(
              JSON.stringify(attrs)
            )}" ${tokens[idx].attrs
              ?.map(([key, val]) => (val ? `${key}="${val}"` : key))
              .join(' ')}>`
          }
          return '</SandBox>'
        }
      } satisfies { render: RenderRule })
    }
  }
})
