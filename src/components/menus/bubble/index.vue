<template>
  <bubble-menu v-show="!editor?.view?.painter?.enabled && !editor?.isEmpty" class="umo-editor-bubble-menu"
    :class="{ assistant }" :editor="editor!" :tippy-options="tippyOpitons">
    <menus-bubble-menus v-if="options?.document?.enableBubbleMenu && !assistant">
      <template #bubble_menu="props">
        <slot name="bubble_menu" v-bind="props" />
      </template>
    </menus-bubble-menus>
    <ai-assistant-input v-if="options?.ai?.assistant?.enabled && assistant" />
  </bubble-menu>
</template>

<script setup lang="ts">
import { BubbleMenu } from '@tiptap/vue-3'
import type { Instance } from 'tippy.js'

const editor = inject('editor')
const assistant = inject('assistant')
const options = inject('options')

// 气泡菜单
let tippyInstance = $ref<Instance | null>(null)
const tippyOpitons = $ref<Partial<Instance>>({
  appendTo: (reference: any) => {
    return reference.closest('.editor-container') || document.body;
  },
  maxWidth: 580,
  placement: 'top', // 菜单显示在文本上方
  offset: [0, 20], // 向上偏移10px
  interactive: true,
  onShow(instance: Instance) {
    tippyInstance = instance
  },
  onHide() {
    assistant.value = false
  },
  onDestroy() {
    tippyInstance = null
  },
})

// AI 助手
watch(
  () => [assistant.value],
  (visible: any[]) => {
    tippyInstance?.setProps({
      placement: visible.includes(true) ? 'bottom' : 'top',
    })
  },
)
</script>

<style lang="less">
.umo-editor-bubble-menu {
  border-radius: var(--umo-radius);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:not(.assistant) {
    padding: 8px 10px;
    box-shadow: var(--umo-shadow);
    border: 1px solid var(--umo-border-color);
    background-color: var(--umo-color-white);
  }

  &:empty {
    display: none;
  }

  .umo-menu-button.show-text .umo-button-content .umo-button-text {
    display: none !important;
  }

  .umo-menu-button.huge {
    height: var(--td-comp-size-xs);
    min-width: unset;

    .umo-button-content {
      min-width: unset !important;

      .umo-icon {
        font-size: 16px;
        margin-top: 0;
      }
    }
  }
}
</style>
