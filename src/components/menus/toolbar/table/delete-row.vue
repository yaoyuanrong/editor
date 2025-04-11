<template>
  <menus-button ico="table-delete-row" :text="t('table.deleteRow.text')" :hide-text="$toolbar.mode === 'classic'"
    :disabled="!editor?.can().deleteRow()" @menu-click="deleteRow" />
</template>

<script setup lang="ts">
import { findParentNode } from '@tiptap/core'
const container = inject('container')
const editor = inject('editor')
const options = inject('options')
const $toolbar = useState('toolbar', options)

const deleteRow = () => {
  const before = editor.value.getHTML()
  editor.value?.chain().deleteRow().run()
  const after = editor.value.getHTML()
  if (before === after) {
    editor.value?.chain().deleteTable().run()
  }
}
</script>
